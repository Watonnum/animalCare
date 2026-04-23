const { connectToDatabase } = require("./utils/db.js");
connectToDatabase()
  .then(({ db }) => {
    db.collection("users")
      .find({}, { projection: { name: 1, email: 1, password: 1, role: 1 } })
      .toArray()
      .then((users) => {
        users.forEach((u) =>
          console.log(
            JSON.stringify({
              name: u.name,
              email: u.email,
              hasPassword: !!u.password,
              role: u.role,
            }),
          ),
        );
        process.exit(0);
      });
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
