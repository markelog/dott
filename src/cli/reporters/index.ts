import stdout from "./stdout";

type reporterSuccessType = (data: number[][][]) => void;
type reporterErrorType = (err: Error, verbose: boolean) => void;

export type reporterType = {
  success: reporterSuccessType;
  error: reporterErrorType;
};

const reporters: { [unit: string]: reporterType } = {
  stdout,
};

export default {
  get: (name: string): reporterType => {
    if (reporters[name] == null) {
      throw new Error(`Reporter "${name}" doesn't exist`);
    }

    return reporters[name];
  },
};
