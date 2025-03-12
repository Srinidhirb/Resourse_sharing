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
const productData = {
  Tractors: [
    { id: 1, name: "John Deere Tractor", price: "₹ 3,92,000", image: Tractor },
    { id: 2, name: "Mahindra Tractor", price: "₹ 4,50,000", image: Tractor1 },
    { id: 3, name: "Kubota Tractor", price: "₹ 5,10,000", image: Tractor },
    { id: 4, name: "Sonalika Tractor", price: "₹ 3,80,000", image: Tractor1 },
  ],
  Sprayers: [
    {
      id: 5,
      name: "Backpack Sprayer",
      price: "₹ 1,500",
      image: Tractor
    },
    {
      id: 6,
      name: "Battery Sprayer",
      price: "₹ 3,200",
      image: Tractor1
    },
    {
      id: 7,
      name: "Knapsack Sprayer",
      price: "₹ 2,500",
      image: Tractor
    },
    {
      id: 8,
      name: "Hand Sprayer",
      price: "₹ 900",
      image: Tractor1
    },
  ],
  Plough: [
    {
      id: 9,
      name: "Disc Plough",
      price: "₹ 12,000",
      image: Tractor
    },
    {
      id: 10,
      name: "Mouldboard Plough",
      price: "₹ 14,500",
      image: Tractor1
    },
    {
      id: 11,
      name: "Chisel Plough",
      price: "₹ 13,200",
      image: Tractor
    },
    {
      id: 12,
      name: "Rotary Plough",
      price: "₹ 16,000",
      image: Tractor1
    },
  ],
  Spade: [
    {
      id: 13,
      name: "Garden Spade",
      price: "₹ 800",
      image: Tractor
    },
    {
      id: 14,
      name: "Square Spade",
      price: "₹ 1,200",
      image: Tractor1
    },
    {
      id: 15,
      name: "Round Spade",
      price: "₹ 1,100",
      image: Tractor
    },
    {
      id: 16,
      name: "Shovel Spade",
      price: "₹ 1,300",
      image: Tractor1
    },
  ],
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
      maxW="1200px"
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      gap={3}
      mx="auto"
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
      <Flex justify="center" maxW="1200px" gap={6} wrap="wrap">
        {products.map((product) => (
          <VStack
            key={product.id}
            p={4}
            bg="white"
            borderRadius="lg"
            border="1px solid"
            spacing={1}
            minW="250px"
            align="left"
          >
            <Box display="flex" justifyContent="center" width="100%">
              <Image
                src={product.image}
                alt={product.name}
                boxSize="150px"
                objectFit="contain"
              />
            </Box>
            <Badge colorScheme="transparent" width="auto">
              {selectedCategory}
            </Badge>
            <Text fontWeight="bold">{product.name}</Text>
            <Box
              display="flex"
              justifyContent="space-between"
              gap="4"
              alignItems="center"
            >
              <Text fontSize="sm"> Starts at {product.price}</Text>
              <IconButton
                icon={<FaPlus />}
                aria-label="Add to cart"
                borderRadius="full"
              />
            </Box>
          </VStack>
        ))}
      </Flex>
    </Box>
  );
};

export default ProductCarousel;
