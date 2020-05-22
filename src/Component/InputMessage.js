import React from "react";

const InputMessage = ({ onChange, onKeyPress, value }) => {
  return (
    <textarea
      placeholder="Write a comment"
      className="bg-light-gray dib br3 pa2 ma3 w-90 h4"
      style={{ resize: "none" }}
      value={value}
      onChange={onChange}
      onKeyPress={onKeyPress}
    />
  );
};

export default InputMessage;
