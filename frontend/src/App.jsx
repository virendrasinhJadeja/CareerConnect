import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

import NotFound from "./pages/NotFound";

// Student
import StudentDashboard from "./pages/StudentDashboard";
import Jobs from "./pages/Jobs";
import MyApplications from "./pages/MyApplications";
import Profile from "./pages/Profile";

// Recruiter
import RecruiterDashboard from "./pages/RecruiterDashboard";
import PostJob from "./pages/PostJob";
import Applicants from "./pages/Applicants";
import EditJob from "./pages/EditJob";

// Admin
import AdminDashboard from "./pages/AdminDashboard";
import AdminUsers from "./pages/AdminUsers";
import AdminJobs from "./pages/AdminJobs";

import ProtectedRoute from "./routes/ProtectedRoute";
import DashboardLayout from "./layouts/DashboardLayout";
import AdminLayout from "./layouts/AdminLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Dashboard Layout */}
<Route
  element={
    <ProtectedRoute>
      <DashboardLayout />
    </ProtectedRoute>
  }
>

  {/* Student */}

  <Route
    path="/student/dashboard"
    element={
      <ProtectedRoute role="student">
        <StudentDashboard />
      </ProtectedRoute>
    }
  />

  <Route
    path="/jobs"
    element={
      <ProtectedRoute role="student">
        <Jobs />
      </ProtectedRoute>
    }
  />

  <Route
    path="/my-applications"
    element={
      <ProtectedRoute role="student">
        <MyApplications />
      </ProtectedRoute>
    }
  />

  <Route
    path="/profile"
    element={
      <ProtectedRoute role="student">
        <Profile />
      </ProtectedRoute>
    }
  />

  {/* Recruiter */}

  <Route
    path="/recruiter/dashboard"
    element={
      <ProtectedRoute role="recruiter">
        <RecruiterDashboard />
      </ProtectedRoute>
    }
  />

  <Route
    path="/post-job"
    element={
      <ProtectedRoute role="recruiter">
        <PostJob />
      </ProtectedRoute>
    }
  />

  <Route
    path="/applicants"
    element={
      <ProtectedRoute role="recruiter">
        <Applicants />
      </ProtectedRoute>
    }
  />

  <Route
    path="/edit-job/:id"
    element={
      <ProtectedRoute role="recruiter">
        <EditJob />
      </ProtectedRoute>
    }
  />

</Route>

        {/* Admin Layout */}
<Route
  element={
    <ProtectedRoute role="admin">
      <AdminLayout />
    </ProtectedRoute>
  }
>
  <Route
    path="/admin/dashboard"
    element={<AdminDashboard />}
  />

  <Route
    path="/admin/users"
    element={<AdminUsers />}
  />

  <Route
    path="/admin/jobs"
    element={<AdminJobs />}
  />
</Route>

<Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}



export default App;