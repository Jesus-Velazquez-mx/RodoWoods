import { useState } from 'react';
import { StartMenuPage } from './pages/StartMenuPage';
import { GamePlayPage } from './pages/GamePlayPage';
import { CUSTOM_ASSETS } from './config/constants';

type GamePhase = 'START' | 'PLAYING';

export default function App() {
  const [gamePhase, setGamePhase] = useState<GamePhase>('START');

  return (
    <div className="min-h-screen bg-[#6BA971] flex flex-col items-center justify-center font-sans overflow-hidden select-none touch-none"
      style={{
        backgroundImage: CUSTOM_ASSETS.ui.background ? `url(${CUSTOM_ASSETS.ui.background})` : 'linear-gradient(#89C182 2px, transparent 2px), linear-gradient(90deg, #89C182 2px, transparent 2px)',
        backgroundSize: CUSTOM_ASSETS.ui.background ? 'cover' : '40px 40px', backgroundPosition: 'center'
      }}>

      {gamePhase === 'START' ? (
        <StartMenuPage onStart={() => setGamePhase('PLAYING')} />
      ) : (
        <GamePlayPage onGoToMenu={() => setGamePhase('START')} />
      )}

      <div className="fixed bottom-2 text-white/50 text-xs text-center w-full z-0 font-mono pointer-events-none">
        Usa flechas para moverte, ESPACIO para Acción. Usa botones táctiles en móvil.
      </div>
    </div>
  );
}
