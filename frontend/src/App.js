import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/Auth/LoginPage.js';
import RegisterPage from './components/Auth/RegisterPage.js';
import Test from "./Test.js";
import ForgotPasswordForm from './components/Auth/ForgotPasswordForm.js';
import VerifyOtp from './components/Auth/VerifyOtp.js';
import Navbar from './components/Common/Navbar.js';
import Footer from './components/Common/Footer.js';
import HomePage from './pages/Home/HomePage.js';
import RoutePage from './components/Station/Route.js';
import UserProfile from './components/Dashboard/User/UserProfile.js';
import AboutUs from './pages/AboutUs/AboutUs.js';
import ChangePassword from './components/Dashboard/ChangePassword.js';
import ViewFavouriteRoutes from './components/Dashboard/ViewFavouriteRoutes.js';
import Logout from './components/Dashboard/Logout.js';
import { useEffect } from 'react';
import { getProfileAction } from './redux/actions/userActions.js';
import { useDispatch, useSelector } from 'react-redux';
import { getAllStations, getLRUtrains } from './redux/actions/trainActions.js';
import ManageUser from './components/Dashboard/Admin/ManageUser.js';
import ManageStation from './components/Dashboard/Admin/ManageStation.js';
import GetShortestPath from './components/Train/GetShortestPath.js';
import { Alert, AlertIcon, Box, Spinner } from '@chakra-ui/react';
import PageNotFound from './pages/PageNotFound.js';
import { GoogleOAuthProvider } from '@react-oauth/google';
import CompleteRegistration from './components/Auth/CompleteRegistration.js';
import ProtectedRoute from './protectedRoutes.js';


function App() {
    const dispatch = useDispatch();
    const refreshToken = localStorage.getItem("refreshToken");

    const { loading: loading1, error: err2, data: data1 = [] } = useSelector(state => state.GetAllStation);
    useEffect(() => {
        if (refreshToken) {
            dispatch(getProfileAction());
        }
        dispatch(getAllStations());

    }, [])
    function GoogleLogin() {
        return (
            <GoogleOAuthProvider clientId="146756462672-ldk10gufg7c3v9jun37p6hme4he803ia.apps.googleusercontent.com">
                <LoginPage />
            </GoogleOAuthProvider>
        )
    }

    return (
        <Router>
            <Alert status='info'>
                <AlertIcon />
                For the first you need to wait for 60 seconds since we have deployed backend free.
                If ther is any error please reach out us via contact us form in home page
            </Alert>
            <Navbar />
            {loading1 ? (
                <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                    <Spinner size="xl" />
                </Box>
            ) :
                <Routes>
                    <Route path='*' element={<PageNotFound />} />
                    <Route path="/login" element={<GoogleLogin />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/complete-profile" element={<CompleteRegistration />} />
                    <Route path="/forgot-password" element={<ForgotPasswordForm />} />
                    <Route path="/verify-otp" element={<VerifyOtp />} />
                    <Route path="/home" element={<HomePage />} />
                    <Route path="/" element={<HomePage />} />
                    <Route path="/routes" element={<RoutePage />} />
                    <Route path="/get-shortest-path" element={<GetShortestPath />} />
                    <Route path="/About Us" element={<AboutUs />} />


                    <Route path="/profile" element={<ProtectedRoute element={<UserProfile />} />} />
                    <Route path="/admin/manage-user" element={<ProtectedRoute element={<ManageUser />} />} />
                    <Route path="/logout" element={<ProtectedRoute element={<Logout />} />} />
                    <Route path="/reset-password" element={<ProtectedRoute element={<ChangePassword />} />} />
                    <Route path="/saved-routes" element={<ProtectedRoute element={<ViewFavouriteRoutes />} />} />
                    <Route path="/admin/manage-station" element={<ProtectedRoute element={<ManageStation />} />} />


                </Routes>
            }
            <Footer />
        </Router>
    );
}

export default App;
