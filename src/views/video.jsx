import { h } from "hyperapp"
import { VideoDetailStore } from '../stores'
import videojs from 'video.js'

const Video = ({ ipfs, vid, match, onVideo }, actions) => {
  const hash = match.params.id

  const detail = new VideoDetailStore(ipfs, hash)

  console.log(actions)
  if (vid.hash !== hash) {
    detail.getVideo().then((vid) => onVideo(vid))

    return (<h2>Loading...</h2>)
  } else {
    console.log({
      hash,
      vid
    })

    const setupPlayer = () => videojs('videoplayerid', {
      controls: true,
      preload: 'auto'
    }).ready(function () { this.play() })

    return (
      <div>
        <h1>{ vid.metadata.title }</h1>
        <video
          oncreate={setupPlayer}
          id="videoplayerid"
          class="video-js vjs-default-skin vjs-big-play-centered"
          poster={vid.hasThumbnail ? `https://gateway.ipfs.io/${vid.thumbnailPath}` : null}
        >
          <source
            type="video/mp4"
            src={ `https://gateway.ipfs.io/${detail.videoPath}` }/>
        </video>
        <section>{ vid.metadata.description }</section>
      </div>
    )
  }
}

export default Video 
