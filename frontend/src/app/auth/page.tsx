"use client";

import Image from 'next/image';
import Link from 'next/link';
import { FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

const socialProviders = [
  { name: 'Google', accent: '#ea4335' },
  { name: 'Apple', accent: '#111111' },
  { name: 'GitHub', accent: '#24292f' }
];

const repoName = process.env.GITHUB_REPOSITORY?.split('/')[1]?.toLowerCase() ?? '';
const BASE_PATH = repoName ? `/${repoName}` : '';
const withBasePath = (path: string) => `${BASE_PATH}${path.startsWith('/') ? path : `/${path}`}`;

export default function AuthPage() {
  const router = useRouter();
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const stored = sessionStorage.getItem('avante-auth');
    if (stored) {
      router.replace(withBasePath('/dashboard'));
    }
  }, [router]);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (mode === 'register') {
      if (!name || !email || !password) {
        setMessage('Preencha nome, e-mail e senha para criar sua conta.');
        return;
      }
      if (password.length < 6) {
        setMessage('A senha deve ter pelo menos 6 caracteres.');
        return;
      }

      sessionStorage.setItem('avante-auth', JSON.stringify({ name, email }));
      setMessage('Conta criada com sucesso. Redirecionando para o painel...');
      router.push(withBasePath('/dashboard'));
      return;
    }

    if (!email || !password) {
      setMessage('Preencha e-mail e senha para continuar.');
      return;
    }

    sessionStorage.setItem('avante-auth', JSON.stringify({ email }));
    router.push(withBasePath('/dashboard'));
  };

  const handleSocialClick = async (provider: string) => {
    if (provider === 'Google') {
      if (process.env.NEXT_PUBLIC_GOOGLE_AUTH_ENABLED !== 'true') {
        setMessage('O login com Google ainda não está configurado no ambiente local. Adicione GOOGLE_CLIENT_ID e GOOGLE_CLIENT_SECRET para ativar o fluxo.');
        return;
      }

      setMessage('Redirecionando para o Google...');
      await signIn('google', { callbackUrl: withBasePath('/dashboard') });
      return;
    }

    setMessage(`O fluxo de ${provider} será conectado ao backend do projeto em seguida.`);
  };

  const isRegister = mode === 'register';

  return (
    <main className="container" style={{ paddingTop: 56, paddingBottom: 80 }}>
      <div
        className="card fade-up auth-card"
        style={{ padding: 40, maxWidth: 460, margin: '0 auto' }}
      >
        <Image
          src={withBasePath('/avante-logomark.png')}
          alt="Avante"
          width={72}
          height={60}
          style={{ objectFit: 'contain', marginBottom: 4 }}
        />
        <span className="eyebrow">acesso</span>
        <h1 style={{ fontSize: 27, margin: '14px 0 8px' }}>
          {isRegister ? 'Crie sua conta' : 'Entre na sua jornada'}
        </h1>
        <p style={{ color: 'var(--slate)', marginBottom: 24, lineHeight: 1.6, fontSize: 15 }}>
          {isRegister
            ? 'Monte seu plano com o Avante e siga para o próximo passo com apoio do Avi.'
            : 'Faça login para voltar ao seu painel e continuar de onde parou, sem pressão.'}
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 8,
            background: 'var(--mist)',
            borderRadius: 999,
            padding: 4,
            marginBottom: 18
          }}
        >
          <button
            type="button"
            className="btn btn-secondary"
            style={{
              borderRadius: 999,
              padding: '10px 16px',
              background: mode === 'login' ? 'var(--white)' : 'transparent',
              borderColor: mode === 'login' ? 'var(--blue-100)' : 'transparent'
            }}
            onClick={() => {
              setMode('login');
              setMessage('');
            }}
          >
            Entrar
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            style={{
              borderRadius: 999,
              padding: '10px 16px',
              background: mode === 'register' ? 'var(--white)' : 'transparent',
              borderColor: mode === 'register' ? 'var(--blue-100)' : 'transparent'
            }}
            onClick={() => {
              setMode('register');
              setMessage('');
            }}
          >
            Criar conta
          </button>
        </div>

        <div style={{ display: 'grid', gap: 10, marginBottom: 18 }}>
          {socialProviders.map((provider) => (
            <button
              key={provider.name}
              type="button"
              className="btn btn-secondary"
              onClick={() => handleSocialClick(provider.name)}
              style={{ justifyContent: 'flex-start', gap: 12, width: '100%' }}
            >
              <span
                aria-hidden="true"
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: '50%',
                  background: provider.accent,
                  flexShrink: 0
                }}
              />
              Continuar com {provider.name}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10, margin: '2px 0 16px' }}>
          <div style={{ height: 1, flex: 1, background: 'var(--line)' }} />
          <span style={{ color: 'var(--slate)', fontSize: 12, textTransform: 'uppercase', letterSpacing: 0.12 }}>ou</span>
          <div style={{ height: 1, flex: 1, background: 'var(--line)' }} />
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 12 }}>
          {isRegister ? (
            <label style={{ display: 'grid', gap: 6 }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)' }}>Nome</span>
              <input
                className="field"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Como você se chama?"
                type="text"
              />
            </label>
          ) : null}

          <label style={{ display: 'grid', gap: 6 }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)' }}>E-mail</span>
            <input
              className="field"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="seu@email.com"
              type="email"
            />
          </label>

          <label style={{ display: 'grid', gap: 6 }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)' }}>Senha</span>
            <input
              className="field"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              type="password"
              placeholder={isRegister ? 'Crie uma senha segura' : 'Digite sua senha'}
            />
          </label>

          <button className="btn btn-primary" type="submit" style={{ marginTop: 8 }}>
            {isRegister ? 'Criar conta' : 'Entrar'}
          </button>
        </form>

        {message ? (
          <p className="slide-in" style={{ color: message.startsWith('Conta criada') ? 'var(--green)' : 'var(--red)', marginTop: 14, fontSize: 14 }}>
            {message}
          </p>
        ) : null}

        <p style={{ marginTop: 22, color: 'var(--slate)', fontSize: 14 }}>
          {isRegister ? 'Já tem conta?' : 'Ainda não tem conta?'}{' '}
          <button
            type="button"
            onClick={() => {
              setMode(isRegister ? 'login' : 'register');
              setMessage('');
            }}
            style={{ color: 'var(--blue)', fontWeight: 600, background: 'none', border: 0, cursor: 'pointer', padding: 0 }}
          >
            {isRegister ? 'Entre agora' : 'Crie sua conta'}
          </button>
        </p>
      </div>
    </main>
  );
}
