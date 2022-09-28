import User from "../auth/user"
import Player from "../entities/player"
import UserTicket from "../entities/user-ticket"
import Room from "./room"

class Matchmaker {
    rooms: Room[] = []
    userTickets: UserTicket[] = []

    createUserTicket(user: User) {
        const ticket = new UserTicket()
        ticket.user = user
        ticket.status=UserTicketStatus.OPEN
        this.userTickets.push(ticket)
    }

    closeUserTicket(ticket: UserTicket){
        ticket.status = UserTicketStatus.CLOSED
        let index = this.userTickets.findIndex(e => e.id == ticket.id)
        this.userTickets.splice(index, 1)
    }

    createRoom() {
        this.rooms.push(new Room())
        return this.rooms[this.rooms.length]
    }
    
    run() {
        if (this.userTickets.length < 1) 
            return
        let room_index = this.rooms.findIndex((value: Room, index: number) => value.canPlayerJoin())
        let room: Room = (room_index == -1) ? this.rooms[room_index] : this.createRoom()
        this.userTickets.forEach(ticket=>{
            if(room.canPlayerJoin()){
                room.addPlayer(new Player())
            }
        })
    }
}

export default Matchmaker