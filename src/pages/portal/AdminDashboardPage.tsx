import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Users,
  BookOpen,
  Award,
  ShieldCheck,
  TrendingUp,
  ArrowRight,
  ExternalLink,
  Layers,
  Calendar,
  Video,
  Plus,
  Trash2,
  Play,
  FileCheck,
  CheckCircle2,
  Clock,
  Key,
  Copy,
  Check,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { coursesData } from '../../data/courses';
import {
  LMSService,
  Lesson,
  Assignment,
  AssignmentSubmission,
  EnrolledLearner,
  extractYouTubeId,
} from '../../services/lms.service';
import { AdmissionsService, ApplicationRecord } from '../../services/admissions.service';

export const AdminDashboardPage: React.FC = () => {
  const { user } = useAuth();

  const [activeTab, setActiveTab] = useState<'lessons' | 'assignments' | 'learners'>('lessons');
  const [selectedCourseSlug, setSelectedCourseSlug] = useState<string>('cinematography-filmmaking');

  // Lessons state
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [isCreatingLesson, setIsCreatingLesson] = useState(false);
  const [lessonForm, setLessonForm] = useState({
    title: '',
    moduleTitle: 'Module 1: Foundations & Technical Setup',
    youtubeUrl: '',
    description: '',
    durationMinutes: 30,
  });
  const [activePreviewVideoId, setActivePreviewVideoId] = useState<string | null>(null);

  // Assignments state
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [submissions, setSubmissions] = useState<AssignmentSubmission[]>([]);
  const [isCreatingAssignment, setIsCreatingAssignment] = useState(false);
  const [assignmentForm, setAssignmentForm] = useState({
    title: '',
    instructions: '',
    dueDate: new Date(Date.now() + 86400000 * 14).toISOString().split('T')[0],
    maxPoints: 100,
  });

  // Applications & Learners state
  const [applications, setApplications] = useState<ApplicationRecord[]>([]);
  const [learners, setLearners] = useState<EnrolledLearner[]>([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadDashboardData();
  }, [selectedCourseSlug]);

  const loadDashboardData = async () => {
    try {
      const [allLessons, allAssign, allSubs, allApps, allLearners] = await Promise.all([
        LMSService.getLessonsByCourse(selectedCourseSlug),
        LMSService.getAssignmentsByCourse(selectedCourseSlug),
        LMSService.getSubmissions(selectedCourseSlug),
        AdmissionsService.getAllApplications(),
        LMSService.getEnrolledLearners(),
      ]);
      setLessons(allLessons);
      setAssignments(allAssign);
      setSubmissions(allSubs);
      setApplications(allApps);
      setLearners(allLearners);
    } catch (e) {
      console.warn('Dashboard data fetch warning:', e);
    }
  };

  const handleCreateLesson = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!lessonForm.title.trim() || !lessonForm.youtubeUrl.trim()) return;
    setSaving(true);
    try {
      await LMSService.createLesson({
        courseSlug: selectedCourseSlug,
        moduleTitle: lessonForm.moduleTitle,
        title: lessonForm.title,
        youtubeUrl: lessonForm.youtubeUrl,
        description: lessonForm.description,
        durationMinutes: Number(lessonForm.durationMinutes) || 30,
        order: lessons.length + 1,
      });

      setLessonForm({
        title: '',
        moduleTitle: 'Module 1: Foundations & Technical Setup',
        youtubeUrl: '',
        description: '',
        durationMinutes: 30,
      });
      setIsCreatingLesson(false);
      const updated = await LMSService.getLessonsByCourse(selectedCourseSlug);
      setLessons(updated);
    } catch (e) {
      console.error('Create lesson failed:', e);
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteLesson = async (lessonId: string) => {
    if (!window.confirm('Are you sure you want to delete this lesson?')) return;
    await LMSService.deleteLesson(lessonId);
    setLessons((prev) => prev.filter((l) => l.id !== lessonId));
  };

  const handleCreateAssignment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!assignmentForm.title.trim() || !assignmentForm.instructions.trim()) return;
    setSaving(true);
    try {
      await LMSService.createAssignment({
        courseSlug: selectedCourseSlug,
        title: assignmentForm.title,
        instructions: assignmentForm.instructions,
        dueDate: assignmentForm.dueDate,
        maxPoints: Number(assignmentForm.maxPoints) || 100,
      });

      setAssignmentForm({
        title: '',
        instructions: '',
        dueDate: new Date(Date.now() + 86400000 * 14).toISOString().split('T')[0],
        maxPoints: 100,
      });
      setIsCreatingAssignment(false);
      const updated = await LMSService.getAssignmentsByCourse(selectedCourseSlug);
      setAssignments(updated);
    } catch (e) {
      console.error('Create assignment failed:', e);
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteAssignment = async (assignmentId: string) => {
    if (!window.confirm('Delete this assignment?')) return;
    await LMSService.deleteAssignment(assignmentId);
    setAssignments((prev) => prev.filter((a) => a.id !== assignmentId));
  };

  const selectedCourse = coursesData.find((c) => c.slug === selectedCourseSlug);

  return (
    <div className="bg-brand-light min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="bg-brand-black text-white rounded-2xl p-6 sm:p-10 border border-brand-border shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
          <div className="space-y-2 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-card text-[11px] font-bold text-brand-orange border border-brand-border uppercase tracking-wider">
              <span>ADMINISTRATIVE GOVERNANCE SUITE</span>
              <span>•</span>
              <span>ACADEMIC OPERATIONS</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Executive Console — {user?.displayName || 'Administrator'}
            </h1>
            <p className="text-xs sm:text-sm text-gray-300">
              Manage live course curricula, YouTube video lessons, student tasks, and student portal access.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 relative z-10">
            <Link
              to="/admin/admissions"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-brand-orange hover:bg-brand-orange-hover transition-colors shadow-brand-glow"
            >
              <Users className="w-4 h-4" />
              <span>Admissions Review Desk ({applications.filter((a) => a.status === 'submitted').length} Pending)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Live Operational Metrics (Zero placeholders) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold text-gray-400">Total Applicants</span>
              <div className="w-8 h-8 rounded-lg bg-orange-100/70 text-brand-orange flex items-center justify-center">
                <Users className="w-4 h-4" />
              </div>
            </div>
            <span className="text-3xl font-black text-brand-black block">{applications.length}</span>
            <Link
              to="/admin/admissions"
              className="text-xs font-bold text-brand-orange hover:underline inline-flex items-center gap-1"
            >
              <span>Review Admissions</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold text-gray-400">Approved Learners</span>
              <div className="w-8 h-8 rounded-lg bg-green-100 text-green-700 flex items-center justify-center">
                <TrendingUp className="w-4 h-4" />
              </div>
            </div>
            <span className="text-3xl font-black text-brand-black block">
              {learners.length || applications.filter((a) => a.status === 'accepted' || a.status === 'enrolled').length}
            </span>
            <span className="text-xs text-gray-500 font-medium block">Active in Portals</span>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold text-gray-400">Published Lessons</span>
              <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center">
                <Video className="w-4 h-4" />
              </div>
            </div>
            <span className="text-3xl font-black text-brand-black block">{lessons.length}</span>
            <span className="text-xs text-gray-500 font-medium block">In {selectedCourse?.title}</span>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold text-gray-400">Assignments & Tasks</span>
              <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center">
                <FileCheck className="w-4 h-4" />
              </div>
            </div>
            <span className="text-3xl font-black text-brand-black block">{assignments.length}</span>
            <span className="text-xs text-gray-500 font-medium block">{submissions.length} Submissions</span>
          </div>
        </div>

        {/* Global Course Selector */}
        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold uppercase text-gray-400">Active Course Curriculum:</span>
            <select
              value={selectedCourseSlug}
              onChange={(e) => setSelectedCourseSlug(e.target.value)}
              className="px-4 py-2 rounded-xl border border-gray-300 text-sm font-bold text-brand-black bg-white focus:outline-none focus:border-brand-orange"
            >
              {coursesData.map((c) => (
                <option key={c.slug} value={c.slug}>
                  {c.title} ({c.category.toUpperCase()})
                </option>
              ))}
            </select>
          </div>

          {/* Navigation Sub-Tabs */}
          <div className="flex border-b sm:border-b-0 space-x-2">
            <button
              onClick={() => setActiveTab('lessons')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'lessons'
                  ? 'bg-brand-black text-white shadow-sm'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Syllabus & Video Lessons ({lessons.length})
            </button>
            <button
              onClick={() => setActiveTab('assignments')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'assignments'
                  ? 'bg-brand-black text-white shadow-sm'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Assignments & Tasks ({assignments.length})
            </button>
            <button
              onClick={() => setActiveTab('learners')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'learners'
                  ? 'bg-brand-black text-white shadow-sm'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Online Learners ({learners.length})
            </button>
          </div>
        </div>

        {/* TAB 1: SYLLABUS & EMBEDDED YOUTUBE LESSONS */}
        {activeTab === 'lessons' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-brand-black">Course Syllabus & Lessons</h2>
                <p className="text-xs text-gray-500">
                  Publish YouTube video lessons for students enrolled in {selectedCourse?.title}.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsCreatingLesson(!isCreatingLesson)}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-brand-orange hover:bg-brand-orange-hover transition-colors shadow-sm"
              >
                <Plus className="w-4 h-4" />
                <span>{isCreatingLesson ? 'Close Creator' : 'Add New Video Lesson'}</span>
              </button>
            </div>

            {/* Video Lesson Creation Form */}
            {isCreatingLesson && (
              <form
                onSubmit={handleCreateLesson}
                className="bg-white p-6 rounded-2xl border-2 border-brand-orange/40 shadow-md space-y-4 animate-in fade-in"
              >
                <h3 className="text-base font-bold text-brand-black flex items-center gap-2">
                  <Video className="w-5 h-5 text-brand-orange" />
                  <span>Create New Video Lesson for {selectedCourse?.title}</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                      Module / Syllabus Topic *
                    </label>
                    <input
                      type="text"
                      required
                      value={lessonForm.moduleTitle}
                      onChange={(e) => setLessonForm({ ...lessonForm, moduleTitle: e.target.value })}
                      placeholder="e.g. Module 1: Camera Optics & Sensor Setup"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-xs focus:border-brand-orange focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                      Lesson Title *
                    </label>
                    <input
                      type="text"
                      required
                      value={lessonForm.title}
                      onChange={(e) => setLessonForm({ ...lessonForm, title: e.target.value })}
                      placeholder="e.g. Understanding Shutter Angle vs Shutter Speed"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-xs focus:border-brand-orange focus:outline-none"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                      YouTube Video URL * (Standard or Short Link)
                    </label>
                    <input
                      type="url"
                      required
                      value={lessonForm.youtubeUrl}
                      onChange={(e) => setLessonForm({ ...lessonForm, youtubeUrl: e.target.value })}
                      placeholder="https://www.youtube.com/watch?v=... or https://youtu.be/..."
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-xs focus:border-brand-orange focus:outline-none font-mono"
                    />
                    <span className="text-[10px] text-gray-400 mt-1 block">
                      The video will be cleanly embedded directly inside the Student Learning Portal.
                    </span>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                      Lesson Duration (Minutes)
                    </label>
                    <input
                      type="number"
                      value={lessonForm.durationMinutes}
                      onChange={(e) => setLessonForm({ ...lessonForm, durationMinutes: Number(e.target.value) })}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-xs focus:border-brand-orange focus:outline-none"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                      Lesson Guide & Summary Notes
                    </label>
                    <textarea
                      rows={3}
                      value={lessonForm.description}
                      onChange={(e) => setLessonForm({ ...lessonForm, description: e.target.value })}
                      placeholder="Key takeaways, equipment recommendations, or timestamps..."
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-xs focus:border-brand-orange focus:outline-none"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsCreatingLesson(false)}
                    className="px-4 py-2 text-xs font-bold text-gray-500 hover:text-brand-black"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-brand-orange hover:bg-brand-orange-hover shadow-md transition-colors disabled:opacity-70"
                  >
                    {saving ? 'Publishing...' : 'Publish Video Lesson'}
                  </button>
                </div>
              </form>
            )}

            {/* Embedded Video Player Modal (Active Preview) */}
            {activePreviewVideoId && (
              <div className="bg-brand-black text-white p-6 rounded-2xl border border-gray-800 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-brand-orange flex items-center gap-2">
                    <Play className="w-4 h-4" />
                    <span>Embedded Video Lesson Player</span>
                  </span>
                  <button
                    onClick={() => setActivePreviewVideoId(null)}
                    className="text-xs text-gray-400 hover:text-white uppercase font-bold"
                  >
                    Close Player ✕
                  </button>
                </div>
                <div className="aspect-video w-full rounded-xl overflow-hidden bg-black shadow-2xl border border-gray-800">
                  <iframe
                    src={`https://www.youtube.com/embed/${activePreviewVideoId}?autoplay=1&rel=0`}
                    title="Embedded Lesson"
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            )}

            {/* Existing Lessons List */}
            {lessons.length === 0 ? (
              <div className="bg-white p-12 rounded-2xl border border-gray-200 text-center space-y-3">
                <Video className="w-10 h-10 text-gray-300 mx-auto" />
                <h3 className="text-base font-bold text-brand-black">No Lessons Published Yet</h3>
                <p className="text-xs text-gray-500 max-w-sm mx-auto">
                  Click "Add New Video Lesson" above to add the first YouTube video lesson to the syllabus for {selectedCourse?.title}.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {lessons.map((lesson) => (
                  <div
                    key={lesson.id}
                    className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4"
                  >
                    <div className="space-y-1.5 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-brand-light text-brand-orange border border-gray-200">
                          {lesson.moduleTitle}
                        </span>
                        <span className="text-xs text-gray-400 flex items-center gap-1 font-medium">
                          <Clock className="w-3 h-3" /> {lesson.durationMinutes} mins
                        </span>
                      </div>
                      <h4 className="text-base font-bold text-brand-black">{lesson.title}</h4>
                      <p className="text-xs text-gray-500 leading-relaxed max-w-2xl">
                        {lesson.description || 'Comprehensive practical demonstration and guided techniques.'}
                      </p>
                      <span className="font-mono text-[10px] text-gray-400 block truncate max-w-md">
                        {lesson.youtubeUrl}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={() => setActivePreviewVideoId(lesson.youtubeVideoId || extractYouTubeId(lesson.youtubeUrl))}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-brand-black hover:bg-gray-800 transition-colors shadow-sm"
                      >
                        <Play className="w-3.5 h-3.5 text-brand-orange" />
                        <span>Play Video</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDeleteLesson(lesson.id)}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                        title="Delete lesson"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: ASSIGNMENTS & TASKS */}
        {activeTab === 'assignments' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-brand-black">Assignments & Student Tasks</h2>
                <p className="text-xs text-gray-500">
                  Create practical briefs, set submission deadlines, and track learner projects for {selectedCourse?.title}.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsCreatingAssignment(!isCreatingAssignment)}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-brand-orange hover:bg-brand-orange-hover transition-colors shadow-sm"
              >
                <Plus className="w-4 h-4" />
                <span>{isCreatingAssignment ? 'Close Form' : 'Create Assignment Brief'}</span>
              </button>
            </div>

            {/* Assignment Creation Form */}
            {isCreatingAssignment && (
              <form
                onSubmit={handleCreateAssignment}
                className="bg-white p-6 rounded-2xl border-2 border-brand-orange/40 shadow-md space-y-4 animate-in fade-in"
              >
                <h3 className="text-base font-bold text-brand-black flex items-center gap-2">
                  <FileCheck className="w-5 h-5 text-brand-orange" />
                  <span>New Practical Assignment Brief</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                      Assignment Title *
                    </label>
                    <input
                      type="text"
                      required
                      value={assignmentForm.title}
                      onChange={(e) => setAssignmentForm({ ...assignmentForm, title: e.target.value })}
                      placeholder="e.g. 15-Second Cinematic Lighting Sequence"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-xs focus:border-brand-orange focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                      Due Date *
                    </label>
                    <input
                      type="date"
                      required
                      value={assignmentForm.dueDate}
                      onChange={(e) => setAssignmentForm({ ...assignmentForm, dueDate: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-xs focus:border-brand-orange focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                      Max Score (Points)
                    </label>
                    <input
                      type="number"
                      value={assignmentForm.maxPoints}
                      onChange={(e) => setAssignmentForm({ ...assignmentForm, maxPoints: Number(e.target.value) })}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-xs focus:border-brand-orange focus:outline-none"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                      Instructions & Deliverables
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={assignmentForm.instructions}
                      onChange={(e) => setAssignmentForm({ ...assignmentForm, instructions: e.target.value })}
                      placeholder="Describe what the student must produce, camera settings required, and submission format (e.g. YouTube unlisted link or Google Drive)..."
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-xs focus:border-brand-orange focus:outline-none"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsCreatingAssignment(false)}
                    className="px-4 py-2 text-xs font-bold text-gray-500 hover:text-brand-black"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-brand-orange hover:bg-brand-orange-hover shadow-md transition-colors disabled:opacity-70"
                  >
                    {saving ? 'Publishing...' : 'Publish Assignment'}
                  </button>
                </div>
              </form>
            )}

            {/* Assignments List */}
            {assignments.length === 0 ? (
              <div className="bg-white p-12 rounded-2xl border border-gray-200 text-center space-y-3">
                <FileCheck className="w-10 h-10 text-gray-300 mx-auto" />
                <h3 className="text-base font-bold text-brand-black">No Assignments Created</h3>
                <p className="text-xs text-gray-500 max-w-sm mx-auto">
                  Click "Create Assignment Brief" above to publish a practical assignment for students in this course.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {assignments.map((assign) => (
                  <div
                    key={assign.id}
                    className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-3"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-purple-50 text-purple-700 border border-purple-200">
                            Practical Brief
                          </span>
                          <span className="text-xs text-red-600 font-bold">
                            Due: {new Date(assign.dueDate).toLocaleDateString()}
                          </span>
                          <span className="text-xs text-gray-400 font-medium">
                            {assign.maxPoints} Points
                          </span>
                        </div>
                        <h4 className="text-base font-bold text-brand-black mt-1">{assign.title}</h4>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleDeleteAssignment(assign.id)}
                        className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete assignment"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <p className="text-xs text-gray-600 leading-relaxed bg-gray-50 p-3.5 rounded-xl border border-gray-100">
                      {assign.instructions}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: ONLINE LEARNERS & ADMISSIONS OVERSIGHT */}
        {activeTab === 'learners' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-brand-black">Approved Online Learners</h2>
                <p className="text-xs text-gray-500">
                  Roster of students with approved dedicated login credentials into the Student Learning Portal.
                </p>
              </div>

              <Link
                to="/admin/admissions"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-brand-orange hover:bg-brand-orange-hover transition-colors shadow-sm"
              >
                <Users className="w-4 h-4" />
                <span>Go to Admissions Review Desk</span>
              </Link>
            </div>

            {learners.length === 0 ? (
              <div className="bg-white p-12 rounded-2xl border border-gray-200 text-center space-y-3">
                <Users className="w-10 h-10 text-gray-300 mx-auto" />
                <h3 className="text-base font-bold text-brand-black">No Enrolled Learners Found</h3>
                <p className="text-xs text-gray-500 max-w-sm mx-auto">
                  When you approve applicant submissions in the Admissions Review Desk, their dedicated portal logins will appear here automatically.
                </p>
                <Link
                  to="/admin/admissions"
                  className="inline-block mt-2 text-xs font-bold text-brand-orange hover:underline"
                >
                  Open Admissions Desk &rarr;
                </Link>
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-gray-50 border-b border-gray-200 text-gray-400 uppercase font-bold text-[10px]">
                      <tr>
                        <th className="px-6 py-4">Student Name</th>
                        <th className="px-6 py-4">Portal Login Email</th>
                        <th className="px-6 py-4">Enrolled Program</th>
                        <th className="px-6 py-4">Track Duration</th>
                        <th className="px-6 py-4">Account Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {learners.map((learner) => (
                        <tr key={learner.uid} className="hover:bg-gray-50/70 transition-colors">
                          <td className="px-6 py-4 font-bold text-brand-black">
                            {learner.displayName}
                          </td>
                          <td className="px-6 py-4 font-mono text-gray-600">
                            {learner.email}
                          </td>
                          <td className="px-6 py-4 capitalize font-semibold text-brand-orange">
                            {learner.enrolledCourse.replace(/-/g, ' ')}
                          </td>
                          <td className="px-6 py-4 text-gray-500">
                            {learner.selectedDuration || '3 Months (Standard)'}
                          </td>
                          <td className="px-6 py-4">
                            <span className="inline-flex items-center gap-1 font-bold text-[10px] uppercase px-2.5 py-0.5 rounded-full bg-green-100 text-green-800">
                              <CheckCircle2 className="w-3 h-3" />
                              <span>Active Learner</span>
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
