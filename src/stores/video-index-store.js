const ipnsIdentifier = 'QmV19bWHVrxuUdaoUtwWScvE7xfJ86ysZfK4pFmeDSPMT5'
const filename = 'videos.json'
const fetchMetaPath = (ipfs) => ipfs.name.resolve(ipnsIdentifier)

export class VideoIndexStore {
  constructor(ipfs) {
    this.ipfs = ipfs

    this._fetchJson = this._fetchJson.bind(this)
  }

  async fetch() {
    const data = await this._fetchJson()
    return data.hashes
  }

  async _fetchJson()  {
    const path = await fetchMetaPath(this.ipfs)
    const file = await this.ipfs.files.cat(`${path}/${filename}`)

    return JSON.parse(file.toString())
  }
}
