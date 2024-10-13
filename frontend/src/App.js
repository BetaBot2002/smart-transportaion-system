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
import GetShortestPath  from './components/Train/GetShortestPath.js';
import { Alert, AlertIcon, Box, Spinner } from '@chakra-ui/react';
import PageNotFound from './pages/PageNotFound.js';
import {  GoogleOAuthProvider } from '@react-oauth/google';


function App() {
    const dispatch = useDispatch();
    const refreshToken = localStorage.getItem("refreshToken");
    useEffect(() => {
        if (refreshToken) {
            dispatch(getProfileAction());
            dispatch(getLRUtrains());
        }
        dispatch(getAllStations());
    }, [])
	const { loading: loading1, error: err2, data: data1 = [] } = useSelector(state => state.GetAllStation);
    const { loading: loading2, data: trains, error: err1 } = useSelector(state => state.GetSearchHistory);

    function GoogleLogin () {
        return (
			<GoogleOAuthProvider clientId="146756462672-ldk10gufg7c3v9jun37p6hme4he803ia.apps.googleusercontent.com">
                <LoginPage/>
            </GoogleOAuthProvider>
        )
    }

    return (
        <Router>
            <Alert status='info'>
                <AlertIcon />
                Website is under construction. If you find any error fill contact us form!
            </Alert>
            <Navbar />
            {loading1 || loading2 ? (
			<Box display="flex" justifyContent="center" alignItems="center" height="100vh">
				<Spinner size="xl" />
			</Box>
		) :
            <Routes>
                <Route path='*' element={<PageNotFound/>}/>
                <Route path="/login" element={<GoogleLogin />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/forgot-password" element={<ForgotPasswordForm />} />
                <Route path="/verify-otp" element={<VerifyOtp />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/" element={<HomePage />} />
                <Route path="/routes" element={<RoutePage />} />
                <Route path="/get-shortest-path" element={<GetShortestPath />} />

                <Route path="/profile" element={<UserProfile />} />
                <Route path="/About Us" element={<AboutUs />} />
                <Route path="/admin/manage-user" element={<ManageUser />} />
                <Route path="/logout" element={<Logout />} />
                <Route path='/change-password' element={<ChangePassword />} />
                <Route path='/saved-routes' element={<ViewFavouriteRoutes />} />
                <Route path="/admin/manage-station" element={<ManageStation />} />

            </Routes>
            }  
            <Footer />
        </Router>
    );
}

export default App;
