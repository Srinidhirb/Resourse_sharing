import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Box, Text, VStack, Divider } from "@chakra-ui/react";

const CheckoutPage = () => {
  const location = useLocation();
  const cart = location.state?.cart || []; // Get cart data
  const [userDetails, setUserDetails] = useState({});

  // Fetch user details based on product IDs

  console.log("Fetching user details for:", cart);

  return (
    <Box
      maxW="600px"
      mx="auto"
      mt={10}
      p={6}
      borderWidth="1px"
      borderRadius="md"
    >
      <Text fontSize="2xl" fontWeight="bold" mb={6}>
        Checkout
      </Text>

      {cart.map((item) => (
        <VStack
          key={item._id}
          spacing={3}
          align="stretch"
          p={4}
          borderWidth="1px"
          borderRadius="md"
        >
          <Text fontSize="lg" fontWeight="bold">
            {item.productName}
          </Text>
          <Text>Quantity: {item.phone}</Text>
          <Text>Quantity: {item.Address}</Text>
          <Text>Price: ₹{item.email}</Text>
          <Divider />
          <Text>Total: ₹{(item.quantity * item.price).toFixed(2)}</Text>
        </VStack>
      ))}
    </Box>
  );
};

export default CheckoutPage;
