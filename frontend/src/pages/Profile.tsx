import React, { useState, useRef } from 'react';
import { useAuthStore } from '../store/authStore';
import axios from 'axios';
import { User, Mail, Shield, Check, Loader2, RefreshCw } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const Profile = () => {
  const { user, accessToken, updateUser } = useAuthStore();
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [role, setRole] = useState(user?.role || '');
  const [selectedAvatar, setSelectedAvatar] = useState(user?.avatar || '');
  
  const [isSaving, setIsSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const containerRef = useRef<HTMLDivElement>(null);

  // 6 Seeded Premium DiceBear Avatars
  const avatarPresets = [
    'https://api.dicebear.com/7.x/adventurer/svg?seed=Alex',
    'https://api.dicebear.com/7.x/adventurer/svg?seed=Sarah',
    'https://api.dicebear.com/7.x/adventurer/svg?seed=Michael',
    'https://api.dicebear.com/7.x/adventurer/svg?seed=Emma',
    'https://api.dicebear.com/7.x/adventurer/svg?seed=John',
    'https://api.dicebear.com/7.x/adventurer/svg?seed=Grace'
  ];

  useGSAP(() => {
    gsap.fromTo(".profile-fade",
      { opacity: 0, y: 15 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.05,
        duration: 0.4,
        ease: "power2.out"
      }
    );
  }, { scope: containerRef });

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSuccessMsg('');
    setErrorMsg('');

    try {
      const response = await axios.put(
        '/api/auth/profile', 
        { name, email, role, avatar: selectedAvatar },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );

      if (response.data.success) {
        updateUser(response.data.user);
        setSuccessMsg('Profile updated successfully!');
        setTimeout(() => setSuccessMsg(''), 4000);
      }
    } catch (err: any) {
      setErrorMsg(err.response?.data?.message || 'Failed to update profile. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleRandomizeAvatar = () => {
    const randomSeed = Math.random().toString(36).substring(7);
    setSelectedAvatar(`https://api.dicebear.com/7.x/adventurer/svg?seed=${randomSeed}`);
  };

  return (
    <div ref={containerRef} style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      
      {/* Header Info */}
      <div className="profile-fade">
        <h1 style={{ fontSize: '32px', fontWeight: 800, letterSpacing: '-0.03em', color: '#111111', margin: 0 }}>My Profile</h1>
        <p style={{ color: '#495057', fontSize: '15px', marginTop: '4px', margin: 0 }}>Manage your personal details and avatar preferences.</p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '32px',
        alignItems: 'start'
      }}>
        
        {/* Left Side: Profile Card & Preset Selector */}
        <div 
          className="premium-card profile-fade"
          style={{
            padding: '32px',
            backgroundColor: '#ffffff',
            border: '1px solid var(--border-color)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            gap: '24px'
          }}
        >
          <div style={{ position: 'relative' }}>
            <div style={{
              width: '120px',
              height: '120px',
              borderRadius: '50%',
              overflow: 'hidden',
              border: '3px solid #000000',
              boxShadow: '0 8px 24px rgba(0,0,0,0.06)',
              backgroundColor: '#fafafa'
            }}>
              <img src={selectedAvatar} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            
            <button 
              onClick={handleRandomizeAvatar}
              style={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                backgroundColor: '#000000',
                border: 'none',
                cursor: 'pointer',
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
              }}
              title="Generate Random Avatar"
            >
              <RefreshCw style={{ width: '14px', height: '14px' }} />
            </button>
          </div>

          <div>
            <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#111111', margin: 0 }}>{user?.name}</h2>
            <p style={{ fontSize: '13px', color: '#495057', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '6px', margin: 0 }}>{user?.role}</p>
            <p style={{ fontSize: '14px', color: '#868e96', marginTop: '4px', margin: 0 }}>{user?.email}</p>
          </div>

          {/* Divider */}
          <div style={{ width: '100%', height: '1px', backgroundColor: 'var(--border-color)' }} />

          {/* Avatar Presets Selection */}
          <div style={{ width: '100%', textAlign: 'left' }}>
            <p style={{ fontSize: '13px', fontWeight: 700, color: '#111111', marginBottom: '12px' }}>Choose Preset Avatar</p>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(6, 1fr)',
              gap: '10px'
            }}>
              {avatarPresets.map((avatar, idx) => (
                <button 
                  key={idx}
                  onClick={() => setSelectedAvatar(avatar)}
                  style={{
                    padding: 0,
                    border: selectedAvatar === avatar ? '2px solid #000000' : '1px solid var(--border-color)',
                    borderRadius: '50%',
                    cursor: 'pointer',
                    overflow: 'hidden',
                    width: '100%',
                    aspectRatio: '1',
                    backgroundColor: '#fafafa',
                    transition: 'all 0.2s',
                    position: 'relative'
                  }}
                >
                  <img src={avatar} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  {selectedAvatar === avatar && (
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      backgroundColor: 'rgba(0,0,0,0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#ffffff'
                    }}>
                      <Check style={{ width: '12px', height: '12px', strokeWidth: 3 }} />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Form details modification */}
        <div 
          className="premium-card profile-fade"
          style={{
            padding: '32px',
            backgroundColor: '#ffffff',
            border: '1px solid var(--border-color)'
          }}
        >
          <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#111111', marginBottom: '24px', letterSpacing: '-0.02em' }}>Profile Information</h2>

          {successMsg && (
            <div style={{
              backgroundColor: 'rgba(43, 138, 62, 0.08)',
              border: '1px solid rgba(43, 138, 62, 0.15)',
              color: '#2b8a3e',
              fontSize: '14px',
              fontWeight: 600,
              padding: '16px',
              borderRadius: '12px',
              marginBottom: '24px'
            }}>
              {successMsg}
            </div>
          )}

          {errorMsg && (
            <div style={{
              backgroundColor: 'rgba(201, 42, 42, 0.08)',
              border: '1px solid rgba(201, 42, 42, 0.15)',
              color: '#c92a2a',
              fontSize: '14px',
              fontWeight: 600,
              padding: '16px',
              borderRadius: '12px',
              marginBottom: '24px'
            }}>
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleUpdate} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '13px', fontWeight: 700, color: '#111111' }}>Full Name</label>
              <div className="form-input-wrapper">
                <User style={{ width: '18px', height: '18px', color: '#495057' }} className="form-icon" />
                <input 
                  type="text" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
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
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  required
                  className="form-input"
                  style={{ color: '#111111' }}
                />
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '13px', fontWeight: 700, color: '#111111' }}>System Role</label>
              <div className="form-input-wrapper">
                <Shield style={{ width: '18px', height: '18px', color: '#495057' }} className="form-icon" />
                <select 
                  value={role} 
                  onChange={(e) => setRole(e.target.value)} 
                  className="form-input"
                  style={{ color: '#111111', paddingLeft: '44px', cursor: 'pointer' }}
                >
                  <option value="admin">Admin</option>
                  <option value="manager">Manager</option>
                  <option value="developer">Developer</option>
                  <option value="designer">Designer</option>
                  <option value="customer">Customer</option>
                </select>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isSaving}
              className="btn btn-primary"
              style={{
                width: '100%',
                height: '48px',
                borderRadius: '12px',
                marginTop: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
            >
              {isSaving ? (
                <Loader2 style={{ width: '20px', height: '20px', animation: 'spin 1s linear infinite' }} />
              ) : (
                'Save Profile Changes'
              )}
            </button>
          </form>
        </div>

      </div>

    </div>
  );
};

export default Profile;
