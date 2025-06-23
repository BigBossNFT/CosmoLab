
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./contexts/LanguageContext";
import { Web3Provider } from "./contexts/Web3Context";
import Navbar from "./components/Navbar";
import Index from "./pages/Index";
import About from "./pages/About";
import Cases from "./pages/Cases";
import Services from "./pages/Services";
import CosmoToken from "./pages/CosmoToken";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import Dashboard from "./pages/Dashboard";
import MatrixDashboard from "./pages/MatrixDashboard";
import NotFound from "./pages/NotFound";
import Footer from "./components/Footer";
import ChatBot from "./components/ChatBot";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <Web3Provider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <div className="min-h-screen flex flex-col bg-cosmos-dark">
              <Navbar />
              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/cases" element={<Cases />} />
                  <Route path="/services" element={<Services />} />
                  <Route path="/cosmo-token" element={<CosmoToken />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/matrix-dashboard" element={<MatrixDashboard />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
              <Footer />
              <ChatBot />
            </div>
          </BrowserRouter>
        </TooltipProvider>
      </Web3Provider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
