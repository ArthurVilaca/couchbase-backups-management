const schedule = require('node-schedule');

const rule = new schedule.RecurrenceRule();
rule.minute = 0;

const j = schedule.scheduleJob(rule, () => {
  console.log('running schedule!');
})
