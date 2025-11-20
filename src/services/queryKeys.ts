export const valorantKeys = {
    agents: {
        root: () => ['agents'] as const,
        list: () => [...valorantKeys.agents.root(), 'list'] as const,
        detail: (uuid: string) => [...valorantKeys.agents.root(), 'detail', uuid] as const,
    },
    maps: {
        root: () => ['maps'] as const,
        list: () => [...valorantKeys.maps.root(), 'list'] as const,
    },
    weapons: {
        root: () => ['weapons'] as const,
        list: () => [...valorantKeys.weapons.root(), 'list'] as const,
    },
};

