console.clear();
var sound = new Howl({
  src: ['sfx/sounds.mp3'],
  sprite: {
    ding: [0, 1801],
    discard: [1802, 533],
    shuffle: [2332, 1368],
    wrong: [3724, 430]
  }
});

sound.play('shuffle');

const app = new PIXI.Application();
document.body.appendChild(app.view);

// create two render textures... these dynamic textures will be used to draw the scene into itself
let renderTexture = PIXI.RenderTexture.create(
    app.screen.width,
    app.screen.height,
);

const backTexture = PIXI.Texture.from('gfx/00.png');
const currentTexture = renderTexture;

// create a new sprite that uses the render texture we created above
const outputSprite = new PIXI.Sprite(currentTexture);

// align the sprite
outputSprite.x = 400;
outputSprite.y = 300;
outputSprite.anchor.set(0.5);

// add to stage
app.stage.addChild(outputSprite);

const stuffContainer = new PIXI.Container();

stuffContainer.x = 100;
stuffContainer.y = 100;

app.stage.addChild(stuffContainer);

// create an array of image ids..
const fruits = [
    'gfx/01.png',
    'gfx/02.png',
    'gfx/03.png',
    'gfx/04.png',
    'gfx/05.png',
    'gfx/06.png',
    'gfx/07.png',
    'gfx/08.png',
    'gfx/09.png',
    'gfx/10.png',
];

fruits.sort( () => Math.random() - 0.5 * Math.random())
// create an array of items
const items = [];

// now create some items and randomly position them in the stuff container
for (let i = 0; i < 10; i++) {
    const item = PIXI.Sprite.from(fruits[i % fruits.length]);
    const itemB = PIXI.Sprite.from(backTexture);
    itemB.interactive = true;
    itemB.buttonMode = true;
    itemB.on('pointerdown', mostrar)
    itemB.x = (i % 5) * 140;
    itemB.y = Math.floor(i / 5) * 170;
    itemB.anchor.set(.5, .5);
    stuffContainer.addChild(itemB);
    items.push(item);
}

let ticker = PIXI.Ticker.shared;
 // Set this to prevent starting this ticker when listeners are added.
 // By default this is true only for the PIXI.Ticker.shared instance.
ticker.autoStart = false;
let counter = 5;
let total = 0;

function mostrar(e) {
 
  sound.play('discard');
  counter--;
  this.interactive = false;
  this.texture = PIXI.Texture.from(fruits.shift());
  valor = this._texture.textureCacheIds.toString();
  total += parseInt(valor.slice(4, 6));
  scoreNumber.text = "Score: " + total;
  if (counter === 0) {
    stuffContainer.interactiveChildren = false;
    results();
  }
  // app.ticker.add((delta) => {
  //   // rotate the container!
  //   // use delta to create frame-independent transform
  //   escalaX = this.scale.x -= 0.09 * delta
  //   if (escalaX <= 0) {
  //     // this.texture = PIXI.Texture.from(fruits.shift());
  //     // this.scale.x = 1;
  //   }
  // });
}

const style = new PIXI.TextStyle({
    fontFamily: 'Arial',
    fontSize: 36,
    fontStyle: 'italic',
    fontWeight: 'bold',
    fill: ['#ffffff', '#00ff99'], // gradient
    stroke: '#4a1850',
    strokeThickness: 5,
    dropShadow: true,
    dropShadowColor: '#000000',
    dropShadowBlur: 4,
    dropShadowAngle: Math.PI / 6,
    dropShadowDistance: 6,
    wordWrap: true,
    wordWrapWidth: 440,
    lineJoin: 'round',
});

const scoreNumber = new PIXI.Text('Score: ' + total, style);
scoreNumber.x = 50;
scoreNumber.y = 380;
app.stage.addChild(scoreNumber);

function results() {
  const richText = new PIXI.Text('Shuffle', style);
  richText.interactive = true
  richText.buttonMode = true
  richText.on('pointerdown', restart)
  richText.x = 575;
  richText.y = 380;

  const winOrLose = new PIXI.Text('', style);
  winOrLose.x = 285;
  winOrLose.y = 380;
  if (total >= 27) {
    winOrLose.text = "YOU WIN!"
    sound.play('ding');
  } else {
    winOrLose.text = "YOU LOSE!"
    sound.play('wrong');
  }

  const graphics = new PIXI.Graphics();
  graphics.lineStyle(2, 0xffff33, 1);
  graphics.beginFill(0xffff66, 1);
  graphics.drawRoundedRect(570, 380, 140, 45, 16);
  graphics.endFill();
  app.stage.addChild(graphics);
  app.stage.addChild(richText);
  app.stage.addChild(winOrLose);
}


function restart() {
  location.reload();
}