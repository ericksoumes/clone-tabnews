const { exec } = require("node:child_process");

function showSpinner() {
  const intervalToUpdateMs = 200;
  const spinner = ["⣾", "⣽", "⣻", "⢿", "⡿", "⣟", "⣯", "⣷"];
  const index = Math.floor(Date.now() / intervalToUpdateMs) % spinner.length;
  return `${spinner[index]}`;
}

function checkPostgres() {
  exec("docker exec postgres-dev pg_isready --host localhost", handleReturn);
  function handleReturn(error, stdout) {
    if (stdout.search("accepting connections") === -1) {
      process.stdout.write(
        `\r🟡 ${"Esperando Postgres aceitar conexões..."} ${showSpinner()}`,
      );
      checkPostgres();
      return;
    }
    process.stdout.write(
      `\n🟢 "Postgres está pronto para aceitar conexões!"\n`,
    );
  }
}

checkPostgres();
