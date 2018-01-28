import { h } from "hyperapp"
import { Link } from "@hyperapp/router"

import { getRoutePrefix } from '../utils'

const VidLinkItem = ({ vid }) => {
  return (
    <li>
      <Link to={ vid.videoPath}>{ vid.metadata.title }</Link>
    </li>
  )
}

const Home = ({ videos }, actions) => {
  console.log(videos)
  return (
    <ol>
      { videos.map((v) => <VidLinkItem vid={v} />) }
    </ol>
  )
}

export default Home 
