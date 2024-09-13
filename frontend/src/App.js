import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/Auth/LoginPage.js'; 
import RegisterPage from './components/Auth/RegisterPage.js';
import Test from "./Test.js";
import ForgotPasswordForm from './components/Auth/ForgotPasswordForm.js';
import ResetPasswordForm from './components/Auth/ResetPasswordForm.js';
import Navbar from './components/Common/Navbar.js';
import Footer from './components/Common/Footer.js';
import HomePage from './pages/Home/HomePage.js';
import RoutePage from './components/Station/Route.js';
import UserProfile from './components/Dashboard/User/UserProfile.js';
import AboutUs from './pages/AboutUs/AboutUs.js';
import ChangePassword from './components/Dashboard/ChangePassword.js';
import ViewFavouriteRoutes from './components/Dashboard/ViewFavouriteRoutes.js';
import Logout from './components/Dashboard/Logout.js';

function App() {
    return (
        <Router>
            <Navbar/>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/forgot-password" element={<ForgotPasswordForm />} />
                <Route path="/reset-password" element={<ResetPasswordForm/>} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/routes" element={<RoutePage />} />

                <Route path="/profile" element={<UserProfile/>}/>
                <Route path="/About Us" element={<AboutUs/>}/>
                <Route path="/test" element={<Test/>}/>
                <Route path="/logout" element={<Logout/>}/>
                <Route path='/change-password' element={<ChangePassword/>}/>
                <Route path='/saved-routes' element={<ViewFavouriteRoutes/>}/>

            </Routes>
            <Footer/>
        </Router>
    );
}

export default App;
