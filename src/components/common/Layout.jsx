import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Footer from './Footer';
import TheoryPanel from '../theory/TheoryPanel';
import { AnimatePresence } from 'framer-motion';

const Layout = ({ children, mode, setMode, isTheoryOpen, toggleTheory }) => {
    // Initialize sidebar state based on screen width
    const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 1024);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                setIsSidebarOpen(true);
            } else {
                setIsSidebarOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
    const closeSidebar = () => setIsSidebarOpen(false);

    return (
        <div className={`drawer ${isSidebarOpen ? 'lg:drawer-open' : ''} h-screen w-screen overflow-hidden font-sans bg-base-100 text-base-content`}>
            <input 
                id="my-drawer-2" 
                type="checkbox" 
                className="drawer-toggle" 
                checked={isSidebarOpen} 
                onChange={(e) => setIsSidebarOpen(e.target.checked)} 
            />

            <div className="drawer-content flex flex-col h-full overflow-hidden relative transition-all duration-300">
                {/* Navbar */}
                <Navbar 
                    toggleSidebar={toggleSidebar} 
                    mode={mode} 
                    setMode={setMode}
                    isTheoryOpen={isTheoryOpen}
                    toggleTheory={toggleTheory}
                />

                {/* Main Content Area */}
                <main className="flex-1 overflow-y-auto relative scroll-smooth flex flex-col">
                    <div className="flex-1 p-4">
                        {children}
                    </div>
                    <Footer />
                </main>

                {/* Theory Panel Overlay */}
                <AnimatePresence>
                    {isTheoryOpen && <TheoryPanel isOpen={isTheoryOpen} onClose={toggleTheory} />}
                </AnimatePresence>
            </div>

            {/* Sidebar */}
            <Sidebar 
                isOpen={isSidebarOpen} 
                closeSidebar={closeSidebar} 
                mode={mode} 
                setMode={setMode}
            />
        </div>
    );
};

export default Layout;
