import React from 'react';
import DashboardOverview from '../components/Home/DashboardOverview.jsx';
import StadiumMap from '../components/Map/StadiumMap.jsx';
import SmartRouting from '../components/Navigation/SmartRouting.jsx';
import WaitTimes from '../components/Queues/WaitTimes.jsx';
import FoodOrdering from '../components/Food/FoodOrdering.jsx';
import LiveAlerts from '../components/Home/LiveAlerts.jsx';
import AuthModal from '../components/Auth/AuthModal.jsx';
import { useSocketData } from '../hooks/useSocketData.js';
import { useGeolocation } from '../hooks/useGeolocation.js';
import { useAppContext } from '../context/AppContext.jsx';

const Home = () => {
  const { currentUser, login, isEditingProfile } = useAppContext();
  const { stadiumState, alerts, activeUsers, joinStadium, moveAvatar, isConnected } = useSocketData();

  // Stream hardware GPS directly into the socket backend
  const { error: gpsError } = useGeolocation(!!currentUser, moveAvatar);

  // Auto-join if standard session exists (for localStorage refresh)
  React.useEffect(() => {
     if (currentUser && isConnected && !activeUsers[currentUser.id]) {
        joinStadium(currentUser);
     }
  }, [currentUser, isConnected, joinStadium]);

  const handleJoin = (userData) => {
    login(userData);
    joinStadium(userData);
  };

  if (!stadiumState.zones || Object.keys(stadiumState.zones).length === 0) {
     return <div className="p-8 text-center text-slate-500 animate-pulse">Connecting to Stadium Intelligence Server...</div>;
  }

  return (
    <div className="space-y-6 relative">
      {(!currentUser || isEditingProfile) && <AuthModal onJoin={handleJoin} />}
      
      <DashboardOverview globalStats={stadiumState.global} zones={stadiumState.zones} />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main interactive map takes up 2 columns on large screens */}
        <div className="lg:col-span-2">
          {gpsError && (
             <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm font-medium">
                GPS Tracking Error: {gpsError}. Please allow Location Permissions.
             </div>
          )}
          <StadiumMap 
            zones={stadiumState.zones} 
            activeUsers={activeUsers} 
            currentUser={currentUser} 
          />
        </div>
        
        {/* Alerts and Routing take up the third column */}
        <div className="flex flex-col gap-6">
          <LiveAlerts alerts={alerts} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
         <SmartRouting zones={stadiumState.zones} activeUsers={activeUsers} currentUser={currentUser} />
         <WaitTimes zones={stadiumState.zones} />
         <FoodOrdering />
      </div>
    </div>
  );
};

export default Home;
