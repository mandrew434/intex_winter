import React, { useEffect, useState } from 'react';

// This array holds the EXACT filenames (including spaces) from your "public/HomeBackground" folder.
const FILENAMES = [
  "After Maria.jpg",
  "After the Raid.jpg",
  "After.jpg",
  "Barbarians.jpg",
  "Barbecue.jpg",
  "Barbie Chelsea The Lost Birthday.jpg",
  "Barbie Her Sisters in a Pony Tale.jpg",
  "Barbie A Fairy Secret.jpg",
  "Cross Rise of the Villains.jpg",
  "Crossroads Two Jaga.jpg",
  "Crouching Tiger Hidden Dragon.jpg",
  "Croupier.jpg",
  "Cuba and the Cameraman.jpg",
  "Cuckoo.jpg",
  "Cult of Chucky.jpg",
  "Cupcake  Dino  General Services.jpg",
  "Curon.jpg",
  "Goosebumps.jpg",
  "Goosebumps 2 Haunted Halloween.jpg",
  "GORA.jpg",
  "Holding the Man.jpg",
  "Hole in the Wall.jpg",
  "Holidate.jpg",
  "Holiday Home Makeover with Mr Chris.jpg",
  "Holiday in the Wild.jpg",
  "Just The Way You Are.jpg",
  "Just You.jpg",
  "Justice My Foot.jpg",
  "Justice.jpg",
  "Justin Bieber Never Say Never.jpg",
  "Justin Timberlake  the Tennessee Kids.jpg",
  "Payday.jpg",
  "Paying Guests.jpg",
  "Peace Haven.jpg",
  "Peaky Blinders.jpg",
  "Peasants Rebellion.jpg",
  "Pedal the World.jpg",
  "Security.jpg",
  "See You in Time.jpg",
  "See You Yesterday.jpg",
  "Seeing Allred.jpg",
];

const BillboardBackground: React.FC = () => {
  const [selectedImages, setSelectedImages] = useState<string[]>([]);

  // Shuffle the array and pick three images
  useEffect(() => {
    const pickRandomImages = () => {
      // Shuffle the array (Fisher-Yates)
      const copy = [...FILENAMES];
      for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
      }
      // Take the first three
      return copy.slice(0, 4);
    };

    setSelectedImages(pickRandomImages());
  }, []);

  return (
    <div className="billboard-background">
      {selectedImages.map((filename, index) => (
        <img
          key={index}
          src={`/HomeBackground/${filename}`} // Local folder reference
          alt=""
          className={`billboard-image billboard-image-${index + 1}`}
        />
      ))}
    </div>
  );
};

export default BillboardBackground;
