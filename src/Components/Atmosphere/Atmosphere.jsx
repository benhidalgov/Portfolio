import './Atmosphere.css';

/**
 * Atmósfera global: aurora, nubes, grano, líneas de escaneo y viñeta.
 * Puro CSS, sin WebGL. Se monta una sola vez en App y queda detrás del contenido.
 */
export default function Atmosphere() {
  return (
    <div className="atmosphere" aria-hidden="true">
      <div className="atmosphere__aurora atmosphere__aurora--lilac" />
      <div className="atmosphere__aurora atmosphere__aurora--blush" />
      <div className="atmosphere__aurora atmosphere__aurora--mist" />

      <div className="atmosphere__clouds">
        <span className="atmosphere__cloud atmosphere__cloud--one" />
        <span className="atmosphere__cloud atmosphere__cloud--two" />
        <span className="atmosphere__cloud atmosphere__cloud--three" />
      </div>

      <div className="atmosphere__scanlines" />
      <div className="atmosphere__grain" />
      <div className="atmosphere__vignette" />
    </div>
  );
}
