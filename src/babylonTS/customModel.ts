import {
  Scene,
  Engine,
  FreeCamera,
  Vector3,
  HemisphericLight,
  MeshBuilder,
  CubeTexture,
  PBRMaterial,
  Texture,
  SceneLoader,
  AbstractMesh,
  ActionManager,
  SetValueAction,
  PointerEventTypes,
} from "@babylonjs/core";
import "@babylonjs/loaders";

class customModel {
  scene: Scene;
  engine: Engine;
  portalTexture: AbstractMesh;

  constructor(private canvas: HTMLCanvasElement) {
    this.engine = new Engine(this.canvas, true);
    this.scene = this.createScene();

    this.createPortalRoomSmall();
    this.createPortalTextured(-1.5, 0, 0);
    this.createPortalTextured(1.2, 0, -1);
    this.createPortalTextured(-1.2, 0, -1);
    this.createPortalTextured(0.7, 0, -1.5);

    this.scene.onPointerObservable.add((e) => {
      if (e.type == PointerEventTypes.POINTERDOWN) {
        if (
          // (e.pickInfo.hit &&
          //   e.pickInfo.pickedMesh.id === "PortalFrame_primitive0") ||
          // e.pickInfo.pickedMesh.id === "PortalFrame_primitive1" ||
          // e.pickInfo.pickedMesh.id === "PortalBase_primitive0" ||
          // e.pickInfo.pickedMesh.id === "PortalBase_primitive1"
          e.pickInfo.hit &&
          e.pickInfo.pickedMesh.name === "ball"
        ) {
          this.engine.displayLoadingUI();
          this.scene.dispose();
          this.scene = null;
          this.scene = this.createScene2();
          this.engine.hideLoadingUI();
        }
      }
    });

    this.engine.runRenderLoop(() => {
      this.scene.render();
    });
  }

  public dispose() {
    this.scene?.getEngine().dispose();
  }
  createScene(): Scene {
    const scene = new Scene(this.engine);
    const camera = new FreeCamera("camera", new Vector3(0, 1, -5), this.scene);
    camera.attachControl();
    camera.speed = 0.25;
    camera.keysUpward = [32]; // spacebar for upward

    camera.keysDownward = [17]; // left ctrl for downward

    const envTex = CubeTexture.CreateFromPrefilteredData(
      "./environment/sky.env",
      scene
    );

    scene.environmentTexture = envTex;
    scene.createDefaultSkybox(envTex, true);
    scene.environmentIntensity = 0.5;

    const ball = MeshBuilder.CreateSphere("ball", { diameter: 1 }, this.scene);
    ball.position = new Vector3(4, 0, 0);
    return scene;
  }

  async createPortalRoomSmall(): Promise<void> {
    const models = await SceneLoader.ImportMeshAsync(
      "",
      "./models/",
      "PortalRoomSmall.glb",
      this.scene
    ).then((result) => {
      result.meshes[0].scaling.x = 3;
      result.meshes[0].scaling.y = 3;
      result.meshes[0].scaling.z = 3;
    });
  }
  async createPortalTextured(x: any, y: any, z: any): Promise<void> {
    const models = await SceneLoader.ImportMeshAsync(
      "",
      "./models/",
      "PortalTexured1.glb",
      this.scene
    ).then((result) => {
      console.log(result);
      result.meshes[0].scaling.x = 0.16;
      result.meshes[0].scaling.y = 0.16;
      result.meshes[0].scaling.z = 0.16;
      result.meshes[0].position = new Vector3(x, y, z);
      //result.meshes[0].rotation = new Vector3(2 * Math.PI * Math.random(), 2 * Math.PI * Math.random(), 2 * Math.PI * Math.random());
      this.portalTexture = result.meshes[1];

      this.portalTexture.actionManager = new ActionManager(this.scene);
      this.portalTexture.actionManager.registerAction(
        new SetValueAction(
          ActionManager.OnPickDownTrigger,
          this.portalTexture,
          "scaling",
          new Vector3(1.5, 1.5, 1.5)
        )
      );
    });
  }
  createScene2(): Scene {
    const scene = new Scene(this.engine);
    const camera = new FreeCamera("camera", new Vector3(0, 1, -5), this.scene);
    camera.attachControl();
    camera.speed = 0.25;

    const envTex = CubeTexture.CreateFromPrefilteredData(
      "./environment/xmas_bg.env",
      scene
    );

    scene.environmentTexture = envTex;
    scene.createDefaultSkybox(envTex, true);
    scene.environmentIntensity = 0.5;
    return scene;
  }
}
export { customModel };
