import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, RotateCcw, Heart, Zap, Target } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Game constants
const SHIP_SPEED = 2.5;
const PROJECTILE_SPEED = 3;
const SPAWN_RATE_INITIAL = 1500;

interface GameObject {
    id: number;
    x: number;
    y: number;
}

interface Projectile extends GameObject {
    vx: number;
    vy: number;
}

interface Asteroid extends GameObject {
    speed: number;
    size: number;
    rotation: number;
    rotationSpeed: number;
    type: 'rock' | 'metal';
    hp: number;
}

interface Particle extends GameObject {
    vx: number;
    vy: number;
    life: number;
    color: string;
    size: number;
}

const SpaceGame: React.FC = () => {
    const navigate = useNavigate();
    const gameLoopRef = useRef<number>();
    const lastTimeRef = useRef<number>(0);
    const containerRef = useRef<HTMLDivElement>(null);

    // Game State
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(() => parseInt(localStorage.getItem('space_high_score') || '0'));
    const [gameOver, setGameOver] = useState(false);
    const [started, setStarted] = useState(false);
    const [lives, setLives] = useState(3);
    const [level, setLevel] = useState(1);

    // Entities
    const [shipPosition, setShipPosition] = useState(50);
    const [projectiles, setProjectiles] = useState<Projectile[]>([]);
    const [asteroids, setAsteroids] = useState<Asteroid[]>([]);
    const [particles, setParticles] = useState<Particle[]>([]);
    const [stars, setStars] = useState<Array<{ id: number; x: number; y: number; size: number; opacity: number }>>([]);

    // Input State
    const keysPressed = useRef<{ [key: string]: boolean }>({});

    // Initialize stars
    useEffect(() => {
        const newStars = Array.from({ length: 100 }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 2 + 1,
            opacity: Math.random() * 0.7 + 0.3
        }));
        setStars(newStars);
    }, []);

    // Handle Input
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            keysPressed.current[e.key] = true;
            if (e.code === 'Space' && started && !gameOver) {
                // Prevent default scrolling for spacebar
                e.preventDefault();
                manualShoot();
            }
        };
        const handleKeyUp = (e: KeyboardEvent) => {
            keysPressed.current[e.key] = false;
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, [started, gameOver]); // We need started/gameOver here to allow shooting

    const createExplosion = (x: number, y: number, color: string, count: number) => {
        const newParticles: Particle[] = [];
        for (let i = 0; i < count; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 1 + 0.5;
            newParticles.push({
                id: Date.now() + i,
                x,
                y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                life: 1.0,
                color,
                size: Math.random() * 4 + 2
            });
        }
        // Direct state update for particles is fine as it's purely visual
        setParticles(prev => [...prev, ...newParticles]);
    };

    const startGame = () => {
        setStarted(true);
        setGameOver(false);
        setScore(0);
        setLives(3);
        setLevel(1);
        setAsteroids([]);
        setProjectiles([]);
        setParticles([]);
        setShipPosition(50);
        lastTimeRef.current = performance.now();
        // Reset ref state
        stateRef.current = {
            asteroids: [],
            projectiles: [],
            particles: [],
            score: 0,
            lives: 3,
            level: 1,
            shipPos: 50,
            gameOver: false
        };
    };

    // GAME LOOP using refs for entities to avoid closure staleness
    const stateRef = useRef({
        asteroids: [] as Asteroid[],
        projectiles: [] as Projectile[],
        particles: [] as Particle[],
        score: 0,
        lives: 3,
        level: 1,
        shipPos: 50,
        gameOver: false
    });

    // Sync state refs from React state (if needed) but mainly we drive specific values
    useEffect(() => {
        stateRef.current.shipPos = shipPosition;
    }, [shipPosition]);

    const manualShoot = () => {
        if (!started || gameOver) return;

        const baseId = Date.now();
        const currentLevel = stateRef.current.level;
        const currentPos = stateRef.current.shipPos;
        const momentum = keysPressed.current['ArrowLeft'] ? -0.3 : keysPressed.current['ArrowRight'] ? 0.3 : 0;

        // Level 1: Single Shot with Momentum
        if (currentLevel < 2) {
            stateRef.current.projectiles.push({
                id: baseId,
                x: currentPos,
                y: 85,
                vx: momentum,
                vy: PROJECTILE_SPEED
            });
        }
        // Level 2: Dual Shot
        else if (currentLevel < 4) {
            stateRef.current.projectiles.push(
                { id: baseId, x: currentPos - 2, y: 85, vx: momentum, vy: PROJECTILE_SPEED },
                { id: baseId + 1, x: currentPos + 2, y: 85, vx: momentum, vy: PROJECTILE_SPEED }
            );
        }
        // Level 4+: Tri-Spread Shot
        else {
            stateRef.current.projectiles.push(
                { id: baseId, x: currentPos - 2, y: 85, vx: momentum - 0.5, vy: PROJECTILE_SPEED * 0.9 }, // Left spread
                { id: baseId + 1, x: currentPos, y: 85, vx: momentum, vy: PROJECTILE_SPEED },        // Center
                { id: baseId + 2, x: currentPos + 2, y: 85, vx: momentum + 0.5, vy: PROJECTILE_SPEED * 0.9 } // Right spread
            );
        }
    };

    useEffect(() => {
        if (!started || gameOver) {
            if (gameLoopRef.current) cancelAnimationFrame(gameLoopRef.current);
            return;
        }

        let lastSpawnTime = 0;
        let animationFrameId: number;

        const loop = (timestamp: number) => {
            if (stateRef.current.gameOver) return;

            // Move Ship logic inside loop for smoothness? 
            // We keep specific react state for ship to sync with UI nicely, 
            // but we can update ref for collision here.
            if (keysPressed.current['ArrowLeft']) {
                setShipPosition(prev => Math.max(2, prev - SHIP_SPEED));
            }
            if (keysPressed.current['ArrowRight']) {
                setShipPosition(prev => Math.min(98, prev + SHIP_SPEED));
            }

            // Spawn Asteroids
            const spawnRate = Math.max(500, SPAWN_RATE_INITIAL - (stateRef.current.level * 100));
            if (timestamp - lastSpawnTime > spawnRate) {
                const type = Math.random() > 0.8 ? 'metal' : 'rock';
                const newAsteroid: Asteroid = {
                    id: Date.now(),
                    x: Math.random() * 90 + 5,
                    y: -10,
                    speed: (Math.random() * 0.5 + 0.5) + (stateRef.current.level * 0.1),
                    size: type === 'metal' ? 4 : 6 + Math.random() * 4, // percent
                    rotation: 0,
                    rotationSpeed: Math.random() * 4 - 2,
                    type,
                    hp: type === 'metal' ? 2 : 1
                };
                stateRef.current.asteroids.push(newAsteroid);
                lastSpawnTime = timestamp;
            }

            // Update Asteroids
            stateRef.current.asteroids.forEach(ast => {
                ast.y += ast.speed;
                ast.rotation += ast.rotationSpeed;
            });

            // Update Projectiles
            stateRef.current.projectiles.forEach(p => {
                p.x += p.vx; // Apply horizontal momentum/spread
                p.y -= p.vy;
            });

            // Update Particles
            stateRef.current.particles.forEach(p => {
                p.x += p.vx;
                p.y += p.vy;
                p.life -= 0.02;
            });

            // Cleanup & Collision
            // 1. Projectiles vs Asteroids
            for (let i = stateRef.current.projectiles.length - 1; i >= 0; i--) {
                const p = stateRef.current.projectiles[i];
                let hit = false;

                for (let j = stateRef.current.asteroids.length - 1; j >= 0; j--) {
                    const ast = stateRef.current.asteroids[j];
                    if (
                        Math.abs(p.x - ast.x) < (ast.size / 1.5) &&
                        Math.abs(p.y - ast.y) < (ast.size / 1.5)
                    ) {
                        // HIT!
                        hit = true;
                        ast.hp -= 1;

                        // Visual hit effect
                        for (let k = 0; k < 5; k++) {
                            const angle = Math.random() * 6.28;
                            stateRef.current.particles.push({
                                id: Date.now() + Math.random(),
                                x: ast.x,
                                y: ast.y,
                                vx: Math.cos(angle),
                                vy: Math.sin(angle),
                                life: 1,
                                color: '#c084fc',
                                size: 3
                            });
                        }

                        if (ast.hp <= 0) {
                            stateRef.current.asteroids.splice(j, 1);
                            stateRef.current.score += ast.type === 'metal' ? 20 : 10;
                            stateRef.current.level = 1 + Math.floor(stateRef.current.score / 100);

                            // Big explosion
                            for (let k = 0; k < 15; k++) {
                                const angle = Math.random() * 6.28;
                                stateRef.current.particles.push({
                                    id: Date.now() + Math.random(),
                                    x: ast.x,
                                    y: ast.y,
                                    vx: Math.cos(angle) * 2,
                                    vy: Math.sin(angle) * 2,
                                    life: 1,
                                    color: ast.type === 'metal' ? '#ef4444' : '#a855f7',
                                    size: 5
                                });
                            }
                        }
                        break;
                    }
                }

                if (hit || p.y < -10) {
                    stateRef.current.projectiles.splice(i, 1);
                }
            }

            // 2. Asteroids vs Ship 
            for (let i = stateRef.current.asteroids.length - 1; i >= 0; i--) {
                const ast = stateRef.current.asteroids[i];

                if (
                    ast.y > 85 && ast.y < 95 &&
                    Math.abs(ast.x - stateRef.current.shipPos) < (ast.size / 1.5 + 2)
                ) {
                    stateRef.current.asteroids.splice(i, 1);
                    stateRef.current.lives -= 1;

                    // Ship hit particles
                    for (let k = 0; k < 20; k++) {
                        const angle = Math.random() * 6.28;
                        stateRef.current.particles.push({
                            id: Date.now() + Math.random(),
                            x: stateRef.current.shipPos,
                            y: 90,
                            vx: Math.cos(angle) * 3,
                            vy: Math.sin(angle) * 3,
                            life: 1,
                            color: '#f43f5e',
                            size: 4
                        });
                    }

                    if (stateRef.current.lives <= 0) {
                        stateRef.current.gameOver = true;
                        setGameOver(true);
                        if (stateRef.current.score > parseInt(localStorage.getItem('space_high_score') || '0')) {
                            localStorage.setItem('space_high_score', stateRef.current.score.toString());
                            setHighScore(stateRef.current.score);
                        }
                    }
                }
                else if (ast.y > 110) {
                    stateRef.current.asteroids.splice(i, 1);
                }
            }

            // 3. Clean particles
            stateRef.current.particles = stateRef.current.particles.filter(p => p.life > 0);

            // Sync React State for Rendering
            setAsteroids([...stateRef.current.asteroids]);
            setProjectiles([...stateRef.current.projectiles]);
            setParticles([...stateRef.current.particles]);
            setScore(stateRef.current.score);
            setLives(stateRef.current.lives);
            // setLevel(stateRef.current.level); // caused render loop if assumed

            animationFrameId = requestAnimationFrame(loop);
        };

        animationFrameId = requestAnimationFrame(loop);
        return () => cancelAnimationFrame(animationFrameId);

    }, [started, gameOver]);

    return (
        <div className="min-h-screen bg-slate-950 relative overflow-hidden font-sans select-none touch-none">
            {/* Starfield Background */}
            {stars.map(star => (
                <div
                    key={star.id}
                    className="absolute bg-white rounded-full animate-pulse"
                    style={{
                        left: `${star.x}%`,
                        top: `${star.y}%`,
                        width: `${star.size}px`,
                        height: `${star.size}px`,
                        opacity: star.opacity
                    }}
                />
            ))}

            {/* Nebula effects */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-purple-900/20 blur-[100px] rounded-full" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-cyan-900/20 blur-[100px] rounded-full" />
            </div>

            {/* Game Interface */}
            <div className="relative z-10 h-screen flex flex-col">
                {/* HUD */}
                <div className="p-4 flex items-center justify-between backdrop-blur-sm bg-slate-950/30 border-b border-white/5">
                    <button
                        onClick={() => navigate('/')}
                        className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors z-50"
                    >
                        <ArrowLeft size={20} />
                        <span className="hidden sm:inline">Back</span>
                    </button>

                    <div className="flex items-center gap-6">
                        <div className="flex flex-col items-center">
                            <span className="text-xs text-cyan-500 font-bold tracking-wider">SCORE</span>
                            <span className="text-2xl font-mono font-bold text-white leading-none">{score.toString().padStart(5, '0')}</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <span className="text-xs text-purple-500 font-bold tracking-wider">LEVEL</span>
                            <span className="text-2xl font-mono font-bold text-white leading-none">{level}</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-1">
                        {Array.from({ length: Math.max(0, lives) }).map((_, i) => (
                            <Heart key={i} size={24} className="fill-red-500 text-red-500 drop-shadow-lg" />
                        ))}
                    </div>
                </div>

                {/* Game Canvas Area */}
                <div className="flex-1 relative overflow-hidden" ref={containerRef}>

                    {/* Projectiles */}
                    {projectiles.map(p => (
                        <div
                            key={p.id}
                            className="absolute w-2 h-6 bg-cyan-400 rounded-full shadow-[0_0_10px_#22d3ee]"
                            style={{
                                left: `${p.x}%`,
                                top: `${p.y}%`,
                                transform: `translate(-50%, -50%) rotate(${p.vx * -20}deg)`
                            }}
                        />
                    ))}

                    {/* Asteroids */}
                    {asteroids.map(ast => (
                        <div
                            key={ast.id}
                            className="absolute flex items-center justify-center"
                            style={{
                                left: `${ast.x}%`,
                                top: `${ast.y}%`,
                                width: `${ast.size}%`,
                                height: `${ast.size * (window.innerWidth / window.innerHeight)}%`,
                                transform: `translate(-50%, -50%) rotate(${ast.rotation}deg)`
                            }}
                        >
                            {ast.type === 'rock' ? (
                                <div className="w-12 h-12 md:w-16 md:h-16 relative">
                                    <div className="absolute inset-0 bg-slate-700/80 rounded-full border border-slate-500 mask-rock" style={{ clipPath: 'polygon(20% 0%, 90% 20%, 100% 60%, 75% 100%, 25% 100%, 0% 50%)' }}></div>
                                    <div className="absolute inset-2 bg-slate-600 rounded-full opacity-50" style={{ clipPath: 'polygon(20% 0%, 90% 20%, 100% 60%, 75% 100%, 25% 100%, 0% 50%)' }}></div>
                                </div>
                            ) : (
                                <div className="w-10 h-10 md:w-14 md:h-14 bg-gradient-to-br from-gray-300 to-gray-500 rounded-lg transform rotate-45 border-2 border-red-500/50 shadow-lg shadow-red-500/20">
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                                    </div>
                                </div>
                            )}

                            {/* HP Bar for tougher enemies */}
                            {ast.hp > 1 && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-1 bg-slate-800 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-red-500"
                                        style={{ width: `${(ast.hp / 2) * 100}%` }}
                                    />
                                </div>
                            )}
                        </div>
                    ))}

                    {/* Particles */}
                    {particles.map(p => (
                        <div
                            key={p.id}
                            className="absolute rounded-full"
                            style={{
                                left: `${p.x}%`,
                                top: `${p.y}%`,
                                width: `${p.size}px`,
                                height: `${p.size}px`,
                                backgroundColor: p.color,
                                opacity: p.life,
                                transform: 'translate(-50%, -50%)'
                            }}
                        />
                    ))}

                    {/* Ship */}
                    {started && !gameOver && (
                        <div
                            className="absolute bottom-10 transition-transform duration-75"
                            style={{
                                left: `${shipPosition}%`,
                                transform: `translateX(-50%) rotate(${keysPressed.current['ArrowLeft'] ? '-15deg' : keysPressed.current['ArrowRight'] ? '15deg' : '0deg'})`,
                                width: '60px',
                                height: '60px'
                            }}
                        >
                            <div className="relative w-full h-full drop-shadow-[0_0_15px_rgba(6,182,212,0.5)]">
                                {/* Wing Left */}
                                <div className="absolute bottom-0 left-0 w-3 h-8 bg-cyan-700 -skew-x-12" />
                                {/* Wing Right */}
                                <div className="absolute bottom-0 right-0 w-3 h-8 bg-cyan-700 skew-x-12" />
                                {/* Main Body */}
                                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-12 bg-gradient-to-t from-slate-900 via-cyan-900 to-cyan-500 rounded-t-full border border-cyan-400/50" />
                                {/* Cockpit */}
                                <div className="absolute top-4 left-1/2 -translate-x-1/2 w-4 h-6 bg-cyan-300/80 rounded-full blur-[1px]" />
                                {/* Engine fire */}
                                <div className="absolute bottom-[-15px] left-1/2 -translate-x-1/2 flex gap-1">
                                    <div className="w-2 h-6 bg-orange-500 blur-sm animate-pulse origin-top scale-y-[var(--thrust)]" />
                                    <div className="w-1 h-4 bg-yellow-300 blur-sm animate-pulse origin-top" />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Start/Game Over Overlay */}
                    <AnimatePresence>
                        {(!started || gameOver) && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute inset-0 flex items-center justify-center bg-slate-950/80 backdrop-blur-md z-50 p-4"
                            >
                                <motion.div
                                    initial={{ scale: 0.9, y: 20 }}
                                    animate={{ scale: 1, y: 0 }}
                                    className="bg-slate-900/90 border border-slate-700/50 p-8 rounded-2xl max-w-md w-full text-center shadow-2xl shadow-cyan-900/40 relative overflow-hidden"
                                >
                                    <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />

                                    <h1 className="text-4xl md:text-5xl font-black italic text-transparent bg-clip-text bg-gradient-to-b from-white to-cyan-400 mb-2">
                                        SPACE SHOOTER
                                    </h1>
                                    <p className="text-cyan-500/80 font-mono text-sm tracking-widest mb-8">DEFEND THE GALAXY</p>

                                    {gameOver && (
                                        <div className="mb-8 p-4 bg-white/5 rounded-xl border border-white/10">
                                            <div className="text-gray-400 text-sm mb-1">MISSION FAILED</div>
                                            <div className="text-3xl font-bold text-white mb-2">{score} POINTS</div>
                                            {score >= highScore && score > 0 && (
                                                <div className="text-yellow-400 text-xs font-bold animate-pulse">NEW HIGH SCORE!</div>
                                            )}
                                        </div>
                                    )}

                                    {!started && highScore > 0 && (
                                        <div className="mb-8 text-sm text-gray-400">
                                            HIGH SCORE: <span className="text-white font-bold">{highScore}</span>
                                        </div>
                                    )}

                                    <button
                                        onClick={startGame}
                                        className="w-full py-4 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-cyan-500/25 flex items-center justify-center gap-2 group"
                                    >
                                        {gameOver ? <RotateCcw size={20} /> : <Target size={20} />}
                                        {gameOver ? 'RETRY MISSION' : 'LAUNCH SHIP'}
                                    </button>

                                    <div className="mt-8 grid grid-cols-2 gap-4 text-xs text-gray-500 text-left">
                                        <div className="flex items-center gap-2">
                                            <div className="w-6 h-6 rounded bg-slate-800 flex items-center justify-center border border-slate-700">←</div>
                                            <div className="w-6 h-6 rounded bg-slate-800 flex items-center justify-center border border-slate-700">→</div>
                                            <span>Move</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="px-2 h-6 rounded bg-slate-800 flex items-center justify-center border border-slate-700">SPACE</div>
                                            <span>Shoot</span>
                                        </div>
                                    </div>
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Mobile Controls */}
                {started && !gameOver && (
                    <div className="h-48 md:hidden grid grid-cols-2 gap-2 p-2 bg-slate-900/50 backdrop-blur-lg border-t border-white/10">
                        <div className="grid grid-cols-2 gap-2">
                            <button
                                className="bg-slate-800/80 rounded-xl flex items-center justify-center active:bg-cyan-900/50 transition-colors"
                                onTouchStart={() => keysPressed.current['ArrowLeft'] = true}
                                onTouchEnd={() => keysPressed.current['ArrowLeft'] = false}
                                onMouseDown={() => keysPressed.current['ArrowLeft'] = true}
                                onMouseUp={() => keysPressed.current['ArrowLeft'] = false}
                            >
                                <ArrowLeft size={32} className="text-white/80" />
                            </button>
                            <button
                                className="bg-slate-800/80 rounded-xl flex items-center justify-center active:bg-cyan-900/50 transition-colors"
                                onTouchStart={() => keysPressed.current['ArrowRight'] = true}
                                onTouchEnd={() => keysPressed.current['ArrowRight'] = false}
                                onMouseDown={() => keysPressed.current['ArrowRight'] = true}
                                onMouseUp={() => keysPressed.current['ArrowRight'] = false}
                            >
                                <ArrowLeft size={32} className="rotate-180 text-white/80" />
                            </button>
                        </div>
                        <button
                            className="bg-red-500/20 border-2 border-red-500/50 rounded-xl flex items-center justify-center active:bg-red-500/40 transition-colors"
                            onTouchStart={manualShoot}
                            onClick={manualShoot}
                        >
                            <Target size={40} className="text-red-400" />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SpaceGame;
