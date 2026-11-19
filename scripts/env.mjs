const entry = /^([A-Z][A-Z0-9_]*)=([^#]*)(#.*)?$/;

/**
 * Returns the names of `# required` variables in `.env.example` that are still
 * unset: no non-empty value in the process environment, and a value in `.env`
 * that is empty or still the example's placeholder.
 */
export function missingRequired(exampleText, envText, processEnv = {}) {
  const read = (text) =>
    text
      .split("\n")
      .map((line) => line.match(entry))
      .filter(Boolean)
      .map(([, name, value, comment]) => ({
        name,
        value: value.trim(),
        required: /#\s*required\b/.test(comment ?? ""),
      }));

  const actual = Object.fromEntries(
    read(envText).map(({ name, value }) => [name, value]),
  );
  return read(exampleText)
    .filter(({ required }) => required)
    .filter(({ name, value: placeholder }) => {
      if (processEnv[name]) return false;
      return !actual[name] || actual[name] === placeholder;
    })
    .map(({ name }) => name);
}
