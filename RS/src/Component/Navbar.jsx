import {
    Box,
    Flex,
    Link,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    IconButton,
  } from "@chakra-ui/react";
  import { ChevronDownIcon, HamburgerIcon } from "@chakra-ui/icons";
  import { FaShoppingCart } from "react-icons/fa";
  
  const Navbar = () => {
    return (
      <Box
        bg="transparent"
        px={4}
        py={2}
      
        width="100vw"
        position="fixed"
        top="0"
        left="0"
        zIndex="1000"
        textColor="white"
      >
        <Flex
          justify="space-between"
          align="center"
          maxW="1200px"
          mx="auto"
          width="100%"
        >
          {/* Logo */}
          <Box fontSize="xl" fontWeight="bold">
            LOGO
          </Box>
  
          {/* Middle Section */}
          <Flex gap={6} display={{ base: "none", md: "flex" }}>
            <Link href="#">Home</Link>
            <Menu>
              <MenuButton as={Link} href="#">
                Category <ChevronDownIcon />
              </MenuButton>
              <MenuList
                bg="rgba(255, 255, 255, 0.15)"
                backdropFilter="blur(10px)"
                border="1px solid rgba(255, 255, 255, 0.3)"
                borderRadius="md"
                color="white"
              >
                <MenuItem   bg="transparent" _hover={{ bg: "rgba(255, 255, 255, 0.2)" }}>
                  Category 1
                </MenuItem>
                <MenuItem   bg="transparent" _hover={{ bg: "rgba(255, 255, 255, 0.2)" }}>
                  Category 2
                </MenuItem>
              </MenuList>
            </Menu>
            <Link href="#">Shop</Link>
          </Flex>
  
          {/* Right Section */}
          <Flex align="center" gap={4}>
          <Link href="#">Shop</Link>
            <IconButton icon={<FaShoppingCart />} variant="ghost" color='white' />
            
          </Flex>
          
        </Flex>
        
      </Box>
      
    );
  };
  
  export default Navbar;
  