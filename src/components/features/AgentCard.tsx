import { motion } from 'framer-motion';
import type { Agent } from '../../services/api';
import { Link } from 'react-router-dom';

interface AgentCardProps {
    agent: Agent;
    index: number;
}

const AgentCard = ({ agent, index }: AgentCardProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group relative overflow-hidden rounded-sm bg-valorant-dark border border-white/10 hover:border-valorant-red transition-colors duration-300"
        >
            <Link to={`/agents/${agent.uuid}`} className="block">
                <div className="aspect-[3/4] relative overflow-hidden">
                    <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{
                            background: `linear-gradient(180deg, #${agent.backgroundGradientColors[0]}00 0%, #${agent.backgroundGradientColors[1]} 100%)`
                        }}
                    />

                    <img
                        src={agent.fullPortrait || agent.displayIcon}
                        alt={agent.displayName}
                        className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                    />

                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-transparent">
                        <h3 className="text-3xl font-heading text-white uppercase italic transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                            {agent.displayName}
                        </h3>
                        <p className="text-gray-400 text-sm font-medium mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                            {agent.role?.displayName}
                        </p>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
};

export default AgentCard;
