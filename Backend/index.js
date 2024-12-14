import express from "express";
import { db } from "./config/db";

const app = express();
const PORT = 2024;

db()
.then(() => console.log("connected to mongodb database!"))
.catch(error => console.log(error))

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
