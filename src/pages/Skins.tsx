import { useState, useEffect } from 'react';
import { useWeapons } from '../hooks/useValorantData';
import { motion } from 'framer-motion';
import { Search, Play, ChevronRight } from 'lucide-react';
import clsx from 'clsx';

const Skins = () => {
    const { data: weapons, isLoading, error } = useWeapons();
    const [selectedWeaponUuid, setSelectedWeaponUuid] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');

    // Set default weapon (Vandal) or first available when data loads
    useEffect(() => {
        if (weapons && weapons.length > 0 && !selectedWeaponUuid) {
            const vandal = weapons.find(w => w.displayName === "Vandal");
            setSelectedWeaponUuid(vandal ? vandal.uuid : weapons[0].uuid);
        }
    }, [weapons, selectedWeaponUuid]);

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
                Erro ao carregar skins.
            </div>
        );
    }

    const selectedWeapon = weapons?.find(w => w.uuid === selectedWeaponUuid);

    const filteredSkins = selectedWeapon?.skins.filter((skin) =>
        skin.displayName.toLowerCase().includes(searchTerm.toLowerCase()) &&
        skin.displayIcon &&
        skin.contentTierUuid // Filter out standard skins if desired, or keep them
    );

    // Sort weapons alphabetically
    const sortedWeapons = weapons?.sort((a, b) => a.displayName.localeCompare(b.displayName));

    return (
        <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col md:flex-row gap-8">

            {/* Sidebar - Weapon Selector */}
            <div className="w-full md:w-64 flex-shrink-0">
                <div className="bg-gray-900/80 backdrop-blur-md border border-white/10 rounded-xl p-4 sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto custom-scrollbar">
                    <h2 className="text-xl font-heading font-bold text-white mb-4 uppercase tracking-wider border-b border-white/10 pb-2">
                        Armas
                    </h2>
                    <div className="space-y-1">
                        {sortedWeapons?.map((weapon) => (
                            <button
                                key={weapon.uuid}
                                onClick={() => {
                                    setSelectedWeaponUuid(weapon.uuid);
                                    setSearchTerm(''); // Reset search when changing weapon
                                }}
                                className={clsx(
                                    "w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 flex items-center justify-between group",
                                    selectedWeaponUuid === weapon.uuid
                                        ? "bg-valorant-red text-white shadow-lg shadow-valorant-red/20"
                                        : "text-gray-400 hover:text-white hover:bg-white/5"
                                )}
                            >
                                <span>{weapon.displayName}</span>
                                {selectedWeaponUuid === weapon.uuid && (
                                    <ChevronRight size={16} className="text-white" />
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Main Content - Skins Grid */}
            <div className="flex-1">
                <div className="mb-8">
                    <h1 className="text-4xl font-heading font-bold text-white mb-2 uppercase tracking-wider">
                        {selectedWeapon?.displayName || 'Skins'}
                    </h1>
                    <p className="text-gray-400 mb-6">
                        Visualizando {filteredSkins?.length} skins
                    </p>

                    <div className="relative max-w-md">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            className="block w-full pl-10 pr-3 py-2 border border-gray-700 rounded-md leading-5 bg-gray-900 text-gray-300 placeholder-gray-400 focus:outline-none focus:bg-gray-800 focus:border-valorant-red sm:text-sm transition duration-150 ease-in-out"
                            placeholder={`Buscar skins de ${selectedWeapon?.displayName}...`}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredSkins?.map((skin) => (
                        <motion.div
                            key={skin.uuid}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            className="bg-gray-900/50 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden hover:border-valorant-red/50 transition-all duration-300 group"
                        >
                            <div className="aspect-video relative bg-gray-800/50 p-4 flex items-center justify-center overflow-hidden">
                                {skin.displayIcon ? (
                                    <img
                                        src={skin.displayIcon}
                                        alt={skin.displayName}
                                        className="object-contain w-full h-full group-hover:scale-110 transition-transform duration-300"
                                        loading="lazy"
                                    />
                                ) : (
                                    <div className="text-gray-500 text-xs">Sem Imagem</div>
                                )}
                                {/* Overlay for video preview hint if available */}
                                {skin.levels && skin.levels.some(l => l.streamedVideo) && (
                                    <div className="absolute top-2 right-2 bg-black/50 rounded-full p-1" title="Vídeo disponível">
                                        <Play size={12} className="text-white" />
                                    </div>
                                )}
                            </div>
                            <div className="p-4">
                                <h3 className="text-lg font-medium text-white truncate group-hover:text-valorant-red transition-colors">
                                    {skin.displayName}
                                </h3>
                            </div>
                        </motion.div>
                    ))}

                    {filteredSkins?.length === 0 && (
                        <div className="col-span-full text-center py-12 text-gray-500">
                            Nenhuma skin encontrada para "{searchTerm}".
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Skins;
