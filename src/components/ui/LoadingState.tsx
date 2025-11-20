interface LoadingStateProps {
    message?: string;
}

const LoadingState = ({ message = 'CARREGANDO...' }: LoadingStateProps) => (
    <div className="min-h-screen flex items-center justify-center bg-valorant-dark">
        <div className="text-valorant-red text-2xl font-heading animate-pulse tracking-widest text-center px-4">
            {message}
        </div>
    </div>
);

export default LoadingState;

