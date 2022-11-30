import Match from "./match";
import Player from "../entities/player";
import { Server } from 'socket.io'
import UserDto from "../dtos/user.dto";
import { randomUUID } from "crypto";

class Room {
    match: Match
    maxPlayers: number = 2
    players: Map<string, Player> = new Map<string, Player>()
    playersToJoin: Player[] = []
    port: number
    io: Server

    constructor(port: number) {
        this.port = port
        console.log(`room created with port ${port}`)

        this.io = new Server({
            cors: {
                origin: "*",
                methods: ["GET", "POST"]
            }
        });

        this.io.on("connection", (socket) => {
            console.log("UJ Szoba")
            socket.on("register-player", (data) => {
                if (data.id) {
                    let player_index = this.getPlayerIdToRegister(data.id)
                    if (player_index != -1) {
                        this.onPlayerJoin(player_index, socket.id)
                        return
                    }
                }
                else
                    socket.disconnect()
            })
            socket.on("disconnect", () => {
                this.onPlayerLeave(socket.id)
            })
        });

        this.io.listen(port);
    }

    getPlayerIdToRegister(player_id: string) {
        return this.playersToJoin.findIndex((player: Player) => player.id == player_id)
    }

    Room(maxPlayers: number) {
        this.maxPlayers = maxPlayers
    }

    addPlayer(userId: number) {
        const player = new Player()
        player.id = randomUUID()
        this.playersToJoin.push(player)
        return player.id
    }

    canPlayerJoin(): boolean {
        return this.players.size < this.maxPlayers && !this.match.running
    }

    onPlayerJoin(playerIndex: number, socketId: string) {
        let player: Player = this.playersToJoin.splice(playerIndex, 1)[0]
        this.players.set(socketId, player)

    }
    onPlayerLeave(socket_id: string) {
        if (this.match.running) {
            this.stopMatch()
        }

        this.players.
    }

    startMatch() {
        this.match = new Match(()=>this.players.values())
    }

    restartMatch() {

    }

    countdown() {
        //eldobunk minden interakciót
        this.match.running
    }

    stopMatch() {

    }

}

export default Room