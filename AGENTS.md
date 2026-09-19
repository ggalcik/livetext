## Verification

- For routine changes, run targeted ESLint and TypeScript checks on the affected files.
- Do not run a full Vite production build after every change.
- Run `npm run build` occasionally as a consistency check, and after build configuration, dependency, or broad cross-cutting changes.
- Existing unrelated lint failures do not need to be fixed unless requested.

## Windows commands

- PowerShell script execution is disabled.
- Always use `npm.cmd` and `npx.cmd`; never invoke `npm` or `npx` directly.