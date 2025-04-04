
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App";
import "./index.css";
import { Toaster } from "./components/ui/toaster";
import { LanguageProvider } from "./contexts/LanguageContext";
import { AIProvider } from "./contexts/AIContext";
import { AIConfigProvider } from "./contexts/AIConfigContext";
import { ChatProvider } from "./contexts/ChatContext";
import { NavigationModeProvider } from "./contexts/NavigationModeContext";

// Create a client for react-query
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <LanguageProvider>
          <AIConfigProvider>
            <AIProvider>
              <NavigationModeProvider>
                <ChatProvider>
                  <App />
                  <Toaster />
                </ChatProvider>
              </NavigationModeProvider>
            </AIProvider>
          </AIConfigProvider>
        </LanguageProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
);
