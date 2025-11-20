import type { ReactNode } from 'react';
import Navbar from './Navbar';

interface MainLayoutProps {
    children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
    return (
        <div className="min-h-screen bg-valorant-dark text-white flex flex-col">
            <Navbar />
            <main className="flex-grow">
                {children}
            </main>
            <footer className="bg-black py-8 border-t border-white/10">
                <div className="max-w-7xl mx-auto px-4 text-center text-gray-500 text-sm space-y-2">
                    <p>&copy; {new Date().getFullYear()} Portfólio Valorant. Não afiliado à Riot Games.</p>
                    <p className="uppercase tracking-[0.4em] text-xs text-valorant-red">Desenvolvido por Dev Kauan Felipe</p>
                </div>
            </footer>
        </div>
    );
};

export default MainLayout;
