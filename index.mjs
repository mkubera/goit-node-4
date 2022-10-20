import readline from "node:readline";
import fs from "node:fs/promises";
import { program } from "commander";
import colors from "colors";

program.option(
  "-f, --file [type]",
  "file for saving game results",
  "results.txt"
);
program.parse(process.argv);

const rl = readline.createInterface({
  input: process.stdin, // wprowadzenie ze standardowego strumienia
  output: process.stdout, // wyprowadzenie do standardowego strumienia
});

let count = 0;
const logFileName = program.opts().file;
const randomNumber = Math.floor(Math.random() * 10) + 1;

const isValid = (value) => {
  if (isNaN(value)) {
    console.log("Wprowadź liczbę!".red);
    return false;
  } else if (value < 1 || value > 10) {
    console.log("Liczba powinna znajdować się w przedziale od 1 do 10".red);
    return false;
  } else {
    return true;
  }
};

const log = async (data) => {
  try {
    await fs.appendFile(logFileName, `${data}\n`);
    console.log(`Udało się zapisać rezultat w pliku ${logFileName}`.green);
  } catch (err) {
    console.log(`Nie udało się zapisać pliku ${logFileName}`.red);
  } finally {
    () => rl.close();
  }
};

const game = () => {
  rl.question("Wprowadź liczbę od 1 do 10, aby zgadywać: ".yellow, (value) => {
    const valueNumber = Number(value);

    if (!isValid(valueNumber)) {
      game();
      return;
    }

    count++;

    if (valueNumber === randomNumber) {
      console.log(`Gratulacje. Odgadłeś liczbę w ${count} razy`.green);
      const date = new Date().toLocaleDateString();
      log(`${date}: Gratulacje. Odgadłeś liczbę za ${count} razem`);
      return;
    }

    console.log("Nie zgadłeś. Kolejna próba.".red);
    game();
  });
};

game();
