/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import PertemuanList from './pages/PertemuanList';
import SlideViewer from './pages/SlideViewer';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/kajian/:id" element={<PertemuanList />} />
        <Route path="/kajian/:id/materi" element={<SlideViewer />} />
        <Route path="/kajian/:id/:pertemuanId" element={<SlideViewer />} />
      </Routes>
    </Router>
  );
}

