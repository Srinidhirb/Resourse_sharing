import Navbar from "../Component/Navbar";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  VStack,
  Heading,
  HStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const AddListing = () => {
  const [formData, setFormData] = useState({
    productName: "",
    phone: "",
    email: "",
    price: "",
    quantity: "",
    availabilityDate: "",
    category: "",
    productDetails: "",
    images: null,
  });

  const queryClient = useQueryClient();

  const fetchListings = async () => {
    const { data } = await axios.get("http://localhost:5000/listings");
    return data;
  };

  const {
    data: listings,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["listings"],
    queryFn: fetchListings,
  });

  const addMutation = useMutation({
    mutationFn: (newListing) => {
      return axios.post("http://localhost:5000/add-listing", newListing, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["listings"]);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, updatedListing }) => {
      return axios.put(`http://localhost:5000/listing/${id}`, updatedListing, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["listings"]);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => {
      return axios.delete(`http://localhost:5000/listing/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["listings"]);
    },
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }
    addMutation.mutate(data);
    setFormData({
      productName: "",
      phone: "",
      email: "",
      price: "",
      quantity: "",
      availabilityDate: "",
      category: "",
      productDetails: "",
      images: null,
    });
  };

  const handleUpdate = (id) => {
    const updatedData = {
      productName: "Updated Product",
      // ...other fields
    };
    const data = new FormData();
    for (const key in updatedData) {
      data.append(key, updatedData[key]);
    }
    updateMutation.mutate({ id, updatedListing: data });
  };

  const handleDelete = (id) => {
    deleteMutation.mutate(id);
  };

  return (
    <>
      <Navbar defaultWhite={true} />
      <Box
        maxW="600px"
        mx="auto"
        mt={20}
        p={6}
        boxShadow="lg"
        borderRadius="md"
        overflow={"hidden"}
        bg="white"
      >
        <Heading as="h2" size="lg" textAlign="center" mb={4}>
          Add Your Listing
        </Heading>
        <Box textAlign="center" mb={6} color="gray.600">
          Fill out the form to share your resources quickly and easily.
        </Box>
        <form onSubmit={handleSubmit}>
          <VStack spacing={4} align="stretch">
            {/* First Row: Product Name & Phone */}
            <HStack spacing={4}>
              <FormControl>
                <Input
                  placeholder="Product name"
                  name="productName"
                  value={formData.productName}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl>
                <Input
                  placeholder="Phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </FormControl>
            </HStack>

            {/* Second Row: Email & Price */}
            <HStack spacing={4}>
              <FormControl>
                <Input
                  placeholder="Email address"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl>
                <Input
                  placeholder="Price"
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                />
              </FormControl>
            </HStack>

            {/* Third Row: Quantity & Availability Date */}
            <HStack spacing={4}>
              <FormControl>
                <Select
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                >
                  <option value="" disabled>
                    Quantity
                  </option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                </Select>
              </FormControl>
              <FormControl>
                <Input
                  type="date"
                  name="availabilityDate"
                  value={formData.availabilityDate}
                  onChange={handleChange}
                />
              </FormControl>
            </HStack>

            {/* Fourth Row: Category */}
            <FormControl>
              <Select
                name="category"
                value={formData.category}
                onChange={handleChange}
              >
                <option value="electronics">Electronics</option>
                <option value="furniture">Furniture</option>
                <option value="clothing">Clothing</option>
              </Select>
            </FormControl>

            {/* Fifth Row: Product Details */}
            <FormControl>
              <Textarea
                placeholder="Product details"
                name="productDetails"
                value={formData.productDetails}
                onChange={handleChange}
              />
            </FormControl>

            {/* Sixth Row: Upload Images */}
            <FormControl>
              <Input type="file" name="images" onChange={handleChange} />
            </FormControl>

            {/* Submit Button */}
            <Button type="submit" colorScheme="teal" w="full">
              Add Listing
            </Button>
          </VStack>
        </form>
      </Box>

      <Box mt={10}>
        <Heading as="h3" size="md" textAlign="center" mb={4}>
          Existing Listings
        </Heading>
        {isLoading ? (
          <Box textAlign="center">Loading...</Box>
        ) : isError ? (
          <Box textAlign="center" color="red.500">
            Error loading listings
          </Box>
        ) : (
          listings &&
          listings.map((listing) => (
            <Box key={listing._id} p={4} boxShadow="md" mb={4}>
              <Heading as="h4" size="sm">
                {listing.productName}
              </Heading>
              <Button
                onClick={() => handleUpdate(listing._id)}
                colorScheme="blue"
                mr={2}
              >
                Update
              </Button>
              <Button
                onClick={() => handleDelete(listing._id)}
                colorScheme="red"
              >
                Delete
              </Button>
            </Box>
          ))
        )}
      </Box>
    </>
  );
};

export default AddListing;
