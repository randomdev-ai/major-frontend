const ProgressBar = ({ value = 0, label = 'Progress' }) => {
  const clamped = Math.min(100, Math.max(0, value));
  return (
    <div className="progress-wrapper" role="progressbar" aria-label={label} aria-valuenow={clamped} aria-valuemin={0} aria-valuemax={100}>
      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${clamped}%` }} />
      </div>
      <span>{clamped}%</span>
    </div>
  );
};

export default ProgressBar;
