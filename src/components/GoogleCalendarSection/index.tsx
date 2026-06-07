'use client';

import { useState, useRef, useEffect } from 'react';
import { Save, Check, AlertTriangle, Loader, HelpCircle, AlertCircle } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { updateGoogleCalendarId } from '@/lib/services/tenantSettings';
import * as S from './styles';

interface GoogleCalendarSectionProps {
  initialCalendarId: string | null;
  tenantId: string;
  onDirtyChange?: (dirty: boolean) => void;
}

function isKnownFormat(id: string): boolean {
  if (!id || id === 'primary') return true;
  if (id.endsWith('@group.calendar.google.com')) return true;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(id);
}

export default function GoogleCalendarSection({ initialCalendarId, tenantId, onDirtyChange }: GoogleCalendarSectionProps) {
  const [supabase] = useState(() => createClient());
  const [calendarId, setCalendarId] = useState(initialCalendarId ?? '');
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [showHelp, setShowHelp] = useState(false);
  const helpRef = useRef<HTMLDivElement>(null);
  const initialValueRef = useRef(initialCalendarId ?? '');

  const isDirty = calendarId.trim() !== initialValueRef.current;

  useEffect(() => {
    onDirtyChange?.(isDirty);
  }, [isDirty, onDirtyChange]);

  useEffect(() => {
    if (!showHelp) return;
    const handleClick = (e: MouseEvent) => {
      if (helpRef.current && !helpRef.current.contains(e.target as Node)) {
        setShowHelp(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [showHelp]);

  const trimmed = calendarId.trim();
  const isActive = trimmed.length > 0;
  const showFormatWarning = trimmed.length > 0 && !isKnownFormat(trimmed);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSaveStatus('idle');
    setCalendarId(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveStatus('idle');

    try {
      await updateGoogleCalendarId(supabase, tenantId, trimmed || null);
      initialValueRef.current = trimmed;
      setSaveStatus('success');
      setTimeout(() => setSaveStatus('idle'), 4000);
    } catch {
      setSaveStatus('error');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <S.Section as="form" onSubmit={handleSubmit}>
      <S.SectionHeader>
        <S.SectionTitle>Google Agenda</S.SectionTitle>
        <S.StatusBadge $active={isActive}>
          {isActive ? 'Agendamento ativo' : 'Agendamento desativado'}
        </S.StatusBadge>
      </S.SectionHeader>

      <S.ImpactNote>
        Sem este campo preenchido, a IA <strong>não realiza agendamentos</strong> — apenas conversa.
        Para ativar o agendamento, preencha o ID abaixo <strong>e</strong> cadastre ao menos um profissional ativo.
      </S.ImpactNote>

      <S.FormGroup>
        <S.LabelRow>
          <S.Label htmlFor="google_calendar_id">ID da agenda</S.Label>
          <S.HelpIconWrapper ref={helpRef}>
            <S.HelpIconButton
              type="button"
              onClick={() => setShowHelp((v) => !v)}
              aria-label="Como encontrar o ID da agenda"
              aria-expanded={showHelp}
            >
              <HelpCircle size={15} />
            </S.HelpIconButton>
            {showHelp && (
              <S.Popover role="tooltip">
                <S.PopoverTitle>Como encontrar o ID</S.PopoverTitle>
                <p>
                  Google Calendar → <strong>Configurações da agenda</strong> → <strong>Integrar agenda</strong> → <em>&ldquo;ID da agenda&rdquo;</em>.
                </p>
                <S.PopoverTitle style={{ marginTop: '0.5rem' }}>Formatos aceitos</S.PopoverTitle>
                <ul>
                  <li>E-mail da conta: <code>clinica@gmail.com</code></li>
                  <li>Agenda secundária: <code>abc123@group.calendar.google.com</code></li>
                  <li>Valor especial: <code>primary</code></li>
                </ul>
              </S.Popover>
            )}
          </S.HelpIconWrapper>
        </S.LabelRow>

        <S.Input
          id="google_calendar_id"
          type="text"
          placeholder="clinica@gmail.com  ou  abc123@group.calendar.google.com"
          value={calendarId}
          onChange={handleChange}
          disabled={isSaving}
          autoComplete="off"
          spellCheck={false}
        />

        {showFormatWarning && (
          <S.FormatWarning>
            <AlertTriangle size={13} />
            Formato incomum — clique em <HelpCircle size={11} style={{ display: 'inline', verticalAlign: 'middle', margin: '0 2px' }} /> para ver os formatos aceitos.
          </S.FormatWarning>
        )}
      </S.FormGroup>

      <S.Footer>
        {saveStatus === 'success' && (
          <S.SaveStatus $variant="success">
            <Check size={16} />
            ID salvo com sucesso
          </S.SaveStatus>
        )}
        {saveStatus === 'error' && (
          <S.SaveStatus $variant="error">
            <AlertTriangle size={16} />
            Erro ao salvar. Tente novamente.
          </S.SaveStatus>
        )}
        {saveStatus === 'idle' && isDirty && (
          <S.UnsavedBanner>
            <AlertCircle size={16} />
            Alterações não salvas
          </S.UnsavedBanner>
        )}

        <S.SaveButton type="submit" disabled={isSaving}>
          {isSaving ? <Loader size={16} className="spin" /> : <Save size={16} />}
          {isSaving ? 'Salvando...' : 'Salvar'}
        </S.SaveButton>
      </S.Footer>
    </S.Section>
  );
}
