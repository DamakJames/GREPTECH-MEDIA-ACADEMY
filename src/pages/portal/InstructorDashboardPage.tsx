import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Users,
  CheckSquare,
  Clock,
  BookOpen,
  Calendar,
  Award,
  ArrowRight,
  ExternalLink,
  Video,
  FileCheck,
  CheckCircle2,
  Send,
  MessageSquare,
  GraduationCap,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { coursesData } from '../../data/courses';
import {
  LMSService,
  Lesson,
  Assignment,
  AssignmentSubmission,
  EnrolledLearner,
} from '../../services/lms.service';

export const InstructorDashboardPage: React.FC = () => {
  const { user } = useAuth();

  const [selectedCourseSlug, setSelectedCourseSlug] = useState<string>('cinematography-filmmaking');
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [submissions, setSubmissions] = useState<AssignmentSubmission[]>([]);
  const [learners, setLearners] = useState<EnrolledLearner[]>([]);
  const [loading, setLoading] = useState(true);

  // Grading modal state
  const [selectedSubmissionToGrade, setSelectedSubmissionToGrade] = useState<AssignmentSubmission | null>(null);
  const [gradeInput, setGradeInput] = useState<number>(85);
  const [feedbackInput, setFeedbackInput] = useState<string>('');
  const [isGrading, setIsGrading] = useState<boolean>(false);

  useEffect(() => {
    loadInstructorData();
  }, [selectedCourseSlug]);

  const loadInstructorData = async () => {
    setLoading(true);
    try {
      const [fetchedLessons, fetchedAssignments, fetchedSubs, allLearners] = await Promise.all([
        LMSService.getLessonsByCourse(selectedCourseSlug),
        LMSService.getAssignmentsByCourse(selectedCourseSlug),
        LMSService.getSubmissions(selectedCourseSlug),
        LMSService.getEnrolledLearners(),
      ]);

      setLessons(fetchedLessons);
      setAssignments(fetchedAssignments);
      setSubmissions(fetchedSubs);
      setLearners(allLearners.filter((l) => !selectedCourseSlug || l.enrolledCourse === selectedCourseSlug));
    } catch (e) {
      console.warn('Instructor data load error:', e);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenGradeModal = (sub: AssignmentSubmission) => {
    setSelectedSubmissionToGrade(sub);
    setGradeInput(sub.grade || 85);
    setFeedbackInput(sub.feedback || 'Great work on this task!');
  };

  const handleSaveGrade = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSubmissionToGrade) return;

    setIsGrading(true);
    try {
      await LMSService.gradeSubmission(
        selectedSubmissionToGrade.id,
        Number(gradeInput),
        feedbackInput.trim()
      );

      // Refresh submissions
      const updated = await LMSService.getSubmissions(selectedCourseSlug);
      setSubmissions(updated);
      setSelectedSubmissionToGrade(null);
    } catch (e) {
      console.error('Failed to grade submission:', e);
    } finally {
      setIsGrading(false);
    }
  };

  const selectedCourse = coursesData.find((c) => c.slug === selectedCourseSlug);
  const pendingSubmissions = submissions.filter((s) => s.status === 'submitted');
  const gradedSubmissions = submissions.filter((s) => s.status === 'graded');

  return (
    <div className="bg-brand-light min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Welcome Header */}
        <div className="bg-brand-black text-white rounded-2xl p-6 sm:p-10 border border-brand-border shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
          <div className="space-y-2 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-card text-[11px] font-bold text-brand-orange border border-brand-border uppercase tracking-wider">
              <span>FACULTY MENTOR WORKBENCH</span>
              <span>•</span>
              <span>ACADEMIC SESSION 2026</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Instructor Desk — {user?.displayName || 'Faculty Member'}
            </h1>
            <p className="text-xs sm:text-sm text-gray-300">
              Department: Creative Media & Visual Arts • Practical Studio Mentor
            </p>
          </div>

          <div className="flex flex-wrap gap-3 relative z-10">
            <Link
              to="/admin/dashboard"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-brand-card hover:bg-brand-border border border-brand-border transition-colors"
            >
              <span>Admin Console</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Course Filter Bar */}
        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-brand-orange" />
            <span className="text-xs font-bold text-brand-black uppercase tracking-wider">
              Select Assigned Program:
            </span>
          </div>

          <select
            value={selectedCourseSlug}
            onChange={(e) => setSelectedCourseSlug(e.target.value)}
            className="px-4 py-2 rounded-xl border border-gray-200 text-xs font-bold text-brand-black focus:outline-none focus:border-brand-orange bg-gray-50/50"
          >
            {coursesData.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.title}
              </option>
            ))}
          </select>
        </div>

        {/* Live Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm space-y-2">
            <span className="text-[10px] uppercase font-bold text-gray-400">Course Learners</span>
            <div className="flex items-baseline justify-between">
              <span className="text-2xl font-black text-brand-black">{learners.length}</span>
              <span className="text-xs text-brand-orange font-bold">Enrolled</span>
            </div>
            <span className="text-[11px] text-gray-500 block">Active students in this track</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm space-y-2">
            <span className="text-[10px] uppercase font-bold text-gray-400">Pending Review</span>
            <div className="flex items-baseline justify-between">
              <span className="text-2xl font-black text-brand-orange">{pendingSubmissions.length}</span>
              <span className="text-xs text-orange-600 font-bold">Needs Feedback</span>
            </div>
            <span className="text-[11px] text-gray-500 block">Awaiting evaluation</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm space-y-2">
            <span className="text-[10px] uppercase font-bold text-gray-400">Graded Submissions</span>
            <div className="flex items-baseline justify-between">
              <span className="text-2xl font-black text-green-600">{gradedSubmissions.length}</span>
              <span className="text-xs text-gray-500 font-medium">Completed</span>
            </div>
            <span className="text-[11px] text-gray-500 block">Marks & feedback released</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm space-y-2">
            <span className="text-[10px] uppercase font-bold text-gray-400">Video Lessons</span>
            <div className="flex items-baseline justify-between">
              <span className="text-2xl font-black text-brand-black">{lessons.length}</span>
              <span className="text-xs text-blue-600 font-bold">Curriculum</span>
            </div>
            <span className="text-[11px] text-gray-500 block">Live on student portal</span>
          </div>
        </div>

        {/* Workbench: Submissions & Enrolled Learners */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Submissions to Grade */}
          <div className="lg:col-span-8 bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <div className="flex items-center gap-2">
                <CheckSquare className="w-5 h-5 text-brand-orange" />
                <h2 className="text-lg font-bold text-brand-black">Student Task Submissions</h2>
              </div>
              <span className="text-xs text-brand-orange font-bold">
                {submissions.length} Total Submissions
              </span>
            </div>

            {submissions.length === 0 ? (
              <div className="p-8 text-center border-2 border-dashed border-gray-200 rounded-xl space-y-2">
                <CheckSquare className="w-8 h-8 text-gray-400 mx-auto" />
                <p className="text-xs text-gray-500 font-medium">
                  No submissions have been submitted by learners for {selectedCourse?.title} yet.
                </p>
              </div>
            ) : (
              <div className="space-y-3.5">
                {submissions.map((sub) => (
                  <div
                    key={sub.id}
                    className="p-5 rounded-xl border border-gray-200 bg-gray-50/70 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-colors hover:border-gray-300"
                  >
                    <div className="space-y-1.5 flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-bold text-brand-black">{sub.studentName}</h4>
                        <span className="text-[10px] text-gray-400">({sub.studentEmail})</span>
                        {sub.status === 'graded' ? (
                          <span className="text-[10px] font-bold text-green-700 bg-green-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" />
                            <span>Score: {sub.grade} pts</span>
                          </span>
                        ) : (
                          <span className="text-[10px] font-bold text-orange-700 bg-orange-100 px-2 py-0.5 rounded-full">
                            Pending Review
                          </span>
                        )}
                      </div>

                      <p className="text-xs font-semibold text-gray-700">{sub.assignmentTitle}</p>

                      {sub.notes && (
                        <p className="text-xs text-gray-500 italic bg-white p-2.5 rounded-lg border border-gray-200/70">
                          "{sub.notes}"
                        </p>
                      )}

                      <div className="flex items-center gap-3 pt-1 text-xs">
                        <a
                          href={sub.submissionLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-brand-orange font-bold hover:underline inline-flex items-center gap-1"
                        >
                          <span>Open Student Submission Link</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                        <span className="text-gray-400 text-[11px]">
                          Submitted: {new Date(sub.submittedAt).toLocaleString()}
                        </span>
                      </div>

                      {sub.feedback && (
                        <div className="text-[11px] text-gray-600 bg-gray-100/80 p-2 rounded">
                          <span className="font-bold text-gray-700">Your Feedback: </span>
                          {sub.feedback}
                        </div>
                      )}
                    </div>

                    <div className="shrink-0 flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleOpenGradeModal(sub)}
                        className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-brand-orange hover:bg-brand-orange-hover transition-colors shadow-sm"
                      >
                        {sub.status === 'graded' ? 'Update Grade' : 'Grade & Review'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Learners in Course */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-4">
              <h3 className="text-sm font-bold text-brand-black flex items-center gap-2 border-b border-gray-100 pb-3">
                <Users className="w-4 h-4 text-brand-orange" />
                <span>Enrolled Learners ({learners.length})</span>
              </h3>

              {learners.length === 0 ? (
                <p className="text-xs text-gray-400 italic">No approved students enrolled yet.</p>
              ) : (
                <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1">
                  {learners.map((learner) => (
                    <div
                      key={learner.uid}
                      className="p-3 rounded-xl bg-gray-50 border border-gray-200 space-y-1"
                    >
                      <span className="text-xs font-bold text-brand-black block">
                        {learner.displayName}
                      </span>
                      <span className="text-[11px] text-gray-500 block truncate">
                        {learner.email}
                      </span>
                      <div className="flex items-center justify-between text-[10px] text-gray-400 pt-1 border-t border-gray-100">
                        <span>Duration: {learner.selectedDuration || 'Standard'}</span>
                        <span className="text-green-600 font-bold">Active</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Link to Admin Console */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-3">
              <h4 className="text-xs font-bold uppercase text-brand-orange tracking-wider">
                Curriculum & Syllabus Setup
              </h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                Add new YouTube video lessons or set homework assignments from the centralized Admin Console.
              </p>
              <Link
                to="/admin/dashboard"
                className="w-full py-2.5 rounded-xl text-xs font-bold text-white bg-brand-black hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                <span>Open Admin LMS Console</span>
                <ArrowRight className="w-4 h-4 text-brand-orange" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Grade & Feedback Modal */}
      {selectedSubmissionToGrade && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-5 shadow-2xl border border-gray-200 animate-in fade-in zoom-in-95">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-brand-orange">
                  Grade Student Submission
                </span>
                <h3 className="text-base font-bold text-brand-black mt-1">
                  {selectedSubmissionToGrade.studentName}
                </h3>
                <p className="text-xs text-gray-500">
                  {selectedSubmissionToGrade.assignmentTitle}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedSubmissionToGrade(null)}
                className="text-gray-400 hover:text-gray-600 text-lg leading-none p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveGrade} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Awarded Score / Points (Out of 100) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  min={0}
                  max={100}
                  required
                  value={gradeInput}
                  onChange={(e) => setGradeInput(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-brand-orange font-bold text-brand-black"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Instructor Feedback & Guidance
                </label>
                <textarea
                  rows={3}
                  value={feedbackInput}
                  onChange={(e) => setFeedbackInput(e.target.value)}
                  placeholder="Feedback on composition, lighting, technique, and areas to improve..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-brand-orange"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedSubmissionToGrade(null)}
                  className="px-4 py-2.5 rounded-xl text-xs font-semibold text-gray-600 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isGrading}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-brand-orange hover:bg-brand-orange-hover transition-colors shadow-brand-glow flex items-center gap-2"
                >
                  {isGrading ? (
                    <span>Saving...</span>
                  ) : (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Save & Release Grade</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};