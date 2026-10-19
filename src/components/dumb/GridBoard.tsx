import React from 'react';
import { EntityRenderer } from './EntityRenderer';
import { PlayerRenderer } from './PlayerRenderer';
import { UIButton } from './UIButton';
import { CUSTOM_ASSETS, type GridType, type PlayerState } from '../../config/constants';

interface GridBoardProps {
    grid: GridType;
    player: PlayerState;
    gameOver: boolean;
    score: number;
    onRetry: () => void;
    onMenu: () => void;
}

export const GridBoard: React.FC<GridBoardProps> = ({ grid, player, gameOver, score, onRetry, onMenu }) => (
    <div className="relative w-full max-w-[320px] sm:max-w-[400px] aspect-[6/10] bg-[#5C3A21] shadow-[0_0_20px_rgba(0,0,0,0.5)] overflow-hidden"
        style={{
            backgroundImage: CUSTOM_ASSETS.ui.boardBackground ? `url(${CUSTOM_ASSETS.ui.boardBackground})` : undefined,
            backgroundSize: 'cover',
            borderLeft: '12px solid #4A2E1B',
            borderTop: '12px solid #4A2E1B',
            borderRight: '12px solid #8B5A33',
            borderBottom: '12px solid #8B5A33',
        }}>
        {!CUSTOM_ASSETS.ui.boardBackground && (
            <div className="absolute inset-0 opacity-20 pointer-events-none flex" style={{ background: 'repeating-linear-gradient(90deg, transparent, transparent 10px, rgba(0,0,0,0.3) 10px, rgba(0,0,0,0.3) 12px)' }}></div>
        )}

        <div className="absolute inset-0 grid grid-cols-6 grid-rows-10 p-1 gap-0">
            {grid.map((row, y) => row.map((cell, x) => (
                <div key={`${y}-${x}`} className="relative w-full h-full p-0.5"><EntityRenderer entity={cell} /></div>
            )))}
        </div>

        <div className="absolute top-0 left-0 w-full h-full p-1 pointer-events-none grid grid-cols-6 grid-rows-10 gap-0">
            <div className="relative w-full h-full p-0.5 transition-all duration-100 ease-linear"
                style={{ gridColumnStart: player.x + 1, gridRowStart: player.y + 1 }}>
                <PlayerRenderer direction={player.dir} />
                {player.holding && (
                    <div className="absolute -top-[80%] left-0 w-full h-full p-0.5 z-30 drop-shadow-md">
                        <EntityRenderer entity={player.holding} />
                    </div>
                )}
            </div>
        </div>

        {gameOver && (
            <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center text-white z-50 p-4 text-center">
                <h2 className="text-4xl md:text-5xl font-bold mb-2 rotate-[-3deg] text-red-500" style={{ fontFamily: '"Comic Sans MS", cursive, sans-serif', textShadow: '2px 2px 0 #fff' }}>GAME OVER</h2>
                <p className="text-2xl mb-8 font-bold" style={{ fontFamily: '"Comic Sans MS", cursive, sans-serif' }}>Score: {score}</p>
                <div className="flex flex-col gap-4 w-full max-w-[200px]">
                    <UIButton primary onClick={onRetry} className="w-full">RETRY</UIButton>
                    <UIButton onClick={onMenu} className="w-full">MENU</UIButton>
                </div>
            </div>
        )}
    </div>
);