import React, { useState, useEffect } from "react";
import { Box, Center, VStack, Heading, Text } from "@chakra-ui/react";
import { motion } from "framer-motion"; // Import Framer Motion
import Lottie from "react-lottie-player";
import OrderPlaced from "../Component/OrderPlaced";
import successAnimation from "../assets/success-animation.json"; // Google Pay-style animation JSON
import Navbar from "../Component/Navbar";
import { useLocation } from "react-router-dom";

const MotionBox = motion(Box); // Motion wrapper for animations

const OrderPage = () => {
  const location = useLocation();
  const { title = "Congratulations", message = "Your Listing has been Successfully Added." } = location.state || {}; // Destructure the passed props

  const [showSuccess, setShowSuccess] = useState(false);
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    // Show success animation after 4 seconds
    const timer = setTimeout(() => {
      setShowSuccess(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Navbar defaultWhite={true} />
      <Center minH="100vh" bg="white">
        {!showSuccess ? (
          <OrderPlaced /> // Show Loader
        ) : (
          <MotionBox
            p={6}
            borderRadius="lg"
            textAlign="center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <VStack spacing={3}>
              {/* Google Pay-style Success Animation */}
              <Lottie
                loop={false}
                play
                animationData={successAnimation}
                style={{ width: 150, height: 150 }}
                onComplete={() => setShowText(true)} // Show text after animation completes
              />

              {/* Smooth transition for text */}
              {showText && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                >
                  <Heading size="lg" mb={3} color="gray.800">
                    {title}
                  </Heading>
                  <Text color="gray.600">{message}</Text>
                </motion.div>
              )}
            </VStack>
          </MotionBox>
        )}
      </Center>
    </>
  );
};

export default OrderPage;