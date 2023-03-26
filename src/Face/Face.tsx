import { useEffect } from 'react'

export default function Face(): JSX.Element {
  const ryan = document.querySelector('#ryan')
  const face = document.querySelectorAll<HTMLElement>('.ears, .eyes, .muzzle')
  const email = document.querySelector('input[type="text"]')
  const password = document.querySelector('input[type="password"]')
  const fauxInput = document.createElement('div')
  const span = document.createElement('span')
  let timer: any = null

  function rotate3d(x: number, y: number, z: number, rad: number) {
    const value = `rotate3d(${x}, ${y}, ${z}, ${rad}rad)`
    for (let i = 0; i < face.length; i++) {
      face[i].style.transform = value
    }
  }

  function focus(event: any) {
    event.target.classList.add('focused')
    copyStyles(event.target)
    event.target.type === 'password' ? lookAway(event) : look(event)
  }

  function reset(event: any) {
    event.target.classList.remove('focused')
    ryan?.classList.remove('playing')

    clearTimeout(timer)
    timer = setTimeout(() => {
      ryan?.classList.remove('look-away', 'down', 'up')
      rotate3d(0, 0, 0, 0)
    }, 1)
  }

  function copyStyles(el: any) {
    const props = window.getComputedStyle(el, null)

    if (fauxInput.parentNode === document.body) {
      document.body.removeChild(fauxInput)
    }

    fauxInput.style.visibility = 'hidden'
    fauxInput.style.position = 'absolute'
    fauxInput.style.top = Math.min(el.offsetHeight * -2, -999) + 'px'

    for (let i = 0; i < props.length; i++) {
      if (
        [
          'visibility',
          'display',
          'opacity',
          'position',
          'top',
          'left',
          'right',
          'bottom'
        ].indexOf(props[i]) !== -1
      ) {
        continue
      }
      fauxInput.style[props[i] as any] = props.getPropertyValue(props[i])
    }

    document.body.appendChild(fauxInput)
  }

  function look(event: any) {
    const el = event.target
    const text: any = el.value.substr(0, el.selectionStart)

    span.innerText = text || '.'

    const ryanRect = ryan?.getBoundingClientRect()
    if (ryanRect == null) return

    const inputRect = el.getBoundingClientRect()
    const caretRect = span.getBoundingClientRect()
    const caretPos =
      caretRect.left +
      Math.min(caretRect.width, inputRect.width) * (text ? 1 : 0)
    const distCaret =
      ryanRect.left + ryanRect.width / 2 - inputRect.left - caretPos
    const distInput = ryanRect.top + ryanRect.height / 2 - inputRect.top
    const y = Math.atan2(-distCaret, Math.abs(distInput) * 3)
    const x = Math.atan2(distInput, (Math.abs(distInput) * 3) / Math.cos(y))
    const angle = Math.max(Math.abs(x), Math.abs(y))

    rotate3d(x / angle, y / angle, y / angle / 2, angle)
  }

  function lookAway(event: any) {
    const el = event.target
    const ryanRect = ryan?.getBoundingClientRect()

    if (ryanRect == null) return

    const inputRect = el.getBoundingClientRect()
    const distInput = ryanRect.top + ryanRect.height / 2 - inputRect.top

    ryan?.classList.add('look-away', distInput < 0 ? 'up' : 'down')

    clearTimeout(timer)
    timer = setTimeout(() => {
      ryan?.classList.add('playing')
    }, 300)
  }

  fauxInput.appendChild(span)

  useEffect(() => {
    console.log(password)
    email?.addEventListener('focus', focus, false)
    email?.addEventListener('keyup', look, false)
    email?.addEventListener('click', look, false)
    email?.addEventListener('blur', reset, false)

    password?.addEventListener('focus', lookAway, false)
    password?.addEventListener('blur', reset, false)
  }, [])

  return (
    <svg id="ryan" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M0,150 C0,65 120,65 120,150"
        fill="#e0a243"
        stroke="#000"
        strokeWidth="2.5"
      />
      <g className="ears">
        <path
          d="M46,32 L46,30 C46,16 26,16 26,30 L26,32"
          fill="#e0a243"
          stroke="#000"
          strokeWidth="2.5"
          strokeLinecap="round"
          transform="rotate(-10,38,24)"
        />
        <path
          d="M74,32 L74,30 C74,16 94,16 94,30 L94,32"
          fill="#e0a243"
          stroke="#000"
          strokeWidth="2.5"
          strokeLinecap="round"
          transform="rotate(10,82,24)"
        />
      </g>
      {/* 라이언 얼굴 */}
      <circle
        cx="60"
        cy="60"
        r="40"
        fill="#e0a243"
        stroke="#000"
        strokeWidth="2.5"
      />
      <g className="eyes">
        {/*  left eye and eyebrow */}
        <line
          x1="37"
          x2="50"
          y1="46"
          y2="46"
          stroke="#000"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <circle cx="44" cy="55" r="3" fill="#000" />
        {/*  right eye and eyebrow  */}
        <line
          x1="70"
          x2="83"
          y1="46"
          y2="46"
          stroke="#000"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <circle cx="76" cy="55" r="3" fill="#000" />
      </g>
      <g className="muzzle">
        <path
          d="M60,66 C58.5,61 49,63 49,69 C49,75 58,77 60,71 M60,66 C61.5,61 71,63 71,69 C71,75 62,77 60,71"
          fill="#fff"
        />
        <path
          d="M60,66 C58.5,61 49,63 49,69 C49,75 58,77 60,71 M60,66 C61.5,61 71,63 71,69 C71,75 62,77 60,71"
          fill="#fff"
          stroke="#000"
          strokeWidth="2.5"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        <polygon
          points="59,63.5,60,63.4,61,63.5,60,65"
          fill="#000"
          stroke="#000"
          strokeWidth="5"
          strokeLinejoin="round"
        />
      </g>
      <path
        d="M40,105 C10,140 110,140 80,105 L80,105 L70,111 L60,105 L50,111 L40,105"
        fill="#fff"
      />
    </svg>
  )
}
