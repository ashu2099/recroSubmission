import "./CardThumbnail.css";

export default function CardThumbnail(props) {
  return (
    <div className="column">
      <div className="card">
        <h2>{props.cardTitle}</h2>
        <p>{props.cardBody}</p>
      </div>
    </div>
  );
}
