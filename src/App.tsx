import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Pages/login';
import Dashboard from './Pages/dashboard';
import Users from './Pages/users';
import Combobox from './Pages/combobox';
import Four0Four from './Pages/notFound';
import UserProfile from './Pages/personalPage';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" Component={Login} />
        <Route path="/tasks" Component={Dashboard} />
        <Route path="/users" Component={Users} />
        <Route path="/combobox" Component={Combobox} />
        <Route path="/:username" element={<UserProfile />} />
        <Route path="*" Component={Four0Four} />
      </Routes>
    </Router>
  );
};

export default App;
