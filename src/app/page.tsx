'use client'

import { useState } from 'react'
import { Menu, Plus, Edit2, Trash2, MessageCircle, BarChart3, X } from 'lucide-react'

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [activeTab, setActiveTab] = useState('dashboard')
  const [experts, setExperts] = useState([
    { id: 1, name: '李明', industry: '導師', email: 'li@example.com', status: '已邀請' },
    { id: 2, name: '王女士', industry: '律師', email: 'wang@example.com', status: '未回應' }
  ])
  const [showAddForm, setShowAddForm] = useState(false)
  const [newExpert, setNewExpert] = useState({ name: '', industry: '', email: '' })

  const stats = {
    totalExperts: experts.length,
    invited: experts.filter(e => e.status === '已邀請').length,
    responded: experts.filter(e => e.status === '已回應').length,
    successRate: '75%'
  }

  const handleAddExpert = () => {
    if (newExpert.name && newExpert.email) {
      setExperts([...experts, {
        id: Date.now(),
        name: newExpert.name,
        industry: newExpert.industry,
        email: newExpert.email,
        status: '待邀請'
      }])
      setNewExpert({ name: '', industry: '', email: '' })
      setShowAddForm(false)
    }
  }

  const handleDeleteExpert = (id) => {
    setExperts(experts.filter(e => e.id !== id))
  }

  const templates = [
    { title: '導師', icon: '👨‍🏫', desc: '邀請教育專家' },
    { title: '律師', icon: '⚖️', desc: '邀請法律顧問' },
    { title: '水管工', icon: '🔧', desc: '邀請技術專家' },
    { title: '會計師', icon: '💼', desc: '邀請財務顧問' },
    { title: '攝影師', icon: '📸', desc: '邀請攝影服務' },
    { title: '健身教練', icon: '💪', desc: '邀請健身專家' }
  ]

  return (
    <div style={{ display: 'flex', height: '100vh', backgroundColor: '#0f172a' }}>
      {/* Sidebar */}
      <div style={{
        width: sidebarOpen ? '280px' : '80px',
        backgroundColor: '#1e293b',
        color: '#e2e8f0',
        transition: 'width 0.3s',
        display: 'flex',
        flexDirection: 'column',
        borderRight: '1px solid #334155'
      }}>
        <div style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {sidebarOpen && <h2 style={{ margin: 0, fontSize: '18px' }}>CRM</h2>}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} style={{
            background: 'none',
            border: 'none',
            color: '#e2e8f0',
            cursor: 'pointer',
            fontSize: '20px'
          }}>
            <Menu size={24} />
          </button>
        </div>

        <nav style={{ flex: 1, padding: '10px' }}>
          {['dashboard', 'experts', 'templates', 'chat'].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} style={{
              width: '100%',
              padding: '12px',
              marginBottom: '8px',
              backgroundColor: activeTab === tab ? '#0ea5e9' : 'transparent',
              color: activeTab === tab ? '#fff' : '#cbd5e1',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              textAlign: 'left',
              fontSize: '14px',
              fontWeight: activeTab === tab ? '600' : '400',
              transition: 'all 0.2s'
            }}>
              {sidebarOpen ? (tab.charAt(0).toUpperCase() + tab.slice(1)) : (tab[0].toUpperCase())}
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, overflow: 'auto', padding: '30px' }}>
        <h1 style={{ color: '#fff', marginBottom: '30px', fontSize: '28px' }}>CRM Dashboard</h1>

        {activeTab === 'dashboard' && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '40px' }}>
              {[
                { label: '總專家數', value: stats.totalExperts },
                { label: '已邀請', value: stats.invited },
                { label: '已回應', value: stats.responded },
                { label: '成功率', value: stats.successRate }
              ].map((stat, i) => (
                <div key={i} style={{
                  backgroundColor: '#1e293b',
                  padding: '20px',
                  borderRadius: '8px',
                  border: '1px solid #334155'
                }}>
                  <p style={{ color: '#94a3b8', margin: '0 0 10px 0', fontSize: '14px' }}>{stat.label}</p>
                  <p style={{ color: '#0ea5e9', margin: 0, fontSize: '32px', fontWeight: 'bold' }}>{stat.value}</p>
                </div>
              ))}
            </div>

            <div style={{ backgroundColor: '#1e293b', borderRadius: '8px', border: '1px solid #334155', overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ backgroundColor: '#0f172a', borderBottom: '1px solid #334155' }}>
                    <th style={{ padding: '15px', textAlign: 'left', color: '#cbd5e1', fontWeight: '600' }}>名字</th>
                    <th style={{ padding: '15px', textAlign: 'left', color: '#cbd5e1', fontWeight: '600' }}>行業</th>
                    <th style={{ padding: '15px', textAlign: 'left', color: '#cbd5e1', fontWeight: '600' }}>電郵</th>
                    <th style={{ padding: '15px', textAlign: 'left', color: '#cbd5e1', fontWeight: '600' }}>狀態</th>
                  </tr>
                </thead>
                <tbody>
                  {experts.map(expert => (
                    <tr key={expert.id} style={{ borderBottom: '1px solid #334155' }}>
                      <td style={{ padding: '15px', color: '#e2e8f0' }}>{expert.name}</td>
                      <td style={{ padding: '15px', color: '#e2e8f0' }}>{expert.industry}</td>
                      <td style={{ padding: '15px', color: '#e2e8f0' }}>{expert.email}</td>
                      <td style={{ padding: '15px', color: '#0ea5e9' }}>{expert.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'experts' && (
          <div>
            <button onClick={() => setShowAddForm(!showAddForm)} style={{
              marginBottom: '20px',
              padding: '12px 20px',
              backgroundColor: '#0ea5e9',
              color: '#fff',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '14px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <Plus size={18} /> 添加專家
            </button>

            {showAddForm && (
              <div style={{
                backgroundColor: '#1e293b',
                padding: '20px',
                borderRadius: '8px',
                marginBottom: '20px',
                border: '1px solid #334155'
              }}>
                <input
                  type="text"
                  placeholder="名字"
                  value={newExpert.name}
                  onChange={(e) => setNewExpert({...newExpert, name: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '10px',
                    marginBottom: '10px',
                    backgroundColor: '#0f172a',
                    border: '1px solid #334155',
                    borderRadius: '4px',
                    color: '#e2e8f0',
                    boxSizing: 'border-box'
                  }}
                />
                <input
                  type="text"
                  placeholder="行業"
                  value={newExpert.industry}
                  onChange={(e) => setNewExpert({...newExpert, industry: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '10px',
                    marginBottom: '10px',
                    backgroundColor: '#0f172a',
                    border: '1px solid #334155',
                    borderRadius: '4px',
                    color: '#e2e8f0',
                    boxSizing: 'border-box'
                  }}
                />
                <input
                  type="email"
                  placeholder="電郵"
                  value={newExpert.email}
                  onChange={(e) => setNewExpert({...newExpert, email: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '10px',
                    marginBottom: '10px',
                    backgroundColor: '#0f172a',
                    border: '1px solid #334155',
                    borderRadius: '4px',
                    color: '#e2e8f0',
                    boxSizing: 'border-box'
                  }}
                />
                <button onClick={handleAddExpert} style={{
                  padding: '10px 20px',
                  backgroundColor: '#10b981',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  marginRight: '10px'
                }}>
                  保存
                </button>
                <button onClick={() => setShowAddForm(false)} style={{
                  padding: '10px 20px',
                  backgroundColor: '#ef4444',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}>
                  取消
                </button>
              </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
              {experts.map(expert => (
                <div key={expert.id} style={{
                  backgroundColor: '#1e293b',
                  padding: '20px',
                  borderRadius: '8px',
                  border: '1px solid #334155'
                }}>
                  <h3 style={{ color: '#e2e8f0', marginBottom: '10px' }}>{expert.name}</h3>
                  <p style={{ color: '#94a3b8', margin: '5px 0' }}>{expert.industry}</p>
                  <p style={{ color: '#94a3b8', margin: '5px 0' }}>{expert.email}</p>
                  <p style={{ color: '#0ea5e9', margin: '10px 0' }}>{expert.status}</p>
                  <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
                    <button style={{
                      flex: 1,
                      padding: '8px',
                      backgroundColor: '#3b82f6',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '5px'
                    }}>
                      <Edit2 size={16} /> 編輯
                    </button>
                    <button onClick={() => handleDeleteExpert(expert.id)} style={{
                      flex: 1,
                      padding: '8px',
                      backgroundColor: '#ef4444',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '5px'
                    }}>
                      <Trash2 size={16} /> 刪除
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'templates' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
            {templates.map((template, i) => (
              <div key={i} style={{
                backgroundColor: '#1e293b',
                padding: '25px',
                borderRadius: '8px',
                border: '1px solid #334155',
                textAlign: 'center',
                cursor: 'pointer'
              }}>
                <div style={{ fontSize: '40px', marginBottom: '15px' }}>{template.icon}</div>
                <h3 style={{ color: '#e2e8f0', marginBottom: '8px' }}>{template.title}</h3>
                <p style={{ color: '#94a3b8', margin: 0, fontSize: '14px' }}>{template.desc}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'chat' && (
          <div>
            <div style={{
              backgroundColor: '#1e293b',
              padding: '25px',
              borderRadius: '8px',
              border: '1px solid #334155',
              maxWidth: '600px'
            }}>
              <h3 style={{ color: '#e2e8f0', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <MessageCircle size={24} /> WhatsApp 聯絡面板
              </h3>
              <p style={{ color: '#94a3b8', marginBottom: '20px' }}>選擇專家並通過 WhatsApp 發送邀請</p>

              <div style={{ maxHeight: '300px', overflowY: 'auto', marginBottom: '20px' }}>
                {experts.map(expert => (
                  <div key={expert.id} style={{
                    padding: '12px',
                    backgroundColor: '#0f172a',
                    borderRadius: '4px',
                    marginBottom: '8px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    border: '1px solid #334155'
                  }}>
                    <div>
                      <p style={{ color: '#e2e8f0', margin: '0 0 4px 0', fontWeight: '500' }}>{expert.name}</p>
                      <p style={{ color: '#94a3b8', margin: 0, fontSize: '14px' }}>{expert.email}</p>
                    </div>
                    <button style={{
                      padding: '8px 16px',
                      backgroundColor: '#10b981',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '12px'
                    }}>
                      發送
                    </button>
                  </div>
                ))}
              </div>

              <textarea
                placeholder="自訂訊息..."
                style={{
                  width: '100%',
                  padding: '12px',
                  backgroundColor: '#0f172a',
                  border: '1px solid #334155',
                  borderRadius: '4px',
                  color: '#e2e8f0',
                  boxSizing: 'border-box',
                  minHeight: '100px',
                  fontFamily: 'inherit'
                }}
              />
              <button style={{
                marginTop: '15px',
                width: '100%',
                padding: '12px',
                backgroundColor: '#0ea5e9',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontWeight: '600'
              }}>
                發送訊息
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
