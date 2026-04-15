import { RouterProvider } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { TimelineProvider } from './context/TimelineContext';
import router from './router';

export default function App() {
  return (
    <TimelineProvider>
      <RouterProvider router={router} />
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            fontFamily: 'DM Sans, sans-serif',
            borderRadius: '12px',
            fontSize: '14px',
          },
        }}
      />
    </TimelineProvider>
  );
}
