export interface Player {
  name: string;
  playerAction?: object;
  auth_token: string;
}
export interface Action {
  Time: number;
  Action: string;
}
export interface GameData {
  playerName: string;
  pointsEarned: number;
  timePlayed: number;
  gamePlayHistory: Array<Action>;
}
export interface GameStatus {
  isGameOver: boolean;
  isPaused: boolean;
  isGo: boolean;
  isReady: boolean;
}

export interface Scores {
  name: string;
  game?: string;
  score: number;
  rank?: number;
}
export interface Authentication {
  'auth-token': string;
}

export interface AuthRes {
  success: boolean;
}
