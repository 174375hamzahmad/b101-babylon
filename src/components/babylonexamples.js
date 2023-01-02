import React, { useEffect, useRef } from "react";
import { lightShadows } from "../babylonTS/lightsShadows.ts";

const Babylonexamples = () => {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    new lightShadows(canvas);
  }, []);
  return (
    <div>
      <h3>Babylon examples</h3>
      <canvas ref={canvasRef}></canvas>
    </div>
  );
};

export default Babylonexamples;
