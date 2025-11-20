import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import clsx from 'clsx';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    const links = [
        { name: 'INÍCIO', path: '/' },
        { name: 'AGENTES', path: '/agents' },
        { name: 'MAPAS', path: '/maps' },
        { name: 'ARMAS', path: '/weapons' },
    ];

    return (
        <nav className="bg-valorant-dark border-b border-white/10 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <div className="flex-shrink-0">
                        <Link to="/" className="flex items-center gap-2">
                            <div className="w-10 h-10 bg-valorant-red flex items-center justify-center rounded-sm">
                                <span className="text-white font-heading text-xl font-bold">V</span>
                            </div>
                            <span className="text-white font-heading text-2xl tracking-wider hidden sm:block">VALORANT</span>
                        </Link>
                    </div>

                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-8">
                            <span className="text-xs font-mono tracking-[0.4em] text-valorant-red uppercase">
                                © Dev Kauan Felipe
                            </span>
                            {links.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    className={clsx(
                                        "px-3 py-2 rounded-md text-sm font-medium font-heading tracking-widest transition-colors duration-200 relative group",
                                        location.pathname === link.path
                                            ? "text-valorant-red"
                                            : "text-gray-300 hover:text-white"
                                    )}
                                >
                                    {link.name}
                                    {location.pathname === link.path && (
                                        <motion.div
                                            layoutId="navbar-indicator"
                                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-valorant-red"
                                            initial={false}
                                            transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                        />
                                    )}
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-gray-300 hover:text-white p-2"
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="md:hidden bg-valorant-dark border-b border-white/10"
                >
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <div className="px-3 py-2 text-xs font-mono tracking-[0.3em] text-valorant-red uppercase">
                            © Dev Kauan Felipe
                        </div>
                        {links.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                onClick={() => setIsOpen(false)}
                                className={clsx(
                                    "block px-3 py-2 rounded-md text-base font-medium font-heading tracking-widest",
                                    location.pathname === link.path
                                        ? "text-valorant-red bg-white/5"
                                        : "text-gray-300 hover:text-white hover:bg-white/5"
                                )}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>
                </motion.div>
            )}
        </nav>
    );
};

export default Navbar;
