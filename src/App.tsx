import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import { Suspense, lazy, useMemo } from 'react';
import ErrorBoundary from './components/ui/ErrorBoundary';

const Home = lazy(() => import('./pages/Home'));
const Agents = lazy(() => import('./pages/Agents'));
const AgentDetails = lazy(() => import('./pages/AgentDetails'));
const Maps = lazy(() => import('./pages/Maps'));
const Weapons = lazy(() => import('./pages/Weapons'));
const Sprays = lazy(() => import('./pages/Sprays'));
const Skins = lazy(() => import('./pages/Skins'));
const PlayerCards = lazy(() => import('./pages/PlayerCards'));
const Ranks = lazy(() => import('./pages/Ranks'));
const Bundles = lazy(() => import('./pages/Bundles'));

function App() {
  // Criar QueryClient uma única vez usando useMemo
  const queryClient = useMemo(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60 * 60,
            refetchOnWindowFocus: false,
            retry: 1, // Tentar apenas 1 vez em caso de erro
          },
        },
      }),
    []
  );

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <MainLayout>
          <ErrorBoundary queryClient={queryClient}>
            <Suspense fallback={
              <div className="flex items-center justify-center min-h-screen bg-valorant-dark">
                <div className="w-16 h-16 border-4 border-valorant-red border-t-transparent rounded-full animate-spin"></div>
              </div>
            }>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/agents" element={<Agents />} />
                <Route path="/agents/:uuid" element={<AgentDetails />} />
                <Route path="/maps" element={<Maps />} />
                <Route path="/weapons" element={<Weapons />} />
                <Route path="/sprays" element={<Sprays />} />
                <Route path="/skins" element={<Skins />} />
                <Route path="/playercards" element={<PlayerCards />} />
                <Route path="/ranks" element={<Ranks />} />
                <Route path="/bundles" element={<Bundles />} />
                <Route path="*" element={<Home />} />
              </Routes>
            </Suspense>
          </ErrorBoundary>
        </MainLayout>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
