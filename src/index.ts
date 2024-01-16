import express, { Request, Response } from 'express';
import { apiCall } from './apiCaller';

const app = express();
const puerto = 3000;

app.get('/api', async (req: Request, res: Response) => {
  try {
    await apiCall(res);
  } catch (error) {
    console.error('Error al llamar a la API:', error);
    res.status(500).json({ error: 'Error al llamar a la API' });
  }
});

app.listen(puerto, () => {
  console.log(`listening in port ${puerto}`);
});
