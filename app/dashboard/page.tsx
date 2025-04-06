import StatsCard from '@/components/StatsCard';
import MatchSuggestionCard from '@/components/MatchSuggestionCard';
import AppointmentList from '@/components/AppointmentList';
import PetHealthSummary from '@/components/PetHealthSummary';

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Active Pets"
          value={3}
          change="+1"
          changeType="increase"
          icon="🐾"
        />
        <StatsCard
          title="Active Matches"
          value={5}
          change="+2"
          changeType="increase"
          icon="❤️"
        />
        <StatsCard
          title="Upcoming Appointments"
          value={2}
          change="0"
          changeType="neutral"
          icon="📅"
        />
        <StatsCard
          title="New Messages"
          value={8}
          change="+3"
          changeType="increase"
          icon="💬"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <div className="card">
            <h2 className="text-xl font-display font-bold mb-4">Latest Match Suggestions</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <MatchSuggestionCard
                petName="Max"
                breed="Golden Retriever"
                age={3}
                matchScore={95}
                imageUrl="/placeholder-dog-1.jpg"
              />
              <MatchSuggestionCard
                petName="Luna"
                breed="Border Collie"
                age={2}
                matchScore={87}
                imageUrl="/placeholder-dog-2.jpg"
              />
              <MatchSuggestionCard
                petName="Rocky"
                breed="German Shepherd"
                age={4}
                matchScore={82}
                imageUrl="/placeholder-dog-3.jpg"
              />
              <MatchSuggestionCard
                petName="Bella"
                breed="Labrador Retriever"
                age={1}
                matchScore={78}
                imageUrl="/placeholder-dog-4.jpg"
              />
            </div>
          </div>
          
          <div className="card">
            <h2 className="text-xl font-display font-bold mb-4">Upcoming Appointments</h2>
            <AppointmentList
              appointments={[
                {
                  id: '1',
                  title: 'Vet Checkup - Max',
                  date: new Date('2023-09-15T10:00:00'),
                  status: 'confirmed',
                  location: 'Happy Pets Clinic',
                },
                {
                  id: '2',
                  title: 'Pet Matchup - Luna & Rocky',
                  date: new Date('2023-09-18T14:30:00'),
                  status: 'scheduled',
                  location: 'Central Park',
                },
              ]}
            />
          </div>
        </div>
        
        <div className="space-y-6">
          <div className="card">
            <h2 className="text-xl font-display font-bold mb-4">Max's Health Summary</h2>
            <PetHealthSummary
              petName="Max"
              healthScore={85}
              lastCheckup="2023-08-10"
              vaccinations={['Rabies', 'DHPP', 'Bordetella']}
              alerts={['Upcoming annual checkup in 3 weeks']}
            />
          </div>
          
          <div className="card bg-primary-50 border border-primary-100">
            <h2 className="text-xl font-display font-bold mb-4 text-primary-700">Upgrade to Gold</h2>
            <p className="text-sm text-primary-700 mb-4">
              Unlock premium features including priority matchmaking, health analytics, and concierge services.
            </p>
            <ul className="text-sm text-primary-700 space-y-2 mb-4">
              <li className="flex items-center">
                <span className="mr-2">✓</span>
                <span>AI-powered health recommendations</span>
              </li>
              <li className="flex items-center">
                <span className="mr-2">✓</span>
                <span>Early access to top matches</span>
              </li>
              <li className="flex items-center">
                <span className="mr-2">✓</span>
                <span>Unlimited messaging</span>
              </li>
            </ul>
            <button className="btn btn-primary w-full">
              Upgrade for $29/month
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 