import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FloatingHearts from "@/components/FloatingHearts";
import madhelProfile from "@/assets/madhel-profile.jpg";
import markProfile from "@/assets/mark-profile.jpg";

type IntroStep = "identity" | "gentleman" | "chat";

interface IntroFlowProps {
  onComplete: () => void;
}

const IntroFlow = ({ onComplete }: IntroFlowProps) => {
  const [step, setStep] = useState<IntroStep>("identity");

  return (
    <div className="min-h-screen bg-gradient-to-b from-valentine-blush via-background to-valentine-lavender flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <FloatingHearts />

      <AnimatePresence mode="wait">
        {step === "identity" && (
          <motion.div
            key="identity"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center gap-6 text-center"
          >
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="font-display text-2xl md:text-3xl font-bold text-primary"
            >
              Hey, is this you? 🤔
            </motion.h1>

            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
              className="w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden ring-4 ring-primary/30 shadow-xl"
            >
              <img
                src={madhelProfile}
                alt="Is this you?"
                className="w-full h-full object-cover"
              />
            </motion.div>

            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setStep("gentleman")}
              className="bg-primary text-primary-foreground font-display font-bold px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-shadow text-lg"
            >
              Yes, that's me! 💕
            </motion.button>
          </motion.div>
        )}

        {step === "gentleman" && (
          <motion.div
            key="gentleman"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center gap-6 text-center max-w-md"
          >
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="font-display text-xl md:text-2xl font-bold text-primary"
            >
              Oh, someone wants to talk to you... 💌
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="font-body text-lg text-muted-foreground"
            >
              Someone handsome and a real gentleman 😏✨
            </motion.p>

            <motion.div
              initial={{ scale: 0, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 1, type: "spring", stiffness: 200, damping: 15 }}
              className="w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden ring-4 ring-primary/30 shadow-xl"
            >
              <img
                src={markProfile}
                alt="A handsome gentleman"
                className="w-full h-full object-cover"
              />
            </motion.div>

            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onComplete}
              className="bg-primary text-primary-foreground font-display font-bold px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-shadow text-lg"
            >
              Let's see what he says 💗
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default IntroFlow;
