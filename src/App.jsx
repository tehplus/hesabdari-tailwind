import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';
import Dashboard from './pages/dashboard';
import PersonNew from './pages/persons/new';
import PersonsList from './pages/persons/list';
import PersonsReceive from './pages/persons/receive';
import PersonsReceiveList from './pages/persons/receives';
import PersonsPayment from './pages/persons/payment';
import PersonsPaymentList from './pages/persons/payments';
import Shareholders from './pages/persons/shareholders';
import Vendors from './pages/persons/vendors';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
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
        
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        
        {/* محتوای اصلی */}
        <div className="lg:pr-64 flex flex-col flex-1">
          <Navbar setSidebarOpen={setSidebarOpen} />
          
          <main className="flex-1">
            <div className="py-6">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/persons/new" element={<PersonNew />} />
                  <Route path="/persons" element={<PersonsList />} />
                  <Route path="/persons/receive" element={<PersonsReceive />} />
                  <Route path="/persons/receives" element={<PersonsReceiveList />} />
                  <Route path="/persons/payment" element={<PersonsPayment />} />
                  <Route path="/persons/payments" element={<PersonsPaymentList />} />
                  <Route path="/persons/shareholders" element={<Shareholders />} />
                  <Route path="/persons/vendors" element={<Vendors />} />
                </Routes>
              </div>
            </div>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;