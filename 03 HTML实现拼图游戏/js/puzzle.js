var time = 0;           // 保存定时时间
var pause = true;       // 设置是否暂停标识，true表示暂停
var set_timer;           // 设置定时函数
var d = new Array(10);  // 保存大div当前装的小div编号
var d_direct = new Array(   // 保存大div编号为1的div可以移动位置编号
    [0],    // 为了逻辑更简单，第一个元素我们不用，我们从下标1开始使用
    [2, 4], // 大div编号为1的小div可以去的位置，比如第一块可以去 2, 4 号位置
    [1, 3, 5],
    [2, 6],
    [1, 5, 7],
    [2, 4, 6, 8],
    [3, 5, 9],
    [4, 8],
    [5, 7, 9],
    [6, 8]
);
var d_posXY = new Array(    // 保存大div编号的位置
    [0],    // 同样，我们不使用第一个元素
    [0, 0], // 第一个表示 left，第二个表示 top，比如第一块的位置为 left: 0px; top: 0px;
    [150, 0],
    [300, 0],
    [0, 150],
    [150, 150],
    [300, 150],
    [0, 300],
    [150, 300],
    [300, 300],
);
// 默认按照顺序排好，大div第九块没有，所以为0，我们用0表示空白块
d[1] = 1;
d[2] = 2;
d[3] = 3;
d[4] = 4;
d[5] = 5;
d[6] = 6;
d[7] = 7;
d[8] = 8;
d[9] = 0;

var modal = document.getElementById("popup1");
var closeicon = document.querySelector(".close");


// 移动函数
function move(id) {
    var i = 1;
    for (i = 1; i < 10; i++) {
        if (d[i] == id) {
            break;
        }
    }   // 这个 for 循环是找出小div在大div中的位置
    var target_d = 0;   // 保存小div可以去的编号，0 表示不能移动
    target_d = whereCanTo(i);   // 用来找出小div可以去的位置，如果返回0，表示不能移动，如果可以移动，则返回可以去的位置的编号
    if (target_d !== 0) {   // 如果 target_d 不为 0，则表示可以移动，且 target_d就是小div要去的大div的位置编号
        d[i] = 0;   // 把当前大div的编号设置为0， 因为当前小div已经移走了，所以当前大div就没有装小div了
        d[target_d] = id;   // 把目标大div设置为被点击的小div编号
        // 最后设置被点击的下div的位置，把它移到目标大div的位置
        document.getElementById(`d${id}`).style.left = `${d_posXY[target_d][0]}px`;
        document.getElementById(`d${id}`).style.top = `${d_posXY[target_d][1]}px`;
    }
    // 设置游戏是否完成标识，true表示完成
    var finish_flag = true;
    for (var k = 1; k < 9; k++) {   // 从1开始，把每个大div保存的编号遍历一遍，判断游戏是否完成
        if (d[k] !== k) {
            // 如果大div保存的编号和它本身的编号不同，则表示还不是全部按照顺序排序的，那么设置false，跳出循环，后面不用再判断了，因为只要一个不符合，就没有完成游戏
            finish_flag = false;
            break;
        }
    }
    // 如果为true，则表示游戏完成，如果当前没有暂停，则调用暂停函数，并且弹出提示框，完成游戏
    // start()这个函数是开始，暂停一起的函数，如果暂停，调用后会开始，如果开始，则调用后会暂停
    if (finish_flag === true) {
        if (!pause) {
            start();
        }
        // alert("congratulation");
        modal.classList.add("show");
        closeModal();
    }
}

// 界面上的关闭图标
function closeModal() {
    closeicon.addEventListener("click", function (e) {
        modal.classList.remove("show");
    })
}

// 再次游戏功能
function playAgain() {
    console.log(888);
    modal.classList.remove("show");
    reset();
}

// 判断是否可以移动函数，参数是大div的编号，不是小div的编号，因为小div编号跟可以去哪没关系，小div是会动的
function whereCanTo(cur_div) {
    var j = 0;
    var move_flag = false;
    // 把所有可能去的位置循环遍历一遍
    for (j = 0; j < d_direct[cur_div].length; j++) {
        // 如果目标值为0，说明目标位置没有装小div，则可以移动，跳出循环
        if (d[d_direct[cur_div][j]] === 0) {
            move_flag = true;
            break;
        }
    }
    // 若可以移动返回目标位置的编号，否则返回0，表示不可移动
    if (move_flag === true) {
        return d_direct[cur_div][j];
    } else {
        return 0;
    }
}

// 定时函数，每秒执行一次
function timer() {
    time += 1;  // 1秒钟加1，单位是秒(s)
    var min = parseInt(time / 60);  // 把秒转换为分钟，1分钟60秒，整除就是分钟
    var sec = time % 60;            // 取余就是秒
    document.getElementById("timer").innerHTML = `${min}分${sec}秒`; // 然后把时间显示出来
}

// 开始暂停函数
function start() {
    if (pause) {    // 如果当前是暂停，则开始
        document.getElementById("start").innerHTML = "暂停";    // 把按钮文字设置为暂停
        pause = false;  // 暂停表示设置为false
        set_timer = setInterval(timer, 1000);    // 启动定时
    } else {
        document.getElementById("start").innerHTML = "开始";
        pause = true;
        clearInterval(set_timer);    // 停止定时
    }
}

// 重置函数
function reset() {
    time = 0;
    random_d(); // 把方块随机打乱函数
    if (pause) {
        // 如果暂停，则开始计时
        start();
    }
}

// 随机打乱方块函数，我们的思路时从第9块开始，随机生成一个树，然后他们两块对调一下
function random_d() {
    for (var i = 9; i > 1; i--) {
        // 产生随机数，范围为1到i，不能超出范围，因为没这个id的div
        var to = parseInt(Math.random() * (i - 1) + 1);
        // 把当前的div位置设置为随机尝试的div位置
        if (d[i] !== 0) {
            document.getElementById(`d${d[i]}`).style.left = `${d_posXY[to][0]}px`;
            document.getElementById(`d${d[i]}`).style.top = `${d_posXY[to][1]}px`;
        }
        // 把随机产生的div位置设置为当前div的位置
        if (d[to] !== 0) {
            document.getElementById(`d${d[to]}`).style.left = `${d_posXY[i][0]}px`;
            document.getElementById(`d${d[to]}`).style.top = `${d_posXY[i][1]}px`;
        }
        // 然后把它们两个的div保存的编号对调一下
        // var temp = d[to];
        // d[to] = d[i];
        // d[i] = temp;
        [d[to], d[i]] = [d[i], d[to]];  // 解构赋值
    }
}

// 初始化函数，页面加载的时候调用重置函数，重新开始
window.onload = function () {
    reset();
}