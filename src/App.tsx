/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { CategoryPage } from './pages/CategoryPage';
import { DealDetail } from './pages/DealDetail';
import { Blog } from './pages/Blog';
import { SearchResults } from './pages/SearchResults';
import { ExitIntentPopup } from './components/ExitIntentPopup';

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white font-sans text-gray-900 selection:bg-orange-100 selection:text-orange-900">
        <ScrollToTop />
        <Navbar />
        
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/category/:categoryId" element={<CategoryPage />} />
            <Route path="/deal/:dealId" element={<DealDetail />} />
            <Route path="/guides" element={<Blog />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/trending" element={<Home />} /> {/* Reuse home for now */}
            {/* Fallback */}
            <Route path="*" element={<Home />} />
          </Routes>
        </main>

        <Footer />
        <ExitIntentPopup />
      </div>
    </Router>
  );
}

