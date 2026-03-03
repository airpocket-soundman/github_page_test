import { mkdir, rm, copyFile } from "node:fs/promises";
import { spawn } from "node:child_process";

const DIST_DIR = "dist";

const staticFiles = [
  "index.html",
  "index.js",
  "README.md",
  "GITHUB_PAGES_SETUP.md",
  "ts-test.html",
  "react-test.html"
];

function run(command, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { stdio: "inherit", shell: true });
    child.on("exit", (code) => {
      if (code === 0) {
        resolve();
        return;
      }
      reject(new Error(`${command} ${args.join(" ")} failed with code ${code}`));
    });
    child.on("error", reject);
  });
}

await rm(DIST_DIR, { recursive: true, force: true });
await mkdir(DIST_DIR, { recursive: true });

await run("npx", [
  "tsc",
  "typescript-test.ts",
  "--target",
  "ES2020",
  "--module",
  "none",
  "--outDir",
  DIST_DIR
]);

await run("npx", [
  "esbuild",
  "react-test.tsx",
  "--bundle",
  "--platform=browser",
  "--format=iife",
  `--outfile=${DIST_DIR}/react-test.js`
]);

await Promise.all(staticFiles.map((file) => copyFile(file, `${DIST_DIR}/${file}`)));
