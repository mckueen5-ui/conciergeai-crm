'use client';
import { useState } from 'react';

export default function Home() {
      const [experts] = useState([
          { id: 1, name: '张三', phone: '13800138000', email: 'test@example.com', trade: '水电工', status: '新建' },
          { id: 2, name: '李四', phone: '13900139000', email: 'test2@example.com', trade: '木工', status: '已联系' }
            ]);

  return (
          <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white p-8">
              {/* Header */}
                <div className="mb-8">
                        <h1 className="text-4xl font-bold text-blue-400">ConciergeAI CRM Dashboard</h1>h1>
                        <p className="text-gray-400 mt-2">Expert Recruitment & Management System</p>p>
                </div>div>
          
              {/* Stats Cards */}
                <div className="grid grid-cols-4 gap-4 mb-8">
                        <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
                                  <p className="text-gray-400 text-sm">Total Experts</p>p>
                                  <p className="text-3xl font-bold text-white mt-2">{experts.length}</p>p>
                        </div>div>
                        <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
                                  <p className="text-gray-400 text-sm">New Contacts</p>p>
                                  <p className="text-3xl font-bold text-yellow-400 mt-2">{experts.filter(e => e.status === '新建').length}</p>p>
                        </div>div>
                        <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
                                  <p className="text-gray-400 text-sm">Contacted</p>p>
                                  <p className="text-3xl font-bold text-green-400 mt-2">{experts.filter(e => e.status === '已联系').length}</p>p>
                        </div>div>
                        <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
                                  <p className="text-gray-400 text-sm">System Status</p>p>
                                  <p className="text-3xl font-bold text-purple-400 mt-2">✓ Ready</p>p>
                        </div>div>
                </div>div>
          
              {/* Data Table */}
                <div className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden">
                        <table className="w-full">
                                  <thead className="bg-gray-900 border-b border-gray-700">
                                              <tr>
                                                            <th className="px-6 py-3 text-left text-sm font-semibold">Name</th>th>
                                                            <th className="px-6 py-3 text-left text-sm font-semibold">Phone</th>th>
                                                            <th className="px-6 py-3 text-left text-sm font-semibold">Email</th>th>
                                                            <th className="px-6 py-3 text-left text-sm font-semibold">Trade</th>th>
                                                            <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>th>
                                              </tr>tr>
                                  </thead>thead>
                                  <tbody>
                                      {experts.map(expert => (
                            <tr key={expert.id} className="border-b border-gray-700 hover:bg-gray-700">
                                            <td className="px-6 py-3">{expert.name}</td>td>
                                            <td className="px-6 py-3">{expert.phone}</td>td>
                                            <td className="px-6 py-3">{expert.email}</td>td>
                                            <td className="px-6 py-3">{expert.trade}</td>td>
                                            <td className="px-6 py-3">
                                                              <span className={`px-3 py-1 rounded text-sm font-semibold ${
                                                    expert.status === '新建' ? 'bg-yellow-900 text-yellow-200' : 'bg-green-900 text-green-200'
                            }`}>
                                                                  {expert.status}
                                                              </span>span>
                                            </td>td>
                            </tr>tr>
                          ))}
                                  </tbody>tbody>
                        </table>table>
                </div>div>
          
              {/* System Status Section */}
                <div className="mt-8 bg-gray-800 border border-gray-700 rounded-lg p-6">
                        <h2 className="text-xl font-bold text-white mb-4">System Information</h2>h2>
                        <div className="grid grid-cols-2 gap-4">
                                  <div>
                                              <p className="text-gray-400 text-sm">Application Status</p>p>
                                              <p className="text-green-400 font-semibold">✓ Running (Mock Mode)</p>p>
                                  </div>div>
                                  <div>
                                              <p className="text-gray-400 text-sm">Data Source</p>p>
                                              <p className="text-blue-400 font-semibold">In-Memory State</p>p>
                                  </div>div>
                        </div>div>
                </div>div>
          </div>div>
        );
}</div>
