import botTaskScheduler from "./botTaskScheduler";
import handleMatchupsResponse from "../responses/matchups";

jest.mock("../responses/matchups");

describe("botTaskScheduler function", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    botTaskScheduler();
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  test.each([handleMatchupsResponse])(
    "should run task on scheduled time",
    (task) => {
      expect(task).not.toBeCalled();
      jest.runOnlyPendingTimers();
      expect(task).toBeCalledTimes(1);
    }
  );
});
