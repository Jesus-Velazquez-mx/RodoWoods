/* Types */
export type EntityColor = 'red' | 'green' | 'yellow';
export type EntityType = 'bomb' | 'monster' | 'stump';

export interface Entity {
    type: EntityType;
    color: EntityColor;
    id: string;
}

export interface PlayerState {
    x: number;
    y: number;
    dir: number;
    holding: Entity | null;
}

export type GridType = (Entity | null)[][];

export interface GameState {
    grid: GridType;
    player: PlayerState;
    score: number;
    time: number;
    nextPiece: Entity;
    gameOver: boolean;
}

/* Constants */
export const CUSTOM_ASSETS: Record<string, any> = {
    player: { idleRight: null, idleLeft: null },
    blocks: {
        redBomb: null, greenBomb: null, yellowBomb: null,
        redMonster: null, greenMonster: null, yellowMonster: null,
        redStump: null, greenStump: null, yellowStump: null,
    },
    ui: { background: null, boardBackground: null, dpad: null, aButton: null }
};

export const ROWS = 10;
export const COLS = 6;
export const TICK_RATE = 150;
export const SPAWN_RATE = 15;

export const COLORS: EntityColor[] = ['red', 'green', 'yellow'];
export const TYPES: EntityType[] = ['bomb', 'monster', 'stump'];

export const randomPiece = (): Entity => ({
    type: TYPES[Math.floor(Math.random() * TYPES.length)],
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    id: Math.random().toString(36).substr(2, 9),
});

export const createEmptyGrid = (): GridType =>
    Array.from({ length: ROWS }, () => Array(COLS).fill(null));

export const formatTime = (secs: number): string => {
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
};

export const padScore = (score: number): string =>
    score.toString().padStart(4, '0');