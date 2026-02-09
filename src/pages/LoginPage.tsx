import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { useAuthStore } from '../stores/useAuthStore';

const schema = z.object({
  email: z.string().email('Enter a valid email.'),
  password: z.string().min(1, 'Password is required.'),
});

type FormValues = z.infer<typeof schema>;

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = (values: FormValues) => {
    login(values.email.split('@')[0] || 'Jordan Blake');
    navigate('/patients/123/risk');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-6">
      <Card className="w-full max-w-md space-y-6">
        <div className="space-y-2">
          <Link to="/" className="text-sm font-semibold text-primary-600">
            HealthIntel AI
          </Link>
          <h1 className="text-2xl font-semibold">Welcome back</h1>
          <p className="text-sm text-slate-600">Securely access your health intelligence workspace.</p>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="text-sm font-semibold">Email</label>
            <input
              {...register('email')}
              className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm"
            />
            {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
          </div>
          <div>
            <label className="text-sm font-semibold">Password</label>
            <input
              {...register('password')}
              type="password"
              className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm"
            />
            {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>}
          </div>
          <div className="text-right">
            <button type="button" className="text-xs font-semibold text-primary-600">
              Forgot password?
            </button>
          </div>
          <Button type="submit" className="w-full">
            Login
          </Button>
        </form>
        <p className="text-xs text-slate-500">For informational use only.</p>
        <p className="text-sm text-slate-600">
          New to HealthIntel AI?{' '}
          <Link to="/auth/register" className="font-semibold text-primary-600">
            Create an account
          </Link>
        </p>
      </Card>
    </div>
  );
};

export default LoginPage;
