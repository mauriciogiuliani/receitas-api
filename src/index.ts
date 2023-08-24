// Express Setup
import express from "express";
import { handler } from "./graphql";
import cors from "cors";

const app = express();
const port = 3000;
app.use(cors())

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.use("/graphql", handler());





// Parse JSON bodies (as sent by API clients)
// app.use(express.json());
// app.post('/receitas', (req, res) => {
//   receitas.push(req.body);

//   const updatedJson = JSON.stringify(receitas, null, 2);

//   // Write the updated data back to the file
//   fs.writeFile(process.env.RECEITAS_JSON, updatedJson, 'utf8', (err) => {
//     if (err) {
//       console.error("Error writing the file:", err);
//       return;
//     }
//     console.log("Object added and file saved successfully.");
//   });

//   res.send('POST receitas');
// });

// const userRoutes = require('./src/routes');
// app.use('/users', userRoutes);
