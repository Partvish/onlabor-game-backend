import { randomInt } from "crypto";
import Player from "../entities/player";
import MatchmakerMessages from "./matchmakermessages.enum";
import MatchMessages from "./matchmessages.enum";
import RoomMessages from "./roommessages.enum";

class Match {
  table: string[][];
  scores: Map<string, number> = new Map<string, number>();
  running: boolean = false;
  startingPosition: Point[] = [
    { x: 0, y: 0 },
    { x: 9, y: 9 },
    { x: 9, y: 0 },
    { x: 0, y: 9 },
  ];
  notify: (message: string, data: any) => void;

  constructor(players: Player[], notify: (message: string, data: any) => void) {
    this.updatePlayers(players);
    this.notify = notify;
  }

  updatePlayers(players: Player[]) {
    players.forEach((player) => this.scores.set(player.id, 0));
  }

  onStart() {
    this.running = true;
    this.table = [];
    for (let i = 0; i < 10; i++) {
      let row: string[] = [];
      for (let j = 0; j < 10; j++) {
        row.push("");
      }
      this.table.push(row);
    }
    Array.from(this.scores.keys()).forEach(
      (playerId: string, index: number) => {
        let point = this.startingPosition[index];
        this.table[point.x][point.y] = "~~" + playerId;
      }
    );
    this.notify(MatchMessages.UPDATE_TABLE, { table: this.table });
  }
  onStop() {
    this.running = false;
    this.notify(RoomMessages.MATCH_STOPPING, null);
  }

  handleMove(move: Point, playerId: string) {
    console.log("movin");
    let cellId = this.table[move.x][move.y];
    if (!cellId) {
      console.log("cellid");
      if (!this.hasNeighbouringTile(move, playerId)) {
        console.log("jézus buzi");
        return;
      }
      this.table[move.x][move.y] = playerId;
      this.notify(MatchMessages.UPDATE_TABLE, { table: this.table });
      return;
    } else if (cellId != playerId) {
      this.handleFight(cellId, playerId);
      return;
    }
    console.log("my boy");
  }

  hasNeighbouringTile(move: Point, _playerId: string): boolean {
    let playerId = _playerId.replace("~~", "");
    let x = move.x;
    let y = move.y;
    if (move.x == 0) x += 1;
    if (move.y == 0) y += 1;
    if (move.x == 9) x -= 1;
    if (move.y == 9) y -= 1;
    return (
      this.table[x - 1][y].replace("~~", "") == playerId ||
      this.table[x][y + 1].replace("~~", "") == playerId ||
      this.table[x + 1][y].replace("~~", "") == playerId ||
      this.table[x][y - 1].replace("~~", "") == playerId ||
      this.table[x - 1][y - 1].replace("~~", "") == playerId ||
      this.table[x + 1][y - 1].replace("~~", "") == playerId ||
      this.table[x + 1][y + 1].replace("~~", "") == playerId ||
      this.table[x - 1][y + 1].replace("~~", "") == playerId
    );
  }
  handleFight(playerId1: string, playerId2: string) {
    randomInt(0, 3);
  }
  onPlayerLeave(playerId: string) {
    if(this.scores.size-1 < 2){
      this.onStop()
      return
    }
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        if (this.table[i][j].replace("~~", "") == playerId) {
          this.table[i][j] = "";
        }
      }
    }
  }
}

export default Match;
