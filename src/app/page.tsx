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
                          ...newExpert,
                          status: '待邀請'
                }])
                setNewExpert({ name: '', industry: '', email: '' })
                setShowAddForm(false)
        }
  }

  const handleDeleteExpert = (id) => {
        setExperts(experts.filter(e => e.id !== id))
  }

  return (
        <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#0f172a' }}>
          {/* 側邊欄 */}
                <aside style={{
                  width: sidebarOpen ? '250px' : '80px',
                  backgroundColor: '#1e293b',
                  borderRight: '1px solid #334155',
                  transition: 'width 0.3s',
                  padding: '20px',
                  color: '#e2e8f0'
        }}>
                          <div style={{ marginBottom: '30px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            {sidebarOpen && <h1 style={{ fontSize: '20px', fontWeight: 'bold', margin: 0 }}>CRM</h1>h1>}
                                      <button 
                                                    onClick={() => setSidebarOpen(!sidebarOpen)}
                                                    style={{ background: 'none', border: 'none', color: '#e2e8f0', cursor: 'pointer', fontSize: '20px' }}
                                                  >
                                                  <Menu size={24} />
                                      </button>button>
                          </div>div>
                
                        <nav style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                          {[
          { id: 'dashboard', label: '儀表板', icon: '📊' },
          { id: 'experts', label: '專家管理', icon: '👥' },
          { id: 'templates', label: '邀請模板', icon: '📝' },
          { id: 'chat', label: '聯絡', icon: '💬' }
                    ].map(item => (
                                  <button
                                                  key={item.id}
                                                  onClick={() => setActiveTab(item.id)}
                                                  style={{
                                                                    padding: '12px 15px',
                                                                    backgroundColor: activeTab === item.id ? '#0ea5e9' : 'transparent',
                                                                    border: 'none',
                                                                    borderRadius: '8px',
                                                                    color: '#e2e8f0',
                                                                    cursor: 'pointer',
                                                                    textAlign: sidebarOpen ? 'left' : 'center',
                                                                    fontSize: '14px',
                                                                    transition: 'background-color 0.2s'
                                                  }}
                                                >
                                                <span style={{ fontSize: '18px', marginRight: sidebarOpen ? '10px' : '0' }}>{item.icon}</span>span>
                                    {sidebarOpen && item.label}
                                  </button>button>
                                ))}
                        </nav>nav>
                </aside>aside>
        
          {/* 主要內容 */}
              <main style={{ flex: 1, padding: '30px', color: '#e2e8f0', overflowY: 'auto' }}>
                      <div style={{ marginBottom: '30px' }}>
                                <h1 style={{ fontSize: '32px', fontWeight: 'bold', margin: '0 0 10px 0' }}>CRM 儀表板</h1>h1>
                                <p style={{ color: '#94a3b8', margin: 0 }}>歡迎回來！管理你的專家邀請</p>p>
                      </div>div>
              
                {/* 儀表板標籤頁 */}
                {activeTab === 'dashboard' && (
                    <div>
                      {/* 統計卡 */}
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '30px' }}>
                                  {[
                      { label: '總專家數', value: stats.totalExperts, color: '#3b82f6' },
                      { label: '已邀請', value: stats.invited, color: '#10b981' },
                      { label: '已回應', value: stats.responded, color: '#f59e0b' },
                      { label: '成功率', value: stats.successRate, color: '#8b5cf6' }
                                    ].map((stat, i) => (
                                                      <div key={i} style={{
                                                                          backgroundColor: '#1e293b',
                                                                          padding: '20px',
                                                                          borderRadius: '12px',
                                                                          borderLeft: `4px solid ${stat.color}`
                                                      }}>
                                                                        <p style={{ color: '#94a3b8', margin: '0 0 10px 0', fontSize: '14px' }}>{stat.label}</p>p>
                                                                        <p style={{ fontSize: '28px', fontWeight: 'bold', margin: 0, color: stat.color }}>{stat.value}</p>p>
                                                      </div>div>
                                                    ))}
                                </div>div>
                    
                      {/* 最近活動 */}
                                <div style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '12px' }}>
                                              <h2 style={{ marginTop: 0, marginBottom: '15px', fontSize: '18px' }}>最近的專家</h2>h2>
                                              <div style={{ overflowX: 'auto' }}>
                                                              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                                                                <thead>
                                                                                                    <tr style={{ borderBottom: '1px solid #334155' }}>
                                                                                                                          <th style={{ textAlign: 'left', padding: '12px', color: '#94a3b8' }}>名字</th>th>
                                                                                                                          <th style={{ textAlign: 'left', padding: '12px', color: '#94a3b8' }}>行業</th>th>
                                                                                                                          <th style={{ textAlign: 'left', padding: '12px', color: '#94a3b8' }}>狀態</th>th>
                                                                                                      </tr>tr>
                                                                                </thead>thead>
                                                                                <tbody>
                                                                                  {experts.slice(0, 5).map(expert => (
                                            <tr key={expert.id} style={{ borderBottom: '1px solid #334155' }}>
                                                                    <td style={{ padding: '12px' }}>{expert.name}</td>td>
                                                                    <td style={{ padding: '12px' }}>{expert.industry}</td>td>
                                                                    <td style={{ padding: '12px' }}>
                                                                                              <span style={{
                                                                          padding: '4px 12px',
                                                                          borderRadius: '6px',
                                                                          backgroundColor: expert.status === '已邀請' ? '#065f46' : '#7f1d1d',
                                                                          fontSize: '12px'
                                              }}>
                                                                                                {expert.status}
                                                                                                </span>span>
                                                                    </td>td>
                                            </tr>tr>
                                          ))}
                                                                                </tbody>tbody>
                                                              </table>table>
                                              </div>div>
                                </div>div>
                    </div>div>
                      )}
              
                {/* 專家管理標籤頁 */}
                {activeTab === 'experts' && (
                    <div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                                              <h2 style={{ margin: 0, fontSize: '24px' }}>專家管理</h2>h2>
                                              <button
                                                                onClick={() => setShowAddForm(!showAddForm)}
                                                                style={{
                                                                                    padding: '10px 20px',
                                                                                    backgroundColor: '#0ea5e9',
                                                                                    border: 'none',
                                                                                    borderRadius: '8px',
                                                                                    color: '#fff',
                                                                                    cursor: 'pointer',
                                                                                    display: 'flex',
                                                                                    alignItems: 'center',
                                                                                    gap: '8px'
                                                                  }}
                                                              >
                                                              <Plus size={20} /> 添加專家
                                              </button>button>
                                </div>div>
                    
                      {/* 添加表單 */}
                      {showAddForm && (
                                    <div style={{
                                                      backgroundColor: '#1e293b',
                                                      padding: '20px',
                                                      borderRadius: '12px',
                                                      marginBottom: '20px'
                                    }}>
                                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                                                                      <h3 style={{ margin: 0 }}>添加新專家</h3>h3>
                                                                      <button onClick={() => setShowAddForm(false)} style={{ background: 'none', border: 'none', color: '#e2e8f0', cursor: 'pointer' }}>
                                                                                          <X size={24} />
                                                                      </button>button>
                                                    </div>div>
                                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
                                                                      <input
                                                                                            type="text"
                                                                                            placeholder="名字"
                                                                                            value={newExpert.name}
                                                                                            onChange={(e) => setNewExpert({ ...newExpert, name: e.target.value })}
                                                                                            style={{
                                                                                                                    padding: '10px',
                                                                                                                    backgroundColor: '#0f172a',
                                                                                                                    border: '1px solid #334155',
                                                                                                                    borderRadius: '6px',
                                                                                                                    color: '#e2e8f0'
                                                                                              }}
                                                                                          />
                                                                      <input
                                                                                            type="text"
                                                                           </button>
