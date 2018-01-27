const shell = require('shelljs')

shell.echo("Deploying to IPFS...")

shell.exec("ipfs add -r dist", (code, stdout, stderr) => {
    // Get the URL, assuming things didn't blow up
    const lines = stdout.split("\n")
    console.log(lines)
    const last = lines[lines.length - 2]
    const parts = last.split(" ")
    const siteHash = parts[1]

    const localURL = `http://localhost:8080/ipfs/${siteHash}`
    const gatewayURL = `http://gateway.ipfs.io/ipfs/${siteHash}`

    shell.echo("Local URL: " + localURL) 
    shell.echo("Gateway URL: " + gatewayURL)

})