import React from 'react';

import { Outlet } from 'react-router-dom';

const DashboardLayout = () => (
  <div>
    <main>
      <Outlet />
    </main>
  </div>
);

export default DashboardLayout;
