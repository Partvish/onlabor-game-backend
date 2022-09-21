class Matchmaker {
    rooms: Room[] = []
    userTickets: UserTicket[] = []

    addTicket(ticket: UserTicket) {
        this.userTickets.push(ticket)
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
        room.addPlayers(this.userTickets)
    }
}
