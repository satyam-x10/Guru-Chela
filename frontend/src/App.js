import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home.js';
import Navbar from './components/Navbar/Navbar.js';
import Login from './components/Authentication/Login.js';
import Courses from './components/Courses/Courses.jsx';
import Lecture from './components/lecture/lecture.jsx';
import Doubts from './components/Doubts/Doubts.jsx';
import PairUp from './components/Doubts/PairUp.jsx';
import Register from './components/Authentication/Register.js';
import ForgotPassword from './components/Authentication/ForgotPassword.js';
import ResetPassword from './components/Authentication/ResetPassword.js';
import Contact from './components/Contact/Contact.js';
import Request from './components/RequestCourse/Request.js';

import Subscribe from './components/Payment/Subscribe.js';
import PaymentFail from './components/Payment/PaymentFail.js';
import PaymentSuccess from './components/Payment/PaymentSuccess.js';
import NotFound from './components/ErrorPage/NotFound.js';
import CourseDetail from './components/CourseDetail/CourseDetail.js';
import Profile from './components/Profile/Profile.js';
import ChangePassword from './components/Profile/ChangePassword.js';
import UpdateProfile from './components/Profile/UpdateProfile.js';

import Users from './components/Admin/Users/Users.js';
import CreateCourses from './components/Admin/CreateCourses/CreateCourses.js';
import AdminCourses from './components/Admin/AdminCourses/AdminCourses.js';
import Dashboard from './components/Admin/Dashboard/Dashboard.js';
import { useDispatch, useSelector } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';
import { myProfile, adminProfile } from './redux/actions/user?.js';
import { ProtectedRoute } from 'protected-route-react';
import Loader from './components/Loader/Loader.js';
import Footer from './components/Footer/Footer.js';
import History from './components/History/history.jsx';
import AddLecture from './components/Admin/AdminCourses/AddLecture.js';
import Notes from './components/Notes/Notes.js';
import Contribute from './components/Doubts/Contribute.jsx';
import AiGuruji from './components/aiGuruji/aiGuruji.jsx';
import Notification from './components/Notification/Notification.js';

const App = () => {
  const { isAuthenticated, user, error, message, loading, admin } = useSelector(
    state => state.user
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }

    if (message) {
      toast.success(message);
      dispatch({ type: 'clearMessage' });
    }
  }, [dispatch, error, message]);

  useEffect(() => {
    dispatch(myProfile());
  }, [dispatch]);

  return (
    <BrowserRouter>
      {loading ? (
        <>
        <Loader />
        <p
          style={{
            fontSize: '1.2rem',
            color: '#333',
            position:'fixed',
            justifyContent: 'center',
            top: '0',
            marginTop: '20px',
            marginLeft: '50px',
            textAlign: 'center',
            fontWeight: 'bold',
            fontFamily: 'Arial, sans-serif'
          }}
        >
          Please wait a minute or two, we might be restarting the inactive server...
        </p>
      </>
      
      ) : (
        <>
          <Navbar isAuthenticated={isAuthenticated} user={user} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/login"
              element={
                <ProtectedRoute isAuthenticated={!isAuthenticated} redirect="/">
                  <Login />
                </ProtectedRoute>
              }
            />
            <Route
              path="/courses"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <Courses admin={admin} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/courses/:id"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <CourseDetail user={user} />
                </ProtectedRoute>
              }
              redirect='.'
            />
            {/* <Route path="/history/" element={<ProtectedRoute isAuthenticated={isAuthenticated} redirect="."><Lecture /></ProtectedRoute>} /> */}
            <Route
              path="/lecture/:courseId/:lectureId"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated} redirect=".">
                  <Lecture />
                </ProtectedRoute>
              }
            />
            <Route path="/notifications" element={<Notification user={user} />} />

            <Route path="/doubts" element={<Doubts user={user} />} />
            <Route path="/doubts/pairup" element={<PairUp user={user} />} />
            <Route path="/doubts/:id" element={<Contribute user={user} />} />
            <Route
              path="/register"
              element={
                <ProtectedRoute isAuthenticated={!isAuthenticated} redirect="/">
                  <Register />
                </ProtectedRoute>
              }
            />
            <Route path="/forgotPassword" element={<ForgotPassword />} />
            <Route path="/resetPassword/:token" element={<ResetPassword />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/request" element={<Request />} />
            <Route
              path="/subscribe"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <Subscribe user={user} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/notes"
              element={
                <ProtectedRoute redirect='.' isAuthenticated={isAuthenticated}>
                  <Notes user={user} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/aiGuruji"
              element={
                <ProtectedRoute redirect='.' isAuthenticated={isAuthenticated}>
                  <AiGuruji/>
                </ProtectedRoute>
              }
            />
            <Route path="/paymentfail" element={<PaymentFail />} />
            <Route path="/paymentSuccess" element={<PaymentSuccess />} />
            <Route path="*" element={<NotFound />} />
            <Route
              path="/profile"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <Profile user={user} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/changepassword"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <ChangePassword />
                </ProtectedRoute>
              }
            />
            <Route
              path="/updateprofile"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <UpdateProfile user={user} />
                </ProtectedRoute>
              }
            />

            {/* Admin Routes */}
            {/* <Route path="/admin/admincourses" element={<ProtectedRoute isAuthenticated={isAuthenticated} adminRoute={true} isAdmin={user && user?.role === "admin"}><AdminCourses /></ProtectedRoute>} /> */}
            <Route path="/admin/addLecture/:id" element={<AddLecture />} />
            {/* <Route path="/admin/admincourses" element={<AdminCourses />} />
              <Route path="/admin/createcourses" element={<CreateCourses admin={admin} />} />
              <Route path="/admin/dashboard" element={<Dashboard />} />
              <Route path="/admin/users" element={<Users />} /> */}
            <Route
              path="/admin/admincourses"
              element={
                <ProtectedRoute
                  isAuthenticated={isAuthenticated}
                  adminRoute={true}
                  isAdmin={user && user?.role === 'admin'}
                >
                  <AdminCourses />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/createcourses"
              element={
                <ProtectedRoute
                  isAuthenticated={isAuthenticated}
                  adminRoute={true}
                  isAdmin={user && user?.role === 'admin'}
                >
                  <CreateCourses admin={admin} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute
                  isAuthenticated={isAuthenticated}
                  adminRoute={true}
                  isAdmin={user && user?.role === 'admin'}
                >
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/users"
              element={
                <ProtectedRoute
                  isAuthenticated={isAuthenticated}
                  adminRoute={true}
                  isAdmin={user && user?.role === 'admin'}
                >
                  <Users />
                </ProtectedRoute>
              }
            />
          </Routes>
          <Footer />
        </>
      )}

      <Toaster />
    </BrowserRouter>
  );
};

export default App;
