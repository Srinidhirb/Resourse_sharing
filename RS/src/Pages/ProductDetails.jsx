import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Image,
  Button,
  Text,
  Flex,
  Badge,
  Spinner,
} from "@chakra-ui/react";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/products/${id}`)
      .then((response) => setProduct(response.data))
      .catch((error) =>
        console.error("Error fetching product details:", error)
      );
  }, [id]);

  if (!product)
    return (
      <Flex justify="center" align="center" h="90vh">
        <Spinner size="xl" />
      </Flex>
    );

  return (
    <Box maxW="8xl" mx="auto" p={6} bg="white" borderRadius="lg" mt={10}>
      
      <Button colorScheme="gray" mb={4} onClick={() => navigate(-1)}>
        ← Back
      </Button>

   

      <Flex
        direction={{ base: "column", md: "row" }}
        alignItems="center"
        gap={6}
      >
        
        <Box flex="1">
          <Text fontSize="3xl" fontWeight="bold" mb={4}>
            {product.productName}
          </Text>
          <Badge colorScheme="blue" fontSize="lg" mb={2}>
            {product.category || "Uncategorized"}
          </Badge>
          <Text color="gray.600" mb={2}>
            {product.productDetails || "No description available."}
          </Text>
          <Text fontWeight="bold">📦 Quantity: {product.quantity}</Text>
          <Text>💰 Price: ₹{product.price}</Text>
          <Text>
            📅 Available: {new Date(product.startDate).toLocaleDateString()} -{" "}
            {new Date(product.endDate).toLocaleDateString()}
          </Text>
          <Text>📆 Days Available: {product.totalAvailableDays}</Text>
          <Text>📞 Phone: {product.phone}</Text>
          <Text>✉ Email: {product.email}</Text>
        </Box>
        <Box flex="1" display="flex" flexDirection="column" alignItems="center">
         
          <Flex justify="center" align="center" gap={6} mb={4}>
            <Button
              size="sm"
              colorScheme="gray"
              onClick={() =>
                setCurrentIndex((prev) =>
                  prev > 0 ? prev - 1 : product.images.length - 1
                )
              }
            >
              ◀
            </Button>

            <Text fontSize="lg" fontWeight="semibold">
              {`${currentIndex + 1} / ${product.images.length}`}
            </Text>

            <Button
              size="sm"
              colorScheme="gray"
              onClick={() =>
                setCurrentIndex((prev) =>
                  prev < product.images.length - 1 ? prev + 1 : 0
                )
              }
            >
              ▶
            </Button>
          </Flex>

          
          {product.images.length > 0 && (
            <Image
              src={`http://localhost:5000/${product.images[currentIndex]}`}
              alt={product.productName}
              objectFit="contain"
              borderRadius="md"
              w="full"
              h="300px"
            />
          )}

          
          <Flex mt={4} gap={2}>
            {product.images.map((img, index) => (
              <Image
                key={index}
                src={`http://localhost:5000/${img}`}
                alt={`Thumbnail ${index + 1}`}
                w="16"
                h="16"
                objectFit="cover"
                borderRadius="md"
                cursor="pointer"
                border={index === currentIndex ? "2px solid green" : "none"}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}
