import { useState } from "react";
import { LoginPage } from "./components/login-page";
import { SignupPage } from "./components/signup-page";
import { SuccessPage } from "./components/success-page";
import { LoadingPage } from "./components/loading-page";
import { Homepage } from "./components/homepage";

export default function App() {
  const [currentPage, setCurrentPage] = useState<"login" | "signup" | "success" | "loading" | "homepage">("login");

  return (
    <>
      {currentPage === "login" && (
        <LoginPage
          onSignUpClick={() => setCurrentPage("signup")}
          onLoginSubmit={() => setCurrentPage("loading")}
        />
      )}
      {currentPage === "signup" && (
        <SignupPage
          onBackToLogin={() => setCurrentPage("login")}
          onAccountCreated={() => setCurrentPage("success")}
        />
      )}
      {currentPage === "success" && (
        <SuccessPage onRedirectToLogin={() => setCurrentPage("login")} />
      )}
      {currentPage === "loading" && (
        <LoadingPage onLoadingComplete={() => setCurrentPage("homepage")} />
      )}
      {currentPage === "homepage" && (
        <Homepage />
      )}
    </>
  );
}