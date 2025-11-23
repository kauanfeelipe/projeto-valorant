import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useMemo, useState, useRef } from 'react';
import { Crosshair, Zap, Target, BarChart3 } from 'lucide-react';
import { type Weapon } from '../services/api';
import LoadingState from '../components/ui/LoadingState';
import ErrorState from '../components/ui/ErrorState';
import { useWeapons } from '../hooks/useValorantData';

const getCategoryName = (categoryString: string) => {
    const parts = categoryString.split('::');
    return parts[parts.length - 1] ?? categoryString;
};

const formatCategoryLabel = (category: string) => (
    category === 'Melee' ? 'Confronto' : category
);

const Weapons = () => {
    const { data: weapons, isLoading, error } = useWeapons();
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [selectedWeapon, setSelectedWeapon] = useState<Weapon | null>(null);
    const detailsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (selectedWeapon && detailsRef.current && window.innerWidth < 1024) {
            setTimeout(() => {
                detailsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);
        }
    }, [selectedWeapon]);

    const categories = useMemo(() => {
        if (!weapons) {
            return [];
        }
        return Array.from(new Set(weapons.map((weapon) => getCategoryName(weapon.category)))).sort();
    }, [weapons]);

    useEffect(() => {
        if (!selectedCategory && categories.length) {
            setSelectedCategory(categories[0]);
        }
    }, [categories, selectedCategory]);

    const filteredWeapons = useMemo(() => (
        weapons?.filter(w => getCategoryName(w.category) === selectedCategory)
    ), [weapons, selectedCategory]);

    if (isLoading) {
        return <LoadingState message="CARREGANDO ARSENAL..." />;
    }

    if (error) {
        return <ErrorState message="Erro crítico no sistema de armas." />;
    }

    if (!weapons?.length) {
        return <ErrorState message="Nenhum dado de armas disponível." />;
    }

    return (
        <div className="min-h-screen bg-valorant-dark text-white py-12 px-4 sm:px-6 lg:px-8 font-sans relative overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

            <div className="relative z-10 max-w-7xl mx-auto">
                <div className="mb-12 text-center">
                    <h1 className="text-5xl md:text-7xl font-heading font-bold mb-4 flex items-center justify-center gap-4">
                        <Crosshair className="text-valorant-red" size={48} />
                        ARSENAL TÁTICO
                    </h1>
                    <p className="text-gray-400 font-mono tracking-[0.2em] text-sm">SISTEMA DE ARMAMENTO AVANÇADO</p>
                </div>

                <div className="flex flex-wrap justify-center gap-2 mb-12">
                    {categories.map(category => (
                        <button
                            key={category}
                            onClick={() => {
                                setSelectedCategory(category);
                                setSelectedWeapon(null);
                            }}
                            className={`px-6 py-2 border skew-x-[-20deg] transition-all duration-300 ${selectedCategory === category
                                ? 'bg-valorant-red border-valorant-red text-white shadow-[0_0_15px_rgba(255,70,85,0.5)]'
                                : 'bg-transparent border-gray-700 text-gray-500 hover:border-white hover:text-white'
                                }`}
                        >
                            <span className="block skew-x-[20deg] font-heading tracking-wider text-lg uppercase">
                                {formatCategoryLabel(category)}
                            </span>
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-1 space-y-4 h-[400px] lg:h-[600px] overflow-y-auto custom-scrollbar pr-2">
                        {filteredWeapons?.map((weapon) => (
                            <motion.div
                                key={weapon.uuid}
                                layoutId={`weapon-card-${weapon.uuid}`}
                                onClick={() => setSelectedWeapon(weapon)}
                                className={`group relative p-4 border cursor-pointer transition-all duration-300 overflow-hidden ${selectedWeapon?.uuid === weapon.uuid
                                    ? 'bg-white/10 border-valorant-red'
                                    : 'bg-white/5 border-white/10 hover:border-white/30'
                                    }`}
                            >
                                <div className="absolute top-0 right-0 p-1 opacity-20 group-hover:opacity-100 transition-opacity">
                                    <Target size={16} />
                                </div>
                                <div className="flex items-center justify-between relative z-10">
                                    <span className={`font-heading text-xl tracking-wider ${selectedWeapon?.uuid === weapon.uuid ? 'text-valorant-red' : 'text-white'}`}>
                                        {weapon.displayName.toUpperCase()}
                                    </span>
                                </div>
                                <img
                                    src={weapon.displayIcon}
                                    alt={weapon.displayName}
                                    loading="lazy"
                                    decoding="async"
                                    className="w-full h-24 object-contain mt-2 opacity-80 group-hover:opacity-100 transition-opacity"
                                />
                            </motion.div>
                        ))}
                    </div>

                    <div className="lg:col-span-2 relative" ref={detailsRef}>
                        <AnimatePresence mode="wait">
                            {selectedWeapon ? (
                                <motion.div
                                    key={selectedWeapon.uuid}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.4 }}
                                    className="h-full bg-black/40 backdrop-blur-md border border-white/20 p-8 relative overflow-hidden rounded-sm"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-b from-valorant-red/5 to-transparent pointer-events-none" />
                                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-valorant-red to-transparent opacity-50" />

                                    <div className="relative z-10 flex flex-col h-full">
                                        <div className="flex justify-between items-start mb-8">
                                            <div>
                                                <h2 className="text-4xl md:text-6xl font-heading font-bold text-white uppercase mb-2">{selectedWeapon.displayName}</h2>
                                                <div className="flex items-center gap-2 text-valorant-red font-mono text-sm">
                                                    <Zap size={16} />
                                                    <span>DADOS DA ARMA // {selectedWeapon.category.split('::').pop()?.toUpperCase()}</span>
                                                </div>
                                            </div>
                                            <div className="text-right font-mono text-xs text-gray-500">
                                                ID: {selectedWeapon.uuid.split('-')[0]}<br />
                                                VER: 2.0.4
                                            </div>
                                        </div>

                                        <div className="flex-1 flex items-center justify-center py-12 relative">
                                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-valorant-red/10 to-transparent blur-2xl" />
                                            <img
                                                src={selectedWeapon.displayIcon}
                                                alt={selectedWeapon.displayName}
                                                decoding="async"
                                                className="w-full max-w-2xl object-contain drop-shadow-[0_0_25px_rgba(255,255,255,0.2)] relative z-10"
                                            />
                                        </div>

                                        <div className="grid grid-cols-3 gap-4 mt-8 border-t border-white/10 pt-8">
                                            {selectedWeapon.weaponStats ? (
                                                <>
                                                    <StatBox
                                                        label="DANO (CORPO)"
                                                        value={selectedWeapon.weaponStats.damageRanges[0]?.bodyDamage || 0}
                                                        max={160}
                                                        suffix=""
                                                    />
                                                    <StatBox
                                                        label="CADÊNCIA"
                                                        value={selectedWeapon.weaponStats.fireRate}
                                                        max={16}
                                                        suffix=" /S"
                                                    />
                                                    <StatBox
                                                        label="MUNIÇÃO"
                                                        value={selectedWeapon.weaponStats.magazineSize}
                                                        max={100}
                                                        suffix=""
                                                    />
                                                </>
                                            ) : (
                                                <div className="col-span-3 text-center text-gray-500 font-mono py-4">
                                                    DADOS ESTATÍSTICOS NÃO DISPONÍVEIS PARA ESTE ITEM
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            ) : (
                                <div className="h-full flex flex-col items-center justify-center border border-white/10 border-dashed bg-white/5 rounded-sm text-gray-500 min-h-[300px]">
                                    <BarChart3 size={64} className="mb-4 opacity-50" />
                                    <p className="font-mono tracking-widest text-center">SELECIONE UM ITEM PARA ANÁLISE</p>
                                </div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    );
};

const StatBox = ({ label, value, max, suffix }: { label: string, value: number, max: number, suffix: string }) => {
    const percentage = Math.min((value / max) * 100, 100);

    return (
        <div className="bg-black/40 p-2 md:p-4 border border-white/5 relative group hover:border-valorant-red/50 transition-colors">
            <div className="text-gray-400 text-[10px] md:text-xs font-mono mb-1 md:mb-2 tracking-wider uppercase truncate" title={label}>{label}</div>
            <div className="text-lg md:text-2xl font-heading font-bold text-white mb-2 truncate">
                {value}<span className="text-sm md:text-lg text-gray-500">{suffix}</span>
            </div>
            <div className="h-1 w-full bg-gray-800 rounded-full overflow-hidden">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="h-full bg-valorant-red shadow-[0_0_10px_#ff4655]"
                />
            </div>
        </div>
    );
};

export default Weapons;
