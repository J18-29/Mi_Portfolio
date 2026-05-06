import { Outlet } from 'react-router-dom';
import { NavBar } from '../components/NavBar';
import { Settings, HelpCircle, Search, Bell, Command } from 'lucide-react';

export const BackLayout = () => {
    return (
        <div className="flex min-h-screen bg-slate-50 text-slate-900 font-sans">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-slate-200 flex flex-col sticky top-0 h-screen">
                <div className="p-6 flex items-center gap-3 font-bold text-lg tracking-tight">
                    <div className="w-8 h-8 bg-black text-white rounded-lg flex items-center justify-center shadow-lg">
                        <Command size={18} />
                    </div>
                    Acme Inc.
                </div>

                <div className="flex-1 overflow-y-auto">
                    <div className="px-4 mb-6">
                        <div className="flex items-center gap-2 bg-slate-100 px-3 py-2 rounded-xl text-slate-400 text-xs cursor-pointer hover:bg-slate-200 transition-colors">
                            <Search size={14} /> 
                            <span className="flex-1">Quick Create</span>
                            <span className="border border-slate-300 rounded px-1 text-[10px]">⌘K</span>
                        </div>
                    </div>
                    
                    {/* NavBar vertical */}
                    <nav className="px-2">
                        <NavBar isVertical={true} />
                    </nav>
                </div>

                <div className="p-4 border-t border-slate-100 space-y-1">
                    <div className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-500 hover:text-black hover:bg-slate-50 rounded-lg cursor-pointer transition-all">
                        <Settings size={18}/> Settings
                    </div>
                    <div className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-500 hover:text-black hover:bg-slate-50 rounded-lg cursor-pointer transition-all">
                        <HelpCircle size={18}/> Get Help
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col">
                <header className="h-16 flex items-center justify-end px-10 gap-6 bg-white/50 backdrop-blur-md sticky top-0 z-20">
                    <button className="relative p-2 text-slate-400 hover:text-black transition-colors">
                        <Bell size={20} />
                        <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                    </button>
                    <div className="w-8 h-8 bg-slate-200 rounded-full border border-slate-300 overflow-hidden cursor-pointer hover:ring-4 ring-slate-100 transition-all">
                        <img src="https://ui-avatars.com/api/?name=Admin&background=0D8ABC&color=fff" alt="avatar" />
                    </div>
                </header>

                <main className="p-8">
                    {/* El Outlet ya no tiene un contenedor blanco pequeño; 
                        deja que AdminCursos use todo el espacio con su propio diseño */}
                    <Outlet />
                </main>
            </div>
        </div>
    );
};