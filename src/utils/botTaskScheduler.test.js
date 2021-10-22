const botTaskScheduler = require("./botTaskScheduler");
const {
  createMatchupsResponse,
} = require("../responses/createMatchupsResponse");

jest.mock("../responses/createMatchupsResponse");

describe("botTaskScheduler function", () => {
  jest.useFakeTimers();
  botTaskScheduler();

  test.each([{ job: "Post Matchups", task: createMatchupsResponse }])(
    "should schedule job: $job",
    ({ task }) => {
      expect(task).not.toBeCalled();
      jest.runOnlyPendingTimers();
      expect(task).toBeCalledTimes(1);
    }
  );
});
