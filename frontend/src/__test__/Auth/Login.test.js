import { render, screen, fireEvent } from "@testing-library/react";
import LoginPage from "../../components/Auth/LoginPage";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../../redux/store";
import { GoogleOAuthProvider } from "@react-oauth/google";

describe("Login Page Tests", () => {

    test("renders the login form correctly", () => {
        render(<Provider store={store}>
            <BrowserRouter>
                <GoogleOAuthProvider clientId="146756462672-ldk10gufg7c3v9jun37p6hme4he803ia.apps.googleusercontent.com">
                    <LoginPage />
                </GoogleOAuthProvider>
            </BrowserRouter>
        </Provider>);
        expect(screen.getByText(/Sign in to your account/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /sign in/i })).toBeInTheDocument();
    });

    test("updates input fields correctly", () => {
        render(<Provider store={store}>
            <BrowserRouter>
            <GoogleOAuthProvider clientId="146756462672-ldk10gufg7c3v9jun37p6hme4he803ia.apps.googleusercontent.com">
                <LoginPage />
            </GoogleOAuthProvider>
            </BrowserRouter>
        </Provider>);
        const usernameInput = screen.getByLabelText(/username/i);
        const passwordInput = screen.getByLabelText(/password/i);

        fireEvent.change(usernameInput, { target: { value: "testuser" } });
        fireEvent.change(passwordInput, { target: { value: "password123" } });

        expect(usernameInput.value).toBe("testuser");
        expect(passwordInput.value).toBe("password123");
    });

    
    

});
