import { useQuery } from '@tanstack/react-query';
import { getAgentById, getAgents, getMaps, getWeapons, getSprays, getSkins, getPlayerCards, getCompetitiveTiers, getBundles } from '../services/api';
import { valorantKeys } from '../services/queryKeys';

export const useAgents = () => useQuery({
    queryKey: valorantKeys.agents.list(),
    queryFn: getAgents,
});

export const useAgent = (uuid?: string) => useQuery({
    queryKey: valorantKeys.agents.detail(uuid ?? 'unknown'),
    queryFn: () => {
        if (!uuid) {
            throw new Error('UUID is required to fetch agent');
        }
        return getAgentById(uuid);
    },
    enabled: Boolean(uuid),
});

export const useMaps = () => useQuery({
    queryKey: valorantKeys.maps.list(),
    queryFn: getMaps,
});

export const useWeapons = () => useQuery({
    queryKey: valorantKeys.weapons.list(),
    queryFn: getWeapons,
});

export const useSprays = () => {
    return useQuery({
        queryKey: valorantKeys.sprays.list(),
        queryFn: getSprays,
        staleTime: 1000 * 60 * 60 * 24,
    });
};

export const useSkins = () => {
    return useQuery({
        queryKey: valorantKeys.skins.list(),
        queryFn: getSkins,
        staleTime: 1000 * 60 * 60 * 24,
    });
};

export const usePlayerCards = () => {
    return useQuery({
        queryKey: valorantKeys.playercards.list(),
        queryFn: getPlayerCards,
        staleTime: 1000 * 60 * 60 * 24,
    });
};

export const useCompetitiveTiers = () => {
    return useQuery({
        queryKey: valorantKeys.competitivetiers.list(),
        queryFn: getCompetitiveTiers,
        staleTime: 1000 * 60 * 60 * 24,
    });
};

export const useBundles = () => {
    return useQuery({
        queryKey: valorantKeys.bundles.list(),
        queryFn: getBundles,
        staleTime: 1000 * 60 * 60 * 24,
    });
};
