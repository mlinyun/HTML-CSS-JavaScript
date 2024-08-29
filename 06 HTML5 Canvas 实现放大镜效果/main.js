var canvas = document.getElementById("canvas"), //获取指向canvas的引用
    context = canvas.getContext("2d"), //获取绘图环境变量
    //以上两句是运用canvas的关键，获取绘图环境后便可执行一系列canvas操作
    copycanvas = document.getElementById("copycanvas"),
    copycontext = copycanvas.getContext("2d"),
    //获取透明选择框，id为square
    square = document.getElementById("square"),
    //选择框对象，用来保存所需的选择框数据
    squaredata = {},
    //getBoundingClientRect方法可以获取元素上、下、左、右分别相对浏览器的坐标位置
    box = canvas.getBoundingClientRect();

(image = new Image()), (image.src = "fdj.jpeg");
image.onload = function () {
    //这里运用到了canvas的绘制图像方法
    context.drawImage(image, 0, 0, canvas.width, canvas.height);
};

canvas.onmouseover = function (e) {
    //获取鼠标实时坐标
    var x = e.clientX,
        y = e.clientY;
    //保存透明选择框属性
    createSquare(x, y);
};

window.onmousemove = function (e) {
    var x = e.clientX,
        y = e.clientY;
    //判断鼠标是否移出canvas
    if (
        x >= canvas.offsetLeft &&
        x <= canvas.offsetLeft + canvas.width &&
        y >= canvas.offsetTop &&
        y <= canvas.offsetTop + canvas.height
    ) {
        createSquare(x, y);
    } else {
        hideSquare();
        hideCanvas();
    }
};

function showSquare() {
    square.style.display = "block";
}

function hideSquare() {
    square.style.display = "none";
}

function showCanvas() {
    copycanvas.style.display = "inline";
}

function hideCanvas() {
    copycanvas.style.display = "none";
}

function createSquare(x, y) {
    //控制选择框不移动出canvas
    x = x - 45 < canvas.offsetLeft ? canvas.offsetLeft : x - 45;
    y = y - 45 < canvas.offsetTop ? canvas.offsetTop : y - 45;

    x = x + 90 < box.right ? x : box.right - 90;
    y = y + 90 < box.bottom ? y : box.bottom - 90;

    squaredata.left = x;
    squaredata.top = y;
    moveSquare(x, y);
    copy();
}

function moveSquare(x, y) {
    square.style.left = x + "px";
    square.style.top = y + "px";
    showCanvas();
    showSquare();
}

function copy() {
    copycontext.drawImage(
        canvas, //这里绘制的源对象便是canvas
        squaredata.left - box.left,
        squaredata.top - box.top,
        90,
        90,
        0,
        0,
        copycanvas.width,
        copycanvas.height,
    );
}