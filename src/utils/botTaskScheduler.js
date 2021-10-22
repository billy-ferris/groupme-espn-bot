const CronJob = require("cron").CronJob;
const handleMatchupsResponse = require("../responses/matchups");

const botTaskScheduler = () => {
  const jobs = [
    {
      pattern: "*/5 * * * * *",
      runTask: async () => {
        await handleMatchupsResponse();
      },
    },
  ];

  jobs.forEach(({ pattern, runTask }) => {
    new CronJob(pattern, runTask, null, true, "America/New_York");
  });
};

module.exports = botTaskScheduler;
