var rocket
var lastX = 0
var lastY = 0
var moving = false
var audioAuthorized = false

const audio = new Audio('rocket.mp3')
audio.preload = 'auto'

function moveRocket(x, y) {
	if (moving) return
	moving = true
	let dx = lastX - x
	let dy = lastY - y
	let theta = Math.atan2(dy, dx)
	theta *= 180 / Math.PI
	rocket.style.setProperty('--angle', `${theta}deg`)
	rocket.classList.add('moving')
	audio.currentTime = 0
	audio.volume = 1
	audio.play()
	setTimeout(() => {
		rocket.style.setProperty('--x', `${x}px`)
		rocket.style.setProperty('--y', `${y}px`)
		setTimeout(() => {
			lastX = rocket.offsetLeft
			lastY = rocket.offsetTop
			rocket.classList.add('stopping')
			setTimeout(() => {
				rocket.classList.remove('moving')
				rocket.classList.remove('stopping')
			}, 250)
			moving = false
		}, 1000)
	}, 250)
}

document.onreadystatechange = () => {
	if (document.readyState != 'complete') return
	rocket = document.querySelector('figure')
	lastX = rocket.offsetLeft
	lastY = rocket.offsetTop
}

document.onclick = () => {
	if (audioAuthorized) return
	audio.volume = 0
	audio.play()
	audioAuthorized = true
}

window.onclick = e => {
	let x = e.pageX - (rocket.clientWidth / 2)
	let y = e.pageY - (rocket.clientHeight / 2)
	moveRocket(x, y)
}