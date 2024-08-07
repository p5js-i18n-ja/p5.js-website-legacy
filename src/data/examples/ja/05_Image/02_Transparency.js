/*
 * @name 画像の透過
 * @arialabel 宇宙飛行士の画像を背景に表示し、半透明な宇宙飛行士の画像が上に表示されています。半透明の画像はマウスの水平方向に移動します。
 * @description 画像を左右に動かすには、画像上でマウスを左右に動かします。このプログラムは、tint() 関数で画像のアルファ値を変更することで、1つの画像を別の画像にオーバーレイします。
 * <p><em><span class="small"> この例をローカルで実行するには画像ファイルと実行中の <a href="https://github.com/processing/p5.js/wiki/Local-server">
 * ローカルサーバー</a> が必要です。</span></em></p>
 */
let img;
let offset = 0;
let easing = 0.05;

function setup() {
  createCanvas(720, 400);
  img = loadImage('assets/moonwalk.jpg'); // プログラムに画像を読み込みます。
}

function draw() {
  image(img, 0, 0); // 100%の不透明度で表示します。
  let dx = mouseX - img.width / 2 - offset;
  offset += dx * easing;
  tint(255, 127); // 50%の不透明度で表示します。
  image(img, offset, 0);
}
