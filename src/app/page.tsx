'use client';

import { useState } from 'react';

type Expert = {
  id: number;
  name: string;
  industry: string;
  email: string;
  status: string;
};

type Template = {
  id: number;
  icon: string;
  title: string;
  desc: string;
};

type WhatsAppTemplate = {
  id: number;
  title: string;
  message: string;
};

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<string>('dashboard');

  // Experts
  const [experts, setExperts] = useState<Expert[]>([
    { id: 1, name: '李明', industry: '導師', email: 'liming@example.com', status: '已認證' },
    { id: 2, name: '王芳', industry: '律師', email: 'wangfang@example.com', status: '未認證' }
  ]);
  const [showAddForm, setShowAddForm] = useState<boolean>(false);
  const [newExpert, setNewExpert] = useState<{ name: string; industry: string; email: string }>({ name: '', industry: '', email: '' });

  // Templates (CRUD)
  const [templates, setTemplates] = useState<Template[]>([
    { id: 1, icon: '👨‍🏫', title: '導師', desc: '教育培訓專家' },
    { id: 2, icon: '⚖️', title: '律師', desc: '法律諮詢服務' },
    { id: 3, icon: '🔧', title: '水管工', desc: '家居維修服務' },
    { id: 4, icon: '📊', title: '會計師', desc: '財務諮詢服務' },
    { id: 5, icon: '📷', title: '攝影師', desc: '專業攝影服務' },
    { id: 6, icon: '💪', title: '健身教練', desc: '健身指導服務' }
  ]);
  const [showTemplateForm, setShowTemplateForm] = useState<boolean>(false);
  const [editingTemplateId, setEditingTemplateId] = useState<number | null>(null);
  const [templateForm, setTemplateForm] = useState<{ icon: string; title: string; desc: string }>({ icon: '', title: '', desc: '' });

  // WhatsApp Invite Templates (CRUD)
  const [waTemplates, setWaTemplates] = useState<WhatsAppTemplate[]>([
    {
      id: 1,
      title: '邀請新專家加入',
      message: '你好!我哋係 ConciergeAI,睇到你嘅專業背景非常出色。誠邀你加入我哋嘅專家平台,接觸更多優質客戶。請問你有冇興趣了解多啲?'
    },
    {
      id: 2,
      title: '認證提醒',
      message: '你好,你嘅專家檔案已經建立,但仲未完成認證。請喺 24 小時內提交以下文件:身份證明、專業資格證書。完成後你就可以開始接單。'
    },
    {
      id: 3,
      title: '新訂單通知',
      message: '🔔 有新客戶想預約你嘅服務!詳情:[請填寫]。請喺 30 分鐘內回覆係咪接呢張單。'
    }
  ]);
  const [showWaForm, setShowWaForm] = useState<boolean>(false);
  const [editingWaId, setEditingWaId] = useState<number | null>(null);
  const [waForm, setWaForm] = useState<{ title: string; message: string }>({ title: '', message: '' });
  const [waPhone, setWaPhone] = useState<string>('852');

  const handleAddExpert = () => {
    if (newExpert.name && newExpert.industry && newExpert.email) {
      setExperts([...experts, { id: Date.now(), ...newExpert, status: '待認證' }]);
      setNewExpert({ name: '', industry: '', email: '' });
      setShowAddForm(false);
    }
  };

  const handleDeleteExpert = (id: number) => {
    setExperts(experts.filter((e) => e.id !== id));
  };

  // Template CRUD
  const openNewTemplate = () => {
    setEditingTemplateId(null);
    setTemplateForm({ icon: '', title: '', desc: '' });
    setShowTemplateForm(true);
  };
  const openEditTemplate = (t: Template) => {
    setEditingTemplateId(t.id);
    setTemplateForm({ icon: t.icon, title: t.title, desc: t.desc });
    setShowTemplateForm(true);
  };
  const saveTemplate = () => {
    if (!templateForm.title || !templateForm.icon) return;
    if (editingTemplateId !== null) {
      setTemplates(templates.map((t) => (t.id === editingTemplateId ? { ...t, ...templateForm } : t)));
    } else {
      setTemplates([...templates, { id: Date.now(), ...templateForm }]);
    }
    setShowTemplateForm(false);
    setEditingTemplateId(null);
    setTemplateForm({ icon: '', title: '', desc: '' });
  };
  const deleteTemplate = (id: number) => {
    setTemplates(templates.filter((t) => t.id !== id));
  };

  // WhatsApp Template CRUD
  const openNewWa = () => {
    setEditingWaId(null);
    setWaForm({ title: '', message: '' });
    setShowWaForm(true);
  };
  const openEditWa = (w: WhatsAppTemplate) => {
    setEditingWaId(w.id);
    setWaForm({ title: w.title, message: w.message });
    setShowWaForm(true);
  };
  const saveWa = () => {
    if (!waForm.title || !waForm.message) return;
    if (editingWaId !== null) {
      setWaTemplates(waTemplates.map((w) => (w.id === editingWaId ? { ...w, ...waForm } : w)));
    } else {
      setWaTemplates([...waTemplates, { id: Date.now(), ...waForm }]);
    }
    setShowWaForm(false);
    setEditingWaId(null);
    setWaForm({ title: '', message: '' });
  };
  const deleteWa = (id: number) => {
    setWaTemplates(waTemplates.filter((w) => w.id !== id));
  };
  const sendWa = (msg: string) => {
    const phone = waPhone.replace(/\D/g, '');
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
  };
  const copyWa = (msg: string) => {
    navigator.clipboard.writeText(msg);
    alert('已複製到剪貼板');
  };

  const tabs = [
    { id: 'dashboard', label: '儀表板', icon: '📊' },
    { id: 'experts', label: '專家管理', icon: '👥' },
    { id: 'templates', label: '模板庫', icon: '📋' },
    { id: 'chat', label: 'WhatsApp', icon: '💬' }
  ];

  const inputStyle = {
    width: '100%',
    padding: '10px',
    marginBottom: '10px',
    backgroundColor: '#334155',
    border: '1px solid #475569',
    color: 'white',
    borderRadius: '4px',
    fontSize: '14px',
    boxSizing: 'border-box' as const
  };

  return (
    <div style={{ display: 'flex', height: '100vh', backgroundColor: '#0f172a', color: '#e2e8f0', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ width: sidebarOpen ? '250px' : '60px', backgroundColor: '#1e293b', borderRight: '1px solid #334155', transition: 'width 0.3s', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {sidebarOpen && <h2 style={{ margin: 0, fontSize: '18px' }}>菜單</h2>}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} style={{ background: 'none', border: 'none', color: '#0ea5e9', cursor: 'pointer', padding: '5px', fontSize: '20px' }}>☰</button>
        </div>
        <nav style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          {tabs.map((item) => (
            <button key={item.id} onClick={() => setActiveTab(item.id)} style={{ width: '100%', padding: '15px 20px', border: 'none', backgroundColor: activeTab === item.id ? '#0ea5e9' : 'transparent', color: activeTab === item.id ? '#0f172a' : '#e2e8f0', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', justifyContent: sidebarOpen ? 'flex-start' : 'center', fontSize: '14px', fontWeight: activeTab === item.id ? 600 : 400 }}>
              <span style={{ fontSize: '18px' }}>{item.icon}</span>
              {sidebarOpen && item.label}
            </button>
          ))}
        </nav>
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <div style={{ padding: '20px', borderBottom: '1px solid #334155', backgroundColor: '#1e293b' }}>
          <h1 style={{ margin: 0, fontSize: '24px', fontWeight: 700 }}>CRM Dashboard</h1>
        </div>

        <div style={{ flex: 1, overflow: 'auto', padding: '20px' }}>
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
                  <p style={{ margin: 0, fontSize: '32px', fontWeight: 700, color: '#10b981' }}>{experts.filter((e) => e.status === '已認證').length}</p>
                </div>
                <div style={{ backgroundColor: '#334155', padding: '20px', borderRadius: '8px', border: '1px solid #475569' }}>
                  <p style={{ margin: '0 0 10px 0', opacity: 0.8, fontSize: '14px' }}>待認證</p>
                  <p style={{ margin: 0, fontSize: '32px', fontWeight: 700, color: '#f59e0b' }}>{experts.filter((e) => e.status === '待認證').length}</p>
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
                    {experts.map((expert) => (
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

          {activeTab === 'experts' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h2 style={{ margin: 0, fontSize: '22px', fontWeight: 600 }}>專家管理</h2>
                <button onClick={() => setShowAddForm(!showAddForm)} style={{ backgroundColor: '#0ea5e9', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer', fontWeight: 500, fontSize: '14px' }}>+ 添加專家</button>
              </div>
              {showAddForm && (
                <div style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '8px', marginBottom: '20px', border: '1px solid #334155' }}>
                  <input type="text" placeholder="名字" value={newExpert.name} onChange={(e) => setNewExpert({ ...newExpert, name: e.target.value })} style={inputStyle} />
                  <input type="text" placeholder="行業" value={newExpert.industry} onChange={(e) => setNewExpert({ ...newExpert, industry: e.target.value })} style={inputStyle} />
                  <input type="email" placeholder="郵箱" value={newExpert.email} onChange={(e) => setNewExpert({ ...newExpert, email: e.target.value })} style={{ ...inputStyle, marginBottom: '15px' }} />
                  <button onClick={handleAddExpert} style={{ backgroundColor: '#10b981', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer', fontWeight: 500, fontSize: '14px' }}>保存</button>
                </div>
              )}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
                {experts.map((expert) => (
                  <div key={expert.id} style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '8px', border: '1px solid #334155' }}>
                    <h3 style={{ margin: '0 0 10px 0', fontSize: '16px', fontWeight: 600 }}>{expert.name}</h3>
                    <p style={{ margin: '5px 0', opacity: 0.8, fontSize: '14px' }}>行業: {expert.industry}</p>
                    <p style={{ margin: '5px 0', opacity: 0.8, fontSize: '14px' }}>郵箱: {expert.email}</p>
                    <p style={{ margin: '10px 0 0 0', color: expert.status === '已認證' ? '#10b981' : '#f59e0b', fontWeight: 500, fontSize: '14px' }}>狀態: {expert.status}</p>
                    <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
                      <button style={{ flex: 1, padding: '8px', backgroundColor: '#334155', border: 'none', color: 'white', cursor: 'pointer', borderRadius: '4px', fontSize: '14px', fontWeight: 500 }}>編輯</button>
                      <button onClick={() => handleDeleteExpert(expert.id)} style={{ flex: 1, padding: '8px', backgroundColor: '#dc2626', border: 'none', color: 'white', cursor: 'pointer', borderRadius: '4px', fontSize: '14px', fontWeight: 500 }}>刪除</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'templates' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h2 style={{ margin: 0, fontSize: '22px', fontWeight: 600 }}>專家模板庫</h2>
                <button onClick={openNewTemplate} style={{ backgroundColor: '#0ea5e9', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer', fontWeight: 500, fontSize: '14px' }}>+ 新增模板</button>
              </div>

              {showTemplateForm && (
                <div style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '8px', marginBottom: '20px', border: '1px solid #334155' }}>
                  <h3 style={{ margin: '0 0 15px 0', fontSize: '16px', fontWeight: 600 }}>{editingTemplateId !== null ? '編輯模板' : '新增模板'}</h3>
                  <input type="text" placeholder="圖示 (例如: 👨‍🏫 emoji)" value={templateForm.icon} onChange={(e) => setTemplateForm({ ...templateForm, icon: e.target.value })} style={inputStyle} />
                  <input type="text" placeholder="職業名稱 (例如: 設計師)" value={templateForm.title} onChange={(e) => setTemplateForm({ ...templateForm, title: e.target.value })} style={inputStyle} />
                  <input type="text" placeholder="描述 (例如: 平面設計服務)" value={templateForm.desc} onChange={(e) => setTemplateForm({ ...templateForm, desc: e.target.value })} style={{ ...inputStyle, marginBottom: '15px' }} />
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button onClick={saveTemplate} style={{ backgroundColor: '#10b981', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer', fontWeight: 500, fontSize: '14px' }}>保存</button>
                    <button onClick={() => { setShowTemplateForm(false); setEditingTemplateId(null); }} style={{ backgroundColor: '#475569', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer', fontWeight: 500, fontSize: '14px' }}>取消</button>
                  </div>
                </div>
              )}

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '15px' }}>
                {templates.map((t) => (
                  <div key={t.id} style={{ backgroundColor: '#1e293b', padding: '25px', borderRadius: '8px', border: '1px solid #334155', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <p style={{ fontSize: '40px', margin: '0 0 10px 0' }}>{t.icon}</p>
                    <h3 style={{ margin: '0 0 8px 0', fontSize: '16px', fontWeight: 600 }}>{t.title}</h3>
                    <p style={{ margin: '0 0 15px 0', opacity: 0.75, fontSize: '14px' }}>{t.desc}</p>
                    <div style={{ display: 'flex', gap: '8px', width: '100%' }}>
                      <button onClick={() => openEditTemplate(t)} style={{ flex: 1, padding: '8px', backgroundColor: '#334155', border: 'none', color: 'white', cursor: 'pointer', borderRadius: '4px', fontSize: '13px', fontWeight: 500 }}>編輯</button>
                      <button onClick={() => deleteTemplate(t.id)} style={{ flex: 1, padding: '8px', backgroundColor: '#dc2626', border: 'none', color: 'white', cursor: 'pointer', borderRadius: '4px', fontSize: '13px', fontWeight: 500 }}>刪除</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'chat' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h2 style={{ margin: 0, fontSize: '22px', fontWeight: 600 }}>WhatsApp 邀請專家模板</h2>
                <button onClick={openNewWa} style={{ backgroundColor: '#0ea5e9', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer', fontWeight: 500, fontSize: '14px' }}>+ 新增模板</button>
              </div>

              <div style={{ backgroundColor: '#1e293b', padding: '15px 20px', borderRadius: '8px', marginBottom: '20px', border: '1px solid #334155', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <label style={{ fontSize: '14px', opacity: 0.8, whiteSpace: 'nowrap' }}>📱 接收電話 (含區號):</label>
                <input type="text" placeholder="例如: 85291234567" value={waPhone} onChange={(e) => setWaPhone(e.target.value)} style={{ flex: 1, padding: '8px 10px', backgroundColor: '#334155', border: '1px solid #475569', color: 'white', borderRadius: '4px', fontSize: '14px' }} />
              </div>

              {showWaForm && (
                <div style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '8px', marginBottom: '20px', border: '1px solid #334155' }}>
                  <h3 style={{ margin: '0 0 15px 0', fontSize: '16px', fontWeight: 600 }}>{editingWaId !== null ? '編輯模板' : '新增 WhatsApp 邀請模板'}</h3>
                  <input type="text" placeholder="模板標題 (例如: 邀請新專家)" value={waForm.title} onChange={(e) => setWaForm({ ...waForm, title: e.target.value })} style={inputStyle} />
                  <textarea placeholder="訊息內容 (可包含換行)" value={waForm.message} onChange={(e) => setWaForm({ ...waForm, message: e.target.value })} rows={6} style={{ ...inputStyle, fontFamily: 'inherit', resize: 'vertical', marginBottom: '15px' }} />
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button onClick={saveWa} style={{ backgroundColor: '#10b981', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer', fontWeight: 500, fontSize: '14px' }}>保存</button>
                    <button onClick={() => { setShowWaForm(false); setEditingWaId(null); }} style={{ backgroundColor: '#475569', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer', fontWeight: 500, fontSize: '14px' }}>取消</button>
                  </div>
                </div>
              )}

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '15px' }}>
                {waTemplates.map((w) => (
                  <div key={w.id} style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '8px', border: '1px solid #334155', display: 'flex', flexDirection: 'column' }}>
                    <h3 style={{ margin: '0 0 10px 0', fontSize: '16px', fontWeight: 600, color: '#0ea5e9' }}>💬 {w.title}</h3>
                    <p style={{ margin: '0 0 15px 0', fontSize: '14px', opacity: 0.85, lineHeight: 1.5, whiteSpace: 'pre-wrap', flex: 1 }}>{w.message}</p>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                      <button onClick={() => sendWa(w.message)} style={{ flex: '1 1 auto', minWidth: '90px', padding: '8px', backgroundColor: '#25d366', border: 'none', color: 'white', cursor: 'pointer', borderRadius: '4px', fontSize: '13px', fontWeight: 600 }}>📤 發送</button>
                      <button onClick={() => copyWa(w.message)} style={{ flex: '1 1 auto', minWidth: '70px', padding: '8px', backgroundColor: '#475569', border: 'none', color: 'white', cursor: 'pointer', borderRadius: '4px', fontSize: '13px', fontWeight: 500 }}>📋 複製</button>
                      <button onClick={() => openEditWa(w)} style={{ flex: '1 1 auto', minWidth: '60px', padding: '8px', backgroundColor: '#334155', border: 'none', color: 'white', cursor: 'pointer', borderRadius: '4px', fontSize: '13px', fontWeight: 500 }}>編輯</button>
                      <button onClick={() => deleteWa(w.id)} style={{ flex: '1 1 auto', minWidth: '60px', padding: '8px', backgroundColor: '#dc2626', border: 'none', color: 'white', cursor: 'pointer', borderRadius: '4px', fontSize: '13px', fontWeight: 500 }}>刪除</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
