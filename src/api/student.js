import api from "./axios";

// Check if profile setup is complete
export const getEnrollmentStatus = () => {
  return api.get("enrollment-status/");
};

// Submit profile setup
export const setupProfile = (data) => {
  return api.patch("profile-setup/", data);
};

// Academic years
export const getAcademicYears = () => {
  return api.get("academic-years/");
};

// Grades (educational structure)
export const getEducationalStructure = () => {
  return api.get("educational-structure/");
};

// Terms
export const getTerms = () => {
  return api.get("terms/");
};

// Student Dashboard
export const getStudentDashboard = () => {
  return api.get("student/dashboard/");
};

// Subjects List
export const getSubjects = (grade, term) => {
  return api.get(`subjects/?grade=${grade}&term=${term}`);
};

// Subject Details
export const getSubjectDetails = (slug) => {
  return api.get(`student/subject/${slug}/`);
};

//Units List
export const getUnits = (subjectSlug) => {
  return api.get(`units/?subject=${subjectSlug}`);
};

// Lessons List
export const getLessons = (unitSlug) => {
  return api.get(`lessons/?unit=${unitSlug}`);
};

// Lesson Content
export const getLessonContent = (slug) => {
  return api.get(`student/lesson/${slug}/content/`);
};

// Lesson Quiz
export const getLessonQuiz = (slug) => {
  return api.get(`student/lesson/${slug}/quiz/`);
};

// Submit Quiz
export const submitLessonQuiz = (lessonSlug, answers) => {
  return api.post(
    `student/lesson/${lessonSlug}/submit-quiz/`,
    { answers }
  );
};