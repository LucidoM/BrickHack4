import { h, app } from "hyperapp"
import { Link, Route, location } from "@hyperapp/router"

import Home from "./views/home.jsx"
import Video from "./views/Video.jsx"

import store from "./store.json"

const state = {
  location: location.state, 
  videos: store.videos
}

const actions = {
  location: location.actions 
}

const view = (state, actions) => (
  <main>
    <Route path = "/video" render={Video}/> 
    <Route path = "/" render = {() => <Home videos={state.videos}/>}/>
  </main>
)

const main = app(state, actions, view, document.body)
const unsubscribe = location.subscribe(main.location)