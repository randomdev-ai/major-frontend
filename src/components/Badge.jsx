const normalize = (value = '') => value.toLowerCase();

const Badge = ({ label, type }) => {
  const kind = type || normalize(label);
  return <span className={`badge badge-${kind}`}>{label}</span>;
};

export default Badge;
