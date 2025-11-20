import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Users, Map, Crosshair, Code2, Database, Zap, Shield, Target, Activity } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

const PARTICLE_COUNT = 20;

type FeatureCard = {
    title: string;
    path: string;
    icon: LucideIcon;
    desc: string;
    color: string;
    borderColor: string;
    stats: string[];
};

const FEATURE_CARDS: FeatureCard[] = [
    {
        title: 'AGENTES',
        path: '/agents',
        icon: Users,
        desc: 'Perfis completos com habilidades, lore e estatísticas de cada agente.',
        color: 'from-blue-500/20 to-purple-500/20',
        borderColor: 'hover:border-blue-500/50',
        stats: ['24+ Agentes', '4 Funções', 'Habilidades Únicas'],
    },
    {
        title: 'MAPAS',
        path: '/maps',
        icon: Map,
        desc: 'Visualização tática de todos os campos de batalha com coordenadas.',
        color: 'from-green-500/20 to-emerald-500/20',
        borderColor: 'hover:border-green-500/50',
        stats: ['10+ Mapas', 'Minimapas', 'Coordenadas'],
    },
    {
        title: 'ARSENAL',
        path: '/weapons',
        icon: Crosshair,
        desc: 'Análise detalhada de armas com estatísticas de dano e cadência.',
        color: 'from-red-500/20 to-orange-500/20',
        borderColor: 'hover:border-red-500/50',
        stats: ['20+ Armas', 'Stats Completas', 'Categorias'],
    },
];

type TechStat = {
    icon: LucideIcon;
    label: string;
    value: string;
};

const TECH_STATS: TechStat[] = [
    { icon: Shield, label: 'Agentes', value: '24+' },
    { icon: Target, label: 'Mapas', value: '10+' },
    { icon: Zap, label: 'Armas', value: '20+' },
    { icon: Database, label: 'API Calls', value: '∞' },
];

const getViewportDimensions = () => ({
    width: typeof window === 'undefined' ? 1440 : window.innerWidth,
    height: typeof window === 'undefined' ? 900 : window.innerHeight,
});

const Home = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const viewport = useMemo(getViewportDimensions, []);
    const particles = useMemo(
        () =>
            Array.from({ length: PARTICLE_COUNT }).map((_, index) => ({
                id: `particle-${index}`,
                initialX: Math.random() * viewport.width,
                initialY: Math.random() * viewport.height,
                duration: Math.random() * 10 + 10,
                delay: Math.random() * 5,
                targetY: Math.random() * viewport.height,
            })),
        [viewport],
    );

    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            setMousePosition({ x: event.clientX, y: event.clientY });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div className="min-h-screen bg-valorant-dark text-white font-sans overflow-hidden relative">
            <div className="fixed inset-0 z-0">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ff465508_1px,transparent_1px),linear-gradient(to_bottom,#ff465508_1px,transparent_1px)] bg-[size:40px_40px]" />
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:10px_10px]" />
                <div className="absolute inset-0 bg-gradient-to-b from-valorant-dark via-transparent to-valorant-dark" />
                <div className="absolute inset-0 bg-gradient-to-r from-valorant-dark/50 via-transparent to-valorant-dark/50" />
                <motion.div
                    className="absolute w-[800px] h-[800px] rounded-full opacity-15 blur-3xl pointer-events-none"
                    style={{
                        background: 'radial-gradient(circle, rgba(255,70,85,0.4) 0%, rgba(255,70,85,0.2) 40%, transparent 70%)',
                        left: mousePosition.x - 400,
                        top: mousePosition.y - 400,
                    }}
                    transition={{ type: 'spring', damping: 30, stiffness: 200 }}
                />
            </div>

            <section className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {particles.map((particle) => (
                        <motion.div
                            key={particle.id}
                            className="absolute w-1 h-1 bg-valorant-red rounded-full"
                            initial={{
                                x: particle.initialX,
                                y: particle.initialY,
                                opacity: 0,
                            }}
                            animate={{
                                y: [particle.initialY, particle.targetY],
                                opacity: [0, 1, 0],
                            }}
                            transition={{
                                duration: particle.duration,
                                repeat: Infinity,
                                delay: particle.delay,
                            }}
                        />
                    ))}
                </div>

                <div className="relative z-10 max-w-7xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                        className="mb-8"
                    >
                        <div className="inline-block relative">
                            <motion.div
                                className="absolute inset-0 text-7xl md:text-9xl font-heading font-bold uppercase text-valorant-red opacity-20 blur-sm"
                                animate={{ x: [-2, 2, -2], y: [-2, 2, -2] }}
                                transition={{ duration: 0.3, repeat: Infinity, repeatType: 'reverse' }}
                            >
                                VALORANT
                            </motion.div>
                            <h1 className="relative text-7xl md:text-9xl font-heading font-bold uppercase tracking-tighter leading-none">
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-white">
                                    VALORANT
                                </span>
                            </h1>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.3, duration: 0.8 }}
                            className="mt-4 flex items-center justify-center gap-3 text-valorant-red font-mono text-sm tracking-[0.3em]"
                        >
                            <div className="w-2 h-2 bg-valorant-red rounded-full animate-pulse" />
                            PROTOCOLO DE DADOS TÁTICO
                            <div className="w-2 h-2 bg-valorant-red rounded-full animate-pulse" />
                        </motion.div>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6, duration: 1 }}
                        className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto mb-12 leading-relaxed"
                    >
                        Sistema avançado de integração com a <span className="text-white font-bold">Valorant API</span>.
                        Explore agentes, mapas e arsenal em tempo real com visualização de dados de última geração.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.9, duration: 0.8 }}
                        className="flex flex-wrap items-center justify-center gap-4 mb-16"
                    >
                        <Link
                            to="/agents"
                            className="group relative px-8 py-4 bg-valorant-red text-white font-bold tracking-widest uppercase overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,70,85,0.6)]"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
                            <span className="relative flex items-center gap-2">
                                INICIAR PROTOCOLO
                                <ArrowRight size={20} />
                            </span>
                        </Link>

                        <a
                            href="https://valorant-api.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-8 py-4 border border-white/20 text-white font-bold tracking-widest uppercase hover:bg-white/5 hover:border-white/40 transition-all duration-300"
                        >
                            <span className="flex items-center gap-2">
                                <Database size={20} />
                                DOCUMENTAÇÃO API
                            </span>
                        </a>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.2, duration: 1 }}
                        className="max-w-5xl mx-auto"
                    >
                        <div className="relative bg-black/60 backdrop-blur-xl border border-white/10 rounded-lg overflow-hidden shadow-2xl">
                            <div className="flex items-center justify-between px-6 py-3 bg-gradient-to-r from-gray-900 to-black border-b border-white/10">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-red-500" />
                                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                                    <div className="w-3 h-3 rounded-full bg-green-500" />
                                </div>
                                <div className="flex items-center gap-2 text-xs text-gray-500 font-mono">
                                    <Code2 size={14} />
                                    <span>valorant-api-integration.ts</span>
                                </div>
                                <div className="flex items-center gap-2 text-xs text-green-400 font-mono">
                                    <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                                    CONNECTED
                                </div>
                            </div>

                            <div className="p-6 font-mono text-sm md:text-base overflow-x-auto">
                                <div className="space-y-3 text-gray-300">
                                    <div className="flex items-start gap-4">
                                        <span className="text-gray-600 select-none">01</span>
                                        <p>
                                            <span className="text-purple-400">import</span>{' '}
                                            <span className="text-blue-400">{'{ useQuery }'}</span>{' '}
                                            <span className="text-purple-400">from</span>{' '}
                                            <span className="text-green-400">'@tanstack/react-query'</span>;
                                        </p>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <span className="text-gray-600 select-none">02</span>
                                        <p>
                                            <span className="text-purple-400">import</span>{' '}
                                            <span className="text-blue-400">axios</span>{' '}
                                            <span className="text-purple-400">from</span>{' '}
                                            <span className="text-green-400">'axios'</span>;
                                        </p>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <span className="text-gray-600 select-none">04</span>
                                        <p>
                                            <span className="text-purple-400">const</span>{' '}
                                            <span className="text-blue-300">API_BASE</span> ={' '}
                                            <span className="text-green-400">'https://valorant-api.com/v1'</span>;
                                        </p>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <span className="text-gray-600 select-none">06</span>
                                        <p>
                                            <span className="text-purple-400">export const</span>{' '}
                                            <span className="text-yellow-300">getAgents</span> ={' '}
                                            <span className="text-purple-400">async</span> () {'=>'} {'{'}
                                        </p>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <span className="text-gray-600 select-none">07</span>
                                        <p className="pl-4">
                                            <span className="text-purple-400">const</span> response ={' '}
                                            <span className="text-purple-400">await</span> axios.
                                            <span className="text-yellow-300">get</span>
                                            <span className="text-gray-400">(</span>
                                            <span className="text-green-400">`$</span>
                                            <span className="text-green-400">{'{'}</span>
                                            <span className="text-blue-300">API_BASE</span>
                                            <span className="text-green-400">{'}'}</span>
                                            <span className="text-green-400">/agents`</span>
                                            <span className="text-gray-400">)</span>;
                                        </p>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <span className="text-gray-600 select-none">08</span>
                                        <p className="pl-4">
                                            <span className="text-purple-400">return</span> response.data.data;
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-6 pt-6 border-t border-white/10">
                                    <div className="flex items-center gap-2 mb-3 text-gray-500">
                                        <Activity size={14} />
                                        <span className="text-xs uppercase tracking-wider">Response Preview</span>
                                    </div>
                                    <div className="bg-black/40 border border-green-500/20 rounded p-4 space-y-2">
                                        <p className="text-green-400">{'{'}</p>
                                        <p className="pl-4 text-gray-400">
                                            <span className="text-blue-300">"status"</span>: <span className="text-yellow-300">200</span>,
                                        </p>
                                        <p className="pl-4 text-gray-400">
                                            <span className="text-blue-300">"data"</span>: [
                                        </p>
                                        <p className="pl-8 text-gray-400">
                                            {'{'} <span className="text-blue-300">"displayName"</span>: <span className="text-green-400">"Jett"</span>, <span className="text-blue-300">"role"</span>: <span className="text-green-400">"Duelist"</span> {'}'},
                                        </p>
                                        <p className="pl-8 text-gray-400">
                                            {'{'} <span className="text-blue-300">"displayName"</span>: <span className="text-green-400">"Sova"</span>, <span className="text-blue-300">"role"</span>: <span className="text-green-400">"Initiator"</span> {'}'}
                                        </p>
                                        <p className="pl-4 text-gray-400">]</p>
                                        <p className="text-green-400">{'}'}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                <motion.div className="absolute bottom-10 left-1/2 -translate-x-1/2">
                    <motion.div
                        animate={{ y: [0, 12, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="flex flex-col items-center gap-2"
                    >
                        <span className="text-xs text-gray-500 font-mono tracking-widest">SCROLL</span>
                        <div className="w-[1px] h-16 bg-gradient-to-b from-valorant-red via-valorant-red to-transparent" />
                    </motion.div>
                </motion.div>
            </section>

            <section className="relative py-32 px-4">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-20"
                    >
                        <h2 className="text-5xl md:text-6xl font-heading font-bold mb-4 uppercase">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-valorant-red to-white">
                                Explore o Arsenal
                            </span>
                        </h2>
                        <p className="text-gray-400 font-mono tracking-widest text-sm">
                            ACESSO COMPLETO AOS DADOS TÁTICOS
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {FEATURE_CARDS.map((feature, index) => (
                            <motion.div
                                key={feature.title}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.2, duration: 0.8 }}
                            >
                                <Link to={feature.path} className="group block h-full">
                                    <div className={`relative h-full bg-black/40 backdrop-blur-sm border border-white/10 ${feature.borderColor} transition-all duration-500 overflow-hidden p-8`}>
                                        <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                                        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:20px_20px]" />

                                        <div className="relative z-10">
                                            <div className="mb-6 relative">
                                                <div className="absolute inset-0 bg-valorant-red/20 blur-2xl rounded-full scale-0 group-hover:scale-100 transition-transform duration-500" />
                                                <feature.icon className="relative w-16 h-16 text-white group-hover:text-valorant-red transition-colors duration-300" />
                                            </div>

                                            <h3 className="text-3xl font-heading font-bold mb-4 uppercase group-hover:text-valorant-red transition-colors duration-300">
                                                {feature.title}
                                            </h3>

                                            <p className="text-gray-400 mb-6 leading-relaxed">
                                                {feature.desc}
                                            </p>

                                            <div className="space-y-2 mb-6">
                                                {feature.stats.map((stat, statIndex) => (
                                                    <div key={statIndex} className="flex items-center gap-2 text-sm font-mono text-gray-500">
                                                        <div className="w-1 h-1 bg-valorant-red rounded-full" />
                                                        {stat}
                                                    </div>
                                                ))}
                                            </div>

                                            <div className="flex items-center gap-2 text-sm font-bold tracking-widest uppercase text-white/50 group-hover:text-white group-hover:gap-4 transition-all duration-300">
                                                ACESSAR
                                                <ArrowRight size={16} />
                                            </div>
                                        </div>

                                        <div className="absolute top-0 right-0 w-20 h-20 border-t-2 border-r-2 border-valorant-red/0 group-hover:border-valorant-red/50 transition-colors duration-500" />
                                        <div className="absolute bottom-0 left-0 w-20 h-20 border-b-2 border-l-2 border-valorant-red/0 group-hover:border-valorant-red/50 transition-colors duration-500" />
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="relative py-20 px-4 border-t border-white/10">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {TECH_STATS.map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                                className="text-center"
                            >
                                <stat.icon className="w-8 h-8 mx-auto mb-3 text-valorant-red" />
                                <div className="text-4xl font-heading font-bold text-white mb-2">{stat.value}</div>
                                <div className="text-sm text-gray-500 font-mono tracking-widest uppercase">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;

