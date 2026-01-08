// 存储所有顶点的列表
let vertices = []
// 变量声明
var iter;   // 画画的步骤数
var counter;    // 计数器

// 输出窗口的函数
function setup() {
    // 输出窗口的大小
    createCanvas(600, 600)
    // 填充颜色
    fill(31)
    // 输出窗口背景
    background(31)
    // 将变量的值设为1
    iter = 1
    counter = 1
    // 初始化顶点列表
    addVertices()
}

// 设置绘制函数
function draw() {
    stroke(255)     // 线的颜色
    strokeWeight(4) // 线的粗细
    step()  // 绘制函数
    // 范围内检查的条件
    if (iter < 11) {
        // 每一次增加计数器
        counter += 0.05
        // 将 iter 变量设置为 counter 的下限值
        iter = floor(counter)
    } else {
        // 如果 iter 大于 11, 则停止循环
        noLoop()
    }
}

// 添加房屋顶点的函数，给出每一个顶点的坐标
function addVertices() {
    vertices.push(new p5.Vector(100, 300))
    vertices.push(new p5.Vector(340, 300))
    vertices.push(new p5.Vector(40, 380))
    vertices.push(new p5.Vector(160, 380))
    vertices.push(new p5.Vector(400, 380))
    vertices.push(new p5.Vector(40, 550))
    vertices.push(new p5.Vector(160, 550))
    vertices.push(new p5.Vector(400, 550))
}

// 添加在房子里画线的函数
function drawLine(a, b) {
    line(vertices[a].x, vertices[a].y, vertices[b].x, vertices[b].y)
}

// 逐步绘制房屋的函数
function step() {
    switch (iter) {
        case 1:
            drawLine(5, 6)
            break
        case 2:
            drawLine(6, 7)
            break
        case 3:
            drawLine(2, 5)
            drawLine(3, 6)
            break
        case 4:
            drawLine(4, 7)
            break
        case 5:
            drawLine(2, 3)
            drawLine(3, 4)
            break
        case 6:
            drawLine(0, 2)
            drawLine(0, 3)
            drawLine(1, 4)
            break
        case 7:
            drawLine(0, 1)
            drawLine(3, 6)
            break
        case 8:
            addGate()
            break
        case 9:
            addWindow()
            break
        case 10:
            addOculus()
            break
        case 11:
            addChimney()
            break
    }
}

// 绘制门的函数
function addGate() {
    rectMode(CENTER)
    // 绘制矩形，坐标为 [100, 500]，宽为 70，高为 100
    rect(100, 500, 70, 100)
}

// 绘制窗户的函数
function addWindow() {
    rect(280, 430, 40, 30)
}

// 再添加应该圆形窗户
function addOculus() {
    ellipse(100, 340, 20, 20)
}

// 最后再添加应该烟囱
function addChimney() {
    rect(320, 295, 16, 20)
    ellipse(320, 285, 16, 10)
}