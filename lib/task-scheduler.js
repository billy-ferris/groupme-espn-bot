"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskScheduler = void 0;
const cron_1 = require("cron");
const matchups_1 = require("./messages/matchups");
const taskScheduler = () => {
    const tasks = [
        {
            pattern: "*/10 * * * * *",
            runTask: async () => await (0, matchups_1.postMatchups)(),
        },
    ];
    tasks.forEach(async ({ pattern, runTask, }) => {
        new cron_1.CronJob(pattern, runTask, null, true, "America/New_York");
    });
};
exports.taskScheduler = taskScheduler;
