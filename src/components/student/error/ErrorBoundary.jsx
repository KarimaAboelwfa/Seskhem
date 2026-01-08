import React from "react";
import ErrorPage from "../error/ErrorPage";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    // يحدث لما يحصل error في أي كومبوننت داخلي
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // هنا ممكن تسجل الخطأ في logging service
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // نعرض صفحة Error
      return <ErrorPage message={this.state.error?.message} code="Error" />;
    }

    return this.props.children;
  }
}
