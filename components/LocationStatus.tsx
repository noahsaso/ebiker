import type { StatusType } from '@/types/station';

interface LocationStatusProps {
  status: string;
  type: StatusType;
}

export default function LocationStatus({ status, type }: LocationStatusProps) {
  const statusIconClasses = {
    waiting: 'w-3 h-3 rounded-full bg-yellow-400 animate-pulse',
    loading: 'w-3 h-3 rounded-full bg-blue-500 animate-pulse',
    success: 'w-3 h-3 rounded-full bg-green-500',
    error: 'w-3 h-3 rounded-full bg-red-500',
  };

  return (
    <div className="flex items-center gap-2.5 mb-5 p-4 bg-gray-50 rounded-lg">
      <div className={statusIconClasses[type]} />
      <span className="flex-1">{status}</span>
    </div>
  );
}

