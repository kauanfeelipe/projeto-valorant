import { useState, useRef, useMemo } from 'react';
import type { MouseEvent } from 'react';
import { usePlayerCards, useAgents } from '../hooks/useValorantData';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Search, ChevronRight } from 'lucide-react';
import clsx from 'clsx';
import LoadingState from '../components/ui/LoadingState';
import ErrorState from '../components/ui/ErrorState';
import type { PlayerCard } from '../services/api';

const TiltCard = ({ card }: { card: PlayerCard }) => {
    const ref = useRef<HTMLDivElement>(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 500, damping: 50 });
    const mouseY = useSpring(y, { stiffness: 500, damping: 50 });

    const rotateX = useTransform(mouseY, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;

        const rect = ref.current.getBoundingClientRect();

        const width = rect.width;
        const height = rect.height;

        const mouseXFromCenter = e.clientX - rect.left - width / 2;
        const mouseYFromCenter = e.clientY - rect.top - height / 2;

        const xPct = mouseXFromCenter / width;
        const yPct = mouseYFromCenter / height;

        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            }}
            className="relative w-full aspect-[1/2] rounded-xl bg-gray-900 border border-white/10 overflow-hidden cursor-pointer group perspective-1000"
        >
            <div
                style={{ transform: "translateZ(50px)" }}
                className="absolute inset-0"
            >
                <img
                    src={card.largeArt || ''}
                    alt={card.displayName}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                />
                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" style={{ mixBlendMode: 'overlay' }} />
            </div>

            <div
                style={{ transform: "translateZ(75px)" }}
                className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 via-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center"
            >
                <h3 className="text-white font-bold text-lg text-center drop-shadow-md leading-tight">{card.displayName}</h3>
            </div>
        </motion.div>
    );
};

const PlayerCards = () => {
    const { data: cards, isLoading: isLoadingCards, error: errorCards } = usePlayerCards();
    const { data: agents, isLoading: isLoadingAgents } = useAgents();
    const [selectedCategory, setSelectedCategory] = useState('Todos');
    const [searchTerm, setSearchTerm] = useState('');

    const categories = ['Todos', 'VCT / Esports', 'Agentes', 'Padrão'];

    const categorizedCards = useMemo(() => {
        if (!cards) return [];

        let filtered = cards;

        // First filter by search term
        if (searchTerm) {
            filtered = filtered.filter((card) =>
                card.displayName.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Then filter by category
        if (selectedCategory === 'Todos') {
            return filtered;
        }

        return filtered.filter((card) => {
            const name = card.displayName.toLowerCase();

            if (selectedCategory === 'VCT / Esports') {
                return name.includes('vct') || name.includes('champions') || name.includes('lock in') || name.includes('masters');
            }

            if (selectedCategory === 'Agentes') {
                // Check if card name contains any agent name
                return agents?.some(agent => name.includes(agent.displayName.toLowerCase()));
            }

            if (selectedCategory === 'Padrão') {
                // Standard is everything that doesn't fit in the other specific categories (excluding 'Todos')
                const isVCT = name.includes('vct') || name.includes('champions') || name.includes('lock in') || name.includes('masters');
                const isAgent = agents?.some(agent => name.includes(agent.displayName.toLowerCase()));

                return !isVCT && !isAgent;
            }

            return true;
        });
    }, [cards, agents, selectedCategory, searchTerm]);

    if (isLoadingCards || isLoadingAgents) {
        return <LoadingState message="CARREGANDO PLAYER CARDS..." />;
    }

    if (errorCards) {
        return <ErrorState message="Erro ao carregar player cards. Tente novamente mais tarde." />;
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

            {/* Main Content - Cards Grid */}
            <div className="flex-1">
                <div className="mb-8">
                    <h1 className="text-4xl font-heading font-bold text-white mb-2 uppercase tracking-wider">
                        {selectedCategory}
                    </h1>
                    <p className="text-gray-400 mb-6">
                        Visualizando {categorizedCards.length} cards
                    </p>

                    <div className="relative max-w-md">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            className="block w-full pl-10 pr-3 py-2 border border-gray-700 rounded-md leading-5 bg-gray-900 text-gray-300 placeholder-gray-400 focus:outline-none focus:bg-gray-800 focus:border-valorant-red sm:text-sm transition duration-150 ease-in-out"
                            placeholder="Buscar cards..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 perspective-1000">
                    {categorizedCards.map((card) => (
                        <div key={card.uuid} className="flex justify-center">
                            <TiltCard card={card} />
                        </div>
                    ))}
                </div>

                {categorizedCards.length === 0 && (
                    <div className="text-center py-12 text-gray-500">
                        Nenhum card encontrado nesta categoria.
                    </div>
                )}
            </div>
        </div>
    );
};

export default PlayerCards;
