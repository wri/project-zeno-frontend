import T from "prop-types";
import { Alert } from "../ui/alert";
import MessageOutWrapper from "./wrapper";

function MessageDefault({message, type}) {
  return (
    <MessageOutWrapper>
      <Alert status="warning" title={`Unsupported message type "${type}"`} />
      {message}
    </MessageOutWrapper>
  );
}

MessageDefault.propTypes = {
  message: T.string.isRequired,
  type: T.string.isRequired
};

export default MessageDefault;
