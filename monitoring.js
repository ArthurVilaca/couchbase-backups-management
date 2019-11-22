const os = require('os');
const axios = require('axios')
const si = require('systeminformation')

let options, response, swap

async function monitor() {
  options = {
    headers: {
      Authorization: `Basic ${Buffer.from(`${process.env.DB_USER}:${process.env.DB_PASSWORD}`).toString('base64')}`
    }
  }
  response = await axios.get(`http://${process.env.DB_HOST}:8091/pools/nodes`, options)

  swap = await si.mem()

  return {
    cpu: os.cpus(),
    total_men: os.totalmem(),
    free_men: os.freemem(),
    nodes: response.data,
    swap: {
      total: swap.swaptotal / 1000,
      used: swap.swapused / 1000,
      free: swap.swapfree / 1000
    }
  }
}

// (async () => {
//   console.log(await monitor())
// })

module.exports = { monitor };
