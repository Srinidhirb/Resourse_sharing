import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { addDays, eachDayOfInterval } from "date-fns";
import {
  Box,
  Image,
  Button,
  Text,
  Flex,
  Badge,
  Spinner,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  HStack,
  IconButton,
} from "@chakra-ui/react";
import Navbar from "../Component/Navbar";
import { AiFillStar } from "react-icons/ai";
import { FaCheck, FaMinus, FaPlus } from "react-icons/fa";
import { CartContext } from "../Context/CartContext"; // Import Cart Context

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();
  const [showDateRange, setShowDateRange] = useState(false);
  const [dateselected, setDateselected] = useState(false);
  const [unavailableDates, setUnavailableDates] = useState([]);
  const { cart, addToCart, increaseQuantity, decreaseQuantity } =
    useContext(CartContext);
  const cartItem = cart.find((item) => item._id === id); // Find if product exists in cart

  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const handleDateInputClick = () => {
    setShowDateRange(true);
  };
  const handleConfirmDateRange = () => {
    setShowDateRange(false);
    setDateselected(true);
  };
  useEffect(() => {
    console.log("Updated Cart State:", cart);
  }, [cart]);
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/products/${id}`)
      .then((response) => setProduct(response.data))
      .catch((error) =>
        console.error("Error fetching product details:", error)
      );
  }, [id]);
  const handleDateRangeChange = (item) => {
    setState([item.selection]);
  };
  useEffect(() => {
    if (product) {
      const startDate = new Date(product.startDate); // Start Date from API
      const endDate = new Date(product.endDate); // End Date from API
      const totalAvailableDays = product.totalAvailableDays;

      // Generate all dates in the given range
      const allDates = eachDayOfInterval({ start: startDate, end: endDate });

      // Slice the available dates based on `totalAvailableDays`
      const availableDates = allDates.slice(0, totalAvailableDays);

      // Convert availableDates to timestamps for comparison
      const availableDatesSet = new Set(
        availableDates.map((date) => date.getTime())
      );

      // Filter out unavailable dates (those NOT in availableDates)
      const unavailableDates = allDates.filter(
        (date) => !availableDatesSet.has(date.getTime())
      );

      setUnavailableDates(unavailableDates);
    }
  }, [product]);

  if (!product)
    return (
      <Flex justify="center" align="center" h="90vh">
        <Spinner size="xl" />
      </Flex>
    );
  // Logs whenever cart updates

  return (
    <>
      <Navbar defaultWhite={true} />
      <Box maxW="8xl" mx="auto" p={6} bg="white" borderRadius="lg" mt={10}>
        <Button colorScheme="gray" mb={4} onClick={() => navigate(-1)}>
          ← Back
        </Button>

        <Flex direction={{ base: "column", md: "row" }} gap={6}>
          <Box flex="1" mt={10}>
            <Badge colorScheme="blue">
              {product.category || "Uncategorized"}
            </Badge>
            <Text
              fontSize="5xl"
              textTransform={"capitalize"}
              fontWeight="bold"
              mt={2}
            >
              {product.productName}
            </Text>

            <Text color="gray.600" fontSize="17px" maxW={550} mt={4}>
              {product.productDetails || "No description available."}
            </Text>

            <Flex justify="space-between" mt={4} w={550} alignItems={"center"}>
              <Text fontWeight="bold"> Quantity: {product.quantity}</Text>
              <Flex>
                {[...Array(4)].map((_, i) => (
                  <AiFillStar key={i} color="gold" size="18px" />
                ))}
                <AiFillStar color="gray.300" size="18px" />
                <Text ml={2} color="gray.500">
                  (121)
                </Text>
              </Flex>
            </Flex>

            <Button mt={4} onClick={handleDateInputClick}>
              Select Dates
            </Button>
            {dateselected && (
              <Text
                color="gray.600"
                fontWeight={"bold"}
                fontSize="17px"
                maxW={550}
                mt={4}
              >
                {state[0].startDate && state[0].endDate
                  ? `Selected dates: ${state[0].startDate.toLocaleDateString()} - ${state[0].endDate.toLocaleDateString()} (${Math.ceil(
                      (state[0].endDate - state[0].startDate) /
                        (1000 * 60 * 60 * 24)
                    )} days)`
                  : "No dates selected."}
              </Text>
            )}
            <Flex>
              <Box mt={6}>
                {cartItem ? (
                  <HStack>
                    <IconButton
                      icon={<FaMinus />}
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        decreaseQuantity(cartItem._id);
                      }}
                      
                    />
                    <Text fontWeight="bold">{cartItem.quantity}</Text>
                    <IconButton
                      icon={<FaPlus />}
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                       
                        increaseQuantity(cartItem._id);
                       
                      }}
                      isDisabled={cartItem.quantity >= product.quantity} 
                    />
                    <Button onClick={() => navigate(`/cart`)}>Go to Cart</Button>
                  </HStack>
                ) : (
                  <Button
                  mt={4}
                  colorScheme="blue"
                  onClick={() =>
                    addToCart(product, state[0].startDate, state[0].endDate)
                  }
                  isDisabled={!dateselected} // Ensure user selects dates before adding to cart
                >
                  Add to Cart
                </Button>
                
                )}
              </Box>
            </Flex>
          </Box>
          <Box
            flex="1"
            maxW="800px"
            display="flex"
            flexDirection="column"
            alignItems="center"
          >
            <div className=" gap-40 mb-4 flex items-center justify-center ">
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
            </div>

            {product.images.length > 0 && (
              <Image
                src={`http://localhost:5000/${product.images[currentIndex]}`}
                alt={product.productName}
                objectFit="contain"
                borderRadius="md"
                w="full"
                h="400px"
              />
            )}

            <Flex mt={7} gap={8}>
              {product.images.map((img, index) => (
                <Image
                  key={index}
                  src={`http://localhost:5000/${img}`}
                  alt={`Thumbnail ${index + 1}`}
                  w="24"
                  h="24"
                  objectFit="contain"
                  borderRadius="md"
                  cursor="pointer"
                  border={index === currentIndex ? "3px solid" : "2px solid"}
                  borderColor={
                    index === currentIndex ? "green.500" : "gray.300"
                  }
                  onClick={() => setCurrentIndex(index)}
                />
              ))}
            </Flex>
          </Box>
        </Flex>
      </Box>
      <Modal
        size={"sm"}
        isOpen={showDateRange}
        onClose={() => setShowDateRange(false)}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalBody p={4}>
            <DateRange
              editableDateInputs
              onChange={(item) => handleDateRangeChange(item)}
              moveRangeOnFirstSelection
              ranges={state}
              disabledDates={unavailableDates} // Disables unavailable dates
              rangeColors={["#3182CE"]} // Highlight available dates in blue
              minDate={new Date(product.startDate)} // Set minimum selectable date
              maxDate={new Date(product.endDate)} // Set maximum selectable date
            />

            <Button
              leftIcon={<FaCheck />}
              colorScheme="blue"
              onClick={handleConfirmDateRange}
              width="full"
              mt={4}
            >
              Confirm
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
