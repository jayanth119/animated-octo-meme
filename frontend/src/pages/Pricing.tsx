import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Check, Zap } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const Pricing = () => {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'annually'>('monthly');
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(".price-fade",
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

  const plans = [
    {
      name: "Starter Trial",
      monthlyPrice: 0,
      annualPrice: 0,
      description: "Experience workflow automation without limits during the free period.",
      features: [
        "Up to 5 Team Members",
        "Seeded Demo Credentials",
        "Basic Task Logs Grid",
        "High-Contrast Overview Board",
        "Standard Email Feeds"
      ],
      cta: "Start Free Trial",
      popular: false
    },
    {
      name: "Professional Studio",
      monthlyPrice: 29,
      annualPrice: 23,
      description: "Ultimate operational controls for fast-growing departments and agencies.",
      features: [
        "Up to 25 Active Teammates",
        "Interactive Avatar Selection",
        "Advanced Analytics & Charts",
        "Two-Factor Security Toggle",
        "SMS Warning Services"
      ],
      cta: "Unlock Pro Engine",
      popular: true
    },
    {
      name: "Enterprise Cloud",
      monthlyPrice: 99,
      annualPrice: 79,
      description: "Total control over API access, tokens, and multi-factor compliance.",
      features: [
        "Unlimited Teammates & Clients",
        "Developer API Keys Generator",
        "Vibrant System Themes Selector",
        "Continuous Database Seeders",
        "24/7 Technical Slack Support"
      ],
      cta: "Configure Cloud Space",
      popular: false
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
            <Link to="/solutions" className="nav-link-item" style={{ fontWeight: 600 }}>Solutions</Link>
            <Link to="/login" className="nav-link-item" style={{ fontWeight: 600 }}>Login</Link>
            <Link to="/register" className="btn btn-primary" style={{ padding: '10px 20px', borderRadius: '10px' }}>
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Header section */}
      <section style={{ maxWidth: '1000px', margin: '0 auto', padding: '120px 24px 40px', textAlign: 'center' }}>
        <Link to="/" className="price-fade" style={{
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
        <h1 className="price-fade" style={{ fontSize: '48px', fontWeight: 800, color: '#111111', letterSpacing: '-0.04em', margin: 0 }}>
          Transparent, Snappy Pricing.
        </h1>
        <p className="price-fade text-para" style={{ maxWidth: '600px', margin: '16px auto 0', fontSize: '18px', lineHeight: '1.6' }}>
          Select the optimal plan to automate your pipelines. Toggle annual billing to save 20% instantly.
        </p>

        {/* Interactive Period Selector Toggle Switch */}
        <div className="price-fade" style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '12px',
          backgroundColor: 'rgba(0,0,0,0.03)',
          padding: '6px',
          borderRadius: '50px',
          marginTop: '40px',
          border: '1px solid var(--border-color)'
        }}>
          <button 
            onClick={() => setBillingPeriod('monthly')}
            style={{
              padding: '10px 24px',
              borderRadius: '50px',
              border: 'none',
              backgroundColor: billingPeriod === 'monthly' ? '#000000' : 'transparent',
              color: billingPeriod === 'monthly' ? '#ffffff' : '#495057',
              fontSize: '13px',
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
          >
            Billed Monthly
          </button>
          
          <button 
            onClick={() => setBillingPeriod('annually')}
            style={{
              padding: '10px 24px',
              borderRadius: '50px',
              border: 'none',
              backgroundColor: billingPeriod === 'annually' ? '#000000' : 'transparent',
              color: billingPeriod === 'annually' ? '#ffffff' : '#495057',
              fontSize: '13px',
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <span>Billed Annually</span>
            <span style={{
              fontSize: '9px',
              fontWeight: 800,
              backgroundColor: '#2b8a3e',
              color: '#ffffff',
              padding: '2px 6px',
              borderRadius: '4px',
              textTransform: 'uppercase'
            }}>
              save 20%
            </span>
          </button>
        </div>
      </section>

      {/* Plans Card Grid */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px 120px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '32px',
          alignItems: 'stretch'
        }}>
          {plans.map((plan, idx) => {
            const displayPrice = billingPeriod === 'monthly' ? plan.monthlyPrice : plan.annualPrice;
            
            return (
              <div 
                key={idx}
                className="premium-card price-fade"
                style={{
                  padding: '40px 32px',
                  backgroundColor: plan.popular ? '#0c1b33' : '#ffffff',
                  color: plan.popular ? '#ffffff' : '#111111',
                  border: plan.popular ? '2px solid #111111' : '1px solid var(--border-color)',
                  borderRadius: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '24px',
                  position: 'relative',
                  transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                  boxShadow: plan.popular ? 'var(--shadow-large)' : 'var(--shadow-subtle)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-6px)';
                  if (!plan.popular) e.currentTarget.style.borderColor = '#111111';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  if (!plan.popular) e.currentTarget.style.borderColor = 'var(--border-color)';
                }}
              >
                {/* Popularity Badge */}
                {plan.popular && (
                  <span style={{
                    position: 'absolute',
                    top: '24px',
                    right: '32px',
                    fontSize: '10px',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    padding: '4px 12px',
                    borderRadius: '50px',
                    backgroundColor: '#ffffff',
                    color: '#0c1b33'
                  }}>
                    Most Popular
                  </span>
                )}

                <div>
                  <h3 style={{ fontSize: '20px', fontWeight: 800, margin: 0 }}>{plan.name}</h3>
                  <p style={{ 
                    fontSize: '14px', 
                    color: plan.popular ? 'rgba(255,255,255,0.7)' : '#495057', 
                    lineHeight: '1.5',
                    marginTop: '8px',
                    margin: 0
                  }}>
                    {plan.description}
                  </p>
                </div>

                <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                  <span style={{ fontSize: '44px', fontWeight: 800, letterSpacing: '-0.03em' }}>${displayPrice}</span>
                  <span style={{ fontSize: '14px', color: plan.popular ? 'rgba(255,255,255,0.7)' : '#868e96', fontWeight: 600 }}>/month</span>
                </div>

                <div style={{ width: '100%', height: '1px', backgroundColor: plan.popular ? 'rgba(255,255,255,0.1)' : 'var(--border-color)' }} />

                {/* Features List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', flex: 1 }}>
                  {plan.features.map((feature, fIdx) => (
                    <div key={fIdx} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{
                        width: '18px',
                        height: '18px',
                        borderRadius: '50%',
                        backgroundColor: plan.popular ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.04)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: plan.popular ? '#ffffff' : '#111111'
                      }}>
                        <Check style={{ width: '12px', height: '12px', strokeWidth: 3 }} />
                      </div>
                      <span style={{ fontSize: '13px', fontWeight: 600 }}>{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Submit action */}
                <Link 
                  to="/register" 
                  className="btn"
                  style={{
                    width: '100%',
                    height: '48px',
                    borderRadius: '12px',
                    backgroundColor: plan.popular ? '#ffffff' : '#000000',
                    color: plan.popular ? '#000000' : '#ffffff',
                    fontWeight: 700,
                    fontSize: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textDecoration: 'none',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    if (plan.popular) {
                      e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.9)';
                    } else {
                      e.currentTarget.style.backgroundColor = '#212529';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (plan.popular) {
                      e.currentTarget.style.backgroundColor = '#ffffff';
                    } else {
                      e.currentTarget.style.backgroundColor = '#000000';
                    }
                  }}
                >
                  {plan.cta}
                </Link>
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
};

export default Pricing;
