import axios, { type AxiosError } from 'axios';
import {
    validateApiResponse,
    agentsArraySchema,
    agentSchema,
    mapsArraySchema,
    weaponsArraySchema,
    spraysArraySchema,
    weaponSkinsArraySchema,
    playerCardsArraySchema,
    competitiveSeasonDataArraySchema,
    bundlesArraySchema,
} from './validation';

const api = axios.create({
    baseURL: 'https://valorant-api.com/v1',
    timeout: 10000,
});

api.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
        if (error.response) {
            console.error('API Error:', error.response.status, error.response.data);
        } else if (error.request) {
            console.error('Network Error: No response received', error.request);
        } else {
            console.error('Request Error:', error.message);
        }
        return Promise.reject(error);
    }
);

export interface ValorantApiResponse<T> {
    status: number;
    data: T;
}

export interface VoiceLine {
    minDuration?: number;
    maxDuration?: number;
    mediaList?: Array<{
        id: number;
        wwise: string;
        wave: string;
    }>;
}

export interface AltShotgunStats {
    shotgunPelletCount?: number;
    burstRate?: number;
}

export interface AirBurstStats {
    airBurstRadius?: number;
    damageForAirBurst?: number;
}

export interface SprayLevel {
    uuid: string;
    sprayLevel?: number;
    displayName?: string;
    displayIcon?: string | null;
    assetPath?: string;
}

export interface Agent {
    uuid: string;
    displayName: string;
    description: string;
    developerName: string;
    characterTags?: string[] | null;
    displayIcon?: string | null;
    displayIconSmall: string;
    bustPortrait?: string | null;
    fullPortrait?: string | null;
    fullPortraitV2?: string | null;
    killfeedPortrait: string;
    background?: string | null;
    backgroundGradientColors?: string[];
    assetPath: string;
    isFullPortraitRightFacing?: boolean;
    isPlayableCharacter?: boolean;
    isAvailableForTest?: boolean;
    isBaseContent?: boolean;
    role: {
        uuid: string;
        displayName: string;
        description: string;
        displayIcon: string;
        assetPath: string;
    } | null;
    abilities?: {
        slot: string;
        displayName: string;
        description: string;
        displayIcon: string | null;
    }[];
    voiceLine: VoiceLine | null;
}

export interface ValorantMap {
    uuid: string;
    displayName: string;
    coordinates?: string | null;
    displayIcon?: string | null;
    listViewIcon?: string | null;
    splash: string;
    assetPath: string;
    mapUrl?: string;
    xMultiplier?: number;
    yMultiplier?: number;
    xScalarToAdd?: number;
    yScalarToAdd?: number;
    callouts?: any;
}

export interface Weapon {
    uuid: string;
    displayName: string;
    category: string;
    displayIcon?: string | null;
    killStreamIcon: string;
    assetPath: string;
    weaponStats: any;
    shopData: any;
    skins: any[];
}

export interface Spray {
    uuid: string;
    displayName: string;
    category: string | null;
    themeUuid: string | null;
    displayIcon?: string | null;
    fullIcon: string | null;
    fullTransparentIcon: string | null;
    animationPng: string | null;
    animationGif: string | null;
    assetPath: string;
    levels: SprayLevel[];
    isNullSpray: boolean;
}

export interface WeaponSkin {
    uuid: string;
    displayName: string;
    themeUuid?: string | null;
    contentTierUuid?: string | null;
    displayIcon?: string | null;
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
    isHiddenIfNotOwned?: boolean;
    displayIcon?: string | null;
    smallArt?: string | null;
    wideArt?: string | null;
    largeArt?: string | null;
    assetPath?: string;
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
    displayIcon?: string | null;
    displayIcon2: string;
    verticalPromoImage: string | null;
    assetPath: string;
}

export const getAgents = async (): Promise<Agent[]> => {
    const response = await api.get<{ data: Agent[] }>('/agents', {
        params: {
            isPlayableCharacter: true,
            language: 'pt-BR'
        }
    });

    if (!response.data?.data || !Array.isArray(response.data.data)) {
        throw new Error('Invalid API response: expected array of agents');
    }

    return validateApiResponse(response.data.data, agentsArraySchema, 'Invalid agents data');
};

export const getAgentById = async (uuid: string): Promise<Agent> => {
    const response = await api.get<{ data: Agent }>(`/agents/${uuid}`, {
        params: {
            language: 'pt-BR'
        }
    });

    if (!response.data?.data) {
        throw new Error('Invalid API response: agent data not found');
    }

    return validateApiResponse(response.data.data, agentSchema, 'Invalid agent data');
};

export const getMaps = async (): Promise<ValorantMap[]> => {
    const response = await api.get<{ data: ValorantMap[] }>('/maps', {
        params: {
            language: 'pt-BR'
        }
    });

    if (!response.data?.data || !Array.isArray(response.data.data)) {
        throw new Error('Invalid API response: expected array of maps');
    }

    return validateApiResponse(response.data.data, mapsArraySchema, 'Invalid maps data');
};

export const getWeapons = async (): Promise<Weapon[]> => {
    const response = await api.get<{ data: Weapon[] }>('/weapons', {
        params: {
            language: 'pt-BR'
        }
    });

    if (!response.data?.data || !Array.isArray(response.data.data)) {
        throw new Error('Invalid API response: expected array of weapons');
    }

    return validateApiResponse(response.data.data, weaponsArraySchema, 'Invalid weapons data');
};

export const getSprays = async (): Promise<Spray[]> => {
    const response = await api.get<ValorantApiResponse<Spray[]>>('/sprays', {
        params: {
            language: 'pt-BR',
        },
    });

    if (!response.data?.data || !Array.isArray(response.data.data)) {
        throw new Error('Invalid API response: expected array of sprays');
    }

    return validateApiResponse(response.data.data, spraysArraySchema, 'Invalid sprays data');
};

export const getSkins = async (): Promise<WeaponSkin[]> => {
    const response = await api.get<ValorantApiResponse<WeaponSkin[]>>('/weapons/skins', {
        params: {
            language: 'pt-BR',
        },
    });

    if (!response.data?.data || !Array.isArray(response.data.data)) {
        throw new Error('Invalid API response: expected array of weapon skins');
    }

    return validateApiResponse(response.data.data, weaponSkinsArraySchema, 'Invalid weapon skins data');
};

export const getPlayerCards = async (): Promise<PlayerCard[]> => {
    const response = await api.get<ValorantApiResponse<PlayerCard[]>>('/playercards', {
        params: {
            language: 'pt-BR',
        },
    });

    if (!response.data?.data || !Array.isArray(response.data.data)) {
        throw new Error('Invalid API response: expected array of player cards');
    }

    return validateApiResponse(response.data.data, playerCardsArraySchema, 'Invalid player cards data');
};

export const getCompetitiveTiers = async (): Promise<CompetitiveSeasonData[]> => {
    const response = await api.get<ValorantApiResponse<CompetitiveSeasonData[]>>('/competitivetiers', {
        params: {
            language: 'pt-BR',
        },
    });

    if (!response.data?.data || !Array.isArray(response.data.data)) {
        throw new Error('Invalid API response: expected array of competitive tiers');
    }

    return validateApiResponse(response.data.data, competitiveSeasonDataArraySchema, 'Invalid competitive tiers data');
};

export const getBundles = async (): Promise<Bundle[]> => {
    const response = await api.get<ValorantApiResponse<Bundle[]>>('/bundles', {
        params: {
            language: 'pt-BR',
        },
    });

    if (!response.data?.data || !Array.isArray(response.data.data)) {
        throw new Error('Invalid API response: expected array of bundles');
    }

    return validateApiResponse(response.data.data, bundlesArraySchema, 'Invalid bundles data');
};

export default api;
