import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FiFileText,
  FiAlignLeft,
  FiTag,
  FiLink,
  FiArrowRight,
  FiCheckCircle,
} from 'react-icons/fi';
import { SUBJECTS, validateDriveLink } from '../utils/constants';
import { notesAPI } from '../services/api';
import Navbar from '../components/Navbar';
import Input from '../components/Input';
import Button from '../components/Button';
import toast from 'react-hot-toast';

export default function AddResourcePage() {
  const [form, setForm] = useState({
    title: '',
    description: '',
    subject: '',
    driveLink: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const subjects = SUBJECTS.filter((s) => s !== 'All');

  const validate = () => {
    const e = {};
    if (!form.title.trim()) e.title = 'Title is required';
    if (!form.description.trim()) e.description = 'Description is required';
    if (!form.subject) e.subject = 'Please select a subject';
    if (!form.driveLink.trim()) e.driveLink = 'Google Drive link is required';
    else if (!validateDriveLink(form.driveLink))
      e.driveLink = 'Must be a valid Google Drive or Docs URL';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      await notesAPI.create({
        title: form.title.trim(),
        description: form.description.trim(),
        subject: form.subject,
        driveLink: form.driveLink.trim(),
      });
      toast.success('Resource shared successfully! 🎉');
      navigate('/home');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to share resource');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field) => (e) => {
    setForm({ ...form, [field]: e.target.value });
    if (errors[field]) setErrors({ ...errors, [field]: '' });
  };

  return (
    <div className="min-h-screen bg-dark-bg">
      <Navbar />

      <main className="pt-20 pb-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-black text-dark-text mb-2">
                Share a <span className="gradient-text">Resource</span>
              </h1>
              <p className="text-dark-muted">
                Help your peers by sharing study materials via Google Drive.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="card p-6 space-y-5">
                <Input
                  id="resource-title"
                  label="Title"
                  placeholder="e.g., DSA Complete Notes — Arrays & Linked Lists"
                  icon={FiFileText}
                  value={form.title}
                  onChange={handleChange('title')}
                  error={errors.title}
                />

                {/* Description textarea */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="resource-description"
                    className="block text-sm font-medium text-dark-muted"
                  >
                    Description
                  </label>
                  <div className="relative">
                    <div className="absolute top-3 left-4 pointer-events-none">
                      <FiAlignLeft className="text-dark-muted" />
                    </div>
                    <textarea
                      id="resource-description"
                      rows={4}
                      placeholder="Describe what this resource covers..."
                      value={form.description}
                      onChange={handleChange('description')}
                      className={`input-field pl-11 resize-none ${
                        errors.description
                          ? 'border-red-500/50 focus:ring-red-500/50'
                          : ''
                      }`}
                    />
                  </div>
                  {errors.description && (
                    <p className="text-xs text-red-400">{errors.description}</p>
                  )}
                </div>

                {/* Subject select */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="resource-subject"
                    className="block text-sm font-medium text-dark-muted"
                  >
                    Subject
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <FiTag className="text-dark-muted" />
                    </div>
                    <select
                      id="resource-subject"
                      value={form.subject}
                      onChange={handleChange('subject')}
                      className={`input-field pl-11 appearance-none cursor-pointer ${
                        errors.subject
                          ? 'border-red-500/50 focus:ring-red-500/50'
                          : ''
                      } ${!form.subject ? 'text-dark-muted' : ''}`}
                    >
                      <option value="">Select a subject</option>
                      {subjects.map((s) => (
                        <option key={s} value={s} className="bg-dark-card text-dark-text">
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>
                  {errors.subject && (
                    <p className="text-xs text-red-400">{errors.subject}</p>
                  )}
                </div>

                <Input
                  id="resource-drivelink"
                  label="Google Drive Link"
                  placeholder="https://drive.google.com/..."
                  icon={FiLink}
                  value={form.driveLink}
                  onChange={handleChange('driveLink')}
                  error={errors.driveLink}
                />
              </div>

              {/* Info card */}
              <div className="glass rounded-xl p-4 flex items-start gap-3">
                <FiCheckCircle className="text-emerald-400 mt-0.5 flex-shrink-0" />
                <p className="text-xs text-dark-muted leading-relaxed">
                  Make sure your Google Drive file has public or
                  link-sharing enabled so other students can access it.
                </p>
              </div>

              <Button
                type="submit"
                variant="primary"
                loading={loading}
                className="w-full flex items-center justify-center gap-2 py-3.5"
              >
                Share Resource
                <FiArrowRight />
              </Button>
            </form>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
