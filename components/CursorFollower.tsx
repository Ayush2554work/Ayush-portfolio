import React, { useState, useEffect, ReactNode } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';

interface CursorFollowerProps {
    children: ReactNode;
    strength?: number;
    className?: string;
}

const CursorFollower: React.FC<CursorFollowerProps> = ({ children, strength = 20, className = '' }) => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [elementPosition, setElementPosition] = useState({ x: 0, y: 0 });

    const springConfig = { stiffness: 150, damping: 15 };
    const x = useSpring(0, springConfig);
    const y = useSpring(0, springConfig);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const updatePosition = (element: HTMLDivElement | null) => {
        if (!element) return;

        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const deltaX = (mousePosition.x - centerX) / strength;
        const deltaY = (mousePosition.y - centerY) / strength;

        x.set(deltaX);
        y.set(deltaY);
    };

    return (
        <motion.div
            ref={updatePosition}
            style={{ x, y }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

export default CursorFollower;
