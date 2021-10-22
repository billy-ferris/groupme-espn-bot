const botTaskScheduler = require("./botTaskScheduler");
const handleMatchupsResponse = require("../responses/matchups");

jest.mock("../responses/matchups");

describe("botTaskScheduler function", () => {
  jest.useFakeTimers();
  botTaskScheduler();

  test.each([handleMatchupsResponse])(
    "should run task on scheduled time",
    (task) => {
      expect(task).not.toBeCalled();
      jest.runOnlyPendingTimers();
      expect(task).toBeCalledTimes(1);
    }
  );
});
