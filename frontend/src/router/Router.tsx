import { Routes, Route } from "react-router";
import Login from "@/pages/Login";
import RootRouter from "./RootRouter";

const AppRouter = () => {
  return (
    <Routes>
      {/* Root route */}
      <Route path='/' element={<RootRouter />} />

      {/* Public routes */}
      <Route element={<RootRouter />}>
        <Route path='/login' element={<Login />} />
      </Route>

      {/* Protected routes */}
      {/* <Route element={<ProtectedRoute />}>
        <Route path='/dashboard' element={<DashboardPage />} />
        <Route path='/profile' element={<ProfilePage />} />
      </Route> */}

      {/* Catch-all route */}
      {/* <Route path='*' element={<NotFoundPage />} /> */}
    </Routes>
  );
};

export default AppRouter;
