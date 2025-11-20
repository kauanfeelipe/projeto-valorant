import axios from 'axios';

const api = axios.create({
    baseURL: 'https://valorant-api.com/v1',
});

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

export interface Map {
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
    skins: {
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
    }[];
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
    const response = await api.get<{ data: Map[] }>('/maps', {
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

export default api;
