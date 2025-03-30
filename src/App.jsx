import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';
import Dashboard from './pages/dashboard';
import PersonNew from './pages/persons/new.jsx';
import PersonsList from './pages/persons/list.jsx';
import PersonsReceive from './pages/persons/receive.jsx';
import PersonsReceiveList from './pages/persons/receives.jsx';
import PersonsPayment from './pages/persons/payment.jsx';
import PersonsPaymentList from './pages/persons/payments.jsx';
import Shareholders from './pages/persons/shareholders.jsx';
import Vendors from './pages/persons/vendors.jsx';

function App() {
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
        <Navbar />
        <Sidebar />
        <div className="lg:pr-64">
          <main className="py-10">
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
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;