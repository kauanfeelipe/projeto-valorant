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
                    <a
                        href="https://kauanfeelipe.github.io/web-portifolio/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="uppercase tracking-[0.2em] text-sm font-heading font-bold text-valorant-red drop-shadow-sm hover:underline underline-offset-4 transition-all duration-200 inline-block"
                    >
                        Dev Kauan
                    </a>
                </div>
            </footer>
        </div>
    );
};

export default MainLayout;
