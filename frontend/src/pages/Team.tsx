import React, { useState, useRef } from 'react';
import { Mail, Shield, UserPlus, X, Send, User } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import api from '../services/api';

const Team = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inviteName, setInviteName] = useState('');
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState('developer');
  const [invitesSent, setInvitesSent] = useState<any[]>([]);
  const [alertMsg, setAlertMsg] = useState('');

  const containerRef = useRef<HTMLDivElement>(null);

  // Seeded premium members list
  const initialMembers = [
    { name: 'Alex Rivera', role: 'admin', email: 'alex.admin@autobiz.com', avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Alex', status: 'active', tasks: 3 },
    { name: 'Sarah Jenkins', role: 'manager', email: 'sarah.manager@autobiz.com', avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Sarah', status: 'active', tasks: 1 },
    { name: 'Michael Chen', role: 'developer', email: 'michael.developer@autobiz.com', avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Michael', status: 'away', tasks: 4 },
    { name: 'Emma Wilson', role: 'designer', email: 'emma.designer@autobiz.com', avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Emma', status: 'active', tasks: 2 },
    { name: 'John Doe', role: 'customer', email: 'client.john@autobiz.com', avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=John', status: 'offline', tasks: 0 }
  ];

  useGSAP(() => {
    gsap.fromTo(".team-element", 
      { opacity: 0, y: 10 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.03,
        duration: 0.35,
        ease: "power2.out"
      }
    );
  }, { scope: containerRef });

  const handleInviteSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteEmail || !inviteRole) return;

    const newInvite = {
      name: inviteName || inviteEmail.split('@')[0],
      role: inviteRole,
      email: inviteEmail,
      avatar: `https://api.dicebear.com/7.x/adventurer/svg?seed=${inviteName || 'Invite'}`,
      status: 'pending',
      tasks: 0
    };

    // Pre-emptively append pending invite to state
    setInvitesSent([newInvite, ...invitesSent]);
    setIsModalOpen(false);

    try {
      // Post request to trigger SMTP invitation
      await api.post('/auth/invite', {
        name: inviteName,
        email: inviteEmail,
        role: inviteRole
      });
      setAlertMsg(`Invitation sent successfully via SMTP to ${inviteEmail}!`);
    } catch (err: any) {
      console.error('Failed to send SMTP invite:', err);
      setAlertMsg(`Teammate added, but SMTP email delivery failed.`);
    }

    setInviteName('');
    setInviteEmail('');
    setInviteRole('developer');
    setTimeout(() => setAlertMsg(''), 5000);
  };

  return (
    <div ref={containerRef} style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      
      {/* Header Panel */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '20px'
      }} className="team-element">
        <div>
          <h1 style={{ fontSize: '32px', fontWeight: 800, letterSpacing: '-0.03em', color: '#111111', margin: 0 }}>Team Directory</h1>
          <p style={{ color: '#495057', fontSize: '15px', marginTop: '4px', margin: 0 }}>View team status, roles, and manage external invites.</p>
        </div>
        
        <button 
          onClick={() => setIsModalOpen(true)}
          className="btn btn-primary"
          style={{ padding: '12px 24px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.06)' }}
        >
          <UserPlus style={{ width: '20px', height: '20px' }} />
          Invite Team Member
        </button>
      </div>

      {alertMsg && (
        <div className="team-element" style={{
          backgroundColor: 'rgba(43, 138, 62, 0.08)',
          border: '1px solid rgba(43, 138, 62, 0.15)',
          color: '#2b8a3e',
          fontSize: '14px',
          fontWeight: 600,
          padding: '16px',
          borderRadius: '12px'
        }}>
          {alertMsg}
        </div>
      )}

      {/* Grid List */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '24px'
      }}>
        {/* Active Teammates */}
        {initialMembers.map((member, idx) => (
          <div 
            key={idx}
            className="premium-card team-element"
            style={{
              padding: '24px',
              backgroundColor: '#ffffff',
              border: '1px solid var(--border-color)',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              position: 'relative'
            }}
          >
            {/* Status Indicator Tag */}
            <span style={{
              position: 'absolute',
              top: '24px',
              right: '24px',
              fontSize: '10px',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              padding: '4px 10px',
              borderRadius: '50px',
              backgroundColor: 
                member.status === 'active' ? 'rgba(43, 138, 62, 0.08)' :
                member.status === 'away' ? 'rgba(230, 126, 34, 0.08)' :
                'rgba(134, 142, 150, 0.08)',
              color: 
                member.status === 'active' ? '#2b8a3e' :
                member.status === 'away' ? '#d9480f' :
                '#495057'
            }}>
              {member.status}
            </span>

            {/* Profile Info */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '8px' }}>
              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                overflow: 'hidden',
                backgroundColor: 'rgba(0,0,0,0.04)',
                border: '1px solid var(--border-color)'
              }}>
                <img src={member.avatar} alt={member.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#111111', margin: 0 }}>{member.name}</h3>
                <p style={{ fontSize: '11px', color: '#495057', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em', marginTop: '2px', margin: 0 }}>{member.role}</p>
              </div>
            </div>

            {/* Teammate Stats */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#495057', fontSize: '13px' }}>
                <Mail style={{ width: '14px', height: '14px', color: '#868e96' }} />
                <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{member.email}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#495057', fontSize: '13px' }}>
                <Shield style={{ width: '14px', height: '14px', color: '#868e96' }} />
                <span>{member.tasks} Active Tasks Assigned</span>
              </div>
            </div>
          </div>
        ))}

        {/* Invited Pending Members */}
        {invitesSent.map((member, idx) => (
          <div 
            key={idx}
            className="premium-card team-element"
            style={{
              padding: '24px',
              backgroundColor: '#ffffff',
              border: '1px dashed #ced4da',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              position: 'relative'
            }}
          >
            <span style={{
              position: 'absolute',
              top: '24px',
              right: '24px',
              fontSize: '10px',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              padding: '4px 10px',
              borderRadius: '50px',
              backgroundColor: 'rgba(0, 102, 204, 0.08)',
              color: '#0066cc'
            }}>
              pending invite
            </span>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '8px' }}>
              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                overflow: 'hidden',
                backgroundColor: 'rgba(0,0,0,0.04)',
                border: '1px solid var(--border-color)',
                opacity: 0.7
              }}>
                <img src={member.avatar} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#111111', margin: 0 }}>{member.name}</h3>
                <p style={{ fontSize: '11px', color: '#495057', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em', marginTop: '2px', margin: 0 }}>{member.role}</p>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#495057', fontSize: '13px' }}>
                <Mail style={{ width: '14px', height: '14px', color: '#868e96' }} />
                <span>{member.email}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Invite Member Drawer/Overlay */}
      {isModalOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0,0,0,0.15)',
          backdropFilter: 'blur(8px)',
          zIndex: 100,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
        }}>
          <div 
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '20px',
              border: '1px solid var(--border-color)',
              padding: '32px',
              width: '100%',
              maxWidth: '440px',
              boxShadow: 'var(--shadow-main)',
              display: 'flex',
              flexDirection: 'column',
              gap: '24px'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#111111', margin: 0, letterSpacing: '-0.02em' }}>Invite New Teammate</h2>
              <button 
                onClick={() => setIsModalOpen(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '6px', borderRadius: '50%', display: 'flex', alignItems: 'center' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.04)'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                <X style={{ width: '20px', height: '20px', color: '#495057' }} />
              </button>
            </div>

            <form onSubmit={handleInviteSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '13px', fontWeight: 700, color: '#111111' }}>Full Name</label>
                <div className="form-input-wrapper">
                  <User style={{ width: '18px', height: '18px', color: '#495057' }} className="form-icon" />
                  <input 
                    type="text" 
                    placeholder="E.g. Sarah Connor"
                    value={inviteName} 
                    onChange={(e) => setInviteName(e.target.value)} 
                    required
                    className="form-input"
                    style={{ color: '#111111' }}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '13px', fontWeight: 700, color: '#111111' }}>Email Address</label>
                <div className="form-input-wrapper">
                  <Mail style={{ width: '18px', height: '18px', color: '#495057' }} className="form-icon" />
                  <input 
                    type="email" 
                    placeholder="sarah@company.com"
                    value={inviteEmail} 
                    onChange={(e) => setInviteEmail(e.target.value)} 
                    required
                    className="form-input"
                    style={{ color: '#111111' }}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '13px', fontWeight: 700, color: '#111111' }}>System Role</label>
                <select 
                  value={inviteRole} 
                  onChange={(e) => setInviteRole(e.target.value)} 
                  className="form-input"
                  style={{ color: '#111111', cursor: 'pointer', paddingLeft: '16px' }}
                >
                  <option value="manager">Manager</option>
                  <option value="developer">Developer</option>
                  <option value="designer">Designer</option>
                  <option value="customer">Customer</option>
                </select>
              </div>

              <button 
                type="submit" 
                className="btn btn-primary"
                style={{
                  width: '100%',
                  height: '46px',
                  borderRadius: '12px',
                  marginTop: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}
              >
                <Send style={{ width: '16px', height: '16px' }} />
                Send Invitation Link
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default Team;
