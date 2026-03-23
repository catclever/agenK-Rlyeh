export const INTERCEPTOR_SCRIPT = `
(function() {
  const sendError = (error) => {
    const errorObj = {
      message: error.message || String(error),
      stack: error.stack,
      filename: error.filename,
      lineno: error.lineno,
      colno: error.colno
    };

    // 1. Send to Parent (Terminal/Eye)
    window.parent.postMessage({
      type: 'RUNTIME_ERROR',
      error: errorObj
    }, '*');
  };

  window.onerror = function(message, source, lineno, colno, error) {
    sendError(error || { message, filename: source, lineno, colno });
  };

  window.addEventListener('unhandledrejection', function(event) {
    sendError(event.reason);
  });

  const originalConsoleError = console.error;
  console.error = function(...args) {
    originalConsoleError.apply(console, args);
    // Filter out HMR logs or other noise if needed
    // Simple filter for now
    const msg = args.map(a => String(a)).join(' ');
    if (msg.includes('[hmr]') || msg.includes('[vite]')) return;
    
    sendError({ message: msg, stack: new Error().stack });
  };
})();
`;
