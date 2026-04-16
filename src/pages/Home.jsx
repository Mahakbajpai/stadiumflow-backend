import React from 'react';
import DashboardOverview from '../components/Home/DashboardOverview.jsx';
import StadiumMap from '../components/Map/StadiumMap.jsx';
import SmartRouting from '../components/Navigation/SmartRouting.jsx';
import WaitTimes from '../components/Queues/WaitTimes.jsx';
import FoodOrdering from '../components/Food/FoodOrdering.jsx';
import LiveAlerts from '../components/Home/LiveAlerts.jsx';
import { useSocketData } from '../hooks/useSocketData.js';

const Home = () => {
  const { stadiumState, alerts } = useSocketData();

  if (!stadiumState.zones || Object.keys(stadiumState.zones).length === 0) {
     return <div className="p-8 text-center text-slate-500 animate-pulse">Connecting to Stadium Intelligence Server...</div>;
  }

  return (
    <div className="space-y-6">
      <DashboardOverview globalStats={stadiumState.global} zones={stadiumState.zones} />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main interactive map takes up 2 columns on large screens */}
        <div className="lg:col-span-2">
          <StadiumMap zones={stadiumState.zones} />
        </div>
        
        {/* Alerts and Routing take up the third column */}
        <div className="flex flex-col gap-6">
          <LiveAlerts alerts={alerts} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
         <SmartRouting zones={stadiumState.zones} />
         <WaitTimes zones={stadiumState.zones} />
         <FoodOrdering />
      </div>
    </div>
  );
};

export default Home;
