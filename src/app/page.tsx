'use client';

import { useState } from 'react';

type InviteStatus = '未邀請' | '已邀請' | '未回覆' | '已加入' | '已拒絕';

type Expert = {
  id: number;
  name: string;
  industry: string;
  email: string;
  phone: string;
  status: string;
  inviteStatus: InviteStatus;
  inviteDate: string;        // ISO date,例如 "2026-04-14"
  lastInviteAt: string;      // ISO datetime,最近一次發送
  inviteCount: number;       // 已發送次數
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
  industry: string;
  message: string;
};

const todayISO = () => new Date().toISOString().slice(0, 10);
const nowISO = () => new Date().toISOString().slice(0, 16).replace('T', ' ');
const fmtDate = (s: string) => (s ? s : '—');

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<string>('dashboard');

  // ===== Experts =====
  const [experts, setExperts] = useState<Expert[]>([
    { id: 1, name: '李明', industry: '導師', email: 'liming@example.com', phone: '85291111111', status: '已認證', inviteStatus: '已邀請', inviteDate: '2026-04-10', lastInviteAt: '2026-04-10 14:00', inviteCount: 1 },
    { id: 2, name: '王芳', industry: '律師', email: 'wangfang@example.com', phone: '85292222222', status: '未認證', inviteStatus: '未邀請', inviteDate: '', lastInviteAt: '', inviteCount: 0 }
  ]);
  const [showAddForm, setShowAddForm] = useState<boolean>(false);
  const [newExpert, setNewExpert] = useState<{ name: string; industry: string; email: string; phone: string }>({ name: '', industry: '', email: '', phone: '' });

  // ===== Templates =====
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

  // ===== WhatsApp Templates =====
  const [waTemplates, setWaTemplates] = useState<WhatsAppTemplate[]>([
    { id: 1, title: '導師專用邀請', industry: '導師', message: '你好 {name} 老師!👨‍🏫\n\n我哋係 ConciergeAI,專注連接優秀導師同學員。睇到你嘅教學背景十分出色,誠邀你加入我哋嘅平台。\n\n✅ 自訂收費\n✅ 彈性時間\n✅ 穩定學員流量\n\n有興趣了解多啲?歡迎回覆我哋。' },
    { id: 2, title: '律師專用邀請', industry: '律師', message: '{name} 律師你好,⚖️\n\n我係 ConciergeAI 嘅合作經理。我哋平台目前有大量法律諮詢需求(公司法、家庭法、合同審閱等),想邀請閣下加入我哋嘅認證律師網絡。\n\n📋 高素質客戶\n💼 透明收費機制\n🔒 嚴格保密\n\n方便嘅話希望進一步傾傾合作細節。' },
    { id: 3, title: '水管工專用邀請', industry: '水管工', message: '你好 {name} 師傅!🔧\n\nConciergeAI 平台有大量住宅維修訂單,想邀請你加入我哋嘅信譽師傅網絡。\n\n💰 即時派單,當日收款\n📍 區內就近派工\n⭐ 客戶評分制度\n\n有興趣請回覆,我即刻幫你開戶。' },
    { id: 4, title: '會計師專用邀請', industry: '會計師', message: '{name} 會計師你好,📊\n\n我哋 ConciergeAI 為中小企客戶提供一站式會計服務配對,目前急需專業會計師加入。\n\n✅ 固定客戶來源\n✅ 月度結算\n✅ 自選工作量\n\n想了解詳細條款請即覆。' },
    { id: 5, title: '攝影師專用邀請', industry: '攝影師', message: 'Hi {name}!📷\n\n見到你嘅作品好有風格,想邀請你加入 ConciergeAI 攝影師網絡。\n\n📸 婚禮、活動、商業攝影訂單\n💵 高於市場價\n🎨 自由創作風格\n\n有興趣即覆我傾合作!' },
    { id: 6, title: '健身教練專用邀請', industry: '健身教練', message: '{name} 教練你好!💪\n\nConciergeAI 健康平台正招募認證教練,提供:\n\n🏋️ 一對一/小組訓練客戶\n💰 自訂時薪 (HK$300+)\n📅 完全彈性時間\n\n想加入我哋嘅教練團隊?即覆我傾傾!' },
    { id: 7, title: '通用邀請', industry: '通用', message: '你好 {name},\n\n我哋係 ConciergeAI,睇到你係專業嘅{industry},想誠邀你加入我哋嘅專家平台。我哋會為你帶來穩定客戶,你只需專注做好專業服務。\n\n有興趣請回覆我哋了解詳情。' },
    { id: 8, title: '跟進(未回覆)', industry: '跟進', message: '你好 {name},想跟進一下之前嘅邀請,你對加入 ConciergeAI {industry}網絡有冇興趣?如有任何疑問歡迎隨時提出 🙏' }
  ]);
  const [showWaForm, setShowWaForm] = useState<boolean>(false);
  const [editingWaId, setEditingWaId] = useState<number | null>(null);
  const [waForm, setWaForm] = useState<{ title: string; industry: string; message: string }>({ title: '', industry: '通用', message: '' });

  // ===== Expert Handlers =====
  const handleAddExpert = () => {
    if (newExpert.name && newExpert.industry && newExpert.email) {
      setExperts([...experts, { id: Date.now(), ...newExpert, status: '待認證', inviteStatus: '未邀請', inviteDate: '', lastInviteAt: '', inviteCount: 0 }]);
      setNewExpert({ name: '', industry: '', email: '', phone: '' });
      setShowAddForm(false);
    }
  };
  const handleDeleteExpert = (id: number) => {
    setExperts(experts.filter((e) => e.id !== id));
  };

  // ===== AI 模板配對 =====
  const findTemplateForIndustry = (industry: string, mode: 'invite' | 'followup' = 'invite'): WhatsAppTemplate | null => {
    if (mode === 'followup') {
      const f = waTemplates.find((t) => t.industry === '跟進');
      if (f) return f;
    }
    let match = waTemplates.find((t) => t.industry === industry);
    if (match) return match;
    match = waTemplates.find((t) => t.industry !== '通用' && t.industry !== '跟進' && (industry.includes(t.industry) || t.industry.includes(industry)));
    if (match) return match;
    return waTemplates.find((t) => t.industry === '通用') || null;
  };

  // ===== 邀請 / 重發 =====
  const sendInvite = (expert: Expert, isFollowUp = false) => {
    const tpl = findTemplateForIndustry(expert.industry, isFollowUp ? 'followup' : 'invite');
    if (!tpl) { alert('未搵到合適模板,請去 WhatsApp tab 新增。'); return; }
    if (!expert.phone) { alert(`${expert.name} 未設定電話號碼,請先編輯加入。`); return; }
    const msg = tpl.message.replace(/\{name\}/g, expert.name).replace(/\{industry\}/g, expert.industry);
    const phone = expert.phone.replace(/\D/g, '');
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, '_blank');
    // 更新狀態
    setExperts(experts.map((e) => e.id === expert.id ? {
      ...e,
      inviteStatus: '已邀請',
      inviteDate: e.inviteDate || todayISO(),
      lastInviteAt: nowISO(),
      inviteCount: e.inviteCount + 1
    } : e));
  };

  // 更新邀請狀態
  const updateInviteStatus = (id: number, status: InviteStatus) => {
    setExperts(experts.map((e) => e.id === id ? { ...e, inviteStatus: status } : e));
  };

  // 改邀請日期
  const updateInviteDate = (id: number, date: string) => {
    setExperts(experts.map((e) => e.id === id ? { ...e, inviteDate: date } : e));
  };

  // ===== Template CRUD =====
  const openNewTemplate = () => { setEditingTemplateId(null); setTemplateForm({ icon: '', title: '', desc: '' }); setShowTemplateForm(true); };
  const openEditTemplate = (t: Template) => { setEditingTemplateId(t.id); setTemplateForm({ icon: t.icon, title: t.title, desc: t.desc }); setShowTemplateForm(true); };
  const saveTemplate = () => {
    if (!templateForm.title || !templateForm.icon) return;
    if (editingTemplateId !== null) {
      setTemplates(templates.map((t) => (t.id === editingTemplateId ? { ...t, ...templateForm } : t)));
    } else {
      setTemplates([...templates, { id: Date.now(), ...templateForm }]);
    }
    setShowTemplateForm(false); setEditingTemplateId(null); setTemplateForm({ icon: '', title: '', desc: '' });
  };
  const deleteTemplate = (id: number) => setTemplates(templates.filter((t) => t.id !== id));

  // ===== WA Template CRUD =====
  const openNewWa = () => { setEditingWaId(null); setWaForm({ title: '', industry: '通用', message: '' }); setShowWaForm(true); };
  const openEditWa = (w: WhatsAppTemplate) => { setEditingWaId(w.id); setWaForm({ title: w.title, industry: w.industry, message: w.message }); setShowWaForm(true); };
  const saveWa = () => {
    if (!waForm.title || !waForm.message) return;
    if (editingWaId !== null) {
      setWaTemplates(waTemplates.map((w) => (w.id === editingWaId ? { ...w, ...waForm } : w)));
    } else {
      setWaTemplates([...waTemplates, { id: Date.now(), ...waForm }]);
    }
    setShowWaForm(false); setEditingWaId(null); setWaForm({ title: '', industry: '通用', message: '' });
  };
  const deleteWa = (id: number) => setWaTemplates(waTemplates.filter((w) => w.id !== id));
  const copyWa = (msg: string) => { navigator.clipboard.writeText(msg); alert('已複製到剪貼板'); };

  const tabs = [
    { id: 'dashboard', label: '儀表板', icon: '📊' },
    { id: 'experts', label: '專家管理', icon: '👥' },
    { id: 'templates', label: '模板庫', icon: '📋' },
    { id: 'chat', label: 'WhatsApp', icon: '💬' }
  ];

  const inputStyle = {
    width: '100%', padding: '10px', marginBottom: '10px',
    backgroundColor: '#334155', border: '1px solid #475569', color: 'white',
    borderRadius: '4px', fontSize: '14px', boxSizing: 'border-box' as const
  };

  // 邀請狀態顏色
  const statusColor: Record<InviteStatus, string> = {
    '未邀請': '#64748b',
    '已邀請': '#0ea5e9',
    '未回覆': '#f59e0b',
    '已加入': '#10b981',
    '已拒絕': '#dc2626'
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
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '30px' }}>
                <div style={{ backgroundColor: '#334155', padding: '20px', borderRadius: '8px', border: '1px solid #475569' }}>
                  <p style={{ margin: '0 0 10px 0', opacity: 0.8, fontSize: '14px' }}>專家總數</p>
                  <p style={{ margin: 0, fontSize: '32px', fontWeight: 700, color: '#0ea5e9' }}>{experts.length}</p>
                </div>
                <div style={{ backgroundColor: '#334155', padding: '20px', borderRadius: '8px', border: '1px solid #475569' }}>
                  <p style={{ margin: '0 0 10px 0', opacity: 0.8, fontSize: '14px' }}>已加入</p>
                  <p style={{ margin: 0, fontSize: '32px', fontWeight: 700, color: '#10b981' }}>{experts.filter((e) => e.inviteStatus === '已加入').length}</p>
                </div>
                <div style={{ backgroundColor: '#334155', padding: '20px', borderRadius: '8px', border: '1px solid #475569' }}>
                  <p style={{ margin: '0 0 10px 0', opacity: 0.8, fontSize: '14px' }}>已邀請</p>
                  <p style={{ margin: 0, fontSize: '32px', fontWeight: 700, color: '#0ea5e9' }}>{experts.filter((e) => e.inviteStatus === '已邀請').length}</p>
                </div>
                <div style={{ backgroundColor: '#334155', padding: '20px', borderRadius: '8px', border: '1px solid #475569' }}>
                  <p style={{ margin: '0 0 10px 0', opacity: 0.8, fontSize: '14px' }}>未回覆</p>
                  <p style={{ margin: 0, fontSize: '32px', fontWeight: 700, color: '#f59e0b' }}>{experts.filter((e) => e.inviteStatus === '未回覆').length}</p>
                </div>
                <div style={{ backgroundColor: '#334155', padding: '20px', borderRadius: '8px', border: '1px solid #475569' }}>
                  <p style={{ margin: '0 0 10px 0', opacity: 0.8, fontSize: '14px' }}>未邀請</p>
                  <p style={{ margin: 0, fontSize: '32px', fontWeight: 700, color: '#64748b' }}>{experts.filter((e) => e.inviteStatus === '未邀請').length}</p>
                </div>
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '15px' }}>專家邀請狀態</h3>
              <div style={{ overflowX: 'auto', borderRadius: '8px', border: '1px solid #334155' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#1e293b', borderBottom: '2px solid #334155' }}>
                      <th style={{ padding: '12px', textAlign: 'left', fontWeight: 600 }}>名字</th>
                      <th style={{ padding: '12px', textAlign: 'left', fontWeight: 600 }}>行業</th>
                      <th style={{ padding: '12px', textAlign: 'left', fontWeight: 600 }}>邀請日期</th>
                      <th style={{ padding: '12px', textAlign: 'left', fontWeight: 600 }}>已發次數</th>
                      <th style={{ padding: '12px', textAlign: 'left', fontWeight: 600 }}>邀請狀態</th>
                    </tr>
                  </thead>
                  <tbody>
                    {experts.map((expert) => (
                      <tr key={expert.id} style={{ borderBottom: '1px solid #334155' }}>
                        <td style={{ padding: '12px' }}>{expert.name}</td>
                        <td style={{ padding: '12px' }}>{expert.industry}</td>
                        <td style={{ padding: '12px' }}>{fmtDate(expert.inviteDate)}</td>
                        <td style={{ padding: '12px', textAlign: 'center' }}>{expert.inviteCount}</td>
                        <td style={{ padding: '12px' }}>
                          <span style={{ backgroundColor: statusColor[expert.inviteStatus], color: 'white', padding: '3px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: 500 }}>{expert.inviteStatus}</span>
                        </td>
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

              <div style={{ backgroundColor: '#0c2d1f', border: '1px solid #10b981', padding: '12px 16px', borderRadius: '6px', marginBottom: '20px', fontSize: '13px', color: '#a7f3d0' }}>
                💡 <strong>智能邀請流程:</strong>
                <br />1️⃣ 撳「📱 發送邀請」→ AI 自動配對行業模板,開 WhatsApp,記錄日期同次數
                <br />2️⃣ 對方回覆後,撳狀態掣標記「✅ 已加入」/「⏳ 未回覆」/「❌ 已拒絕」
                <br />3️⃣ 對「未回覆」嘅專家,撳「🔁 重發跟進」會用「跟進」模板再 send
              </div>

              {showAddForm && (
                <div style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '8px', marginBottom: '20px', border: '1px solid #334155' }}>
                  <input type="text" placeholder="名字" value={newExpert.name} onChange={(e) => setNewExpert({ ...newExpert, name: e.target.value })} style={inputStyle} />
                  <input type="text" placeholder="行業 (例如: 律師、導師、攝影師)" value={newExpert.industry} onChange={(e) => setNewExpert({ ...newExpert, industry: e.target.value })} style={inputStyle} />
                  <input type="email" placeholder="郵箱" value={newExpert.email} onChange={(e) => setNewExpert({ ...newExpert, email: e.target.value })} style={inputStyle} />
                  <input type="text" placeholder="WhatsApp 電話 (含區號,例如 85291234567)" value={newExpert.phone} onChange={(e) => setNewExpert({ ...newExpert, phone: e.target.value })} style={{ ...inputStyle, marginBottom: '15px' }} />
                  <button onClick={handleAddExpert} style={{ backgroundColor: '#10b981', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer', fontWeight: 500, fontSize: '14px' }}>保存</button>
                </div>
              )}

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '20px' }}>
                {experts.map((expert) => {
                  const matchedTpl = findTemplateForIndustry(expert.industry);
                  const isMatched = matchedTpl && matchedTpl.industry === expert.industry;
                  return (
                    <div key={expert.id} style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '8px', border: '1px solid #334155' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                        <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 600 }}>{expert.name}</h3>
                        <span style={{ backgroundColor: statusColor[expert.inviteStatus], color: 'white', padding: '3px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: 600 }}>{expert.inviteStatus}</span>
                      </div>
                      <p style={{ margin: '4px 0', opacity: 0.8, fontSize: '13px' }}>🏢 {expert.industry}</p>
                      <p style={{ margin: '4px 0', opacity: 0.8, fontSize: '13px' }}>✉️ {expert.email}</p>
                      <p style={{ margin: '4px 0', opacity: 0.8, fontSize: '13px' }}>📱 {expert.phone || '(未設定)'}</p>

                      <div style={{ backgroundColor: '#0f172a', padding: '10px', borderRadius: '6px', marginTop: '10px', fontSize: '12px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                          <span style={{ opacity: 0.7 }}>📅 邀請日期:</span>
                          <input type="date" value={expert.inviteDate} onChange={(e) => updateInviteDate(expert.id, e.target.value)} style={{ backgroundColor: '#1e293b', border: '1px solid #334155', color: '#e2e8f0', padding: '3px 6px', borderRadius: '3px', fontSize: '12px' }} />
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                          <span style={{ opacity: 0.7 }}>🕐 最後發送:</span>
                          <span>{fmtDate(expert.lastInviteAt)}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span style={{ opacity: 0.7 }}>📤 已發次數:</span>
                          <span style={{ fontWeight: 600 }}>{expert.inviteCount} 次</span>
                        </div>
                      </div>

                      <p style={{ margin: '10px 0 8px 0', fontSize: '11px', color: isMatched ? '#25d366' : '#f59e0b' }}>
                        🤖 AI 模板: {matchedTpl ? `${matchedTpl.title}${isMatched ? ' ✓' : ' (通用)'}` : '⚠️ 無'}
                      </p>

                      {/* 主邀請掣 */}
                      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '8px' }}>
                        {expert.inviteCount === 0 ? (
                          <button onClick={() => sendInvite(expert, false)} style={{ flex: '1 1 100%', padding: '10px', backgroundColor: '#25d366', border: 'none', color: 'white', cursor: 'pointer', borderRadius: '4px', fontSize: '14px', fontWeight: 600 }}>📱 發送邀請</button>
                        ) : (
                          <>
                            <button onClick={() => sendInvite(expert, false)} style={{ flex: 1, padding: '8px', backgroundColor: '#25d366', border: 'none', color: 'white', cursor: 'pointer', borderRadius: '4px', fontSize: '13px', fontWeight: 600 }}>📱 重發邀請</button>
                            <button onClick={() => sendInvite(expert, true)} style={{ flex: 1, padding: '8px', backgroundColor: '#f59e0b', border: 'none', color: 'white', cursor: 'pointer', borderRadius: '4px', fontSize: '13px', fontWeight: 600 }}>🔁 重發跟進</button>
                          </>
                        )}
                      </div>

                      {/* 狀態快選掣 */}
                      <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap', marginBottom: '8px' }}>
                        <button onClick={() => updateInviteStatus(expert.id, '已加入')} style={{ flex: 1, padding: '6px', backgroundColor: expert.inviteStatus === '已加入' ? '#10b981' : '#1e293b', border: '1px solid #10b981', color: 'white', cursor: 'pointer', borderRadius: '4px', fontSize: '12px', fontWeight: 500 }}>✅ 已加入</button>
                        <button onClick={() => updateInviteStatus(expert.id, '未回覆')} style={{ flex: 1, padding: '6px', backgroundColor: expert.inviteStatus === '未回覆' ? '#f59e0b' : '#1e293b', border: '1px solid #f59e0b', color: 'white', cursor: 'pointer', borderRadius: '4px', fontSize: '12px', fontWeight: 500 }}>⏳ 未回覆</button>
                        <button onClick={() => updateInviteStatus(expert.id, '已拒絕')} style={{ flex: 1, padding: '6px', backgroundColor: expert.inviteStatus === '已拒絕' ? '#dc2626' : '#1e293b', border: '1px solid #dc2626', color: 'white', cursor: 'pointer', borderRadius: '4px', fontSize: '12px', fontWeight: 500 }}>❌ 已拒絕</button>
                      </div>

                      <div style={{ display: 'flex', gap: '6px' }}>
                        <button style={{ flex: 1, padding: '7px', backgroundColor: '#334155', border: 'none', color: 'white', cursor: 'pointer', borderRadius: '4px', fontSize: '12px', fontWeight: 500 }}>編輯</button>
                        <button onClick={() => handleDeleteExpert(expert.id)} style={{ flex: 1, padding: '7px', backgroundColor: '#7f1d1d', border: 'none', color: 'white', cursor: 'pointer', borderRadius: '4px', fontSize: '12px', fontWeight: 500 }}>刪除</button>
                      </div>
                    </div>
                  );
                })}
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
                  <input type="text" placeholder="圖示 emoji" value={templateForm.icon} onChange={(e) => setTemplateForm({ ...templateForm, icon: e.target.value })} style={inputStyle} />
                  <input type="text" placeholder="職業名稱" value={templateForm.title} onChange={(e) => setTemplateForm({ ...templateForm, title: e.target.value })} style={inputStyle} />
                  <input type="text" placeholder="描述" value={templateForm.desc} onChange={(e) => setTemplateForm({ ...templateForm, desc: e.target.value })} style={{ ...inputStyle, marginBottom: '15px' }} />
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
                <h2 style={{ margin: 0, fontSize: '22px', fontWeight: 600 }}>WhatsApp 邀請模板</h2>
                <button onClick={openNewWa} style={{ backgroundColor: '#0ea5e9', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer', fontWeight: 500, fontSize: '14px' }}>+ 新增模板</button>
              </div>
              <div style={{ backgroundColor: '#0c2d1f', border: '1px solid #10b981', padding: '12px 16px', borderRadius: '6px', marginBottom: '20px', fontSize: '13px', color: '#a7f3d0' }}>
                💡 <strong>變數:</strong> <code style={{ backgroundColor: '#1e293b', padding: '2px 6px', borderRadius: '3px' }}>{'{name}'}</code> = 專家姓名,<code style={{ backgroundColor: '#1e293b', padding: '2px 6px', borderRadius: '3px' }}>{'{industry}'}</code> = 行業,自動代入<br />
                🤖 <strong>行業欄填法:</strong> 律師/導師等 = 該行業專用 | <code style={{ backgroundColor: '#1e293b', padding: '2px 6px', borderRadius: '3px' }}>通用</code> = fallback | <code style={{ backgroundColor: '#1e293b', padding: '2px 6px', borderRadius: '3px' }}>跟進</code> = 重發未回覆專用
              </div>
              {showWaForm && (
                <div style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '8px', marginBottom: '20px', border: '1px solid #334155' }}>
                  <h3 style={{ margin: '0 0 15px 0', fontSize: '16px', fontWeight: 600 }}>{editingWaId !== null ? '編輯模板' : '新增模板'}</h3>
                  <input type="text" placeholder="模板標題" value={waForm.title} onChange={(e) => setWaForm({ ...waForm, title: e.target.value })} style={inputStyle} />
                  <input type="text" placeholder="對應行業 (律師/導師/通用/跟進...)" value={waForm.industry} onChange={(e) => setWaForm({ ...waForm, industry: e.target.value })} style={inputStyle} />
                  <textarea placeholder="訊息內容,可用 {name} {industry}" value={waForm.message} onChange={(e) => setWaForm({ ...waForm, message: e.target.value })} rows={8} style={{ ...inputStyle, fontFamily: 'inherit', resize: 'vertical', marginBottom: '15px' }} />
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button onClick={saveWa} style={{ backgroundColor: '#10b981', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer', fontWeight: 500, fontSize: '14px' }}>保存</button>
                    <button onClick={() => { setShowWaForm(false); setEditingWaId(null); }} style={{ backgroundColor: '#475569', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer', fontWeight: 500, fontSize: '14px' }}>取消</button>
                  </div>
                </div>
              )}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '15px' }}>
                {waTemplates.map((w) => (
                  <div key={w.id} style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '8px', border: '1px solid #334155', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 600, color: '#0ea5e9' }}>💬 {w.title}</h3>
                      <span style={{ fontSize: '11px', backgroundColor: w.industry === '通用' ? '#475569' : (w.industry === '跟進' ? '#f59e0b' : '#0ea5e9'), color: 'white', padding: '3px 8px', borderRadius: '10px', fontWeight: 500 }}>{w.industry}</span>
                    </div>
                    <p style={{ margin: '0 0 15px 0', fontSize: '13px', opacity: 0.85, lineHeight: 1.5, whiteSpace: 'pre-wrap', flex: 1 }}>{w.message}</p>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
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
