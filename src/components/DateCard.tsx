import type { DateCard as DateCardData } from "@/lib/dates";

const StampSVG = () => {
  return (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="rough">
          <feTurbulence type="fractalNoise" baseFrequency="0.045" numOctaves="2" result="noise" seed="7" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="4.5" />
        </filter>
      </defs>
      <g filter="url(#rough)" fill="none" stroke="#C75D3A" strokeWidth="4">
        <circle cx="100" cy="100" r="86" />
        <circle cx="100" cy="100" r="72" />
      </g>
      <g filter="url(#rough)">
        <path id="curveTop" d="M 35 75 A 75 75 0 0 1 165 75" fill="none" />
        <text fontFamily="Space Mono, monospace" fontSize="14" fontWeight="700" fill="#C75D3A" letterSpacing="2">
          <textPath href="#curveTop" startOffset="50%" textAnchor="middle">
            eingelöst · eingelöst
          </textPath>
        </text>
      </g>
      <g filter="url(#rough)" fontFamily="Fraunces, serif" fontStyle="italic" fontWeight="700" fill="#C75D3A">
        <text x="100" y="112" fontSize="30" textAnchor="middle">
          erledigt
        </text>
      </g>
      <g filter="url(#rough)" fill="none" stroke="#C75D3A" strokeWidth="3.5">
        <path d="M 70 128 L 95 140 L 132 105" />
      </g>
    </svg>
  );
};

type DateCardProps = {
  date: DateCardData;
  isDone: boolean;
};

const DateCard = ({ date, isDone }: DateCardProps) => {
  return (
    <div className="card">
      <div className="card-tex" />
      <div className="card-image" role="img" aria-label="Platzhalter für ein Foto">
        <span className="card-image-glyph" aria-hidden="true">
          {date.icon}
        </span>
        <span className="card-image-hint">Bild folgt</span>
      </div>
      <h2 className="card-title">{date.title}</h2>
      <p className="card-desc">{date.desc}</p>
      {isDone && (
        <div className="stamp show">
          <StampSVG />
        </div>
      )}
    </div>
  );
};

export default DateCard;
