import React, { useEffect, useRef } from "react";
import { customModel } from "../babylonTS/customModel.ts";

const Babylonexamples = () => {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    new customModel(canvas);
  }, []);
  return (
    <div>
      <h3>Babylon examples</h3>
      <canvas ref={canvasRef}></canvas>
    </div>
  );
};

export default Babylonexamples;
