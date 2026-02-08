import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import FloatingHearts from "@/components/FloatingHearts";

const CONVINCING_MESSAGES = [
  { sender: "Mark", text: "Are you sure? 🥺 I already bought the chocolates..." },
  { sender: "Mark", text: "Think again... I'll bring you flowers AND chocolates 🍫💐" },
  { sender: "Mark", text: "Come onnn, you know you want to! 💗 I'll even write you a poem!" },
  { sender: "Mark", text: "There's only one right answer here 😏💝" },
];

interface ChatMessage {
  sender: string;
  text: string;
}

const NO_BUTTON_STYLES = [
  "px-6 py-3 text-base",           // Round 0: normal
  "px-5 py-2.5 text-sm",           // Round 1: slightly smaller
  "px-4 py-2 text-xs",             // Round 2: smaller + drifts
  "px-3 py-1.5 text-[10px]",       // Round 3: tiny + erratic
];

const ValentineChat = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<ChatMessage[]>([
    { sender: "Mark", text: "Hey Madhel, do you want to be my Valentine? 💕" },
  ]);
  const [round, setRound] = useState(0);
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
  const [showButtons, setShowButtons] = useState(true);

  const handleYes = useCallback(() => {
    setMessages((prev) => [
      ...prev,
      { sender: "Madhel", text: "Yes! 💖" },
      { sender: "Mark", text: "I knew you'd say yes! 🥰💕✨" },
    ]);
    setShowButtons(false);
    setTimeout(() => navigate("/celebration"), 1500);
  }, [navigate]);

  const handleNo = useCallback(() => {
    if (round >= 4) return;
    setMessages((prev) => [
      ...prev,
      { sender: "Madhel", text: "No 😅" },
      CONVINCING_MESSAGES[round],
    ]);
    setRound((r) => r + 1);

    // Randomize no button position for rounds 2+
    if (round >= 1) {
      setNoPosition({
        x: Math.random() * 120 - 60,
        y: Math.random() * 60 - 30,
      });
    }
  }, [round]);

  const handleNoHover = useCallback(() => {
    if (round >= 3) {
      setNoPosition({
        x: Math.random() * 200 - 100,
        y: Math.random() * 100 - 50,
      });
    }
  }, [round]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-valentine-blush via-background to-valentine-lavender flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <FloatingHearts />

      {/* Chat header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-center mb-4"
      >
        <h1 className="font-display text-2xl md:text-3xl font-bold text-primary">
          💌 Valentine's Chat
        </h1>
      </motion.div>

      {/* Chat container */}
      <div className="w-full max-w-md bg-card/80 backdrop-blur-sm rounded-3xl shadow-xl border border-valentine-rose/20 overflow-hidden">
        {/* Chat header bar */}
        <div className="bg-primary/10 px-5 py-3 flex items-center gap-3 border-b border-border">
          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-lg">
            💝
          </div>
          <div>
            <p className="font-display font-bold text-foreground">Mark</p>
            <p className="text-xs text-muted-foreground">Online now</p>
          </div>
        </div>

        {/* Messages */}
        <div className="p-4 space-y-3 min-h-[300px] max-h-[400px] overflow-y-auto">
          <AnimatePresence>
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: i === 0 ? 0 : 0.3, duration: 0.4 }}
                className={`flex ${msg.sender === "Mark" ? "justify-start" : "justify-end"}`}
              >
                <div
                  className={`max-w-[80%] px-4 py-2.5 rounded-2xl font-body text-sm md:text-base ${
                    msg.sender === "Mark"
                      ? "bg-secondary text-secondary-foreground rounded-bl-sm"
                      : "bg-primary text-primary-foreground rounded-br-sm"
                  }`}
                >
                  {msg.text}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Buttons */}
        {showButtons && (
          <div className="px-4 pb-5 pt-2 flex items-center justify-center gap-4 relative min-h-[80px]">
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              animate={
                round >= 4
                  ? { width: "100%", height: 64, fontSize: 24 }
                  : {}
              }
              onClick={handleYes}
              className={`bg-primary text-primary-foreground font-display font-bold rounded-full shadow-lg hover:shadow-xl transition-shadow ${
                round >= 4
                  ? "px-12 py-5 text-2xl animate-heartbeat w-full"
                  : "px-6 py-3 text-base"
              }`}
            >
              Yes! 💖
            </motion.button>

            {round < 4 && (
              <motion.button
                animate={{
                  x: noPosition.x,
                  y: noPosition.y,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                onMouseEnter={handleNoHover}
                onClick={handleNo}
                className={`bg-muted text-muted-foreground font-display font-semibold rounded-full border border-border hover:bg-muted/80 transition-colors ${NO_BUTTON_STYLES[round]}`}
              >
                No 😅
              </motion.button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ValentineChat;
