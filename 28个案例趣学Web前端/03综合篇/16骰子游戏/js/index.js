// 玩家姓名
var player1 = "Player 1"
var player2 = "Player 2"

// 改变玩家姓名的功能
function editNames() {
    player1 = prompt("更改玩家 1 姓名")
    player2 = prompt("更改玩家 2 姓名")
    document.querySelector('p.player1').innerHTML = player1
    document.querySelector('p.player2').innerHTML = player2
}

// 掷骰子的功能
function rollTheDice() {
    // 设置一个 1000 毫秒的延迟
    setTimeout(function() {
        // 生成 1-6 的随机数
        var randomNumber1 = Math.floor(Math.random() * 6) + 1
        var randomNumber2 = Math.floor(Math.random() * 6) + 1
        // 将骰子的图片改成对应随机数
        document.querySelector('.img1').setAttribute('src', './img/dice' + randomNumber1 + '.png')
        document.querySelector('.img2').setAttribute('src', './img/dice' + randomNumber2 + '.png')
        // 两个数相等
        if (randomNumber1 === randomNumber2) {
            document.querySelector('h1').innerHTML = '平局！'
        } else if (randomNumber1 < randomNumber2) {
            document.querySelector('h1').innerHTML = player2 + '获得胜利'
        } else {
            document.querySelector('h1').innerHTML = player1 + '获得胜利'
        }
    }, 1000)
}