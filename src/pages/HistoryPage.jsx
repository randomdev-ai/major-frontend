import { useEffect, useState } from 'react';
import Card from '../components/Card';
import Badge from '../components/Badge';
import CircularMeter from '../components/CircularMeter';
import ErrorCard from '../components/ErrorCard';
import { getAssessmentDetails, getAssessments } from '../api/healthApi';

const toPercent = (value = 0) => (value > 1 ? Math.round(value) : Math.round(value * 100));

const HistoryPage = () => {
  const [items, setItems] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getAssessments();
        setItems(data);
      } catch (err) {
        setError(err.response?.status >= 500 ? 'A system error occurred while loading history.' : 'Unable to load assessment history.');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const openDetails = async (item) => {
    setDetailsLoading(true);
    try {
      const details = item.id ? await getAssessmentDetails(item.id) : item;
      setSelected(details || item);
    } finally {
      setDetailsLoading(false);
    }
  };

  return (
    <div className="grid">
      <Card title="Assessment History" subtitle="Secure historical analysis records">
        {loading ? (
          <div className="skeleton-list" aria-label="Loading assessment history">
            {[...Array(4)].map((_, i) => <div key={i} className="skeleton-row" />)}
          </div>
        ) : error ? (
          <ErrorCard title="History unavailable" message={error} />
        ) : (
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Condition</th>
                <th>Risk</th>
                <th>Confidence</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={item.id || index}>
                  <td>{item.createdAt ? new Date(item.createdAt).toLocaleString() : 'N/A'}</td>
                  <td>{item.condition}</td>
                  <td><Badge label={item.riskLevel} /></td>
                  <td><Badge label={`${toPercent(item.confidenceScore || 0)}%`} type="neutral" /></td>
                  <td>
                    <button className="btn btn-secondary" onClick={() => openDetails(item)}>
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Card>

      {detailsLoading && <p className="muted">Loading assessment details...</p>}

      {selected && !detailsLoading && (
        <Card title="Assessment Details" subtitle="Structured case detail">
          <div className="grid two-col">
            <p><strong>Condition:</strong> {selected.condition}</p>
            <p><strong>Risk:</strong> <Badge label={selected.riskLevel} /></p>
            <p><strong>Probability:</strong> {toPercent(selected.probability || 0)}%</p>
            <p><strong>Data Quality:</strong> {selected.dataQuality}</p>
          </div>
          <CircularMeter value={toPercent(selected.confidenceScore || 0)} />
        </Card>
      )}
    </div>
  );
};

export default HistoryPage;
