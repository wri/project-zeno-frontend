import T from "prop-types";
import { Button } from "@chakra-ui/react";

const QueryButton = ({ children, clickHandler, ...delegated }) => {
  return (
    <Button
      onClick={clickHandler}
      size="xs"
      px={4}
      borderRadius="full"
      type="button"
      borderWidth="1px"
      color="fg"
      background="linear-gradient({colors.bg} 0 0) padding-box, radial-gradient(at 0% 0%, {colors.gray.700}, {colors.gray.200} ) border-box"
      transition="all 0.24s ease-out"
      boxShadow="xs"
      _hover={{
        background:
          "linear-gradient({colors.bg} 0 0) padding-box, radial-gradient(at 0% 0%, {colors.blue.700}, {colors.lime.400} ) border-box",
      }}
      {...delegated}
    >
      {children}
    </Button>
  );
};

QueryButton.propTypes = {
  clickHandler: T.func,
  children: T.oneOfType([T.object, T.string]),
};

export default QueryButton;
