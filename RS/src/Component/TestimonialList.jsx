import { Box, Text, Image, Avatar, Flex } from "@chakra-ui/react";

const testimonials = [
  {
    id: 1,
    name: "Bang Upin",
    profession: "Pedagang Asongan",
    review: "Terimakasih banyak, kini ruanganku menjadi lebih mewah dan terlihat mahal",
    image: "/path-to-image-1.jpg",
    avatar: "/path-to-avatar-1.jpg",
    rating: 5,
  },
  {
    id: 2,
    name: "Ibuk Sukijan",
    profession: "Ibu Rumah Tangga",
    review: "Makash Panto, aku sekarang berasa tinggal di apartment karena barang-barang yang terlihat mewah",
    image: "/path-to-image-2.jpg",
    avatar: "/path-to-avatar-2.jpg",
    rating: 4,
  },
  {
    id: 3,
    name: "Mpok Ina",
    profession: "Karyawan Swasta",
    review: "Sangat terjangkau untuk kantong saya yang tidak terlalu banyak",
    image: "/path-to-image-3.jpg",
    avatar: "/path-to-avatar-3.jpg",
    rating: 4,
  },
];

const TestimonialList = () => {
  return (
    <Box textAlign="center" py={10} px={4} maxWidth="1100px" mx="auto">
      <Text color="#E58411" fontSize="sm" textTransform="uppercase" fontWeight="bold">
        Testimonials
      </Text>
      <Text fontSize="2xl" fontWeight="bold" mt={2}>
        Our Client Reviews
      </Text>

      <Flex wrap="wrap" justify="center" my={6} gap={6}>
        {testimonials.map((testimonial) => (
          <Box
            key={testimonial.id}
            bg="white"
            borderRadius="2xl"
            boxShadow="xl"
            overflow="hidden"
            maxW="320px"
            textAlign="center"
           mb={6}
          >
            
            <Box p={6}>
              <Flex justify="center" mb={4}>
                <Avatar src={testimonial.avatar} size="lg" border="4px solid white" />
              </Flex>
              <Text fontSize="xl" fontWeight="bold">{testimonial.name}</Text>
              <Text fontSize="sm" color="gray.500">{testimonial.profession}</Text>
              <Text mt={3} fontSize="md" color="gray.700">"{testimonial.review}"</Text>
              <Flex justify="center" mt={3}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Box key={i} color={i < testimonial.rating ? "#E58411" : "gray.300"} fontSize="lg">★</Box>
                ))}
              </Flex>
            </Box>
          </Box>
        ))}
      </Flex>
    </Box>
  );
};

export default TestimonialList;
