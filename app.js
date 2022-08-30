'use strict';
const startBtn = document.querySelector('#start');
const screens  = document.querySelectorAll('.screen');
const btnList = document.querySelector('.time-list');
const timeEl = document.querySelector('#time');
const board = document.querySelector('#board');
const colors = ['blue', 'yellow'];
let time = 0;
let score = 0;

startBtn.addEventListener('click', (event) => {
event.preventDefault()
    screens[0].classList.add('up')
})

btnList.addEventListener('click', (e) => {
    if(e.target.classList.contains('time-btn')) {
        time = parseInt(e.target.getAttribute('data-time'))
        screens[1].classList.add('up')
        startGame()
    }
})

board.addEventListener('click' , (e) => {
    if(e.target.classList.contains('circle')) {
        score+=1;
        e.target.remove()
        createRandomCircle()
    }
})

function startGame() {
    setInterval(decreaseTime, 1000)
    createRandomCircle()
    setTime()
}

function decreaseTime() {
    if(time === 0) {
        finishGame()
    } else {
        let current = --time;
        if(current < 10) {
            current = `0${current}`
        }
        setTime(current)
    }
}

function chooseRandomColor() {
    const index = Math.floor(Math.random() * colors.length)
    return colors[index]
}

function setColor(element) {
    element.style.background = chooseRandomColor();
}

function finishGame() {
    timeEl.parentNode.classList.add('hide');
    board.innerHTML = `<h1>Score: <span class="primary">${score}</span></h1>`
}

function createRandomCircle() {
    const circle = document.createElement('div');
    const size = randomNumber(10,60);
    const {width, height} = board.getBoundingClientRect();
    const x = randomNumber(0 , width - size);
    const y = randomNumber(0 , height - size);

    setColor(circle)

    circle.classList.add('circle')
    circle.style.width = `${size}px`;
    circle.style.height = `${size}px`;
    circle.style.top = `${y}px`;
    circle.style.left = `${x}px`;

    board.append(circle)
}

function setTime(value) {
    timeEl.innerHTML = `00:${value}`
}

function randomNumber(min, max) {
    return Math.round(Math.random() * ( max - min ) + min)
}
