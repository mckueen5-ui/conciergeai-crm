'use client';

import { useState } from 'react';

export default function Home() {
    const [experts] = useState([
      { id: 1, name: '张三', phone: '13800138000', email: 'test@example.com', trade: '水电工', status: '新建' },
      { id: 2, name: '李四', phone: '13900139000', email: 'test2@example.com', trade: '木工', status: '已联系' }
        ]);

  return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white p-8">
              <div className="max-w-6xl mx-auto">
                      <h1 className="text-4xl font-bold mb-8">ConciergeAI 招聘管理系统</h1>h1>
                      
                      <div className="grid grid-cols-4 gap-4 mb-8">
                                <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                                            <div className="text-gray-400 text-sm">总数</div>div>
                                            <div className="text-3xl font-bold text-blue-400">{experts.length}</div>div>
                                </div>div>
                                <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                                            <div className="text-gray-400 text-sm">新建</div>div>
                                            <div className="text-3xl font-bold text-yellow-400">{experts.filter(e => e.status === '新建').length}</div>div>
                                </div>div>
                                <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                                            <div className="text-gray-400 text-sm">已联系</div>div>
                                            <div className="text-3xl font-bold text-green-400">{experts.filter(e => e.status === '已联系').length}</div>div>
                                </div>div>
                                <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                                            <div className="text-gray-400 text-sm">状态</div>div>
                                            <div className="text-3xl font-bold text-purple-400">正常</div>div>
                                </div>div>
                      </div>div>
              
                      <div className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden">
                                <table className="w-full">
                                            <thead className="bg-gray-900 border-b border-gray-700">
                                                          <tr>
                                                                          <th className="px-6 py-3 text-left text-sm font-semibold">姓名</th>th>
                                                                          <th className="px-6 py-3 text-left text-sm font-semibold">电话</th>th>
                                                                          <th className="px-6 py-3 text-left text-sm font-semibold">邮箱</th>th>
                                                                          <th className="px-6 py-3 text-left text-sm font-semibold">职位</th>th>
                                                                          <th className="px-6 py-3 text-left text-sm font-semibold">状态</th>th>
                                                          </tr>tr>
                                            </thead>thead>
                                            <tbody>
                                              {experts.map((expert) => (
                          <tr key={expert.id} className="border-b border-gray-700 hover:bg-gray-700/50">
                                            <td className="px-6 py-3">{expert.name}</td>td>
                                            <td className="px-6 py-3">{expert.phone}</td>td>
                                            <td className="px-6 py-3">{expert.email}</td>td>
                                            <td className="px-6 py-3">{expert.trade}</td>td>
                                            <td className="px-6 py-3"><span className="px-2 py-1 bg-blue-900 text-blue-200 rounded text-sm">{expert.status}</span>span></td>td>
                          </tr>tr>
                        ))}
                                            </tbody>tbody>
                                </table>table>
                      </div>div>
              
                      <div className="mt-8 p-4 bg-gray-800 rounded-lg border border-gray-700">
                                <h2 className="text-lg font-semibold mb-2">系统状态</h2>h2>
                                <p className="text-gray-400">✓ Next.js 14 运行中</p>p>
                                <p className="text-gray-400">✓ Mock 数据库</p>p>
                                <p className="text-gray-400">✓ Tailwind CSS</p>p>
                      </div>div>
              </div>div>
        </div>div>
      );
}</div>
