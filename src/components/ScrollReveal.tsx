import { useEffect, useRef, ReactNode } from "react";
import { motion, useInView, useAnimation, Variants } from "framer-motion";

type RevealDirection = "up" | "down" | "left" | "right" | "fade" | "scale" | "rotate";

interface ScrollRevealProps {
  children: ReactNode;
  direction?: RevealDirection;
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
  amount?: number;
}

const getVariants = (direction: RevealDirection): Variants => {
  const distance = 60;
  
  const variants: Record<RevealDirection, Variants> = {
    up: {
      hidden: { opacity: 0, y: distance },
      visible: { opacity: 1, y: 0 },
    },
    down: {
      hidden: { opacity: 0, y: -distance },
      visible: { opacity: 1, y: 0 },
    },
    left: {
      hidden: { opacity: 0, x: distance },
      visible: { opacity: 1, x: 0 },
    },
    right: {
      hidden: { opacity: 0, x: -distance },
      visible: { opacity: 1, x: 0 },
    },
    fade: {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
    },
    scale: {
      hidden: { opacity: 0, scale: 0.8 },
      visible: { opacity: 1, scale: 1 },
    },
    rotate: {
      hidden: { opacity: 0, rotate: -5, scale: 0.95 },
      visible: { opacity: 1, rotate: 0, scale: 1 },
    },
  };

  return variants[direction];
};

export const ScrollReveal = ({
  children,
  direction = "up",
  delay = 0,
  duration = 0.6,
  className = "",
  once = true,
  amount = 0.2,
}: ScrollRevealProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, amount });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    } else if (!once) {
      controls.start("hidden");
    }
  }, [isInView, controls, once]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={getVariants(direction)}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.4, 0.25, 1], // Custom easing for smooth feel
      }}
      className={className}
      style={{ willChange: "opacity, transform" }}
    >
      {children}
    </motion.div>
  );
};

// Staggered children reveal
interface StaggerRevealProps {
  children: ReactNode;
  staggerDelay?: number;
  direction?: RevealDirection;
  className?: string;
  once?: boolean;
  amount?: number;
}

export const StaggerReveal = ({
  children,
  staggerDelay = 0.1,
  direction = "up",
  className = "",
  once = true,
  amount = 0.2,
}: StaggerRevealProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, amount });

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: 0.1,
      },
    },
  };

  const childVariants = getVariants(direction);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
      className={className}
    >
      {Array.isArray(children)
        ? children.map((child, index) => (
            <motion.div
              key={index}
              variants={childVariants}
              transition={{
                duration: 0.5,
                ease: [0.25, 0.4, 0.25, 1],
              }}
              style={{ willChange: "opacity, transform" }}
            >
              {child}
            </motion.div>
          ))
        : children}
    </motion.div>
  );
};

// Stagger individual items within a parent - for more granular control
interface StaggerItemProps {
  children: ReactNode;
  index?: number;
  className?: string;
}

export const StaggerItem = ({ children, index = 0, className = "" }: StaggerItemProps) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 30, scale: 0.95 },
        visible: { opacity: 1, y: 0, scale: 1 },
      }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.25, 0.4, 0.25, 1],
      }}
      className={className}
      style={{ willChange: "opacity, transform" }}
    >
      {children}
    </motion.div>
  );
};

// List stagger animation - for ul/ol elements
interface StaggerListProps {
  children: ReactNode;
  className?: string;
  itemClassName?: string;
  staggerDelay?: number;
  once?: boolean;
}

export const StaggerList = ({
  children,
  className = "",
  itemClassName = "",
  staggerDelay = 0.08,
  once = true,
}: StaggerListProps) => {
  const ref = useRef<HTMLUListElement>(null);
  const isInView = useInView(ref, { once, amount: 0.3 });

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 0.4,
        ease: [0.25, 0.4, 0.25, 1],
      },
    },
  };

  return (
    <motion.ul
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
      className={className}
    >
      {Array.isArray(children)
        ? children.map((child, index) => (
            <motion.li key={index} variants={itemVariants} className={itemClassName}>
              {child}
            </motion.li>
          ))
        : children}
    </motion.ul>
  );
};

// Card grid stagger - optimized for card layouts
interface StaggerGridProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  once?: boolean;
}

export const StaggerGrid = ({
  children,
  className = "",
  staggerDelay = 0.12,
  once = true,
}: StaggerGridProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, amount: 0.15 });

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: 0.1,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: 40,
      scale: 0.92,
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.4, 0.25, 1],
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
      className={className}
    >
      {Array.isArray(children)
        ? children.map((child, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              style={{ willChange: "opacity, transform" }}
            >
              {child}
            </motion.div>
          ))
        : children}
    </motion.div>
  );
};

// Text stagger - for headings and paragraphs word by word
interface StaggerTextProps {
  text: string;
  className?: string;
  wordClassName?: string;
  staggerDelay?: number;
  once?: boolean;
}

export const StaggerText = ({
  text,
  className = "",
  wordClassName = "",
  staggerDelay = 0.05,
  once = true,
}: StaggerTextProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once, amount: 0.5 });
  const words = text.split(" ");

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
      },
    },
  };

  const wordVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      rotateX: -90,
    },
    visible: { 
      opacity: 1, 
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.4,
        ease: [0.25, 0.4, 0.25, 1],
      },
    },
  };

  return (
    <motion.span
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
      className={`inline-flex flex-wrap ${className}`}
      style={{ perspective: "1000px" }}
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          variants={wordVariants}
          className={`inline-block mr-[0.25em] ${wordClassName}`}
          style={{ willChange: "opacity, transform" }}
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
};
