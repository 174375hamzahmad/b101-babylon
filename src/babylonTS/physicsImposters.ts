import {
  Scene,
  Engine,
  SceneLoader,
  HemisphericLight,
  Vector3,
  FreeCamera,
  CannonJSPlugin,
  MeshBuilder,
  PhysicsImpostor,
} from "@babylonjs/core";
import "@babylonjs/loaders";
import CANNON from "cannon"; //physics engine

class physicsImposters {
  scene: Scene;
  engine: Engine;

  constructor(private canvas: HTMLCanvasElement) {
    this.engine = new Engine(this.canvas, true);
    this.scene = this.CreateScene();

    this.CreateEnvironment();
    this.CreateImposters();

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
    const freeCamera = new FreeCamera(
      "camera",
      new Vector3(0, 10, -20),
      this.scene
    );
    freeCamera.setTarget(Vector3.Zero());
    freeCamera.attachControl();
    freeCamera.minZ = 0.5;

    scene.enablePhysics(
      new Vector3(0, -9.81, 0),
      new CannonJSPlugin(true, 10, CANNON)
    );

    return scene;
  }

  async CreateEnvironment(): Promise<void> {
    const { meshes } = await SceneLoader.ImportMeshAsync(
      "",
      "./models/",
      "Prototype_Level.glb",
      this.scene
    );
  }
  CreateImposters() {
    const box = MeshBuilder.CreateBox("box", { size: 2 });
    box.position = new Vector3(0, 10, 0);
    box.rotation = new Vector3(Math.PI / 4, 0, 0);

    box.physicsImpostor = new PhysicsImpostor(
      box,
      PhysicsImpostor.BoxImpostor,
      { mass: 1, restitution: 0.5 }
    );

    const ground = MeshBuilder.CreateGround("ground", {
      width: 40,
      height: 40,
    });

    ground.isVisible = false;
    ground.physicsImpostor = new PhysicsImpostor(
      ground,
      PhysicsImpostor.BoxImpostor,
      { mass: 0, restitution: 0.5 }
    );

    const sphere = MeshBuilder.CreateSphere("sphere", { diameter: 3 });
    sphere.position = new Vector3(0, 6, 0);

    sphere.physicsImpostor = new PhysicsImpostor(
      sphere,
      PhysicsImpostor.SphereImpostor,
      { mass: 1, restitution: 0.8 }
    );
  }
}
export { physicsImposters };
