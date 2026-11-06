import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import { HashRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "@/components/ui/sonner";
import Home from "./pages/Home";
import { SmoothScroll } from "@/components/SmoothScroll";
import { ScrollReveal } from "@/components/ScrollReveal";
import "./styles.css";

const Cars = lazy(() => import("./pages/Cars"));
const CarDetails = lazy(() => import("./pages/CarDetails"));
const Product = lazy(() => import("./pages/Product"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const RefundPolicy = lazy(() => import("./pages/RefundPolicy"));
const Login = lazy(() => import("./pages/Login"));
const AddInventory = lazy(() => import("./pages/AddInventory"));
const AdminInventory = lazy(() => import("./pages/AdminInventory"));
const AdminEnquiries = lazy(() => import("./pages/AdminEnquiries"));
const NotFound = lazy(() => import("./pages/NotFound"));

function PageFallback() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="size-8 rounded-full border-2 border-[var(--brand-orange,#ff5a00)] border-t-transparent animate-spin" />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HelmetProvider>
      <HashRouter>
        <SmoothScroll />
        <ScrollReveal />
        <Suspense fallback={<PageFallback />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/refund-policy" element={<RefundPolicy />} />
            <Route path="/car/:slug" element={<CarDetails />} />
            <Route path="/product" element={<Product />} />
            <Route path="/cars" element={<Cars />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin/add-inventory" element={<AddInventory />} />
            <Route path="/admin/inventory" element={<AdminInventory />} />
            <Route path="/admin/enquiries" element={<AdminEnquiries />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
        <Toaster />
      </HashRouter>
    </HelmetProvider>
  </React.StrictMode>
);

