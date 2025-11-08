import React from 'react';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '@/integrations/supabase/client';
import { useSession } from '@/integrations/supabase/auth';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Login: React.FC = () => {
  const { session, isLoading } = useSession();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (session && !isLoading) {
      navigate('/'); // Redirect to home if already logged in
    }
  }, [session, isLoading, navigate]);

  if (isLoading || session) {
    return null; // Or a loading spinner
  }

  return (
    <Layout>
      <Header />
      <main className="mx-auto flex max-w-md flex-col items-center px-4 pt-16 sm:pt-24 lg:pt-32 min-h-[60vh]">
        <h1 className="text-4xl font-black leading-tight tracking-tighter md:text-5xl lg:text-6xl mb-8 text-center">
          Login
        </h1>
        <div className="w-full p-6 rounded-xl border border-glass-border-light dark:border-glass-border-dark bg-glass-light/50 dark:bg-glass-dark/50 shadow-lg backdrop-blur-xl">
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
      </main>
      <Footer />
    </Layout>
  );
};

export default Login;