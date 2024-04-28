import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ServicePage from "./pages/ServicePage";
import ProjectsPage from "./pages/ProjectsPage";
import Navigation from "./components/Navbar";
import Footer from "./components/Footer";
import Contact from "./components/Contact";
import AuthForm from "./components/AuthForm";
import { AuthProvider } from "./components/AuthContext";
import ServiceSection from "./components/ServicesSection";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicePage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/auth" element={<AuthForm />} />
          <Route path="/login" element={<AuthForm />} />
          <Route
            path="/serviceSection/:serviceName"
            element={<ServiceSection />}
          />
        </Routes>
        <Footer />
      </Router>
    </AuthProvider>
  );
};

export default App;
