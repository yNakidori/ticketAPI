const { exec } = require("child_process");

process.on("exit", () => {
  exec("npx kill-port 5173", (error) => {
    if (error) {
      console.error(`Erro ao encerrar a porta: ${error.message}`);
    } else {
      console.log("Servidor Vite encerrado.");
    }
  });
});
