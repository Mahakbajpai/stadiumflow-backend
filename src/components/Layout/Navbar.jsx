import React from 'react';
import { NavLink } from 'react-router-dom';
import { RadioReceiver, UserCircle, LayoutDashboard } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="glass-panel sticky top-0 z-50 rounded-none border-t-0 border-x-0 border-b border-gray-200/50 flex items-center justify-between px-6 py-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-brand text-white rounded-xl flex items-center justify-center shadow-float">
          <RadioReceiver size={24} />
        </div>
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-800">StadiumFlow<span className="text-brand">AI</span></h1>
          <div className="flex items-center gap-2">
             <span className="w-2 h-2 rounded-full bg-brand animate-pulse"></span>
             <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Live System Active</span>
          </div>
        </div>
      </div>
      
      <div className="hidden md:flex items-center gap-6 font-medium text-slate-600">
        <NavLink to="/" className={({isActive}) => isActive ? "text-brand" : "hover:text-brand transition-colors"}>Attendee View</NavLink>
        <NavLink to="/admin" className={({isActive}) => isActive ? "text-brand flex items-center gap-1" : "hover:text-brand transition-colors flex items-center gap-1"}>
          <LayoutDashboard size={18} /> Admin Console
        </NavLink>
      </div>

      <div className="flex items-center gap-4">
        <button className="flex items-center justify-center p-2 rounded-full hover:bg-slate-100 transition-colors text-slate-600">
          <UserCircle size={28} />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
