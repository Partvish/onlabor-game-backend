import User from "./user";
import { Request, Response } from "express";
import { Express } from "express"
import { authenticateToken } from "./token";


const setUserController = (app: Express) => {
    app.get("/user", authenticateToken, (req: Request, res: Response) => {
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