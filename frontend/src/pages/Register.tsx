import { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Loader2, ArrowLeft, ShieldCheck } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import axios from 'axios';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('employee');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { setAuth, isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  useGSAP(() => {
    // Form and panel GSAP stagger reveal
    const tl = gsap.timeline();
    tl.from(".visual-panel-content > *", {
      opacity: 0,
      x: -30,
      duration: 0.6,
      stagger: 0.08,
      ease: "power2.out"
    })
    .from(".form-panel-content", {
      opacity: 0,
      y: 20,
      duration: 0.6,
      ease: "power2.out"
    }, "-=0.3")
    .from(".form-element", {
      opacity: 0,
      y: 10,
      duration: 0.4,
      stagger: 0.04,
      ease: "power2.out"
    }, "-=0.3");
  }, { scope: containerRef });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await axios.post('/api/auth/register', { name, email, password, role });
      const { user, accessToken, refreshToken } = response.data;
      setAuth(user, accessToken, refreshToken);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div ref={containerRef} className="register-page-container" style={{
      display: 'flex',
      minHeight: '100vh',
      backgroundColor: '#ffffff',
      position: 'relative',
      overflow: 'hidden'
    }}>
      
      {/* Background Loop Video */}
      <div className="video-bg-container">
        <video autoPlay loop muted playsInline className="video-bg">
          <source src="/background.mp4" type="video/mp4" />
        </video>
        <div className="video-overlay" />
      </div>

      {/* Left Side - Visual Panel */}
      <div className="visual-panel" style={{
        flex: 1,
        backgroundColor: '#0c1b33',
        padding: '40px 60px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Abstract Dark Layer */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(135deg, rgba(0, 102, 204, 0.75) 0%, rgba(13, 27, 42, 0.9) 100%)',
          zIndex: 1
        }} />
        
        {/* Subtle Video Background on visual panel */}
        <video autoPlay loop muted playsInline style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          opacity: 0.4,
          zIndex: 0
        }}>
          <source src="/background.mp4" type="video/mp4" />
        </video>

        <div className="visual-panel-content" style={{ position: 'relative', zIndex: 2, maxWidth: '440px', color: '#ffffff', display: 'flex', flexDirection: 'column', gap: '32px' }}>
          <div>
            <div style={{
              width: '48px',
              height: '48px',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '24px'
            }}>
              <ShieldCheck style={{ color: '#ffffff', width: '26px', height: '26px' }} />
            </div>
            <h2 style={{ fontSize: '36px', fontWeight: 800, lineHeight: 1.15, marginBottom: '16px', letterSpacing: '-0.03em' }}>
              Scale your operations with confidence.
            </h2>
            <p style={{ fontSize: '15px', color: 'rgba(255, 255, 255, 0.7)', lineHeight: '1.6', margin: 0 }}>
              Experience the power of enterprise-grade automation tools designed for modern teams.
            </p>
          </div>

          {/* Quick Demo Login Widget */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ height: '1px', backgroundColor: 'rgba(255,255,255,0.15)', flex: 1 }} />
              <span style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'rgba(255,255,255,0.5)' }}>Quick Demo Bypass Logins</span>
              <div style={{ height: '1px', backgroundColor: 'rgba(255,255,255,0.15)', flex: 1 }} />
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {[
                { name: 'Alex Rivera', role: 'Admin', email: 'alex.admin@autobiz.com', avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Alex' },
                { name: 'Sarah Jenkins', role: 'Manager', email: 'sarah.manager@autobiz.com', avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Sarah' },
                { name: 'Michael Chen', role: 'Developer', email: 'michael.developer@autobiz.com', avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Michael' },
                { name: 'Emma Wilson', role: 'Designer', email: 'emma.designer@autobiz.com', avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Emma' },
                { name: 'John Doe', role: 'Customer', email: 'client.john@autobiz.com', avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=John' }
              ].map((demo, idx) => (
                <div 
                  key={idx}
                  onClick={async () => {
                    try {
                      // Bypass registration directly into session login
                      const response = await axios.post('/api/auth/login', { email: demo.email, password: 'password123' });
                      const { user, accessToken, refreshToken } = response.data;
                      setAuth(user, accessToken, refreshToken);
                      navigate('/dashboard');
                    } catch (err) {
                      console.error('Quick bypass error', err);
                    }
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 16px',
                    borderRadius: '12px',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    cursor: 'pointer',
                    transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.12)';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.25)';
                    e.currentTarget.style.transform = 'translateY(-1px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <img src={demo.avatar} alt="" style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.1)' }} />
                    <div style={{ textAlign: 'left' }}>
                      <p style={{ fontSize: '13px', fontWeight: 700, margin: 0 }}>{demo.name}</p>
                      <p style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.5)', margin: 0, textTransform: 'capitalize' }}>{demo.role}</p>
                    </div>
                  </div>
                  
                  <span style={{
                    fontSize: '10px',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    padding: '4px 10px',
                    borderRadius: '50px',
                    backgroundColor: 'rgba(255,255,255,0.15)',
                    color: '#ffffff',
                    transition: 'all 0.2s'
                  }}>
                    Log in
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Form Panel */}
      <div className="form-panel" style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '40px 80px',
        backgroundColor: 'rgba(255, 255, 255, 0.75)',
        backdropFilter: 'blur(20px)',
        borderLeft: '1px solid var(--border-color)',
        zIndex: 2
      }}>
        <div className="form-panel-content" style={{ maxWidth: '380px', width: '100%', margin: '0 auto' }}>
          <Link to="/" className="form-element" style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '13px',
            fontWeight: 600,
            color: 'var(--text-muted)',
            textDecoration: 'none',
            marginBottom: '28px',
            transition: 'color 0.2s'
          }}>
            <ArrowLeft className="back-arrow" style={{ width: '16px', height: '16px' }} />
            Back to home
          </Link>

          <h1 className="form-element" style={{ fontSize: '32px', fontWeight: 800, marginBottom: '8px', letterSpacing: '-0.03em', color: '#000000' }}>
            Create an account
          </h1>
          <p className="form-element text-para" style={{ marginBottom: '28px', fontSize: '14px' }}>
            Get started with your free 14-day trial.
          </p>

          {error && (
            <div className="form-element" style={{
              backgroundColor: 'rgba(201, 42, 42, 0.08)',
              border: '1px solid rgba(201, 42, 42, 0.15)',
              color: 'var(--danger-color)',
              fontSize: '13px',
              fontWeight: 500,
              padding: '16px',
              borderRadius: '10px',
              marginBottom: '20px'
            }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div className="form-group form-element" style={{ marginBottom: '12px' }}>
              <label className="form-label" htmlFor="name">Full Name</label>
              <div className="form-input-wrapper">
                <User className="form-icon" style={{ width: '18px', height: '18px' }} />
                <input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="form-input"
                />
              </div>
            </div>

            <div className="form-group form-element" style={{ marginBottom: '12px' }}>
              <label className="form-label" htmlFor="email">Email Address</label>
              <div className="form-input-wrapper">
                <Mail className="form-icon" style={{ width: '18px', height: '18px' }} />
                <input
                  id="email"
                  type="email"
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="form-input"
                />
              </div>
            </div>

            <div className="form-group form-element" style={{ marginBottom: '12px' }}>
              <label className="form-label" htmlFor="password">Password</label>
              <div className="form-input-wrapper">
                <Lock className="form-icon" style={{ width: '18px', height: '18px' }} />
                <input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="form-input"
                />
              </div>
            </div>

            <div className="form-group form-element" style={{ marginBottom: '12px' }}>
              <label className="form-label">Your Role</label>
              <select 
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="form-input"
                style={{ paddingLeft: '16px' }} // no icon on select
              >
                <option value="employee">Employee</option>
                <option value="manager">Manager</option>
                <option value="customer">Customer</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="btn btn-primary form-element"
              style={{ width: '100%', height: '48px', borderRadius: '12px', marginTop: '10px' }}
            >
              {isLoading ? (
                <Loader2 style={{ width: '20px', height: '20px', animation: 'spin 1s linear infinite' }} />
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          <p className="form-element" style={{ textAlign: 'center', fontSize: '13px', color: 'var(--text-muted)', marginTop: '24px' }}>
            Already have an account?{' '}
            <Link to="/login" style={{ color: '#000000', fontWeight: 700, textDecoration: 'none' }}>
              Sign in
            </Link>
          </p>

          {/* Mobile Quick Demo Logins */}
          <div className="mobile-demo-logins" style={{ display: 'none', flexDirection: 'column', gap: '12px', marginTop: '32px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ height: '1px', backgroundColor: 'rgba(0,0,0,0.08)', flex: 1 }} />
              <span style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)' }}>Quick Demo Logins</span>
              <div style={{ height: '1px', backgroundColor: 'rgba(0,0,0,0.08)', flex: 1 }} />
            </div>
            
            <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '8px', scrollbarWidth: 'none' }} className="no-scrollbar">
              {[
                { name: 'Alex', role: 'Admin', email: 'alex.admin@autobiz.com', avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Alex' },
                { name: 'Sarah', role: 'Manager', email: 'sarah.manager@autobiz.com', avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Sarah' },
                { name: 'Michael', role: 'Dev', email: 'michael.developer@autobiz.com', avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Michael' },
                { name: 'Emma', role: 'Design', email: 'emma.designer@autobiz.com', avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Emma' },
                { name: 'John', role: 'Client', email: 'client.john@autobiz.com', avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=John' }
              ].map((demo, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={async () => {
                    try {
                      const response = await axios.post('/api/auth/login', { email: demo.email, password: 'password123' });
                      const { user, accessToken, refreshToken } = response.data;
                      setAuth(user, accessToken, refreshToken);
                      navigate('/dashboard');
                    } catch (err) {
                      console.error('Quick bypass error', err);
                    }
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '8px 12px',
                    borderRadius: '50px',
                    backgroundColor: 'var(--bg-soft)',
                    border: '1px solid var(--border-color)',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    flexShrink: 0
                  }}
                >
                  <img src={demo.avatar} alt="" style={{ width: '18px', height: '18px', borderRadius: '50%' }} />
                  <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-main)' }}>{demo.name} ({demo.role})</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
