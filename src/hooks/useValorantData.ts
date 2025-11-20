import { useQuery } from '@tanstack/react-query';
import { getAgentById, getAgents, getMaps, getWeapons, getSprays, getSkins, getPlayerCards } from '../services/api';
import { valorantKeys } from '../services/queryKeys';

export const useAgents = () => useQuery({
    queryKey: valorantKeys.agents.list(),
    queryFn: getAgents,
});

export const useAgent = (uuid?: string) => useQuery({
    queryKey: valorantKeys.agents.detail(uuid ?? 'unknown'),
    queryFn: () => getAgentById(uuid!),
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
        queryKey: ['sprays'],
        queryFn: getSprays,
        staleTime: 1000 * 60 * 60 * 24, // 24 hours
    });
};

export const useSkins = () => {
    return useQuery({
        queryKey: ['skins'],
        queryFn: getSkins,
        staleTime: 1000 * 60 * 60 * 24, // 24 hours
    });
};

export const usePlayerCards = () => {
    return useQuery({
        queryKey: ['playercards'],
        queryFn: getPlayerCards,
        staleTime: 1000 * 60 * 60 * 24, // 24 hours
    });
};
