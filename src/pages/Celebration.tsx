import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import FloatingHearts from "@/components/FloatingHearts";
import ImageLightbox from "@/components/ImageLightbox";

import photo1 from "@/assets/photo-1.jpg";
import photo2 from "@/assets/photo-2.jpg";
import photo3 from "@/assets/photo-3.jpg";
import photo4 from "@/assets/photo-4.jpg";
import photo5 from "@/assets/photo-5.jpg";

const BASE_PHOTOS: string[] = [photo1, photo2, photo3, photo4, photo5];

// Generate varied heights for masonry effect
const getRandomHeight = () => {
  const heights = ["h-48", "h-56", "h-64", "h-72", "h-80"];
  return heights[Math.floor(Math.random() * heights.length)];
};

const Celebration = () => {
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [photoCount, setPhotoCount] = useState(15); // Start with 15 photos (3 repeats)

  // Create infinite photo array with consistent heights
  const infinitePhotos = useMemo(() => {
    const photos = [];
    for (let i = 0; i < photoCount; i++) {
      photos.push({
        src: BASE_PHOTOS[i % BASE_PHOTOS.length],
        height: getRandomHeight(),
        id: i,
      });
    }
    return photos;
  }, [photoCount]);

  // Distribute photos into columns for masonry
  const columns = useMemo(() => {
    const cols: typeof infinitePhotos[] = [[], [], []];
    infinitePhotos.forEach((photo, i) => {
      cols[i % 3].push(photo);
    });
    return cols;
  }, [infinitePhotos]);

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

  // Infinite scroll handler
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 500
      ) {
        setPhotoCount((prev) => prev + 10);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-valentine-blush via-background to-valentine-lavender flex flex-col items-center p-6 relative overflow-x-hidden">
      <FloatingHearts intensity="high" />

      <motion.div
        initial={{ scale: 0, rotate: -10 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 12, delay: 0.3 }}
        className="text-center mt-8 mb-8 relative z-10"
      >
        <h1 className="font-display text-4xl md:text-5xl font-extrabold text-primary mb-2">
          She said YES! 💖
        </h1>
        <p className="text-lg text-muted-foreground font-body mb-4">
          Happy Valentine's Day, Madhel! 🥰
        </p>
        <p className="text-base md:text-lg text-primary/80 font-body italic max-w-md">
          "Thank you love, for being the best girlfriend ever love youuuuuuuuuuuuuuuuuuu. bio ka tlga 💗"
        </p>
      </motion.div>

      {/* Pinterest-style masonry grid */}
      <div className="w-full max-w-4xl relative z-10">
        <div className="flex gap-3">
          {columns.map((column, colIndex) => (
            <div key={colIndex} className="flex-1 flex flex-col gap-3">
              {column.map((photo, i) => (
                <motion.div
                  key={photo.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * (i % 5), duration: 0.4 }}
                  whileHover={{ scale: 1.02, zIndex: 10 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setLightboxImage(photo.src)}
                  className={`${photo.height} rounded-2xl overflow-hidden shadow-lg border-2 border-valentine-rose/30 cursor-pointer hover:shadow-xl hover:border-valentine-rose/50 transition-all`}
                >
                  <img
                    src={photo.src}
                    alt={`Memory ${photo.id + 1}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </motion.div>
              ))}
            </div>
          ))}
        </div>

        {/* Loading indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex justify-center py-8"
        >
          <div className="flex gap-2">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{ y: [-5, 5, -5] }}
                transition={{
                  repeat: Infinity,
                  duration: 0.6,
                  delay: i * 0.1,
                }}
                className="w-3 h-3 rounded-full bg-primary/50"
              />
            ))}
          </div>
        </motion.div>
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="mt-8 text-center text-muted-foreground font-body text-sm relative z-10"
      >
        Made with 💗 by Mark
      </motion.p>

      <ImageLightbox
        src={lightboxImage}
        alt="Our memory"
        onClose={() => setLightboxImage(null)}
      />
    </div>
  );
};

export default Celebration;
