import { getRoutePrefix } from '../utils'
import { VideoMetadata } from './video-metadata'

export class Video {
  constructor(hash, metadata) {
    this.hash = hash
    this.metadata = new VideoMetadata(metadata)
  }

  get videoPath() {
    return `${getRoutePrefix()}/video/${this.hash}`
  }

  get thumbnailPath() {
    return `/ipfs/${hash}/thumbnail.jpg`
  }

  get hasThumbnail() {
    return this.metadata.thumbnail != null
  }
}
