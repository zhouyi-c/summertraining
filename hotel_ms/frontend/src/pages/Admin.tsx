import { Routes, Route } from 'react-router-dom';
import AdminLayout from './admin/AdminLayout';
import Dashboard from './admin/Dashboard';
import RoomAdmin from './admin/RoomAdmin';
import EmployeeAdmin from './admin/EmployeeAdmin';
import GuestAdmin from './admin/GuestAdmin';
import ReservationAdmin from './admin/ReservationAdmin';

const Admin = () => {
  return (
    <Routes>
      <Route path="/" element={<AdminLayout />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="rooms" element={<RoomAdmin />} />
        <Route path="employees" element={<EmployeeAdmin />} />
        <Route path="guests" element={<GuestAdmin />} />
        <Route path="reservations" element={<ReservationAdmin />} />
      </Route>
    </Routes>
  );
};

export default Admin;


