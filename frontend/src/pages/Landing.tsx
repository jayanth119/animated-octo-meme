import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, BarChart2, Shield, Zap } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TextReveal from '../components/TextReveal';
import Magnetic from '../components/Magnetic';

gsap.registerPlugin(ScrollTrigger);

const Landing = () => {
  const container = useRef<HTMLDivElement>(null);
  const dashboardRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Navbar animation
    gsap.from(".nav-item", {
      y: -25,
      opacity: 0,
      duration: 1,
      stagger: 0.1,
      ease: "power4.out"
    });

    // Hero section elements
    const heroTl = gsap.timeline();
    heroTl.from(".hero-badge", {
      scale: 0.8,
      opacity: 0,
      duration: 0.8,
      ease: "back.out(1.7)",
      delay: 0.4
    })
    .from(".hero-para", {
      y: 35,
      opacity: 0,
      duration: 0.9,
      ease: "power3.out"
    }, "-=0.4")
    .from(".hero-btn", {
      y: 25,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: "power3.out"
    }, "-=0.5");

    // Dashboard preview entrance
    gsap.from(dashboardRef.current, {
      y: 120,
      opacity: 0,
      duration: 1.4,
      ease: "power4.out",
      scrollTrigger: {
        trigger: dashboardRef.current,
        start: "top 85%",
      }
    });

    // Parallax on dashboard inner
    gsap.to(".dashboard-inner", {
      y: -60,
      ease: "none",
      scrollTrigger: {
        trigger: dashboardRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });

    // Feature cards stagger reveal
    gsap.from(".feature-card", {
      y: 80,
      opacity: 0,
      duration: 1,
      stagger: 0.25,
      ease: "power3.out",
      scrollTrigger: {
        trigger: featuresRef.current,
        start: "top 75%",
      }
    });
  }, { scope: container });

  return (
    <div ref={container} className="landing-wrapper" style={{ minHeight: '100vh', position: 'relative', overflowX: 'hidden' }}>
      
      {/* Background Loop Video */}
      <div className="video-bg-container">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="video-bg"
        >
          <source src="/background.mp4" type="video/mp4" />
        </video>
        <div className="video-overlay" />
      </div>

      {/* Navbar */}
      <nav className="navbar-wrapper">
        <div className="navbar-container">
          <div className="logo-wrap nav-item">
            <div style={{
              width: '36px',
              height: '36px',
              backgroundColor: '#000000',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Zap className="logo-icon" style={{ color: '#ffffff', width: '20px', height: '20px' }} />
            </div>
            <span className="logo-text">AutoBiz</span>
          </div>

          <div className="nav-links">
            <a href="#features" className="nav-link-item nav-item">Features</a>
            <Link to="/solutions" className="nav-link-item nav-item">Solutions</Link>
            <Link to="/pricing" className="nav-link-item nav-item">Pricing</Link>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <Link to="/login" className="nav-link-item nav-item" style={{ fontWeight: 600 }}>Login</Link>
            <Magnetic>
              <Link to="/register" className="btn btn-primary nav-item" style={{ padding: '10px 20px', borderRadius: '10px' }}>
                Get Started
              </Link>
            </Magnetic>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section" style={{
        padding: '100px 24px 120px',
        maxWidth: '900px',
        margin: '0 auto',
        textAlign: 'center',
        position: 'relative'
      }}>
        <div className="hero-badge" style={{
          display: 'inline-block',
          padding: '8px 18px',
          marginBottom: '28px',
          fontSize: '11px',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.15em',
          color: '#000000',
          backgroundColor: 'rgba(0,0,0,0.06)',
          borderRadius: '50px'
        }}>
          Version 2.0 is live
        </div>
        
        <TextReveal 
          text="Automate your business workflows with ease."
          className="text-hero"
          style={{ marginBottom: '28px' }}
          type="words"
        />
        
        <p className="hero-para text-para" style={{
          maxWidth: '650px',
          margin: '0 auto 40px',
          fontSize: '20px',
          lineHeight: '1.6'
        }}>
          The all-in-one platform to manage tasks, analyze performance, and scale your operations without the complexity.
        </p>
        
        <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
          <Magnetic strength={0.2}>
            <Link to="/register" className="btn btn-primary hero-btn" style={{ height: '56px', padding: '0 32px', borderRadius: '14px', fontSize: '15px' }}>
              Start Building Now
              <ArrowRight className="btn-arrow" style={{ width: '18px', height: '18px' }} />
            </Link>
          </Magnetic>
          <Magnetic strength={0.2}>
            <button className="btn btn-secondary hero-btn" style={{ height: '56px', padding: '0 32px', borderRadius: '14px', fontSize: '15px' }}>
              Watch Demo
            </button>
          </Magnetic>
        </div>

        {/* Dashboard Preview mockup */}
        <div 
          ref={dashboardRef}
          style={{ marginTop: '80px', position: 'relative' }}
        >
          <div style={{
            position: 'absolute',
            inset: '-10px',
            background: 'radial-gradient(circle, rgba(0,0,0,0.02) 0%, transparent 70%)',
            filter: 'blur(40px)',
            zIndex: -1
          }} />
          
          <div className="dashboard-inner" style={{
            borderRadius: '24px',
            border: '1px solid var(--border-color)',
            backgroundColor: 'var(--bg-card)',
            overflow: 'hidden',
            boxShadow: 'var(--shadow-large)'
          }}>
            <div style={{
              backgroundColor: 'rgba(0,0,0,0.02)',
              borderBottom: '1px solid var(--border-color)',
              padding: '16px 24px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <div style={{ display: 'flex', gap: '6px' }}>
                <div style={{ width: '11px', height: '11px', borderRadius: '50%', backgroundColor: 'rgba(0,0,0,0.1)' }} />
                <div style={{ width: '11px', height: '11px', borderRadius: '50%', backgroundColor: 'rgba(0,0,0,0.1)' }} />
                <div style={{ width: '11px', height: '11px', borderRadius: '50%', backgroundColor: 'rgba(0,0,0,0.1)' }} />
              </div>
              <div style={{
                margin: '0 auto',
                fontSize: '11px',
                fontWeight: 600,
                color: 'var(--text-muted)',
                backgroundColor: 'rgba(0,0,0,0.04)',
                padding: '4px 16px',
                borderRadius: '6px',
                letterSpacing: '0.03em'
              }}>
                app.autobiz.com/dashboard
              </div>
            </div>
            
            <div style={{
              aspectRatio: '16/9',
              background: 'linear-gradient(135deg, #ffffff 0%, #f9f9f9 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '32px'
            }}>
               <div style={{
                 width: '100%',
                 height: '100%',
                 border: '1px solid var(--border-color)',
                 borderRadius: '16px',
                 backgroundColor: '#ffffff',
                 display: 'flex',
                 flexDirection: 'column',
                 gap: '16px',
                 padding: '24px',
                 boxShadow: '0 4px 20px rgba(0,0,0,0.01)'
               }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ height: '24px', width: '120px', backgroundColor: 'var(--bg-soft)', borderRadius: '6px' }} />
                    <div style={{ height: '32px', width: '32px', backgroundColor: 'var(--bg-soft)', borderRadius: '50%' }} />
                  </div>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
                    <div style={{ height: '90px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-soft)', borderRadius: '12px' }} />
                    <div style={{ height: '90px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-soft)', borderRadius: '12px' }} />
                    <div style={{ height: '90px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-soft)', borderRadius: '12px' }} />
                  </div>
                  
                  <div style={{ flex: 1, backgroundColor: 'var(--bg-soft)', borderRadius: '12px', minHeight: '80px' }} />
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" ref={featuresRef} style={{
        padding: '120px 24px',
        backgroundColor: 'rgba(0,0,0,0.01)',
        borderTop: '1px solid var(--border-color)',
        borderBottom: '1px solid var(--border-color)',
        position: 'relative',
        zIndex: 10
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '80px' }}>
            <h2 className="text-section-title" style={{ color: '#000000', marginBottom: '16px' }}>Everything you need to scale</h2>
            <p className="text-para">Focus on your business, we handle the complexity.</p>
          </div>
          
          <div className="grid-3">
            <div className="feature-card">
              <FeatureCard 
                icon={<Shield style={{ width: '24px', height: '24px', color: '#000000' }} />}
                title="Enterprise Security"
                description="Bank-grade encryption and role-based access control to keep your data safe."
              />
            </div>
            <div className="feature-card">
              <FeatureCard 
                icon={<BarChart2 style={{ width: '24px', height: '24px', color: '#000000' }} />}
                title="Real-time Analytics"
                description="Get insights into your business performance with live dashboard updates."
              />
            </div>
            <div className="feature-card">
              <FeatureCard 
                icon={<CheckCircle style={{ width: '24px', height: '24px', color: '#000000' }} />}
                title="Workflow Automation"
                description="Set up triggers and actions to automate repetitive tasks and save time."
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        padding: '80px 24px',
        backgroundColor: '#ffffff',
        borderTop: '1px solid var(--border-color)'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '30px'
        }}>
          <div className="logo-wrap" style={{ fontSize: '18px' }}>
            <div style={{
              width: '28px',
              height: '28px',
              backgroundColor: '#000000',
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Zap style={{ color: '#ffffff', width: '16px', height: '16px' }} />
            </div>
            <span>AutoBiz</span>
          </div>
          
          <div style={{ flex: 1, textAlign: 'center', fontSize: '13px', color: 'var(--text-muted)' }}>
            © 2026 AutoBiz Inc. All rights reserved.
          </div>
          
          <div style={{ display: 'flex', gap: '24px' }}>
            <a href="#" className="nav-link-item" style={{ fontSize: '13px' }}>Twitter</a>
            <a href="#" className="nav-link-item" style={{ fontSize: '13px' }}>GitHub</a>
            <a href="#" className="nav-link-item" style={{ fontSize: '13px' }}>LinkedIn</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
  <div className="premium-card">
    <div style={{
      width: '48px',
      height: '48px',
      borderRadius: '12px',
      backgroundColor: 'rgba(0,0,0,0.04)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: '24px'
    }}>
      {icon}
    </div>
    <h3 style={{ fontSize: '20px', fontWeight: 800, marginBottom: '12px', color: '#000000' }}>{title}</h3>
    <p className="text-para" style={{ fontSize: '14px', lineHeight: '1.6' }}>{description}</p>
  </div>
);

export default Landing;
