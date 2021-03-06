const schedule = require('node-schedule');
const monitoring = require('../monitoring')
const backup = require('../backup')
const notify = require('./notify')

const MIN_FREE_STORAGE = 50 * 1024 * 1024
const MAX_CPU_UTILIZATION = 90

const monitoring_rule = new schedule.RecurrenceRule();
monitoring_rule.minute = new schedule.Range(0, 59, 5);
const j = schedule.scheduleJob(monitoring_rule, async () => {
  console.log('running schedule j!');
  if (process.env.NODE_ENV != 'production') return console.log('skipping');

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

    if (node.systemStats.cpu_utilization_rate > MAX_CPU_UTILIZATION) {
      notify.push(null, 'cpu utilization')
    }
  }

  if (results.swap.free < (results.swap.total / 10)) {
    notify.push(null, 'swap is too low')
  }
})

const rule = new schedule.RecurrenceRule();
rule.minute = 0;
const y = schedule.scheduleJob(rule, async () => {
  console.log('running schedule y!');
  if (process.env.NODE_ENV != 'production') return console.log('skipping');

  backup.execute()
  backup.uploadDir('backup-events', 'backup-couchbase-tests')
})
