import { useState, useMemo } from 'react';
import { useSprays, useAgents } from '../hooks/useValorantData';
import { motion } from 'framer-motion';
import { Search, ChevronRight } from 'lucide-react';
import clsx from 'clsx';

const Sprays = () => {
    const { data: sprays, isLoading: isLoadingSprays, error: errorSprays } = useSprays();
    const { data: agents, isLoading: isLoadingAgents } = useAgents();
    const [selectedCategory, setSelectedCategory] = useState('Todos');
    const [searchTerm, setSearchTerm] = useState('');

    const categories = ['Todos', 'VCT / Esports', 'Agentes', 'Animados', 'Padrão'];

    const categorizedSprays = useMemo(() => {
        if (!sprays) return [];

        let filtered = sprays;

        // First filter by search term
        if (searchTerm) {
            filtered = filtered.filter((spray) =>
                spray.displayName.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Then filter by category
        if (selectedCategory === 'Todos') {
            return filtered;
        }

        return filtered.filter((spray) => {
            const name = spray.displayName.toLowerCase();

            if (selectedCategory === 'VCT / Esports') {
                return name.includes('vct') || name.includes('champions') || name.includes('lock in');
            }

            if (selectedCategory === 'Animados') {
                return spray.animationGif !== null;
            }

            if (selectedCategory === 'Agentes') {
                // Check if spray name contains any agent name
                return agents?.some(agent => name.includes(agent.displayName.toLowerCase()));
            }

            if (selectedCategory === 'Padrão') {
                // Standard is everything that doesn't fit in the other specific categories (excluding 'Todos')
                const isVCT = name.includes('vct') || name.includes('champions') || name.includes('lock in');
                const isAnimated = spray.animationGif !== null;
                const isAgent = agents?.some(agent => name.includes(agent.displayName.toLowerCase()));

                return !isVCT && !isAnimated && !isAgent;
            }

            return true;
        });
    }, [sprays, agents, selectedCategory, searchTerm]);

    if (isLoadingSprays || isLoadingAgents) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-valorant-red"></div>
            </div>
        );
    }

    if (errorSprays) {
        return (
            <div className="flex items-center justify-center min-h-screen text-valorant-red">
                Erro ao carregar sprays.
            </div>
        );
    }

    return (
        <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col md:flex-row gap-8">

            {/* Sidebar - Categories */}
            <div className="w-full md:w-64 flex-shrink-0">
                <div className="bg-gray-900/80 backdrop-blur-md border border-white/10 rounded-xl p-4 sticky top-24">
                    <h2 className="text-xl font-heading font-bold text-white mb-4 uppercase tracking-wider border-b border-white/10 pb-2">
                        Categorias
                    </h2>
                    <div className="space-y-1">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={clsx(
                                    "w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 flex items-center justify-between group",
                                    selectedCategory === category
                                        ? "bg-valorant-red text-white shadow-lg shadow-valorant-red/20"
                                        : "text-gray-400 hover:text-white hover:bg-white/5"
                                )}
                            >
                                <span>{category}</span>
                                {selectedCategory === category && (
                                    <ChevronRight size={16} className="text-white" />
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Main Content - Sprays Grid */}
            <div className="flex-1">
                <div className="mb-8">
                    <h1 className="text-4xl font-heading font-bold text-white mb-2 uppercase tracking-wider">
                        {selectedCategory}
                    </h1>
                    <p className="text-gray-400 mb-6">
                        Visualizando {categorizedSprays.length} sprays
                    </p>

                    <div className="relative max-w-md">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            className="block w-full pl-10 pr-3 py-2 border border-gray-700 rounded-md leading-5 bg-gray-900 text-gray-300 placeholder-gray-400 focus:outline-none focus:bg-gray-800 focus:border-valorant-red sm:text-sm transition duration-150 ease-in-out"
                            placeholder="Buscar sprays..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    {categorizedSprays.map((spray) => (
                        <motion.div
                            key={spray.uuid}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            className="bg-gray-900/50 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-valorant-red/50 transition-all duration-300 group relative overflow-hidden"
                        >
                            <div className="aspect-square relative mb-4 flex items-center justify-center">
                                {spray.displayIcon ? (
                                    <img
                                        src={spray.animationGif || spray.fullIcon || spray.displayIcon}
                                        alt={spray.displayName}
                                        className="object-contain w-full h-full group-hover:scale-110 transition-transform duration-300 drop-shadow-lg"
                                        loading="lazy"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-gray-800 rounded-lg flex items-center justify-center text-gray-500 text-xs">
                                        Sem Imagem
                                    </div>
                                )}
                            </div>
                            <div className="text-center">
                                <h3 className="text-sm font-medium text-gray-200 truncate group-hover:text-valorant-red transition-colors" title={spray.displayName}>
                                    {spray.displayName}
                                </h3>
                            </div>
                        </motion.div>
                    ))}

                    {categorizedSprays.length === 0 && (
                        <div className="col-span-full text-center py-12 text-gray-500">
                            Nenhum spray encontrado nesta categoria.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Sprays;
