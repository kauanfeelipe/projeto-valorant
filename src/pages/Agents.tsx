import AgentSelector from '../components/features/AgentSelector';
import LoadingState from '../components/ui/LoadingState';
import ErrorState from '../components/ui/ErrorState';
import { Link } from 'react-router-dom';
import { useAgents } from '../hooks/useValorantData';

const Agents = () => {
    const { data: agents, isLoading, error } = useAgents();

    if (isLoading) {
        return <LoadingState message="CARREGANDO AGENTES..." />;
    }

    if (error) {
        return (
            <ErrorState
                message="Erro ao carregar agentes. Tente novamente mais tarde."
                action={<Link to="/" className="text-white hover:text-valorant-red underline">Voltar ao início</Link>}
            />
        );
    }

    if (!agents?.length) {
        return (
            <ErrorState
                message="Nenhum agente disponível no momento."
                action={<Link to="/" className="text-white hover:text-valorant-red underline">Voltar ao início</Link>}
            />
        );
    }

    return (
        <div className="min-h-screen bg-valorant-dark py-12 px-4 sm:px-6 lg:px-8 flex flex-col">
            <div className="mb-8 text-center">
                <h1 className="text-4xl md:text-6xl font-heading font-bold text-white mb-2">AGENTES</h1>
                <p className="text-gray-400 font-mono tracking-widest">SELECIONE SEU PERSONAGEM</p>
            </div>

            <div className="flex-1">
                {agents && <AgentSelector agents={agents} />}
            </div>
        </div>
    );
};

export default Agents;
