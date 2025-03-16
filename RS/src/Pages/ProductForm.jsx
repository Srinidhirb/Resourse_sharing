import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaTrash, FaCheck, FaUpload ,FaCalendarAlt  } from "react-icons/fa";
import { DateRange } from "react-date-range";
import {
  Box,
  Input,
  Select,
  Button,
  Grid,
  GridItem,
  Image,
  Text,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
   InputGroup, InputRightElement
} from "@chakra-ui/react";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import Navbar from "../Component/Navbar";

export default function ProductForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    productName: "",
    phone: "",
    email: "",
    price: "",
    quantity: "",
    category: "",
    productDetails: "",
    images: [],
  });
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [showDateRange, setShowDateRange] = useState(false);
  const dateInputRef = useRef(null);

  useEffect(() => {
    if (location.state?.formData) {
      setFormData(location.state.formData);
      setState([
        {
          startDate: new Date(location.state.formData.startDate),
          endDate: new Date(location.state.formData.endDate),
          key: "selection",
        },
      ]);
    }
  }, [location.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...formData,
      [name]: value,
    }));

    // Remove error message when user starts typing
    if (errors[name]) {
      setErrors((prevErrors) => {
        const updatedErrors = { ...prevErrors };
        delete updatedErrors[name];
        return updatedErrors;
      });
    }
  };

  const handleFileChange = (e) => {
    const newImages = [...formData.images, ...Array.from(e.target.files)];

    setFormData((prevData) => ({
      ...prevData,
      images: newImages,
    }));

    // Remove error message when an image is uploaded
    if (errors.images && newImages.length > 0) {
      setErrors((prevErrors) => {
        const updatedErrors = { ...prevErrors };
        delete updatedErrors.images;
        return updatedErrors;
      });
    }
  };

  const handleDeleteImage = (index) => {
    const updatedImages = formData.images.filter((_, i) => i !== index);
    setFormData({ ...formData, images: updatedImages });
  };

  const handleDateInputClick = () => {
    setShowDateRange(true);
  };

  const handleDateRangeChange = (item) => {
    setState([item.selection]);
    setFormData({
      ...formData,
      startDate: item.selection.startDate,
      endDate: item.selection.endDate,
    });
  };

  const handleConfirmDateRange = () => {
    setShowDateRange(false);
  };

  const calculateTotalDays = () => {
    const start = new Date(state[0].startDate);
    const end = new Date(state[0].endDate);
    const diffTime = Math.abs(end - start);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    const requiredFields = [
      "productName",
      "phone",
      "email",
      "price",
      "quantity",
      "category",
    ];

    let newErrors = {};
    requiredFields.forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = `${field} is required`;
      }
    });

    if (formData.images.length === 0) {
      newErrors["images"] = "At least one image is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    navigate("/preview", {
      state: {
        formData: {
          ...formData,
          startDate: state[0].startDate,
          endDate: state[0].endDate,
          totalAvailableDays: calculateTotalDays(),
        },
      },
    });
  };


  return (
    <>
       <Navbar defaultWhite={true} />
    <Box maxW="2xl" mt={20} mx="auto" p={6} bg="white" shadow="lg" borderRadius="lg">
      <Text fontSize="2xl" fontWeight="bold" textAlign="center" >
      Add Your Listing
      </Text>
      <Text fontSize="1xl" fontWeight="bold" textAlign="center" mb={4}>
      Fill out the form to share your resources quickly and easily.
      </Text>
      <form onSubmit={handleSubmit}>
        <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={4}>
          {/* Product Name & Phone */}
          <GridItem>
            <Input
              type="text"
              name="productName"
              placeholder="Product Name"
              value={formData.productName}
              onChange={handleChange}
              border={errors.productName ? "2px solid red" : "1px solid gray"}
            />
            {errors.productName && (
              <Text color="red.500">{errors.productName}</Text>
            )}
          </GridItem>
          <GridItem>
            <Input
              type="text"
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleChange}
              border={errors.phone ? "2px solid red" : "1px solid gray"}
            />
            {errors.phone && <Text color="red.500">{errors.phone}</Text>}
          </GridItem>

          {/* Email & Price */}
          <GridItem>
            <Input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              border={errors.email ? "2px solid red" : "1px solid gray"}
            />
            {errors.email && <Text color="red.500">{errors.email}</Text>}
          </GridItem>
          <GridItem>
            <Input
              type="number"
              name="price"
              placeholder="Price (₹)"
              value={formData.price}
              onChange={handleChange}
              border={errors.price ? "2px solid red" : "1px solid gray"}
            />
            {errors.price && <Text color="red.500">{errors.price}</Text>}
          </GridItem>

          {/* Quantity & Category */}
          <GridItem>
            <Input
              type="number"
              name="quantity"
              placeholder="Quantity"
              value={formData.quantity}
              onChange={handleChange}
              border={errors.quantity ? "2px solid red" : "1px solid gray"}
            />
            {errors.quantity && <Text color="red.500">{errors.quantity}</Text>}
          </GridItem>
          <GridItem>
            <Select
              name="category"
              placeholder="Select Category"
              value={formData.category}
              onChange={handleChange}
              border={errors.category ? "2px solid red" : "1px solid gray"}
            >
              <option value="Tractors">Tractors</option>
              <option value="Sprayers">Sprayers</option>
              <option value="Plough">Plough</option>
              <option value="Spade">Spade</option>
            </Select>
            {errors.category && <Text color="red.500">{errors.category}</Text>}
          </GridItem>

          {/* Date Selection */}
          <GridItem colSpan={2}>
  <InputGroup>
    <Input
      type="text"
      readOnly
      value={
        state[0].startDate && state[0].endDate
          ? `Available: ${state[0].startDate.toDateString()} - ${state[0].endDate.toDateString()} (${calculateTotalDays()} days)`
          : "Select Availability Dates"
      }
      onClick={handleDateInputClick}
      ref={dateInputRef}
      cursor="pointer"
    />
    <InputRightElement pointerEvents="none">
      <FaCalendarAlt  color="gray.500" />
    </InputRightElement>
  </InputGroup>
</GridItem>
          {/* Product Description */}
          <GridItem colSpan={2}>
            <Input
              type="text"
              name="productDetails"
              placeholder="Product Description"
              value={formData.productDetails}
              onChange={handleChange}
              border={
                errors.productDetails ? "2px solid red" : "1px solid gray"
              }
            />
            {errors.productDetails && (
              <Text color="red.500">{errors.productDetails}</Text>
            )}
          </GridItem>
        </Grid>

        {/* Image Upload */}
        <Box mt={4}>
          <Button
            leftIcon={<FaUpload />}
            colorScheme="blue"
            variant="outline"
            as="label"
            cursor="pointer"
          >
            Upload Images
            <input
              type="file"
              name="images"
              multiple
              onChange={handleFileChange}
              hidden
            />
          </Button>
          {errors.images && (
            <Text color="red.500" mt={1}>
              {errors.images}
            </Text>
          )}
        </Box>

        {/* Image Preview */}
        <Flex wrap="wrap" gap={2} mt={2}>
          {formData.images?.map((file, index) => (
            <Box key={index} position="relative">
              <Image
                src={URL.createObjectURL(file)}
                alt={`Preview ${index + 1}`}
                boxSize="100px"
                objectFit="cover"
                borderRadius="md"
              />
              <Button
                position="absolute"
                top="2"
                right="2"
                size="xs"
                colorScheme="red"
                onClick={() => handleDeleteImage(index)}
              >
                <FaTrash />
              </Button>
            </Box>
          ))}
        </Flex>

        {/* Date Picker Modal */}
        <Modal isOpen={showDateRange} onClose={() => setShowDateRange(false)}>
          <ModalOverlay />
          <ModalContent>
            <ModalBody p={4}>
              <DateRange
                editableDateInputs
                onChange={(item) => handleDateRangeChange(item)}
                moveRangeOnFirstSelection
                ranges={state}
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

        {/* Submit Button */}
        <Button type="submit" colorScheme="blue" width="full" mt={4}>
          Preview
        </Button>
      </form>
    </Box>
    </>
  );
}
