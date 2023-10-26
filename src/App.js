import logo from './logo.svg';
import Nav from './views/Nav/Nav';
import { ThemeProvider } from '@material-tailwind/react';
import { useEffect } from 'react';
import MainLayout from './layout/MainLayout';
import AOS from 'aos'
//Style
import "./assets/css/style.css"
import 'aos/dist/aos.css';
import Footer from './components/Footer/Footer';
function App() {
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, [])
  return (
      <div>
        <Nav></Nav>
        <MainLayout></MainLayout>
        <Footer></Footer>
      </div>
  );
}

export default App;
