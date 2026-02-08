import { useState } from "react";
import IntroFlow from "@/pages/IntroFlow";
import ValentineChat from "@/pages/ValentineChat";

const Index = () => {
  const [introComplete, setIntroComplete] = useState(false);

  if (!introComplete) {
    return <IntroFlow onComplete={() => setIntroComplete(true)} />;
  }

  return <ValentineChat />;
};

export default Index;
