import { useCompetitiveTiers } from '../hooks/useValorantData';
import { motion } from 'framer-motion';
import { useMemo } from 'react';

const Ranks = () => {
    const { data: seasons, isLoading, error } = useCompetitiveTiers();

    const latestSeason = useMemo(() => {
        if (!seasons || seasons.length === 0) return null;
        return seasons[seasons.length - 1];
    }, [seasons]);

    const rankedTiers = useMemo(() => {
        if (!latestSeason) return [];
        return latestSeason.tiers.filter(tier =>
            tier.tier >= 3 && tier.largeIcon !== null
        );
    }, [latestSeason]);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-valorant-red"></div>
            </div>
        );
    }

    if (error || !latestSeason) {
        return (
            <div className="flex items-center justify-center min-h-screen text-valorant-red">
                Erro ao carregar ranks.
            </div>
        );
    }

    return (
        <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="mb-12 text-center">
                <h1 className="text-5xl font-heading font-bold text-white mb-4 uppercase tracking-wider">
                    Ranks Competitivos
                </h1>
                <p className="text-gray-400 max-w-2xl mx-auto">
                    Progressão completa dos ranks do modo competitivo do Valorant
                </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                {rankedTiers.map((tier, index) => (
                    <motion.div
                        key={tier.tier}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05, duration: 0.4 }}
                        className="relative group"
                    >
                        <div
                            className="relative bg-gray-900/50 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-valorant-red/50 transition-all duration-300 overflow-hidden"
                            style={{
                                boxShadow: `0 0 20px rgba(${parseInt(tier.color.slice(0, 2), 16)}, ${parseInt(tier.color.slice(2, 4), 16)}, ${parseInt(tier.color.slice(4, 6), 16)}, 0.1)`
                            }}
                        >
                            <div
                                className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                                style={{
                                    background: `radial-gradient(circle at center, #${tier.color.slice(0, 6)} 0%, transparent 70%)`
                                }}
                            />

                            <div className="relative z-10 flex flex-col items-center">
                                <div className="w-24 h-24 mb-4 relative">
                                    <img
                                        src={tier.largeIcon!}
                                        alt={tier.tierName}
                                        className="w-full h-full object-contain drop-shadow-2xl group-hover:scale-110 transition-transform duration-300"
                                    />
                                    <div
                                        className="absolute inset-0 blur-xl opacity-50"
                                        style={{
                                            background: `radial-gradient(circle, #${tier.color.slice(0, 6)} 0%, transparent 70%)`
                                        }}
                                    />
                                </div>

                                <h3
                                    className="text-sm font-bold text-center uppercase tracking-wider"
                                    style={{ color: `#${tier.color.slice(0, 6)}` }}
                                >
                                    {tier.tierName}
                                </h3>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Ranks;
