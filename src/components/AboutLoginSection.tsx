import React from 'react';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '@/integrations/supabase/client';
import { useSession } from '@/integrations/supabase/auth';
import { useNavigate } from 'react-router-dom';

const AboutLoginSection: React.FC = () => {
  const { session, isLoading } = useSession();
  const navigate = useNavigate();

  // Giriş yapmış kullanıcıları ana sayfaya yönlendirme mantığını kaldırıyoruz.
  // Artık giriş yapmış kullanıcılar About sayfasında kalacak ve içeriği görebilecek.
  if (isLoading) {
    return null; // Yüklenirken bir şey gösterme
  }

  if (session) {
    return (
      <div className="mx-auto max-w-sm p-6 rounded-xl border border-glass-border-light dark:border-glass-border-dark bg-glass-light/50 dark:bg-glass-dark/50 shadow-lg backdrop-blur-xl text-center">
        <p className="text-lg font-semibold">You are logged in as an administrator.</p>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">You can manage content from the Admin menu in the header.</p>
      </div>
    );
  }

  return (
    <div id="admin-login" className="mx-auto max-w-sm p-6 rounded-xl border border-glass-border-light dark:border-glass-border-dark bg-glass-light/50 dark:bg-glass-dark/50 shadow-lg backdrop-blur-xl">
      <h3 className="text-2xl font-bold mb-6 text-center">Admin Login</h3>
      <Auth
        supabaseClient={supabase}
        providers={[]} // You can add 'google', 'github' etc. here if configured in Supabase
        appearance={{
          theme: ThemeSupa,
          variables: {
            default: {
              colors: {
                brand: 'hsl(var(--primary))',
                brandAccent: 'hsl(var(--primary-foreground))',
              },
            },
          },
        }}
        theme="dark" // Using dark theme for Auth UI to match the app's dark mode
      />
    </div>
  );
};

export default AboutLoginSection;