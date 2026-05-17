import { useState, useRef } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../services/api';
import { 
  Plus, 
  Search, 
  Filter, 
  Calendar,
  User as UserIcon,
  X
} from 'lucide-react';
import { format } from 'date-fns';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const Tasks = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const queryClient = useQueryClient();
  const containerRef = useRef<HTMLDivElement>(null);

  const { data: tasks, isLoading } = useQuery({
    queryKey: ['tasks'],
    queryFn: async () => {
      const response = await api.get('/tasks');
      return response.data.data;
    }
  });

  const createTaskMutation = useMutation({
    mutationFn: (newTask: any) => api.post('/tasks', newTask),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      setIsModalOpen(false);
    }
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string, status: string }) => 
      api.put(`/tasks/${id}`, { status }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    }
  });

  console.log('Update mutation ready', !!updateStatusMutation);

  const filteredTasks = tasks?.filter((task: any) => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || task.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Stagger entry animation for task cards - snappy for instant AAA readability
  useGSAP(() => {
    if (!isLoading && filteredTasks && filteredTasks.length > 0) {
      gsap.fromTo(".task-card",
        { opacity: 0, y: 10 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.02,
          duration: 0.35,
          ease: "power2.out"
        }
      );
    }
  }, [isLoading, filteredTasks?.length]);

  return (
    <div ref={containerRef} style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      
      {/* Header Bar */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '20px'
      }}>
        <div>
          <h1 style={{ fontSize: '32px', fontWeight: 800, letterSpacing: '-0.03em', color: '#111111' }}>Tasks</h1>
          <p style={{ color: '#495057', fontSize: '15px', marginTop: '4px' }}>
            Manage and track your team's progress.
          </p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="btn btn-primary"
          style={{ padding: '12px 24px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.06)' }}
        >
          <Plus style={{ width: '20px', height: '20px' }} />
          Create New Task
        </button>
      </div>

      {/* Filter / Search Bar */}
      <div style={{
        display: 'flex',
        gap: '16px',
        flexWrap: 'wrap',
        alignItems: 'center'
      }}>
        <div style={{ position: 'relative', flex: 1, minWidth: '280px' }}>
          <Search style={{
            position: 'absolute',
            left: '16px',
            top: '50%',
            transform: 'translateY(-50%)',
            width: '18px',
            height: '18px',
            color: '#495057'
          }} />
          <input 
            type="text" 
            placeholder="Search tasks..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              height: '46px',
              padding: '10px 16px 10px 48px',
              border: '1px solid var(--border-color)',
              borderRadius: '12px',
              backgroundColor: '#ffffff',
              fontSize: '14px',
              color: '#111111',
              outline: 'none',
              transition: 'border-color 0.25s'
            }}
            onFocus={(e) => e.target.style.borderColor = '#000000'}
            onBlur={(e) => e.target.style.borderColor = 'var(--border-color)'}
          />
        </div>

        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{
              height: '46px',
              padding: '0 16px',
              border: '1px solid var(--border-color)',
              borderRadius: '12px',
              backgroundColor: '#ffffff',
              fontSize: '14px',
              color: '#111111',
              outline: 'none',
              cursor: 'pointer'
            }}
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="blocked">Blocked</option>
          </select>
          
          <button className="btn btn-secondary" style={{ height: '46px', padding: '0 20px', borderRadius: '12px' }}>
            <Filter style={{ width: '16px', height: '16px' }} />
            Filters
          </button>
        </div>
      </div>

      {/* Loading state */}
      {isLoading ? (
        <div className="grid-3">
          {[1, 2, 3].map(i => (
            <div key={i} style={{
              height: '210px',
              backgroundColor: '#ffffff',
              border: '1px solid var(--border-color)',
              borderRadius: '20px',
              animation: 'pulse 1.5s infinite ease-in-out'
            }} />
          ))}
        </div>
      ) : (
        /* Tasks Grid */
        <div className="grid-3">
          {filteredTasks && filteredTasks.length > 0 ? (
            filteredTasks.map((task: any) => (
              <div
                key={task._id}
                className="premium-card task-card"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                  position: 'relative',
                  backgroundColor: '#ffffff',
                  border: '1px solid var(--border-color)'
                }}
              >
                {/* Priority & Status Tag row */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{
                    fontSize: '10px',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    padding: '4px 10px',
                    borderRadius: '50px',
                    backgroundColor: 
                      task.status === 'completed' ? 'rgba(43, 138, 62, 0.08)' :
                      task.status === 'in-progress' ? 'rgba(0, 102, 204, 0.08)' :
                      task.status === 'blocked' ? 'rgba(201, 42, 42, 0.08)' :
                      'rgba(230, 126, 34, 0.08)',
                    color: 
                      task.status === 'completed' ? '#2b8a3e' :
                      task.status === 'in-progress' ? '#0066cc' :
                      task.status === 'blocked' ? '#c92a2a' :
                      '#d9480f'
                  }}>
                    {task.status}
                  </span>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <div style={{
                      width: '7px',
                      height: '7px',
                      borderRadius: '50%',
                      backgroundColor: 
                        task.priority === 'high' ? '#c92a2a' :
                        task.priority === 'medium' ? '#d9480f' :
                        '#2b8a3e'
                    }} />
                    <span style={{ fontSize: '10px', fontWeight: 800, color: '#495057', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                      {task.priority}
                    </span>
                  </div>
                </div>

                {/* Title & Description */}
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#111111', marginBottom: '8px', letterSpacing: '-0.02em' }}>
                    {task.title}
                  </h3>
                  <p style={{
                    fontSize: '14px',
                    color: '#495057',
                    lineHeight: '1.5',
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}>
                    {task.description}
                  </p>
                </div>

                {/* Divider */}
                <div style={{ height: '1px', backgroundColor: 'var(--border-color)', marginTop: 'auto' }} />

                {/* Footer details */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      border: '2px solid #ffffff',
                      backgroundColor: 'rgba(0,0,0,0.05)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      overflow: 'hidden'
                    }}>
                      {task.assignedTo?.avatar ? (
                        <img src={task.assignedTo.avatar} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      ) : (
                        <UserIcon style={{ width: '14px', height: '14px', color: 'var(--text-muted)' }} />
                      )}
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)', fontSize: '12px', fontWeight: 500 }}>
                    <Calendar style={{ width: '14px', height: '14px' }} />
                    {task.dueDate ? format(new Date(task.dueDate), 'MMM d, yyyy') : 'No date'}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '60px', border: '1px dashed var(--border-color)', borderRadius: '20px' }}>
              <p style={{ color: 'var(--text-muted)', fontSize: '15px' }}>No tasks found matching current filters.</p>
            </div>
          )}
        </div>
      )}

      {/* Create Task Modal Overlay */}
      {isModalOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(255, 255, 255, 0.4)',
          backdropFilter: 'blur(16px)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px'
        }}>
          <div className="premium-card" style={{
            width: '100%',
            maxWidth: '520px',
            padding: '36px',
            backgroundColor: '#ffffff',
            boxShadow: 'var(--shadow-large)',
            position: 'relative'
          }}>
            {/* Modal Close Button */}
            <button 
              onClick={() => setIsModalOpen(false)} 
              style={{
                position: 'absolute',
                top: '24px',
                right: '24px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--text-muted)',
                transition: 'color 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#000000'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}
            >
              <X style={{ width: '24px', height: '24px' }} />
            </button>

            {/* Modal Header */}
            <h2 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '6px', letterSpacing: '-0.02em', color: '#000000' }}>
              Create New Task
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '28px' }}>
              Add a new task to your project workflow.
            </p>

            {/* Modal Form */}
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              createTaskMutation.mutate({
                title: formData.get('title'),
                description: formData.get('description'),
                priority: formData.get('priority'),
                status: 'pending',
                assignedTo: '60d0fe4f5311236168a109ca', // Dummy user ID
                dueDate: new Date().toISOString()
              });
            }} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Title</label>
                <input 
                  name="title" 
                  required 
                  className="form-input" 
                  style={{ paddingLeft: '16px' }}
                />
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Description</label>
                <textarea 
                  name="description" 
                  required 
                  style={{
                    width: '100%',
                    height: '96px',
                    padding: '12px 16px',
                    borderRadius: '12px',
                    border: '1px solid var(--border-color)',
                    backgroundColor: 'var(--bg-soft)',
                    fontSize: '14px',
                    color: 'var(--text-main)',
                    outline: 'none',
                    resize: 'none',
                    transition: 'all 0.3s'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#000000';
                    e.target.style.backgroundColor = '#ffffff';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'var(--border-color)';
                    e.target.style.backgroundColor = 'var(--bg-soft)';
                  }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Priority</label>
                  <select 
                    name="priority" 
                    className="form-input"
                    style={{ paddingLeft: '16px' }}
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
                
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Due Date</label>
                  <input 
                    type="date" 
                    name="dueDate" 
                    className="form-input" 
                    style={{ paddingLeft: '16px' }}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '12px' }}>
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)} 
                  className="btn btn-secondary"
                  style={{ padding: '10px 20px', borderRadius: '10px' }}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="btn btn-primary"
                  style={{ padding: '10px 24px', borderRadius: '10px' }}
                >
                  Create Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tasks;
