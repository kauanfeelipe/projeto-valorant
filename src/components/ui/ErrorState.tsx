import type { ReactNode } from 'react';

interface ErrorStateProps {
    message: string;
    action?: ReactNode;
}

const ErrorState = ({ message, action }: ErrorStateProps) => (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-valorant-dark text-center px-4">
        <div className="text-red-500 text-xl font-heading tracking-widest">
            {message}
        </div>
        {action}
    </div>
);

export default ErrorState;

