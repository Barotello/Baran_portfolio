import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSession } from '@/integrations/supabase/auth';

const Login: React.FC = () => {
  const { session, isLoading } = useSession();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!isLoading) {
      if (session) {
        navigate('/'); // Redirect to home if already logged in
      } else {
        navigate('/about#admin-login'); // Redirect to About page's admin login section
      }
    }
  }, [session, isLoading, navigate]);

  return null; // This page will now only handle redirects
};

export default Login;