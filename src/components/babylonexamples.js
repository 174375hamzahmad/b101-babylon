import React, { useEffect, useRef } from "react";
import { customLoading } from "../babylonTS/customLoading.ts";
import { MeshActions } from "../babylonTS/meshActions";
import { FirstPersonController } from "../babylonTS/firstPersonController";
import { physicsImposters } from "../babylonTS/physicsImposters";
import { CollisionsTriggers } from "../babylonTS/collisionsAndTriggers";
import { customModel } from "../babylonTS/customModel";
import { PhysicsVelocity } from "../babylonTS/physicsVelocity";
import { PhysicsForces } from "../babylonTS/physicsForces";
import { Raycasting } from "../babylonTS/raycasting";
import { basicAnimations } from "../babylonTS/basicAnimations";
import { CharacterAnimations } from "../babylonTS/characterAnimations";
import { cutScene } from "../babylonTS/cutScene";
import { animationEvents } from "../babylonTS/animationEvents";
import { AnimBlending } from "../babylonTS/animationBlending";

const Babylonexamples = () => {
  const canvasRef = useRef(null);
  // const loadingBarRef = useRef(null);
  // const percentLoadedRef = useRef(null);
  // const loaderRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    // const loadingBar = loadingBarRef.current;
    // const percentLoaded = percentLoadedRef.current;
    // const loader = loaderRef.current;
    // new customLoading(canvas, loadingBar, percentLoaded, loader);
    const cT = new animationEvents(canvas);
    return () => {
      cT.dispose();
    };
  }, []);

  return (
    <>
      {/* <div ref={loaderRef} id="loader">
        <p>Loading</p>

        <div id="loadingContainer">
          <div ref={loadingBarRef} id="loadingBar"></div>
        </div>

        <p ref={percentLoadedRef} id="percentLoaded">
          25%
        </p>
      </div> */}
      <h3>Babylonexamples</h3>
      <canvas ref={canvasRef}></canvas>
    </>
  );
};

export default Babylonexamples;
