import { Toaster } from 'react-hot-toast';

export const Toast = () => {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        style: {
          background: '#262626',
          color: '#f9f9f9',
          border: '1px solid #3e3e3e',
        },
      }}
    />
  );
};
