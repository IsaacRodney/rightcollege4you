import { spawn } from "node:child_process";

const tasks = [
  { command: "npm", args: ["run", "dev"], cwd: new URL("../client", import.meta.url) },
  { command: "npm", args: ["run", "dev"], cwd: new URL("../server", import.meta.url) }
];

const children = tasks.map((task) =>
  spawn(task.command, task.args, {
    cwd: task.cwd,
    shell: true,
    stdio: "inherit"
  })
);

const cleanup = () => {
  for (const child of children) {
    child.kill();
  }
};

process.on("SIGINT", cleanup);
process.on("SIGTERM", cleanup);
