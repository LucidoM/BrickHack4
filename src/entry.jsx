import { h, app } from "hyperapp"
import { Link, Route, location } from "@hyperapp/router"

import Ipfs from 'ipfs/src/index'
import OrbitDb from 'orbit-db'

import { getRoutePrefix } from './utils'

import Home from "./views/home.jsx"
import Video from "./views/Video.jsx"

import store from "./store.json"

const ipfsNode = new Ipfs({
  repo: 'grandvision/dapp/ipfs/videos',
  EXPERIMENTAL: {
    pubsub: true,
  },
  config: {
    Addresses: {
      Swarm: [
        // Use IPFS dev signal server
        '/dns4/ws-star.discovery.libp2p.io/tcp/443/wss/p2p-websocket-star',
      ]
    }
  }
})

ipfsNode.on('error', (e) => console.error(e))
ipfsNode.on('ready', async () => {
  const orbitdb = new OrbitDb(ipfsNode);

});

const state = {
  location: location.state, 
  videos: store.videos
}

const actions = {
  location: location.actions 
}

const prefix = getRoutePrefix()
const view = (state, actions) => (
  <main>
    <Route path = {`${prefix}/video`} render={Video}/>
    <Route path = {`${prefix}/`} render = {() => <Home videos={state.videos}/>}/>
  </main>
)

console.log(state);
console.log(store);
const main = app(state, actions, view, document.getElementById('spa-anchor'))
const unsubscribe = location.subscribe(main.location)
