// AdminMoviesPage.tsx
import React from 'react';
import AdminMoviesTable from '../components/AdminMoviesTable';

const AdminMoviesPage: React.FC = () => {
  return (
    <div>
      {/* You can add additional admin sidebar, navigation, etc. here */}
      <AdminMoviesTable />
    </div>
  );
};

export default AdminMoviesPage;
