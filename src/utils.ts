

export const generateFromTo = (options: { unit: number, skip: number }, line: number | number[], step: number) => (typeof line === 'number' ? [line] : line).map((line) => ({
  line,
  from: options.unit * (step + 1) + options.skip,
  to: options.unit * (step + 1) + options.unit + options.skip,
}))
