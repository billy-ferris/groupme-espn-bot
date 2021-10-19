const CronJob = require("cron").CronJob;
const { postMatchups } = require("../responses/postMatchups");

const jobs = [
  {
    pattern: "*/5 * * * * *",
    runTask: async () => {
      await postMatchups();
    },
  },
];

const botTaskScheduler = () =>
  jobs.forEach(({ pattern, runTask }) => {
    new CronJob(
      pattern,
      async () => {
        await runTask();
      },
      null,
      true,
      "America/New_York"
    );
  });

module.exports = botTaskScheduler;
