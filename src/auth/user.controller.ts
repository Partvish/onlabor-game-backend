import User from "./user";
import { Request, Response } from "express";
import {Express} from "express"

const setUserController = (app: Express) => {
    app.get("/user", (req: Request, res: Response) => {
        res.send("<div>user vissza</div>")
    })

    app.post("/user", (req: Request, res: Response) => {
        res.send("<div>user post</div>")
    })

    app.delete("/user", (req: Request, res: Response) => {
        res.send("<div>user delete</div>")
    })

    app.put("/user", (req: Request, res: Response) => {
        res.send("<div>user rak</div>")
    })
}

export default setUserController