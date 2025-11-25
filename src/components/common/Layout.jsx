import React, { useState } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import TheoryPanel from '../theory/TheoryPanel';
import { AnimatePresence } from 'framer-motion';

const Layout = ({ children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 1024);

    React.useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                setIsSidebarOpen(true);
            } else {
                setIsSidebarOpen(false);
            }
        };
        
        // We only want to set default, not force it on every resize if user toggled it.
        // Actually, standard behavior is usually:
        // - Desktop: Open by default
        // - Mobile: Closed by default
        // Let's just stick to initial state.
        
        // Better: Don't auto-close on resize if user opened it, but initial load matters.
    }, []);

    return (
        <div className={`drawer ${isSidebarOpen ? 'lg:drawer-open' : ''} h-screen w-screen overflow-hidden`}>
            <input 
                id="my-drawer-2" 
                type="checkbox" 
                className="drawer-toggle" 
                checked={isSidebarOpen} 
                onChange={(e) => setIsSidebarOpen(e.target.checked)} 
            />

            <div className="drawer-content flex flex-col h-full overflow-hidden relative">
                {/* Navbar */}
                <Navbar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

                {/* Main Content Area */}
                <main className="flex-1 overflow-hidden relative bg-base-100 p-4">
                    {children}
                    <AnimatePresence>
                        <TheoryPanel />
                    </AnimatePresence>
                </main>
            </div>

            <Sidebar isOpen={isSidebarOpen} closeSidebar={() => setIsSidebarOpen(false)} />
        </div>
    );
};

export default Layout;
