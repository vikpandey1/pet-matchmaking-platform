'use client';

interface Appointment {
  id: string;
  title: string;
  date: Date;
  status: 'scheduled' | 'confirmed' | 'cancelled' | 'completed';
  location: string;
}

interface AppointmentListProps {
  appointments: Appointment[];
}

export default function AppointmentList({ appointments }: AppointmentListProps) {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    }).format(date);
  };

  const getStatusColor = (status: Appointment['status']) => {
    switch (status) {
      case 'scheduled':
        return 'bg-warning-100 text-warning-800';
      case 'confirmed':
        return 'bg-success-100 text-success-800';
      case 'cancelled':
        return 'bg-error-100 text-error-800';
      case 'completed':
        return 'bg-neutral-100 text-neutral-800';
      default:
        return 'bg-neutral-100 text-neutral-800';
    }
  };

  return (
    <div className="space-y-4">
      {appointments.length === 0 ? (
        <p className="text-center text-neutral-500 py-4">No upcoming appointments</p>
      ) : (
        appointments.map((appointment) => (
          <div key={appointment.id} className="flex items-center p-3 bg-neutral-50 rounded-lg">
            <div className="flex-shrink-0 w-14 h-14 bg-white rounded-lg flex flex-col items-center justify-center border border-neutral-200">
              <div className="text-sm font-medium">
                {new Date(appointment.date).toLocaleDateString('en-US', { day: '2-digit' })}
              </div>
              <div className="text-xs text-neutral-600">
                {new Date(appointment.date).toLocaleDateString('en-US', { month: 'short' })}
              </div>
            </div>
            
            <div className="ml-4 flex-1">
              <h4 className="text-sm font-medium">{appointment.title}</h4>
              <div className="flex flex-col sm:flex-row sm:items-center text-xs text-neutral-600 mt-1">
                <span>{formatDate(appointment.date)}</span>
                <span className="hidden sm:inline mx-2">•</span>
                <span>{appointment.location}</span>
              </div>
            </div>
            
            <div className="ml-4 flex-shrink-0">
              <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
              </span>
            </div>
          </div>
        ))
      )}
      
      <button className="btn btn-outline w-full mt-4">
        View All Appointments
      </button>
    </div>
  );
} 