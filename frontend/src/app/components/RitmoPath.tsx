"use client";

type Day = { label: string; done: boolean };

const week: Day[] = [
  { label: 'Seg', done: true },
  { label: 'Ter', done: true },
  { label: 'Qua', done: true },
  { label: 'Qui', done: true },
  { label: 'Sex', done: false },
  { label: 'Sáb', done: false },
  { label: 'Dom', done: false }
];

/**
 * A linha do ritmo: o traço ascendente do "A" da marca, usado como
 * elemento assinatura. Se desenha ao carregar, os dias concluídos acendem
 * em sequência, e o Avi acompanha no ponto atual — a mesma ideia visual
 * aparece na home (grande), no painel (mini gráfico) e no chat (presença viva).
 */
export default function RitmoPath({ size = 'large' }: { size?: 'large' | 'mini' }) {
  const width = size === 'large' ? 480 : 320;
  const height = size === 'large' ? 260 : 96;
  const pad = size === 'large' ? 36 : 16;
  const usableW = width - pad * 2;
  const usableH = height - pad * 2;

  // pontos em leve zigue-zague ascendente, como o traço do "A"
  const amplitude = size === 'large' ? 34 : 14;
  const points = week.map((_, i) => {
    const t = i / (week.length - 1);
    const x = pad + t * usableW;
    const wobble = Math.sin(i * 1.7) * amplitude * 0.4;
    const y = pad + usableH - t * usableH + wobble;
    return { x, y };
  });

  const d = points
    .map((p, i) => (i === 0 ? `M ${p.x} ${p.y}` : `L ${p.x} ${p.y}`))
    .join(' ');

  const lastDone = points[Math.max(0, week.filter((d2) => d2.done).length - 1)];

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      width="100%"
      height={height}
      role="img"
      aria-label="Ritmo de estudos da semana"
    >
      <defs>
        <filter id="ritmo-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation={size === 'large' ? 4 : 2.4} result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <path
        d={d}
        fill="none"
        stroke="var(--line)"
        strokeWidth={size === 'large' ? 3 : 2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d={d}
        fill="none"
        stroke="var(--blue)"
        strokeWidth={size === 'large' ? 3 : 2}
        strokeLinecap="round"
        strokeLinejoin="round"
        pathLength={1}
        filter="url(#ritmo-glow)"
        style={{
          strokeDasharray: 1,
          strokeDashoffset: 1,
          animation: 'drawPath 1.4s var(--ease) 0.15s forwards'
        }}
      />
      {points.map((p, i) => {
        const done = week[i].done;
        return (
          <g key={i} style={{ animation: `nodeIn 0.4s var(--ease) ${0.5 + i * 0.09}s both` }}>
            <circle
              cx={p.x}
              cy={p.y}
              r={size === 'large' ? 7 : 4.5}
              fill={done ? 'var(--green)' : 'var(--white)'}
              stroke={done ? 'var(--green)' : 'var(--line)'}
              strokeWidth={2}
            />
            {size === 'large' && (
              <text
                x={p.x}
                y={height - 6}
                textAnchor="middle"
                fontFamily="var(--font-mono)"
                fontSize="11"
                fill="var(--slate)"
              >
                {week[i].label}
              </text>
            )}
          </g>
        );
      })}
      {/* Avi: companheiro pulsante no ponto atual do ritmo */}
      <g style={{ animation: `nodeIn 0.5s var(--ease) ${0.5 + points.length * 0.09 + 0.15}s both` }}>
        <circle
          cx={lastDone.x}
          cy={lastDone.y}
          r={size === 'large' ? 15 : 9}
          fill="var(--blue-100)"
          style={{ animation: 'breathe 2.4s ease-out infinite' }}
        />
        <circle cx={lastDone.x} cy={lastDone.y} r={size === 'large' ? 8 : 5} fill="var(--blue)" filter="url(#ritmo-glow)" />
      </g>
    </svg>
  );
}
