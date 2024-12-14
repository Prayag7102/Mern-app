import React from "react";
import { ClipLoader } from "react-spinners"; // Import ClipLoader or any other loader from react-spinners

const Loading = () => {
  return (
    <div className="loader-container">
      <ClipLoader color="#3498db" size={50} />
    </div>
  );
};

export default Loading;