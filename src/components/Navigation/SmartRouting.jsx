import React, { useState } from 'react';
import { Navigation, Route, AlertCircle } from 'lucide-react';

const SmartRouting = ({ zones }) => {
  const [destination, setDestination] = useState('');
  const [route, setRoute] = useState(null);
  const [loading, setLoading] = useState(false);

  const calculateRoute = () => {
    if (!destination) return;
    setLoading(true);
    setRoute(null);
    
    // Simulate AI routing calculation
    setTimeout(() => {
       const destZone = Object.values(zones).find(z => z.id === destination);
       if (!destZone) {
          setLoading(false);
          return;
       }

       // Mock logic finding alternative if crowded
       const isCrowded = destZone.status === 'high';
       let via = 'Concourse A';
       if (isCrowded) {
           via = 'Lower Service Tunnel (AI Re-routed)';
       }

       setRoute({
          destination: destZone.name,
          time: isCrowded ? '12 mins' : '5 mins',
          via: via,
          crowded: isCrowded
       });
       setLoading(false);
    }, 800);
  };

  return (
    <div className="glass-panel p-6 flex flex-col">
       <div className="flex items-center gap-3 mb-6">
         <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
           <Navigation size={20} />
         </div>
         <h3 className="text-lg font-bold text-slate-800">Smart Navigation</h3>
       </div>

       <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-slate-600 mb-1 block">Where do you want to go?</label>
            <select 
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent transition-all"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            >
              <option value="" disabled>Select destination...</option>
              <optgroup label="Seating">
                 <option value="seating1">Section 101-105</option>
                 <option value="seating2">Section 106-110</option>
              </optgroup>
              <optgroup label="Food & Drink">
                 <option value="food1">Burger Arena</option>
                 <option value="food2">Healthy Bowl</option>
              </optgroup>
              <optgroup label="Facilities">
                 <option value="restroom1">Restroom North</option>
                 <option value="restroom2">Restroom South</option>
              </optgroup>
            </select>
          </div>

          <button 
             onClick={calculateRoute}
             disabled={!destination || loading}
             className="w-full py-3 bg-slate-800 hover:bg-slate-900 text-white rounded-xl font-medium transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
          >
             {loading ? 'AI Analyzing Paths...' : 'Find Optimal Route'}
          </button>
       </div>

       {route && (
          <div className="mt-6 p-4 bg-brand-50 border border-brand-100 rounded-xl animate-fade-in">
             <div className="flex items-start gap-3">
                <Route className="text-brand-600 mt-0.5" size={20} />
                <div>
                   <h4 className="font-bold text-slate-800">Optimal Route Found</h4>
                   <p className="text-sm text-slate-600 mt-1">To <span className="font-medium">{route.destination}</span></p>
                   
                   <div className="flex items-center gap-3 mt-3 text-sm">
                      <span className="bg-white px-2 py-1 rounded shadow-sm font-medium text-slate-700">ETA: {route.time}</span>
                      <span className="text-slate-500">Via {route.via}</span>
                   </div>

                   {route.crowded && (
                      <div className="flex items-center gap-2 mt-3 text-xs text-yellow-600 bg-yellow-100/50 p-2 rounded">
                         <AlertCircle size={14} />
                         Destination is currently busy. Route adjusted for least resistance.
                      </div>
                   )}
                </div>
             </div>
          </div>
       )}
    </div>
  );
};

export default SmartRouting;
