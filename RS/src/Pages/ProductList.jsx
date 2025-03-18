import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Image,
  Text,
  Button,
  Grid,
  GridItem,
  IconButton,
  Flex,
  Spinner,
  HStack,
} from "@chakra-ui/react";
import { FaHeart, FaPlus, FaMinus } from "react-icons/fa";
import { AiFillStar } from "react-icons/ai";
import Navbar from "../Component/Navbar";
import { CartContext } from "../Context/CartContext"; // Corrected import

export default function ProductList() {
  const [products, setProducts] = useState([]); // All products
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const { cart, addToCart, increaseQuantity, decreaseQuantity } =
    useContext(CartContext); // Ensure functions exist
  const itemsPerPage = 12;
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5000/api/product")
      .then((response) => setProducts(response.data))
      .catch((error) => console.error("Error fetching products:", error))
      .finally(() => setLoading(false));
  }, []);

  const totalPages = Math.ceil(products.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = products.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page) => {
    setLoading(true);
    setTimeout(() => {
      setCurrentPage(page);
      setLoading(false);
    }, 500);
  };

  return (
    <>
      <Navbar defaultWhite={true} />
      <Box maxW="1200px" mx="auto" mt={20} p={6}>
        <Text fontSize="2xl" fontWeight="bold" textAlign="center" mb={2}>
          Results
        </Text>
        <Text fontSize="md" textAlign="center" color="gray.600" mb={6}>
          Check each product page for other buying options.
        </Text>

        {loading ? (
          <Flex justify="center" align="center" height="300px">
            <Spinner size="xl" color="blue.500" />
          </Flex>
        ) : (
          <>
            <Grid
              templateColumns={{
                base: "1fr",
                sm: "repeat(2, 1fr)",
                md: "repeat(3, 1fr)",
                lg: "repeat(4, 1fr)",
              }}
              gap={6}
            >
              {currentProducts.map((product) => {
                const cartItem = cart.find((item) => item._id === product._id);

                return (
                  <GridItem key={product._id}>
                    <Box
                      p={4}
                      bg="white"
                      borderRadius="md"
                      boxShadow="md"
                      transition="0.3s"
                      _hover={{ boxShadow: "lg" }}
                      position="relative"
                      onClick={() => navigate(`/product/${product._id}`)}
                      cursor={"pointer"}
                    >
                      {/* Wishlist Button */}
                      <IconButton
                        aria-label="Add to Wishlist"
                        icon={<FaHeart />}
                        position="absolute"
                        top={3}
                        right={3}
                        colorScheme="gray"
                        variant="ghost"
                        _hover={{ color: "red.500" }}
                      />

                      {/* Image */}
                      <Box
                        w="100%"
                        h="180px"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        bg="gray.100"
                        borderRadius="md"
                        overflow="hidden"
                      >
                        <Image
                          src={`http://localhost:5000/${product.images[0]}`}
                          alt={product.productName}
                          objectFit="cover"
                          w="100%"
                          h="100%"
                        />
                      </Box>

                      {/* Product Info */}
                      <Box mt={4} textAlign="center">
                        <Text fontSize="lg" fontWeight="semibold" color="gray.800">
                          {product.productName}
                        </Text>
                        <Text fontSize="md" fontWeight="medium" color="gray.600">
                          ₹{product.price}
                        </Text>

                        {/* Rating */}
                        <Flex justify="center" align="center" mt={2}>
                          {[...Array(4)].map((_, i) => (
                            <AiFillStar key={i} color="gold" size="18px" />
                          ))}
                          <AiFillStar color="gray.300" size="18px" />
                          <Text ml={2} color="gray.500">(121)</Text>
                        </Flex>

                        {/* Add to Cart / Quantity Controls */}
                        
                      </Box>
                    </Box>
                  </GridItem>
                );
              })}
            </Grid>
          </>
        )}
      </Box>
    </>
  );
}
