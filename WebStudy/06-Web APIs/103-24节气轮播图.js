window.addEventListener('load', function() {
    // 1. 获取元素
    let arrow_l = document.querySelector('.arrow-l')
    let arrow_r = document.querySelector('.arrow-r')
    let box = document.querySelector('.box')
    let boxWidth = box.offsetWidth;
    // console.log(boxWidth);

    // 2. 鼠标经过 box 就显示隐藏的左右按钮，离开 box 就隐藏左右按钮
    box.addEventListener('mouseenter', function() {
        arrow_l.style.display = 'block'
        arrow_r.style.display = 'block'
        // 鼠标经过 box 就停止定时器
        clearInterval(timer)
        timer = null    // 清除定时器变量
    })
    box.addEventListener('mouseleave', function() {
        arrow_l.style.display = 'none'
        arrow_r.style.display = 'none'
        timer = setInterval(function() {
            // 手动调用点击事件
            arrow_r.click()
        }, 2000)
    })

    // 3. 动态生成小圆圈 有几张图片，我们就生成几个小圆圈
    // 图片都放在 ul 里 li 里面，所以有多少个 li，就有多少张图片，即有多少个小圆圈
    // 获取元素
    // 在实际的开发过程中，一个页面往往有许多个ul 和 ol，所以这里不要再document对象获取ul 和 li了
    // 这里是要获取box里面的ul 和 ol ,所以使用 box.querySelector() 
    let ul = box.querySelector('ul')
    let ol = box.querySelector('.circle')
    // 得到 ul 里面 有多少个 li，ul.children.length
    for (let i = 0; i < ul.children.length; i++) {
        // 创建一个小li
        let li = document.createElement('li')
        // 记录当前小圆圈的索引号 通过自定义属性来做
        li.setAttribute('index', i)
        // 把小li插入到ol里面
        ol.appendChild(li)

        // 4. 小圆圈的排他思想 我们可以直接再生成的小圆圈同时绑定点击事件
        li.addEventListener('click', function() {
            // 干掉所有人 把所有的小li 清除 current 类名
            for (let i = 0; i < ol.children.length; i++) {
                ol.children[i].className = ''
            }
            // 留下自己 当前的小li 设置 current 类名
            this.className = 'current'

            // 5. 点击小圆圈，移动图片，注意这里要移动的是ul的位置，而不是ul里小li的位置
            // ul 的移动距离是：小圆圈的索引号 * 图片的宽度，注意是负值
            // 当我们点击了某个小li就获得当前小li的索引号
            let index = this.getAttribute('index')
            // 当我们点击了某个小li，就要把这个li 的索引号给 num
            num = index;
            // 当我们点击了某个小li，就要把这个li 的索引号给 circle
            circle = index
            // 上面将动画函数封装到了 animate.js 里面
            // 使用这个函数要求该元素要有定位，所以 ul 需要有定位
            animate(ul, -index * boxWidth)
        })
    }
    // 默认展示第一张图片，所以第一个小圆圈要添加类名 current
    ol.children[0].className = 'current'

    // 6. 克隆第一张图片(li)放到ul 最后面
    // 这个克隆需要等生成小圆圈之后再进行，这样才不会多生成一个小圆圈
    let first = ul.children[0].cloneNode(true)
    ul.appendChild(first)

    // 7. 点击右侧按钮，图片滚动一张
    // 声明一个全局变量
    var num = 0
    // circle 控制小圆圈的播放、
    var circle = 0
    // flag 节流阀
    var flag = true
    arrow_r.addEventListener('click', function() {
        if (flag) {
            flag = false    // 关闭节流阀
            // 如果走到了最后复制的一张图片，此时 我们的ul 要快速复原 left 改为 0
            if (num === ul.children.length - 1) {
                ul.style.left = 0
                // 重置计数器
                num = 0
            }
            // 每点击一次，num就加1
            num++
            animate(ul, -num * boxWidth, function() {
                flag = true // 打开节流阀
            })

            // 8. 点击右侧按钮，小圆圈跟随变化
            // 每点击一次，circle就加1
            circle++
            // 如果circle == ul.children.length - 1 说明走到最后我们克隆的这张图片了 我们就复原
            // if (circle === ul.children.length - 1) {
            //     circle = 0
            // }
            circle = circle === ul.children.length - 1 ? 0 : circle
            // 调用函数
            circleChange()
        }
    })

    // 9. 左侧按钮做法
    arrow_l.addEventListener('click', function() {
        if (flag) {
            flag = false    // 关闭节流阀
            if (num === 0) {
                num = ul.children.length - 1
                ul.style.left = -num * boxWidth + 'px'
            }
            num--
            animate(ul, -num * boxWidth, function() {
                flag = true // 打开节流阀
            })
            // 点击左侧按钮，小圆圈跟随一起变化 可以再声明一个变量控制小圆圈的播放
            circle--
            // 如果circle < 0  说明第一张图片，则小圆圈要改为最后个小圆圈
            // if (circle < 0) {
            //     circle = ol.children.length - 1
            // }
            circle = circle < 0 ? ol.children.length - 1 : circle
            circleChange()
        }
    })

    function circleChange() {
        // 先清除其余小圆圈的 current 类名
        for (let i = 0; i < ol.children.length; i++) {
            ol.children[i].className = ''
        }

        // 留下当前小圆圈的 current类名
        ol.children[circle].className = 'current'
    }

    // 10. 自动播放轮播图
    var timer = setInterval(function() {
        // 手动调用点击事件
        arrow_r.click()
    }, 2000)
})