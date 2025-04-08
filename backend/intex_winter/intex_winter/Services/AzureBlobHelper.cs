using Azure.Storage.Blobs;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

public class AzureBlobHelper
{
    private readonly BlobClient _blobClient;

    // Constructor for connection string mode
    public AzureBlobHelper(string connectionString, string containerName, string blobName)
    {
        Console.WriteLine("Initializing BlobClient using connection string...");
        
        var blobServiceClient = new BlobServiceClient(connectionString);
        var containerClient = blobServiceClient.GetBlobContainerClient(containerName);
        _blobClient = containerClient.GetBlobClient(blobName);
        
        Console.WriteLine($"Initialized BlobClient for blob: {blobName} in container: {containerName}");

    }

    // Alternate constructor for SAS URI mode
    public AzureBlobHelper(Uri sasUri)
    {
        _blobClient = new BlobClient(sasUri);
    }

    /// Downloads the blob content and returns it as a string.
    public async Task<string> DownloadBlobAsStringAsync()
    {
        Console.WriteLine("Starting download of blob content...");

        using var memoryStream = new MemoryStream();
        await _blobClient.DownloadToAsync(memoryStream);
        Console.WriteLine($"Downloaded blob content. Stream length: {memoryStream.Length} bytes.");
        
        memoryStream.Position = 0; // Reset the stream position
        using var reader = new StreamReader(memoryStream);
        Console.WriteLine("Blob content successfully read as string.");

        return await reader.ReadToEndAsync();
    }

    /// Downloads the CSV from blob storage and parses it into a similarity matrix.
    /// The matrix is represented as a dictionary where:
    ///   - The outer key is the source ShowId (string)
    ///   - The inner dictionary maps target ShowIds to their similarity scores (float)
    /// Assumes that the CSV file's first row is headers (with the first column being a label like "ShowId")
    /// and that each subsequent row starts with a source ShowId.
    public async Task<Dictionary<string, Dictionary<string, float>>> LoadSimilarityMatrixFromBlobAsync()
    {
        Console.WriteLine("Loading similarity matrix from blob...");
        string csvContent = await DownloadBlobAsStringAsync();
        
        var matrix = new Dictionary<string, Dictionary<string, float>>();
        // Split into lines (handles both Windows and Unix newlines)
        var lines = csvContent.Split(new[] { '\r', '\n' }, StringSplitOptions.RemoveEmptyEntries);
        Console.WriteLine($"CSV content split into {lines.Length} lines.");

        if (lines.Length == 0)
            return matrix;

        // The first line contains the headers.
        // We skip the first column (assumed to be the row title) and use the remaining entries.
        var headers = lines[0].Split(',').Skip(1).ToArray();
        Console.WriteLine($"Parsed {headers.Length} headers.");


        // Process each data row.
        for (int i = 1; i < lines.Length; i++)
        {
            var row = lines[i].Split(',');
            // The first cell is the source ShowId.
            var sourceShowId = row[0].Trim();
            var innerDict = new Dictionary<string, float>();

            // Parse the rest of the row as similarity scores.
            for (int j = 1; j < row.Length; j++)
            {
                string cell = row[j].Trim();
                if (float.TryParse(cell, NumberStyles.Any, CultureInfo.InvariantCulture, out float score))
                {
                    // headers[j-1] corresponds to the target ShowId.
                    innerDict[headers[j - 1].Trim()] = score;
                }
            }
            matrix[sourceShowId] = innerDict;
        }

        return matrix;
    }

    /// Given a ShowId, this method loads the similarity matrix from blob storage,
    /// queries the row corresponding to that ShowId, and returns the top N similar ShowIds
    /// (excluding the input ShowId), sorted by descending similarity score.
    public async Task<List<(string ShowId, float Score)>> GetTopSimilarAsync(string showId, int topN = 5)
    {
        var matrix = await LoadSimilarityMatrixFromBlobAsync();
        if (!matrix.ContainsKey(showId))
        {
            // Return an empty list if the ShowId isn't found.
            return new List<(string, float)>();
        }

        // Query: exclude the key that equals showId (if present), sort descending, and take top N.
        return matrix[showId]
            .Where(kv => kv.Key != showId)
            .OrderByDescending(kv => kv.Value)
            .Take(topN)
            .Select(kv => (kv.Key, kv.Value))
            .ToList();
    }
}
