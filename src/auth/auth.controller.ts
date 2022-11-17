import { Express } from 'express'
import User from './user'
import AuthService from './auth.service'

const setAuthController = (app: Express) => {
    var service = new AuthService()
    app.post("/login", async (req, res) => {
        try {
            const token = await service.loginUser(req.body)
            return res.status(200).json({ token: token })
        } catch (error) {
            return res.status(500).send(error)
        }
    })

    app.post("/register", async (req, res) => {
        try {
            if (!req.body)
                throw Error("Message body is empty")
            await service.registerUser(req.body)
            res.status(200).send("OK")
        } catch (error) {
            res.status(500).send(error)
        }

    })
}

export default setAuthController