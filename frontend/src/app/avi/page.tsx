"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

type Message = { id: number; from: 'user' | 'avi'; text: string };

const repoName = process.env.GITHUB_REPOSITORY?.split('/')[1] ?? '';
const BASE_PATH = repoName ? `/${repoName}` : '';
const withBasePath = (path: string) => `${BASE_PATH}${path.startsWith('/') ? path : `/${path}`}`;
const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

function LunaAvatar({ size = 44, thinking = false }: { size?: number; thinking?: boolean }) {
  return (
    <div style={{ position: 'relative', width: size, height: size, flexShrink: 0 }}>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '50%',
          background: 'var(--blue-100)',
          animation: thinking ? 'breathe 1.1s ease-out infinite' : 'breathe 2.6s ease-out infinite'
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: size * 0.08,
          borderRadius: '50%',
          background: 'var(--white)',
          overflow: 'hidden',
          display: 'grid',
          placeItems: 'center'
        }}
      >
        <Image
          src={withBasePath('/avi-mascot.png')}
          alt="Avi"
          width={size * 2}
          height={size * 2}
          style={{ objectFit: 'cover', objectPosition: '50% 12%', width: '100%', height: '100%' }}
        />
      </div>
    </div>
  );
}

function TypingDots() {
  return (
    <div style={{ display: 'flex', gap: 4, padding: '10px 6px' }}>
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          style={{
            width: 6,
            height: 6,
            borderRadius: '50%',
            background: 'var(--slate)',
            animation: `dotBounce 1.1s ease-in-out ${i * 0.15}s infinite`
          }}
        />
      ))}
    </div>
  );
}

export default function AviPage() {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, from: 'avi', text: 'Oi! Eu sou a Luna. Me conta o que está no seu dia hoje que eu ajudo a organizar.' }
  ]);
  const [input, setInput] = useState('');
  const [thinking, setThinking] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, thinking]);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg: Message = { id: Date.now(), from: 'user', text: input };
    const historyForApi = messages.slice(-10);
    setMessages((current) => [...current, userMsg]);
    setInput('');
    setThinking(true);

    fetch(`${API_BASE}/api/avi/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: userMsg.text, history: historyForApi })
    })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Falha ao falar com o Avi.');
        return data.reply as string;
      })
      .then((reply) => {
        setMessages((current) => [...current, { id: Date.now() + 1, from: 'avi', text: reply }]);
      })
      .catch((err) => {
        setMessages((current) => [
          ...current,
          {
            id: Date.now() + 1,
            from: 'avi',
            text: `Não consegui responder agora (${err.message}). Confira se o backend está rodando com a chave da OpenAI configurada.`
          }
        ]);
      })
      .finally(() => setThinking(false));
  };

  return (
    <main className="container" style={{ paddingTop: 40, paddingBottom: 60 }}>
      <div className="card border-flow fade-up" style={{ maxWidth: 720, margin: '0 auto', overflow: 'hidden' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 14,
            padding: '20px 24px',
            borderBottom: '1px solid var(--line)',
            background: 'var(--mist)'
          }}
        >
          <LunaAvatar thinking={thinking} />
          <div>
            <div style={{ fontWeight: 800, fontSize: 16 }}>Luna</div>
            <div style={{ fontSize: 13, color: thinking ? 'var(--blue)' : 'var(--green)', fontFamily: 'var(--font-mono)' }}>
              {thinking ? 'pensando…' : 'por perto, no seu ritmo'}
            </div>
          </div>
        </div>

        <div ref={listRef} style={{ padding: '24px', display: 'grid', gap: 14, maxHeight: 440, overflowY: 'auto' }}>
          {messages.map((msg) => (
            <div
              key={msg.id}
              className="slide-in"
              style={{
                display: 'flex',
                gap: 10,
                justifyContent: msg.from === 'user' ? 'flex-end' : 'flex-start'
              }}
            >
              {msg.from === 'avi' && <LunaAvatar size={30} />}
              <div
                style={{
                  maxWidth: '75%',
                  padding: '12px 16px',
                  borderRadius: msg.from === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                  background: msg.from === 'user' ? 'var(--blue)' : 'var(--mist)',
                  color: msg.from === 'user' ? 'var(--white)' : 'var(--ink)',
                  fontSize: 14.5,
                  lineHeight: 1.55
                }}
              >
                {msg.text}
              </div>
            </div>
          ))}
          {thinking && (
            <div className="slide-in" style={{ display: 'flex', gap: 10 }}>
              <LunaAvatar size={30} thinking />
              <div style={{ background: 'var(--mist)', borderRadius: '16px 16px 16px 4px' }}>
                <TypingDots />
              </div>
            </div>
          )}
        </div>

        <div style={{ display: 'flex', gap: 10, padding: 18, borderTop: '1px solid var(--line)' }}>
          <input
            className="field"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={(event) => event.key === 'Enter' && handleSend()}
            placeholder="Escreva algo para o Avi"
          />
          <button className="btn btn-primary" onClick={handleSend} style={{ flexShrink: 0 }}>
            Enviar
          </button>
        </div>
      </div>

      <div style={{ textAlign: 'center', marginTop: 20 }}>
        <Link href={withBasePath('/dashboard')} className="btn btn-secondary">
          Voltar ao painel
        </Link>
      </div>
    </main>
  );
}
