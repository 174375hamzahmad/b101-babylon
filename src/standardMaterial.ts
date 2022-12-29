import {
  Scene,
  FreeCamera,
  Vector3,
  HemisphericLight,
  MeshBuilder,
  StandardMaterial,
  Texture,
} from "@babylonjs/core";
import { Engine } from "@babylonjs/core/Engines";

class standardMaterial {
  scene: Scene;
  engine: Engine;

  constructor(private canvas: HTMLCanvasElement) {
    this.engine = new Engine(this.canvas, true);
    this.scene = this.createScene();

    this.engine.runRenderLoop(() => {
      this.scene.render();
    });
  }

  createScene(): Scene {
    const scene = new Scene(this.engine);
    const camera = new FreeCamera("camera", new Vector3(0, 1, -5), this.scene);
    camera.attachControl();
    camera.speed = 0.25;
    const hemiLight = new HemisphericLight(
      "hemiLight",
      new Vector3(0, 1, 0),
      this.scene
    );

    hemiLight.intensity = 1;

    const ground = MeshBuilder.CreateGround(
      "ground",
      {
        width: 10,
        height: 10,
      },
      this.scene
    );

    const ball = MeshBuilder.CreateSphere("ball", { diameter: 1 }, this.scene);
    ball.position = new Vector3(0, 1, 0);

    ground.material = this.createGroundMaterial();
    ball.material = this.createBallMaterial();

    return scene;
  }

  createGroundMaterial(): StandardMaterial {
    const uvScale = 4;
    const texArray: Texture[] = [];
    const groundMat = new StandardMaterial("groundMat", this.scene);

    const diffuseTex = new Texture(
      "./textures/stone/cobblestone_05_diff_1k.jpg",
      this.scene
    );
    groundMat.diffuseTexture = diffuseTex;
    texArray.push(diffuseTex);

    const normalTex = new Texture(
      "./textures/stone/cobblestone_05_nor_gl_1k.jpg",
      this.scene
    );
    groundMat.bumpTexture = normalTex;
    texArray.push(normalTex);

    const aoTex = new Texture(
      "./textures/stone/cobblestone_05_ao_1k.jpg",
      this.scene
    );

    groundMat.ambientTexture = aoTex;
    texArray.push(aoTex);

    const specTex = new Texture(
      "./textures/stone/cobblestone_05_ao_1k.jpg",
      this.scene
    );
    groundMat.specularTexture = specTex;
    texArray.push(specTex);

    texArray.forEach((tex: Texture) => {
      tex.uScale = uvScale;
      tex.vScale = uvScale;
    });

    return groundMat;
  }

  createBallMaterial(): StandardMaterial {
    const ballMat = new StandardMaterial("ballMat", this.scene);
    const uvScale = 1;
    const texArray: Texture[] = [];
    const diffuseTex = new Texture(
      "./textures/metal/metal_plate_diff_1k.jpg",
      this.scene
    );
    ballMat.diffuseTexture = diffuseTex;
    texArray.push(diffuseTex);

    const normalTex = new Texture(
      "./textures/metal/metal_plate_nor_gl_1k.jpg",
      this.scene
    );
    ballMat.bumpTexture = normalTex;
    ballMat.invertNormalMapX = true;
    ballMat.invertNormalMapY = true;
    texArray.push(normalTex);

    const aoTex = new Texture(
      "./textures/metal/metal_plate_ao_1k.jpg",
      this.scene
    );

    ballMat.ambientTexture = aoTex;
    texArray.push(aoTex);

    const specTex = new Texture(
      "./textures/metal/metal_plate_spec_1k.jpg",
      this.scene
    );
    ballMat.specularTexture = specTex;
    ballMat.specularPower = 10;
    texArray.push(specTex);

    texArray.forEach((tex: Texture) => {
      tex.uScale = uvScale;
      tex.vScale = uvScale;
    });

    return ballMat;
  }
}
export { standardMaterial };