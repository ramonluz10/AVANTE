import Image from 'next/image';
import Link from 'next/link';
import RitmoPath from './components/RitmoPath';

const repoName = process.env.GITHUB_REPOSITORY?.split('/')[1] ?? '';
const BASE_PATH = repoName ? `/${repoName}` : '';
const withBasePath = (path: string) => `${BASE_PATH}${path.startsWith('/') ? path : `/${path}`}`;

const pillars = [
  {
    title: 'Plano que se ajusta a você',
    body: 'O Avante monta seu cronograma em blocos realistas e reorganiza tudo quando a semana muda de rumo — sem culpa por atrasos.'
  },
  {
    title: 'Avi, seu mentor de estudos',
    body: 'Converse com o Avi para reorganizar tarefas, entender o que estudar primeiro e comemorar cada conquista, por menor que seja.'
  },
  {
    title: 'Constância visível',
    body: 'Acompanhe seu ritmo em uma linha só — sem rankings, sem pressão, apenas o seu caminho, um passo de cada vez.'
  }
];

export default function HomePage() {
  return (
    <main style={{ position: 'relative' }}>
      <div className="mesh-bg">
        <div
          className="orb"
          style={{ width: 340, height: 340, top: -80, left: '8%', background: 'var(--blue)' }}
        />
        <div
          className="orb"
          style={{ width: 260, height: 260, top: 120, right: '6%', background: 'var(--yellow)', animationDelay: '2s' }}
        />
        <div
          className="orb"
          style={{ width: 200, height: 200, bottom: -40, left: '30%', background: 'var(--green)', animationDelay: '4s' }}
        />
      </div>

      <section className="container" style={{ paddingTop: 64, paddingBottom: 40 }}>
        <div
          className="home-hero"
          style={{
            display: 'grid',
            gridTemplateColumns: '1.05fr 0.95fr',
            gap: 48,
            alignItems: 'center'
          }}
        >
          <div className="fade-up">
            <span className="eyebrow chip-glow" style={{ padding: '6px 12px', borderRadius: 999 }}>avante · um passo de cada vez</span>
            <h1 className="glow-text" style={{ fontSize: 'clamp(2.1rem, 4.4vw, 3.4rem)', margin: '18px 0 20px' }}>
              Estudos mais claros, constância real e um mentor sempre ao seu lado.
            </h1>
            <p style={{ color: 'var(--slate)', fontSize: 18, lineHeight: 1.7, marginBottom: 30, maxWidth: 480 }}>
              O Avante transforma sua rotina em um plano inteligente e acolhedor — para que estudar
              se torne algo sustentável, não mais uma fonte de ansiedade.
            </p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <Link href={withBasePath('/auth')} className="btn btn-primary shimmer">
                Comece agora
              </Link>
              <Link href={withBasePath('/dashboard')} className="btn btn-secondary">
                Ver o painel
              </Link>
            </div>
          </div>

          <div
            className="card card--glow fade-up"
            style={{ padding: 28, animationDelay: '0.1s' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
              <span className="eyebrow">sua semana</span>
              <span className="badge badge--progress">4 de 7 dias</span>
            </div>
            <RitmoPath size="large" />
            <p style={{ color: 'var(--slate)', fontSize: 14, marginTop: 4 }}>
              O Avi está com você no ponto em que você parou — não no que falta.
            </p>
          </div>
        </div>
      </section>

      <section className="container" style={{ paddingTop: 48, paddingBottom: 64 }}>
        <div className="home-pills" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
          {pillars.map((pillar, i) => (
            <div
              key={pillar.title}
              className="card card--interactive fade-up"
              style={{ padding: 26, animationDelay: `${0.15 + i * 0.08}s` }}
            >
              <h3 style={{ fontSize: 19, marginBottom: 10 }}>{pillar.title}</h3>
              <p style={{ color: 'var(--slate)', lineHeight: 1.65, fontSize: 15 }}>{pillar.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container" style={{ paddingBottom: 64 }}>
        <div
          className="card fade-up home-spotlight"
          style={{
            padding: '36px 40px',
            display: 'grid',
            gridTemplateColumns: '180px 1fr',
            gap: 36,
            alignItems: 'center'
          }}
        >
          <div style={{ position: 'relative', width: 180, height: 210, justifySelf: 'center' }}>
            <div
              style={{
                position: 'absolute',
                inset: 4,
                borderRadius: '50%',
                background: 'var(--blue-50)',
                animation: 'breathe 3s ease-out infinite'
              }}
            />
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                bottom: 6,
                left: '50%',
                transform: 'translateX(-50%)',
                width: 92,
                height: 16,
                borderRadius: '50%',
                background: 'radial-gradient(closest-side, rgba(10,29,61,0.18), transparent)'
              }}
            />
            <Image
              src={withBasePath('/avi-mascot.png')}
              alt="Avi, o mascote e mentor de estudos do Avante"
              fill
              style={{ objectFit: 'contain', filter: 'drop-shadow(0 10px 16px rgba(10,29,61,0.16))' }}
            />
          </div>
          <div>
            <span className="eyebrow">seu mentor</span>
            <h2 style={{ fontSize: 24, margin: '10px 0 10px' }}>Este é o Avi.</h2>
            <p style={{ color: 'var(--slate)', lineHeight: 1.7, fontSize: 15.5, maxWidth: 520 }}>
              Ele acompanha seu progresso, sugere o próximo passo e comemora cada conquista —
              sempre no seu ritmo, nunca com pressão. O Avi orienta; quem estuda é você.
            </p>
            <Link href={withBasePath('/avi')} className="btn btn-primary" style={{ marginTop: 16 }}>
              Conversar com o Avi
            </Link>
          </div>
        </div>
      </section>

      <section className="container" style={{ paddingBottom: 80 }}>
        <div
          className="card border-flow fade-up"
          style={{
            padding: '40px 36px',
            background: 'var(--blue)',
            border: 0,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 20
          }}
        >
          <div>
            <h3 style={{ color: 'var(--white)', fontSize: 24, marginBottom: 8 }}>Pronto para dar o próximo passo?</h3>
            <p style={{ color: 'var(--blue-100)', fontSize: 15 }}>Leva menos de um minuto para começar.</p>
          </div>
          <Link href={withBasePath('/auth')} className="btn" style={{ background: 'var(--white)', color: 'var(--blue-dark)' }}>
            Criar minha conta
          </Link>
        </div>
      </section>
    </main>
  );
}
