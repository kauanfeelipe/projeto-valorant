import LoadingState from '../components/ui/LoadingState';
import ErrorState from '../components/ui/ErrorState';
import { useMaps } from '../hooks/useValorantData';
import { AlertTriangle } from 'lucide-react';

const Maps = () => {
    const { data: maps, isLoading, error } = useMaps();

    if (isLoading) {
        return <LoadingState message="CARREGANDO MAPAS..." />;
    }

    if (error) {
        return <ErrorState message="Erro ao carregar mapas." />;
    }

    if (!maps?.length) {
        return <ErrorState message="Nenhum mapa disponível." />;
    }

    const uniqueMaps = maps.filter((map, index, self) =>
        index === self.findIndex((m) => m.displayName === map.displayName)
    );

    return (
        <div className="min-h-screen bg-valorant-dark flex flex-col">
            <div className="pt-12 px-8 mb-4">
                <h1 className="text-5xl md:text-7xl font-heading font-bold text-white uppercase">MAPAS</h1>
                <p className="text-gray-400 font-mono tracking-widest mb-2">ROLE HORIZONTALMENTE PARA EXPLORAR</p>
                <div className="flex items-center gap-2 text-yellow-500 font-mono text-sm tracking-wider">
                    <AlertTriangle size={16} />
                    <span>EM DESENVOLVIMENTO</span>
                </div>
            </div>

            <div
                className="flex-1 overflow-x-auto flex items-center gap-8 px-8 pb-12 custom-scrollbar snap-x snap-mandatory"
                style={{ scrollBehavior: 'smooth' }}
            >
                {uniqueMaps.map((map) => (
                    <div
                        key={map.uuid}
                        className="relative flex-shrink-0 w-[80vw] md:w-[60vw] lg:w-[40vw] h-[60vh] rounded-sm overflow-hidden group border border-white/10 hover:border-valorant-red transition-colors duration-300 snap-center"
                    >
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
                        <img
                            src={map.splash}
                            alt={map.displayName}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute bottom-0 left-0 p-8 z-20 w-full">
                            <h2 className="text-4xl md:text-6xl font-heading font-bold text-white uppercase mb-2 drop-shadow-lg">
                                {map.displayName}
                            </h2>
                            <div className="flex items-center justify-between">
                                <p className="text-gray-300 font-mono text-sm md:text-base tracking-wider">
                                    {map.coordinates || 'COORDENADAS DESCONHECIDAS'}
                                </p>
                                {map.displayIcon && (
                                    <img
                                        src={map.displayIcon}
                                        alt="Minimap"
                                        className="w-16 h-16 md:w-24 md:h-24 object-contain opacity-80"
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Maps;
