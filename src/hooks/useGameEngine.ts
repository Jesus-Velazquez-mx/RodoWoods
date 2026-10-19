import { useState, useEffect, useRef, useCallback } from 'react';
import { ROWS, COLS, TICK_RATE, SPAWN_RATE, randomPiece, createEmptyGrid, type GameState, type GridType, type PlayerState } from '../config/constants';

interface UseGameEngineReturn {
    gameState: GameState;
    resetGame: () => void;
    controls: {
        startMove: (dir: number) => void;
        stopMove: (dir: number | null) => void;
        handleAction: () => void;
    };
}

export const useGameEngine = (isActive: boolean): UseGameEngineReturn => {
    const getInitialState = (): GameState => ({
        grid: createEmptyGrid(),
        player: { x: 2, y: ROWS - 1, dir: 1, holding: null },
        score: 0,
        time: 0,
        nextPiece: randomPiece(),
        gameOver: false,
    });

    const [gameState, setGameState] = useState<GameState>(getInitialState());
    const stateRef = useRef<GameState>(gameState);
    const tickCounter = useRef<number>(0);

    const moveRef = useRef<{
        dir: number | null;
        timeout: ReturnType<typeof setTimeout> | null;
        interval: ReturnType<typeof setInterval> | null;
    }>({ dir: null, timeout: null, interval: null });

    useEffect(() => { stateRef.current = gameState; }, [gameState]);

    const updateState = (mods: Partial<GameState>) =>
        setGameState(prev => ({ ...prev, ...mods }));

    const resetGame = () => setGameState(getInitialState());

    const applyGravityAndMatches = useCallback((): boolean => {
        let state = { ...stateRef.current };
        let grid: GridType = state.grid.map(row => [...row]);
        let player: PlayerState = { ...state.player };
        let changed = false;

        // 1. Gravedad
        for (let c = 0; c < COLS; c++) {
            for (let r = ROWS - 2; r >= 0; r--) {
                if (grid[r][c] !== null && grid[r + 1][c] === null) {
                    if (!(player.x === c && player.y === r + 1)) {
                        grid[r + 1][c] = grid[r][c];
                        grid[r][c] = null;
                        changed = true;
                    }
                }
            }
        }
        if (player.y < ROWS - 1 && grid[player.y + 1][player.x] === null) {
            player = { ...player, y: player.y + 1 };
            changed = true;
        }

        // 2. Match 3
        let toRemove = new Set<string>();
        for (let r = 0; r < ROWS; r++) {
            for (let c = 0; c < COLS - 2; c++) {
                const color = grid[r][c]?.color;
                if (!color) continue;
                if (grid[r][c + 1]?.color === color && grid[r][c + 2]?.color === color) {
                    toRemove.add(`${r},${c}`); toRemove.add(`${r},${c + 1}`); toRemove.add(`${r},${c + 2}`);
                    let k = c + 3; while (k < COLS && grid[r][k]?.color === color) { toRemove.add(`${r},${k}`); k++; }
                }
            }
        }
        for (let c = 0; c < COLS; c++) {
            for (let r = 0; r < ROWS - 2; r++) {
                const color = grid[r][c]?.color;
                if (!color) continue;
                if (grid[r + 1][c]?.color === color && grid[r + 2][c]?.color === color) {
                    toRemove.add(`${r},${c}`); toRemove.add(`${r + 1},${c}`); toRemove.add(`${r + 2},${c}`);
                    let k = r + 3; while (k < ROWS && grid[k][c]?.color === color) { toRemove.add(`${k},${c}`); k++; }
                }
            }
        }

        if (toRemove.size > 0) {
            let extraScore = toRemove.size * 10;
            toRemove.forEach(coord => { const [r, c] = coord.split(',').map(Number); grid[r][c] = null; });
            state.score += extraScore;
            changed = true;
        }

        if (changed) updateState({ grid, player, score: state.score });
        return changed;
    }, []);

    useEffect(() => {
        if (!isActive) return;
        const interval = setInterval(() => {
            if (stateRef.current.gameOver) return;
            tickCounter.current += 1;
            let state = { ...stateRef.current };
            let needsUpdate = false;

            if (tickCounter.current % (1000 / TICK_RATE) === 0) { state.time += 1; needsUpdate = true; }
            if (tickCounter.current % SPAWN_RATE === 0) {
                const randomCol = Math.floor(Math.random() * COLS);
                if (state.grid[0][randomCol] === null) {
                    let newGrid = state.grid.map(row => [...row]);
                    newGrid[0][randomCol] = state.nextPiece;
                    state.grid = newGrid;
                    state.nextPiece = randomPiece();
                    needsUpdate = true;
                } else {
                    state.gameOver = true; needsUpdate = true;
                }
            }
            if (needsUpdate) updateState(state);
            applyGravityAndMatches();
        }, TICK_RATE);
        return () => clearInterval(interval);
    }, [applyGravityAndMatches, isActive]);

    // Controles
    const performStep = useCallback((direction: number) => {
        setGameState((prevState) => {
            if (prevState.gameOver) return prevState;
            let { player, grid } = prevState;
            let newX = player.x + direction;
            if (newX >= 0 && newX < COLS) {
                let targetY = ROWS - 1;
                for (let r = 0; r < ROWS; r++) { if (grid[r][newX] !== null) { targetY = r - 1; break; } }
                if (targetY >= 0) return { ...prevState, player: { ...player, x: newX, y: targetY, dir: direction } };
            }
            return prevState;
        });
    }, []);

    const startMove = useCallback((dir: number) => {
        if (moveRef.current.dir === dir) return;
        setGameState(prev => ({ ...prev, player: { ...prev.player, dir } }));
        if (moveRef.current.timeout) clearTimeout(moveRef.current.timeout);
        if (moveRef.current.interval) clearInterval(moveRef.current.interval);

        moveRef.current.dir = dir;
        moveRef.current.timeout = setTimeout(() => {
            performStep(dir);
            moveRef.current.interval = setInterval(() => performStep(dir), 120);
        }, 150);
    }, [performStep]);

    const stopMove = useCallback((dir: number | null) => {
        if (moveRef.current.dir === dir || dir === null) {
            if (moveRef.current.timeout) clearTimeout(moveRef.current.timeout);
            if (moveRef.current.interval) clearInterval(moveRef.current.interval);
            moveRef.current.dir = null;
        }
    }, []);

    const handleAction = useCallback(() => {
        const state = stateRef.current;
        if (state.gameOver) return;
        let { player, grid } = state;
        let newGrid = grid.map(row => [...row]);
        let newPlayer = { ...player };
        let acted = false;

        if (player.holding) {
            let frontX = player.x + player.dir;
            if (frontX >= 0 && frontX < COLS) {
                let dropY = ROWS - 1;
                for (let r = 0; r < ROWS; r++) { if (newGrid[r][frontX] !== null) { dropY = r - 1; break; } }
                if (dropY >= 0 && dropY >= player.y - 1) { newGrid[dropY][frontX] = player.holding; newPlayer.holding = null; acted = true; }
            }
            if (!acted && player.y > 0 && newGrid[player.y - 1][player.x] === null) { newGrid[player.y - 1][player.x] = player.holding; newPlayer.holding = null; acted = true; }
        } else {
            let frontX = player.x + player.dir;
            if (frontX >= 0 && frontX < COLS) {
                for (let r = 0; r < ROWS; r++) {
                    if (newGrid[r][frontX] !== null) {
                        if (r >= player.y - 1) { newPlayer.holding = newGrid[r][frontX]; newGrid[r][frontX] = null; acted = true; }
                        break;
                    }
                }
            }
            if (!acted && player.y < ROWS - 1 && newGrid[player.y + 1][player.x] !== null) {
                newPlayer.holding = newGrid[player.y + 1][player.x]; newGrid[player.y + 1][player.x] = null; acted = true; newPlayer.y += 1;
            }
        }
        if (acted) {
            updateState({ grid: newGrid, player: newPlayer });
            setTimeout(applyGravityAndMatches, 0);
        }
    }, [applyGravityAndMatches]);

    useEffect(() => {
        if (!isActive) return;
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowLeft') startMove(-1);
            if (e.key === 'ArrowRight') startMove(1);
            if (!e.repeat && (e.key === 'a' || e.key === 'A' || e.key === ' ')) handleAction();
        };
        const handleKeyUp = (e: KeyboardEvent) => {
            if (e.key === 'ArrowLeft') stopMove(-1);
            if (e.key === 'ArrowRight') stopMove(1);
        };
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
            if (moveRef.current.timeout) clearTimeout(moveRef.current.timeout);
            if (moveRef.current.interval) clearInterval(moveRef.current.interval);
        };
    }, [startMove, stopMove, handleAction, isActive]);

    return { gameState, resetGame, controls: { startMove, stopMove, handleAction } };
};