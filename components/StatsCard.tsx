'use client';

interface StatsCardProps {
  title: string;
  value: number;
  change: string;
  changeType: 'increase' | 'decrease' | 'neutral';
  icon: string;
}

export default function StatsCard({ title, value, change, changeType, icon }: StatsCardProps) {
  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-neutral-600">{title}</p>
          <p className="text-2xl font-bold mt-1">{value}</p>
        </div>
        <div className="h-12 w-12 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 text-xl">
          {icon}
        </div>
      </div>
      
      <div className="mt-2 flex items-center text-sm">
        <span
          className={`mr-1 ${
            changeType === 'increase'
              ? 'text-success-600'
              : changeType === 'decrease'
              ? 'text-error-500'
              : 'text-neutral-500'
          }`}
        >
          {changeType === 'increase'
            ? '↑'
            : changeType === 'decrease'
            ? '↓'
            : '→'}
        </span>
        <span
          className={
            changeType === 'increase'
              ? 'text-success-600'
              : changeType === 'decrease'
              ? 'text-error-500'
              : 'text-neutral-500'
          }
        >
          {change} from last month
        </span>
      </div>
    </div>
  );
} 