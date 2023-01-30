import express from "express";
import route from "./routes/index";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());
app.use(route);

const PORT = process.env.PORT || 4000; 

app.listen(PORT, async () => {
    console.log(`Server Express.js running on port: ${PORT}`);
});