import { useState, useRef } from 'react';
import { Shield, Bell, Key, Sparkles, RefreshCw, Clipboard, Check } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const Settings = () => {
  const [mfaEnabled, setMfaEnabled] = useState(false);
  const [biometricsEnabled, setBiometricsEnabled] = useState(true);
  
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(false);
  const [pushAlerts, setPushAlerts] = useState(true);

  const [activeTheme, setActiveTheme] = useState('light');
  
  const [apiToken, setApiToken] = useState('ab_live_948f2ef8cda1098bfe7d8900117');
  const [tokenCopied, setTokenCopied] = useState(false);
  const [generatingToken, setGeneratingToken] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(".settings-fade",
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

  const handleGenerateToken = () => {
    setGeneratingToken(true);
    setTimeout(() => {
      const generated = 'ab_live_' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      setApiToken(generated);
      setGeneratingToken(false);
    }, 800);
  };

  const handleCopyToken = () => {
    navigator.clipboard.writeText(apiToken);
    setTokenCopied(true);
    setTimeout(() => setTokenCopied(false), 2000);
  };

  return (
    <div ref={containerRef} style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      
      {/* Header Info */}
      <div className="settings-fade">
        <h1 style={{ fontSize: '32px', fontWeight: 800, letterSpacing: '-0.03em', color: '#111111', margin: 0 }}>Account Settings</h1>
        <p style={{ color: '#495057', fontSize: '15px', marginTop: '4px', margin: 0 }}>Configure platform variables, notifications, security settings, and generate API tokens.</p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '32px'
      }}>
        
        {/* Card 1: Platform Security & Multi-Factor */}
        <div 
          className="premium-card settings-fade"
          style={{
            padding: '28px',
            backgroundColor: '#ffffff',
            border: '1px solid var(--border-color)',
            display: 'flex',
            flexDirection: 'column',
            gap: '24px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Shield style={{ width: '22px', height: '22px', color: '#111111' }} />
            <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#111111', margin: 0 }}>Platform Security</h3>
          </div>

          <div style={{ width: '100%', height: '1px', backgroundColor: 'var(--border-color)' }} />

          {/* Toggle Switches */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <p style={{ fontSize: '14px', fontWeight: 700, color: '#111111', margin: 0 }}>Multi-Factor Authentication (MFA)</p>
                <p style={{ fontSize: '12px', color: '#495057', marginTop: '2px', margin: 0 }}>Protect your account with verification keys.</p>
              </div>
              <button 
                onClick={() => setMfaEnabled(!mfaEnabled)}
                style={{
                  width: '44px',
                  height: '24px',
                  borderRadius: '50px',
                  backgroundColor: mfaEnabled ? '#000000' : '#e9ecef',
                  border: 'none',
                  position: 'relative',
                  cursor: 'pointer',
                  transition: 'background-color 0.25s'
                }}
              >
                <div style={{
                  width: '18px',
                  height: '18px',
                  borderRadius: '50%',
                  backgroundColor: '#ffffff',
                  position: 'absolute',
                  top: '3px',
                  left: mfaEnabled ? '23px' : '3px',
                  transition: 'left 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }} />
              </button>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <p style={{ fontSize: '14px', fontWeight: 700, color: '#111111', margin: 0 }}>Biometric Sign In</p>
                <p style={{ fontSize: '12px', color: '#495057', marginTop: '2px', margin: 0 }}>Log in instantly with TouchID or FaceID.</p>
              </div>
              <button 
                onClick={() => setBiometricsEnabled(!biometricsEnabled)}
                style={{
                  width: '44px',
                  height: '24px',
                  borderRadius: '50px',
                  backgroundColor: biometricsEnabled ? '#000000' : '#e9ecef',
                  border: 'none',
                  position: 'relative',
                  cursor: 'pointer',
                  transition: 'background-color 0.25s'
                }}
              >
                <div style={{
                  width: '18px',
                  height: '18px',
                  borderRadius: '50%',
                  backgroundColor: '#ffffff',
                  position: 'absolute',
                  top: '3px',
                  left: biometricsEnabled ? '23px' : '3px',
                  transition: 'left 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }} />
              </button>
            </div>
          </div>
        </div>

        {/* Card 2: Notification Center */}
        <div 
          className="premium-card settings-fade"
          style={{
            padding: '28px',
            backgroundColor: '#ffffff',
            border: '1px solid var(--border-color)',
            display: 'flex',
            flexDirection: 'column',
            gap: '24px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Bell style={{ width: '22px', height: '22px', color: '#111111' }} />
            <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#111111', margin: 0 }}>Notification Alerts</h3>
          </div>

          <div style={{ width: '100%', height: '1px', backgroundColor: 'var(--border-color)' }} />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <p style={{ fontSize: '14px', fontWeight: 700, color: '#111111', margin: 0 }}>Email Notifications</p>
                <p style={{ fontSize: '12px', color: '#495057', marginTop: '2px', margin: 0 }}>Receive core system summaries via email.</p>
              </div>
              <button 
                onClick={() => setEmailAlerts(!emailAlerts)}
                style={{
                  width: '44px',
                  height: '24px',
                  borderRadius: '50px',
                  backgroundColor: emailAlerts ? '#000000' : '#e9ecef',
                  border: 'none',
                  position: 'relative',
                  cursor: 'pointer',
                  transition: 'background-color 0.25s'
                }}
              >
                <div style={{
                  width: '18px',
                  height: '18px',
                  borderRadius: '50%',
                  backgroundColor: '#ffffff',
                  position: 'absolute',
                  top: '3px',
                  left: emailAlerts ? '23px' : '3px',
                  transition: 'left 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }} />
              </button>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <p style={{ fontSize: '14px', fontWeight: 700, color: '#111111', margin: 0 }}>SMS Text Updates</p>
                <p style={{ fontSize: '12px', color: '#495057', marginTop: '2px', margin: 0 }}>Receive high-priority task alerts on SMS.</p>
              </div>
              <button 
                onClick={() => setSmsAlerts(!smsAlerts)}
                style={{
                  width: '44px',
                  height: '24px',
                  borderRadius: '50px',
                  backgroundColor: smsAlerts ? '#000000' : '#e9ecef',
                  border: 'none',
                  position: 'relative',
                  cursor: 'pointer',
                  transition: 'background-color 0.25s'
                }}
              >
                <div style={{
                  width: '18px',
                  height: '18px',
                  borderRadius: '50%',
                  backgroundColor: '#ffffff',
                  position: 'absolute',
                  top: '3px',
                  left: smsAlerts ? '23px' : '3px',
                  transition: 'left 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }} />
              </button>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <p style={{ fontSize: '14px', fontWeight: 700, color: '#111111', margin: 0 }}>Push Feed Banner Notifications</p>
                <p style={{ fontSize: '12px', color: '#495057', marginTop: '2px', margin: 0 }}>Receive real-time banners in this browser.</p>
              </div>
              <button 
                onClick={() => setPushAlerts(!pushAlerts)}
                style={{
                  width: '44px',
                  height: '24px',
                  borderRadius: '50px',
                  backgroundColor: pushAlerts ? '#000000' : '#e9ecef',
                  border: 'none',
                  position: 'relative',
                  cursor: 'pointer',
                  transition: 'background-color 0.25s'
                }}
              >
                <div style={{
                  width: '18px',
                  height: '18px',
                  borderRadius: '50%',
                  backgroundColor: '#ffffff',
                  position: 'absolute',
                  top: '3px',
                  left: pushAlerts ? '23px' : '3px',
                  transition: 'left 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }} />
              </button>
            </div>
          </div>
        </div>

        {/* Card 3: Display Style Settings */}
        <div 
          className="premium-card settings-fade"
          style={{
            padding: '28px',
            backgroundColor: '#ffffff',
            border: '1px solid var(--border-color)',
            display: 'flex',
            flexDirection: 'column',
            gap: '24px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Sparkles style={{ width: '22px', height: '22px', color: '#111111' }} />
            <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#111111', margin: 0 }}>Display & Themes</h3>
          </div>

          <div style={{ width: '100%', height: '1px', backgroundColor: 'var(--border-color)' }} />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <p style={{ fontSize: '14px', fontWeight: 700, color: '#111111', margin: 0 }}>System Visual Theme</p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                { id: 'light', name: 'Light Studio' },
                { id: 'vibrant', name: 'Vibrant Dark Accent' },
                { id: 'glass', name: 'Glassmorphism Blur' }
              ].map((theme) => (
                <button
                  key={theme.id}
                  onClick={() => setActiveTheme(theme.id)}
                  style={{
                    padding: '12px 16px',
                    borderRadius: '12px',
                    border: activeTheme === theme.id ? '2px solid #000000' : '1px solid var(--border-color)',
                    backgroundColor: activeTheme === theme.id ? 'rgba(0,0,0,0.03)' : '#ffffff',
                    color: '#111111',
                    fontSize: '13px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.2s',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <span>{theme.name}</span>
                  {activeTheme === theme.id && <Check style={{ width: '16px', height: '16px', strokeWidth: 3 }} />}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Card 4: Developer Credentials & API Token */}
        <div 
          className="premium-card settings-fade"
          style={{
            padding: '28px',
            backgroundColor: '#ffffff',
            border: '1px solid var(--border-color)',
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
            gridColumn: 'span 2'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Key style={{ width: '22px', height: '22px', color: '#111111' }} />
            <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#111111', margin: 0 }}>Developer Access Keys</h3>
          </div>

          <div style={{ width: '100%', height: '1px', backgroundColor: 'var(--border-color)' }} />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <p style={{ fontSize: '14px', fontWeight: 700, color: '#111111', margin: 0 }}>Live API Key Token</p>
            <p style={{ fontSize: '12px', color: '#495057', margin: 0 }}>Use this secret key to query tasks programmatically from external systems.</p>
            
            <div style={{
              display: 'flex',
              gap: '12px',
              alignItems: 'center',
              backgroundColor: '#fafafa',
              border: '1px solid var(--border-color)',
              padding: '6px 6px 6px 16px',
              borderRadius: '12px',
              marginTop: '8px'
            }}>
              <code style={{
                fontFamily: 'monospace',
                fontSize: '13px',
                color: '#111111',
                flex: 1,
                userSelect: 'all',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
              }}>
                {apiToken}
              </code>

              <div style={{ display: 'flex', gap: '6px' }}>
                <button 
                  onClick={handleCopyToken}
                  style={{
                    backgroundColor: '#ffffff',
                    border: '1px solid var(--border-color)',
                    cursor: 'pointer',
                    width: '38px',
                    height: '38px',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#495057',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.borderColor = '#000000'}
                  onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--border-color)'}
                  title="Copy Key to Clipboard"
                >
                  {tokenCopied ? <Check style={{ width: '16px', height: '16px', color: '#2b8a3e' }} /> : <Clipboard style={{ width: '16px', height: '16px' }} />}
                </button>

                <button 
                  onClick={handleGenerateToken}
                  disabled={generatingToken}
                  style={{
                    backgroundColor: '#000000',
                    border: 'none',
                    cursor: 'pointer',
                    width: '38px',
                    height: '38px',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#ffffff',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#212529'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#000000'}
                  title="Roll / Rotate Access Token"
                >
                  <RefreshCw style={{ width: '16px', height: '16px', animation: generatingToken ? 'spin 1s linear infinite' : 'none' }} />
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};

export default Settings;
