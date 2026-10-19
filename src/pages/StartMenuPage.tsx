import React from 'react';

interface StartMenuPageProps {
    onStart: () => void;
}

export const StartMenuPage: React.FC<StartMenuPageProps> = ({ onStart }) => (
    <div className="relative z-10 flex flex-col items-center justify-center w-full px-4">
        <div className="bg-[#3A332B] text-white p-8 md:p-12 rotate-[-2deg] shadow-2xl flex flex-col items-center max-w-md w-full"
            style={{ borderRadius: '255px 15px 225px 15px / 15px 225px 15px 255px', border: '5px solid #222' }}>
            <h1 className="text-5xl md:text-6xl font-bold mb-4 text-center leading-tight" style={{ fontFamily: '"Comic Sans MS", cursive, sans-serif', textShadow: '2px 2px 0 #000' }}>
                WOODLAND<br />PUZZLES
            </h1>
            <p className="text-lg mb-8 text-center text-gray-300 font-bold" style={{ fontFamily: '"Comic Sans MS", cursive, sans-serif' }}>
                Combina 3 colores para ganar!
            </p>
            <button
                onClick={onStart}
                className="px-8 py-4 bg-white text-black font-bold text-2xl rounded-xl border-4 border-black hover:bg-gray-200 active:translate-y-2 active:shadow-none shadow-[0_6px_0_#000] transition-all"
                style={{ fontFamily: '"Comic Sans MS", cursive, sans-serif', borderRadius: '25% 10% 20% 15% / 15% 20% 10% 25%' }}
            >
                START GAME
            </button>
        </div>
    </div>
);