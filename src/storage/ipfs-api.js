import Ipfs from 'ipfs/src/index';

class IpfsApi {
  constructor(repository) {
    this.ipfs = new Ipfs({
      repo: repository,
      EXPERIMENTAL: {
        pubsub: true,
      },
      config: {
        Addresses: {
          Swarm: [
            // Use IPFS dev signal server
            '/dns4/star-signal.cloud.ipfs.team/wss/p2p-webrtc-star',
          ]
        },
      }
    });
  }

  async fetch(hash) {
    await this.ipfs.files.cat(hash);
  }
}

export default (new IpfsApi('grand/vision/db'));
