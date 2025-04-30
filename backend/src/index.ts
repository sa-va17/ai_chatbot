import app from "./app.js";
import { connectToDb } from "./db/connections.js";

//connections
const PORT = process.env.PORT || 4700

connectToDb().then(() => {
  app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT} and connected to database 👌`));
}).catch(err => console.log(err));
