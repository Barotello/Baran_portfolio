import React from "react";

const HeroSection: React.FC = () => {
  return (
    <section className="w-full py-16 lg:py-24" id="home">
      <div className="mx-auto max-w-4xl px-4 flex flex-col items-center justify-center gap-8 text-center"> {/* İçerik için yeni sarmalayıcı */}
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl font-black leading-tight tracking-tighter md:text-6xl lg:text-7xl">
            Baran Demirtaş
          </h1>
          <p className="text-2xl font-display font-medium text-stone-600 dark:text-stone-300 md:text-3xl">
            Product Designer &amp; Developer
          </p>
          <h2 className="text-lg font-normal text-stone-600 dark:text-stone-300 md:text-xl">
            Architect intuitive digital experiences by fusing clean design principles with rock-solid, AI-accelerated development. Leveraging React Native, TypeScript, and Supabase
          </h2>
        </div>
        {/* "See My Projects" butonu buradan kaldırıldı */}
      </div>
    </section>
  );
};

export default HeroSection;