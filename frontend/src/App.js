import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Box, Spinner } from '@chakra-ui/react';

import Navbar from './components/Common/Navbar.js';
import Footer from './components/Common/Footer.js';
import HomePage from './pages/Home/HomePage.js';
import LoginPage from './components/Auth/LoginPage.js';
import RegisterPage from './components/Auth/RegisterPage.js';
import ForgotPasswordForm from './components/Auth/ForgotPasswordForm.js';
import VerifyOtp from './components/Auth/VerifyOtp.js';
import CompleteRegistration from './components/Auth/CompleteRegistration.js';
import ResetPassword from './components/Auth/ResetPassword.js';
import VerifyEmail from './components/Auth/verifyEmail.js';
import AboutUs from './pages/AboutUs/AboutUs.js';
import UserProfile from './components/Dashboard/User/UserProfile.js';
import ChangePassword from './components/Dashboard/ChangePassword.js';
import ViewFavouriteRoutes from './components/Dashboard/ViewFavouriteRoutes.js';
import Logout from './components/Dashboard/Logout.js';
import RoutePage from './components/Station/Route.js';
import TrainRoutePath from './components/Train/TrainRoutePath.js';
import ShowAvailableTrains from './components/Train/ShowAvailableTrains.js';
import GetShortestPath from './components/Train/GetShortestPath.js';
import ManageUser from './components/Dashboard/Admin/ManageUser.js';
import ManageStation from './components/Dashboard/Admin/ManageStation.js';
import PageNotFound from './pages/PageNotFound.js';
import { ModalNotice } from './components/Common/ModalNotice.js';
import { AlertNav } from './components/Common/AlertNav.js';

import Protected from './utils/protectedRoutes.js';
import { getProfileAction } from './redux/actions/userActions.js';
import { getAllStations } from './redux/actions/trainActions.js';

function App() {
    const dispatch = useDispatch();
    const refreshToken = localStorage.getItem("refresh");

    useEffect(() => {
        if (refreshToken) {
            dispatch(getProfileAction());
        }
        dispatch(getAllStations());
    }, [dispatch, refreshToken]);

    const { loading: loadingStations } = useSelector(state => state.GetAllStation);

    function GoogleLogin() {
        return (
            <GoogleOAuthProvider clientId="146756462672-ldk10gufg7c3v9jun37p6hme4he803ia.apps.googleusercontent.com">
                <LoginPage data-testid="login-page" />
            </GoogleOAuthProvider>
        );
    }

    return (
        <Router>
            <ModalNotice />
            <AlertNav />
            <Navbar data-testid="navbar" />

            {loadingStations ? (
                <Box data-testid="loading-spinner" display="flex" justifyContent="center" alignItems="center" height="100vh">
                    <Spinner size="xl" />
                </Box>
            ) : (
                <Routes>
                    <Route path='*' element={<PageNotFound data-testid="page-not-found" />} />
                    <Route path="/login" element={<Protected needLoggedIn={false}><GoogleLogin /></Protected>} />
                    <Route path="/register" element={<Protected needLoggedIn={false}><RegisterPage data-testid="register-page" /></Protected>} />
                    <Route path="/complete-profile" element={<Protected needLoggedIn={true}><CompleteRegistration data-testid="complete-profile" /></Protected>} />
                    <Route path="/forgot-password" element={<Protected needLoggedIn={false}><ForgotPasswordForm data-testid="forgot-password" /></Protected>} />
                    <Route path="/verify-otp" element={<Protected needLoggedIn={false}><VerifyOtp data-testid="verify-otp" navigate_link={'/reset-password'} /></Protected>} />
                    <Route path='/reset-password' element={<Protected needLoggedIn={false}><ResetPassword data-testid="reset-password" /></Protected>} />
                    <Route path="/verify-email" element={<Protected needLoggedIn={true}><VerifyEmail data-testid="verify-email" /></Protected>} />
                    <Route path="/" element={<Protected needLoggedIn={false}><HomePage data-testid="home-page" /></Protected>} />
                    <Route path="/routes" element={<Protected needLoggedIn={false}><RoutePage data-testid="routes-page" /></Protected>} />
                    <Route path="/trains/:trainNo" element={<Protected needLoggedIn={false}><TrainRoutePath data-testid="train-route" /></Protected>} />
                    <Route path="/get-shortest-path" element={<Protected needLoggedIn={false}><GetShortestPath data-testid="shortest-path" /></Protected>} />
                    <Route path="/get-list-available-trains/:source/:destination" element={<Protected needLoggedIn={false}><ShowAvailableTrains data-testid="available-trains" /></Protected>} />
                    <Route path="/profile" element={<Protected needLoggedIn={true}><UserProfile data-testid="user-profile" /></Protected>} />
                    <Route path="/about-us" element={<Protected needLoggedIn={false}><AboutUs data-testid="about-us" /></Protected>} />
                    <Route path="/admin/manage-user" element={<Protected needLoggedIn={true}><ManageUser data-testid="manage-user" /></Protected>} />
                    <Route path="/logout" element={<Protected needLoggedIn={true}><Logout data-testid="logout" /></Protected>} />
                    <Route path='/change-password' element={<Protected needLoggedIn={true}><ChangePassword data-testid="change-password" /></Protected>} />
                    <Route path='/saved-routes' element={<Protected needLoggedIn={true}><ViewFavouriteRoutes data-testid="saved-routes" /></Protected>} />
                    <Route path="/admin/manage-station" element={<Protected needLoggedIn={true}><ManageStation data-testid="manage-station" /></Protected>} />
                </Routes>
            )}
            
            <Footer data-testid="footer" />
        </Router>
    );
}

export default App;
