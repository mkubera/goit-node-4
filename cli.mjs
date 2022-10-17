import readline from "node:readline";

const logArgv = () => {
  const [, , ...args] = process.argv;
  console.log(args);
};

const rl = readline.createInterface({
  input: process.stdin, // wprowadzenie ze standardowego strumienia
  output: process.stdout, // wyprowadzenie do standardowego strumienia
});

rl.on("line", (cmd) => {
  console.log(`You just typed: ${cmd}`);
});

logArgv();

rl.close();

export default {
  logArgv,
};
