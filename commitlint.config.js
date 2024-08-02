module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [
      2,
      "always",
      [
        "init",
        "feat", // feature
        "fix", // fix
        "docs", // documentation
        "style", // styling
        "refactor", // refactoring
        "test", // testing
        "perf",
        "build", // build related
        "ci", // continuous integration
        "chore", // chores
        "revert", // revert changes
      ],
    ],
    "subject-case": [0],
  },
};
