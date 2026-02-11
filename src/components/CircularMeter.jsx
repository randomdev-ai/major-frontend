const CircularMeter = ({ value = 0, label = 'Confidence' }) => {
  const clamped = Math.min(100, Math.max(0, value));
  const circumference = 2 * Math.PI * 45;
  const offset = circumference - (clamped / 100) * circumference;

  return (
    <div className="circular-meter" aria-label={`${label}: ${clamped}%`}>
      <svg viewBox="0 0 120 120" aria-hidden="true">
        <circle cx="60" cy="60" r="45" className="meter-bg" />
        <circle cx="60" cy="60" r="45" className="meter-fg" style={{ strokeDasharray: circumference, strokeDashoffset: offset }} />
      </svg>
      <div>
        <strong>{clamped}%</strong>
        <p>{label}</p>
      </div>
    </div>
  );
};

export default CircularMeter;
