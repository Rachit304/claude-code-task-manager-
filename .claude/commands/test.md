---
description: Run the unit tests for Taskflow and summarize the results
allowed-tools: Bash(npm test:*), Bash(npm run test:*)
---

Run the unit tests for this project with `npm test`. Pass through any arguments the user gave: $ARGUMENTS

- If `package.json` has no `test` script, say so and stop. Do not invent a test runner or add dependencies unless asked.
- If all tests pass, report the pass count in one line.
- If any fail, list each failing test with its file and error message, then point to the likely cause in the source. Do not modify code unless asked.
