import { Button as ChakraButton } from "@chakra-ui/react";

const colorScheme = (sucess) => {
  switch (sucess) {
    case true:
      return "whatsapp";
    case false:
      return "red";
    default:
      return "teal";
  }
};
export const Button = ({ children, sucess, ...rest }) => (
  <ChakraButton
    colorScheme={colorScheme(sucess)}
    width="100%"
    margin={2}
    {...rest}
  >
    {children}
  </ChakraButton>
);
