import './Atmosphere.css';

/** Puerta de luz: el umbral recurrente de la atmósfera. */
export default function Doorway({ className = '' }) {
  return (
    <div className={`doorway ${className}`} aria-hidden="true">
      <div className="doorway__frame">
        <div className="doorway__light" />
        <div className="doorway__haze" />
      </div>
      <div className="doorway__glow" />
    </div>
  );
}
