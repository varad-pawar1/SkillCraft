import express from "express";
import "dotenv/config";
import { connect } from "mongoose";
import { adminRouter } from "./routes/adminRoutes.js";
import { authMiddleware } from "./middlewares/authMiddleware.js"
import morgan from "morgan";
import compression from "compression";
import cors from "cors";
import { instructorRouter } from "./routes/instructorRoutes.js";
import { studentRouter } from "./routes/studentRoutes.js";

const app = express();
// app.use(
//   cors({
//     origin: ["http://localhost:5173"],
//   })
// );

app.use(morgan("common"));

app.use(compression());



app.use(express.json());
app.use("/admin", adminRouter);
app.use("/instructors", instructorRouter);
app.use("/student", studentRouter)




app.use(authMiddleware)


app.get("/varad", (req, res) => {
  res.send("authMiddleware varad")
})


app.listen(2022, async () => {
  await connect(process.env.DB_URL);
  console.log("Server started on http:localhost:2022");
});
