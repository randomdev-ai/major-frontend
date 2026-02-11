import Card from './Card';

const ErrorCard = ({ title = 'Unable to complete request', message = 'Please try again in a moment.' }) => (
  <Card title={title}>
    <p className="error-text">{message}</p>
  </Card>
);

export default ErrorCard;
