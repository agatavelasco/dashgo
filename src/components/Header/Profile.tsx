import { Avatar, Box, Flex, Text } from "@chakra-ui/react";

interface ProfileProps {
  showProfileData?: boolean; 
}

export function Profile ({ showProfileData = true }: ProfileProps) {
  return (
    <Flex align="center">
      { showProfileData && (
        <Box mr="4" textAlign="right">
        <Text>Agata Velasco Penze</Text>
          <Text color="gray.300" fontSize="small">
            avpenze@gmail.com
          </Text>
        </Box>
      ) }
    <Avatar size="md" name="Agata Velasco" src="https://github.com/agatavelasco.png" />
  </Flex>
  );
}