const CronJob = require("cron").CronJob;
const {
  createMatchupsResponse,
} = require("../responses/createMatchupsResponse");

const botTaskScheduler = () => {
  const jobs = [
    {
      pattern: "*/5 * * * * *",
      runTask: async () => {
        await createMatchupsResponse();
      },
    },
  ];

  jobs.forEach(({ pattern, runTask }) => {
    new CronJob(pattern, runTask, null, true, "America/New_York");
  });
};

module.exports = botTaskScheduler;
