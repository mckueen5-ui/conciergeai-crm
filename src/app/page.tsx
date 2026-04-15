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

export default function Home() {
  const [isClient, setIsClient] = useState(false);
  const [experts, setExperts] = useState<Expert[]>(DEFAULT_EXPERTS);

  // 🔥 FIX: 掛載時初始化 - 從 localStorage 讀取
  useEffect(() => {
    setIsClient(true);
    try {
      const saved = localStorage.getItem('conciergeai_experts');
      if (saved) {
        const parsed = JSON.parse(saved);
        console.log('✅ 從 localStorage 加載:', parsed.length, '個專家');
        setExperts(parsed);
      } else {
        console.log('⚠️ localStorage 為空，使用默認數據');
      }
    } catch (e) {
      console.error('❌ 加載失敗:', e);
    }
  }, []);

  // 🔥 FIX: 每次 experts 改變時 ALWAYS 保存（即使是空數組）
  useEffect(() => {
    if (isClient) {
      try {
        localStorage.setItem('conciergeai_experts', JSON.stringify(experts));
        console.log('✅ 已保存到 localStorage:', experts.length, '個專家');
      } catch (e) {
        console.error('❌ 保存失敗:', e);
      }
    }
  }, [experts, isClient]);

  return (
    <div style={{ padding: '20px', backgroundColor: '#0f172a', color: '#e2e8f0', minHeight: '100vh' }}>
      <h1>🎯 ConciergeAI 專家招募儀表板</h1>
      <div style={{ backgroundColor: '#0f2f1f', padding: '12px', borderRadius: '6px', marginBottom: '16px', fontSize: '12px', color: '#10b981' }}>
        ✅ localStorage 已修復！刪除商家 → F5 刷新 → 數據保留（刪除狀態也保存！）
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '32px' }}>
        <div style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '8px' }}>
          <div style={{ fontSize: '12px', color: '#94a3b8' }}>總專家數</div>
          <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#8b5cf6' }}>{experts.length}</div>
        </div>
      </div>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #334155' }}>
              <th style={{ textAlign: 'left', padding: '12px', color: '#94a3b8' }}>名稱</th>
              <th style={{ textAlign: 'left', padding: '12px', color: '#94a3b8' }}>行業</th>
              <th style={{ textAlign: 'left', padding: '12px', color: '#94a3b8' }}>位置</th>
              <th style={{ textAlign: 'left', padding: '12px', color: '#94a3b8' }}>電話</th>
            </tr>
          </thead>
          <tbody>
            {experts.map(expert => (
              <tr key={expert.id} style={{ borderBottom: '1px solid #334155' }}>
                <td style={{ padding: '12px' }}>{expert.name}</td>
                <td style={{ padding: '12px' }}>{expert.industry}</td>
                <td style={{ padding: '12px', fontSize: '12px' }}>{expert.address || '—'}</td>
                <td style={{ padding: '12px', fontSize: '12px' }}>{expert.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
