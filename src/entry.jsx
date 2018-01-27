import { h, app } from "hyperapp"
import Home from "./views/home.jsx"

import store from "./store.json"

const state = {
  videos: store.videos
}

const actions = {
  
}

const view = (state, actions) => (
  <main>
    <h1> Hey World </h1> 
    <Home videos={state.videos}/>
  </main>
)

const main = app(state, actions, view, document.body)