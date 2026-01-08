// 我们首先找到我们的滚动区域和轮播按钮
const carouselScrollArea = document.querySelector('.carousel__scroll-area')
const leftCarouselButton = document.querySelector('.carousel__button--left')
const rightCarouselButton = document.querySelector('.carousel__button--right')

// 然后我们监听点击并相应地滚动轮播
leftCarouselButton.addEventListener('click', () => scrollCarousel('left'))
rightCarouselButton.addEventListener('click', () => scrollCarousel('right'))

function scrollCarousel(direction) {
    if (direction === 'left') {
        carouselScrollArea.scrollLeft -= carouselScrollArea.clientWidth
    } else if (direction === 'right') {
        carouselScrollArea.scrollLeft += carouselScrollArea.clientWidth
    } else {
        console.log('Invalid direction')
    }
}

const carouselWrapper = document.querySelector('.carousel__wrapper')

// 监听按钮并根据按下的键做出反应
carouselWrapper.addEventListener('keydown', handleKeyDown)

function handleKeyDown(e) {
    if (e.key === 'ArrowLeft') {
        scrollCarousel('left')
    } else if (e.key === 'ArrowRight') {
        scrollCarousel('right')
    }
}