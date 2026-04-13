'use client';
import { useState } from 'react';

export default function Home() {
        const [experts] = useState([
              { id: 1, name: 'Expert 1' },
              { id: 2, name: 'Expert 2' }
                ]);

  return (
            <div style={{minHeight: '100vh', backgroundColor: '#111827', color: '#fff', padding: '32px'}}>
                        <h1>CRM Dashboard</h1>h1>
                  <p>Total: {experts.length}</p>p>
                  <ul>
                        {experts.map((e) => (
                            <li key={e.id}>{e.name}</li>li>
                          ))}
                  </ul>ul>
            </div>div>
          );
}</h1>
