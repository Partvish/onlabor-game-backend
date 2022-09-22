import "reflect-metadata"
import express, { Express, Request, Response } from 'express';
import "./database";
const app: Express = express();
const port = "5000";

app.get('/', (req: Request, res: Response) => {
  res.send('<h1>Önlabor 1</h1><div>Express + TypeScript Server</div>');
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});



