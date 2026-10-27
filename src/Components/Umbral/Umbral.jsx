import Doorway from '../Atmosphere/Doorway.jsx';
import DreamFloor from '../Atmosphere/DreamFloor.jsx';
import './Umbral.css';

/**
 * Interludio liminal: una puerta de luz entre Proyectos y Contacto.
 * No es una sección de contenido; es una pausa.
 */
export default function Umbral({ onEnter }) {
  return (
    <section className="umbral" id="umbral" aria-labelledby="umbral-title">
      <div className="umbral__scene" aria-hidden="true">
        <Doorway className="umbral__door" />
        <DreamFloor className="umbral__floor" />
      </div>

      <div className="umbral__content">
        <h2 className="umbral__title" id="umbral-title">
          El umbral entre una idea y algo que funciona.
        </h2>
        <p className="umbral__copy">
          Todo sistema empieza como una imagen difusa: una puerta entreabierta,
          una luz al fondo. El trabajo consiste en caminar hacia ella.
        </p>
        <button type="button" className="umbral__cta" onClick={onEnter}>
          Cruzar el umbral
        </button>
      </div>
    </section>
  );
}
