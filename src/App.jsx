import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';

// فقط صفحات فعال
import Dashboard from './pages/dashboard';
import ProductsList from './pages/products/list';
import ProductNew from './pages/products/new';
import Dashboard from './pages/dashboard/index';
function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <Router>
      <div>
        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{
            duration: 4000,
            style: {
              fontFamily: 'IRANSans',
            },
          }}
        />
        
        {/* سایدبار */}
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        {/* محتوای اصلی */}
        <div className="lg:mr-72">
          {/* نوار بالا */}
          <Navbar setSidebarOpen={setSidebarOpen} />

          {/* محتوای صفحه */}
          <main className="py-6">
            <div className="mx-auto px-4 sm:px-6 lg:px-8">
              <Routes>
                {/* فقط مسیرهای فعال */}
                <Route path="/" element={<Dashboard />} />
                <Route path="/products" element={<ProductsList />} />
                <Route path="/products/new" element={<ProductNew />} />
              </Routes>
            </div>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;