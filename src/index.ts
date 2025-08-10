import { array } from "./utils/array";
import { image } from "./utils/image";
import { isPress } from "./utils/keyboard";
import { looper } from "./utils/looper";
import { rand, randInt } from "./utils/rand";

const can = document.querySelector('canvas');
const ctx = can.getContext('2d');

const assets = {
  cat: {
    run: image('/cat/run.png'),
    jump: image('/cat/jump.png'),
    fall: image('/cat/fall.png')
  },
  clouds: array(8, (i) => image(`/cloud/${i}.png`)),
  rocks: image('/rocks.png')
};

can.width = 600;
can.height = 300;
ctx.imageSmoothingEnabled = false;

function getCloud() {
  return {
    x: randInt(0, 600),
    y: randInt(0, 200),
    img: rand(assets.clouds),
    move: Math.random() * .1 + .1
  };
}

function getRock() {
  return {
    x: 600 + 64,
    sx: randInt(0, 3),
    sy: randInt(0, 2),
    move: .3
  };
}

let hero = 250;
let move = 0;
let jump = false;
let doubleJump = false;
let gravity = .001;
let start = 0;
let spawnSize = 300;
let clouds = array(10, () => {
  return getCloud();
});

let rocks = new Set([getRock()]);

function update(dt: number, now: number) {
  hero += move * dt;
  move += gravity * dt;

  if (hero > 250) {
    hero = 250;
    move = 0;
    jump = false;
    doubleJump = false;
  }

  if (isPress('Space') && (!jump || !doubleJump)) {
    move = jump ? -.3 : -.4;

    if (jump) {
      doubleJump = true;
    }

    jump = true;

    start = now;
  }

  for (const cloud of clouds) {
    cloud.x -= cloud.move * dt;
    if (cloud.x + cloud.img.width < 0) {
      Object.assign(cloud, getCloud());
      cloud.x = 600 + cloud.img.width;
    }
  }

  let max = 0;

  for (const rock of rocks) {
    rock.x -= dt * rock.move;
    max = Math.max(rock.x, max);

    if (rock.x + 64 < 0)
      rocks.delete(rock);
  }

  if (max < spawnSize) {
    rocks.add(getRock());
    spawnSize = randInt(200, 500);
  }

  render(dt, now);
}

function render(dt: number, now: number) {
  ctx.clearRect(0, 0, 600, 300);

  // Небо
  ctx.fillStyle = 'rgba(0, 172, 246, 0.74)';
  ctx.fillRect(0, 0, 600, 250);

  //Облака
  for (const cloud of clouds)
    ctx.drawImage(cloud.img, cloud.x, cloud.y);

  // Камни
  for (const rock of rocks)
    ctx.drawImage(assets.rocks,
      rock.sx * 24, rock.sy * 24, 24, 24,
      rock.x, 250 - 52, 64, 64
    );

  // Земля
  ctx.fillStyle = 'rgba(60, 113, 60, 1)';
  ctx.fillRect(0, 250, 600, 300);

  // Герой 
  const { cat } = assets;
  let div = jump ? 4 : 10;
  let frame = ((now - start) / 100 | 0) % div;
  let img = jump ? (
    move < 0 ? cat.jump : cat.fall
  ) : cat.run;

  ctx.drawImage(img,
    frame * 32, 0, 32, 32,
    32, hero - 54, 64, 64
  );
}

looper(update);