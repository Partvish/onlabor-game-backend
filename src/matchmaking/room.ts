import Match from "../entities/match";
import Player from "../entities/player";

class Room{
    match: Match
    maxPlayers: number

    Room(maxPlayers: number){
        this.maxPlayers = maxPlayers
    }

    addPlayer(player: Player) {
        this.match.players.push(player)
        this.onPlayerJoin()
    }

    canPlayerJoin(): boolean {
        return this.match.players.length < this.maxPlayers
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