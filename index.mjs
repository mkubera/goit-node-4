import logger from "./logger.mjs";
import cli from "./cli.mjs";
import { readFile, readdir, stat } from "node:fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// readFile('todo.txt')
//   .then(data => console.log(data.toString()))
//   .catch(err => console.log(err.message));

readdir(__dirname)
  .then((files) => {
    return Promise.all(
      files.map(async (filename) => {
        const stats = await stat(filename);
        return {
          Name: filename,
          Size: stats.size,
          Date: stats.mtime,
        };
      })
    );
  })
  .then(console.table);

cli.logArgv();
