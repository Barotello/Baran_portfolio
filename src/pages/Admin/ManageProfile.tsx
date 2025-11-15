import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSession } from "@/integrations/supabase/auth";
import { supabase } from "@/integrations/supabase/client";
import Layout from "@/components/Layout";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProfileForm from "@/components/ProfileForm"; // New component
import { showSuccess, showError } from "@/utils/toast";

interface Profile {
  id: string;
  first_name: string | null;
  last_name: string | null;
  avatar_url: string | null;
}

const ManageProfile: React.FC = () => {
  const { session, isLoading: isSessionLoading } = useSession();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!isSessionLoading && !session) {
      navigate('/login');
    } else if (session) {
      fetchProfile(session.user.id);
    }
  }, [session, isSessionLoading, navigate]);

  const fetchProfile = async (userId: string) => {
    setLoading(true);
    const { data, error } = await supabase
      .from('profiles')
      .select('id, first_name, last_name, avatar_url')
      .eq('id', userId)
      .limit(1); // .single() yerine .limit(1) kullanıldı

    if (error) {
      showError("Error fetching profile: " + error.message);
      setProfile({ id: userId, first_name: null, last_name: null, avatar_url: null }); // Initialize with user ID
    } else {
      setProfile(data?.[0] || null); // data bir dizi olduğu için ilk elemanı alıyoruz
    }
    setLoading(false);
  };

  const handleFormSubmit = async (formData: Omit<Profile, 'id'>) => {
    if (!session?.user?.id) {
      showError("User not authenticated.");
      return;
    }
    setIsSubmitting(true);

    const { error } = await supabase
      .from('profiles')
      .upsert({ id: session.user.id, ...formData }, { onConflict: 'id' });

    if (error) {
      showError("Error saving profile: " + error.message);
    } else {
      showSuccess("Profile saved successfully!");
      fetchProfile(session.user.id); // Re-fetch to update state
    }
    setIsSubmitting(false);
  };

  if (isSessionLoading || !session) {
    return (
      <Layout>
        <Header />
        <main className="mx-auto flex max-w-4xl flex-col items-center px-4 pt-16 sm:pt-24 lg:pt-32 min-h-[60vh]">
          <p>Loading authentication...</p>
        </main>
        <Footer />
      </Layout>
    );
  }

  return (
    <Layout>
      <Header />
      <main className="mx-auto flex max-w-4xl flex-col items-center px-4 pt-16 sm:pt-24 lg:pt-32 min-h-[60vh]">
        <section className="w-full text-center mb-12">
          <h1 className="text-4xl font-black leading-tight tracking-tighter md:text-5xl lg:text-6xl">
            Manage Profile
          </h1>
          <p className="text-lg font-normal text-stone-600 dark:text-stone-300 md:text-xl max-w-3xl mx-auto mt-4">
            Update your personal information and avatar.
          </p>
        </section>

        <section className="w-full py-8">
          {loading ? (
            <p className="text-center">Loading profile...</p>
          ) : (
            <div className="w-full max-w-md mx-auto rounded-xl border border-glass-border-light dark:border-glass-border-dark bg-glass-light/50 dark:bg-glass-dark/50 shadow-lg backdrop-blur-xl p-6">
              <ProfileForm
                initialData={profile || { id: session.user.id, first_name: null, last_name: null, avatar_url: null }}
                onSubmit={handleFormSubmit}
                isSubmitting={isSubmitting}
              />
            </div>
          )}
        </section>
      </main>
      <Footer />
    </Layout>
  );
};

export default ManageProfile;