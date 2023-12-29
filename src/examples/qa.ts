import { getSession, parameterToAPI } from "./lib";

parameterToAPI(process.argv[2])
  .then(getSession)
  .then((session) => {
    session
      .ask("Can you search the internet to answer questions?", (resp) =>
        process.stdout.write(resp)
      )
      .then(console.log);
  });
