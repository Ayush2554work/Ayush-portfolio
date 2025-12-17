import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink } from 'lucide-react';

interface CertificateModalProps {
    isOpen: boolean;
    onClose: () => void;
    certificateUrl: string;
    title: string;
    issuer: string;
}

const CertificateModal: React.FC<CertificateModalProps> = ({
    isOpen,
    onClose,
    certificateUrl,
    title,
    issuer
}) => {
    if (!isOpen) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ type: "spring", duration: 0.5 }}
                        className="fixed inset-4 md:inset-8 lg:inset-16 z-50 flex items-center justify-center"
                    >
                        <div className="relative w-full h-full max-w-5xl bg-slate-900/95 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-2xl shadow-cyan-500/10 overflow-hidden">

                            {/* Header */}
                            <div className="relative px-6 py-4 border-b border-slate-700/50 bg-gradient-to-r from-slate-900/90 to-slate-800/90 backdrop-blur-xl">
                                <div className="flex items-start justify-between gap-4">
                                    <div>
                                        <h2 className="text-xl md:text-2xl font-bold text-white mb-1">
                                            {title}
                                        </h2>
                                        <p className="text-sm text-cyan-400">{issuer}</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <a
                                            href={certificateUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="p-2 rounded-lg bg-slate-800/50 hover:bg-slate-700/50 text-gray-400 hover:text-white transition-all"
                                            title="Open in new tab"
                                        >
                                            <ExternalLink size={20} />
                                        </a>
                                        <button
                                            onClick={onClose}
                                            className="p-2 rounded-lg bg-slate-800/50 hover:bg-slate-700/50 text-gray-400 hover:text-white transition-all"
                                            aria-label="Close"
                                        >
                                            <X size={20} />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Certificate iFrame */}
                            <div className="relative w-full h-[calc(100%-5rem)] bg-slate-950/50">
                                <iframe
                                    src={certificateUrl}
                                    className="w-full h-full"
                                    title={`Certificate: ${title}`}
                                    sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                                />
                            </div>

                            {/* Decorative glow effects */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
                            <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default CertificateModal;
