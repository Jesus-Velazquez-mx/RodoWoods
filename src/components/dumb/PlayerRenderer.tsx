import React from 'react';
import { CUSTOM_ASSETS } from '../../config/constants';

interface PlayerRendererProps {
    direction: number;
}

export const PlayerRenderer: React.FC<PlayerRendererProps> = ({ direction }) => {
    const customSprite = direction === 1 ? CUSTOM_ASSETS.player.idleRight : CUSTOM_ASSETS.player.idleLeft;

    if (customSprite) {
        return (
            <div className="relative w-full h-full flex items-center justify-center">
                <img src={customSprite} alt="Player" className="w-full h-full object-contain drop-shadow-md z-20" />
            </div>
        );
    }

    return (
        <div className={`relative w-full h-full flex flex-col items-center justify-end transition-transform duration-100
      ${direction === -1 ? 'scale-x-[-1]' : 'scale-x-100'}`}>
            <div className="w-[70%] h-[30%] bg-[#5B8C5A] rounded-t-full border-2 border-black z-10"></div>
            <div className="w-[90%] h-1.5 bg-[#4A7049] absolute top-[25%] -right-[5%] rounded-full z-20"></div>
            <div className="w-[60%] h-[40%] bg-white rounded-b-full border-2 border-black z-0 flex flex-col justify-start items-center overflow-hidden">
                <span className="text-[10px] leading-none mt-1 font-bold text-black drop-shadow-md">..</span>
                <div className="w-1/2 h-1 bg-black rounded-full mt-0.5"></div>
            </div>
            <div className="w-[70%] h-[30%] bg-[#D4803B] rounded-full border-2 border-black absolute bottom-0 z-[-1]"></div>
        </div>
    );
};
