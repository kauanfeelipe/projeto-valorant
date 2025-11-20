import axios from 'axios';

const api = axios.create({
    baseURL: 'https://valorant-api.com/v1',
});

export interface ValorantApiResponse<T> {
    status: number;
    data: T;
}

export interface Agent {
    uuid: string;
    displayName: string;
    description: string;
    developerName: string;
    characterTags: string[] | null;
    displayIcon: string;
    displayIconSmall: string;
    bustPortrait: string | null;
    fullPortrait: string | null;
    fullPortraitV2: string | null;
    killfeedPortrait: string;
    background: string | null;
    backgroundGradientColors: string[];
    assetPath: string;
    isFullPortraitRightFacing: boolean;
    isPlayableCharacter: boolean;
    isAvailableForTest: boolean;
    isBaseContent: boolean;
    role: {
        uuid: string;
        displayName: string;
        description: string;
        displayIcon: string;
        assetPath: string;
    } | null;
    abilities: {
        slot: string;
        displayName: string;
        description: string;
        displayIcon: string | null;
    }[];
    voiceLine: any;
}

export interface ValorantMap {
    uuid: string;
    displayName: string;
    coordinates: string;
    displayIcon: string;
    listViewIcon: string;
    splash: string;
    assetPath: string;
    mapUrl: string;
    xMultiplier: number;
    yMultiplier: number;
    xScalarToAdd: number;
    yScalarToAdd: number;
    callouts: {
        regionName: string;
        superRegionName: string;
        location: {
            x: number;
            y: number;
        };
    }[];
}

export interface Weapon {
    uuid: string;
    displayName: string;
    category: string;
    displayIcon: string;
    killStreamIcon: string;
    assetPath: string;
    weaponStats: {
        fireRate: number;
        magazineSize: number;
        runSpeedMultiplier: number;
        equipTimeSeconds: number;
        reloadTimeSeconds: number;
        firstBulletAccuracy: number;
        shotgunPelletCount: number;
        wallPenetration: string;
        feature: string;
        fireMode: string | null;
        altFireType: string | null;
        adsStats: {
            zoomMultiplier: number;
            fireRate: number;
            runSpeedMultiplier: number;
            burstCount: number;
            firstBulletAccuracy: number;
        } | null;
        altShotgunStats: any;
        airBurstStats: any;
        damageRanges: {
            rangeStartMeters: number;
            rangeEndMeters: number;
            headDamage: number;
            bodyDamage: number;
            legDamage: number;
        }[];
    } | null;
    shopData: {
        cost: number;
        category: string;
        categoryText: string;
        gridPosition: {
            row: number;
            column: number;
        } | null;
        canBeTrashed: boolean;
        image: any;
        newImage: any;
        newImage2: any;
        assetPath: string;
    } | null;
    skins: WeaponSkin[];
}

export interface Spray {
    uuid: string;
    displayName: string;
    category: string | null;
    themeUuid: string | null;
    displayIcon: string;
    fullIcon: string | null;
    fullTransparentIcon: string | null;
    animationPng: string | null;
    animationGif: string | null;
    assetPath: string;
    levels: any[];
    isNullSpray: boolean;
}

export interface WeaponSkin {
    uuid: string;
    displayName: string;
    themeUuid: string;
    contentTierUuid: string;
    displayIcon: string;
    wallpaper: string | null;
    assetPath: string;
    chromas: {
        uuid: string;
        displayName: string;
        displayIcon: string | null;
        fullRender: string;
        swatch: string | null;
        streamedVideo: string | null;
        assetPath: string;
    }[];
    levels: {
        uuid: string;
        displayName: string;
        levelItem: string | null;
        displayIcon: string | null;
        streamedVideo: string | null;
        assetPath: string;
    }[];
}

export interface PlayerCard {
    uuid: string;
    displayName: string;
    isHiddenIfNotOwned: boolean;
    displayIcon: string;
    smallArt: string;
    wideArt: string;
    largeArt: string;
    assetPath: string;
}

export interface CompetitiveTier {
    tier: number;
    tierName: string;
    division: string;
    divisionName: string;
    color: string;
    backgroundColor: string;
    smallIcon: string | null;
    largeIcon: string | null;
    rankTriangleDownIcon: string | null;
    rankTriangleUpIcon: string | null;
}

export interface CompetitiveSeasonData {
    uuid: string;
    assetObjectName: string;
    tiers: CompetitiveTier[];
    assetPath: string;
}

export interface Bundle {
    uuid: string;
    displayName: string;
    displayNameSubText: string | null;
    description: string;
    extraDescription: string | null;
    promoDescription: string | null;
    useAdditionalContext: boolean;
    displayIcon: string;
    displayIcon2: string;
    verticalPromoImage: string | null;
    assetPath: string;
}

export const getAgents = async () => {
    const response = await api.get<{ data: Agent[] }>('/agents', {
        params: {
            isPlayableCharacter: true,
            language: 'pt-BR'
        }
    });
    return response.data.data;
};

export const getAgentById = async (uuid: string) => {
    const response = await api.get<{ data: Agent }>(`/agents/${uuid}`, {
        params: {
            language: 'pt-BR'
        }
    });
    return response.data.data;
};

export const getMaps = async () => {
    const response = await api.get<{ data: ValorantMap[] }>('/maps', {
        params: {
            language: 'pt-BR'
        }
    });
    return response.data.data;
};

export const getWeapons = async () => {
    const response = await api.get<{ data: Weapon[] }>('/weapons', {
        params: {
            language: 'pt-BR'
        }
    });
    return response.data.data;
};

export const getSprays = async () => {
    const response = await api.get<ValorantApiResponse<Spray[]>>('/sprays', {
        params: {
            language: 'pt-BR',
        },
    });
    return response.data.data;
};

export const getSkins = async () => {
    const response = await api.get<ValorantApiResponse<WeaponSkin[]>>('/weapons/skins', {
        params: {
            language: 'pt-BR',
        },
    });
    return response.data.data;
};

export const getPlayerCards = async () => {
    const response = await api.get<ValorantApiResponse<PlayerCard[]>>('/playercards', {
        params: {
            language: 'pt-BR',
        },
    });
    return response.data.data;
};

export const getCompetitiveTiers = async (): Promise<CompetitiveSeasonData[]> => {
    const response = await api.get<ValorantApiResponse<CompetitiveSeasonData[]>>('/competitivetiers', {
        params: {
            language: 'pt-BR',
        },
    });
    return response.data.data;
};

export const getBundles = async (): Promise<Bundle[]> => {
    const response = await api.get<ValorantApiResponse<Bundle[]>>('/bundles', {
        params: {
            language: 'pt-BR',
        },
    });
    return response.data.data;
};

export default api;
