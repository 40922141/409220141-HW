let points = [
  [5, 0], [-5, 12], [-7, 8], [-3, 1], [-9, 3], [-5, -6], [-2, -3], [2, -4],
  [6, -3], [8, -1], [9, 2], [12, 3], [11, 3], [10, 4], [9, 4], [5, 2],
  [3, 4], [3, 7.5], [0, 9], [-3, 14], [-3, 9.5], [10, 3]
];//輸入圖形的座標

function setup() {
  createCanvas(windowWidth, windowHeight); //製作一個畫布
  for (let i = 0; i < points.length; i++) { //循環遍歷 points 陣列中的每個元素
    for (let j = 0; j < points[i].length; j++) { //循環遍歷目前元素（一個座標點）中的每個值
      points[i][j] = points[i][j] * 50; //每個座標值都乘上 50
    }
  }
  colorMode(HSB, 360, 150, 200); //設定顏色模式為HSB，會影響到後面的color()函數所產生的顏色
  const num = 50; //使用一個迴圈產生50條隨機線條
  for (let i = 0; i < num; i++) { //重複執行某個區塊的程式碼
    gradientLine(//畫線
      random(width), random(height), random(width), random(height) //產生一個在畫布的寬與高度範圍內的隨機數
      ,color(30, 200, 200), color(60, 200, 200), 5);//設定起點顏色為(30, 200, 200)、終點顏色為(60, 200, 200)
  }
}

function gradientLine(x1, y1, x2, y2, c1, c2, lineWidth) { //畫漸層線段的函式，線段的起點座標 (x1, y1)、終點座標 (x2, y2)、起點顏色 c1、終點顏色 c2、線段寬度 lineWidth
  const ctx = drawingContext;//獲取畫布的繪圖環境
  const gradient = ctx.createLinearGradient(x1, y1, x2, y2);//創建了一個名為 gradient 的線性漸變對象，起點 (x1, y1) 與終點 (x2, y2) 分別為 (x1, y1) 和 (x2, y2)
  gradient.addColorStop(0, c1);//設定 0 的位置為 c1
  gradient.addColorStop(1, c2);//1 的位置為 c2
  ctx.strokeStyle = gradient; //設定繪圖環境的筆觸樣式 (strokeStyle) 為漸層
  ctx.lineWidth = lineWidth*3; //設定繪圖環境的線寬

  ctx.beginPath();//開始繪製路徑
  ctx.moveTo(x1, y1);//移動畫筆至起點座標 
  ctx.lineTo(x2, y2);//連接至終點座標
  ctx.stroke();//呈現繪圖結果
}

function draw() {

  let zoom = map(mouseY, 0, height, 0.5, 2.0);//使用scale()函數進行縮放，把畫面縮放到zoom倍大小
  scale(zoom);
  background(300);//背景色為RGB值
  stroke(0, 0, 0);//設定描邊線的顏色
  translate(width / 2, height / 2);//將座標系原點移到畫面中心
  scale(1, -1);//將畫面上下翻轉
  for (let i = 0; i < points.length - 1; i++) {//從points陣列中取出點的座標
    gradientLine(//繪製線段
      points[i][0], points[i][1], points[i + 1][0], points[i + 1][1],//points[i][0], points[i][1] 是第 i 個座標點的座標，points[i + 1][0], points[i + 1][1] 是後面一個座標點的座標
      color(0, 200, 200), color(30, 200, 200), 5 //設定漸層的起始色和結束色，寬度5
    );
  }
  gradientLine( //繪製多邊形的最後一條邊
    points[points.length - 1][0], points[points.length - 1][1],//多邊形最後一個頂點的 x 和 y 座標，以及多邊形的第一個頂點的 x 和 y 座標
    points[0][0], points[0][1],//陣列中最後一個元素的 x 和 y 座標，以及第一個元素的 x 和 y 座標
    color(0, 200, 200), color(30, 200, 200), 5 //設定顏色和線寬
  );

  let scaleRatio = 1;//縮放比例
  for (let i = 0; i < 5; i++) {//給定初始值為 1。接著進入第一個迴圈，進行 5 次的迴圈操作
    scale(scaleRatio); 
    for (let j = 0; j < points.length - 1; j++) {//畫出由 points 陣列中的點所組成的線條
      gradientLine(
        points[j][0], points[j][1], points[j + 1][0], points[j + 1][1], //同時傳入兩種不同的顏色和線條粗細度，畫出漸層的效果
        color(0, 200, 200), color(30, 200, 200), 5 / scaleRatio//設定線條顏色，(除scaleRatio)每次迴圈中，畫面的縮放比例都會改變，為了讓線條的粗細度保持一致，需要將其與畫面縮放比例相除。
      );
    }
    gradientLine(
      points[points.length - 1][0], points[points.length - 1][1],//二維陣列中最後一個座標點的 x 和 y 值
      points[0][0], points[0][1], //points 中第一個點的 x 座標和 y 座標
      color(0, 200, 200), color(30, 200, 200), 5 / scaleRatio//設定漸層的起始色和結束色，寬度5
    );
    scaleRatio += 0.05;//每一次迴圈結束後，scaleRatio 會遞增 0.05
  }
  

  // 顯示文字
textSize(50);//設定文字大小為 50
textAlign(CENTER, CENTER); //設定文字對齊方式為水平置中和垂直置中
fill(0, 200, 200);//設定文字填滿顏色為 HSB 色彩
scale(1, -1);//讓文字垂直翻轉
noStroke();//關閉邊框
text("淡江大學教科系", 0, 0); //文字信息
}
