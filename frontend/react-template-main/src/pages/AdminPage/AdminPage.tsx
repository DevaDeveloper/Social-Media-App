import React, { FC } from 'react';
import Page from '../Page';
import AdminScreen from '../../features/admin/AdminScreen';

const AdminPage: FC = () => {
  console.log('testing');
  return (
    <Page>
      <AdminScreen />
    </Page>
  );
};
export default AdminPage;
