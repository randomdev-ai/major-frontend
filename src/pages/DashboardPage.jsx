import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/Card';
import Badge from '../components/Badge';
import Loader from '../components/Loader';
import { getAssessments } from '../api/healthApi';

const DashboardPage = () => {
  const [loading, setLoading] = useState(true);
  const [assessments, setAssessments] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getAssessments();
        setAssessments(Array.isArray(data) ? data : data.results || []);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <div className="grid">
      <Card title="Welcome" subtitle="Monitor your latest analysis signals and continue with a new submission.">
        <Link className="btn" to="/app/new-analysis">
          Start New Analysis
        </Link>
      </Card>

      <Card title="Recent Assessments" subtitle="Latest five records from secure history">
        {loading ? (
          <div className="skeleton-list">
            {[...Array(3)].map((_, i) => <div key={i} className="skeleton-row" />)}
          </div>
        ) : assessments.length === 0 ? (
          <p className="muted">No assessments are currently available.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Condition</th>
                <th>Risk</th>
              </tr>
            </thead>
            <tbody>
              {assessments.slice(0, 5).map((entry, index) => (
                <tr key={entry.id || index}>
                  <td>{new Date(entry.created_at || entry.date || Date.now()).toLocaleDateString()}</td>
                  <td>{entry.condition || entry.predicted_condition || 'N/A'}</td>
                  <td><Badge label={entry.risk_level || 'Unknown'} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Card>
    </div>
  );
};

export default DashboardPage;
