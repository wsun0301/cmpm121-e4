import Phaser from "phaser";
import { loadSounds } from "../sounds.ts";
import { makeTextures } from "../textures.ts";

/** Generate shared assets once before starting the title scene. */
export class BootScene extends Phaser.Scene {
  constructor() {
    super("boot");
  }

  create(): void {
    if (!this.textures.exists("player")) {
      makeTextures(this);
      loadSounds(this);
    }
    this.scene.start("title");
  }
}

/** All transitions keep the original 450ms dark-purple fade. */
const fading = new WeakSet<Phaser.Scene>();
export function fadeTo(
  scene: Phaser.Scene,
  target: string,
  data?: object,
): void {
  if (fading.has(scene)) return;
  fading.add(scene);
  scene.cameras.main.fadeOut(450, 4, 2, 12);
  scene.cameras.main.once("camerafadeoutcomplete", () => {
    fading.delete(scene);
    scene.scene.start(target, data);
  });
}
