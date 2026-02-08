import { motion } from "framer-motion";
import { useMemo } from "react";

const FloatingHearts = () => {
  const hearts = useMemo(
    () =>
      Array.from({ length: 15 }, (_, i) => ({
        id: i,
        emoji: ["💕", "💗", "💖", "💝", "🩷", "✨"][i % 6],
        left: Math.random() * 100,
        delay: Math.random() * 5,
        duration: 4 + Math.random() * 4,
        size: 14 + Math.random() * 18,
      })),
    []
  );

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((h) => (
        <motion.span
          key={h.id}
          className="absolute select-none"
          style={{
            left: `${h.left}%`,
            fontSize: h.size,
            bottom: -30,
          }}
          animate={{
            y: [0, -window.innerHeight - 60],
            opacity: [0.7, 0],
            rotate: [0, Math.random() > 0.5 ? 20 : -20],
          }}
          transition={{
            duration: h.duration,
            delay: h.delay,
            repeat: Infinity,
            ease: "easeOut",
          }}
        >
          {h.emoji}
        </motion.span>
      ))}
    </div>
  );
};

export default FloatingHearts;
