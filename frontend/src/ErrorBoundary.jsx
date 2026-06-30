import React from "react";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error, info) {
    console.error("React Crash:", error);
    console.error(info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            background: "#020617",
            color: "white",
            minHeight: "100vh",
            padding: "40px",
          }}
        >
          <h1>React crashed.</h1>

          <pre>{String(this.state.error)}</pre>
        </div>
      );
    }

    return this.props.children;
  }
}