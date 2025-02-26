

import Markdown from "react-markdown";
import T from "prop-types";

export default function TextWidget({ data }) {
  return <Markdown>{data}</Markdown>;
}

TextWidget.propTypes = {
  data: T.string.isRequired,
};



