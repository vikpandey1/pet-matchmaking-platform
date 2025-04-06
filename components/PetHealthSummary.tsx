'use client';

interface PetHealthSummaryProps {
  petName: string;
  healthScore: number;
  lastCheckup: string;
  vaccinations: string[];
  alerts: string[];
}

export default function PetHealthSummary({
  petName,
  healthScore,
  lastCheckup,
  vaccinations,
  alerts,
}: PetHealthSummaryProps) {
  const getHealthScoreColor = (score: number) => {
    if (score >= 80) return 'text-success-600';
    if (score >= 60) return 'text-warning-600';
    return 'text-error-600';
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-neutral-600">Health Score</p>
          <p className={`text-2xl font-bold mt-1 ${getHealthScoreColor(healthScore)}`}>
            {healthScore}/100
          </p>
        </div>
        <div className="h-16 w-16 rounded-full flex items-center justify-center border-4 border-success-500">
          <div className={`text-lg font-medium ${getHealthScoreColor(healthScore)}`}>
            {healthScore}
          </div>
        </div>
      </div>
      
      <div>
        <p className="text-sm text-neutral-600">Last Checkup</p>
        <p className="text-sm mt-1">
          {new Date(lastCheckup).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>
      </div>
      
      <div>
        <p className="text-sm text-neutral-600">Vaccinations</p>
        <div className="flex flex-wrap mt-1 gap-1">
          {vaccinations.map((vaccination, index) => (
            <span
              key={index}
              className="inline-block bg-primary-50 text-primary-700 rounded-full px-2 py-1 text-xs"
            >
              {vaccination}
            </span>
          ))}
        </div>
      </div>
      
      {alerts.length > 0 && (
        <div>
          <p className="text-sm text-neutral-600">Alerts</p>
          <div className="mt-1 space-y-2">
            {alerts.map((alert, index) => (
              <div key={index} className="bg-warning-50 border-l-4 border-warning-500 p-2 text-xs text-warning-800">
                {alert}
              </div>
            ))}
          </div>
        </div>
      )}
      
      <button className="btn btn-outline w-full mt-2">
        View Full Health Report
      </button>
    </div>
  );
} 