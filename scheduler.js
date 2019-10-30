const schedule = require('node-schedule');
import * as backup from './backup';

const rule = new schedule.RecurrenceRule();
rule.minute = 0;

const j = schedule.scheduleJob(rule, function () {
  console.log('running schedule!');
  backup.execute();
});
