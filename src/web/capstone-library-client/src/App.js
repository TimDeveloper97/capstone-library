import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Route from './routes';


function App() {
  const pathname = useLocation();
  useEffect(() => {
    window.scroll({top: 0, left: 0, behavior: 'smooth'})
  }, [pathname])
  return <Route />
}

export default App;
