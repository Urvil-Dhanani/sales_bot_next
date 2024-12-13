import { motion, AnimatePresence } from "framer-motion";
import Head from "next/head";
import { useState } from "react";
import { LiveKitRoom, RoomAudioRenderer, StartAudio } from "@livekit/components-react";
import Playground from "@/components/playground/Playground";
import { useConnection } from "@/hooks/useConnection";
import sqtlogo from "../assets/images/sqtlogo.svg";

const themeColors = ["cyan", "green", "amber", "blue", "violet", "rose", "pink", "teal"];

function ConnectionWrapper() {
  const { wsUrl, token, connect, disconnect } = useConnection();
  const [showPlayground, setShowPlayground] = useState(false);

  const handleConnect = async (shouldConnect: boolean) => {
    if (shouldConnect) {
      await connect("env");
    } else {
      await disconnect();
    }
  };

  return (
    <>
      <motion.button
        className="px-8 py-4 bg-white text-blue-600 rounded-full font-bold text-xl shadow-lg customcta" 
        onClick={() => {
          setShowPlayground(true);
          handleConnect(true);
        }}
      >
        Get Free Online Assistance!
      </motion.button>

      <AnimatePresence>
        {showPlayground && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 backdrop-filter backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-transparent w-full max-w-5xl h-[90vh] overflow-hidden rounded-2xl shadow-2xl"
            >
              <LiveKitRoom
                serverUrl={wsUrl}
                token={token}
                connect={true}
                className="w-full h-full"
              >
                <Playground
                  themeColors={themeColors}
                  onConnect={handleConnect}
                  onClose={() => {
                    setShowPlayground(false);
                    handleConnect(false);
                  }}
                />
                <RoomAudioRenderer />
                <StartAudio label="Click to enable audio playback" />
              </LiveKitRoom>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

const backgroundVariants = {
  animate: {
    background: [
      "linear-gradient(45deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%)",
      "linear-gradient(45deg, #0093E9 0%, #80D0C7 100%)",
      "linear-gradient(45deg, #8EC5FC 0%, #E0C3FC 100%)",
      "linear-gradient(45deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%)",
    ],
    transition: {
      duration: 100,
      repeat: Infinity,
      repeatType: "reverse",
    },
  },
};

export default function Home() {
  return (
    <>
      <Head>
        <title>Softqube Technologies</title>
        <meta name="description" content="Softqube Technologies - AI-powered dental assistant" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <motion.main 
        className="flex flex-col items-center justify-center min-h-screen text-white overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center"
        >  
          <img className="logimg" src={sqtlogo.src} alt="demo-image"/>
         
          {/* <img src="../assets/images/sqtlogo.svg" alt="demo-image" height={100} width={100}/> */}
          <h1 className="text-5xl font-bold mb-6">Welcome to Softqube</h1>
          <p className="text-xl mb-12 max-w-2xl mx-auto">Experience the future of dental care with our AI-powered assistant. Get instant answers and personalized advice.</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <ConnectionWrapper />
        </motion.div>
      </motion.main>
    </>
  );
}