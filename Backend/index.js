import express from "express";

const app = express();
const PORT = 2024;




app.listen(PORT, () => {
    console.log(`Server is Running on port ${PORT}`);
});
