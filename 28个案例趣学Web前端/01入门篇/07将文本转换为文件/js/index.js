// js 中方法声明：function 方法名(参数列表){方法体}
function downloadFile(filename, textValue) {
    // 它适用于所有支持 HTML5 的浏览器，因为它使用了 <a> 元素的下载(download)属性：
    const element = document.createElement('a');
    // Blob 是一种可以存储二进制数据的数据类型
    // 根据要保存的文件，它可以有不同的值
    const blob = new Blob([textValue], {type: 'plain/text'})
    // createObjectURL() 静态方法创建一个 DOMString，其中包含一个 URL，该 URL 表示参数中给定的对象
    const fileUrl = URL.createObjectURL(blob)
    // setAttribute() 设置指定元素的属性值
    element.setAttribute('href', fileUrl)   // 文件位置
    element.setAttribute('download', filename)  // 文件名
    element.style.display = 'none'

     // 使用 appendChild() 方法将一个节点附加到指定父节点的子节点列表的末尾处
     document.body.appendChild(element)
     element.click()

     // Node 接口的 removeChild() 方法从 DOM 中移除一个子节点并返回移除的节点
     document.body.removeChild(element)
}

window.onload = () => {
    let download = document.getElementById('download')
    let filename = document.getElementById('filename')
    let text = document.getElementById('text')
    download.addEventListener('click', (e) => {
        // 文件名的输入
        const filenameValue = filename.value
        // 文本中输入的值
        const textValue = text.value
        // &&（逻辑与）运算符指示两个操作数是否为真。 如果两个操作数都具有非零值，则结果的值为 1。否则，结果的值为 0
        if (filenameValue && textValue) {
            downloadFile(filenameValue, textValue)
        }
    })
}