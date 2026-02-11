const Card = ({ title, subtitle, actions, children, className = '' }) => (
  <section className={`card ${className}`}>
    {(title || subtitle || actions) && (
      <header className="card-header">
        <div>
          {title && <h2>{title}</h2>}
          {subtitle && <p className="card-subtitle">{subtitle}</p>}
        </div>
        {actions && <div>{actions}</div>}
      </header>
    )}
    {children}
  </section>
);

export default Card;
