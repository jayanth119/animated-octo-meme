import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Zap, BarChart2, Shield, Heart } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const Solutions = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(".sol-fade",
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.08,
        duration: 0.5,
        ease: "power2.out"
      }
    );
  }, { scope: containerRef });

  const solutionList = [
    {
      icon: <Zap style={{ width: '24px', height: '24px', color: '#111111' }} />,
      title: "Enterprise Workflows",
      description: "Automate cross-departmental operations, sync logs, and eliminate repetitive pipeline queues.",
      metric: "145% Faster Execution",
      useCase: "Best for growing organizations and engineering teams."
    },
    {
      icon: <BarChart2 style={{ width: '24px', height: '24px', color: '#111111' }} />,
      title: "Advanced Data Intelligence",
      description: "Harness live performance statistics, conversion metrics, and visual analytics dashboards in one platform.",
      metric: "99.4% Forecast Precision",
      useCase: "Best for sales teams, marketing agencies, and operations directors."
    },
    {
      icon: <Shield style={{ width: '24px', height: '24px', color: '#111111' }} />,
      title: "Bank-Grade Compliance",
      description: "Enforce multi-factor verification systems, encrypted database connections, and safe credentials authorization.",
      metric: "Zero Security Vulnerabilities",
      useCase: "Best for financial portals, retail SaaS solutions, and healthcare applications."
    },
    {
      icon: <Heart style={{ width: '24px', height: '24px', color: '#111111' }} />,
      title: "Client & Customer Hubs",
      description: "Expose safe portals for clients, track orders, delegate client permissions, and synchronize team invites.",
      metric: "40% Lower Friction",
      useCase: "Best for digital product designers, client managers, and support staff."
    }
  ];

  return (
    <div ref={containerRef} style={{ minHeight: '100vh', backgroundColor: '#ffffff', position: 'relative' }}>
      
      {/* Background Loop Video */}
      <div className="video-bg-container">
        <video autoPlay loop muted playsInline className="video-bg">
          <source src="/background.mp4" type="video/mp4" />
        </video>
        <div className="video-overlay" />
      </div>

      {/* Navbar */}
      <nav className="navbar-wrapper">
        <div className="navbar-container">
          <Link to="/" className="logo-wrap" style={{ textDecoration: 'none', color: '#000000' }}>
            <div style={{
              width: '36px',
              height: '36px',
              backgroundColor: '#000000',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Zap style={{ color: '#ffffff', width: '20px', height: '20px' }} />
            </div>
            <span className="logo-text">AutoBiz</span>
          </Link>

          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <Link to="/pricing" className="nav-link-item" style={{ fontWeight: 600 }}>Pricing</Link>
            <Link to="/login" className="nav-link-item" style={{ fontWeight: 600 }}>Login</Link>
            <Link to="/register" className="btn btn-primary" style={{ padding: '10px 20px', borderRadius: '10px' }}>
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Header section */}
      <section style={{ maxWidth: '1000px', margin: '0 auto', padding: '120px 24px 60px', textAlign: 'center' }}>
        <Link to="/" className="sol-fade" style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          fontSize: '13px',
          fontWeight: 700,
          color: '#495057',
          textDecoration: 'none',
          marginBottom: '24px'
        }}>
          <ArrowLeft style={{ width: '16px', height: '16px' }} />
          Back to homepage
        </Link>
        <h1 className="sol-fade" style={{ fontSize: '48px', fontWeight: 800, color: '#111111', letterSpacing: '-0.04em', margin: 0 }}>
          Tailored Workflow Solutions.
        </h1>
        <p className="sol-fade text-para" style={{ maxWidth: '600px', margin: '16px auto 0', fontSize: '18px', lineHeight: '1.6' }}>
          Explore dedicated business engines customized to scale your performance metrics and eliminate manual operations.
        </p>
      </section>

      {/* Solutions Grid */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px 100px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '32px'
        }}>
          {solutionList.map((sol, idx) => (
            <div 
              key={idx}
              className="premium-card sol-fade"
              style={{
                padding: '32px',
                backgroundColor: '#ffffff',
                border: '1px solid var(--border-color)',
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
                transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#111111';
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = 'var(--shadow-main)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border-color)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'var(--shadow-subtle)';
              }}
            >
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                backgroundColor: 'rgba(0,0,0,0.04)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {sol.icon}
              </div>

              <div>
                <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#111111', margin: 0 }}>{sol.title}</h3>
                <p style={{ fontSize: '14px', color: '#495057', lineHeight: '1.6', marginTop: '8px', margin: 0 }}>{sol.description}</p>
              </div>

              <div style={{ width: '100%', height: '1px', backgroundColor: 'var(--border-color)' }} />

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '12px', fontWeight: 800, color: '#2b8a3e', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{sol.metric}</span>
                <span style={{ fontSize: '11px', color: '#868e96', fontWeight: 600 }}>{sol.useCase}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action Banner */}
      <section style={{
        maxWidth: '1200px',
        margin: '0 auto 120px',
        padding: '0 24px'
      }} className="sol-fade">
        <div style={{
          backgroundColor: '#0c1b33',
          background: 'linear-gradient(135deg, #0c1b33 0%, #0066cc 100%)',
          borderRadius: '24px',
          padding: '60px 40px',
          textAlign: 'center',
          color: '#ffffff',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '24px',
          boxShadow: 'var(--shadow-large)'
        }}>
          <h2 style={{ fontSize: '32px', fontWeight: 800, letterSpacing: '-0.02em', margin: 0 }}>Ready to accelerate your operations?</h2>
          <p style={{ fontSize: '16px', color: 'rgba(255, 255, 255, 0.8)', maxWidth: '500px', margin: 0 }}>
            Join thousands of modern enterprises running their pipelines on AutoBiz cloud environments.
          </p>
          <Link to="/register" className="btn btn-primary" style={{
            backgroundColor: '#ffffff',
            color: '#000000',
            height: '48px',
            padding: '0 32px',
            borderRadius: '12px',
            fontWeight: 700,
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            Create Your Free Account
            <ArrowRight style={{ width: '16px', height: '16px' }} />
          </Link>
        </div>
      </section>

    </div>
  );
};

export default Solutions;
