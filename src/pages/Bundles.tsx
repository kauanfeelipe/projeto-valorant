import { useState, useMemo } from 'react';
import { useBundles } from '../hooks/useValorantData';
import { motion } from 'framer-motion';
import { Search, ChevronRight } from 'lucide-react';
import clsx from 'clsx';

const Bundles = () => {
    const { data: bundles, isLoading, error } = useBundles();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('Todos');

    const categories = ['Todos', 'VCT / Esports', 'Raros/Limitados', 'Padrão'];

    const categorizedBundles = useMemo(() => {
        if (!bundles) return [];

        let filtered = bundles;

        if (searchTerm) {
            filtered = filtered.filter((bundle) =>
                bundle.displayName.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (selectedCategory === 'Todos') {
            return filtered;
        }

        return filtered.filter((bundle) => {
            const name = bundle.displayName.toLowerCase();

            if (selectedCategory === 'VCT / Esports') {
                return name.includes('champions') || name.includes('masters') ||
                    name.includes('vct') || name.includes('lock in');
            }

            if (selectedCategory === 'Raros/Limitados') {
                return name.includes('exclusive') || name.includes('limited') ||
                    name.includes('premium') || name.includes('edition');
            }

            if (selectedCategory === 'Padrão') {
                const isVCT = name.includes('champions') || name.includes('masters') ||
                    name.includes('vct') || name.includes('lock in');
                const isRare = name.includes('exclusive') || name.includes('limited') ||
                    name.includes('premium') || name.includes('edition');
                return !isVCT && !isRare;
            }

            return true;
        });
    }, [bundles, selectedCategory, searchTerm]);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-valorant-red"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen text-valorant-red">
                Erro ao carregar bundles.
            </div>
        );
    }

    return (
        <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col md:flex-row gap-8">

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

            <div className="flex-1">
                <div className="mb-8">
                    <h1 className="text-4xl font-heading font-bold text-white mb-2 uppercase tracking-wider">
                        {selectedCategory}
                    </h1>
                    <p className="text-gray-400 mb-6">
                        Visualizando {categorizedBundles.length} pacotes
                    </p>

                    <div className="relative max-w-md">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            className="block w-full pl-10 pr-3 py-2 border border-gray-700 rounded-md leading-5 bg-gray-900 text-gray-300 placeholder-gray-400 focus:outline-none focus:bg-gray-800 focus:border-valorant-red sm:text-sm transition duration-150 ease-in-out"
                            placeholder="Buscar bundles..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categorizedBundles.map((bundle, index) => (
                        <motion.div
                            key={bundle.uuid}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05, duration: 0.4 }}
                            className="group relative bg-gray-900/50 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden hover:border-valorant-red/50 transition-all duration-300"
                        >
                            <div className="relative aspect-[3/4] overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900">
                                {bundle.verticalPromoImage || bundle.displayIcon2 ? (
                                    <img
                                        src={bundle.verticalPromoImage || bundle.displayIcon2}
                                        alt={bundle.displayName}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        loading="lazy"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center">
                                        <img
                                            src={bundle.displayIcon}
                                            alt={bundle.displayName}
                                            className="max-w-[80%] max-h-[80%] object-contain group-hover:scale-110 transition-transform duration-500"
                                            loading="lazy"
                                        />
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </div>

                            <div className="p-4">
                                <h3 className="text-lg font-bold text-white mb-1 group-hover:text-valorant-red transition-colors duration-300">
                                    {bundle.displayName}
                                </h3>
                                {bundle.displayNameSubText && (
                                    <p className="text-sm text-gray-400 mb-2">
                                        {bundle.displayNameSubText}
                                    </p>
                                )}
                                {bundle.description && (
                                    <p className="text-sm text-gray-500 line-clamp-2">
                                        {bundle.description}
                                    </p>
                                )}
                            </div>

                            <div className="absolute top-0 right-0 w-20 h-20 border-t-2 border-r-2 border-valorant-red/0 group-hover:border-valorant-red/50 transition-colors duration-500" />
                            <div className="absolute bottom-0 left-0 w-20 h-20 border-b-2 border-l-2 border-valorant-red/0 group-hover:border-valorant-red/50 transition-colors duration-500" />
                        </motion.div>
                    ))}
                </div>

                {categorizedBundles.length === 0 && (
                    <div className="text-center py-12 text-gray-500">
                        Nenhum bundle encontrado nesta categoria.
                    </div>
                )}
            </div>
        </div>
    );
};

export default Bundles;
