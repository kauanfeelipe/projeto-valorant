import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';
import { QueryClient } from '@tanstack/react-query';

type ErrorBoundaryState = {
  hasError: boolean;
  error: Error | null;
};

type ErrorBoundaryProps = {
  children: ReactNode;
  queryClient?: QueryClient;
  onReset?: () => void;
};

export default class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Erro capturado pelo ErrorBoundary:', error, info);
    
    // Log adicional para debugging
    if (process.env.NODE_ENV === 'development') {
      console.error('Error details:', {
        message: error.message,
        stack: error.stack,
        componentStack: info.componentStack,
      });
    }
  }

  handleReset = () => {
    const { queryClient, onReset } = this.props;
    
    // Invalidar todas as queries do React Query para forçar refetch
    if (queryClient) {
      queryClient.invalidateQueries();
    }
    
    // Callback customizado se fornecido
    if (onReset) {
      onReset();
    }
    
    // Resetar estado do ErrorBoundary
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-valorant-dark px-4 text-center space-y-4">
          <p className="text-2xl font-heading tracking-wide text-white">
            Algo inesperado ocorreu ao carregar esta seção.
          </p>
          {this.state.error && process.env.NODE_ENV === 'development' && (
            <p className="text-sm text-gray-400 font-mono max-w-2xl break-words">
              {this.state.error.message}
            </p>
          )}
          <button
            type="button"
            onClick={this.handleReset}
            className="px-6 py-3 bg-valorant-red text-white font-heading tracking-widest uppercase rounded-md shadow-md hover:bg-red-500 transition-colors"
          >
            Tentar novamente
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

