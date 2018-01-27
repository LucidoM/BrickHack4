import { h, app } from "hyperapp"

const SECONDS = 5

const pad = n => (n < 10 ? "0" + n : n)

const humanizeTime = t => {
  const hours = (t / 3600) >> 0
  const minutes = ((t - hours * 3600) / 60) >> 0
  const seconds = (t - hours * 3600 - minutes * 60) >> 0
  return `${pad(minutes)}:${pad(seconds)}`
}

const state = {
  count: SECONDS,
  paused: true
}

const actions = {
  tick: () => (state, actions) => {
    if (state.count === 0) {
      actions.reset()
      actions.toggle()
    } else if (!state.paused) {
      actions.drop()
    }
  },
  drop: () => state => ({ count: state.count - 1 }),
  reset: () => ({ count: SECONDS }),
  toggle: () => state => ({ paused: !state.paused })
}

const view = (state, actions) => (
  <main>
    <h1>{humanizeTime(state.count)}</h1>

    <button onclick={actions.toggle}>
      {state.paused ? "START" : "PAUSE"}
    </button>

    <button onclick={actions.reset}>RESET</button>
  </main>
)

const main = app(state, actions, view, document.body)

setInterval(main.tick, 1000)