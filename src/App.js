import logo from './logo.svg';
import './App.css';
// import Form from './components/Form';
import LoginForm from './components/Login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Header from './components/Header';
import SignUpForm from './components/SignUpForm';
import { AuthProvider } from './context/AuthContext';
import Home from './components/Home';
import ProtectedRoutes from './components/ProtectedRoutes';
import Profile from './components/Profile';
import Setting from './components/Setting';
import { useThemeStore } from './store/useThemeStore';

function App() {
  const { theme } = useThemeStore();

  return (
   <div data-theme={theme}>
     <AuthProvider>
      <BrowserRouter>
        <Header/>
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route element={<ProtectedRoutes />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/setting" element={<Setting />} />
            </Route>
            <Route path="/login" element={<LoginForm />} />
            <Route path="/signUp" element={<SignUpForm />} />
            
          </Routes>
        </main>
      </BrowserRouter>
    </AuthProvider>
   </div>
  );
}

export default App;

