var password = document.getElementById('password')
// 生成密码的功能
function genPassword() {
    // 用于生成密码的字符
    var chars = "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    var passwordLength = 12     // 密码的长度
    var password = ''

    // 现在我将使用 for 循环创建一个随机密码
    for (var i = 0; i <= passwordLength; i++) {
        var randomNumber = Math.floor(Math.random() * chars.length)
        password += chars.substring(randomNumber, randomNumber + 1)
        document.getElementById('password').value = password
    }
}

// 复制密码的功能
function copyPassword() {
    var copyText = document.getElementById('password')
    copyText.select()
    copyText.setSelectionRange(0, 999)
    document.execCommand('copy')
}