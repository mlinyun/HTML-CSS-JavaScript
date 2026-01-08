window.onload = function() {
    // 首先设置 gallery-filter 和 gallery-item 的常量
    const filterContainer = document.querySelector('.gallery-filter')
    const galleryItems = document.querySelectorAll('.gallery-item')
    // 点击事件监听
    filterContainer.addEventListener('click', (event) => {
        if (event.target.classList.contains('filter-item')) {
            // 移出现有的类 'filter-item' 后的 'active'
            filterContainer.querySelector('.active').classList.remove('active')
            // 在 'filter-item' 后添加 'active'
            event.target.classList.add('active')
            // 获取 'data-filter' 的属性值
            const filterValue = event.target.getAttribute('data-filter')
            galleryItems.forEach((item) => {
                // 若 'data-filter' 的属性值为 'all'
                if (item.classList.contains(filterValue) || filterValue === 'all') {
                    // 移出类名后 'hide'
                    item.classList.remove('hide')
                } else {    // 否则类名后添加 'hide'
                    item.classList.add('hide')
                }
            })
        }
    })
}