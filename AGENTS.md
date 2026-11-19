# my-ascent

Rock-climbing-themed portfolio: a scroll-driven climb up El Capitan's Triple Direct. Smooth animation and responsive UI matter. Next.js 15 (App Router), React 19, TypeScript, Tailwind 4, shadcn/ui, Framer Motion. Single page, no backend, no env vars.

## Layout

- `app/`: layout, page, global CSS
- `components/`: `climber/` (route path + climber), `timeline/` (milestones, film frames, project panels), `welcome/`, `contact/`, `ui/` (shadcn)
- `config/`: content as data (`timeline.ts`, `projects.ts`, `climbFilm.ts`). Edit content here, not in components.
- `public/`: images (WebP), climber SVG
- `tests/`, `scripts/`: Vitest tests; `bootstrap` script

## Commands

pnpm only. Fresh worktree or sandbox: run `pnpm bootstrap` first. `bootstrap` is this repo's name for the standard `setup` command (`pnpm setup` is a pnpm builtin that edits shell config; never run it).

- `pnpm bootstrap`: install + create `.env`; fails on missing required vars.
- `pnpm dev`: Next dev via portless, URL printed on start. Agents and sandboxes use `PORTLESS_HTTPS=0 pnpm dev` (no local CA or sudo) or `PORTLESS=0 pnpm dev` (no proxy). In a worktree the branch's last segment is the subdomain.
- `pnpm lint`: eslint + prettier check. `pnpm format` fixes formatting.
- `pnpm typecheck`, `pnpm test`
- `pnpm verify`: lint + typecheck + test. CI runs this.
- `pnpm build`: production build (not part of verify)

## Testing

Vitest, `tests/`. Only data-integrity and logic tests exist: `content.test.ts` checks config image paths exist in `public/`, project slugs resolve, and route positions stay ordered; `env.test.ts` covers the bootstrap env check. Visual and animation changes have no automated tests: check them in the browser (`pnpm dev`) and attach a screenshot or recording to the PR.

## Deploy (Vercel)

- Vercel deploys `main` to production and every PR to a preview; the preview check must pass.
- `next.config.ts` sets `images.unoptimized` on purpose (Hobby plan image-optimization cap). Keep images pre-converted to WebP in `public/images`.
- No env vars to configure. Node version comes from `engines.node`.

<!-- dev-home:standards:start -->
<!-- Managed by dev-home sync-standards.sh. Edit repo-rules.md in dev-home, not here. -->

## Standards

Shared across Blake's repos. Repo-specific sections of this file override these rules.

### Commands

Exact commands are listed elsewhere in this file. Every repo has `setup`, `dev`, `lint`, `typecheck`, `test`, `verify`; `services` if it has backing services.

- Fresh worktree or sandbox: run `setup` first. It never starts services.
- Start services only when the task needs them (`services`, or `dev`).
- Never hardcode ports. HTTP via portless (`PORT`); databases via `*_URL` vars in `.env`.
- Run `verify` before claiming done.

### Testing

- Add a test only when it catches a failure nothing else catches. Extend an existing test before adding one.
- No tautological tests: no asserting mocks, restating the implementation, or testing the framework or type checker.
- Test behavior through public interfaces. A bug fix comes with a test that fails without it.

### Git and PRs

- Conventional Commits: `feat`, `fix`, `refactor`, `perf`, `test`, `docs`, `build`, `ci`, `chore`, `revert`.
- Never push, force-push, or commit directly to the default branch. Every change lands through a PR, squash-merged. Applies even where GitHub doesn't enforce it.
- Branch `<type>/<slug>`. Rename agent-prefixed branches (`claude/`, `cursor/`, `codex/`) before the first push.
- Commit subject `<type>(<scope>): <summary>`, imperative, lowercase, no period. Body says why.
- PR title uses the commit subject format. PR body: Why, What, Testing, Evidence, Notes.
- Add each new PR to the Dev Board project: `gh project item-add 1 --owner BlakeCrowther --url <pr-url>` (skip if `gh` lacks the `project` scope).
- Evidence: screenshots and a short recording for UI changes; command and output for API/CLI/data changes. Media goes on the PR, never in git (`.artifacts/` is gitignored).

### Code comments

Comments are for humans. Default: none.

- Why, not what. Rename before commenting.
- No stale facts: counts, versions, dates, line numbers, caller names, "currently". Point at the source of truth.
- No history ("new", "fixed", "now"); that goes in commits.
- Contract at the boundary: inputs, outputs, invariants, errors, units.
- Tag debt: `TODO(issue):`, `FIXME:`, `HACK:` (why + exit condition), `NOTE:`.
- No dead or commented-out code. Update comments with the code.

<!-- dev-home:standards:end -->
