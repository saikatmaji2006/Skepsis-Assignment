import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiUser, FiMail, FiLock, FiBookOpen, FiArrowRight } from 'react-icons/fi';
import { useAuth } from '../hooks/useAuth';
import Input from '../components/Input';
import Button from '../components/Button';
import toast from 'react-hot-toast';

export default function RegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = 'Invalid email format';
    if (!form.password) e.password = 'Password is required';
    else if (form.password.length < 6) e.password = 'Min 6 characters';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      await register(form.name.trim(), form.email.trim(), form.password);
      toast.success('Welcome to StudyBuddy! 🎉');
      navigate('/home');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field) => (e) => {
    setForm({ ...form, [field]: e.target.value });
    if (errors[field]) setErrors({ ...errors, [field]: '' });
  };

  return (
    <div className="min-h-screen flex bg-dark-bg">
      {/* Left decorative panel */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden items-center justify-center">
        <div className="absolute inset-0 gradient-hero animate-gradient-shift" />
        <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-primary/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-accent/15 rounded-full blur-[100px]" />

        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 text-center px-12"
        >
          <div className="w-20 h-20 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-primary/30">
            <FiBookOpen className="text-white text-3xl" />
          </div>
          <h2 className="text-4xl font-black text-dark-text mb-4">
            Join the <span className="gradient-text">community</span>
          </h2>
          <p className="text-dark-muted max-w-sm mx-auto leading-relaxed">
            Share your knowledge, discover resources, and help fellow students succeed.
          </p>
        </motion.div>
      </div>

      {/* Right form panel */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <div className="w-9 h-9 rounded-lg gradient-primary flex items-center justify-center">
              <FiBookOpen className="text-white" />
            </div>
            <span className="text-xl font-bold gradient-text">StudyBuddy</span>
          </div>

          <h1 className="text-3xl font-black text-dark-text mb-2">
            Create your account
          </h1>
          <p className="text-dark-muted mb-8">
            Already have an account?{' '}
            <Link to="/login" className="text-primary hover:text-primary-300 font-medium transition-colors">
              Sign in
            </Link>
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              id="register-name"
              label="Full Name"
              placeholder="John Doe"
              icon={FiUser}
              value={form.name}
              onChange={handleChange('name')}
              error={errors.name}
            />
            <Input
              id="register-email"
              label="Email Address"
              type="email"
              placeholder="you@university.edu"
              icon={FiMail}
              value={form.email}
              onChange={handleChange('email')}
              error={errors.email}
            />
            <Input
              id="register-password"
              label="Password"
              type="password"
              placeholder="Min 6 characters"
              icon={FiLock}
              value={form.password}
              onChange={handleChange('password')}
              error={errors.password}
            />

            <Button
              type="submit"
              variant="primary"
              loading={loading}
              className="w-full flex items-center justify-center gap-2"
            >
              Create Account
              <FiArrowRight />
            </Button>
          </form>

          <p className="text-xs text-dark-muted text-center mt-6">
            By signing up, you agree to our Terms of Service and Privacy Policy.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
