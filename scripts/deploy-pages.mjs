/**
 * Manual deploy to GitHub Pages.
 *
 *   npm run deploy
 *
 * Builds both deliverables, assembles them into one static site, and force-
 * pushes it to the `gh-pages` branch. `main` stays source-only, so anyone
 * reading the repository sees code rather than build output.
 *
 *   /            → the Threat Monitoring prototype
 *   /storybook/  → the @clickguard/ui Storybook
 *
 * Both builds emit relative asset URLs (the prototype via `base: "./"` in its
 * Vite config, Storybook by default), which is what lets them sit under a
 * repository subpath like /ClickGuard/ instead of a domain root.
 */
import { execFileSync } from "node:child_process";
import { cpSync, existsSync, mkdirSync, rmSync, writeFileSync, readdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const siteDir = resolve(root, "_site");
const worktree = resolve(root, ".gh-pages-worktree");
const BRANCH = "gh-pages";

/** Git for Windows is not always on PATH in a fresh shell. */
function findGit() {
  const candidates = [
    "git",
    "C:\\Program Files\\Git\\cmd\\git.exe",
    "C:\\Program Files (x86)\\Git\\cmd\\git.exe",
  ];
  for (const candidate of candidates) {
    try {
      execFileSync(candidate, ["--version"], { stdio: "ignore" });
      return candidate;
    } catch {
      /* try the next one */
    }
  }
  throw new Error("git not found");
}

const GIT = findGit();

const run = (cmd, args, opts = {}) =>
  execFileSync(cmd, args, { cwd: root, stdio: "inherit", shell: false, ...opts });

/**
 * npm ships as `npm.cmd` on Windows, and since the 2024 argument-injection
 * fix Node refuses to spawn a `.cmd` without a shell (EINVAL). Every argument
 * here is a literal we control, so enabling the shell is safe.
 */
const npmRun = (...args) =>
  execFileSync(process.platform === "win32" ? "npm.cmd" : "npm", args, {
    cwd: root,
    stdio: "inherit",
    shell: process.platform === "win32",
  });

const git = (...args) => run(GIT, args);

const gitQuiet = (...args) => {
  try {
    return execFileSync(GIT, args, { cwd: root, encoding: "utf8" }).trim();
  } catch {
    return null;
  }
};

const step = (label) => console.log(`\n\u2022 ${label}`);

/* --- 1. build ---------------------------------------------------------- */

step("Building @clickguard/ui and the prototype");
npmRun("run", "build");

step("Validating the mock data against the product mechanics");
npmRun("run", "check:data");

step("Building Storybook");
npmRun("run", "build-storybook", "--workspace", "@clickguard/ui");

/* --- 2. assemble -------------------------------------------------------- */

step("Assembling _site");
rmSync(siteDir, { recursive: true, force: true });
mkdirSync(siteDir, { recursive: true });

cpSync(resolve(root, "apps/prototype/dist"), siteDir, { recursive: true });
// Scaffolding for artifact publishing; not part of the deployed site.
rmSync(resolve(siteDir, "artifact-page.html"), { force: true });

cpSync(resolve(root, "packages/ui/storybook-static"), resolve(siteDir, "storybook"), {
  recursive: true,
});
rmSync(resolve(siteDir, "storybook/artifact-page.html"), { force: true });

// Without this, Pages runs the output through Jekyll, which silently drops
// any file or directory whose name begins with an underscore.
writeFileSync(resolve(siteDir, ".nojekyll"), "");

// These are build artifacts: commit them byte-for-byte. Git's `text=auto`
// heuristic would otherwise rewrite line endings in the JS and HTML, and the
// hashed filenames would stop matching what the bundler actually emitted.
writeFileSync(resolve(siteDir, ".gitattributes"), "* -text\n");

console.log(`  ${readdirSync(siteDir).length} entries at the site root`);

/* --- 3. publish --------------------------------------------------------- */

step(`Publishing to ${BRANCH}`);

rmSync(worktree, { recursive: true, force: true });
gitQuiet("worktree", "prune");

const branchExists =
  gitQuiet("rev-parse", "--verify", `refs/heads/${BRANCH}`) !== null ||
  gitQuiet("ls-remote", "--exit-code", "--heads", "origin", BRANCH) !== null;

if (branchExists) {
  git("worktree", "add", "--force", worktree, BRANCH);
} else {
  git("worktree", "add", "--force", "--detach", worktree);
  run(GIT, ["checkout", "--orphan", BRANCH], { cwd: worktree });
}

// Clear the worktree, then drop the freshly built site in.
for (const entry of readdirSync(worktree)) {
  if (entry === ".git") continue;
  rmSync(resolve(worktree, entry), { recursive: true, force: true });
}
cpSync(siteDir, worktree, { recursive: true });

run(GIT, ["add", "-A"], { cwd: worktree });

const sha = gitQuiet("rev-parse", "--short", "HEAD") ?? "unknown";
try {
  run(GIT, ["commit", "-q", "-m", `Deploy site from ${sha}`], { cwd: worktree });
} catch {
  console.log("  nothing changed since the last deploy");
}

run(GIT, ["push", "--force", "origin", `${BRANCH}:${BRANCH}`], { cwd: worktree });

/* --- 4. clean up -------------------------------------------------------- */

git("worktree", "remove", "--force", worktree);
if (existsSync(worktree)) rmSync(worktree, { recursive: true, force: true });

const url = (gitQuiet("remote", "get-url", "origin") ?? "")
  .replace(/^git@github\.com:/, "https://github.com/")
  .replace(/\.git$/, "");
const match = url.match(/github\.com\/([^/]+)\/([^/]+)/);

console.log("\nDeployed.");
if (match) {
  const [, owner, repo] = match;
  console.log(`  prototype  https://${owner.toLowerCase()}.github.io/${repo}/`);
  console.log(`  storybook  https://${owner.toLowerCase()}.github.io/${repo}/storybook/`);
}
console.log(
  "\nFirst time only: in the repo, Settings \u2192 Pages \u2192 Source \u2192" +
    ` "Deploy from a branch" \u2192 ${BRANCH} / (root).`,
);
