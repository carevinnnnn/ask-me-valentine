import { useEffect } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import FloatingHearts from "@/components/FloatingHearts";

import photo1 from "@/assets/photo-1.jpg";
import photo2 from "@/assets/photo-2.jpg";
import photo3 from "@/assets/photo-3.jpg";
import photo4 from "@/assets/photo-4.jpg";
import photo5 from "@/assets/photo-5.jpg";

const PHOTOS: string[] = [photo1, photo2, photo3, photo4, photo5];

const Celebration = () => {
  useEffect(() => {
    // Fire confetti on mount
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ["#e8839b", "#c9a0dc", "#f4b6c2", "#f9e4e8"],
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ["#e8839b", "#c9a0dc", "#f4b6c2", "#f9e4e8"],
      });
      if (Date.now() < end) requestAnimationFrame(frame);
    };
    frame();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-valentine-blush via-background to-valentine-lavender flex flex-col items-center p-6 relative overflow-hidden">
      <FloatingHearts />

      <motion.div
        initial={{ scale: 0, rotate: -10 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 12, delay: 0.3 }}
        className="text-center mt-8 mb-8 relative z-10"
      >
        <h1 className="font-display text-4xl md:text-5xl font-extrabold text-primary mb-2">
          She said YES! 💖
        </h1>
        <p className="text-lg text-muted-foreground font-body">
          Happy Valentine's Day, Madhel! 🥰
        </p>
      </motion.div>

      {/* Photo collage */}
      {PHOTOS.length > 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="w-full max-w-2xl grid grid-cols-2 md:grid-cols-3 gap-3 relative z-10"
        >
          {PHOTOS.map((photo, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1 + i * 0.15 }}
              className={`rounded-2xl overflow-hidden shadow-lg border-2 border-valentine-rose/30 ${
                i === 0 ? "col-span-2 row-span-2" : ""
              }`}
            >
              <img
                src={photo}
                alt={`Memory ${i + 1}`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="w-full max-w-md bg-card/80 backdrop-blur-sm rounded-3xl p-8 text-center shadow-xl border border-valentine-rose/20 relative z-10"
        >
          <p className="text-6xl mb-4">📸</p>
          <p className="font-display font-bold text-lg text-foreground mb-2">
            Your photos will go here!
          </p>
          <p className="text-sm text-muted-foreground">
            Upload your photos and they'll appear in a beautiful collage 💕
          </p>
        </motion.div>
      )}

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="mt-8 text-center text-muted-foreground font-body text-sm relative z-10"
      >
        Made with 💗 by Mark
      </motion.p>
    </div>
  );
};

export default Celebration;
