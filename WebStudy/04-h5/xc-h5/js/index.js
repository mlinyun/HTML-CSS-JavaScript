window.addEventListener('load', function() {
    // 1. 获取元素
    let focus = document.querySelector('.focus')
    // let ul = focus.querySelector('ul')
    let ul = focus.children[0]
    let ol = focus.children[1]
    // 获得 focus 的宽度
    let focusWidth = focus.offsetWidth

    // 2. 利用定时器自动轮播图片
    let index = 0
    let timer = setInterval(function() {
        index++
        let move = -index * focusWidth
        ul.style.transition = 'all .3s'
        ul.style.transform = 'translateX(' + move + 'px)'
    }, 2000)
    // 等着过渡完成后，再去判断 监听过渡完成的事件 transitionend
    ul.addEventListener('transitionend', function() {
        // 无缝滚动
        // 如果索引号等于3说明走到了最后一张图片，此时索引号要复原为0
        if (index >= 3) {
            index = 0
            // 此时图片要去掉过渡效果，然后移动ul快速跳到目标的位置
            ul.style.transition = 'none'
            // 利用最新的索引号乘以宽度 去滚动图片
            let move = -index * focusWidth
            ul.style.transform = 'translateX(' + move + 'px)'
        } else if (index < 0) { // 如果索引号小于0，说明是倒着走，让索引号等于2
            index = 2
            // 此时图片要去掉过渡效果，然后移动ul快速跳到目标的位置
            ul.style.transition = 'none'
            // 利用最新的索引号乘以宽度 去滚动图片
            let move = -index * focusWidth
            ul.style.transform = 'translateX(' + move + 'px)'
        }

        // 3. 小圆点跟随变化
        // 把ol里面li带有current类名的选出来去掉类名 classList.remove()
        ol.querySelector('li.current').classList.remove('current')
        // 让当前索引号 的小li 加上 current类名 classList.add()
        // ol.querySelectorAll('li')[index].classList.add('current')
        ol.children[index].classList.add('current')
    })

    // 4.手指滑动轮播图
    // 触摸元素 touchstart
    // 声明全局变量，表示手指的初始横坐标
    let stratX = 0
    // 声明全局变量，表示ul移动的距离
    let moveX = 0
    let flag = false
    ul.addEventListener('touchstart', function(e) {
        // 获取手指初始的横坐标
        stratX = e.targetTouches[0].pageX
        // 手指触摸的时候就停止定时器
        clearInterval(timer)
    })
    // 移动手指 touchmove
    // 计算手指滑动距离，并且移动盒子
    ul.addEventListener('touchmove', function(e) {
        // 计算移动距离
        moveX = e.targetTouches[0].pageX - stratX
        // 移动ul：ul原来的位置 + 手指滑动的距离
        let move = -index * focusWidth + moveX
        // 手指移动的时候不需要动画效果，所以需要取消过渡动画
        ul.style.transition = 'none'
        ul.style.transform = 'translateX(' + move + 'px)'
        flag = true
        e.preventDefault()  // 阻止滚动屏幕的行为
    })
    
    // 如果移动距离大于50像素就上一张下一张滑动
    // 滑动也分为左滑动和右滑动判断的标准是 移动距离正负 如果是负值就是左滑 反之右滑 
    // 如果是左滑就播放下一张 (index++)
    // 如果是右滑就播放上一张 (index--)

    // 5.手指离开 根据移动的距离去判断是回弹还是播放上一张
    ul.addEventListener('touchend', function(e) {
        if (flag) {
            // 如果移动距离大于50像素我们就播放上一张或者下一张图片
            // 注意：若手指从左到右滑动，moveX则为正值，若手指从右到左滑动，moveX则为负值
            // 但是只要移动的距离大于50像素，就播放上一张或者下一张图片
            // 所以这里的moveX要取绝对值
            if (Math.abs(moveX) > 50) {
                // 这里要在进行判断是要播放上一张图片还是下一张图片
                // 如果 moveX 小于 0，说明手指是从右到左滑动，所以要播放下一张图片
                if (moveX < 0) {
                    index++
                } else {    // 如果 moveX 大于 0，说明手指是从左到右滑动，所以要播放上一张图片
                    index--
                }
                let move = -index * focusWidth
                ul.style.transition = 'all .3s'
                ul.style.transform = 'translateX(' + move + 'px)'
            } else {    // 如果移动的距离小于50像素，我们就回弹回去
                let move = -index * focusWidth
                ul.style.transition = 'all .1s'
                ul.style.transform = 'translateX(' + move + 'px)'
            }
        }
        // 手指离开的时候就重新开启定时器
        clearInterval(timer)
        timer = setInterval(function() {
            index++
            let move = -index * focusWidth
            ul.style.transition = 'all .3s'
            ul.style.transform = 'translateX(' + move + 'px)'
        }, 2000)
    })

    // 6. 返回顶部模块制作
    let goBock = this.document.querySelector('.goBack')
    let nav = document.querySelector('nav')
    this.window.addEventListener('scroll', function() {
        if (this.window.pageYOffset >= nav.offsetTop) {
            goBock.style.display = 'block'
        } else {
            goBock.style.display = 'none'
        }
    })
    // 点击返回顶部按钮，窗口回到顶部
    goBock.addEventListener('click', function() {
        window.scroll(0, 0)
    })
})