'use client';

import { useState, useEffect } from 'react';

type InviteStatus = '未邀請' | '已邀請' | '未回覆' | '已加入' | '已拒絕';

type Expert = {
  id: number;
  name: string;
  industry: string;
  email: string;
  phone: string;
  address?: string;
  rating?: number;
  status: string;
  inviteStatus: InviteStatus;
  inviteDate: string;
  lastInviteAt: string;
  inviteCount: number;
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

type SearchResult = {
  placeId: string;
  name: string;
  address: string;
  phone: string;
  rating: number;
  userRatingsTotal: number;
  website: string;
  types: string[];
};

const todayISO = () => new Date().toISOString().slice(0, 10);
const nowISO = () => new Date().toISOString().slice(0, 16).replace('T', ' ');
const fmtDate = (s: string) => (s ? s : '—');

// 🔒 初始默認數據 - 僅用於首次加載
const DEFAULT_EXPERTS: Expert[] = [
  { id: 1, name: '李明', industry: '導師', email: 'liming@example.com', phone: '85291111111', address: '香港中環', status: '已認證', inviteStatus: '已邀請', inviteDate: '2026-04-10', lastInviteAt: '2026-04-10 14:00', inviteCount: 1 },
  { id: 2, name: '王芳', industry: '律師', email: 'wangfang@example.com', phone: '85292222222', address: '香港灣仔', status: '未認證', inviteStatus: '未邀請', inviteDate: '', lastInviteAt: '', inviteCount: 0 },
  { id: 3, name: 'James Thompson', industry: '律師', email: 'james.thompson@uk.com', phone: '+442071116666', address: '倫敦西區', status: '已認證', inviteStatus: '已邀請', inviteDate: '2026-04-12', lastInviteAt: '2026-04-12 10:30', inviteCount: 1 },
  { id: 4, name: 'Sarah Miller', industry: '會計師', email: 'sarah.miller@manchester.uk', phone: '+441612223333', address: '曼徹斯特金融區', status: '已認證', inviteStatus: '已邀請', inviteDate: '2026-04-11', lastInviteAt: '2026-04-11 15:45', inviteCount: 2 },
  { id: 5, name: 'David Chen', industry: '水電工', email: 'david.chen@birmingham.uk', phone: '+441214445555', address: '伯明翰市中心', status: '待認證', inviteStatus: '已邀請', inviteDate: '2026-04-13', lastInviteAt: '2026-04-13 09:15', inviteCount: 1 },
  { id: 6, name: 'Emma Williams', industry: '健身教練', email: 'emma.w@leeds.uk', phone: '+441138887777', address: '利茲商業區', status: '已認證', inviteStatus: '未邀請', inviteDate: '', lastInviteAt: '', inviteCount: 0 },
  { id: 7, name: '馬克（Mark）', industry: '攝影師', email: 'mark.photography@bristol.uk', phone: '+441179992222', address: '布里斯託爾城鎮', status: '已認證', inviteStatus: '已邀請', inviteDate: '2026-04-09', lastInviteAt: '2026-04-09 13:20', inviteCount: 3 },
  { id: 8, name: 'Lucy Robertson', industry: '導師', email: 'lucy.r@edinburgh.uk', phone: '+441315556666', address: '愛丁堡新城鎮', status: '待認證', inviteStatus: '未邀請', inviteDate: '', lastInviteAt: '', inviteCount: 0 },
  { id: 9, name: '陳建偉', industry: '會計師', email: 'chen.kinwei@liverpool.uk', phone: '+441519113333', address: '利物浦城市中心', status: '已認證', inviteStatus: '已邀請', inviteDate: '2026-04-08', lastInviteAt: '2026-04-08 11:00', inviteCount: 2 },
  { id: 10, name: 'Alex Murphy', industry: '水電工', email: 'alex.m@glasgow.uk', phone: '+441412778888', address: '格拉斯哥東區', status: '未認證', inviteStatus: '未邀請', inviteDate: '', lastInviteAt: '', inviteCount: 0 }
];

const DEFAULT_WA_TEMPLATES: WhatsAppTemplate[] = [
  { id: 1, title: '導師專用邀請', industry: '導師', message: '你好 {name} 老師!👨‍🏫\n\n我哋係 ConciergeAI,專注連接優秀導師同學員。睇到你嘅教學背景十分出色,誠邀你加入我哋嘅平台。\n\n✅ 自訂收費\n✅ 彈性時間\n✅ 穩定學員流量\n\n有興趣了解多啲?歡迎回覆我哋。' },
  { id: 2, title: '律師專用邀請', industry: '律師', message: '{name} 律師你好,⚖️\n\n我係 ConciergeAI 嘅合作經理。我哋平台目前有大量法律諮詢需求,想邀請閣下加入我哋嘅認證律師網絡。\n\n📋 高素質客戶\n💼 透明收費機制\n🔒 嚴格保密\n\n方便嘅話希望進一步傾傾合作細節。' },
  { id: 3, title: '水電工專用邀請', industry: '水電工', message: '你好 {name} 師傅!🔧⚡\n\nConciergeAI 平台有大量住宅維修訂單(電路、水管、安裝),想邀請你加入我哋嘅信譽師傅網絡。\n\n💰 即時派單,當日收款\n📍 區內就近派工\n⭐ 客戶評分制度\n🛠️ 水電全包工種\n\n有興趣請回覆,我即刻幫你開戶。' },
  { id: 4, title: '會計師專用邀請', industry: '會計師', message: '{name} 會計師你好,📊\n\n我哋 ConciergeAI 為中小企客戶提供一站式會計服務配對,目前急需專業會計師加入。\n\n✅ 固定客戶來源\n✅ 月度結算\n✅ 自選工作量\n\n想了解詳細條款請即覆。' },
  { id: 5, title: '攝影師專用邀請', industry: '攝影師', message: 'Hi {name}!📷\n\n見到你嘅作品好有風格,想邀請你加入 ConciergeAI 攝影師網絡。\n\n📸 婚禮、活動、商業攝影訂單\n💵 高於市場價\n🎨 自由創作風格\n\n有興趣即覆我傾合作!' },
  { id: 6, title: '健身教練專用邀請', industry: '健身教練', message: '{name} 教練你好!💪\n\nConciergeAI 健康平台正招募認證教練,提供:\n\n🏋️ 一對一/小組訓練客戶\n💰 自訂時薪 (HK$300+/GBP£15+)\n📅 完全彈性時間\n\n想加入我哋嘅教練團隊?即覆我傾傾!' },
  { id: 7, title: '通用邀請', industry: '通用', message: '你好 {name},\n\n我哋係 ConciergeAI,睇到你係專業嘅{industry},想誠邀你加入我哋嘅專家平台。我哋會為你帶來穩定客戶。\n\n有興趣請回覆我哋了解詳情。' },
  { id: 8, title: '跟進(未回覆)', industry: '跟進', message: '你好 {name},想跟進一下之前嘅邀請,你對加入 ConciergeAI {industry}網絡有冇興趣?如有任何疑問歡迎隨時提出 🙏' }
];

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<string>('dashboard');

  // 💾 數據持久化 - 從localStorage讀取用戶數據，如果沒有則使用默認值
  const [experts, setExperts] = useState<Expert[]>(DEFAULT_EXPERTS);
  const [showAddForm, setShowAddForm] = useState<boolean>(false);
  const [newExpert, setNewExpert] = useState<{ name: string; industry: string; email: string; phone: string }>({ name: '', industry: '', email: '', phone: '' });

  const [showSearch, setShowSearch] = useState<boolean>(false);
  const [searchIndustry, setSearchIndustry] = useState<string>('水電工');
  const [searchLocation, setSearchLocation] = useState<string>('倫敦');
  const [searchLoading, setSearchLoading] = useState<boolean>(false);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [searchError, setSearchError] = useState<string>('');

  const [templates, setTemplates] = useState<Template[]>([
    { id: 1, icon: '👨‍🏫', title: '導師', desc: '教育培訓專家' },
    { id: 2, icon: '⚖️', title: '律師', desc: '法律諮詢服務' },
    { id: 3, icon: '🔧', title: '水電工', desc: '家居維修服務' },
    { id: 4, icon: '📊', title: '會計師', desc: '財務諮詢服務' },
    { id: 5, icon: '📷', title: '攝影師', desc: '專業攝影服務' },
    { id: 6, icon: '💪', title: '健身教練', desc: '健身指導服務' }
  ]);
  const [showTemplateForm, setShowTemplateForm] = useState<boolean>(false);
  const [editingTemplateId, setEditingTemplateId] = useState<number | null>(null);
  const [templateForm, setTemplateForm] = useState<{ icon: string; title: string; desc: string }>({ icon: '', title: '', desc: '' });

  const [waTemplates, setWaTemplates] = useState<WhatsAppTemplate[]>(DEFAULT_WA_TEMPLATES);
  const [showWaForm, setShowWaForm] = useState<boolean>(false);
  const [editingWaId, setEditingWaId] = useState<number | null>(null);
  const [waForm, setWaForm] = useState<{ title: string; industry: string; message: string }>({ title: '', industry: '通用', message: '' });

  // 🔄 useEffect: 初始化時從localStorage讀取，保存時自動更新
  useEffect(() => {
    // 首次加載時讀取用戶數據
    const savedExperts = localStorage.getItem('conciergeai_experts');
    if (savedExperts) {
      try {
        setExperts(JSON.parse(savedExperts));
      } catch (e) {
        console.error('Failed to load experts from localStorage:', e);
      }
    }
  }, []);

  // 每次experts改變時自動保存
  useEffect(() => {
    localStorage.setItem('conciergeai_experts', JSON.stringify(experts));
  }, [experts]);

  const handleAddExpert = () => {
    if (newExpert.name && newExpert.industry && newExpert.email) {
      setExperts([...experts, { id: Date.now(), ...newExpert, status: '待認證', inviteStatus: '未邀請', inviteDate: '', lastInviteAt: '', inviteCount: 0 }]);
      setNewExpert({ name: '', industry: '', email: '', phone: '' });
      setShowAddForm(false);
    }
  };

  const handleDeleteExpert = (id: number) => {
    setExperts(experts.filter(e => e.id !== id));
  };

  const runSearch = async () => {
    setSearchLoading(true);
    setSearchError('');
    try {
      const res = await fetch(`/api/search-experts?q=${encodeURIComponent(searchIndustry)}&location=${encodeURIComponent(searchLocation)}`);
      if (!res.ok) throw new Error('搜索失敗');
      const data = await res.json();
      setSearchResults(data.results || []);
    } catch (err: any) {
      setSearchError(err.message || '搜索出錯');
    } finally {
      setSearchLoading(false);
    }
  };

  const addFromSearch = (r: SearchResult) => {
    const existingPhone = experts.find(e => e.phone === r.phone);
    if (existingPhone) {
      alert('該電話號碼已存在');
      return;
    }
    setExperts([...experts, {
      id: Date.now(),
      name: r.name,
      industry: searchIndustry,
      email: '',
      phone: r.phone,
      address: r.address,
      rating: r.rating,
      status: '待認證',
      inviteStatus: '未邀請',
      inviteDate: '',
      lastInviteAt: '',
      inviteCount: 0
    }]);
    setSearchResults(searchResults.filter(sr => sr.placeId !== r.placeId));
  };

  const addAllFromSearch = () => {
    const existingPhones = new Set(experts.map(e => e.phone));
    const newExperts = searchResults.filter(r => !existingPhones.has(r.phone)).map(r => ({
      id: Date.now() + Math.random(),
      name: r.name,
      industry: searchIndustry,
      email: '',
      phone: r.phone,
      address: r.address,
      rating: r.rating,
      status: '待認證',
      inviteStatus: '未邀請' as InviteStatus,
      inviteDate: '',
      lastInviteAt: '',
      inviteCount: 0
    }));
    if (newExperts.length > 0) {
      setExperts([...experts, ...newExperts]);
      setSearchResults([]);
    }
  };

  const findTemplateForIndustry = (industry: string): WhatsAppTemplate | undefined => {
    let exact = waTemplates.find(t => t.industry === industry);
    if (exact) return exact;
    let partial = waTemplates.find(t => industry.includes(t.industry) || t.industry.includes(industry));
    if (partial) return partial;
    return waTemplates.find(t => t.industry === '通用');
  };

  const sendInvite = (expert: Expert) => {
    const template = findTemplateForIndustry(expert.industry);
    if (!template) {
      alert('找不到相應的邀請模板');
      return;
    }
    const msg = template.message.replace('{name}', expert.name).replace('{industry}', expert.industry);
    const encodedMsg = encodeURIComponent(msg);
    const waUrl = `https://wa.me/${expert.phone.replace(/\D/g, '')}?text=${encodedMsg}`;
    window.open(waUrl, '_blank');
    const now = nowISO();
    setExperts(experts.map(e => e.id === expert.id ? { ...e, inviteStatus: '已邀請', lastInviteAt: now, inviteCount: e.inviteCount + 1, inviteDate: e.inviteDate || todayISO() } : e));
  };

  const totalExperts = experts.length;
  const invitedCount = experts.filter(e => e.inviteStatus === '已邀請').length;
  const joinedCount = experts.filter(e => e.inviteStatus === '已加入').length;

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#0f172a', color: '#e2e8f0', fontFamily: '-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif' }}>
      {/* Sidebar */}
      <div style={{ width: sidebarOpen ? '240px' : '60px', backgroundColor: '#1e293b', borderRight: '1px solid #334155', display: 'flex', flexDirection: 'column', padding: '16px 0', transition: 'width 0.3s' }}>
        <div style={{ padding: '0 16px', marginBottom: '24px', cursor: 'pointer' }} onClick={() => setSidebarOpen(!sidebarOpen)}>
          <div style={{ fontSize: '24px' }}>☰</div>
        </div>
        <nav style={{ flex: 1 }}>
          {[
            { id: 'dashboard', label: '📊 儀表板', icon: '📊' },
            { id: 'experts', label: '👥 專家管理', icon: '👥' },
            { id: 'templates', label: '📝 邀請模板', icon: '📝' },
            { id: 'settings', label: '⚙️ 設定', icon: '⚙️' }
          ].map(item => (
            <div key={item.id} onClick={() => setActiveTab(item.id)} style={{ padding: '12px 16px', cursor: 'pointer', backgroundColor: activeTab === item.id ? '#8b5cf6' : 'transparent', borderLeft: activeTab === item.id ? '3px solid #a78bfa' : 'none', paddingLeft: activeTab === item.id ? '13px' : '16px' }}>
              {sidebarOpen ? item.label : item.icon}
            </div>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: '24px', overflowY: 'auto' }}>
        {activeTab === 'dashboard' && (
          <div>
            <h1 style={{ fontSize: '28px', marginBottom: '24px' }}>🎯 ConciergeAI 專家招募儀表板 - 英國版 💾自動保存</h1>
            <div style={{ backgroundColor: '#0f2f1f', padding: '12px', borderRadius: '6px', marginBottom: '16px', fontSize: '12px', color: '#10b981', border: '1px solid #059669' }}>
              ✅ 所有數據已自動保存到本地存儲。代碼更新時您的商戶資料不會遺失！
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '32px' }}>
              <div style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '8px', border: '1px solid #334155' }}>
                <div style={{ fontSize: '12px', color: '#94a3b8' }}>總專家數</div>
                <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#8b5cf6' }}>{totalExperts}</div>
              </div>
              <div style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '8px', border: '1px solid #334155' }}>
                <div style={{ fontSize: '12px', color: '#94a3b8' }}>已邀請</div>
                <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#06b6d4' }}>{invitedCount}</div>
              </div>
              <div style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '8px', border: '1px solid #334155' }}>
                <div style={{ fontSize: '12px', color: '#94a3b8' }}>已加入</div>
                <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#10b981' }}>{joinedCount}</div>
              </div>
              <div style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '8px', border: '1px solid #334155' }}>
                <div style={{ fontSize: '12px', color: '#94a3b8' }}>轉化率</div>
                <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#f59e0b' }}>{totalExperts > 0 ? ((joinedCount / totalExperts) * 100).toFixed(1) : 0}%</div>
              </div>
            </div>
            <div style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '8px', border: '1px solid #334155' }}>
              <h2 style={{ marginBottom: '16px' }}>📍 按城市分佈</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '12px' }}>
                {Array.from(new Set(experts.map(e => e.address))).map(address => (
                  <div key={address} style={{ padding: '12px', backgroundColor: '#0f172a', borderRadius: '6px', borderLeft: '3px solid #8b5cf6' }}>
                    <div style={{ fontSize: '12px', color: '#94a3b8' }}>{address}</div>
                    <div style={{ fontSize: '20px', fontWeight: 'bold' }}>{experts.filter(e => e.address === address).length}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'experts' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h1 style={{ fontSize: '24px' }}>👥 專家管理</h1>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button onClick={() => setShowSearch(!showSearch)} style={{ padding: '8px 16px', backgroundColor: '#8b5cf6', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>🔍 AI搜索</button>
                <button onClick={() => setShowAddForm(!showAddForm)} style={{ padding: '8px 16px', backgroundColor: '#10b981', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>+ 新增專家</button>
              </div>
            </div>

            {showSearch && (
              <div style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '8px', marginBottom: '24px', border: '2px solid #8b5cf6' }}>
                <h3 style={{ marginBottom: '12px', color: '#8b5cf6' }}>🤖 AI 智能搜索</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'auto auto auto 1fr auto', gap: '8px', marginBottom: '12px', alignItems: 'center' }}>
                  <label style={{ fontSize: '12px', color: '#94a3b8' }}>行業</label>
                  <input type="text" value={searchIndustry} onChange={(e) => setSearchIndustry(e.target.value)} placeholder="e.g. 水電工" style={{ padding: '6px 12px', backgroundColor: '#0f172a', color: '#e2e8f0', border: '1px solid #334155', borderRadius: '4px' }} />
                  <label style={{ fontSize: '12px', color: '#94a3b8' }}>位置</label>
                  <input type="text" value={searchLocation} onChange={(e) => setSearchLocation(e.target.value)} placeholder="e.g. 倫敦/曼徹斯特" style={{ padding: '6px 12px', backgroundColor: '#0f172a', color: '#e2e8f0', border: '1px solid #334155', borderRadius: '4px' }} />
                  <button onClick={runSearch} disabled={searchLoading} style={{ padding: '6px 16px', backgroundColor: searchLoading ? '#475569' : '#8b5cf6', color: '#fff', border: 'none', borderRadius: '4px', cursor: searchLoading ? 'default' : 'pointer' }}>
                    {searchLoading ? '搜索中...' : '搜索'}
                  </button>
                </div>
                {searchError && <div style={{ color: '#ef4444', fontSize: '12px', marginBottom: '12px' }}>❌ {searchError}</div>}
                {searchResults.length > 0 && (
                  <div style={{ marginTop: '12px' }}>
                    <div style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '8px' }}>找到 {searchResults.length} 個結果</div>
                    <div style={{ display: 'grid', gap: '8px' }}>
                      {searchResults.slice(0, 5).map(r => (
                        <div key={r.placeId} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px', backgroundColor: '#0f172a', borderRadius: '4px', borderLeft: '2px solid #06b6d4' }}>
                          <div style={{ flex: 1 }}>
                            <div style={{ fontWeight: '500' }}>{r.name}</div>
                            <div style={{ fontSize: '12px', color: '#94a3b8' }}>{r.address}</div>
                            <div style={{ fontSize: '12px', color: '#94a3b8' }}>⭐ {r.rating} ({r.userRatingsTotal})</div>
                          </div>
                          <button onClick={() => addFromSearch(r)} style={{ padding: '6px 12px', backgroundColor: '#06b6d4', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', whiteSpace: 'nowrap' }}>加入</button>
                        </div>
                      ))}
                    </div>
                    {searchResults.length > 5 && <button onClick={addAllFromSearch} style={{ marginTop: '12px', padding: '8px 16px', backgroundColor: '#10b981', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', width: '100%' }}>全部加入 ({searchResults.length})</button>}
                  </div>
                )}
              </div>
            )}

            {showAddForm && (
              <div style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '8px', marginBottom: '24px', border: '1px solid #334155' }}>
                <h3 style={{ marginBottom: '12px' }}>新增專家</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', marginBottom: '12px' }}>
                  <input type="text" placeholder="名稱" value={newExpert.name} onChange={(e) => setNewExpert({ ...newExpert, name: e.target.value })} style={{ padding: '8px 12px', backgroundColor: '#0f172a', color: '#e2e8f0', border: '1px solid #334155', borderRadius: '4px' }} />
                  <input type="text" placeholder="行業" value={newExpert.industry} onChange={(e) => setNewExpert({ ...newExpert, industry: e.target.value })} style={{ padding: '8px 12px', backgroundColor: '#0f172a', color: '#e2e8f0', border: '1px solid #334155', borderRadius: '4px' }} />
                  <input type="email" placeholder="電郵" value={newExpert.email} onChange={(e) => setNewExpert({ ...newExpert, email: e.target.value })} style={{ padding: '8px 12px', backgroundColor: '#0f172a', color: '#e2e8f0', border: '1px solid #334155', borderRadius: '4px' }} />
                  <input type="tel" placeholder="電話" value={newExpert.phone} onChange={(e) => setNewExpert({ ...newExpert, phone: e.target.value })} style={{ padding: '8px 12px', backgroundColor: '#0f172a', color: '#e2e8f0', border: '1px solid #334155', borderRadius: '4px' }} />
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button onClick={handleAddExpert} style={{ padding: '8px 16px', backgroundColor: '#10b981', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>確認</button>
                  <button onClick={() => { setShowAddForm(false); setNewExpert({ name: '', industry: '', email: '', phone: '' }); }} style={{ padding: '8px 16px', backgroundColor: '#64748b', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>取消</button>
                </div>
              </div>
            )}

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid #334155' }}>
                    <th style={{ textAlign: 'left', padding: '12px', color: '#94a3b8', fontWeight: '600' }}>名稱</th>
                    <th style={{ textAlign: 'left', padding: '12px', color: '#94a3b8', fontWeight: '600' }}>行業</th>
                    <th style={{ textAlign: 'left', padding: '12px', color: '#94a3b8', fontWeight: '600' }}>位置</th>
                    <th style={{ textAlign: 'left', padding: '12px', color: '#94a3b8', fontWeight: '600' }}>電話</th>
                    <th style={{ textAlign: 'left', padding: '12px', color: '#94a3b8', fontWeight: '600' }}>邀請狀態</th>
                    <th style={{ textAlign: 'left', padding: '12px', color: '#94a3b8', fontWeight: '600' }}>邀請次數</th>
                    <th style={{ textAlign: 'left', padding: '12px', color: '#94a3b8', fontWeight: '600' }}>最後邀請</th>
                    <th style={{ textAlign: 'left', padding: '12px', color: '#94a3b8', fontWeight: '600' }}>操作</th>
                  </tr>
                </thead>
                <tbody>
                  {experts.map(expert => (
                    <tr key={expert.id} style={{ borderBottom: '1px solid #334155', backgroundColor: expert.inviteStatus === '已加入' ? '#0f2f1f' : 'transparent' }}>
                      <td style={{ padding: '12px' }}>{expert.name}</td>
                      <td style={{ padding: '12px' }}>{expert.industry}</td>
                      <td style={{ padding: '12px', fontSize: '12px', color: '#cbd5e1' }}>{expert.address || '—'}</td>
                      <td style={{ padding: '12px', fontSize: '12px', color: '#cbd5e1' }}>{expert.phone}</td>
                      <td style={{ padding: '12px' }}>
                        <span style={{ padding: '4px 8px', borderRadius: '4px', fontSize: '12px', backgroundColor: expert.inviteStatus === '已加入' ? '#065f46' : expert.inviteStatus === '已邀請' ? '#1f3a8a' : '#3f3f46', color: '#e2e8f0' }}>
                          {expert.inviteStatus}
                        </span>
                      </td>
                      <td style={{ padding: '12px', textAlign: 'center' }}>{expert.inviteCount}</td>
                      <td style={{ padding: '12px', fontSize: '12px', color: '#cbd5e1' }}>{fmtDate(expert.lastInviteAt)}</td>
                      <td style={{ padding: '12px' }}>
                        <button onClick={() => sendInvite(expert)} style={{ padding: '4px 12px', backgroundColor: '#8b5cf6', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', marginRight: '4px', fontSize: '12px' }}>邀請</button>
                        <button onClick={() => handleDeleteExpert(expert.id)} style={{ padding: '4px 12px', backgroundColor: '#ef4444', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}>刪除</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'templates' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h1 style={{ fontSize: '24px' }}>📝 邀請模板庫</h1>
              <button onClick={() => setShowWaForm(!showWaForm)} style={{ padding: '8px 16px', backgroundColor: '#8b5cf6', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>+ 新增模板</button>
            </div>

            {showWaForm && (
              <div style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '8px', marginBottom: '24px', border: '1px solid #334155' }}>
                <h3 style={{ marginBottom: '12px' }}>{editingWaId ? '編輯' : '新增'}邀請模板</h3>
                <div style={{ display: 'grid', gap: '12px', marginBottom: '12px' }}>
                  <input type="text" placeholder="模板標題" value={waForm.title} onChange={(e) => setWaForm({ ...waForm, title: e.target.value })} style={{ padding: '8px 12px', backgroundColor: '#0f172a', color: '#e2e8f0', border: '1px solid #334155', borderRadius: '4px' }} />
                  <input type="text" placeholder="所屬行業" value={waForm.industry} onChange={(e) => setWaForm({ ...waForm, industry: e.target.value })} style={{ padding: '8px 12px', backgroundColor: '#0f172a', color: '#e2e8f0', border: '1px solid #334155', borderRadius: '4px' }} />
                  <textarea placeholder="郵件內容" value={waForm.message} onChange={(e) => setWaForm({ ...waForm, message: e.target.value })} style={{ padding: '8px 12px', backgroundColor: '#0f172a', color: '#e2e8f0', border: '1px solid #334155', borderRadius: '4px', minHeight: '100px', fontFamily: 'monospace', fontSize: '12px' }} />
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button onClick={() => {
                    if (editingWaId) {
                      setWaTemplates(waTemplates.map(t => t.id === editingWaId ? { ...waForm, id: editingWaId } : t));
                      setEditingWaId(null);
                    } else {
                      setWaTemplates([...waTemplates, { ...waForm, id: Date.now() }]);
                    }
                    setWaForm({ title: '', industry: '通用', message: '' });
                    setShowWaForm(false);
                  }} style={{ padding: '8px 16px', backgroundColor: '#10b981', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>確認</button>
                  <button onClick={() => { setShowWaForm(false); setEditingWaId(null); setWaForm({ title: '', industry: '通用', message: '' }); }} style={{ padding: '8px 16px', backgroundColor: '#64748b', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>取消</button>
                </div>
              </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
              {waTemplates.map(t => (
                <div key={t.id} style={{ backgroundColor: '#1e293b', padding: '16px', borderRadius: '8px', border: '1px solid #334155' }}>
                  <h3 style={{ marginBottom: '8px', color: '#8b5cf6' }}>{t.title}</h3>
                  <div style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '8px' }}>適用行業: {t.industry}</div>
                  <div style={{ backgroundColor: '#0f172a', padding: '8px', borderRadius: '4px', fontSize: '12px', color: '#cbd5e1', marginBottom: '12px', maxHeight: '80px', overflowY: 'auto', whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>{t.message}</div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button onClick={() => { setWaForm(t); setEditingWaId(t.id); setShowWaForm(true); }} style={{ flex: 1, padding: '6px', backgroundColor: '#8b5cf6', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}>編輯</button>
                    <button onClick={() => setWaTemplates(waTemplates.filter(x => x.id !== t.id))} style={{ flex: 1, padding: '6px', backgroundColor: '#ef4444', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}>刪除</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div>
            <h1 style={{ fontSize: '24px', marginBottom: '24px' }}>⚙️ 設定</h1>
            <div style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '8px', border: '1px solid #334155', maxWidth: '600px' }}>
              <h3 style={{ marginBottom: '16px', color: '#8b5cf6' }}>📋 API 設定</h3>
              <div style={{ display: 'grid', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '4px', fontSize: '12px', color: '#94a3b8' }}>Google Places API Key</label>
                  <input type="password" placeholder="GOOGLE_PLACES_API_KEY" style={{ width: '100%', padding: '8px 12px', backgroundColor: '#0f172a', color: '#e2e8f0', border: '1px solid #334155', borderRadius: '4px' }} />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '4px', fontSize: '12px', color: '#94a3b8' }}>搜索語言/地區</label>
                  <select style={{ width: '100%', padding: '8px 12px', backgroundColor: '#0f172a', color: '#e2e8f0', border: '1px solid #334155', borderRadius: '4px' }}>
                    <option>繁體中文 (zh-HK)</option>
                    <option>英文 (en-GB)</option>
                  </select>
                </div>
                <button style={{ padding: '8px 16px', backgroundColor: '#10b981', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>保存設定</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
