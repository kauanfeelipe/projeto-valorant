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
        <div className="relative h-[80vh] w-full overflow-hidden bg-valorant-dark flex flex-col md:flex-row rounded-sm border border-white/10">
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-[url('https://media.valorant-api.com/maps/d960549e-485c-e861-8d71-aa9d1aed12a2/splash.png')] bg-cover bg-center opacity-10 blur-sm" />
                <div className="absolute inset-0 bg-gradient-to-r from-valorant-dark via-valorant-dark/90 to-transparent" />
                <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-valorant-dark to-transparent" />
            </div>

            <div className="relative z-10 w-full md:w-1/3 h-auto md:h-full border-b md:border-b-0 md:border-r border-white/10 bg-black/20 backdrop-blur-sm flex flex-col max-h-[30vh] md:max-h-full">
                <div className="p-4 md:p-6 border-b border-white/10">
                    <h2 className="text-lg md:text-2xl font-heading font-bold text-white flex items-center gap-2">
                        <Hexagon className="text-valorant-red" size={20} />
                        <span className="hidden sm:inline">PROTOCOLO DE AGENTES</span>
                        <span className="sm:hidden">AGENTES</span>
                    </h2>
                    <p className="text-xs text-gray-500 font-mono mt-1 tracking-widest hidden sm:block">SELECIONE UM OPERADOR</p>
                </div>

                <div className="flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar p-2 md:p-4">
                    <div className="grid grid-cols-4 sm:grid-cols-3 md:grid-cols-1 gap-2">
                        {uniqueAgents.map((agent) => (
                            <button
                                key={agent.uuid}
                                onClick={() => setSelectedAgent(agent)}
                                className={`w-full text-left p-2 md:p-3 rounded-sm border transition-all duration-200 flex flex-col md:flex-row items-center gap-2 md:gap-4 group ${selectedAgent.uuid === agent.uuid
                                    ? 'bg-valorant-red border-valorant-red'
                                    : 'bg-white/5 border-white/10 hover:border-white/30'
                                    }`}
                            >
                                <img
                                    src={agent.displayIconSmall}
                                    alt={agent.displayName}
                                    loading="lazy"
                                    decoding="async"
                                    className={`w-8 h-8 md:w-10 md:h-10 rounded-sm transition-transform ${selectedAgent.uuid === agent.uuid ? 'scale-110' : 'grayscale group-hover:grayscale-0'}`}
                                />
                                <span className={`font-heading tracking-wider text-xs md:text-lg hidden md:block ${selectedAgent.uuid === agent.uuid ? 'text-white' : 'text-gray-400 group-hover:text-white'}`}>
                                    {agent.displayName.toUpperCase()}
                                </span>
                            </button>
                        ))}
                    </div>
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
                            <span className="text-[15vw] md:text-[20vw] font-heading font-bold text-white/5 whitespace-nowrap select-none">
                                {selectedAgent.displayName.toUpperCase()}
                            </span>
                        </div>

                        <img
                            src={selectedAgentPortrait || ''}
                            alt={selectedAgent.displayName}
                            decoding="async"
                            className="relative z-20 h-[70%] md:h-[90%] object-contain drop-shadow-2xl"
                        />

                        <div className="absolute bottom-4 left-4 right-4 md:bottom-8 md:left-8 md:right-auto z-30 max-w-full md:max-w-md">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="bg-black/60 md:bg-transparent backdrop-blur-sm md:backdrop-blur-none p-4 md:p-0 rounded-lg md:rounded-none"
                            >
                                <div className="flex items-center gap-2 mb-2">
                                    <img
                                        src={selectedAgent.role?.displayIcon}
                                        alt={selectedAgent.role?.displayName}
                                        loading="lazy"
                                        decoding="async"
                                        className="w-5 h-5 md:w-6 md:h-6"
                                    />
                                    <span className="text-valorant-red font-mono text-xs md:text-sm tracking-widest uppercase">
                                        {selectedAgent.role?.displayName}
                                    </span>
                                </div>
                                <h1 className="text-3xl md:text-6xl font-heading font-bold text-white mb-2 md:mb-4 uppercase">
                                    {selectedAgent.displayName}
                                </h1>
                                <p className="text-gray-300 text-sm md:text-base mb-4 md:mb-6 line-clamp-2 md:line-clamp-3">
                                    {selectedAgent.description}
                                </p>
                                <Link
                                    to={`/agents/${selectedAgent.uuid}`}
                                    className="inline-flex items-center gap-2 px-4 py-2 md:px-6 md:py-3 bg-white text-valorant-dark text-sm md:text-base font-heading font-bold hover:bg-valorant-red hover:text-white transition-colors"
                                >
                                    <span className="hidden sm:inline">VER DETALHES COMPLETOS</span>
                                    <span className="sm:hidden">DETALHES</span>
                                    <ArrowRight size={18} />
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
