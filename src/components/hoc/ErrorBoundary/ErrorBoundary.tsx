import React, { Component, ErrorInfo, ReactNode } from 'react';
import { toast } from 'react-toastify';

interface ErrorBoundaryProps {
  children: ReactNode;
}

class ErrorBoundary extends Component<ErrorBoundaryProps> {
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Handle the error as you need
    console.error('Caught an error:', error, errorInfo);
    // Show the error using toast from react-toastify
    toast.error('An error occurred. Please try again later.', {
      position: 'top-center',
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  }

  render() {
    const { children } = this.props;
    return children;
  }
}

export default ErrorBoundary;