import stdout from "./stdout";

type reporterType = (data: number[][][]) => void;

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
