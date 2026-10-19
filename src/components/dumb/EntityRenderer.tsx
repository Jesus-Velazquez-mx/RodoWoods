import React from 'react';
import { CUSTOM_ASSETS, type Entity } from '../../config/constants';

interface EntityRendererProps {
    entity: Entity | null;
    className?: string;
}

export const EntityRenderer: React.FC<EntityRendererProps> = ({ entity, className = '' }) => {
    if (!entity) return null;
    const assetKey = `${entity.color}${entity.type.charAt(0).toUpperCase() + entity.type.slice(1)}`;
    const customSprite = CUSTOM_ASSETS.blocks[assetKey];

    if (customSprite) {
        return (
            <div className={`relative w-full h-full flex items-center justify-center ${className}`}>
                <img src={customSprite} alt={assetKey} className="w-full h-full object-contain drop-shadow-md" />
            </div>
        );
    }

    if (entity.type === 'bomb') {
        return (
            <div className={`relative w-full h-full flex items-center justify-center ${className}`}>
                <div className={`w-4/5 h-4/5 rounded-full border-2 border-black flex items-center justify-center shadow-sm 
          ${entity.color === 'red' ? 'bg-red-500' : entity.color === 'green' ? 'bg-green-500' : 'bg-yellow-400'}`}>
                    <div className="absolute -top-1 left-1/2 w-1.5 h-3 bg-gray-800 -rotate-12 border border-black z-10" />
                    <div className="absolute -top-2 left-1/2 w-2 h-2 bg-yellow-500 rounded-full animate-pulse z-10" />
                    <span className="text-xs font-bold">👀</span>
                </div>
            </div>
        );
    }

    if (entity.type === 'monster') {
        return (
            <div className={`relative w-full h-full flex items-center justify-center ${className}`}>
                <div className={`w-[85%] h-[85%] rounded-[40%] border-2 border-black flex items-center justify-center shadow-sm
          ${entity.color === 'red' ? 'bg-red-500' : entity.color === 'green' ? 'bg-green-500' : 'bg-yellow-400'}`}>
                    <span className="text-xs font-bold text-black drop-shadow-md">😬</span>
                    <div className="absolute -left-1 top-2 w-2 h-2 bg-inherit border-black border-l-2 border-b-2 rotate-45 rounded-sm" />
                    <div className="absolute -right-1 top-2 w-2 h-2 bg-inherit border-black border-r-2 border-t-2 rotate-45 rounded-sm" />
                </div>
            </div>
        );
    }

    if (entity.type === 'stump') {
        return (
            <div className={`relative w-full h-full flex flex-col items-center justify-end ${className}`}>
                <div className={`w-[90%] h-[80%] border-2 border-black rounded-sm border-t-0 flex items-center justify-center
          ${entity.color === 'red' ? 'bg-red-600' : entity.color === 'green' ? 'bg-green-600' : 'bg-yellow-500'}`}>
                    <div className="w-full h-3 border-b border-black/30 absolute top-1" />
                    <div className="w-full h-3 border-b border-black/30 absolute top-4" />
                </div>
                <div className={`absolute top-[10%] w-[90%] h-[20%] border-2 border-black rounded-[50%] z-10
          ${entity.color === 'red' ? 'bg-red-400' : entity.color === 'green' ? 'bg-green-400' : 'bg-yellow-300'}`} />
            </div>
        );
    }
    return null;
};
