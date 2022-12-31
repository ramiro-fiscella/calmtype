const typingText = document.querySelector('.typing-text p')
const inputField = document.querySelector('.wrapper .input-field')
const mistakeTag = document.querySelector('.mistakes span')
const timeTag = document.querySelector('.time span b')

let timer
let maxTime = 60
let timeLeft = maxTime
let charIndex = (mistakes = isTyping = 0)

function randomParagraph() {
  let randIndex = Math.floor(Math.random() * paragraphs.length)
  paragraphs[randIndex].split('').forEach((span) => {
    let spanTag = `<span>${span}</span>`
    typingText.innerHTML += spanTag
  })

  document.addEventListener('keydown', () => inputField.focus())
  typingText.addEventListener('click', () => inputField.focus())
}

function initTyping() {
  const characters = typingText.querySelectorAll('span')
  let typedChar = inputField.value.split('')[charIndex]

  if (!isTyping) {
    timer = setInterval(initTimer, 1000)
    isTyping = true
  }

  if (typedChar == null) {
    charIndex--

    if (characters[charIndex].classList.contains('incorrect')) {
      mistakes--
    }

    characters[charIndex].classList.remove('correct', 'incorrect')
  } else {
    if (characters[charIndex].innerText === typedChar) {
      characters[charIndex].classList.add('correct')
    } else {
      characters[charIndex].classList.add('incorrect')
      mistakes++
    }
    charIndex++
  }

  characters.forEach((span) => span.classList.remove('active'))
  characters[charIndex].classList.add('active')

  mistakeTag.innerText = mistakes
}

function initTimer() {
  if (timeLeft > 0) {
    timeLeft--
    timeTag.innerText = timeLeft
  } else {
    clearInterval(timer)
  }
}
randomParagraph()

inputField.addEventListener('input', initTyping)
