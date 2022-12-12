import { randomInt } from "crypto";
import Player from "../entities/player";

class Match {
  table: string[][];
  scores: Map<string, number> = new Map<string, number>();
  running: boolean = false;

  constructor(players: Player[]) {
    players.forEach((player) => this.scores.set(player.id, 0));
  }

  onStart() {
    this.running = true;
  }
  onStop() {
    this.running = false;
  }
  onTick() {
    if (!this.running) return;
  }

  handleMove(playerId: string, move: Point) {
    let cellId = this.table[move.x][move.y];
    if (!cellId) {
      this.table[move.x][move.y] = playerId;
    } else if (cellId != playerId) {
      this.handleFight(cellId, playerId);
    }
  }

  handleFight(playerId1: string, playerId2: string) {
    randomInt(0, 3);
  }
}

export default Match;
