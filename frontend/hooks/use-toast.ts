'use client';

// Inspired by react-hot-toast library
import * as React from 'react';

interface Toast {
  id: string;
  message: string;
}

type State = {
  toasts: Toast[];
};

type Action =
  | { type: 'ADD_TOAST'; toast: Toast }
  | { type: 'DISMISS_TOAST'; toastId: string };

const ToastContext = React.createContext<{
  state: State;
  addToast: (message: string) => void;
  dismissToast: (toastId: string) => void;
} | null>(null);

function toastReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'ADD_TOAST':
      return { ...state, toasts: [...state.toasts, action.toast] };
    case 'DISMISS_TOAST':
      return { ...state, toasts: state.toasts.filter(t => t.id !== action.toastId) };
    default:
      return state;
  }
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = React.useReducer(toastReducer, { toasts: [] });

  const addToast = (message: string) => {
    const id = Math.random().toString(36).substr(2, 9);
    dispatch({ type: 'ADD_TOAST', toast: { id, message } });
    setTimeout(() => dispatch({ type: 'DISMISS_TOAST', toastId: id }), 3000);
  };

  const dismissToast = (toastId: string) => {
    dispatch({ type: 'DISMISS_TOAST', toastId });
  };

  // Minimal toast rendering using React portal for client-side only
  // Avoid JSX, use React.createElement for all rendering
  const toastElements = typeof window !== 'undefined'
    ? [
        React.createElement(
          'div',
          { key: 'toast-container', style: { position: 'fixed', top: 16, right: 16, zIndex: 9999 } },
          state.toasts.map((toast: Toast) =>
            React.createElement(
              'div',
              {
                key: toast.id,
                style: {
                  background: '#333',
                  color: '#fff',
                  padding: '12px 20px',
                  borderRadius: 6,
                  marginBottom: 8,
                  minWidth: 200,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
                },
                onClick: () => dismissToast(toast.id)
              },
              toast.message
            )
          )
        )
      ]
    : [];

  return React.createElement(
    ToastContext.Provider,
    { value: { state, addToast, dismissToast } },
    [children, ...toastElements]
  );
}

export function useToast() {
  const context = React.useContext(ToastContext);
  if (!context) throw new Error('useToast must be used within a ToastProvider');
  return context;
}
