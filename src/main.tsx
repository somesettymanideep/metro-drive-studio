import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "@/components/ui/sonner";
import Home from "./pages/Home";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import RefundPolicy from "./pages/RefundPolicy";
import CarDetails from "./pages/CarDetails";
import Product from "./pages/Product";
import Cars from "./pages/Cars";
import NotFound from "./pages/NotFound";
import { SmoothScroll } from "@/components/SmoothScroll";
import { ScrollReveal } from "@/components/ScrollReveal";
import "./styles.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HelmetProvider>
      <HashRouter>
        <SmoothScroll />
        <ScrollReveal />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/refund-policy" element={<RefundPolicy />} />
          <Route path="/car/:slug" element={<CarDetails />} />
          <Route path="/product" element={<Product />} />
          <Route path="/cars" element={<Cars />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster />
      </HashRouter>
    </HelmetProvider>
  </React.StrictMode>
);

