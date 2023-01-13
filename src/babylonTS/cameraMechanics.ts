import {
  Scene,
  Engine,
  Vector3,
  CubeTexture,
  SceneLoader,
  AbstractMesh,
  ArcRotateCamera,
  MeshBuilder,
  EngineStore,
} from "@babylonjs/core";
import "@babylonjs/loaders";

import {
  AdvancedDynamicTexture,
  Ellipse,
  Line,
  Rectangle,
  TextBlock,
} from "@babylonjs/gui";

class CameraMechanics {
  scene: Scene;
  engine: Engine;
  watch: AbstractMesh | undefined;
  camera: ArcRotateCamera | undefined;

  constructor(private canvas: HTMLCanvasElement) {
    this.engine = new Engine(this.canvas, true);

    this.scene = this.CreateScene();
    // this.engine.displayLoadingUI();

    this.CreateCamera();

    this.CreateWatch();
    // EngineStore._LastCreatedScene = this.scene;
    // EngineStore.Instances.push(this.engine);

    this.engine.runRenderLoop(() => {
      this.scene.render();
    });
  }

  public dispose() {
    this.scene?.getEngine().dispose();
  }

  CreateScene(): Scene {
    const scene = new Scene(this.engine);

    const envTex = CubeTexture.CreateFromPrefilteredData(
      "./environment/xmas_bg.env",
      scene
    );

    envTex.gammaSpace = false;

    envTex.rotationY = Math.PI;

    scene.environmentTexture = envTex;

    scene.createDefaultSkybox(envTex, true, 1000, 0.25);

    return scene;
  }

  CreateCamera(): void {
    this.camera = new ArcRotateCamera(
      "camera",
      -Math.PI / 2,
      Math.PI / 2,
      5,
      Vector3.Zero(),
      this.scene
    );

    this.camera.attachControl(this.canvas, true);
    this.camera.wheelPrecision = 100;

    this.camera.minZ = 0.3;

    this.camera.lowerRadiusLimit = 1;
    this.camera.upperRadiusLimit = 5;

    this.camera.panningSensibility = 0;

    //this.camera.useBouncingBehavior = true;

    // this.camera.useAutoRotationBehavior = true;

    // this.camera.autoRotationBehavior!.idleRotationSpeed = 0.5;
    // this.camera.autoRotationBehavior!.idleRotationSpinupTime = 1000;
    // this.camera.autoRotationBehavior!.idleRotationWaitTime = 2000;
    // this.camera.autoRotationBehavior!.zoomStopsAnimation = true;

    //this.camera.useFramingBehavior = true;

    // this.camera.framingBehavior!.radiusScale = 2;

    // this.camera.framingBehavior!.framingTime = 4000;
  }

  async CreateWatch(): Promise<void> {
    const { meshes } = await SceneLoader.ImportMeshAsync(
      "",
      "./models/",
      "vintage_watch.glb"
    );

    // console.log("meshes", meshes);

    this.watch = meshes[0];
    this.camera?.setTarget(meshes[3]);

    // GUI
    var advancedTexture = AdvancedDynamicTexture.CreateFullscreenUI(
      "UI",
      true,
      this.scene
    );

    var rect1 = new Rectangle();
    rect1.width = 0.4;
    rect1.height = "50px";
    rect1.cornerRadius = 20;
    rect1.color = "Orange";
    rect1.thickness = 4;
    rect1.background = "green";

    advancedTexture.addControl(rect1);
    rect1.linkWithMesh(this.watch);
    rect1.linkOffsetY = -140;

    var label = new TextBlock();
    label.text = "Avventura Vintage Gold Pocket Watch \n $1195";
    rect1.addControl(label);
    rect1.name = label.text;

    rect1.onPointerUpObservable.add(() => {
      alert(rect1.name);
    });

    // var target = new Ellipse();
    // target.width = "40px";
    // target.height = "40px";
    // target.color = "Orange";
    // target.thickness = 4;
    // target.background = "green";
    // advancedTexture.addControl(target);
    // target.linkWithMesh(this.watch);

    // var line = new Line();
    // line.lineWidth = 4;
    // line.color = "Orange";
    // line.y2 = 20;
    // line.linkOffsetY = -20;
    // advancedTexture.addControl(line);
    // line.linkWithMesh(this.watch);
    // line.connectedControl = rect1;

    //this.engine.hideLoadingUI();
  }
}

export { CameraMechanics };
