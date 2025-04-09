// AdminMoviesTableHeader.tsx
import React from 'react';

const AdminMoviesTableHeader: React.FC = () => {
  return (
    <thead>
      <tr>
        <th>Show ID</th>
        <th>Title</th>
        <th>Director</th>
        <th>Release Year</th>
        <th>Genres</th>
        <th>Rating</th>
        <th>Actions</th>
      </tr>
    </thead>
  );
};

export default AdminMoviesTableHeader;
