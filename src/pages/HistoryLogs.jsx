import React from 'react';
import AppLayout from '../layouts/AppLayout.jsx';
import Card from '../components/Card.jsx';
import Button from '../components/Button.jsx';
import { historyLogs } from '../utils/mockData.js';

const HistoryLogs = () => {
  return (
    <AppLayout>
      <div className="page-header">
        <h1>History & Logs</h1>
        <p>Review your recent AI analysis sessions.</p>
      </div>
      <Card>
        <ul className="list">
          {historyLogs.map((log) => (
            <li key={log.id}>
              <div>
                <strong>{log.id}</strong>
                <p>{log.timestamp}</p>
              </div>
              <div className="log-actions">
                <span className={`risk-pill ${log.risk.toLowerCase()}`}>{log.risk}</span>
                <Button variant="ghost">View details</Button>
              </div>
            </li>
          ))}
        </ul>
      </Card>
    </AppLayout>
  );
};

export default HistoryLogs;
