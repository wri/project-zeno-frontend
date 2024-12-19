import "./loading.css";
import MessageOutWrapper from "./wrapper";

function Loading() {
  return (
    <MessageOutWrapper>
      <svg height="20" width="40" className="loader">
        <circle className="dot" cx="10" cy="10" r="3" style={{fill: "grey"}} />
        <circle className="dot" cx="20" cy="10" r="3" style={{fill: "grey"}} />
        <circle className="dot" cx="30" cy="10" r="3" style={{fill: "grey"}} />
      </svg>
    </MessageOutWrapper>
  );
}

export default Loading;
