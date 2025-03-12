import React, { useState, useEffect } from "react";
import {
  Box,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  Spinner,
} from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";
import Hero from "./hero.png";
import Navbar from "../Component/Navbar";
import ProductCarousel from "../Component/ProductCarousel";

function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulating an API call or resource loading
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <>
      {loading ? (
        <Box
          width="100vw"
          height="100vh"
          display="flex"
          alignItems="center"
          justifyContent="center"
          bg="white"
        >
          {/* Custom Loader */}
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
          >
            <Spinner size="xl" thickness="4px" speed="0.8s" color="blue.500" />
            <Text mt={4} fontSize="xl" fontWeight="medium" color="gray.600">
              Loading, please wait...
            </Text>
          </Box>
        </Box>
      ) : (
        <>
          <Navbar />
          <Box
            bgImage={`url(${Hero})`}
            bgSize="cover"
            width="100vw"
            bgRepeat="no-repeat"
            bgPosition="center"
            height="90vh"
            display="flex"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            color="white"
          >
            <Box>
              <Box width="700px" fontSize="6xl" fontWeight="medium">
                Streamlined Sharing For A Smarter Community
              </Box>
              <Box fontSize="lg" mt={2}>
                Share Smarter, Access Faster – Minimalist & Efficient Resource Sharing
              </Box>
              <InputGroup mt={4} width={{ base: "90%", md: "50%" }} mx="auto">
                <Input
                  placeholder="Search..."
                  bg="white"
                  color="black"
                  borderRadius="full"
                />
                <InputRightElement>
                  <IconButton
                    icon={<FaSearch />}
                    variant="ghost"
                    color="gray.600"
                  />
                </InputRightElement>
              </InputGroup>
            </Box>
          </Box>

          <Box
            display="flex"
            alignItems="center"
            gap="50px"
            justifyContent="center"
            textAlign="center"
            height="40vh"
          >
            <Text fontSize="4xl" fontWeight="semibold" width="350px" textAlign="left">
              Why <br /> Choosing Us
            </Text>

            <Box width="300px">
              <Text fontSize="2xl" textAlign="left" mb={3} fontWeight="medium">
                Smart Sharing
              </Text>
              <Text textAlign="justify" fontSize="lg">
                Access high-quality resources at an affordable price with seamless
                convenience and exclusive benefits.
              </Text>
            </Box>

            <Box width="300px">
              <Text fontSize="2xl" textAlign="left" mb={3} fontWeight="medium">
                Endless Choices
              </Text>
              <Text textAlign="justify" fontSize="lg">
                Select from a variety of resources tailored to your needs, ensuring a smooth and sharing experience.
              </Text>
            </Box>

            <Box width="300px">
              <Text fontSize="2xl" textAlign="left" mb={3} fontWeight="medium">
                Seamless Access
              </Text>
              <Text textAlign="justify" fontSize="lg">
                Get top-quality resources effortlessly at an affordable price with premium benefits.
              </Text>
            </Box>
          </Box>

          <ProductCarousel />
        </>
      )}
    </>
  );
}

export default Home;
