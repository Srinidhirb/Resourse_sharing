import {
  Box,
  Flex,
  IconButton,
} from "@chakra-ui/react";
import { FaShoppingCart } from "react-icons/fa";
import { useState, useEffect } from "react";
import { Outlet, Link } from "react-router-dom";
const Navbar = ({ defaultWhite = false }) => {
  const [scroll, setScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScroll(window.scrollY > 60);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const bgColor = defaultWhite || scroll ? "white" : "transparent";
  const textColor = defaultWhite || scroll ? "black" : "white";
  const boxShadow = defaultWhite || scroll ? "md" : "none";

  return (
    <Box
      bg={bgColor}
      boxShadow={boxShadow}
      transition="background 0.3s ease-in-out, box-shadow 0.3s ease-in-out"
      px={4}
      py={2}
      width="100vw"
      position="fixed"
      top="0"
      left="0"
      zIndex="1000"
      textColor={textColor}
    >
      <Flex
        justify="space-between"
        align="center"
        maxW="1200px"
        mx="auto"
        width="100%"
      >
        {/* Logo */}
        <Box fontSize="xl" fontWeight="bold">
          LOGO
        </Box>

        {/* Middle Section */}
        <Flex gap={6} display={{ base: "none", md: "flex" }}>
          <Link to="/" _hover={{ textDecoration: "none", color: textColor }}>
            Home
          </Link>
          <Link to="/ProductList" _hover={{ textDecoration: "none", color: textColor }}>
            Shop
          </Link>
        </Flex>

        {/* Right Section */}
        <Flex align="center" gap={4}>
          <Link to="/AddListing" _hover={{ textDecoration: "none", color: textColor }}>
            Add Listing
          </Link>
          <IconButton
            icon={<FaShoppingCart />}
            variant="ghost"
            _hover={{ backgroundColor: "transparent" }}
            color={textColor}
          />
        </Flex>
      </Flex>
    </Box>
  );
};

export default Navbar;
