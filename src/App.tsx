import './App.css';
import { Container } from '@mui/material';
import { NavLink as Link, Route, Routes } from 'react-router-dom';
import reactLogo from './assets/react-icon.svg';
import Home from './routes/Home';
import Scoring from './routes/Scoring';
import Rules from './routes/Rules';

function App() {
  const isActive = (obj: { isActive: boolean }) => ((obj.isActive) ? 'active' : 'inactive');
  return (
    <Container>
      <Container>
        <header>
          <div>
            <h1>
              <img src={reactLogo} alt="React Logo" />
              <span>React</span>
            </h1>
          </div>
        </header>
        <nav>
          <div style={{ textAlign: 'center' }}>
            <Link to="/home" className={isActive}>Home</Link>
            <Link to="/scoring" className={isActive}>Scoring</Link>
            <Link to="/rules" className={isActive}>Rules</Link>
          </div>
        </nav>
        <main>
          <div>
            <Routes>
              <Route path="home" element={<Home />} />
              <Route path="scoring" element={<Scoring />} />
              <Route path="rules" element={<Rules />} />
            </Routes>
          </div>
        </main>
      </Container>
    </Container>
  );
}

export default App;
