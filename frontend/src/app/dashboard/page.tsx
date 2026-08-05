"use client";

import Link from 'next/link';
import { useState } from 'react';
import RitmoPath from '../components/RitmoPath';

type Task = { id: number; title: string; time: string; completed: boolean };

const initialTasks: Task[] = [
  { id: 1, title: 'Revisar matemática', time: '09:00', completed: true },
  { id: 2, title: 'Leitura de biologia', time: '15:00', completed: false },
  { id: 3, title: 'Exercícios de redação', time: '20:00', completed: false }
];

function CheckMark({ checked }: { checked: boolean }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path
        d="M3 8.5 L6.5 12 L13 4.5"
        stroke={checked ? 'var(--white)' : 'transparent'}
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        pathLength={1}
        style={{
          strokeDasharray: 1,
          strokeDashoffset: checked ? 0 : 1,
          transition: 'stroke-dashoffset 0.3s var(--ease)'
        }}
      />
    </svg>
  );
}

export default function DashboardPage() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [goal, setGoal] = useState('Estudar 2 horas por dia');

  const toggleTask = (id: number) => {
    setTasks((current) => current.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)));
  };

  const doneCount = tasks.filter((t) => t.completed).length;

  return (
    <main className="container" style={{ paddingTop: 40, paddingBottom: 70 }}>
      <section style={{ display: 'grid', gridTemplateColumns: '1.3fr 0.7fr', gap: 20 }}>
        <div className="card fade-up" style={{ padding: 30 }}>
          <span className="eyebrow">painel</span>
          <h1 style={{ fontSize: 26, margin: '12px 0 10px' }}>Seu plano inteligente de estudos</h1>
          <p style={{ color: 'var(--slate)', lineHeight: 1.7, maxWidth: 480 }}>
            Você está indo bem. O plano de hoje foi ajustado para manter a calma e o ritmo.
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 20 }}>
            <Link href="/avi" className="btn btn-primary">
              Falar com Avi
            </Link>
            <Link href="/profile" className="btn btn-secondary">
              Meu perfil
            </Link>
          </div>
        </div>

        <div className="card fade-up" style={{ padding: 24, animationDelay: '0.08s' }}>
          <span className="eyebrow">resumo do dia</span>
          <div style={{ fontSize: 34, fontWeight: 800, marginTop: 10, fontFamily: 'var(--font-mono)' }}>
            {doneCount}/{tasks.length}
          </div>
          <p style={{ color: 'var(--slate)', fontSize: 14, marginTop: 4 }}>blocos concluídos hoje</p>
          <span className="badge badge--progress" style={{ marginTop: 14, display: 'inline-flex' }}>
            91% de consistência · 7 dias
          </span>
        </div>
      </section>

      <section className="card fade-up" style={{ padding: 24, marginTop: 20, animationDelay: '0.14s' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
          <span className="eyebrow">seu ritmo</span>
          <Link href="/profile" style={{ fontSize: 13, color: 'var(--blue)', fontWeight: 600 }}>
            ver histórico completo →
          </Link>
        </div>
        <RitmoPath size="mini" />
      </section>

      <section className="card fade-up" style={{ padding: 24, marginTop: 20, animationDelay: '0.18s' }}>
        <span className="eyebrow">meta atual</span>
        <input
          className="field"
          value={goal}
          onChange={(event) => setGoal(event.target.value)}
          style={{ marginTop: 12 }}
        />
      </section>

      <section className="card fade-up" style={{ padding: 24, marginTop: 20, animationDelay: '0.22s' }}>
        <span className="eyebrow">cronograma de hoje</span>
        <div style={{ display: 'grid', gap: 10, marginTop: 14 }}>
          {tasks.map((task) => (
            <div
              key={task.id}
              style={{
                border: '1px solid var(--line)',
                borderRadius: 'var(--radius-sm)',
                padding: '14px 16px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                background: task.completed ? 'var(--green-50)' : 'var(--white)',
                borderColor: task.completed ? 'rgba(22,163,74,0.2)' : 'var(--line)',
                transition: 'background 0.3s var(--ease), border-color 0.3s var(--ease)'
              }}
            >
              <div>
                <div style={{ fontWeight: 700, fontSize: 15 }}>{task.title}</div>
                <div style={{ color: 'var(--slate)', marginTop: 3, fontSize: 13, fontFamily: 'var(--font-mono)' }}>
                  {task.time}
                </div>
              </div>
              <button
                onClick={() => toggleTask(task.id)}
                aria-pressed={task.completed}
                aria-label={task.completed ? 'Marcar como não concluído' : 'Marcar como concluído'}
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: '50%',
                  border: `2px solid ${task.completed ? 'var(--green)' : 'var(--line)'}`,
                  background: task.completed ? 'var(--green)' : 'transparent',
                  display: 'grid',
                  placeItems: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.25s var(--ease)'
                }}
              >
                <CheckMark checked={task.completed} />
              </button>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
