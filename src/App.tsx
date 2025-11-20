import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import { Suspense, lazy } from 'react';

const Home = lazy(() => import('./pages/Home'));
const Agents = lazy(() => import('./pages/Agents'));
const AgentDetails = lazy(() => import('./pages/AgentDetails'));
const Maps = lazy(() => import('./pages/Maps'));
const Weapons = lazy(() => import('./pages/Weapons'));
const Sprays = lazy(() => import('./pages/Sprays'));
const Skins = lazy(() => import('./pages/Skins'));
const PlayerCards = lazy(() => import('./pages/PlayerCards'));


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 60,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router basename={import.meta.env.BASE_URL}>
        <MainLayout>
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

            </Routes>
          </Suspense>
        </MainLayout>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
