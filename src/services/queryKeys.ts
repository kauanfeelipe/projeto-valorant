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
    sprays: {
        root: () => ['sprays'] as const,
        list: () => [...valorantKeys.sprays.root(), 'list'] as const,
    },
    skins: {
        root: () => ['skins'] as const,
        list: () => [...valorantKeys.skins.root(), 'list'] as const,
    },
    playercards: {
        root: () => ['playercards'] as const,
        list: () => [...valorantKeys.playercards.root(), 'list'] as const,
    },
    competitivetiers: {
        root: () => ['competitivetiers'] as const,
        list: () => [...valorantKeys.competitivetiers.root(), 'list'] as const,
    },
    bundles: {
        root: () => ['bundles'] as const,
        list: () => [...valorantKeys.bundles.root(), 'list'] as const,
    },
};
