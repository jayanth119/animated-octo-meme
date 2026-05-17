import React, { useState, useEffect, useRef } from 'react';
import { 
  Bell, 
  CheckCheck, 
  Trash2, 
  Info, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  ExternalLink, 
  Clock 
} from 'lucide-react';
import api from '../services/api';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const Notifications = () => {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');
  const [loading, setLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  const fetchNotifications = async () => {
    try {
      const res = await api.get('/notifications');
      if (res.data && res.data.success) {
        setNotifications(res.data.data);
      }
    } catch (err) {
      console.error('Failed to load notifications:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();

    const handleSocketNotification = () => {
      fetchNotifications();
    };

    window.addEventListener('socket-notification', handleSocketNotification);
    return () => {
      window.removeEventListener('socket-notification', handleSocketNotification);
    };
  }, []);

  useGSAP(() => {
    if (!loading && notifications.length > 0) {
      gsap.fromTo(
        ".notification-card-anim",
        { opacity: 0, y: 15 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.04,
          duration: 0.4,
          ease: "power2.out"
        }
      );
    }
  }, [loading, notifications.length, filter]);

  const handleMarkAllRead = async () => {
    try {
      await api.put('/notifications/read-all');
      fetchNotifications();
      // Dispatch layout synchronization event
      window.dispatchEvent(new Event('refetch-notifications'));
    } catch (err) {
      console.error('Failed to mark all as read:', err);
    }
  };

  const handleClearAll = async () => {
    if (window.confirm('Are you sure you want to clear all notifications?')) {
      try {
        await api.delete('/notifications/clear-all');
        setNotifications([]);
        window.dispatchEvent(new Event('refetch-notifications'));
      } catch (err) {
        console.error('Failed to clear notifications:', err);
      }
    }
  };

  const handleMarkRead = async (id: string) => {
    try {
      await api.put(`/notifications/${id}/read`);
      fetchNotifications();
      window.dispatchEvent(new Event('refetch-notifications'));
    } catch (err) {
      console.error('Failed to mark as read:', err);
    }
  };

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await api.delete(`/notifications/${id}`);
      fetchNotifications();
      window.dispatchEvent(new Event('refetch-notifications'));
    } catch (err) {
      console.error('Failed to delete notification:', err);
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle2 style={{ color: 'var(--success-color)', width: '20px', height: '20px' }} />;
      case 'warning':
        return <AlertTriangle style={{ color: 'var(--warning-color)', width: '20px', height: '20px' }} />;
      case 'error':
        return <XCircle style={{ color: 'var(--danger-color)', width: '20px', height: '20px' }} />;
      default:
        return <Info style={{ color: 'var(--accent-color)', width: '20px', height: '20px' }} />;
    }
  };

  const getNotificationBorderLeftColor = (type: string, isRead: boolean) => {
    if (isRead) return 'rgba(0,0,0,0.1)';
    switch (type) {
      case 'success': return 'var(--success-color)';
      case 'warning': return 'var(--warning-color)';
      case 'error': return 'var(--danger-color)';
      default: return 'var(--accent-color)';
    }
  };

  const getNotificationBg = (type: string, isRead: boolean) => {
    if (isRead) return '#ffffff';
    switch (type) {
      case 'success': return 'rgba(43, 138, 62, 0.02)';
      case 'warning': return 'rgba(230, 126, 34, 0.02)';
      case 'error': return 'rgba(201, 42, 42, 0.02)';
      default: return 'rgba(0, 102, 204, 0.02)';
    }
  };

  const filteredNotifications = notifications.filter(n => {
    if (filter === 'unread') return !n.isRead;
    return true;
  });

  const formatTime = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleString(undefined, { 
      month: 'short', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div ref={containerRef} style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      
      {/* Header View */}
      <div className="notification-card-anim">
        <h1 style={{ fontSize: '32px', fontWeight: 800, letterSpacing: '-0.03em', color: '#111111', margin: 0 }}>
          Notifications Hub
        </h1>
        <p style={{ color: '#495057', fontSize: '15px', marginTop: '4px', margin: 0 }}>
          Keep track of important team tasks, automated workspace dispatches, and real-time operations alerts.
        </p>
      </div>

      {/* Controls Bar */}
      <div 
        className="notification-card-anim"
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
          padding: '16px 24px',
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          border: '1px solid var(--border-color)',
          boxShadow: 'var(--shadow-subtle)'
        }}
      >
        {/* Toggle Filters */}
        <div style={{ display: 'flex', gap: '8px' }}>
          <button 
            onClick={() => setFilter('all')}
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: 600,
              backgroundColor: filter === 'all' ? '#000000' : 'transparent',
              color: filter === 'all' ? '#ffffff' : 'var(--text-muted)',
              transition: 'all 0.2s'
            }}
          >
            All ({notifications.length})
          </button>
          <button 
            onClick={() => setFilter('unread')}
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: 600,
              backgroundColor: filter === 'unread' ? '#000000' : 'transparent',
              color: filter === 'unread' ? '#ffffff' : 'var(--text-muted)',
              transition: 'all 0.2s'
            }}
          >
            Unread ({notifications.filter(n => !n.isRead).length})
          </button>
        </div>

        {/* Global Actions */}
        {notifications.length > 0 && (
          <div style={{ display: 'flex', gap: '12px' }}>
            <button 
              onClick={handleMarkAllRead}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 16px',
                borderRadius: '10px',
                border: '1px solid var(--border-color)',
                backgroundColor: 'transparent',
                color: 'var(--text-main)',
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--bg-soft)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              <CheckCheck style={{ width: '16px', height: '16px' }} />
              Mark all read
            </button>
            <button 
              onClick={handleClearAll}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 16px',
                borderRadius: '10px',
                border: '1px solid rgba(201, 42, 42, 0.15)',
                backgroundColor: 'transparent',
                color: 'var(--danger-color)',
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(201, 42, 42, 0.05)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              <Trash2 style={{ width: '16px', height: '16px' }} />
              Clear all
            </button>
          </div>
        )}
      </div>

      {/* Main List */}
      {loading ? (
        <div style={{ padding: '64px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '15px' }}>
          Loading your notifications...
        </div>
      ) : filteredNotifications.length === 0 ? (
        /* Empty State */
        <div 
          className="notification-card-anim"
          style={{
            padding: '80px 32px',
            backgroundColor: '#ffffff',
            borderRadius: '24px',
            border: '1px solid var(--border-color)',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '16px',
            boxShadow: 'var(--shadow-subtle)'
          }}
        >
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            backgroundColor: 'var(--bg-soft)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--text-muted)'
          }}>
            <Bell style={{ width: '28px', height: '28px' }} />
          </div>
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#111111', margin: 0 }}>
              {filter === 'unread' ? 'No unread notifications' : 'Notifications Hub is clear'}
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginTop: '6px', maxWidth: '360px', margin: '6px auto 0' }}>
              {filter === 'unread' 
                ? 'Excellent! You have read all outstanding updates.' 
                : 'Whenever your team delegates tasks, generates invoices, or broadcasts logs, alerts will stream live right here.'}
            </p>
          </div>
        </div>
      ) : (
        /* Cards View List */
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {filteredNotifications.map((notif) => (
            <div 
              key={notif._id}
              className="notification-card-anim premium-card"
              onClick={() => !notif.isRead && handleMarkRead(notif._id)}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                padding: '20px 24px',
                backgroundColor: getNotificationBg(notif.type, notif.isRead),
                border: '1px solid var(--border-color)',
                borderLeft: `4px solid ${getNotificationBorderLeftColor(notif.type, notif.isRead)}`,
                borderRadius: '16px',
                cursor: notif.isRead ? 'default' : 'pointer',
                transition: 'all 0.25s ease',
                position: 'relative'
              }}
            >
              <div style={{ display: 'flex', gap: '16px', flex: 1, minWidth: 0 }}>
                {/* Visual Icon Badge */}
                <div style={{
                  padding: '10px',
                  borderRadius: '12px',
                  backgroundColor: '#ffffff',
                  border: '1px solid var(--border-color)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: '2px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
                }}>
                  {getNotificationIcon(notif.type)}
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{
                    fontSize: '15px',
                    fontWeight: notif.isRead ? 500 : 700,
                    color: '#111111',
                    margin: 0,
                    lineHeight: '1.4'
                  }}>
                    {notif.message}
                  </p>
                  
                  {/* Meta Details Row */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '16px', marginTop: '8px' }}>
                    <span style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontSize: '12px',
                      color: 'var(--text-muted)'
                    }}>
                      <Clock style={{ width: '13px', height: '13px' }} />
                      {formatTime(notif.createdAt)}
                    </span>

                    {!notif.isRead && (
                      <span style={{
                        fontSize: '11px',
                        fontWeight: 700,
                        backgroundColor: 'rgba(0, 102, 204, 0.08)',
                        color: 'var(--accent-color)',
                        padding: '2px 8px',
                        borderRadius: '12px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.04em'
                      }}>
                        New
                      </span>
                    )}

                    {notif.link && (
                      <a 
                        href={notif.link}
                        target="_blank"
                        rel="noreferrer"
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                          fontSize: '12px',
                          color: 'var(--accent-color)',
                          fontWeight: 600,
                          textDecoration: 'none'
                        }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        Action <ExternalLink style={{ width: '12px', height: '12px' }} />
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* Individual Actions */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginLeft: '16px' }}>
                <button 
                  onClick={(e) => handleDelete(notif._id, e)}
                  title="Delete Notification"
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: 'var(--text-muted)',
                    padding: '8px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
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
                  <Trash2 style={{ width: '16px', height: '16px' }} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};

export default Notifications;
