import Match from "./match";
import Player from "../entities/player";
import io, { Server } from "socket.io";
import { randomUUID } from "crypto";
import RoomMessages from "./roommessages.enum";
import { createServer } from "http";
import express, { Request, Response } from "express";
import cors from "cors";

class Room {
  match: Match = new Match([]);
  maxPlayers: number = 2;
  players: Map<string, Player> = new Map<string, Player>();
  playersToJoin: Player[] = [];
  port: number;
  io: Server;

  constructor(port: number) {
    this.port = port;
    console.log(`room created with port ${port}`);
    const server = express();
    server.use(cors());
    server.get("/", (req: Request, res: Response) => {
      res.send(`Room with port: ${port}`);
    });
    server.once()
    const listener = server.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
    this.io = new Server(listener, {
      cors: {
        origin: "*",
        methods: ["GET", "POST"],
      },
    });

    this.io.on("connection", (socket) => {
      console.log("New room created with port: " + this.port);
      socket.on(RoomMessages.REGISTER_PLAYER, (data) => {
        console.log("my man");
        if (data.id) {
          let player_index = this.getPlayerIdToRegister(data.id);
          if (player_index != -1) {
            this.onPlayerJoin(player_index, socket.id);
            socket.emit(RoomMessages.UPDATE_ROOM_STATE, this.getRoomState());
            return;
          }
        } else socket.disconnect();
      });

      socket.on(RoomMessages.READY_PLAYER, (data) => {
        if (!this.players.has(socket.id)) return;
        let player = this.players.get(socket.id);
        if (!player) return;
        player.ready = true;
        this.players.set(socket.id, player);
        socket.emit(RoomMessages.UPDATE_ROOM_STATE, this.getRoomState());
      });
      socket.on(RoomMessages.UNREADY_PLAYER, (data) => {
        if (!this.players.has(socket.id)) return;
        let player = this.players.get(socket.id);
        if (!player) return;
        player.ready = false;
        this.players.set(socket.id, player);
        socket.emit(RoomMessages.UPDATE_ROOM_STATE, this.getRoomState());
      });
      socket.on("disconnect", () => {
        this.onPlayerLeave(socket.id);
      });
    });

    this.io.listen(port);
  }

  getPlayerIdToRegister(player_id: string) {
    return this.playersToJoin.findIndex(
      (player: Player) => player.id == player_id
    );
  }

  Room(maxPlayers: number) {
    this.maxPlayers = maxPlayers;
  }

  addPlayer(userId: number) {
    const player = new Player();
    player.id = randomUUID();
    this.playersToJoin.push(player);
    return player.id;
  }

  canPlayerJoin(): boolean {
    return this.players.size < this.maxPlayers && !this.match.running;
  }

  onPlayerJoin(playerIndex: number, socketId: string) {
    let player: Player = this.playersToJoin.splice(playerIndex, 1)[0];
    this.players.set(socketId, player);
  }
  onPlayerLeave(socket_id: string) {
    if (this.match.running) {
      this.stopMatch();
    }

    // this.players.
  }

  getRoomState() {
    let roomState: Array<PlayerReadyStateDto> = [];
    this.players.forEach((player: Player, socket_id: string) => {
      roomState.push({ name: player.name, ready: player.ready });
    });
    console.log(this.players);
    return { players: roomState };
  }

  startMatch() {
    // this.match = new Match(()=>this.players.values())
  }

  restartMatch() {}

  countdown() {
    //eldobunk minden interakciót
    this.match.running;
  }

  stopMatch() {}
}

export default Room;
