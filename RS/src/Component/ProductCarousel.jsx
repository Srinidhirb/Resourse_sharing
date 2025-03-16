import {
  Box,
  Button,
  Flex,
  Image,
  Text,
  IconButton,
  VStack,
  HStack,
  Badge,
} from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa";
import { useState } from "react";
import Tractor from "./tractor1.png";
import Tractor1 from "./tractor2.png";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
const productData = {
  Tractors: [
    { id: 1, name: "John Deere Tractor", price: "₹ 3,92,000", image: Tractor, rating: 4.5 },
    { id: 2, name: "Mahindra Tractor", price: "₹ 4,50,000", image: Tractor1, rating: 4.2 },
    { id: 3, name: "Kubota Tractor", price: "₹ 5,10,000", image: Tractor, rating: 4.8 },
    { id: 4, name: "Sonalika Tractor", price: "₹ 3,80,000", image: Tractor1, rating: 4.0 },
  ],
  Sprayers: [
    { id: 5, name: "Backpack Sprayer", price: "₹ 1,500", image: Tractor, rating: 4.3 },
    { id: 6, name: "Battery Sprayer", price: "₹ 3,200", image: Tractor1, rating: 4.6 },
    { id: 7, name: "Knapsack Sprayer", price: "₹ 2,500", image: Tractor, rating: 4.1 },
    { id: 8, name: "Hand Sprayer", price: "₹ 900", image: Tractor1, rating: 3.9 },
  ],
  Plough: [
    { id: 9, name: "Disc Plough", price: "₹ 12,000", image: Tractor, rating: 4.4 },
    { id: 10, name: "Mouldboard Plough", price: "₹ 14,500", image: Tractor1, rating: 4.7 },
    { id: 11, name: "Chisel Plough", price: "₹ 13,200", image: Tractor, rating: 4.5 },
    { id: 12, name: "Rotary Plough", price: "₹ 16,000", image: Tractor1, rating: 4.6 },
  ],
  Spade: [
    { id: 13, name: "Garden Spade", price: "₹ 800", image: Tractor, rating: 4.2 },
    { id: 14, name: "Square Spade", price: "₹ 1,200", image: Tractor1, rating: 4.0 },
    { id: 15, name: "Round Spade", price: "₹ 1,100", image: Tractor, rating: 4.3 },
    { id: 16, name: "Shovel Spade", price: "₹ 1,300", image: Tractor1, rating: 4.1 },
  ],
};

const renderStars = (rating) => {
  const fullStars = Math.floor(rating); // Count of full stars
  const hasHalfStar = rating % 1 !== 0; // Check if there's a half star
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0); // Remaining empty stars

  return (
    <HStack spacing={1}>
      {[...Array(fullStars)].map((_, i) => (
        <FaStar key={`full-${i}`} color="gold" />
      ))}
      {hasHalfStar && <FaStarHalfAlt key="half" color="gold" />}
      {[...Array(emptyStars)].map((_, i) => (
        <FaRegStar key={`empty-${i}`} color="gray" />
      ))}
    </HStack>
  );
};
const categories = ["Tractors", "Sprayers", "Plough", "Spade"];

const ProductCarousel = () => {
  const [selectedCategory, setSelectedCategory] = useState("Tractors");
  const [products, setProducts] = useState(productData[selectedCategory]);

  // Handle category selection
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setProducts(productData[category]);
  };

  return (
    <Box
      py={10}
      maxW="1500px"
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      gap={3}
      mx="auto"
      backgroundColor="#F7F7F7"
    >
      {/* Heading */}
      <Text fontSize="2xl" fontWeight="bold" textAlign="center">
        Best Selling Products
      </Text>

      {/* Category Filters */}
      <HStack
        spacing={8}
        p={2}
        justify="center"
        width="500px"
        borderRadius="full"
        backgroundColor="#EEEEEE"
        my={4}
      >
        {categories.map((category) => (
          <Button
            key={category}
            size="sm"
            px={12}
            py={5}
            onClick={() => handleCategoryChange(category)}
            borderRadius="full"
            variant="outline"
            backgroundColor={
              selectedCategory === category ? "white" : "transparent"
            }
            _hover={{ backgroundColor: "white" }}
          >
            {category}
          </Button>
        ))}
      </HStack>

      {/* Product Cards Section */}
      <Flex justify="center" maxW="1500px" gap={12} wrap="wrap">
        {products.map((product) => (
          <VStack
            key={product.id}
            bg="white"
            borderRadius="lg"
            // border="1px solid"
            spacing={3}
            minW="230px"
            align="left"
          >
            <Box
              display="flex"
              justifyContent="center"
              backgroundColor="#FAFAFA"
              width="100%"
            >
              <Image
                src={product.image}
                alt={product.name}
                boxSize="150px"
                objectFit="contain"
              />
            </Box>
            <Box p={3}>
             
              <Text fontWeight="semibold"> {selectedCategory}</Text>
              <Text fontWeight="bold" mb={1}>{product.name}</Text>
              {product.rating && renderStars(product.rating)}
              <Box
                display="flex"
                justifyContent="space-between"
                gap="4"
                alignItems="center" 
                mt={4}
              >
                <Text fontSize="sm"> Starts at {product.price}</Text>
                <IconButton
                  icon={<FaPlus  color="white"/>}
                  aria-label="Add to cart"
                  borderRadius="full"
                  backgroundColor={"black"}
                  _hover={{ backgroundColor: "black" }}
                />
              </Box>
            </Box>
          </VStack>
        ))}
      </Flex>
    </Box>
  );
};

export default ProductCarousel;
