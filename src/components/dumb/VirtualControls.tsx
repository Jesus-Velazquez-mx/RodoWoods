import React from 'react';
import { CUSTOM_ASSETS } from '../../config/constants';

interface VirtualControlsProps {
    startMove: (dir: number) => void;
    stopMove: (dir: number | null) => void;
    handleAction: () => void;
}

export const VirtualControls: React.FC<VirtualControlsProps> = ({ startMove, stopMove, handleAction }) => (
    <div className="absolute bottom-4 w-full px-8 flex justify-between items-end max-w-3xl z-20 pointer-events-auto">
        {/* D-PAD */}
        {CUSTOM_ASSETS.ui.dpad ? (
            <div className="w-24 h-24 md:w-32 md:h-32 relative select-none">
                <img src={CUSTOM_ASSETS.ui.dpad} alt="D-Pad" className="w-full h-full object-contain drop-shadow-lg" />
                <button className="absolute left-0 top-0 bottom-0 w-1/2 opacity-0 cursor-pointer" onPointerDown={(e) => { e.preventDefault(); startMove(-1); }} onPointerUp={(e) => { e.preventDefault(); stopMove(-1); }} onPointerLeave={(e) => { e.preventDefault(); stopMove(-1); }} />
                <button className="absolute right-0 top-0 bottom-0 w-1/2 opacity-0 cursor-pointer" onPointerDown={(e) => { e.preventDefault(); startMove(1); }} onPointerUp={(e) => { e.preventDefault(); stopMove(1); }} onPointerLeave={(e) => { e.preventDefault(); stopMove(1); }} />
            </div>
        ) : (
            <div className="w-24 h-24 md:w-32 md:h-32 bg-white rounded-[45%] border-4 border-gray-400 shadow-[0_8px_0_#A0A0A0] active:shadow-[0_2px_0_#A0A0A0] active:translate-y-1.5 flex items-center justify-center relative select-none" style={{ borderRadius: '45% 55% 45% 50% / 50% 45% 55% 45%' }}>
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-full border-[3px] border-gray-300 pointer-events-none" />
                <button className="absolute left-0 top-0 bottom-0 w-1/2 opacity-0 cursor-pointer" onPointerDown={(e) => { e.preventDefault(); startMove(-1); }} onPointerUp={(e) => { e.preventDefault(); stopMove(-1); }} onPointerLeave={(e) => { e.preventDefault(); stopMove(-1); }} />
                <button className="absolute right-0 top-0 bottom-0 w-1/2 opacity-0 cursor-pointer" onPointerDown={(e) => { e.preventDefault(); startMove(1); }} onPointerUp={(e) => { e.preventDefault(); stopMove(1); }} onPointerLeave={(e) => { e.preventDefault(); stopMove(1); }} />
            </div>
        )}
        {/* BOTÓN A */}
        {CUSTOM_ASSETS.ui.aButton ? (
            <button className="w-20 h-20 md:w-28 md:h-28 relative select-none active:translate-y-1.5" onPointerDown={(e) => { e.preventDefault(); handleAction(); }}>
                <img src={CUSTOM_ASSETS.ui.aButton} alt="A Button" className="w-full h-full object-contain drop-shadow-lg" />
            </button>
        ) : (
            <button className="w-20 h-20 md:w-28 md:h-28 bg-white rounded-3xl border-4 border-gray-400 shadow-[0_8px_0_#A0A0A0] active:shadow-[0_2px_0_#A0A0A0] active:translate-y-1.5 flex items-center justify-center select-none" style={{ borderRadius: '25% 35% 30% 20% / 30% 20% 40% 25%' }} onPointerDown={(e) => { e.preventDefault(); handleAction(); }}>
                <span className="text-4xl md:text-5xl font-light text-gray-400" style={{ fontFamily: '"Comic Sans MS", cursive, sans-serif' }}>A</span>
            </button>
        )}
    </div>
);
