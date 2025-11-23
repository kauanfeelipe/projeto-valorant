import { z } from 'zod';
import type { Agent, ValorantMap, Weapon, Spray, WeaponSkin, PlayerCard, CompetitiveSeasonData, Bundle } from './api';

const uuidSchema = z.string();

const roleSchema = z.object({
    uuid: z.string(),
    displayName: z.string(),
    description: z.string(),
    displayIcon: z.string(),
    assetPath: z.string(),
}).passthrough().nullable();

const abilitySchema = z.object({
    slot: z.string(),
    displayName: z.string(),
    description: z.string(),
    displayIcon: z.string().nullable(),
}).passthrough();

const voiceLineSchema = z.object({
    minDuration: z.number().optional(),
    maxDuration: z.number().optional(),
    mediaList: z.array(z.object({
        id: z.number(),
        wwise: z.string(),
        wave: z.string(),
    })).optional(),
}).nullable();

export const agentSchema: z.ZodType<Agent> = z.object({
    uuid: uuidSchema,
    displayName: z.string(),
    description: z.string(),
    developerName: z.string(),
    characterTags: z.array(z.string()).nullable().optional(),
    displayIcon: z.string().nullable().optional(),
    displayIconSmall: z.string(),
    bustPortrait: z.string().nullable().optional(),
    fullPortrait: z.string().nullable().optional(),
    fullPortraitV2: z.string().nullable().optional(),
    killfeedPortrait: z.string(),
    background: z.string().nullable().optional(),
    backgroundGradientColors: z.array(z.string()).optional(),
    assetPath: z.string(),
    isFullPortraitRightFacing: z.boolean().optional(),
    isPlayableCharacter: z.boolean().optional(),
    isAvailableForTest: z.boolean().optional(),
    isBaseContent: z.boolean().optional(),
    role: roleSchema,
    abilities: z.array(abilitySchema).optional(),
    voiceLine: voiceLineSchema,
}).passthrough();

export const agentsArraySchema = z.array(agentSchema);

export const mapSchema: z.ZodType<ValorantMap> = z.object({
    uuid: uuidSchema,
    displayName: z.string(),
    coordinates: z.string().nullable().optional(),
    displayIcon: z.string().nullable().optional(),
    listViewIcon: z.string().nullable().optional(),
    splash: z.string(),
    assetPath: z.string(),
    mapUrl: z.string().optional(),
    xMultiplier: z.number().optional(),
    yMultiplier: z.number().optional(),
    xScalarToAdd: z.number().optional(),
    yScalarToAdd: z.number().optional(),
    callouts: z.array(z.any()).nullable().optional(),
}).passthrough();

export const mapsArraySchema = z.array(mapSchema);

export const weaponSchema: z.ZodType<Weapon> = z.object({
    uuid: uuidSchema,
    displayName: z.string(),
    category: z.string(),
    displayIcon: z.string().nullable().optional(),
    killStreamIcon: z.string(),
    assetPath: z.string(),
    weaponStats: z.any().nullable(),
    shopData: z.any().nullable(),
    skins: z.array(z.any()),
}).passthrough();

export const weaponsArraySchema = z.array(weaponSchema);

const sprayLevelSchema = z.object({
    uuid: z.string(),
    sprayLevel: z.number().optional(),
    displayName: z.string().optional(),
    displayIcon: z.string().nullable().optional(),
    assetPath: z.string().optional(),
}).passthrough();

export const spraySchema: z.ZodType<Spray> = z.object({
    uuid: uuidSchema,
    displayName: z.string(),
    category: z.string().nullable(),
    themeUuid: z.string().nullable(),
    displayIcon: z.string().nullable().optional(),
    fullIcon: z.string().nullable(),
    fullTransparentIcon: z.string().nullable(),
    animationPng: z.string().nullable(),
    animationGif: z.string().nullable(),
    assetPath: z.string(),
    levels: z.array(sprayLevelSchema),
    isNullSpray: z.boolean(),
}).passthrough();

export const spraysArraySchema = z.array(spraySchema);

export const weaponSkinSchema: z.ZodType<WeaponSkin> = z.object({
    uuid: uuidSchema,
    displayName: z.string(),
    themeUuid: z.string().nullable().optional(),
    contentTierUuid: z.string().nullable().optional(),
    displayIcon: z.string().nullable().optional(),
    wallpaper: z.string().nullable(),
    assetPath: z.string(),
    chromas: z.array(z.object({
        uuid: z.string(),
        displayName: z.string(),
        displayIcon: z.string().nullable(),
        fullRender: z.string(),
        swatch: z.string().nullable(),
        streamedVideo: z.string().nullable(),
        assetPath: z.string(),
    }).passthrough()),
    levels: z.array(z.object({
        uuid: z.string(),
        displayName: z.string(),
        levelItem: z.string().nullable(),
        displayIcon: z.string().nullable(),
        streamedVideo: z.string().nullable(),
        assetPath: z.string(),
    }).passthrough()),
}).passthrough();

export const weaponSkinsArraySchema = z.array(weaponSkinSchema);

export const playerCardSchema: z.ZodType<PlayerCard> = z.object({
    uuid: uuidSchema,
    displayName: z.string(),
    isHiddenIfNotOwned: z.boolean().optional(),
    displayIcon: z.string().nullable().optional(),
    smallArt: z.string().nullable().optional(),
    wideArt: z.string().nullable().optional(),
    largeArt: z.string().nullable().optional(),
    assetPath: z.string().optional(),
}).passthrough();

export const playerCardsArraySchema = z.array(playerCardSchema);

const competitiveTierSchema = z.object({
    tier: z.number(),
    tierName: z.string(),
    division: z.string(),
    divisionName: z.string(),
    color: z.string(),
    backgroundColor: z.string(),
    smallIcon: z.string().nullable(),
    largeIcon: z.string().nullable(),
    rankTriangleDownIcon: z.string().nullable(),
    rankTriangleUpIcon: z.string().nullable(),
});

export const competitiveSeasonDataSchema: z.ZodType<CompetitiveSeasonData> = z.object({
    uuid: uuidSchema,
    assetObjectName: z.string(),
    tiers: z.array(competitiveTierSchema.passthrough()),
    assetPath: z.string(),
}).passthrough();

export const competitiveSeasonDataArraySchema = z.array(competitiveSeasonDataSchema);

export const bundleSchema: z.ZodType<Bundle> = z.object({
    uuid: uuidSchema,
    displayName: z.string(),
    displayNameSubText: z.string().nullable(),
    description: z.string(),
    extraDescription: z.string().nullable(),
    promoDescription: z.string().nullable(),
    useAdditionalContext: z.boolean(),
    displayIcon: z.string().nullable().optional(),
    displayIcon2: z.string(),
    verticalPromoImage: z.string().nullable(),
    assetPath: z.string(),
}).passthrough();

export const bundlesArraySchema = z.array(bundleSchema);

export function validateApiResponse<T>(
    data: unknown,
    schema: z.ZodType<T>,
    errorMessage = 'Invalid API response'
): T {
    const result = schema.safeParse(data);
    if (!result.success) {
        if (import.meta.env.DEV) {
            console.warn(`${errorMessage}:`, result.error.format());
            console.warn('Dados recebidos:', data);
        }

        console.warn('Validação Zod falhou, retornando dados sem validação estrita');
        return data as T;
    }
    return result.data;
}
