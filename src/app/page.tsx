'use client';

import { useState } from 'react';

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [experts, setExperts] = useState([
    { id: 1, name: '李明', industry: '導師', email: 'liming@example.com', status: '已認證' },
    { id: 2, name: '王芳', industry: '律師', email: 'wangfang@example.com', status: '未認證' }
  ]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newExpert, setNewExpert] = useState({ name: '', industry: '', email: '' });

  const handleAddExpert = () => {
    if (newExpert.name && newExpert.industry && newExpert.email) {
      setExperts([...experts, { id: Date.now(), ...newExpert, status: '待認證' }]);
      setNewExpert({ name: '', industry: '', email: '' });
      setShowAddForm(false);
    }
  };

  const handleDeleteExpert = (id) => {
    setExperts(experts.filter(e => e.id !== id));
  };

  return (
    <div style={{ display: 'flex', height: '100vh', backgroundColor: '#0f172a', color: '#e2e8f0', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      {/* Sidebar */}
      <div style={{
        width: sidebarOpen ? '250px' : '60px',
        backgroundColor: '#1e293b',
        borderRight: '1px solid #334155',
        transition: 'width 0.3s',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <div style={{ padding: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {sidebarOpen && <h2 style={{ margin: 0, fontSize: '18px' }}>菜單</h2>}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} style={{
            background: 'none',
            border: 'none',
            color: '#0ea5e9',
            cursor: 'pointer',
            padding: '5px',
            fontSize: '20px'
          }}>
            ☰
          </button>
        </div>
        <nav style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          {[
            { id: 'dashboard', label: '儀表板', icon: '📊' },
            { id: 'experts', label: '專家管理', icon: '👥' },
            { id: 'templates', label: '模板庫', icon: '📋' },
            { id: 'chat', label: 'WhatsApp', icon: '💬' }
          ].map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              style={{
                width: '100%',
                padding: '15px 20px',
                border: 'none',
                backgroundColor: activeTab === item.id ? '#0ea5e9' : 'transparent',
                color: activeTab === item.id ? '#0f172a' : '#e2e8f0',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                transition: 'background-color 0.2s',
                justifyContent: sidebarOpen ? 'flex-start' : 'center',
                fontSize: '14px',
                fontWeight: activeTab === item.id ? 600 : 400
              }}
            >
              <span style={{ fontSize: '18px' }}>{item.icon}</span>
              {sidebarOpen && item.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {/* Header */}
        <div style={{
          padding: '20px',
          borderBottom: '1px solid #334155',
          backgroundColor: '#1e293b'
        }}>
          <h1 style={{ margin: 0, fontSize: '24px', fontWeight: 700 }}>CRM Dashboard</h1>
        </div>

        {/* Content Area */}
        <div style={{ flex: 1, overflow: 'auto', padding: '20px' }}>
          {/* Dashboard Tab */}
          {activeTab === 'dashboard' && (
            <div>
              <h2 style={{ fontSize: '22px', fontWeight: 600, marginBottom: '20px' }}>儀表板概覽</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '30px' }}>
                <div style={{ backgroundColor: '#334155', padding: '20px', borderRadius: '8px', border: '1px solid #475569' }}>
                  <p style={{ margin: '0 0 10px 0', opacity: 0.8, fontSize: '14px' }}>專家總數</p>
                  <p style={{ margin: 0, fontSize: '32px', fontWeight: 700, color: '#0ea5e9' }}>{experts.length}</p>
                </div>
                <div style={{ backgroundColor: '#334155', padding: '20px', borderRadius: '8px', border: '1px solid #475569' }}>
                  <p style={{ margin: '0 0 10px 0', opacity: 0.8, fontSize: '14px' }}>已認證</p>
                  <p style={{ margin: 0, fontSize: '32px', fontWeight: 700, color: '#10b981' }}>{experts.filter(e => e.status === '已認證').length}</p>
                </div>
                <div style={{ backgroundColor: '#334155', padding: '20px', borderRadius: '8px', border: '1px solid #475569' }}>
                  <p style={{ margin: '0 0 10px 0', opacity: 0.8, fontSize: '14px' }}>待認證</p>
                  <p style={{ margin: 0, fontSize: '32px', fontWeight: 700, color: '#f59e0b' }}>{experts.filter(e => e.status === '待認證').length}</p>
                </div>
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '15px' }}>最近專家</h3>
              <div style={{ overflowX: 'auto', borderRadius: '8px', border: '1px solid #334155' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#1e293b', borderBottom: '2px solid #334155' }}>
                      <th style={{ padding: '12px', textAlign: 'left', fontWeight: 600 }}>名字</th>
                      <th style={{ padding: '12px', textAlign: 'left', fontWeight: 600 }}>行業</th>
                      <th style={{ padding: '12px', textAlign: 'left', fontWeight: 600 }}>郵箱</th>
                      <th style={{ padding: '12px', textAlign: 'left', fontWeight: 600 }}>狀態</th>
                    </tr>
                  </thead>
                  <tbody>
                    {experts.map(expert => (
                      <tr key={expert.id} style={{ borderBottom: '1px solid #334155' }}>
                        <td style={{ padding: '12px' }}>{expert.name}</td>
                        <td style={{ padding: '12px' }}>{expert.industry}</td>
                        <td style={{ padding: '12px', fontSize: '12px' }}>{expert.email}</td>
                        <td style={{ padding: '12px', color: expert.status === '已認證' ? '#10b981' : '#f59e0b', fontWeight: 500 }}>{expert.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Experts Tab */}
          {activeTab === 'experts' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h2 style={{ margin: 0, fontSize: '22px', fontWeight: 600 }}>專家管理</h2>
                <button
                  onClick={() => setShowAddForm(!showAddForm)}
                  style={{
                    backgroundColor: '#0ea5e9',
                    color: 'white',
                    border: 'none',
                    padding: '10px 20px',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontWeight: 500,
                    fontSize: '14px'
                  }}
                >
                  + 添加專家
                </button>
              </div>
              {showAddForm && (
                <div style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '8px', marginBottom: '20px', border: '1px solid #334155' }}>
                  <input
                    type="text"
                    placeholder="名字"
                    value={newExpert.name}
                    onChange={(e) => setNewExpert({ ...newExpert, name: e.target.value })}
                    style={{ width: '100%', padding: '10px', marginBottom: '10px', backgroundColor: '#334155', border: '1px solid #475569', color: 'white', borderRadius: '4px', fontSize: '14px', boxSizing: 'border-box' }}
                  />
                  <input
                    type="text"
                    placeholder="行業"
                    value={newExpert.industry}
                    onChange={(e) => setNewExpert({ ...newExpert, industry: e.target.value })}
                    style={{ width: '100%', padding: '10px', marginBottom: '10px', backgroundColor: '#334155', border: '1px solid #475569', color: 'white', borderRadius: '4px', fontSize: '14px', boxSizing: 'border-box' }}
                  />
                  <input
                    type="email"
                    placeholder="郵箱"
                    value={newExpert.email}
                    onChange={(e) => setNewExpert({ ...newExpert, email: e.target.value })}
                    style={{ width: '100%', padding: '10px', marginBottom: '15px', backgroundColor: '#334155', border: '1px solid #475569', color: 'white', borderRadius: '4px', fontSize: '14px', boxSizing: 'border-box' }}
                  />
                  <button
                    onClick={handleAddExpert}
                    style={{
                      backgroundColor: '#10b981',
                      color: 'white',
                      border: 'none',
                      padding: '10px 20px',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontWeight: 500,
                      fontSize: '14px'
                    }}
                  >
                    保存
                  </button>
                </div>
              )}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
                {experts.map(expert => (
                  <div
                    key={expert.id}
                    style={{
                      backgroundColor: '#1e293b',
                      padding: '20px',
                      borderRadius: '8px',
                      border: '1px solid #334155'
                    }}
                  >
                    <h3 style={{ margin: '0 0 10px 0', fontSize: '16px', fontWeight: 600 }}>{expert.name}</h3>
                    <p style={{ margin: '5px 0', opacity: 0.8, fontSize: '14px' }}>行業: {expert.industry}</p>
                    <p style={{ margin: '5px 0', opacity: 0.8, fontSize: '14px' }}>郵箱: {expert.email}</p>
                    <p style={{ margin: '10px 0 0 0', color: expert.status === '已認證' ? '#10b981' : '#f59e0b', fontWeight: 500, fontSize: '14px' }}>狀態: {expert.status}</p>
                    <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
                      <button style={{ flex: 1, padding: '8px', backgroundColor: '#334155', border: 'none', color: 'white', cursor: 'pointer', borderRadius: '4px', fontSize: '14px', fontWeight: 500 }}>
                        編輯
                      </button>
                      <button
                        onClick={() => handleDeleteExpert(expert.id)}
                        style={{ flex: 1, padding: '8px', backgroundColor: '#dc2626', border: 'none', color: 'white', cursor: 'pointer', borderRadius: '4px', fontSize: '14px', fontWeight: 500 }}
                      >
                        刪除
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Templates Tab */}
          {activeTab === 'templates' && (
            <div>
              <h2 style={{ fontSize: '22px', fontWeight: 600, marginBottom: '20px' }}>專家模板庫</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '15px' }}>
                {[
                  { icon: '👨‍🏫', title: '導師', desc: '教育培訓專家' },
                  { icon: '⚖️', title: '律師', desc: '法律諮詢服務' },
                  { icon: '🔧', title: '水管工', desc: '家居維修服務' },
                  { icon: '📊', title: '會計師', desc: '財務諮詢服務' },
                  { icon: '📷', title: '攝影師', desc: '專業攝影服務' },
                  { icon: '💪', title: '健身教練', desc: '健身指導服務' }
                ].map((t, i) => (
                  <div key={i} style={{ backgroundColor: '#1e293b', padding: '25px', borderRadius: '8px', border: '1px solid #334155', textAlign: 'center', cursor: 'pointer', transition: 'transform 0.2s', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <p style={{ fontSize: '40px', margin: '0 0 10px 0' }}>{t.icon}</p>
                    <h3 style={{ margin: '0 0 8px 0', fontSize: '16px', fontWeight: 600 }}>{t.title}</h3>
                    <p style={{ margin: 0, opacity: 0.75, fontSize: '14px' }}>{t.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Chat Tab */}
          {activeTab === 'chat' && (
            <div>
              <h2 style={{ fontSize: '22px', fontWeight: 600, marginBottom: '20px' }}>WhatsApp 聯繫</h2>
              <div style={{ backgroundColor: '#1e293b', padding: '25px', borderRadius: '8px', maxWidth: '450px', border: '1px solid #334155' }}>
                <p style={{ margin: '0 0 20px 0', fontSize: '16px' }}>點擊下方按鈕直接發送 WhatsApp 消息到我們的支持團隊</p>
                <a href="https://wa.me/852123456789" target="_blank" rel="noopener noreferrer" style={{ display: 'block', backgroundColor: '#25d366', color: 'white', padding: '12px 20px', borderRadius: '6px', textAlign: 'center', textDecoration: 'none', cursor: 'pointer', fontWeight: 500, fontSize: '15px', border: 'none' }}>
                  發送 WhatsApp 消息
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
