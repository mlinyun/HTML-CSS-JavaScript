let btn = document.querySelector('button')
btn.addEventListener('click', async function() {
    let stream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
    })

    const mime = MediaRecorder.isTypeSupported("video/webm; codecs=vp9") ? "video/webm; codecs=vp9" : "video/webm;"
    let mediaRecorder = new MediaRecorder(stream, {
        mimeType: mine,
    })

    let chunks = []
    mediaRecorder.addEventListener('dataavailable', function(e) {
        chunks.push(e.data)
    })

    mediaRecorder.addEventListener('stop', function() {
        let blob = new Blob(chunks, {
            type: chunks[0].type
        })
        let url = URL.createObjectURL(blob)
        let video = document.querySelector('video')
        video.src = url
        let a = document.createElement('a')
        a.href = url
        a.download = 'video.webm'   // 指定生成的文件名
        a.click()
    })

    mediaRecorder.start()
})