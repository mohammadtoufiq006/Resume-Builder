import React from 'react'
import ResumeForm from './components/ResumeForm';
import Dashboard from './pages/Dashboard';
import {Routes, Route} from 'react-router-dom';
import ResumeEditor from './pages/ResumeEditor';

const App = () => {
  return (
    // <div className="min-h-screen bg-slate-50 flex items-center justify-center">
    //   <ResumeForm />
    // </div>
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/editor/:id" element={<ResumeEditor />} />
      <Route path="/create" element={<ResumeEditor />} />
    </Routes>
  );
}

export default App