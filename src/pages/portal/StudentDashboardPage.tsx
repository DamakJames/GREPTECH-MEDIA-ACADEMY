import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  BookOpen,
  Calendar,
  CheckCircle2,
  Clock,
  FileText,
  Award,
  Video,
  ExternalLink,
  Play,
  Send,
  AlertCircle,
  Sparkles,
  Check,
  ChevronRight,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { coursesData } from '../../data/courses';
import {
  LMSService,
  Lesson,
  Assignment,
  AssignmentSubmission,
} from '../../services/lms.service';

export const StudentDashboardPage: React.FC = () => {
  const { user } = useAuth();

  const enrolledCourseSlug = user?.enrolledCourse || 'cinematography-filmmaking';
  const enrolledCourse = coursesData.find((c) => c.slug === enrolledCourseSlug) || coursesData[0];

  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [submissions, setSubmissions] = useState<AssignmentSubmission[]>([]);
  const [loading, setLoading] = useState(true);

  // Assignment submission modal/drawer state
  const [activeAssignmentToSubmit, setActiveAssignmentToSubmit] = useState<Assignment | null>(null);
  const [submissionLink, setSubmissionLink] = useState('');
  const [submissionNotes, setSubmissionNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);

  useEffect(() => {
    loadCourseContent();
  }, [enrolledCourseSlug, user?.email]);

  const loadCourseContent = async () => {
    setLoading(true);
    try {
      const [fetchedLessons, fetchedAssignments, allSubmissions] = await Promise.all([
        LMSService.getLessonsByCourse(enrolledCourseSlug),
        LMSService.getAssignmentsByCourse(enrolledCourseSlug),
        LMSService.getSubmissions(enrolledCourseSlug),
      ]);

      setLessons(fetchedLessons);
      if (fetchedLessons.length > 0) {
        setSelectedLesson(fetchedLessons[0]);
      }
      setAssignments(fetchedAssignments);

      // Filter submissions for this specific student if user email is present
      const studentSubs = allSubmissions.filter(
        (s) => s.studentEmail.toLowerCase() === (user?.email || '').toLowerCase()
      );
      setSubmissions(studentSubs);
    } catch (err) {
      console.warn('Failed to load student course content:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenSubmitModal = (assignment: Assignment) => {
    setActiveAssignmentToSubmit(assignment);
    setSubmissionLink('');
    setSubmissionNotes('');
    setSubmissionSuccess(false);
  };

  const handleSubmitTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeAssignmentToSubmit || !submissionLink.trim()) return;

    setIsSubmitting(true);
    try {
      const newSub = await LMSService.submitAssignment({
        assignmentId: activeAssignmentToSubmit.id,
        assignmentTitle: activeAssignmentToSubmit.title,
        courseSlug: enrolledCourseSlug,
        studentEmail: user?.email || 'student@greptechacademy.com',
        studentName: user?.displayName || 'Enrolled Student',
        submissionLink: submissionLink.trim(),
        notes: submissionNotes.trim(),
      });

      setSubmissions((prev) => [newSub, ...prev.filter((s) => s.assignmentId !== activeAssignmentToSubmit.id)]);
      setSubmissionSuccess(true);
      setTimeout(() => {
        setActiveAssignmentToSubmit(null);
        setSubmissionSuccess(false);
      }, 1800);
    } catch (err) {
      console.error('Assignment submission error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getSubmissionForAssignment = (assignmentId: string) => {
    return submissions.find((s) => s.assignmentId === assignmentId);
  };

  return (
    <div className="bg-brand-light min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Welcome Header */}
        <div className="bg-brand-black text-white rounded-2xl p-6 sm:p-10 border border-brand-border shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
          <div className="space-y-2 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-card text-[11px] font-bold text-brand-orange border border-brand-border uppercase tracking-wider">
              <span>ONLINE LEARNING PORTAL</span>
              <span>•</span>
              <span>ACTIVE COHORT 2026</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Welcome back, {user?.displayName || 'Student'}
            </h1>
            <p className="text-xs sm:text-sm text-gray-300">
              Enrolled Course:{' '}
              <span className="font-bold text-brand-orange">{enrolledCourse.title}</span>
            </p>
          </div>

          <div className="flex flex-wrap gap-3 relative z-10">
            <Link
              to={`/courses/${enrolledCourse.slug}`}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-brand-card hover:bg-brand-border border border-brand-border transition-colors"
            >
              <span>Full Curriculum</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>

            <Link
              to="/certificate/verify/GMA-SAMPLE-2026"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-brand-orange hover:bg-brand-orange-hover transition-colors shadow-brand-glow"
            >
              <Award className="w-4 h-4" />
              <span>Certificate Status</span>
            </Link>
          </div>
        </div>

        {/* Real Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm space-y-2">
            <span className="text-[10px] uppercase font-bold text-gray-400">Video Lessons</span>
            <div className="flex items-baseline justify-between">
              <span className="text-2xl font-black text-brand-black">{lessons.length}</span>
              <span className="text-xs text-brand-orange font-bold">Curriculum Lessons</span>
            </div>
            <span className="text-[11px] text-gray-500 block">Available in your program</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm space-y-2">
            <span className="text-[10px] uppercase font-bold text-gray-400">Assigned Tasks</span>
            <div className="flex items-baseline justify-between">
              <span className="text-2xl font-black text-brand-black">{assignments.length}</span>
              <span className="text-xs text-blue-600 font-bold">Total Tasks</span>
            </div>
            <span className="text-[11px] text-gray-500 block">Set by Academy Instructors</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm space-y-2">
            <span className="text-[10px] uppercase font-bold text-gray-400">Tasks Submitted</span>
            <div className="flex items-baseline justify-between">
              <span className="text-2xl font-black text-green-600">{submissions.length}</span>
              <span className="text-xs text-gray-500 font-medium">Of {assignments.length} Total</span>
            </div>
            <span className="text-[11px] text-gray-400 block">
              {submissions.filter((s) => s.status === 'graded').length} Graded Reviews
            </span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm space-y-2">
            <span className="text-[10px] uppercase font-bold text-gray-400">Academic Standing</span>
            <div className="flex items-baseline justify-between">
              <span className="text-2xl font-black text-brand-black">Active</span>
              <span className="text-xs text-green-600 font-bold">Good Standing</span>
            </div>
            <span className="text-[11px] text-gray-500 block">Access granted through 2026</span>
          </div>
        </div>

        {/* LMS Core: Video Player & Lessons Browser */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Video Player & Lesson Overview */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8 space-y-5">
              <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                <div className="flex items-center gap-2">
                  <Video className="w-5 h-5 text-brand-orange" />
                  <h2 className="text-lg font-bold text-brand-black">Interactive Video Classroom</h2>
                </div>
                {selectedLesson && (
                  <span className="text-xs font-semibold px-2.5 py-1 rounded bg-orange-50 text-brand-orange border border-orange-200">
                    {selectedLesson.durationMinutes} mins
                  </span>
                )}
              </div>

              {selectedLesson ? (
                <div className="space-y-4">
                  {/* Embedded YouTube Player */}
                  <div className="relative aspect-video rounded-2xl overflow-hidden bg-black shadow-lg border border-gray-800">
                    <iframe
                      src={`https://www.youtube.com/embed/${selectedLesson.youtubeVideoId}?autoplay=0&rel=0`}
                      title={selectedLesson.title}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>

                  {/* Lesson Meta */}
                  <div className="space-y-2 pt-2">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-brand-orange bg-orange-50 px-2.5 py-1 rounded">
                        {selectedLesson.moduleTitle}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-brand-black">{selectedLesson.title}</h3>
                    {selectedLesson.description && (
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {selectedLesson.description}
                      </p>
                    )}
                  </div>
                </div>
              ) : (
                <div className="p-12 text-center border-2 border-dashed border-gray-200 rounded-2xl space-y-3">
                  <Video className="w-10 h-10 text-gray-400 mx-auto" />
                  <h4 className="text-base font-bold text-gray-700">No Video Lessons Available</h4>
                  <p className="text-xs text-gray-500 max-w-md mx-auto">
                    The academy instructor will be uploading lessons and study material for this course shortly.
                  </p>
                </div>
              )}
            </div>

            {/* Assignments & Tasks Section */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-brand-orange" />
                  <h2 className="text-lg font-bold text-brand-black">Course Assignments & Tasks</h2>
                </div>
                <span className="text-xs text-gray-500 font-medium">
                  {assignments.length} Task{assignments.length === 1 ? '' : 's'}
                </span>
              </div>

              {assignments.length === 0 ? (
                <p className="text-xs text-gray-500 italic py-4">
                  No active assignments currently assigned for this program.
                </p>
              ) : (
                <div className="space-y-4">
                  {assignments.map((assignment) => {
                    const submission = getSubmissionForAssignment(assignment.id);
                    return (
                      <div
                        key={assignment.id}
                        className="p-5 rounded-2xl border border-gray-200 bg-gray-50/70 space-y-3 hover:border-gray-300 transition-colors"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <h4 className="text-sm font-bold text-brand-black">{assignment.title}</h4>
                          <div className="flex items-center gap-2">
                            <span className="text-[11px] font-semibold text-gray-500 flex items-center gap-1">
                              <Calendar className="w-3.5 h-3.5 text-brand-orange" />
                              <span>Due {assignment.dueDate}</span>
                            </span>
                            <span className="text-[11px] font-bold text-gray-700 bg-gray-200/80 px-2 py-0.5 rounded">
                              {assignment.maxPoints} pts
                            </span>
                          </div>
                        </div>

                        <p className="text-xs text-gray-600 leading-relaxed whitespace-pre-wrap">
                          {assignment.instructions}
                        </p>

                        <div className="pt-2 border-t border-gray-200/80 flex flex-wrap items-center justify-between gap-3">
                          {submission ? (
                            <div className="space-y-1 w-full bg-white p-3 rounded-xl border border-gray-200">
                              <div className="flex items-center justify-between">
                                <span className="inline-flex items-center gap-1 text-xs font-bold text-green-700">
                                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                                  <span>Task Submitted</span>
                                </span>
                                <span className="text-[10px] text-gray-400">
                                  {new Date(submission.submittedAt).toLocaleDateString()}
                                </span>
                              </div>
                              <div className="text-xs">
                                <span className="text-gray-500">Submission Link: </span>
                                <a
                                  href={submission.submissionLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-brand-orange font-bold hover:underline inline-flex items-center gap-1"
                                >
                                  <span>View Project Link</span>
                                  <ExternalLink className="w-3 h-3" />
                                </a>
                              </div>
                              {submission.status === 'graded' ? (
                                <div className="mt-2 pt-2 border-t border-gray-100 flex items-center justify-between">
                                  <div>
                                    <span className="text-xs font-bold text-brand-black">Instructor Grade: </span>
                                    <span className="text-xs font-black text-brand-orange">
                                      {submission.grade} / {assignment.maxPoints}
                                    </span>
                                  </div>
                                  {submission.feedback && (
                                    <p className="text-[11px] text-gray-600 italic">
                                      "{submission.feedback}"
                                    </p>
                                  )}
                                </div>
                              ) : (
                                <span className="text-[10px] text-orange-600 font-semibold block pt-1">
                                  Pending Instructor Review & Grading
                                </span>
                              )}
                            </div>
                          ) : (
                            <button
                              type="button"
                              onClick={() => handleOpenSubmitModal(assignment)}
                              className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-brand-black hover:bg-gray-800 transition-colors inline-flex items-center gap-2 shadow-sm"
                            >
                              <FileText className="w-4 h-4 text-brand-orange" />
                              <span>Submit Your Work</span>
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Lessons Playlist & Curriculum Browser */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <h3 className="text-sm font-bold text-brand-black flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-brand-orange" />
                  <span>Curriculum Playlist ({lessons.length})</span>
                </h3>
              </div>

              {lessons.length === 0 ? (
                <p className="text-xs text-gray-400 italic">No video lessons listed.</p>
              ) : (
                <div className="space-y-2.5 max-h-[600px] overflow-y-auto pr-1">
                  {lessons.map((lesson, idx) => {
                    const isSelected = selectedLesson?.id === lesson.id;
                    return (
                      <button
                        key={lesson.id}
                        type="button"
                        onClick={() => setSelectedLesson(lesson)}
                        className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-start gap-3 ${
                          isSelected
                            ? 'bg-orange-50/80 border-brand-orange shadow-sm'
                            : 'bg-white hover:bg-gray-50 border-gray-200'
                        }`}
                      >
                        <div
                          className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                            isSelected
                              ? 'bg-brand-orange text-white'
                              : 'bg-gray-100 text-gray-500'
                          }`}
                        >
                          <Play className="w-3.5 h-3.5 fill-current" />
                        </div>

                        <div className="flex-1 min-w-0">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-brand-orange block truncate">
                            {lesson.moduleTitle}
                          </span>
                          <h4
                            className={`text-xs font-bold leading-snug truncate ${
                              isSelected ? 'text-brand-black' : 'text-gray-800'
                            }`}
                          >
                            {idx + 1}. {lesson.title}
                          </h4>
                          <span className="text-[10px] text-gray-400 block mt-0.5">
                            {lesson.durationMinutes} minutes
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Academic Guidance Support Card */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-3">
              <h4 className="text-xs font-bold uppercase text-brand-orange tracking-wider">
                Studio Mentorship & Lab
              </h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                Need direct feedback on camera rigs, lighting ratios, or editing suites? In-person lab sessions are scheduled weekly at our production studio.
              </p>
              <div className="p-3 rounded-xl bg-brand-light border border-gray-100 text-[11px] text-gray-700 space-y-1">
                <span className="font-bold text-brand-black block">Studio Support WhatsApp</span>
                <span>+234 814 620 5410</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Task Submission Modal */}
      {activeAssignmentToSubmit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 space-y-5 shadow-2xl border border-gray-200 animate-in fade-in zoom-in-95">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-brand-orange">
                  Submit Project Task
                </span>
                <h3 className="text-base font-bold text-brand-black mt-1">
                  {activeAssignmentToSubmit.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveAssignmentToSubmit(null)}
                className="text-gray-400 hover:text-gray-600 text-lg leading-none p-1"
              >
                ✕
              </button>
            </div>

            {submissionSuccess ? (
              <div className="p-6 text-center space-y-2 bg-green-50 rounded-xl border border-green-200">
                <CheckCircle2 className="w-10 h-10 text-green-600 mx-auto" />
                <h4 className="text-sm font-bold text-green-900">Task Successfully Submitted!</h4>
                <p className="text-xs text-green-700">
                  Your instructor has received your submission and will review your project shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmitTask} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Project File / Cloud Link <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="url"
                    required
                    value={submissionLink}
                    onChange={(e) => setSubmissionLink(e.target.value)}
                    placeholder="https://drive.google.com/... or https://youtu.be/..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-brand-orange"
                  />
                  <span className="text-[10px] text-gray-400 mt-1 block">
                    Paste Google Drive, YouTube (unlisted), Vimeo, Figma, or Dropbox link.
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Notes or Explanations for Instructor
                  </label>
                  <textarea
                    rows={3}
                    value={submissionNotes}
                    onChange={(e) => setSubmissionNotes(e.target.value)}
                    placeholder="Describe your camera settings, lighting setup, or software used..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-brand-orange"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setActiveAssignmentToSubmit(null)}
                    className="px-4 py-2.5 rounded-xl text-xs font-semibold text-gray-600 hover:bg-gray-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-brand-orange hover:bg-brand-orange-hover transition-colors shadow-brand-glow flex items-center gap-2"
                  >
                    {isSubmitting ? (
                      <span>Submitting...</span>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Submit Project</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};