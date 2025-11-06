import { RouterProvider } from 'react-router-dom';
import { router } from './routes';
import { ThemeCustomizer } from '../shared/components/ThemeCustomizer';

export function App() {
  return (
    <>
      <RouterProvider router={router} />
      <ThemeCustomizer />
    </>
  );
}

export default App;
