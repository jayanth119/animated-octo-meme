import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  CheckSquare, 
  Users, 
  BarChart3, 
  Settings, 
  LogOut, 
  Bell, 
  Search,
  Menu,
  X,
  Zap
} from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import api from '../services/api';

const SidebarItem = ({ icon: Icon, label, href, active, collapsed }: any) => (
  <Link 
    to={href}
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      padding: '12px 16px',
      borderRadius: '12px',
      textDecoration: 'none',
      fontSize: '14px',
      fontWeight: active ? 700 : 500,
      backgroundColor: active ? '#000000' : 'transparent',
      color: active ? '#ffffff' : 'var(--text-muted)',
      boxShadow: active ? '0 4px 12px rgba(0,0,0,0.06)' : 'none',
      transition: 'all 0.25s ease'
    }}
    onMouseEnter={(e) => {
      if (!active) {
        e.currentTarget.style.backgroundColor = 'var(--bg-soft)';
        e.currentTarget.style.color = 'var(--text-main)';
      }
    }}
    onMouseLeave={(e) => {
      if (!active) {
        e.currentTarget.style.backgroundColor = 'transparent';
        e.currentTarget.style.color = 'var(--text-muted)';
      }
    }}
  >
    <Icon style={{
      width: '18px',
      height: '18px',
      color: active ? '#ffffff' : 'inherit'
    }} />
    {!collapsed && <span>{label}</span>}
  </Link>
);

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const containerRef = useRef<HTMLDivElement>(null);
  const [notifications, setNotifications] = useState<any[]>([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await api.get('/notifications');
        if (res.data && res.data.success) {
          setNotifications(res.data.data);
        }
      } catch (err) {
        console.error('Failed to load notifications:', err);
      }
    };
    
    fetchNotifications();

    const handleSocketNotification = () => {
      fetchNotifications();
    };

    window.addEventListener('socket-notification', handleSocketNotification);
    window.addEventListener('refetch-notifications', handleSocketNotification);

    return () => {
      window.removeEventListener('socket-notification', handleSocketNotification);
      window.removeEventListener('refetch-notifications', handleSocketNotification);
    };
  }, []);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { icon: LayoutDashboard, label: 'Overview', href: '/dashboard' },
    { icon: CheckSquare, label: 'Tasks', href: '/dashboard/tasks' },
    { icon: Users, label: 'Team', href: '/dashboard/team' },
    { icon: BarChart3, label: 'Analytics', href: '/dashboard/analytics' },
    { icon: Settings, label: 'Settings', href: '/dashboard/settings' },
  ];

  useGSAP(() => {
    // Elegant fade-in for the main content
    gsap.fromTo(".main-content-flow",
      { opacity: 0, y: 10 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out"
      }
    );
  }, { scope: containerRef });

  return (
    <div ref={containerRef} style={{
      display: 'flex',
      minHeight: '100vh',
      backgroundColor: '#fdfdfd',
      position: 'relative'
    }}>
      
      {/* Sidebar - Desktop */}
      <aside 
        style={{
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#ffffff',
          borderRight: '1px solid var(--border-color)',
          width: isCollapsed ? '80px' : '260px',
          transition: 'width 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          zIndex: 30,
          position: 'relative'
        }}
        className="hidden md:flex"
      >
        {/* Sidebar Header */}
        <div style={{
          padding: '24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: isCollapsed ? 'center' : 'space-between'
        }}>
          {!isCollapsed && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{
                width: '32px',
                height: '32px',
                backgroundColor: '#000000',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Zap style={{ color: '#ffffff', width: '18px', height: '18px' }} />
              </div>
              <span style={{ fontSize: '18px', fontWeight: 800, color: '#000000', letterSpacing: '-0.02em' }}>AutoBiz</span>
            </div>
          )}
          {isCollapsed && (
            <div style={{
              width: '32px',
              height: '32px',
              backgroundColor: '#000000',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Zap style={{ color: '#ffffff', width: '18px', height: '18px' }} />
            </div>
          )}
          
          {!isCollapsed && (
            <button 
              onClick={() => setIsCollapsed(!isCollapsed)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '6px',
                borderRadius: '6px',
                color: 'var(--text-muted)',
                display: 'flex',
                alignItems: 'center'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--bg-soft)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              <Menu style={{ width: '16px', height: '16px' }} />
            </button>
          )}
        </div>

        {/* Navigation Items */}
        <nav style={{
          flex: 1,
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px'
        }}>
          {navItems.map((item) => (
            <SidebarItem 
              key={item.href}
              {...item}
              active={location.pathname === item.href}
              collapsed={isCollapsed}
            />
          ))}
        </nav>

        {/* Toggle option for collapsed view only */}
        {isCollapsed && (
          <button 
            onClick={() => setIsCollapsed(!isCollapsed)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '12px',
              margin: '8px auto',
              borderRadius: '8px',
              color: 'var(--text-muted)',
              display: 'flex',
              alignItems: 'center',
              backgroundColor: 'var(--bg-soft)'
            }}
          >
            <Menu style={{ width: '16px', height: '16px' }} />
          </button>
        )}

        {/* Sidebar Footer / Logout */}
        <div style={{ padding: '16px', borderTop: '1px solid var(--border-color)' }}>
          <button 
            onClick={handleLogout}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: isCollapsed ? 'center' : 'flex-start',
              gap: '12px',
              padding: '12px 16px',
              borderRadius: '12px',
              border: 'none',
              cursor: 'pointer',
              backgroundColor: 'transparent',
              fontSize: '14px',
              fontWeight: 600,
              color: 'var(--text-muted)',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(201, 42, 42, 0.06)';
              e.currentTarget.style.color = 'var(--danger-color)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = 'var(--text-muted)';
            }}
          >
            <LogOut style={{ width: '18px', height: '18px' }} />
            {!isCollapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Mobile Drawer (fallback design) */}
      {isMobileOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(255, 255, 255, 0.5)',
          backdropFilter: 'blur(12px)',
          zIndex: 100,
          display: 'flex'
        }} className="md:hidden">
          <div style={{
            width: '260px',
            backgroundColor: '#ffffff',
            borderRight: '1px solid var(--border-color)',
            display: 'flex',
            flexDirection: 'column',
            padding: '24px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  backgroundColor: '#000000',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Zap style={{ color: '#ffffff', width: '18px', height: '18px' }} />
                </div>
                <span style={{ fontSize: '18px', fontWeight: 800, color: '#000000' }}>AutoBiz</span>
              </div>
              <button onClick={() => setIsMobileOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                <X style={{ width: '22px', height: '22px' }} />
              </button>
            </div>
            
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
              {navItems.map((item) => (
                <div key={item.href} onClick={() => setIsMobileOpen(false)}>
                  <SidebarItem 
                    {...item}
                    active={location.pathname === item.href}
                    collapsed={false}
                  />
                </div>
              ))}
            </nav>
            
            <button onClick={handleLogout} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px 16px',
              borderRadius: '12px',
              border: 'none',
              backgroundColor: 'rgba(201, 42, 42, 0.05)',
              color: 'var(--danger-color)',
              fontWeight: 600,
              fontSize: '14px'
            }}>
              <LogOut style={{ width: '18px', height: '18px' }} />
              Logout
            </button>
          </div>
          <div style={{ flex: 1 }} onClick={() => setIsMobileOpen(false)} />
        </div>
      )}

      {/* Main Content Area */}
      <main style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        minWidth: 0,
        overflow: 'hidden'
      }}>
        {/* Header bar */}
        <header style={{
          height: '64px',
          borderBottom: '1px solid var(--border-color)',
          backgroundColor: 'rgba(255,255,255,0.7)',
          backdropFilter: 'var(--glass-blur)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 24px',
          position: 'sticky',
          top: 0,
          zIndex: 20
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button 
              onClick={() => setIsMobileOpen(true)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--text-muted)'
              }}
              className="md:hidden"
            >
              <Menu style={{ width: '22px', height: '22px' }} />
            </button>
            
            {/* Search Input in header */}
            <div style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              backgroundColor: 'var(--bg-soft)',
              padding: '6px 12px',
              borderRadius: '8px',
              border: '1px solid var(--border-color)',
              width: '240px'
            }} className="hidden md:flex">
              <Search style={{ width: '16px', height: '16px', color: 'var(--text-muted)', marginRight: '8px' }} />
              <input 
                type="text" 
                placeholder="Search..." 
                style={{
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  fontSize: '13px',
                  color: 'var(--text-main)',
                  width: '100%'
                }}
              />
            </div>
          </div>

          {/* User profile & Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button 
              onClick={() => navigate('/dashboard/notifications')}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: location.pathname === '/dashboard/notifications' ? 'var(--accent-color)' : 'var(--text-muted)',
                padding: '8px',
                borderRadius: '50%',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                backgroundColor: location.pathname === '/dashboard/notifications' ? 'var(--bg-soft)' : 'transparent',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--bg-soft)'}
              onMouseLeave={(e) => {
                if (location.pathname !== '/dashboard/notifications') {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }
              }}
              title={`Notifications (${unreadCount} unread)`}
            >
              <Bell style={{ width: '18px', height: '18px' }} />
              {unreadCount > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '6px',
                  right: '6px',
                  width: '7px',
                  height: '7px',
                  backgroundColor: 'var(--accent-color)',
                  borderRadius: '50%',
                  boxShadow: '0 0 0 2px #ffffff'
                }} />
              )}
            </button>
            
            {/* Vertical separator */}
            <div style={{ width: '1px', height: '20px', backgroundColor: 'var(--border-color)' }} />
            
            {/* User Meta */}
            <div 
              onClick={() => navigate('/dashboard/profile')}
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '12px', 
                cursor: 'pointer',
                padding: '4px 8px',
                borderRadius: '8px',
                transition: 'background-color 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--bg-soft)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              <div style={{ textAlign: 'right' }} className="hidden sm:block">
                <p style={{ fontSize: '13px', fontWeight: 700, color: '#000000', margin: 0 }}>{user?.name}</p>
                <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px', textTransform: 'capitalize', margin: 0 }}>{user?.role}</p>
              </div>
              
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                backgroundColor: 'rgba(0,0,0,0.04)',
                border: '1px solid var(--border-color)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden'
              }}>
                {user?.avatar ? (
                  <img src={user.avatar} alt={user.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <span style={{ color: '#000000', fontWeight: 700, fontSize: '14px' }}>{user?.name.charAt(0)}</span>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Content Area viewport */}
        <div className="main-content-flow" style={{
          flex: 1,
          overflowY: 'auto',
          padding: '40px',
          backgroundColor: '#fafafa'
        }}>
          {children}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
