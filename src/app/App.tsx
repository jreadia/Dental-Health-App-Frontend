import { useState } from "react";
import { LoginPage } from "./components/login-page";
import { SignupPage } from "./components/signup-page";
import { SuccessPage } from "./components/success-page";
import { LoadingPage } from "./components/loading-page";
import { Homepage } from "./components/homepage";
import UploadPage from "./components/upload-page";
import ResultPage from "./components/result-page";

export default function App() {
  const [currentPage, setCurrentPage] = useState<
    "login" | "signup" | "success" | "loading" | "homepage" | "upload" | "results"
  >("login");
  
  // State to hold the uploaded image so it can be passed to the result page
  const [scannedImage, setScannedImage] = useState<string | null>(null);

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
        <Homepage onUploadClick={() => setCurrentPage("upload")} />
      )}
      
      {/* UploadPage passes the image back up when "Show Result" is clicked */}
      {currentPage === "upload" && (
        <UploadPage 
          onShowResult={(imageUrl) => {
            setScannedImage(imageUrl);
            setCurrentPage("results");
          }} 
          onCancel={() => setCurrentPage("homepage")} 
        />
      )}
      
      {/* ResultPage receives the image to display */}
      {currentPage === "results" && (
        <ResultPage 
          uploadedImage={scannedImage}
          onGoHome={() => {
            setScannedImage(null); // Clear the image when returning home
            setCurrentPage("homepage");
          }} 
        />
      )}
    </>
  );
}