import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import ErrorBoundary from './ErrorBoundary';

// Componente que lança erro para testar ErrorBoundary
const ThrowError = ({ shouldThrow }: { shouldThrow: boolean }) => {
  if (shouldThrow) {
    throw new Error('Test error');
  }
  return <div>Component working</div>;
};

describe('ErrorBoundary', () => {
  let consoleErrorSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    // Suprimir console.error durante os testes
    consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    // Suprimir erro do React sobre ErrorBoundary
    vi.spyOn(console, 'warn').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
    vi.restoreAllMocks();
  });

  it('deve renderizar children quando não há erro', () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={false} />
      </ErrorBoundary>
    );

    expect(screen.getByText('Component working')).toBeInTheDocument();
  });

  it('deve capturar erro e exibir fallback UI', () => {
    // Para testar ErrorBoundary, precisamos usar uma abordagem diferente
    // pois ErrorBoundary só captura erros durante renderização inicial
    const ErrorComponent = () => {
      throw new Error('Test error');
    };

    render(
      <ErrorBoundary>
        <ErrorComponent />
      </ErrorBoundary>
    );

    // ErrorBoundary deve capturar e exibir fallback
    expect(screen.getByText(/Algo inesperado ocorreu/i)).toBeInTheDocument();
    expect(screen.getByText(/Tentar novamente/i)).toBeInTheDocument();
  });
});

