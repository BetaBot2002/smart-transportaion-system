import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage.js'; 
import RegisterPage from './pages/RegisterPage.js'; 
import Test from "./Test.js";
import ForgotPasswordForm from './components/Auth/ForgotPasswordForm.js';
import ResetPasswordForm from './components/Auth/ResetPasswordForm.js';
function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/forgot-password" element={<ForgotPasswordForm />} />
                <Route path="/reset-password" element={<ResetPasswordForm/>} />
                <Route path="/test" element={<Test/>}/>
            </Routes>
        </Router>
    );
}

export default App;
