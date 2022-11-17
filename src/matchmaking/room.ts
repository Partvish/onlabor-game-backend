import Match from "./match";
import Player from "../entities/player";
import { Server } from 'socket.io'
class Room{
    match: Match
    maxPlayers: number = 2
    players: Player[] = []
    port: number
    io: Server

    constructor(port: number){
        this.port = port
        console.log(`room created with port ${port}`)

        this.io = new Server({             cors: {
            origin: "*",
            methods: ["GET", "POST"]
        } });

        this.io.on("connection", (socket) => {
          console.log("UJ Szoba")
        });
        
        this.io.listen(port);
    }

    Room(maxPlayers: number){
        this.maxPlayers = maxPlayers
    }

    addPlayer(player: Player) {
        this.players.push(player)
        this.onPlayerJoin()
    }

    canPlayerJoin(): boolean {
        return this.players.length < this.maxPlayers
    }

    onPlayerJoin(){
        
    }
    onPlayerLeave(){

    }

    startMatch(){

    }

    restartMatch(){

    }

    countdown(){

    }

    stopMatch(){
        
    }

}

export default Room