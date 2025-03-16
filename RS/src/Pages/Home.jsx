import React, { useState, useEffect } from "react";
import {
  Box,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  Spinner,
  Center,
} from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";
import { GoArrowRight } from "react-icons/go";
import Hero from "./hero.png";
import Navbar from "../Component/Navbar";
import ProductCarousel from "../Component/ProductCarousel";
import Exp from "../Assets/exp.png";
import Res from "../Assets/res.png";
import TestimonialCarousel from "../Component/TestimonialList";
import Loader from "../Component/Loader";
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
        <>
        <Navbar defaultWhite={true} />
        <Center minH="90vh">
          <Loader />
        </Center>
        </>
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
                Share Smarter, Access Faster – Minimalist & Efficient Resource
                Sharing
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
            <Text
              fontSize="4xl"
              fontWeight="semibold"
              width="350px"
              textAlign="left"
            >
              Why <br /> Choosing Us
            </Text>

            <Box width="300px">
              <Text fontSize="2xl" textAlign="left" mb={3} fontWeight="medium">
                Smart Sharing
              </Text>
              <Text textAlign="justify" fontSize="lg">
                Access high-quality resources at an affordable price with
                seamless convenience and exclusive benefits.
              </Text>
            </Box>

            <Box width="300px">
              <Text fontSize="2xl" textAlign="left" mb={3} fontWeight="medium">
                Endless Choices
              </Text>
              <Text textAlign="justify" fontSize="lg">
                Select from a variety of resources tailored to your needs,
                ensuring a smooth and sharing experience.
              </Text>
            </Box>

            <Box width="300px">
              <Text fontSize="2xl" textAlign="left" mb={3} fontWeight="medium">
                Seamless Access
              </Text>
              <Text textAlign="justify" fontSize="lg">
                Get top-quality resources effortlessly at an affordable price
                with premium benefits.
              </Text>
            </Box>
          </Box>

          <ProductCarousel />
          <Box
            display="flex"
            alignItems="center"
            gap="150px"
            justifyContent="left"
            textAlign="left"
            maxWidth="1500px"
            width="100%"
            mt={20}
          >
            <box>
              <img src={Exp} alt="" />
            </box>
            <box
              display="flex"
              alignItems="center"
              gap={5}
              justifyContent="center"
            >
              <Text
                color={"#E58411"}
                fontSize={20}
                fontWeight={"semibold"}
                textTransform="capitalize"
              >
                experiences
              </Text>
              <Text
                fontSize={42}
                mt={3}
                width="400px"
                lineHeight={1.3}
                overflow={"hidden"}
              >
                We Provide You The Best Experience
              </Text>
              <Text width="500px" mt={4}>
                You don’t have to worry about the quality because all resources
                are curated by experts in their fields, ensuring a seamless,
                reliable, and high-quality sharing experience.
              </Text>
              <Text
                color={"#E58411"}
                mt={5}
                fontWeight={"semibold"}
                display="flex"
                alignItems="center"
                gap={3}
              >
                More Info <GoArrowRight size="20px" />{" "}
              </Text>
            </box>
          </Box>
          <Box
            display="flex"
            alignItems="center"
            gap="150px"
            justifyContent="right"
            textAlign="left"
            width="1500px"
            mt={20}
          >
            <box
              display="flex"
              alignItems="center"
              gap={5}
              justifyContent="center"
            >
              <Text
                color={"#E58411"}
                fontSize={20}
                fontWeight={"semibold"}
                textTransform="capitalize"
              >
                Resources
              </Text>
              <Text
                fontSize={42}
                mt={3}
                width="400px"
                lineHeight={1.3}
                overflow={"hidden"}
              >
                High-quality resources for seamless sharing.
              </Text>
              <Text width="500px" mt={4}>
                We carefully curate valuable materials from trusted sources,
                ensuring premium quality and accessibility—all at an affordable
                cost.
              </Text>
              <Text
                color={"#E58411"}
                mt={5}
                fontWeight={"semibold"}
                display="flex"
                alignItems="center"
                gap={3}
              >
                More Info <GoArrowRight size="20px" />{" "}
              </Text>
            </box>
            <box>
              <img src={Res} alt="" />
            </box>
          </Box>
          <TestimonialCarousel />
        </>
      )}
    </>
  );
}

export default Home;
