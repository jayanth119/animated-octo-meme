import { useRef } from 'react';
import { ResponsiveContainer, LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Target, Zap, Clock, Hourglass } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const Analytics = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Seeded timeline performance metrics
  const performanceData = [
    { name: 'Sprint 1', productivity: 78, backlog: 40, velocity: 12 },
    { name: 'Sprint 2', productivity: 82, backlog: 35, velocity: 14 },
    { name: 'Sprint 3', productivity: 89, backlog: 28, velocity: 16 },
    { name: 'Sprint 4', productivity: 95, backlog: 20, velocity: 18 },
    { name: 'Sprint 5', productivity: 98, backlog: 12, velocity: 20 }
  ];

  // Seeded category allocation metrics
  const categoryData = [
    { name: 'Development', completed: 42, planned: 50 },
    { name: 'UI/UX Design', completed: 28, planned: 30 },
    { name: 'Quality Assurance', completed: 35, planned: 38 },
    { name: 'Product Marketing', completed: 18, planned: 25 },
    { name: 'Client Feedback', completed: 24, planned: 24 }
  ];

  useGSAP(() => {
    gsap.fromTo(".analytics-fade",
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

  return (
    <div ref={containerRef} style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      
      {/* Header Info */}
      <div className="analytics-fade">
        <h1 style={{ fontSize: '32px', fontWeight: 800, letterSpacing: '-0.03em', color: '#111111', margin: 0 }}>Advanced Analytics</h1>
        <p style={{ color: '#495057', fontSize: '15px', marginTop: '4px', margin: 0 }}>Track real-time productivity stats and sprint metrics.</p>
      </div>

      {/* Stats Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '24px'
      }} className="analytics-fade">
        {/* Stat Card 1 */}
        <div style={{ padding: '24px', backgroundColor: '#ffffff', border: '1px solid var(--border-color)', borderRadius: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: 'rgba(0,0,0,0.04)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#111111' }}>
            <Target style={{ width: '20px', height: '20px' }} />
          </div>
          <div>
            <p style={{ fontSize: '12px', fontWeight: 700, color: '#495057', textTransform: 'uppercase', letterSpacing: '0.05em', margin: 0 }}>Productivity Index</p>
            <h3 style={{ fontSize: '28px', fontWeight: 800, color: '#111111', margin: '4px 0 0', letterSpacing: '-0.02em' }}>98.4%</h3>
          </div>
        </div>
        {/* Stat Card 2 */}
        <div style={{ padding: '24px', backgroundColor: '#ffffff', border: '1px solid var(--border-color)', borderRadius: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: 'rgba(0,0,0,0.04)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#111111' }}>
            <Zap style={{ width: '20px', height: '20px' }} />
          </div>
          <div>
            <p style={{ fontSize: '12px', fontWeight: 700, color: '#495057', textTransform: 'uppercase', letterSpacing: '0.05em', margin: 0 }}>Sprint Velocity</p>
            <h3 style={{ fontSize: '28px', fontWeight: 800, color: '#111111', margin: '4px 0 0', letterSpacing: '-0.02em' }}>20.5 pts</h3>
          </div>
        </div>
        {/* Stat Card 3 */}
        <div style={{ padding: '24px', backgroundColor: '#ffffff', border: '1px solid var(--border-color)', borderRadius: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: 'rgba(0,0,0,0.04)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#111111' }}>
            <Clock style={{ width: '20px', height: '20px' }} />
          </div>
          <div>
            <p style={{ fontSize: '12px', fontWeight: 700, color: '#495057', textTransform: 'uppercase', letterSpacing: '0.05em', margin: 0 }}>Completion Velocity</p>
            <h3 style={{ fontSize: '28px', fontWeight: 800, color: '#111111', margin: '4px 0 0', letterSpacing: '-0.02em' }}>1.2 Days</h3>
          </div>
        </div>
        {/* Stat Card 4 */}
        <div style={{ padding: '24px', backgroundColor: '#ffffff', border: '1px solid var(--border-color)', borderRadius: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: 'rgba(0,0,0,0.04)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#111111' }}>
            <Hourglass style={{ width: '20px', height: '20px' }} />
          </div>
          <div>
            <p style={{ fontSize: '12px', fontWeight: 700, color: '#495057', textTransform: 'uppercase', letterSpacing: '0.05em', margin: 0 }}>Backlog Capacity</p>
            <h3 style={{ fontSize: '28px', fontWeight: 800, color: '#111111', margin: '4px 0 0', letterSpacing: '-0.02em' }}>12 Tasks</h3>
          </div>
        </div>
      </div>

      {/* Charts Allocation */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '24px'
      }}>
        {/* Chart 1: Sprint productivity */}
        <div 
          className="premium-card analytics-fade"
          style={{
            padding: '24px',
            backgroundColor: '#ffffff',
            border: '1px solid var(--border-color)',
            display: 'flex',
            flexDirection: 'column',
            gap: '24px'
          }}
        >
          <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#111111', margin: 0 }}>Sprint Efficiency Ratio</h3>
          
          <div style={{ height: '300px', width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.08)" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 11, fill: '#495057', fontWeight: 600 }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 11, fill: '#495057', fontWeight: 600 }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#ffffff', 
                    borderColor: 'var(--border-color)',
                    borderRadius: '12px',
                    fontSize: '12px',
                    boxShadow: 'var(--shadow-subtle)'
                  }} 
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: 12, fontWeight: 600, paddingTop: 10 }} />
                <Line type="monotone" dataKey="productivity" stroke="#000000" strokeWidth={3} activeDot={{ r: 6 }} name="Efficiency Index %" />
                <Line type="monotone" dataKey="backlog" stroke="#ced4da" strokeWidth={2} name="Backlog Burden" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Category work planning */}
        <div 
          className="premium-card analytics-fade"
          style={{
            padding: '24px',
            backgroundColor: '#ffffff',
            border: '1px solid var(--border-color)',
            display: 'flex',
            flexDirection: 'column',
            gap: '24px'
          }}
        >
          <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#111111', margin: 0 }}>Work Allocation by Category</h3>
          
          <div style={{ height: '300px', width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.08)" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fill: '#495057', fontWeight: 600 }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 11, fill: '#495057', fontWeight: 600 }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#ffffff', 
                    borderColor: 'var(--border-color)',
                    borderRadius: '12px',
                    fontSize: '12px',
                    boxShadow: 'var(--shadow-subtle)'
                  }} 
                />
                <Legend iconType="rect" wrapperStyle={{ fontSize: 12, fontWeight: 600, paddingTop: 10 }} />
                <Bar dataKey="completed" fill="#000000" radius={[4, 4, 0, 0]} name="Done Tasks" />
                <Bar dataKey="planned" fill="#ced4da" radius={[4, 4, 0, 0]} name="Target Baseline" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Analytics;
