import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { useAuthStore } from '../stores/useAuthStore';
import { GoogleLogin } from '@react-oauth/google';

const schema = z.object({
  name: z.string().min(2, 'Full name is required.'),
  email: z.string().email('Enter a valid email.'),
  password: z.string().min(8, 'Password must be at least 8 characters.'),
  accepted: z.boolean().refine((value) => value, 'You must accept the Terms & Privacy.'),
});

type FormValues = z.infer<typeof schema>;

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = (values: FormValues) => {
    login(values.name);
    toast.success('Account created. Welcome!');
    navigate('/patients/123/risk');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-primary-50 to-white px-6">
      <Card className="w-full max-w-md space-y-6">
        <div className="space-y-2">
          <Link to="/" className="text-sm font-semibold text-primary-600">
            HealthIntel AI
          </Link>
          <h1 className="text-2xl font-semibold">Create your account</h1>
          <p className="text-sm text-slate-600">Start your HealthIntel AI workspace in minutes.</p>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="text-sm font-semibold">Full Name</label>
            <input
              {...register('name')}
              className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm"
              placeholder="Jane Doe"
            />
            {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
          </div>
          <div>
            <label className="text-sm font-semibold">Email</label>
            <input
              {...register('email')}
              className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm"
              placeholder="you@example.com"
            />
            {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
          </div>
          <div>
            <label className="text-sm font-semibold">Password</label>
            <input
              {...register('password')}
              type="password"
              className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm"
              placeholder="Create a secure password"
            />
            {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>}
          </div>
          <label className="flex items-center gap-2 text-xs text-slate-600">
            <input type="checkbox" {...register('accepted')} className="rounded" />
            I agree to the Terms & Privacy Policy
          </label>
          {errors.accepted && <p className="text-xs text-red-500">{errors.accepted.message}</p>}
          <Button type="submit" className="w-full">
            Create Account
          </Button>
        </form>
        <div className="space-y-3">
          <GoogleLogin onSuccess={() => toast.success('Google OAuth connected (demo).')} onError={() => toast.error('OAuth failed.')} />
          <Button variant="outline" className="w-full">
            Continue with Apple (demo)
          </Button>
        </div>
        <p className="text-xs text-slate-500">For informational use only.</p>
        <p className="text-sm text-slate-600">
          Already have an account?{' '}
          <Link to="/auth/login" className="font-semibold text-primary-600">
            Log in
          </Link>
        </p>
      </Card>
    </div>
  );
};

export default RegisterPage;
