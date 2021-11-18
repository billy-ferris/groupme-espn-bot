import { CronJob } from "cron";
import handleMatchupsResponse from "../responses/matchups";

const botTaskScheduler = (): void => {
  const jobs = [
    {
      pattern: "*/5 * * * * *",
      runTask: async () => {
        await handleMatchupsResponse();
      },
    },
  ];

  jobs.forEach(
    async ({
      pattern,
      runTask,
    }: {
      pattern: string;
      runTask: () => Promise<void>;
    }): Promise<void> => {
      new CronJob(pattern, runTask, null, true, "America/New_York");
    }
  );
};

export default botTaskScheduler;
