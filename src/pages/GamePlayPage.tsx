import React from 'react';
import { GameHUD } from '../components/dumb/GameHUD';
import { GridBoard } from '../components/dumb/GridBoard';
import { VirtualControls } from '../components/dumb/VirtualControls';
import { useGameEngine } from '../hooks/useGameEngine';

interface GamePlayPageProps {
    onGoToMenu: () => void;
}

export const GamePlayPage: React.FC<GamePlayPageProps> = ({ onGoToMenu }) => {
    const { gameState, resetGame, controls } = useGameEngine(true);

    return (
        <>
            <GameHUD score={gameState.score} time={gameState.time} nextPiece={gameState.nextPiece} />

            <div className="relative w-full max-w-2xl h-[90vh] max-h-[800px] flex items-center justify-center p-4">
                <GridBoard
                    grid={gameState.grid}
                    player={gameState.player}
                    gameOver={gameState.gameOver}
                    score={gameState.score}
                    onRetry={resetGame}
                    onMenu={onGoToMenu}
                />
            </div>

            <VirtualControls {...controls} />
        </>
    );
};