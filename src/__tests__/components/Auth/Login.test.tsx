import React from "react";
import { fireEvent, render, screen, act } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../../../store/index"; // Adjust to your store location
import Login from "../../../components/Auth/Login";
import { MemoryRouter } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

jest.mock("../../../context/AuthContext", () => ({
  useAuth: jest.fn(),
}));

describe("Login Component", () => {
  beforeEach(() => {
    (useAuth as jest.Mock).mockReturnValue({
      isAuthenticated: false,
      login: jest.fn(),
      error: null,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the login form correctly",async() => {
    await act(async () => {
        render(
          <Provider store={store}>
            <MemoryRouter>
              <Login />
            </MemoryRouter>
          </Provider>
        );
      });

    // Check if the title is rendered
    expect(screen.getByRole("heading", { name: /login/i })).toBeInTheDocument();

    // Check for the email input field
    const emailInput = screen.getByLabelText(/email/i);
    expect(emailInput).toBeInTheDocument();
    expect(emailInput).toHaveAttribute("name", "email");

    // Check for the password input field
    const passwordInput = screen.getAllByText(/password/i)[0] as HTMLTextAreaElement;
    expect(passwordInput).toBeInTheDocument();

    // Check if the login button is rendered
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();

    // Check for the password visibility toggle button
    expect(
      screen.getByRole("button", { name: /toggle password visibility/i })
    ).toBeInTheDocument();
  });

});
