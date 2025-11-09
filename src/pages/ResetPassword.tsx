import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { supabase } from '@/integrations/supabase/client';
import { showSuccess, showError } from '@/utils/toast';
import Layout from '@/components/Layout';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useSession } from '@/integrations/supabase/auth';

const passwordResetSchema = z.object({
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match.",
  path: ["confirmPassword"],
});

const ResetPassword: React.FC = () => {
  const navigate = useNavigate();
  const { session, isLoading } = useSession();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof passwordResetSchema>>({
    resolver: zodResolver(passwordResetSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof passwordResetSchema>) => {
    setIsSubmitting(true);
    const { error } = await supabase.auth.updateUser({
      password: values.password,
    });

    if (error) {
      showError("Error resetting password: " + error.message);
    } else {
      showSuccess("Password reset successfully! You can now log in with your new password.");
      navigate('/about#admin-login'); // Redirect to login page
    }
    setIsSubmitting(false);
  };

  if (isLoading) {
    return (
      <Layout>
        <Header />
        <main className="mx-auto flex max-w-4xl flex-col items-center px-4 pt-16 sm:pt-24 lg:pt-32 min-h-[60vh]">
          <p>Loading authentication status...</p>
        </main>
        <Footer />
      </Layout>
    );
  }

  // If there's no session, it means the user didn't come from a password recovery link
  // or their session expired. Redirect them to login.
  if (!session) {
    navigate('/about#admin-login');
    return null;
  }

  return (
    <Layout>
      <Header />
      <main className="mx-auto flex max-w-4xl flex-col items-center px-4 pt-16 sm:pt-24 lg:pt-32 min-h-[60vh]">
        <div className="w-full max-w-md rounded-xl border border-glass-border-light dark:border-glass-border-dark bg-glass-light/50 dark:bg-glass-dark/50 shadow-lg backdrop-blur-xl p-6">
          <h1 className="text-2xl font-bold mb-6 text-center">Reset Your Password</h1>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Enter your new password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm New Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Confirm your new password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Resetting..." : "Reset Password"}
              </Button>
            </form>
          </Form>
        </div>
      </main>
      <Footer />
    </Layout>
  );
};

export default ResetPassword;