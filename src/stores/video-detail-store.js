import { Video } from '../models'

const metadataObject = 'metadata.json'
const videoObject = 'video.mp4'
const thumbnailObject = 'thumbnail.jpg'

export class VideoDetailStore {
  constructor(ipfs, hash) {
    this.ipfs = ipfs
    this.hash = hash

    this.fetchMetadata = this.fetchMetadata.bind(this)
  }

  async getVideo() {
    return new Video(this.hash, await this.fetchMetadata())
  }

  async fetchMetadata() {
    const rawMetadata = await this.ipfs.files.cat(`/ipfs/${this.hash}/${metadataObject}`)
    console.log(rawMetadata.toString())
    return JSON.parse(rawMetadata.toString())
  }

  get thumbnailPath() {
    return `/ipfs/${this.hash}/${thumbnailObject}`
  }

  get videoPath() {
    return `/ipfs/${this.hash}/${videoObject}`
  }
}
