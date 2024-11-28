import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import taskRoutes from './routes/taskRoutes.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({
  origin: 'http://localhost:4200',
  credentials: true,
}));

app.use(bodyParser.json());


app.use('/api/tasks', taskRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
