import React, { useContext, useState } from "react";
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
  Tooltip,
} from "@chakra-ui/react";
import { FaTrash, FaMinus, FaPlus } from "react-icons/fa";
import { IoInformationCircleOutline } from "react-icons/io5";
import Navbar from "../Component/Navbar";
import { useNavigate } from "react-router-dom";
const CartPage = () => {
  const { cart, removeFromCart, increaseQuantity, decreaseQuantity } =
    useContext(CartContext);
  const [isCheckout, setIsCheckout] = useState(false);

  const navigate = useNavigate();
  // Function to calculate correct price per item
  const calculateItemPrice = (item) => {
    if (!item.startDate || !item.endDate) return 0; // Ensure dates exist

    const start = new Date(item.startDate);
    const end = new Date(item.endDate);
    const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24)); // Calculate selected days

    const weeks = Math.floor(days / 7);
    const extraDays = days % 7;
    const weeklyCost = weeks * item.perWeekPrice;
    const dailyCost = extraDays * item.perDayPrice;

    return weeklyCost + dailyCost; // Correct price calculation
  };

  // Calculate cart total
  const price = cart.reduce(
    (acc, item) => acc + calculateItemPrice(item) * item.quantity,
    0
  );
  const discount = 0.1 * price;
  const total = price - discount;

  return (
    <>
      <Navbar defaultWhite={true} />
      <Box maxW="1200px" mx="auto" mt={20} p={6}>
        {isCheckout ? (
          <Text fontSize="2xl" fontWeight="bold" mb={6}>
            Owner Details :
          </Text>
        ) : (
          <Text fontSize="2xl" fontWeight="bold" mb={6}>
            Cart <Badge colorScheme="gray">{cart.length} ITEMS</Badge>
          </Text>
        )}

        <Flex direction={{ base: "column", md: "row" }} gap={8}>
          {/* Left: Cart Items */}
          {isCheckout ? (
            <Box mt={10} flex="3" p={6}>
              {cart.map((item) => (
                <>
                  <Flex>
                    <VStack
                      align="start"
                      spacing={3}
                      p={4}
                      borderWidth="1px"
                      borderRadius="md"
                    >
                      <Text>Owner's Name: {item.Username}</Text>
                      <Text>Phone: {item.phone}</Text>
                      <Text>Address: {item.Address}</Text>
                      <Text>Email: {item.email}</Text>
                      <Button
                        colorScheme="blue"
                        onClick={() =>
                          window.open(
                            `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                              item.Address
                            )}`,
                            "_blank"
                          )
                        }
                      >
                        Open Maps
                      </Button>
                    </VStack>
                    <iframe
                      width="50%"
                      height="250px"
                      style={{ borderRadius: "8px" }}
                      src={`https://maps.google.com/maps?q=${encodeURIComponent(
                        item.Address
                      )}&output=embed`}
                      allowFullScreen
                    ></iframe>
                  </Flex>
                </>
              ))}

              <Box flex="1"></Box>
            </Box>
          ) : (
            <Box flex="2">
              {cart.length === 0 ? (
                <Text textAlign="center" fontSize="lg" color="gray.500">
                  Your cart is empty
                </Text>
              ) : (
                cart.map((item) => {
                  const itemTotalPrice =
                    calculateItemPrice(item) * item.quantity;
                  return (
                    <Flex
                      key={item._id}
                      p={4}
                      bg="white"
                      borderRadius="lg"
                      boxShadow="md"
                      mb={4}
                      justify="space-between"
                    >
                      <Flex align="center">
                        <Image
                          src={`http://localhost:5000/${item.images[0]}`}
                          alt={item.productName}
                          boxSize="90px"
                          height={40}
                          width={40}
                          objectFit="contain"
                          borderRadius="md"
                        />
                        <Flex ml={4} flexDirection={"column"} gap={2}>
                          <Text fontSize="lg" fontWeight="semibold">
                            {item.productName}
                          </Text>

                          <Flex fontSize="sm" color="gray.500">
                            Duration:{" "}
                            <Text fontWeight="bold" color={"black"}>
                              {Math.ceil(
                                (new Date(item.endDate) -
                                  new Date(item.startDate)) /
                                  (1000 * 60 * 60 * 24)
                              )}{" "}
                              Days
                            </Text>
                          </Flex>
                          <HStack>
                            <HStack border={"1px solid gray"} borderRadius="md">
                              <IconButton
                                icon={<FaMinus />}
                                size="md"
                                backgroundColor={"transparent"}
                                onClick={() => decreaseQuantity(item._id)}
                                isDisabled={item.quantity <= 1}
                              />
                              <Text fontWeight="bold" mx={3}>
                                {item.quantity}
                              </Text>
                              <IconButton
                                icon={<FaPlus />}
                                size="md"
                                backgroundColor={"transparent"}
                                onClick={() => increaseQuantity(item._id)}
                                isDisabled={
                                  item.quantity >= item.totalAvailableDays
                                } // Restrict to available stock
                              />
                            </HStack>
                            <Button
                              colorScheme="red"
                              variant="ghost"
                              size="sm"
                              leftIcon={<FaTrash />}
                              onClick={() => removeFromCart(item._id)}
                            >
                              Remove
                            </Button>
                          </HStack>
                        </Flex>
                      </Flex>
                      <Flex
                        alignItems={"center"}
                        gap={2}
                        fontSize="md"
                        mt={4}
                        fontWeight="bold"
                      >
                        ₹{itemTotalPrice.toFixed(2)}
                        <Tooltip
                          hasArrow
                          label={`₹${item.perDayPrice} / day | ₹${item.perWeekPrice} / week`}
                          bg="gray.300"
                          color="black"
                          placement="top"
                        >
                          <IoInformationCircleOutline />
                        </Tooltip>
                      </Flex>

                      {/* Quantity Controls with Restriction */}

                      {/* Remove Button */}
                    </Flex>
                  );
                })
              )}
            </Box>
          )}
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
            {isCheckout ? (
              <Button
              width="full"
              mt={5}
              bg="#3AA39F"
              color="white"
              _hover={{ bg: "#2C7A7B" }}
              onClick={() => navigate("/orderpage", { state: { title: "Order Placed", message: "Your order has been successfully placed." } })} 
            >
              Place Order
            </Button>
            ) : (
              <Button
                width="full"
                mt={5}
                bg="#3AA39F"
                color="white"
                _hover={{ bg: "#2C7A7B" }}
                onClick={() => setIsCheckout(true)}
              >
                Proceed to Checkout
              </Button>
            )}
            
            
          </Box>
        </Flex>
      </Box>
    </>
  );
};

export default CartPage;
