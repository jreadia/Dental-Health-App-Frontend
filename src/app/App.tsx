import { useState } from "react";
import { LoginPage } from "./components/login-page";
import { SignupPage } from "./components/signup-page";
import { SuccessPage } from "./components/success-page";
import { LoadingPage } from "./components/loading-page";
import { Homepage } from "./components/homepage";
import UploadPage from "./components/upload-page";
import ResultPage from "./components/result-page";

export interface HistoryItem {
  id: string;
  date: string;
  plaques: number;
  status: string;
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<
    "login" | "signup" | "success" | "loading" | "homepage" | "upload" | "results"
  >("login");
  
  const [scannedImage, setScannedImage] = useState<string | null>(null);
  
  // New state to hold the specific current result data and the entire history list
  const [currentResult, setCurrentResult] = useState<HistoryItem | null>(null);
  const [scanHistory, setScanHistory] = useState<HistoryItem[]>([]);

  // Function to simulate AI scanning and categorization
  const handleShowResult = (imageUrl: string) => {
    // Generate a random dummy plaque count between 0 and 12 for testing
    const plaques = Math.floor(Math.random() * 13); 
    
    let status = "Safe";
    if (plaques >= 10) status = "Very Unhealthy";
    else if (plaques >= 7) status = "Unhealthy";
    else if (plaques >= 4) status = "Somewhat Safe";
    else status = "Safe"; // Covers 0-3

    const newResult: HistoryItem = {
      id: Date.now().toString(),
      date: new Date().toLocaleDateString(),
      plaques,
      status,
    };

    setScannedImage(imageUrl);
    setCurrentResult(newResult);
    // Add the new result to the top of the history list
    setScanHistory(prevHistory => [newResult, ...prevHistory]); 
    setCurrentPage("results");
  };

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
      
      {/* Pass the scanHistory array to the homepage to display */}
      {currentPage === "homepage" && (
        <Homepage 
          history={scanHistory} 
          onUploadClick={() => setCurrentPage("upload")} 
        />
      )}
      
      {/* UploadPage passes the image to our new handleShowResult function */}
      {currentPage === "upload" && (
        <UploadPage 
          onShowResult={handleShowResult} 
          onCancel={() => setCurrentPage("homepage")} 
        />
      )}
      
      {/* ResultPage now receives the image AND the specific plaque data */}
      {currentPage === "results" && (
        <ResultPage 
          uploadedImage={scannedImage}
          resultData={currentResult}
          onGoHome={() => {
            setScannedImage(null);
            setCurrentResult(null);
            setCurrentPage("homepage");
          }} 
        />
      )}
    </>
  );
}