import { getSession, parameterToAPI } from "./lib";

parameterToAPI(process.argv[2])
  .then(getSession)
  .then((session) => {
    session
      .ask("Write a hello world web page", (resp) => process.stdout.write(resp))
      .then(console.log);
  });
