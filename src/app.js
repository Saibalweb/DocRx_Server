import express from "express";
import cors from "cors";
const app = express();

app.use(
  cors({
    origin: process.env.cors,
  })
);
app.use(express.urlencoded({ extended: true, limit: "20kb" }));
app.use(express.json({ limit: "20kb" }));

import medicineRoute from './routes/medicine.routes.js';
import diseaseRoute from './routes/disease.routes.js';
app.use('/api/v1/medicine', medicineRoute);
app.use('/api/v1/disease', diseaseRoute);

export default app;
