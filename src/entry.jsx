require('video.js/dist/video-js.css')
require('./index.css')

import { h, app } from "hyperapp"
import { Link, Route, location } from "@hyperapp/router"

import Ipfs from 'ipfs/src/index'
import IpfsApi from 'ipfs-api'

import { VideoIndexStore, VideoDetailStore } from './stores'
import { getRoutePrefix } from './utils'

import Home from "./views/home.jsx"
import Video from "./views/Video.jsx"

import store from "./store.json"

const ipfsNode = new IpfsApi('localhost', '5001')

const initialize = async () => {
  const index = new VideoIndexStore(ipfsNode)
  const vidHashes = await index.fetch()

  console.log(await index._fetchJson())
  const vidPromises = vidHashes.map((h) => new VideoDetailStore(ipfsNode, h).getVideo())
  const vids = await Promise.all(vidPromises)
  console.log(vids)
  main.homeState.receiveVideos(vids)
  console.log(state)
}

const state = {
  location: location.state,
  homeState: {
    videos: [],
  },
  videoState: {
    currentVideo: null
  },
  videos: store.videos
}

const actions = {
  location: location.actions,
  homeState: {
    receiveVideos: (vids) => (state) => state.videos = vids
  },
  videoState: {
    currentVideo: {
      receive: (vid) => vid
    }
  }
}

const prefix = getRoutePrefix()
const view = (state, actions) => (
  <main oncreate={initialize}>
    <Route path = {`${prefix}/video/:id`} render={({ match }) => <Video onVideo={actions.videoState.currentVideo.receive} ipfs={ipfsNode} vid={state.videoState.currentVideo} match={match} />}/>
    <Route path = {`${prefix}/`} render = {( ) => <Home videos={state.homeState.videos}/>}/>
  </main>
)

const main = app(state, actions, view, document.getElementById('spa-anchor'))
const unsubscribe = location.subscribe(main.location)

