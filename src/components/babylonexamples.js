import React, { useEffect } from "react";
import { customModel } from "../babylonTS/customModel.ts";

const Babylonexamples = () => {
  useEffect(() => {
    const canvas = document.querySelector("canvas");
    new customModel(canvas);
  });
  return (
    <div>
      <h3>Babylon examples</h3>
      <canvas></canvas>
    </div>
  );
};

export default Babylonexamples;
