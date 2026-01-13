import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { PageTransition } from "./PageTransition";
import Index from "@/pages/Index";
import NotFound from "@/pages/NotFound";
import AboutUs from "@/pages/AboutUs";
import OurProcess from "@/pages/OurProcess";
import WhyCyvance from "@/pages/WhyCyvance";
import Milestones from "@/pages/Milestones";
import Simulation from "@/pages/Simulation";
import VulnerabilityShowcase from "@/pages/VulnerabilityShowcase";

export const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <PageTransition>
              <Index />
            </PageTransition>
          }
        />
        <Route
          path="/about-us"
          element={
            <PageTransition>
              <AboutUs />
            </PageTransition>
          }
        />
        <Route
          path="/our-process"
          element={
            <PageTransition>
              <OurProcess />
            </PageTransition>
          }
        />
        <Route
          path="/why-cyvance"
          element={
            <PageTransition>
              <WhyCyvance />
            </PageTransition>
          }
        />
        <Route
          path="/milestones"
          element={
            <PageTransition>
              <Milestones />
            </PageTransition>
          }
        />
        <Route
          path="/simulation"
          element={
            <PageTransition>
              <Simulation />
            </PageTransition>
          }
        />
        <Route
          path="/vulnerability-showcase"
          element={
            <PageTransition>
              <VulnerabilityShowcase />
            </PageTransition>
          }
        />
        <Route
          path="*"
          element={
            <PageTransition>
              <NotFound />
            </PageTransition>
          }
        />
      </Routes>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;
