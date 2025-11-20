import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Hexagon } from 'lucide-react';
import type { Agent } from '../../services/api';

interface AgentSelectorProps {
    agents: Agent[];
}

const AgentSelector = ({ agents }: AgentSelectorProps) => {
    const uniqueAgents = useMemo(
        () => Array.from(new Map(agents.map(item => [item.displayName, item])).values()),
        [agents],
    );
    const [selectedAgent, setSelectedAgent] = useState<Agent | null>(uniqueAgents[0] ?? null);

    useEffect(() => {
        if (uniqueAgents.length) {
            setSelectedAgent(uniqueAgents[0]);
        }
    }, [uniqueAgents]);

    if (!selectedAgent) {
        return (
            <div className="min-h-[50vh] flex items-center justify-center bg-valorant-dark text-gray-400 font-heading tracking-widest">
                Nenhum agente disponível no momento.
            </div>
        );
    }

    const selectedAgentPortrait = selectedAgent.fullPortraitV2 ?? selectedAgent.fullPortrait ?? selectedAgent.displayIcon;

    return (
        <div className="relative h-[80vh] w-full overflow-hidden bg-valorant-dark flex rounded-sm border border-white/10">
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-[url('https://media.valorant-api.com/maps/d960549e-485c-e861-8d71-aa9d1aed12a2/splash.png')] bg-cover bg-center opacity-10 blur-sm" />
                <div className="absolute inset-0 bg-gradient-to-r from-valorant-dark via-valorant-dark/90 to-transparent" />
                <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-valorant-dark to-transparent" />
            </div>

            <div className="relative z-10 w-1/3 h-full border-r border-white/10 bg-black/20 backdrop-blur-sm flex flex-col">
                <div className="p-6 border-b border-white/10">
                    <h2 className="text-2xl font-heading font-bold text-white flex items-center gap-2">
                        <Hexagon className="text-valorant-red" size={24} />
                        PROTOCOLO DE AGENTES
                    </h2>
                    <p className="text-xs text-gray-500 font-mono mt-1 tracking-widest">SELECIONE UM OPERADOR</p>
                </div>

                <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-2">
                    {uniqueAgents.map((agent) => (
                        <button
                            key={agent.uuid}
                            onClick={() => setSelectedAgent(agent)}
                            className={`w-full text-left p-3 rounded-sm border transition-all duration-200 flex items-center gap-4 group ${selectedAgent.uuid === agent.uuid
                                ? 'bg-valorant-red border-valorant-red'
                                : 'bg-white/5 border-white/10 hover:border-white/30'
                                }`}
                        >
                            <img
                                src={agent.displayIconSmall}
                                alt={agent.displayName}
                                className={`w-8 h-8 rounded-sm transition-transform ${selectedAgent.uuid === agent.uuid ? 'scale-110' : 'grayscale group-hover:grayscale-0'}`}
                            />
                            <span className={`font-heading tracking-wider text-lg ${selectedAgent.uuid === agent.uuid ? 'text-white' : 'text-gray-400 group-hover:text-white'}`}>
                                {agent.displayName.toUpperCase()}
                            </span>
                        </button>
                    ))}
                </div>
            </div>

            <div className="relative z-10 flex-1 h-full overflow-hidden flex items-center justify-center">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={selectedAgent.uuid}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.4 }}
                        className="relative w-full h-full flex items-center justify-center"
                    >
                        <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none">
                            <span className="text-[20vw] font-heading font-bold text-white/5 whitespace-nowrap select-none">
                                {selectedAgent.displayName.toUpperCase()}
                            </span>
                        </div>

                        <img
                            src={selectedAgentPortrait}
                            alt={selectedAgent.displayName}
                            className="relative z-20 h-[90%] object-contain drop-shadow-2xl"
                        />

                        <div className="absolute bottom-8 left-8 z-30 max-w-md">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                            >
                                <div className="flex items-center gap-2 mb-2">
                                    <img src={selectedAgent.role?.displayIcon} alt={selectedAgent.role?.displayName} className="w-6 h-6" />
                                    <span className="text-valorant-red font-mono text-sm tracking-widest uppercase">
                                        {selectedAgent.role?.displayName}
                                    </span>
                                </div>
                                <h1 className="text-6xl font-heading font-bold text-white mb-4 uppercase">
                                    {selectedAgent.displayName}
                                </h1>
                                <p className="text-gray-300 mb-6 line-clamp-3">
                                    {selectedAgent.description}
                                </p>
                                <Link
                                    to={`/agents/${selectedAgent.uuid}`}
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-white text-valorant-dark font-heading font-bold hover:bg-valorant-red hover:text-white transition-colors"
                                >
                                    VER DETALHES COMPLETOS <ArrowRight size={20} />
                                </Link>
                            </motion.div>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
};

export default AgentSelector;
