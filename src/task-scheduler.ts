import { CronJob } from "cron";
import { postMatchups } from "./messages/matchups";

export const taskScheduler = (): void => {
  const tasks = [
    {
      pattern: "*/10 * * * * *",
      runTask: async () => await postMatchups(),
    },
  ];

  tasks.forEach(
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
