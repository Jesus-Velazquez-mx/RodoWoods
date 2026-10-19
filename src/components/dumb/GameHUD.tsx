import React from 'react';
import { EntityRenderer } from './EntityRenderer';
import { padScore, formatTime, type Entity } from '../../config/constants';

interface GameHUDProps {
    score: number;
    time: number;
    nextPiece: Entity;
}

export const GameHUD: React.FC<GameHUDProps> = ({ score, time, nextPiece }) => (
    <>
        {/* Desktop HUD */}
        <div className="absolute top-4 left-4 z-20 pointer-events-none hidden md:flex flex-col gap-4">
            <div className="bg-[#3A332B] text-white p-4 border-4 border-[#222] shadow-[4px_4px_0_rgba(0,0,0,0.5)] rotate-[-2deg]" style={{ borderRadius: '15px 25px 15px 20px / 20px 15px 25px 15px', fontFamily: '"Comic Sans MS", cursive, sans-serif' }}>
                <p className="text-xl">SCORE: {padScore(score)}</p>
                <p className="text-xl">TIME: {formatTime(time)}</p>
            </div>
            <div className="bg-[#3A332B] text-white p-4 flex flex-col items-center justify-center border-4 border-[#222] shadow-[4px_4px_0_rgba(0,0,0,0.5)] rotate-[2deg] w-24 h-28" style={{ borderRadius: '20px 15px 25px 15px / 15px 20px 15px 25px', fontFamily: '"Comic Sans MS", cursive, sans-serif' }}>
                <p className="text-sm mb-2">NEXT</p>
                <div className="w-12 h-12 relative">
                    <EntityRenderer entity={nextPiece} />
                </div>
            </div>
        </div>
        {/* Mobile HUD */}
        <div className="absolute top-2 w-full flex justify-between px-4 z-20 pointer-events-none md:hidden font-bold" style={{ fontFamily: '"Comic Sans MS", cursive, sans-serif' }}>
            <div className="bg-[#3A332B]/90 text-white px-3 py-1 rounded-xl border-2 border-black flex gap-3 shadow-md">
                <span>SCORE: {padScore(score)}</span>
                <span>TIME: {formatTime(time)}</span>
            </div>
            <div className="bg-[#3A332B]/90 text-white px-3 py-1 flex items-center gap-2 rounded-xl border-2 border-black shadow-md">
                NEXT: <div className="w-6 h-6 relative"><EntityRenderer entity={nextPiece} /></div>
            </div>
        </div>
    </>
);