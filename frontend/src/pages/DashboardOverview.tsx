import { useRef } from 'react';
import { 
  Users, 
  CheckCircle2, 
  Clock, 
  TrendingUp, 
  MoreHorizontal,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const data = [
  { name: 'Jan', value: 4000 },
  { name: 'Feb', value: 3000 },
  { name: 'Mar', value: 5000 },
  { name: 'Apr', value: 4500 },
  { name: 'May', value: 6000 },
  { name: 'Jun', value: 5500 },
  { name: 'Jul', value: 7000 },
];

const barData = [
  { name: 'Week 1', completed: 45, pending: 20 },
  { name: 'Week 2', completed: 52, pending: 15 },
  { name: 'Week 3', completed: 38, pending: 25 },
  { name: 'Week 4', completed: 65, pending: 10 },
];

const StatCard = ({ title, value, icon: Icon, trend, trendValue }: any) => (
  <div 
    className="premium-card dashboard-stat-card"
    style={{
      padding: '24px',
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
      backgroundColor: '#ffffff',
      border: '1px solid var(--border-color)'
    }}
  >
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div style={{
        width: '40px',
        height: '40px',
        borderRadius: '10px',
        backgroundColor: 'rgba(0, 0, 0, 0.04)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#111111'
      }}>
        <Icon style={{ width: '20px', height: '20px' }} />
      </div>
      <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#495057' }}>
        <MoreHorizontal style={{ width: '18px', height: '18px' }} />
      </button>
    </div>
    
    <div>
      <p style={{ fontSize: '13px', fontWeight: 700, color: '#495057', textTransform: 'uppercase', letterSpacing: '0.05em', margin: 0 }}>{title}</p>
      <h3 style={{ fontSize: '28px', fontWeight: 800, color: '#111111', margin: '4px 0 0', letterSpacing: '-0.02em' }}>{value}</h3>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '8px' }}>
        {trend === 'up' ? (
          <div style={{ display: 'flex', alignItems: 'center', color: '#2b8a3e', fontSize: '12px', fontWeight: 700 }}>
            <ArrowUpRight style={{ width: '12px', height: '12px', marginRight: '2px' }} />
            {trendValue}%
          </div>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', color: '#c92a2a', fontSize: '12px', fontWeight: 700 }}>
            <ArrowDownRight style={{ width: '12px', height: '12px', marginRight: '2px' }} />
            {trendValue}%
          </div>
        )}
        <span style={{ fontSize: '11px', color: '#495057', fontWeight: 500 }}>vs last month</span>
      </div>
    </div>
  </div>
);

const DashboardOverview = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Stagger reveal of all dashboard cards and charts - Snappy version for instant AAA visibility
    gsap.fromTo(".dashboard-stat-card", 
      { opacity: 0, y: 10 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.02,
        duration: 0.35,
        ease: "power2.out"
      }
    );

    gsap.fromTo(".chart-card", 
      { opacity: 0, scale: 0.99 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.4,
        stagger: 0.03,
        ease: "power2.out",
        delay: 0.05
      }
    );

    gsap.fromTo(".activity-table-card", 
      { opacity: 0, y: 10 },
      {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: "power2.out",
        delay: 0.1
      }
    );
  }, { scope: containerRef });

  return (
    <div ref={containerRef} style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      
      {/* Header Info */}
      <div>
        <h1 style={{ fontSize: '32px', fontWeight: 800, letterSpacing: '-0.03em', color: '#111111', margin: 0 }}>Dashboard Overview</h1>
        <p style={{ color: '#495057', fontSize: '15px', marginTop: '4px', margin: 0 }}>Welcome back! Here's what's happening with your projects today.</p>
      </div>

      {/* Metrics Row */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '24px'
      }}>
        <StatCard 
          title="Total Users" 
          value="1,284" 
          icon={Users} 
          trend="up" 
          trendValue="12.5"
        />
        <StatCard 
          title="Completed Tasks" 
          value="452" 
          icon={CheckCircle2} 
          trend="up" 
          trendValue="8.2"
        />
        <StatCard 
          title="Pending Work" 
          value="12" 
          icon={Clock} 
          trend="down" 
          trendValue="3.1"
        />
        <StatCard 
          title="Conversion Rate" 
          value="4.8%" 
          icon={TrendingUp} 
          trend="up" 
          trendValue="2.4"
        />
      </div>

      {/* Charts Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '24px'
      }}>
        {/* Main Revenue Chart */}
        <div 
          className="premium-card chart-card grid-span-2"
          style={{
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
            backgroundColor: '#ffffff',
            border: '1px solid var(--border-color)'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#111111', margin: 0 }}>Revenue Growth</h3>
            <select style={{
              padding: '6px 12px',
              borderRadius: '8px',
              border: '1px solid var(--border-color)',
              backgroundColor: '#ffffff',
              fontSize: '12px',
              fontWeight: 600,
              color: '#111111',
              cursor: 'pointer',
              outline: 'none'
            }}>
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
              <option>Year to Date</option>
            </select>
          </div>

          <div style={{ height: '300px', width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#000000" stopOpacity={0.12}/>
                    <stop offset="95%" stopColor="#000000" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.08)" />
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
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#000000" 
                  strokeWidth={2.5}
                  fillOpacity={1} 
                  fill="url(#colorValue)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Task Activity Chart */}
        <div 
          className="premium-card chart-card"
          style={{
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
            backgroundColor: '#ffffff',
            border: '1px solid var(--border-color)'
          }}
        >
          <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#111111', margin: 0 }}>Task Activity</h3>
          
          <div style={{ height: '300px', width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.08)" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 11, fill: '#495057', fontWeight: 600 }}
                  dy={10}
                />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#ffffff', 
                    borderColor: 'var(--border-color)',
                    borderRadius: '12px',
                    fontSize: '12px',
                    boxShadow: 'var(--shadow-subtle)'
                  }} 
                />
                <Bar dataKey="completed" fill="#000000" radius={[4, 4, 0, 0]} />
                <Bar dataKey="pending" fill="#ced4da" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '24px', marginTop: 'auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '10px', height: '10px', backgroundColor: '#000000', borderRadius: '50%' }} />
              <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 500 }}>Completed</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '10px', height: '10px', backgroundColor: '#e9ecef', borderRadius: '50%' }} />
              <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 500 }}>Pending</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity Table Card */}
      <div 
        className="premium-card activity-table-card"
        style={{
          padding: 0,
          overflow: 'hidden'
        }}
      >
        <div style={{
          padding: '24px',
          borderBottom: '1px solid var(--border-color)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#000000', margin: 0 }}>Recent Activities</h3>
          <button style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: '13px',
            fontWeight: 700,
            color: '#000000',
            textDecoration: 'none'
          }}
            onMouseEnter={(e) => e.currentTarget.style.textDecoration = 'underline'}
            onMouseLeave={(e) => e.currentTarget.style.textDecoration = 'none'}
          >
            View All
          </button>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: 'rgba(0,0,0,0.01)' }}>
                <th style={{ textAlign: 'left', padding: '16px 24px', fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', borderBottom: '1px solid var(--border-color)' }}>User</th>
                <th style={{ textAlign: 'left', padding: '16px 24px', fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', borderBottom: '1px solid var(--border-color)' }}>Action</th>
                <th style={{ textAlign: 'left', padding: '16px 24px', fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', borderBottom: '1px solid var(--border-color)' }}>Status</th>
                <th style={{ textAlign: 'left', padding: '16px 24px', fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', borderBottom: '1px solid var(--border-color)' }}>Date</th>
              </tr>
            </thead>
            <tbody style={{ color: 'var(--text-main)' }}>
              {[
                { user: 'Sarah Jenkins', action: 'Created new project "Mobile App"', status: 'success', date: '2 mins ago' },
                { user: 'Michael Chen', action: 'Completed task "API Integration"', status: 'info', date: '1 hour ago' },
                { user: 'Emma Wilson', action: 'Joined the team', status: 'success', date: '3 hours ago' },
                { user: 'Alex Rivera', action: 'Deleted draft "Marketing Plan"', status: 'warning', date: '5 hours ago' },
              ].map((activity, i) => (
                <tr 
                  key={i} 
                  style={{ 
                    transition: 'background-color 0.2s',
                    borderBottom: i === 3 ? 'none' : '1px solid var(--border-color)'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--bg-soft)'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  <td style={{ padding: '16px 24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        backgroundColor: 'rgba(0,0,0,0.04)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '12px',
                        fontWeight: 700,
                        color: '#000000'
                      }}>
                        {activity.user.charAt(0)}
                      </div>
                      <span style={{ fontSize: '14px', fontWeight: 600, color: '#000000' }}>{activity.user}</span>
                    </div>
                  </td>
                  <td style={{ padding: '16px 24px', fontSize: '14px', color: 'var(--text-muted)' }}>{activity.action}</td>
                  <td style={{ padding: '16px 24px' }}>
                    <span style={{
                      fontSize: '11px',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.04em',
                      padding: '4px 10px',
                      borderRadius: '50px',
                      backgroundColor: 
                        activity.status === 'success' ? 'rgba(43, 138, 62, 0.08)' : 
                        activity.status === 'warning' ? 'rgba(230, 126, 34, 0.08)' :
                        'rgba(0, 102, 204, 0.08)',
                      color: 
                        activity.status === 'success' ? 'var(--success-color)' : 
                        activity.status === 'warning' ? 'var(--warning-color)' :
                        'var(--accent-color)'
                    }}>
                      {activity.status}
                    </span>
                  </td>
                  <td style={{ padding: '16px 24px', fontSize: '14px', color: 'var(--text-muted)' }}>{activity.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
