import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, RotateCcw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SpaceGame: React.FC = () => {
    const navigate = useNavigate();
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [started, setStarted] = useState(false);
    const [shipPosition, setShipPosition] = useState(50); // percentage from left
    const [asteroids, setAsteroids] = useState<Array<{ id: number; x: number; y: number; speed: number }>>([]);
    const [stars, setStars] = useState<Array<{ id: number; x: number; y: number }>>([]);

    // Generate stars for background
    useEffect(() => {
        const newStars = Array.from({ length: 50 }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100
        }));
        setStars(newStars);
    }, []);

    // Handle keyboard controls
    const handleKeyPress = useCallback((e: KeyboardEvent) => {
        if (!started || gameOver) return;

        if (e.key === 'ArrowLeft') {
            setShipPosition(prev => Math.max(0, prev - 5));
        } else if (e.key === 'ArrowRight') {
            setShipPosition(prev => Math.min(100, prev + 5));
        }
    }, [started, gameOver]);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [handleKeyPress]);

    // Game loop
    useEffect(() => {
        if (!started || gameOver) return;

        const gameInterval = setInterval(() => {
            // Move asteroids down
            setAsteroids(prev => {
                const updated = prev
                    .map(asteroid => ({
                        ...asteroid,
                        y: asteroid.y + asteroid.speed
                    }))
                    .filter(asteroid => asteroid.y < 110);

                // Check collision
                const collision = updated.some(asteroid => {
                    const asteroidX = asteroid.x;
                    const asteroidY = asteroid.y;
                    return (
                        asteroidY > 85 &&
                        asteroidY < 95 &&
                        Math.abs(asteroidX - shipPosition) < 8
                    );
                });

                if (collision) {
                    setGameOver(true);
                }

                return updated;
            });

            // Add new asteroid
            if (Math.random() < 0.05) {
                setAsteroids(prev => [
                    ...prev,
                    {
                        id: Date.now(),
                        x: Math.random() * 90 + 5,
                        y: -5,
                        speed: 1 + Math.random() * 2
                    }
                ]);
            }

            // Increase score
            setScore(prev => prev + 1);
        }, 50);

        return () => clearInterval(gameInterval);
    }, [started, gameOver, shipPosition]);

    const startGame = () => {
        setStarted(true);
        setGameOver(false);
        setScore(0);
        setAsteroids([]);
        setShipPosition(50);
    };

    return (
        <div className="min-h-screen bg-slate-950 relative overflow-hidden">
            {/* Starfield Background */}
            {stars.map(star => (
                <div
                    key={star.id}
                    className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
                    style={{
                        left: `${star.x}%`,
                        top: `${star.y}%`,
                        opacity: Math.random() * 0.5 + 0.3
                    }}
                />
            ))}

            {/* Game Container */}
            <div className="relative z-10 min-h-screen flex flex-col">
                {/* Header */}
                <div className="p-4 flex items-center justify-between backdrop-blur-xl bg-slate-950/70 border-b border-white/10">
                    <button
                        onClick={() => navigate('/')}
                        className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors"
                    >
                        <ArrowLeft size={20} />
                        Back to Portfolio
                    </button>
                    <div className="text-white font-bold text-xl font-mono">
                        SCORE: {score}
                    </div>
                </div>

                {/* Game Area */}
                <div className="flex-1 relative">
                    {/* Start/Game Over Screen */}
                    {(!started || gameOver) && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="absolute inset-0 flex items-center justify-center bg-slate-950/80 backdrop-blur-md z-20"
                        >
                            <div className="text-center space-y-6 p-8 bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 rounded-2xl max-w-md">
                                <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                                    Space Dodge
                                </h1>
                                <p className="text-gray-300 text-lg">
                                    {gameOver ? `Game Over! Final Score: ${score}` : 'Avoid the asteroids!'}
                                </p>
                                <div className="text-gray-400 text-sm space-y-2">
                                    <p>← → Arrow keys to move</p>
                                    <p>Or tap buttons below on mobile</p>
                                </div>
                                <button
                                    onClick={startGame}
                                    className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-bold rounded-lg transition-all duration-300 shadow-lg shadow-cyan-500/30 flex items-center gap-2 mx-auto"
                                >
                                    {gameOver ? (
                                        <>
                                            <RotateCcw size={20} />
                                            Play Again
                                        </>
                                    ) : (
                                        'Start Game'
                                    )}
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {/* Asteroids */}
                    {asteroids.map(asteroid => (
                        <motion.div
                            key={asteroid.id}
                            className="absolute w-12 h-12 md:w-16 md:h-16"
                            style={{
                                left: `${asteroid.x}%`,
                                top: `${asteroid.y}%`,
                                transform: 'translate(-50%, -50%)'
                            }}
                        >
                            <div className="w-full h-full bg-gradient-to-br from-orange-600 to-red-800 rounded-full opacity-80 shadow-lg shadow-orange-500/50 animate-spin" />
                        </motion.div>
                    ))}

                    {/* Player Ship */}
                    {started && (
                        <div
                            className="absolute bottom-10 w-12 h-12 md:w-16 md:h-16 transition-all duration-100"
                            style={{
                                left: `${shipPosition}%`,
                                transform: 'translateX(-50%)'
                            }}
                        >
                            <div className="relative w-full h-full">
                                {/* Ship body */}
                                <div className="absolute inset-0 bg-gradient-to-b from-cyan-400 to-blue-600 clip-triangle shadow-lg shadow-cyan-500/50" style={{
                                    clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)'
                                }} />
                                {/* Engine glow */}
                                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-4 bg-gradient-to-b from-orange-400 to-transparent animate-pulse" />
                            </div>
                        </div>
                    )}
                </div>

                {/* Mobile Controls */}
                {started && !gameOver && (
                    <div className="p-4 flex gap-4 justify-center backdrop-blur-xl bg-slate-950/70 border-t border-white/10 md:hidden">
                        <button
                            onClick={() => setShipPosition(prev => Math.max(0, prev - 10))}
                            className="px-8 py-4 bg-slate-800/60 backdrop-blur-md border border-slate-700 rounded-lg text-white font-bold hover:bg-slate-700/60 active:scale-95 transition-all"
                        >
                            ← LEFT
                        </button>
                        <button
                            onClick={() => setShipPosition(prev => Math.min(100, prev + 10))}
                            className="px-8 py-4 bg-slate-800/60 backdrop-blur-md border border-slate-700 rounded-lg text-white font-bold hover:bg-slate-700/60 active:scale-95 transition-all"
                        >
                            RIGHT →
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SpaceGame;
