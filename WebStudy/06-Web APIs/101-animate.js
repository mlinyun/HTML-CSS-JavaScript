function animate(obj, target, callback) {
    clearInterval(obj.timer)
    obj.timer = setInterval(function() {
        obj.step = (target - obj.offsetLeft) / 10
        obj.step = obj.step <= 0 ? Math.floor(obj.step) : Math.ceil(obj.step)
        if (obj.offsetLeft === target) {
            clearInterval(obj.timer)
            // if (callback) {
            //     callback()
            // }
            callback && callback()
        } else {
            obj.style.left = obj.offsetLeft + obj.step + 'px'
        }
    }, 15)
}