import React, { useContext } from "react";
import { CartContext } from "../Context/CartContext";
import {
  Box,
  Text,
  Image,
  Flex,
  Button,
  IconButton,
  Divider,
  VStack,
  HStack,
  Badge,
} from "@chakra-ui/react";
import { FaTrash, FaMinus, FaPlus } from "react-icons/fa";
import Navbar from "../Component/Navbar";

const CartPage = () => {
  const { cart, removeFromCart, increaseQuantity, decreaseQuantity } = useContext(CartContext);

  // Calculate price, discount, and total
  const price = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discount = 0.1 * price; // Example: 10% discount
  const total = price - discount;

  return (
    <>
    <Navbar defaultWhite={true} />
    <Box maxW="1200px" mx="auto" mt={20} p={6}>
      <Text fontSize="2xl" fontWeight="bold" mb={6}>
        Cart <Badge colorScheme="gray">{cart.length} ITEMS</Badge>
      </Text>

      <Flex direction={{ base: "column", md: "row" }} gap={8}>
        {/* Left: Cart Items */}
        <Box flex="2">
          {cart.length === 0 ? (
            <Text textAlign="center" fontSize="lg" color="gray.500">
              Your cart is empty
            </Text>
          ) : (
            cart.map((item) => (
              <Flex
                key={item._id}
                p={4}
                bg="white"
                borderRadius="lg"
                boxShadow="md"
                mb={4}
                align="center"
                justify="space-between"
              >
                <Flex align="center">
                  <Image
                    src={`http://localhost:5000/${item.images[0]}`}
                    alt={item.productName}
                    boxSize="90px"
                    objectFit="cover"
                    borderRadius="md"
                  />
                  <Box ml={4}>
                    <Text fontSize="lg" fontWeight="semibold">
                      {item.productName}
                    </Text>
                    <Text fontSize="md" color="gray.600">
                      ₹{item.price}
                    </Text>
                    <Text fontSize="sm" color="gray.500">
                      Duration: {item.duration} Days
                    </Text>
                  </Box>
                </Flex>

                {/* Quantity Controls */}
                <HStack>
                  <IconButton
                    icon={<FaMinus />}
                    size="sm"
                    onClick={() => decreaseQuantity(item._id)}
                    isDisabled={item.quantity === 1}
                  />
                  <Text fontWeight="bold">{item.quantity}</Text>
                  <IconButton
                    icon={<FaPlus />}
                    size="sm"
                    onClick={() => increaseQuantity(item._id)}
                    isDisabled={item.quantity >= item.availableQuantity}
                  />
                </HStack>

                {/* Remove Button */}
                <Button
                  colorScheme="red"
                  variant="ghost"
                  size="sm"
                  leftIcon={<FaTrash />}
                  onClick={() => removeFromCart(item._id)}
                >
                  Remove
                </Button>
              </Flex>
            ))
          )}
        </Box>

        {/* Right: Order Summary */}
        <Box
          flex="1"
          p={6}
          bg="white"
          borderRadius="lg"
          boxShadow="md"
          height="fit-content"
        >
          <Text fontSize="xl" fontWeight="bold" mb={4}>
            Order Summary
          </Text>
          <VStack spacing={3} align="stretch">
            <HStack justify="space-between">
              <Text>Price</Text>
              <Text fontWeight="bold">₹{price.toFixed(2)}</Text>
            </HStack>
            <HStack justify="space-between">
              <Text>Discount</Text>
              <Text fontWeight="bold" color="green.500">
                - ₹{discount.toFixed(2)}
              </Text>
            </HStack>
            <HStack justify="space-between">
              <Text>Shipping</Text>
              <Text fontWeight="bold" color="green.500">
                Free
              </Text>
            </HStack>
            <HStack justify="space-between">
              <Text>Coupon Applied</Text>
              <Text fontWeight="bold">₹0.00</Text>
            </HStack>
            <Divider />
            <HStack justify="space-between" fontSize="lg" fontWeight="bold">
              <Text>Total</Text>
              <Text>₹{total.toFixed(2)}</Text>
            </HStack>
          </VStack>

          {/* Checkout Button */}
          <Button
            width="full"
            mt={5}
            bg="#3AA39F"
            color="white"
            _hover={{ bg: "#2C7A7B" }}
          >
            Proceed to Checkout
          </Button>
        </Box>
      </Flex>
    </Box>
    </>
  );
};

export default CartPage;