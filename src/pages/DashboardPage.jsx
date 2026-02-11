import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/Card';
import Badge from '../components/Badge';
import ErrorCard from '../components/ErrorCard';
import { getAssessments } from '../api/healthApi';

const DashboardPage = () => {
  const [loading, setLoading] = useState(true);
  const [assessments, setAssessments] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getAssessments();
        setAssessments(data);
      } catch (err) {
        setError(err.response?.status >= 500 ? 'A system error occurred while loading assessments.' : 'Unable to load assessment history.');
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
          <div className="skeleton-list" aria-label="Loading recent assessments">
            {[...Array(3)].map((_, i) => <div key={i} className="skeleton-row" />)}
          </div>
        ) : error ? (
          <ErrorCard title="Assessment history unavailable" message={error} />
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
                  <td>{entry.createdAt ? new Date(entry.createdAt).toLocaleDateString() : 'N/A'}</td>
                  <td>{entry.condition}</td>
                  <td><Badge label={entry.riskLevel} /></td>
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
