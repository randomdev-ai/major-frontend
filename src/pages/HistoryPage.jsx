import { useEffect, useState } from 'react';
import Card from '../components/Card';
import Badge from '../components/Badge';
import CircularMeter from '../components/CircularMeter';
import { getAssessments } from '../api/healthApi';

const HistoryPage = () => {
  const [items, setItems] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const load = async () => {
      const data = await getAssessments();
      setItems(Array.isArray(data) ? data : data.results || []);
    };
    load();
  }, []);

  return (
    <div className="grid">
      <Card title="Assessment History" subtitle="Secure historical analysis records">
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
                <td>{new Date(item.created_at || item.date || Date.now()).toLocaleString()}</td>
                <td>{item.condition || item.predicted_condition || 'N/A'}</td>
                <td><Badge label={item.risk_level || 'Unknown'} /></td>
                <td><Badge label={`${Math.round((item.confidence_score || 0) * 100)}%`} type="neutral" /></td>
                <td>
                  <button className="btn btn-secondary" onClick={() => setSelected(item)}>
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      {selected && (
        <Card title="Assessment Details" subtitle="Structured case detail">
          <div className="grid two-col">
            <p><strong>Condition:</strong> {selected.condition || selected.predicted_condition || 'N/A'}</p>
            <p><strong>Risk:</strong> <Badge label={selected.risk_level || 'Unknown'} /></p>
            <p><strong>Probability:</strong> {Math.round((selected.risk_probability || selected.probability || 0) * 100)}%</p>
            <p><strong>Data Quality:</strong> {selected.data_quality || 'N/A'}</p>
          </div>
          <CircularMeter value={Math.round((selected.confidence_score || 0) * 100)} />
        </Card>
      )}
    </div>
  );
};

export default HistoryPage;
