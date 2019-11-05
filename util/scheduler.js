const schedule = require('node-schedule');
const monitoring = require('../monitoring')
const notify = require('./notify')

const MIN_FREE_STORAGE = 50 * 1024 * 1024

const rule = new schedule.RecurrenceRule();
rule.minute = 0;

const j = schedule.scheduleJob(rule, async () => {
  console.log('running schedule j!');
  let results = await monitoring.monitor()
  if (results.free_men / results.total_men < 0.1) {
    notify.push(null, 'total cluster memory')
  }

  if (results.nodes.storageTotals.hdd.free < MIN_FREE_STORAGE) {
    notify.push(null, 'storage limit reached')
  }

  for (let node of results.nodes.nodes) {
    if (node.status != 'healthy') {
      notify.push(null, 'node healthy')
    }

    if (node.systemStats.cpu_utilization_rate > 90) {
      notify.push(null, 'cpu utilization')
    }
  }
})


const y = schedule.scheduleJob(rule, async () => {
  console.log('running schedule y!');

})