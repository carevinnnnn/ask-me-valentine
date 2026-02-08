import { motion } from "framer-motion";
import { useMemo } from "react";

// Custom SVG heart shapes
const HeartFilled = ({ color, size }: { color: string; size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
);

const HeartOutline = ({ color, size }: { color: string; size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
);

const HeartSparkle = ({ color, size }: { color: string; size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24">
    <defs>
      <linearGradient id={`sparkle-${color}`} x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor={color} />
        <stop offset="50%" stopColor="#fff" stopOpacity="0.8" />
        <stop offset="100%" stopColor={color} />
      </linearGradient>
    </defs>
    <path
      fill={`url(#sparkle-${color})`}
      d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
    />
  </svg>
);

const HeartDouble = ({ color, size }: { color: string; size: number }) => (
  <svg width={size} height={size} viewBox="0 0 32 24" fill={color}>
    <path d="M8 14.35l-0.97-0.88C3.6 10.24 1 7.85 1 4.83 1 2.28 3.01 0.2 5.5 0.2c1.16 0 2.27.54 3 1.39C9.23.74 10.34.2 11.5.2 13.99.2 16 2.28 16 4.83c0 3.02-2.6 5.41-6.03 8.65L8 14.35z" transform="translate(0, 5)" opacity="0.7" />
    <path d="M8 14.35l-0.97-0.88C3.6 10.24 1 7.85 1 4.83 1 2.28 3.01 0.2 5.5 0.2c1.16 0 2.27.54 3 1.39C9.23.74 10.34.2 11.5.2 13.99.2 16 2.28 16 4.83c0 3.02-2.6 5.41-6.03 8.65L8 14.35z" transform="translate(14, 3)" />
  </svg>
);

const Sparkle = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="#FFD700">
    <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
  </svg>
);

type HeartType = "filled" | "outline" | "sparkle" | "double" | "emoji" | "star";

const COLORS = [
  "#e8839b", // valentine pink
  "#c9a0dc", // lavender
  "#f4b6c2", // soft pink
  "#f9e4e8", // blush
  "#ff6b9d", // hot pink
  "#d4a5ff", // light purple
  "#ffb3d9", // candy pink
];

const EMOJIS = ["💕", "💗", "💖", "💝", "🩷", "✨", "💘", "❤️‍🔥", "💓", "💞"];

interface FloatingHeartsProps {
  intensity?: "low" | "medium" | "high";
}

const FloatingHearts = ({ intensity = "medium" }: FloatingHeartsProps) => {
  const count = intensity === "low" ? 12 : intensity === "high" ? 30 : 20;

  const hearts = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        const types: HeartType[] = ["filled", "outline", "sparkle", "double", "emoji", "star"];
        const type = types[Math.floor(Math.random() * types.length)];
        const animationType = Math.floor(Math.random() * 4); // 0: float, 1: zigzag, 2: spiral, 3: pulse-float

        return {
          id: i,
          type,
          emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          left: Math.random() * 100,
          delay: Math.random() * 8,
          duration: 5 + Math.random() * 6,
          size: 16 + Math.random() * 28,
          animationType,
          startRotation: Math.random() * 360,
        };
      }),
    [count]
  );

  const getAnimation = (heart: (typeof hearts)[0]) => {
    const baseY = [0, -window.innerHeight - 100];

    switch (heart.animationType) {
      case 1: // Zigzag
        return {
          y: baseY,
          x: [0, 30, -30, 20, -20, 0],
          opacity: [0, 0.9, 0.8, 0.6, 0.3, 0],
          rotate: [0, 15, -15, 10, -10, 0],
        };
      case 2: // Spiral
        return {
          y: baseY,
          x: [0, 40, 0, -40, 0],
          opacity: [0, 0.8, 0.7, 0.4, 0],
          rotate: [0, 180, 360, 540, 720],
          scale: [0.5, 1, 1, 0.8, 0.5],
        };
      case 3: // Pulse float
        return {
          y: baseY,
          opacity: [0, 0.9, 0.7, 0.9, 0.5, 0],
          scale: [0.8, 1.2, 0.9, 1.1, 0.8, 0.6],
          rotate: [heart.startRotation, heart.startRotation + 20],
        };
      default: // Simple float
        return {
          y: baseY,
          opacity: [0, 0.8, 0.6, 0],
          rotate: [0, Math.random() > 0.5 ? 25 : -25],
          x: [0, (Math.random() - 0.5) * 60],
        };
    }
  };

  const renderHeart = (heart: (typeof hearts)[0]) => {
    switch (heart.type) {
      case "filled":
        return <HeartFilled color={heart.color} size={heart.size} />;
      case "outline":
        return <HeartOutline color={heart.color} size={heart.size} />;
      case "sparkle":
        return <HeartSparkle color={heart.color} size={heart.size} />;
      case "double":
        return <HeartDouble color={heart.color} size={heart.size} />;
      case "star":
        return <Sparkle size={heart.size * 0.7} />;
      default:
        return <span style={{ fontSize: heart.size }}>{heart.emoji}</span>;
    }
  };

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((h) => (
        <motion.div
          key={h.id}
          className="absolute select-none"
          style={{
            left: `${h.left}%`,
            bottom: -50,
          }}
          animate={getAnimation(h)}
          transition={{
            duration: h.duration,
            delay: h.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {renderHeart(h)}
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingHearts;
