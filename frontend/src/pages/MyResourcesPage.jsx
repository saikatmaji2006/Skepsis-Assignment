import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiFolder,
  FiFileText,
  FiAlignLeft,
  FiTag,
  FiLink,
  FiArrowRight,
} from 'react-icons/fi';
import { SUBJECTS, validateDriveLink } from '../utils/constants';
import { notesAPI } from '../services/api';
import Navbar from '../components/Navbar';
import ResourceCard from '../components/ResourceCard';
import Modal from '../components/Modal';
import Input from '../components/Input';
import Button from '../components/Button';
import EmptyState from '../components/EmptyState';
import { SkeletonGrid } from '../components/Loader';
import toast from 'react-hot-toast';

export default function MyResourcesPage() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const [editForm, setEditForm] = useState({
    title: '',
    description: '',
    subject: '',
    driveLink: '',
  });
  const [editErrors, setEditErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const subjects = SUBJECTS.filter((s) => s !== 'All');

  useEffect(() => {
    fetchMyNotes();
  }, []);

  const fetchMyNotes = async () => {
    setLoading(true);
    try {
      const { data } = await notesAPI.getMy();
      setNotes(data.notes);
    } catch (err) {
      toast.error('Failed to load your resources');
    } finally {
      setLoading(false);
    }
  };

  // ── EDIT ──
  const handleEdit = (note) => {
    setSelectedNote(note);
    setEditForm({
      title: note.title,
      description: note.description,
      subject: note.subject,
      driveLink: note.driveLink,
    });
    setEditErrors({});
    setEditModal(true);
  };

  const validateEdit = () => {
    const e = {};
    if (!editForm.title.trim()) e.title = 'Title is required';
    if (!editForm.description.trim()) e.description = 'Description is required';
    if (!editForm.subject) e.subject = 'Please select a subject';
    if (!editForm.driveLink.trim()) e.driveLink = 'Google Drive link is required';
    else if (!validateDriveLink(editForm.driveLink))
      e.driveLink = 'Must be a valid Google Drive URL';
    setEditErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!validateEdit()) return;
    setSubmitting(true);
    try {
      await notesAPI.update(selectedNote._id, {
        title: editForm.title.trim(),
        description: editForm.description.trim(),
        subject: editForm.subject,
        driveLink: editForm.driveLink.trim(),
      });
      toast.success('Resource updated! ✅');
      setEditModal(false);
      fetchMyNotes();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Update failed');
    } finally {
      setSubmitting(false);
    }
  };

  const handleEditChange = (field) => (e) => {
    setEditForm({ ...editForm, [field]: e.target.value });
    if (editErrors[field]) setEditErrors({ ...editErrors, [field]: '' });
  };

  // ── DELETE ──
  const handleDeleteClick = (note) => {
    setSelectedNote(note);
    setDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    setSubmitting(true);
    try {
      await notesAPI.delete(selectedNote._id);
      toast.success('Resource deleted');
      setDeleteModal(false);
      fetchMyNotes();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Delete failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark-bg">
      <Navbar />

      <main className="pt-20 pb-12">
        <div className="page-container">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between mb-8"
          >
            <div>
              <h1 className="text-3xl font-black text-dark-text mb-2 flex items-center gap-3">
                <FiFolder className="text-primary" />
                My <span className="gradient-text">Resources</span>
              </h1>
              <p className="text-dark-muted">
                {notes.length} resource{notes.length !== 1 ? 's' : ''} shared
              </p>
            </div>
            <Button
              onClick={() => navigate('/add-resource')}
              variant="primary"
              className="hidden sm:flex items-center gap-2"
            >
              Share New
              <FiArrowRight size={16} />
            </Button>
          </motion.div>

          {/* Content */}
          {loading ? (
            <SkeletonGrid count={6} />
          ) : notes.length > 0 ? (
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              <AnimatePresence mode="popLayout">
                {notes.map((note) => (
                  <ResourceCard
                    key={note._id}
                    note={note}
                    showActions
                    onEdit={handleEdit}
                    onDelete={handleDeleteClick}
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <EmptyState
              icon={FiFolder}
              title="No resources shared yet"
              message="Start contributing to the community by sharing your first study resource."
              actionLabel="Share Your First Resource"
              onAction={() => navigate('/add-resource')}
            />
          )}
        </div>
      </main>

      {/* ── EDIT MODAL ── */}
      <Modal
        isOpen={editModal}
        onClose={() => setEditModal(false)}
        title="Edit Resource"
      >
        <form onSubmit={handleEditSubmit} className="space-y-4">
          <Input
            id="edit-title"
            label="Title"
            icon={FiFileText}
            value={editForm.title}
            onChange={handleEditChange('title')}
            error={editErrors.title}
          />
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-dark-muted">
              Description
            </label>
            <textarea
              rows={3}
              value={editForm.description}
              onChange={handleEditChange('description')}
              className={`input-field resize-none ${
                editErrors.description ? 'border-red-500/50' : ''
              }`}
            />
            {editErrors.description && (
              <p className="text-xs text-red-400">{editErrors.description}</p>
            )}
          </div>
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-dark-muted">
              Subject
            </label>
            <select
              value={editForm.subject}
              onChange={handleEditChange('subject')}
              className={`input-field appearance-none cursor-pointer ${
                editErrors.subject ? 'border-red-500/50' : ''
              }`}
            >
              <option value="">Select</option>
              {subjects.map((s) => (
                <option key={s} value={s} className="bg-dark-card text-dark-text">
                  {s}
                </option>
              ))}
            </select>
            {editErrors.subject && (
              <p className="text-xs text-red-400">{editErrors.subject}</p>
            )}
          </div>
          <Input
            id="edit-drivelink"
            label="Google Drive Link"
            icon={FiLink}
            value={editForm.driveLink}
            onChange={handleEditChange('driveLink')}
            error={editErrors.driveLink}
          />
          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="ghost"
              onClick={() => setEditModal(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              loading={submitting}
              className="flex-1"
            >
              Save Changes
            </Button>
          </div>
        </form>
      </Modal>

      {/* ── DELETE MODAL ── */}
      <Modal
        isOpen={deleteModal}
        onClose={() => setDeleteModal(false)}
        title="Delete Resource"
      >
        <p className="text-sm text-dark-muted mb-2">
          Are you sure you want to delete this resource?
        </p>
        <p className="text-sm font-semibold text-dark-text mb-6">
          &ldquo;{selectedNote?.title}&rdquo;
        </p>
        <div className="flex gap-3">
          <Button
            variant="ghost"
            onClick={() => setDeleteModal(false)}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={handleDeleteConfirm}
            loading={submitting}
            className="flex-1"
          >
            Delete
          </Button>
        </div>
      </Modal>
    </div>
  );
}
