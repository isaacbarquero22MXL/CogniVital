import logo from './logo.svg';
import Nav from './assets/views/Nav/Nav';
import { ThemeProvider } from '@material-tailwind/react';
import { useEffect } from 'react';
import MainLayout from './assets/layout/MainLayout';
import AOS from 'aos'
//Style
import "./assets/css/style.css"
import 'aos/dist/aos.css';
function App() {
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, [])
  return (
      <div>
        <Nav></Nav>
        <MainLayout></MainLayout>
      </div>
  );
}

export default App;
