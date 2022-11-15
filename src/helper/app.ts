import express, { Express, Request, Response } from "express"
import setUserController from "../auth/user.controller";
import { Server } from "socket.io"
import cors from 'cors';

var app: Express;

function create_app() {
    app = express()
    const port = "5000";
    app.use(cors())

    app.get('/', (req: Request, res: Response) => {
        res.send('<h1>Önlabor 1</h1><div>Express + TypeScript Server</div>');
    });

    setUserController(app)

    const server = app.listen(port, () => {
        console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
    });

    const io = new Server(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    })

    io.on('connection', (socket) => {
        console.log('a user connected')
        socket.on('chat message', (msg) => {
            console.log('message: ' + msg);
        });
        socket.on('disconnect', () => {
            console.log('user disconnected');
        })
    })

}

export {
    create_app,
    app
}