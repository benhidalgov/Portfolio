import './Atmosphere.css';

/** Suelo ajedrezado en perspectiva, fundido en niebla. */
export default function DreamFloor({ className = '' }) {
  return (
    <div className={`dream-floor ${className}`} aria-hidden="true">
      <div className="dream-floor__horizon" />
      <div className="dream-floor__grid" />
    </div>
  );
}
