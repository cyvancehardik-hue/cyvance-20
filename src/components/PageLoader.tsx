import { motion } from "framer-motion";

export const PageLoader = () => {
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[100] h-1 bg-gradient-to-r from-primary via-primary/80 to-primary"
      initial={{ scaleX: 0, transformOrigin: "left" }}
      animate={{ scaleX: 1 }}
      exit={{ scaleX: 0, transformOrigin: "right" }}
      transition={{
        duration: 0.4,
        ease: [0.25, 0.4, 0.25, 1] as [number, number, number, number],
      }}
      style={{
        boxShadow: "0 0 10px hsl(var(--primary)), 0 0 20px hsl(var(--primary) / 0.5)",
      }}
    />
  );
};

export default PageLoader;
