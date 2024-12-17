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
import doctorRoute from './routes/doctor.routes.js';
import patientRoute from './routes/patient.routes.js';

app.use("/api/v1/doctor",doctorRoute);
app.use('/api/v1/medicine', medicineRoute);
app.use('/api/v1/disease', diseaseRoute);
app.use('/api/v1/patient',patientRoute);

export default app;
