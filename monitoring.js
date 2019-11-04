require('dotenv').config()
const os = require('os');
const axios = require('axios')

async function monitor() {
  let options = {
    headers: {
      Authorization: `Basic ${Buffer.from(`${process.env.DB_USER}:${process.env.DB_PASSWORD}`).toString('base64')}`
    }
  }
  let response = await axios.get(`http://${process.env.DB_HOST}:8091/pools/nodes`, options)

  return {
    cpu: os.cpus(),
    total_men: os.totalmem(),
    free_men: os.freemem(),
    nodes: response.data
  }
}

// (async () => {
//   console.log(await monitor())
// })

module.exports = { monitor };
