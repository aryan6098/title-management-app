import React from "react";
import { render, screen  } from "@testing-library/react";

import { Provider, Provider as ReduxProvider } from "react-redux";
import store from "../../../store";
// import { AuthC } from "../../../context/AuthContext";
import { AuthContext, useAuth } from "../../../context/AuthContext";
import TitleDashboard from "../../../components/Dashboard/TitleDashboard";
import { useWalletConnection } from "../../../hook/useWalletConnection";
import App from "../../../App";

jest.mock("../../../hook/useWalletConnection");
jest.mock("../../../context/AuthContext");


describe("TitleDashboard with authentication and wallet tests", () => {
  let mockConnectWallet: jest.Mock;

  beforeEach(() => {
    mockConnectWallet = jest.fn();
    (useWalletConnection as jest.Mock).mockReturnValue({
      walletAddress: null,
      connectWallet: mockConnectWallet,
    });

    (useAuth as jest.Mock).mockReturnValue({
      isAuthenticated: false,
      login: jest.fn(),
      logout: jest.fn(),
      error: null,
    });
  });

    // const renderWithRouterAndAuth = (isAuthenticated: boolean) => {
    //   // Render the component with mocked AuthContext values
      
    //   return render(
    //     <Provider store={store}>
    //       <AuthContext.Provider
    //         value={{
    //           isAuthenticated,
    //           login: jest.fn(),
    //           logout: jest.fn(),
    //           error: null,
    //         }}
    //       >
    //         <TitleDashboard />
    //       </AuthContext.Provider>
    //     </Provider>
    //   );
    // };

  const renderWithRouterAndAuth = (isAuthenticated: boolean, walletAddress: string | null = null) => {

    // Set mock implementation for isAuthenticated
    (useAuth as jest.Mock).mockReturnValue({
      isAuthenticated,
      login: jest.fn(),
      logout: jest.fn(),
      error: null,
    });

    (useWalletConnection as jest.Mock).mockReturnValue({
      walletAddress,
      connectWallet: mockConnectWallet,
    });

    return render(
      <Provider store={store}>
        <AuthContext.Provider
          value={{
            isAuthenticated,
            login: jest.fn(),
            logout: jest.fn(),
            error: null,
          }}
        >
          <App />
        </AuthContext.Provider>
      </Provider>
    );
  };


  test("renders TitleDashboard if authenticated", () => {
    renderWithRouterAndAuth(true); // Simulate an authenticated user

    // Verify elements specific to TitleDashboard are displayed
    expect(screen.getByText(/Titles Management/i)).toBeInTheDocument();
  });

  test("does not render TitleDashboard if not authenticated", () => {
    renderWithRouterAndAuth(false); // Simulate an unauthenticated user
    expect(screen.queryByText(/Titles Management/i)).not.toBeInTheDocument();
  });

  test("redirects to login if not authenticated", async () => {
    renderWithRouterAndAuth(false);
    expect(screen.queryByText(/Titles Management/i)).not.toBeInTheDocument();
    const textElements = await screen.findAllByText("Login");
    // Check if each element is in the document
    textElements.forEach((element) => {
      expect(element).toBeInTheDocument();
    });
  });

  test("shows connect wallet button when wallet is disconnected", () => {
    renderWithRouterAndAuth(true);
    expect(screen.getByText(/Connect Wallet/i)).toBeInTheDocument();
  });

  test("displays connected wallet address when wallet is connected", () => {
    renderWithRouterAndAuth(true);
    // screen.debug();
  });


});
