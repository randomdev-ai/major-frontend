import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, ShieldCheck } from 'lucide-react';
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
  const [showPassword, setShowPassword] = useState(false);
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
    <div className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-cyan-50">
      <header className="flex items-center justify-between px-6 py-4 text-sm">
        <div className="flex items-center gap-2 font-semibold text-slate-900">
          <div className="h-6 w-6 rounded-full bg-cyan-500" />
          HealthAI
        </div>
        <div className="text-slate-500">
          Already have an account?{' '}
          <Link to="/auth/login" className="font-semibold text-cyan-600">
            Sign in
          </Link>
        </div>
      </header>

      <main className="flex items-center justify-center px-6 py-12">
        <Card className="w-full max-w-md space-y-6">
          <div className="space-y-2">
            <h1 className="text-2xl font-semibold text-slate-900">Start your health journey</h1>
            <p className="text-sm text-slate-500">
              Create an account to interpret reports and understand your health risks with AI guidance.
            </p>
          </div>
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label className="text-sm font-semibold">Full Name</label>
              <input
                {...register('name')}
                className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm"
                placeholder="Enter your full name"
              />
              {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
            </div>
            <div>
              <label className="text-sm font-semibold">Email Address</label>
              <input
                {...register('email')}
                className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm"
                placeholder="name@example.com"
              />
              {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
            </div>
            <div>
              <label className="text-sm font-semibold">Password</label>
              <div className="relative mt-2">
                <input
                  {...register('password')}
                  type={showPassword ? 'text' : 'password'}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm"
                  placeholder="Create a strong password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-2.5 text-slate-400"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>}
            </div>
            <label className="flex items-start gap-2 text-xs text-slate-500">
              <input type="checkbox" {...register('accepted')} className="mt-1 rounded" />
              I agree to the Terms of Service and acknowledge the Privacy Policy.
            </label>
            {errors.accepted && <p className="text-xs text-red-500">{errors.accepted.message}</p>}
            <Button type="submit" className="w-full">
              Create Secure Account →
            </Button>
          </form>
          <div className="text-center text-xs text-slate-400">or register with</div>
          <div className="grid gap-3 md:grid-cols-2">
            <GoogleLogin
              onSuccess={() => toast.success('Google OAuth connected (demo).')}
              onError={() => toast.error('OAuth failed.')}
            />
            <Button variant="outline">Apple</Button>
          </div>
          <div className="flex items-center justify-center gap-2 rounded-xl border border-slate-100 bg-slate-50 p-3 text-xs text-slate-500">
            <ShieldCheck size={14} />
            Your health data is fully encrypted and HIPAA compliant.
          </div>
        </Card>
      </main>
    </div>
  );
};

export default RegisterPage;
