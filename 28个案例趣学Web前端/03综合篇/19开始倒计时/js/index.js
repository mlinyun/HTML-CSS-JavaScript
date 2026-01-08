const s = 1000
const m = s * 60
const h = m * 60
const d = h * 24
const y = d * 365

const formAddDate = document.getElementById('addDate')
formAddDate.addEventListener('submit', addTime)

function addTime(e) {
    // 获取用户提供的时间
    const date = document.getElementById('date').value
    const time = document.getElementById('time').value
    const timeYears = document.getElementById('time-years')
    const timeDays = document.getElementById('time-days')
    const timeHours = document.getElementById('time-hours')
    const timeMinutes = document.getElementById('time-minutes')
    const timeSeconds = document.getElementById('time-seconds')

    if (date && time) {
        const chosenDate = new Date(`${date} ${time}`)
        document.getElementById('until').innerHTML = chosenDate.toString()

        const hidden = document.querySelectorAll('.hidden')
        hidden.forEach((e1) => (e1.style.display = 'block'))

        const interval = setInterval(() => {
            // 在表单上选择的日期和时间
            const pickDate = new Date(`${date} ${time}`).getTime()
            // 获取当前日期和时间
            const currnetDate = new Date().getTime()
            // 时间差
            const difference = pickDate - currnetDate
            const years = Math.floor(difference / y)

            if (years < 1) {
                // 不满一年则不显示年份的部分
                timeYears.parentElement.style.display = 'none'
            } else {
                // 否则将会显示
                timeYears.parentElement.style.display = 'block'
            }

            timeYears.innerHTML = Math.floor(difference / y)
            timeDays.innerHTML = Math.floor((difference % y) / d)
            timeHours.innerHTML = Math.floor((difference % d) / h)
            timeMinutes.innerHTML = Math.floor((difference % h) / m)
            timeSeconds.innerHTML = Math.floor((difference % m) / s)
        }, 1000)

        document.querySelector('button').addEventListener('click', () => {
            clearInterval(interval)
        })

        formAddDate.reset()
    }
    e.preventDefault()
}