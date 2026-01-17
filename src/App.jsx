import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ProfileSetup from "./pages/student/ProfileSetup";
import StudentDashboard from "./pages/student/Dashboard";
import LessonsList from "./pages/student/LessonsList";
import AuthGuard from "./components/auth/AuthGuard";
import SubjectDetails from "./pages/student/SubjectDetails";
import ErrorPage from "./components/student/error/ErrorPage";
import ErrorBoundary from "./components/student/error/ErrorBoundary";
import LessonContent from "./pages/student/LessonContent";
import LessonQuiz from "./pages/student/LessonQuiz";
import Home from "./pages/Home";

export default function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile-setup" element={<AuthGuard><ProfileSetup /></AuthGuard>} />
          <Route path="/dashboard" element={<AuthGuard><StudentDashboard /></AuthGuard>} />
          <Route path="/subjects/:subjectSlug" element={<AuthGuard><SubjectDetails /></AuthGuard>} />
          <Route path="/lessons/:unitSlug" element={<AuthGuard><LessonsList /></AuthGuard>} />
          <Route path="/lesson/:lessonSlug" element={<AuthGuard><LessonContent /></AuthGuard>} />
          <Route path="/quiz/:lessonSlug" element={<AuthGuard><LessonQuiz /></AuthGuard>} />
          <Route path="*" element={<ErrorPage message="Page not found" code={404} />} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
}
