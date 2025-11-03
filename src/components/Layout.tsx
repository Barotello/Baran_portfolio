import React from "react";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="font-display bg-background-light dark:bg-background-dark text-stone-900 dark:text-stone-100 antialiased">
      <div className="fixed top-0 left-0 right-0 h-full w-full z-[-1] overflow-hidden">
        <div className="absolute top-[-20%] left-[-20%] w-[50%] h-[50%] bg-purple-500 rounded-full filter blur-3xl opacity-20"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-blue-500 rounded-full filter blur-3xl opacity-20"></div>
        <div className="absolute top-[10%] right-[-15%] w-[40%] h-[40%] bg-pink-500 rounded-full filter blur-3xl opacity-15"></div>
      </div>
      <div className="relative w-full overflow-x-hidden">
        {children}
      </div>
    </div>
  );
};

export default Layout;