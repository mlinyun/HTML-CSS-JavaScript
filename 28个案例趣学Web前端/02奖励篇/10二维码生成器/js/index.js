// 首先，我们为“生成二维码”的按钮创建一个点击事件
let btn = document.querySelector('.button')
let qr_code_element = document.querySelector('.qr-code')

btn.addEventListener('click', () => {
    let user_input = document.querySelector('#input_text')
    if (user_input.value != "") {
        if (qr_code_element.childElementCount == 0) {
            generate(user_input)
            console.log('childElementCount')
        } else {
            qr_code_element.innerHTML = ''
            generate(user_input)
            console.log('innerHTML')
        }
    } else {
        console.log('无效输入') // 输入为空时提示
        qr_code_element.style = 'display: none'
    }
})

/*
    接下来我们创建一个名为 generate() 的函数，
    当我们点击“生成二维码”这个按钮时就会调用这个函数。
    这个函数将从用户输入的文本作为参数
*/

// 在 generate() 函数内部实现生成二维码的功能
// 当点击“生成二维码”按钮时就会调用 generate() 函数
function generate(user_input) {
    qr_code_element.style = ""

    // 创建一个新的二维码对象
    var qrcode = new QRCode(document.querySelector('.qr-code'), {
        text: `${user_input.value}`,
        width: 180, // 默认为 128
        height: 180,
        colorDark: '#000',
        colorLight: '#fff',
        correctLevel: QRCode.CorrectLevel.H,
    })

    // 接下来我们需要创建一个下载按钮并把它附加到二维码下方
    let download = document.createElement('button')
    qr_code_element.appendChild(download)

    // 在这个下载按钮中我们添加一个链接，
    // 允许用户下载具有指定文件名的二维码并将其附加到下载按钮中
    let download_link = document.createElement('a')
    download_link.setAttribute('download', 'qr_code_linq.png')
    download_link.innerHTML = '下载'    // 将"下载"文本显示在按钮上
    download.appendChild(download_link)

    /* 
        在 PC 端是比较简单的，我们只需要获取图像元素的 src 属性值，
        并在指定时间（0.3 秒）后使用 setTimeout() 函数将其分配给
        下载链接（<a> 标签）的 href 属性，因为二维码 需要一些时间才能生成
    */
    
    // 获取img
    let qr_code_img = document.querySelector('.qr-code img')
    let qr_code_canvas = document.querySelector('canvas')

    if (qr_code_img.getAttribute('src') == null) {
        // 判断是否能获取图像元素的 src 属性
        setTimeout(() => {
            // 若不能则使用 toDataURL() 方法从 canvas 元素中获取 dataURL
            download_link.setAttribute('href', `${qr_code_canvas.toDataURL()}`)
        }, 300) // 延迟 300 毫秒
    } else {
        // 否则使用 getAttribute() 方法获取 img 的 href 属性
        setTimeout(() => {
            download_link.setAttribute('href', `${qr_code_img.getAttribute('src')}`)
        }, 300) // 延迟 300 毫秒
    }
}