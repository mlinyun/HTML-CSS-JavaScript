// 显示时间的 function
function showTime() {
    // 使用 Date 对象获取今天的日期和时间
    var date = new Date()
    var h = date.getHours()
    var m = date.getMinutes()
    var s = date.getSeconds()

    // session 用来显示 AM 或 PM
    var session = 'AM'

    // 如果 h 超过 12 则减去 12 并将 session 设为下午
    // 检查时间是否达到 12，即它再次从 12 开始的条件
    if (h === 0) {
        h = 12
    }

    if (h > 12) {
        h = h - 12
        session = 'PM'
    }

    // 数字补零
    h = h >= 10 ? h : '0' + h
    m = m >= 10 ? m : '0' + m
    s = s >= 10 ? s : '0' + s

    // 显示时间的字符串
    var time = h + ':' + m + ':' + s + ' ' + session

    // 使用 DOM 元素在屏幕上显示元素
    var myClockDisplay = document.getElementById('myClockDisplay')
    myClockDisplay.innerHTML = time
    myClockDisplay.textContent = time

    // 每秒调用一次该函数，使用 `setTimeout()` 方法并将时间间隔设置为 1000ms，等于 1s
    setInterval(showTime, 1000)
}

showTime()