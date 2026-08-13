import Link from 'next/link';
import RitmoPath from '../components/RitmoPath';

const repoName = process.env.GITHUB_REPOSITORY?.split('/')[1]?.toLowerCase() ?? '';
const BASE_PATH = repoName ? `/${repoName}` : '';
const withBasePath = (path: string) => `${BASE_PATH}${path.startsWith('/') ? path : `/${path}`}`;

const conquistas = ['7 dias seguidos', 'Meta batida', 'Primeira conversa com Avi'];

export default function ProfilePage() {
  return (
    <main className="container" style={{ paddingTop: 40, paddingBottom: 70 }}>
      <div className="card fade-up" style={{ padding: 36, maxWidth: 760, margin: '0 auto' }}>
        <span className="eyebrow">perfil</span>
        <h1 style={{ fontSize: 27, margin: '14px 0 10px' }}>Seu perfil de estudante</h1>
        <p style={{ color: 'var(--slate)', lineHeight: 1.7, maxWidth: 520 }}>
          Aqui fica seu histórico, metas e conquistas — construindo o mapa da sua constância.
        </p>

        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 22 }}>
          {conquistas.map((item) => (
            <span key={item} className="badge badge--highlight">
              ★ {item}
            </span>
          ))}
        </div>

        <div style={{ display: 'grid', gap: 12, marginTop: 26, gridTemplateColumns: '1fr 1fr' }}>
          <div className="card card--muted" style={{ padding: 20 }}>
            <span className="eyebrow">meta atual</span>
            <div style={{ marginTop: 10, fontSize: 16 }}>Estudar 2 horas por dia durante 3 semanas</div>
          </div>
          <div className="card card--muted" style={{ padding: 20 }}>
            <span className="eyebrow">consistência</span>
            <div style={{ marginTop: 10, fontSize: 16 }}>
              <span className="badge badge--progress">91% nos últimos 7 dias</span>
            </div>
          </div>
        </div>

        <div className="card card--muted fade-up" style={{ padding: 22, marginTop: 20 }}>
          <span className="eyebrow">seu ritmo completo</span>
          <RitmoPath size="mini" />
        </div>

        <div style={{ marginTop: 26 }}>
          <Link href={withBasePath('/dashboard')} className="btn btn-primary">
            Voltar ao painel
          </Link>
        </div>
      </div>
    </main>
  );
}
