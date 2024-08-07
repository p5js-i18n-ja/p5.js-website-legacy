/*
 * @name ライフゲーム
 * @arialabel 黒い背景に白い正方形のグリッドで、いくつかの正方形が白と黒の間で点滅してランダムなパターンを生成します。
 * @description John Conway のライフゲームの基本的な実装
 * (<a href="http://natureofcode.com">natureofcode.com</a>)
 */

let w;
let columns;
let rows;
let board;
let next;

function setup() {
  // 点滅を防ぐためにシミュレーションのフレームレートを10に設定します。
  frameRate(10);
  createCanvas(720, 400);
  w = 20;
  // 列と行を計算します。
  columns = floor(width / w);
  rows = floor(height / w);
  // JS で2次元配列を作成する奇妙な方法
  board = new Array(columns);
  for (let i = 0; i < columns; i++) {
    board[i] = new Array(rows);
  }
  // 複数の2次元配列を使って入れ替えます。
  next = new Array(columns);
  for (i = 0; i < columns; i++) {
    next[i] = new Array(rows);
  }
  init();
}

function draw() {
  background(255);
  generate();
  for ( let i = 0; i < columns;i++) {
    for ( let j = 0; j < rows;j++) {
      if ((board[i][j] == 1)) fill(0);
      else fill(255);
      stroke(0);
      rect(i * w, j * w, w-1, w-1);
    }
  }

}

// マウスが押されたときにボードをリセットします。
function mousePressed() {
  init();
}

// ボードをランダムに埋めます。
function init() {
  for (let i = 0; i < columns; i++) {
    for (let j = 0; j < rows; j++) {
      // 端を0で埋めます。
      if (i == 0 || j == 0 || i == columns-1 || j == rows-1) board[i][j] = 0;
      // それ以外をランダムに埋めます。
      else board[i][j] = floor(random(2));
      next[i][j] = 0;
    }
  }
}

// 新世代を作成するプロセス
function generate() {

  // 2次元配列のすべての場所をループし、隣の場所をチェックします。
  for (let x = 1; x < columns - 1; x++) {
    for (let y = 1; y < rows - 1; y++) {
      // 周囲の3x3のグリッド内のすべての状態を加算します。
      let neighbors = 0;
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          neighbors += board[x+i][y+j];
        }
      }

      // 上記のループで加算したため、
      // 現在のセルの状態を減算する小さなトリックを使用します。
      neighbors -= board[x][y];
      // ライフのルール
      if      ((board[x][y] == 1) && (neighbors <  2)) next[x][y] = 0;           // 孤独
      else if ((board[x][y] == 1) && (neighbors >  3)) next[x][y] = 0;           // 過密
      else if ((board[x][y] == 0) && (neighbors == 3)) next[x][y] = 1;           // 繁殖
      else                                             next[x][y] = board[x][y]; // 安定
    }
  }

  // 交換します！
  let temp = board;
  board = next;
  next = temp;
}
