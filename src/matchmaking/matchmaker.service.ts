import Player from "../entities/player"
import Room from "./room"
import { Socket, Server} from 'socket.io'
import {Server as HttpServer} from "http"
import UserService from '../auth/user.service'
import MatchmakerDto from "./matchmaker.dto"
import MatchmakerMessages from "./matchmakermessages.enum"
import {  randomInt } from "crypto"

class MatchmakerService {
    rooms: Room[] = []
    userTickets:  Map<string, number> = new Map<string, number>()
    userService: UserService = new UserService()
    io: Server

    constructor(server: HttpServer){
        this.io = new Server(server, {
            cors: {
                origin: "*",
                methods: ["GET", "POST"]
            }
        })
    
        this.io.on('connection', (socket: Socket) => {
            console.log('User connected')
            socket.on(MatchmakerMessages.REQUEST, (msg: MatchmakerDto) => {
                console.log('Request for matchmaking has been announced from player' + msg.id);
                if(msg && msg.id )
                    if(this.userTicketExists(msg.id))
                        return
                    if(this.userService.checkIfUserExists(msg.id))
                        this.createUserTicket(msg.id, socket.id)
            });
            socket.on('disconnect', () => {
                this.closeUserTicket(socket.id)
            })
        })
    }

    createUserTicket(userId: number, socketId: string ) {
        this.userTickets.set(socketId, userId)
        this.run()
    }

    closeUserTicket(socketId: string){
        this.userTickets.delete(socketId)
    }

    userTicketExists(id: number){
        for( var ticket of this.userTickets.values())
            if(ticket == id)
                return true
        return false
    }

    createRoom() {
        var port = 50000
        while(!this.rooms.every(e=> e.port != port)){
            port = randomInt(50000, 51000)
        }
        this.rooms.push(new Room(port))
        return this.rooms[this.rooms.length-1]
    }

    addPlayerToRoom(room: Room, userId: number, socketId: string){
        let player_id = room.addPlayer(userId)
        const socket = this.io.sockets.sockets.get(socketId)
        if(socket != null){
            socket.emit(MatchmakerMessages.MATCH_FOUND, {id: player_id, port: room.port})
            socket.disconnect()
        }
        this.closeUserTicket(socketId)
    }
    
    run() {
        if (this.userTickets.size < 1) 
            return
        let room_index = this.rooms.findIndex((value: Room, index: number) => value.canPlayerJoin())
        let room: Room = (room_index != -1) ? this.rooms[room_index] : this.createRoom()
        this.userTickets.forEach((userId, socketId)=>{
            if(room.canPlayerJoin()){
                this.addPlayerToRoom(room, userId, socketId)
            }
        })
    }
}

export default MatchmakerService