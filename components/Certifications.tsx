import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Award } from 'lucide-react';
import { CERTIFICATIONS } from '../constants';
import CertificateModal from './CertificateModal';

const Certifications: React.FC = () => {
  const [selectedCert, setSelectedCert] = useState<{ url: string, title: string, issuer: string } | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const headerY = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const gridY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section ref={sectionRef} id="certifications" className="py-24 relative z-10 bg-gradient-to-b from-transparent to-slate-950/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div style={{ y: headerY }} className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Galactic Credentials
          </h2>
          <p className="text-gray-400">
            Professional certifications from world-class institutions including Google, IBM, DeepLearning.AI, and top universities.
          </p>
        </motion.div>

        <motion.div style={{ y: gridY }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {CERTIFICATIONS.map((cert) => (
            <button
              key={cert.id}
              onClick={() => setSelectedCert({ url: cert.link, title: cert.title, issuer: cert.issuer })}
              className="group flex items-start gap-4 p-5 rounded-xl bg-slate-800/40 backdrop-blur-md border border-slate-700/50 hover:bg-slate-800/70 hover:border-cyan-500/40 hover:shadow-lg hover:shadow-cyan-500/10 transition-all duration-300 text-left cursor-pointer"
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-900/30 to-purple-900/30 backdrop-blur-sm flex items-center justify-center text-cyan-400 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-cyan-500/20 transition-all duration-300">
                <Award size={24} />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-white font-medium mb-1 group-hover:text-cyan-300 transition-colors line-clamp-2">
                  {cert.title}
                </h4>
                <p className="text-sm text-gray-500">
                  {cert.issuer}
                </p>
              </div>
            </button>
          ))}
        </motion.div>

        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Certificate Modal */}
      <CertificateModal
        isOpen={selectedCert !== null}
        onClose={() => setSelectedCert(null)}
        certificateUrl={selectedCert?.url || ''}
        title={selectedCert?.title || ''}
        issuer={selectedCert?.issuer || ''}
      />
    </section>
  );
};

export default Certifications;