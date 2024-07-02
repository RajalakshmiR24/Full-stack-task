
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Crud from './Crud';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Crud />} />
        <Route path="/edit/:id" element={<Crud />} />
      </Routes>
    </Router>
  );
};

export default App;
