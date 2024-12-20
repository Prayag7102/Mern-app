import React from "react";
import { ClipLoader } from "react-spinners";
import "../assets/stylesheets/loader.css";

const Loading = () => {

  return (
    <div className="loader-container flex justify-center items-center w-full">
      <div className="h-1 w-full bg-gray-200">
        <div className="h-1 bg-[#000080] animate-youtube-loading"></div>
      </div>
    </div>
  );
};

export default Loading;