import {
  Scene,
  Engine,
  SceneLoader,
  HemisphericLight,
  Vector3,
  FreeCamera,
} from "@babylonjs/core";
import "@babylonjs/loaders";

class FirstPersonController {
  scene: Scene;
  engine: Engine;

  constructor(private canvas: HTMLCanvasElement) {
    this.engine = new Engine(this.canvas, true);
    this.scene = this.CreateScene();
    this.CreateEnvironment();
    this.createController();

    this.engine.runRenderLoop(() => {
      this.scene.render();
    });
  }

  CreateScene(): Scene {
    const scene = new Scene(this.engine);
    const hemiLight = new HemisphericLight(
      "hemiLight",
      new Vector3(0, 1, 0),
      this.scene
    );
    scene.onPointerDown = (evt) => {
      if (evt.button === 0) this.engine.enterPointerlock();
      if (evt.button === 1) this.engine.exitPointerlock();
    };

    const fps = 60;
    const gravity = -9.81;
    scene.gravity = new Vector3(0, gravity / fps, 0);
    scene.collisionsEnabled = true;

    return scene;
  }

  async CreateEnvironment(): Promise<void> {
    const { meshes } = await SceneLoader.ImportMeshAsync(
      "",
      "./models/",
      "Prototype_Level.glb",
      this.scene
    );

    meshes.map((mesh) => {
      mesh.checkCollisions = true;
    });
  }
  createController() {
    const freeCamera = new FreeCamera(
      "camera",
      new Vector3(0, 10, 0),
      this.scene
    );
    freeCamera.attachControl();

    freeCamera.applyGravity = true;
    freeCamera.checkCollisions = true;

    freeCamera.ellipsoid = new Vector3(1, 1, 1);

    freeCamera.minZ = 0.45;
    freeCamera.speed = 0.75;
    freeCamera.angularSensibility = 4000;

    freeCamera.keysUp.push(87);
    freeCamera.keysLeft.push(65);
    freeCamera.keysDown.push(83);
    freeCamera.keysRight.push(68);
  }
}
export { FirstPersonController };
