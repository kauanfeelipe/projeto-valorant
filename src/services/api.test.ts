import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock do axios usando vi.hoisted para garantir que seja executado antes
const mockGet = vi.hoisted(() => vi.fn());
const mockInterceptorsUse = vi.hoisted(() => vi.fn());

const mockAxiosInstance = vi.hoisted(() => ({
  get: mockGet,
  interceptors: {
    response: {
      use: mockInterceptorsUse,
    },
  },
}));

vi.mock('axios', () => {
  return {
    default: {
      create: vi.fn(() => mockAxiosInstance),
    },
    AxiosError: class AxiosError extends Error {
      response?: unknown;
      request?: unknown;
    },
  };
});

// Importar após o mock
import { getAgents } from './api';

describe('API Services', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getAgents', () => {
    it('deve retornar array de agentes válidos', async () => {
      const mockAgents = [
        {
          uuid: '123e4567-e89b-12d3-a456-426614174000',
          displayName: 'Jett',
          description: 'Test agent',
          developerName: 'Jett',
          characterTags: null,
          displayIcon: 'icon.png',
          displayIconSmall: 'icon-small.png',
          bustPortrait: null,
          fullPortrait: null,
          fullPortraitV2: null,
          killfeedPortrait: 'killfeed.png',
          background: null,
          backgroundGradientColors: ['#000000'],
          assetPath: '/agents/jett',
          isFullPortraitRightFacing: false,
          isPlayableCharacter: true,
          isAvailableForTest: false,
          isBaseContent: true,
          role: {
            uuid: 'dbe87557-9cbd-4031-9a76-9c16a9b8e4b1', 
            displayName: 'Duelist',
            description: 'Duelist role',
            displayIcon: 'role-icon.png',
            assetPath: '/roles/duelist',
          },
          abilities: [],
          voiceLine: null,
        },
      ];

      mockGet.mockResolvedValue({
        data: { data: mockAgents },
      });

      const result = await getAgents();

      expect(result).toBeDefined();
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBe(1);
      expect(result[0].displayName).toBe('Jett');
    });

    it('deve lançar erro quando resposta é inválida', async () => {
      mockGet.mockResolvedValue({
        data: { data: null },
      });

      await expect(getAgents()).rejects.toThrow('Invalid API response');
    });

    it('deve lançar erro quando resposta não é um array', async () => {
      mockGet.mockResolvedValue({
        data: { data: 'not an array' },
      });

      await expect(getAgents()).rejects.toThrow();
    });
  });

  describe('getWeapons', () => {
    it('deve retornar array de armas válidas mesmo com dados parciais', async () => {
      // Importar getWeapons dinamicamente ou garantir que está disponível
      const { getWeapons } = await import('./api');

      const mockWeapons = [
        {
          uuid: 'weapon-uuid',
          displayName: 'Vandal',
          category: 'Rifle',
          displayIcon: 'icon.png',
          killStreamIcon: 'kill-icon.png',
          assetPath: '/weapons/vandal',
          weaponStats: null, 
          shopData: null,    
          skins: [],         
        },
      ];

      mockGet.mockResolvedValue({
        data: { data: mockWeapons },
      });

      const result = await getWeapons();

      expect(result).toBeDefined();
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBe(1);
      expect(result[0].displayName).toBe('Vandal');
    });
  });
});

