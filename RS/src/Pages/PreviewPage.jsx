import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaTrash } from "react-icons/fa";
import { ErrorBoundary } from "react-error-boundary";
import {
  Box,
  Image,
  Button,
  Text,
  Flex,
  Badge,
  IconButton,
} from "@chakra-ui/react";
import { useEffect, useState, useRef } from "react";
import Loader from "../Component/Loader";
import Navbar from "../Component/Navbar";

function ErrorFallback({ error }) {
  return (
    <Box textAlign="center" mt={10} color="red.500">
      <Text fontWeight="bold">Something went wrong:</Text>
      <Text>{error.message}</Text>
    </Box>
  );
}

export default function PreviewPage() {
  const location = useLocation();

  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();
  const { formData } = location.state || {};
  const [selectedImage, setSelectedImage] = useState(
    formData.images?.[0] || null
  );

  if (!formData)
    return (
      <Text textAlign="center" mt={10}>
        No data available
      </Text>
    );

  const handleConfirm = async () => {
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === "images") {
        formData.images.forEach((file) => data.append("images", file));
      } else {
        data.append(key, formData[key]);
        
      }
    });
    try {
      await axios.post("http://localhost:5000/api/products", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    
      navigate("/orderpage");
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product");
    }
  };

  const handleDeleteImage = (index) => {
    const updatedImages = formData.images.filter((_, i) => i !== index);
    navigate("/AddListing", {
      state: { formData: { ...formData, images: updatedImages } },
    });
  };

  const calculateTotalPrice = () => {
    const totalDays = Math.ceil(
      (new Date(formData.endDate) - new Date(formData.startDate)) /
        (1000 * 60 * 60 * 24)
    );
    const perDayPrice = parseFloat(formData.perDayPrice) || 0;
    const perWeekPrice = parseFloat(formData.perWeekPrice) || 0;

    let totalPrice;
    if (totalDays < 7) {
      totalPrice = totalDays * perDayPrice;
    } else {
      totalPrice =
        Math.floor(totalDays / 7) * perWeekPrice +
        (totalDays % 7) * perDayPrice;
    }

    return { totalPrice, totalDays };
  };

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulating an API call or resource loading
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);
  const { totalPrice, totalDays } = calculateTotalPrice();
  console.log(formData);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Navbar defaultWhite={true} />
          <Box maxW="9xl" mx="auto" p={6} bg="white" borderRadius="lg" mt={14}>
            <Text fontSize="xl" fontWeight="bold" textAlign="center">
              Product Preview
            </Text>
            <ErrorBoundary FallbackComponent={ErrorFallback}>
              <Flex
                direction={{ base: "column", md: "row" }}
                alignItems={"start"}
                gap={6}
                mt={4}
              >
                {/* Image Gallery */}
                <Box
                  flex="1"
                  maxW="800px"
                  display={"flex"}
                  flexDirection="column"
                  alignItems={"center"}
                >
                  <div className=" gap-40 mb-4 flex items-center justify-center ">
                    <button
                      onClick={() =>
                        setCurrentIndex((prev) =>
                          prev > 0 ? prev - 1 : formData.images.length - 1
                        )
                      }
                      className="   bg-gray-500 text-white "
                    >
                      ◀
                    </button>
                    <span className="text-center text-lg flex items-center justify-center font-semibold ">
                      {`${currentIndex + 1} / ${formData.images.length}`}
                    </span>

                    <button
                      onClick={() =>
                        setCurrentIndex((prev) =>
                          prev < formData.images.length - 1 ? prev + 1 : 0
                        )
                      }
                      className="  bg-gray-500 text-white"
                    >
                      ▶
                    </button>
                  </div>

                  {selectedImage && (
                    <Image
                      src={URL.createObjectURL(formData.images[currentIndex])}
                      alt="Main Preview"
                      objectFit="contain"
                      borderRadius="md"
                      w="full"
                      h="400px"
                    />
                  )}
                  <Flex mt={7} gap={8}>
                    {formData.images.map((file, index) => (
                      <Box key={index} position="relative">
                        <Image
                          key={index}
                          src={URL.createObjectURL(file)}
                          alt={`Thumbnail ${index + 1}`}
                          w="24"
                          h="24"
                          objectFit="contain"
                          borderRadius="md"
                          cursor="pointer"
                          border={
                            index === currentIndex ? "3px solid" : "2px solid"
                          }
                          borderColor={
                            index === currentIndex ? "green.500" : "gray.300"
                          }
                          onClick={() => setCurrentIndex(index)}
                        />
                      </Box>
                    ))}
                  </Flex>
                </Box>
                {/* Product Details */}
                <Box flex="1">
                  <Badge colorScheme="blue">
                    {formData.category || "Uncategorized"}
                  </Badge>
                  <Text
                    fontSize="5xl"
                    textTransform={"capitalize"}
                    fontWeight="bold"
                    mt={2}
                  >
                    {formData.productName || "Product Name"}
                  </Text>
                  <Text color="gray.600" fontSize="17px" maxW={550} mt={4}>
                    {formData.productDetails || "No description available."}
                  </Text>

                  <Text fontWeight="bold" mt={4}>
                    Quantity: {formData.quantity || "N/A"}
                  </Text>
                  <Text fontWeight="semibold" mt={2}>
                    Availability Dates:{" "}
                    {new Date(formData.startDate).toLocaleDateString()} -{" "}
                    {new Date(formData.endDate).toLocaleDateString()} (
                    {Math.floor(
                      (new Date(formData.endDate) -
                        new Date(formData.startDate)) /
                        (1000 * 60 * 60 * 24)
                    )}{" "}
                    Days)
                  </Text>
                  <Text mt={2} fontWeight="semibold">
                    Phone: {formData.phone}
                  </Text>
                  <Text mt={2} fontWeight="semibold">
                    Email: {formData.email}
                  </Text>
                  <Text fontWeight="bold" mt={4}>
                    Price per Day: ₹{formData.perDayPrice || "N/A"}
                  </Text>
                  <Text fontWeight="bold" mt={2}>
                    Price per Week: ₹{formData.perWeekPrice || "N/A"}
                  </Text>
                  <Text fontWeight="bold" mt={4}>
                    Total Price: ₹{totalPrice} ({totalDays} days)
                  </Text>

                  <Flex
                    width={450}
                    gap={3}
                    mt={6}
                    justifyContent={"end"}
                    alignItems={"center"}
                  >
                    <Button
                      bg="white"
                      width={100}
                      color="black"
                      border="2px solid black"
                      _hover={{ bg: "gray.100" }}
                      onClick={() =>
                        navigate("/AddListing", { state: { formData } })
                      }
                    >
                      Edit
                    </Button>

                    <Button
                      width={130}
                      bg={"#3AA39F"}
                      color={"white"}
                      border="2px solid black"
                      onClick={handleConfirm}
                      _hover={{ bg: "#9BE8E5", color: "black" }}
                      transition={"all 0.3s"}
                    >
                      Confirm
                    </Button>
                  </Flex>
                </Box>
              </Flex>
            </ErrorBoundary>
          </Box>
        </>
      )}
    </>
  );
}