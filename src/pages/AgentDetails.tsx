import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import LoadingState from '../components/ui/LoadingState';
import ErrorState from '../components/ui/ErrorState';
import { useAgent } from '../hooks/useValorantData';

const AgentDetails = () => {
    const { uuid } = useParams<{ uuid: string }>();
    const { data: agent, isLoading, error } = useAgent(uuid);

    if (isLoading) {
        return <LoadingState message="CARREGANDO DADOS DO AGENTE..." />;
    }

    if (error || !agent) {
        return (
            <ErrorState
                message="Agente não encontrado."
                action={<Link to="/agents" className="text-white hover:text-valorant-red underline">Voltar para Agentes</Link>}
            />
        );
    }

    return (
        <div className="relative min-h-screen overflow-hidden bg-valorant-dark">
            <div className="absolute inset-0 z-0 opacity-20">
                <img
                    src={agent.background || ''}
                    alt="Background"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-valorant-dark via-valorant-dark/90 to-transparent" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Link to="/agents" className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors">
                    <ArrowLeft className="mr-2" size={20} />
                    VOLTAR PARA AGENTES
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="flex items-center gap-4 mb-4">
                            <span className="text-valorant-red font-bold tracking-widest uppercase">
                                {agent.role?.displayName}
                            </span>
                            {agent.role?.displayIcon && (
                                <img src={agent.role.displayIcon} alt={agent.role.displayName} className="w-6 h-6 opacity-80" />
                            )}
                        </div>

                        <h1 className="text-6xl md:text-8xl font-heading font-bold text-white mb-6 leading-none uppercase">
                            {agent.displayName}
                        </h1>

                        <p className="text-gray-300 text-lg leading-relaxed mb-8 border-l-4 border-valorant-red pl-6">
                            {agent.description}
                        </p>

                        <div className="space-y-8">
                            <h2 className="text-2xl font-heading text-white border-b border-white/10 pb-2">HABILIDADES</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {agent.abilities.map((ability) => (
                                    <div key={ability.slot} className="bg-white/5 p-4 rounded-sm border border-white/10 hover:border-valorant-red transition-colors">
                                        <div className="flex items-center gap-3 mb-2">
                                            {ability.displayIcon && (
                                                <img src={ability.displayIcon} alt={ability.displayName} className="w-8 h-8" />
                                            )}
                                            <h3 className="text-lg font-bold text-white uppercase">{ability.displayName}</h3>
                                        </div>
                                        <p className="text-gray-400 text-sm">{ability.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative h-[600px] lg:h-[800px] flex items-center justify-center"
                    >
                        <img
                            src={agent.fullPortraitV2 || agent.fullPortrait || agent.displayIcon}
                            alt={agent.displayName}
                            className="absolute w-full h-full object-contain drop-shadow-2xl transform hover:scale-105 transition-transform duration-700"
                        />
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default AgentDetails;
