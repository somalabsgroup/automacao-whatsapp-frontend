'use client';

import { useState, useRef } from 'react';
import { AlertTriangle, AlertCircle, Save, Check, Loader, Info } from 'lucide-react';
import { TenantSettings } from '@/types';
import { createClient } from '@/lib/supabase/client';
import { updateTenantSettings } from '@/lib/services/tenantSettings';
import { useUnsavedWarning } from '@/hooks/useUnsavedWarning';
import GoogleCalendarSection from '@/components/GoogleCalendarSection';
import * as S from './styles';

interface ConfiguracoesContentProps {
  initialSettings: TenantSettings;
  initialCalendarId: string | null;
  tenantId: string;
}

const FOLLOWUP_FALLBACK =
  'Olá! Notamos que você entrou em contato conosco recentemente mas não chegou a agendar uma consulta. Podemos ajudá-lo a marcar um horário? 😊';

const CUSTOM_PROMPT_MAX = 2000;

type FormState = {
  custom_prompt: string;
  business_hours: string;
  followup_message: string;
  followup_days: string;
  ai_enabled: boolean;
};

export default function ConfiguracoesContent({ initialSettings, initialCalendarId, tenantId }: ConfiguracoesContentProps) {
  const [supabase] = useState(() => createClient());

  const [form, setForm] = useState<FormState>({
    custom_prompt: initialSettings.custom_prompt ?? '',
    business_hours: initialSettings.business_hours ?? '',
    followup_message: initialSettings.followup_message ?? '',
    followup_days: initialSettings.followup_days?.toString() ?? '',
    ai_enabled: initialSettings.ai_enabled ?? true,
  });

  const initialFormRef = useRef<FormState>({
    custom_prompt: initialSettings.custom_prompt ?? '',
    business_hours: initialSettings.business_hours ?? '',
    followup_message: initialSettings.followup_message ?? '',
    followup_days: initialSettings.followup_days?.toString() ?? '',
    ai_enabled: initialSettings.ai_enabled ?? true,
  });

  const [calendarIsDirty, setCalendarIsDirty] = useState(false);

  const isDirty =
    form.custom_prompt !== initialFormRef.current.custom_prompt ||
    form.business_hours !== initialFormRef.current.business_hours ||
    form.followup_message !== initialFormRef.current.followup_message ||
    form.followup_days !== initialFormRef.current.followup_days ||
    form.ai_enabled !== initialFormRef.current.ai_enabled;

  // Único ponto do guarda — cobre os dois formulários da página
  useUnsavedWarning(isDirty || calendarIsDirty);

  const [followupDaysError, setFollowupDaysError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const set =
    (field: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      if (field === 'followup_days') setFollowupDaysError(null);
      setSaveStatus('idle');
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const toggleAiEnabled = () => {
    setSaveStatus('idle');
    setForm((prev) => ({ ...prev, ai_enabled: !prev.ai_enabled }));
  };

  const validate = (): boolean => {
    if (form.followup_days.trim() !== '') {
      const n = Number(form.followup_days);
      if (!Number.isInteger(n) || n < 1) {
        setFollowupDaysError('Informe um número inteiro ≥ 1.');
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSaving(true);
    setSaveStatus('idle');

    try {
      const daysRaw = form.followup_days.trim();
      const patch: TenantSettings = {
        custom_prompt: form.custom_prompt,
        business_hours: form.business_hours,
        followup_message: form.followup_message,
        followup_days: daysRaw !== '' ? parseInt(daysRaw, 10) : undefined,
        ai_enabled: form.ai_enabled,
      };

      await updateTenantSettings(supabase, tenantId, patch);
      initialFormRef.current = { ...form };
      setSaveStatus('success');
      setTimeout(() => setSaveStatus('idle'), 4000);
    } catch {
      setSaveStatus('error');
    } finally {
      setIsSaving(false);
    }
  };

  const promptLen = form.custom_prompt.length;

  return (
    <S.ContentArea>
      <GoogleCalendarSection
        initialCalendarId={initialCalendarId}
        tenantId={tenantId}
        onDirtyChange={setCalendarIsDirty}
      />

      <S.Form onSubmit={handleSubmit}>

        <S.FormatNote>
          <Info size={14} />
          <span>
            Os campos de texto suportam formatação WhatsApp:{' '}
            <code>*negrito*</code>, <code>_itálico_</code>, <code>~riscado~</code>.
            {' '}Não use Markdown (<code>**</code>, <code>#</code>).
          </span>
        </S.FormatNote>

        <S.SectionsGrid>
          <S.Section>
            <S.SectionHeaderRow>
              <S.SectionTitlePlain>Comportamento da IA</S.SectionTitlePlain>
              <S.ToggleWrap>
                <S.ToggleText>{form.ai_enabled ? 'Ativada' : 'Desativada'}</S.ToggleText>
                <S.Switch
                  type="button"
                  role="switch"
                  aria-checked={form.ai_enabled}
                  aria-label="Ativar ou desativar respostas automáticas da IA"
                  $checked={form.ai_enabled}
                  onClick={toggleAiEnabled}
                  disabled={isSaving}
                />
              </S.ToggleWrap>
            </S.SectionHeaderRow>

            {!form.ai_enabled && (
              <S.ImpactNote>
                Com a IA desativada, o sistema <strong>não responde automaticamente</strong> às mensagens —
                as conversas seguem apenas via atendimento humano e a integração com o WhatsApp.
              </S.ImpactNote>
            )}

            <S.FormGroup style={{ flex: 1 }}>
              <S.LabelRow>
                <S.Label htmlFor="custom_prompt">Prompt personalizado</S.Label>
                <S.CharCounter $isNearLimit={promptLen > CUSTOM_PROMPT_MAX * 0.9}>
                  {promptLen} / {CUSTOM_PROMPT_MAX}
                </S.CharCounter>
              </S.LabelRow>
              <S.ImpactNote>
                Adicionado diretamente ao system prompt — afeta o comportamento da IA em todas as conversas.
              </S.ImpactNote>
              <S.TextArea
                id="custom_prompt"
                maxLength={CUSTOM_PROMPT_MAX}
                placeholder="Ex: Você é uma assistente da Clínica SomaClini. Seja sempre cordial e apresente as especialidades disponíveis quando o paciente demonstrar interesse em agendar."
                value={form.custom_prompt}
                onChange={set('custom_prompt')}
                disabled={isSaving}
                style={{ flex: 1, resize: 'none', minHeight: '120px' }}
              />
            </S.FormGroup>

            <S.FormGroup>
              <S.Label htmlFor="business_hours">Horário de atendimento</S.Label>
              <S.Input
                id="business_hours"
                type="text"
                placeholder="Ex: Seg a Sex, 8h às 18h; Sáb, 8h às 12h"
                value={form.business_hours}
                onChange={set('business_hours')}
                disabled={isSaving}
              />
            </S.FormGroup>
          </S.Section>

          <S.Section>
            <S.SectionTitle>Follow-up Automático</S.SectionTitle>

            <S.FormGroup>
              <S.InlineLabelRow>
                <S.Label htmlFor="followup_days">Dias até o follow-up automático</S.Label>
                <S.InputSmall
                  id="followup_days"
                  type="number"
                  min={1}
                  step={1}
                  placeholder="1"
                  value={form.followup_days}
                  onChange={set('followup_days')}
                  disabled={isSaving}
                  $hasError={!!followupDaysError}
                />
              </S.InlineLabelRow>
              {followupDaysError
                ? <S.ErrorMessage>{followupDaysError}</S.ErrorMessage>
                : <S.HelpText>Dias após o encerramento da conversa. Padrão: 1 dia.</S.HelpText>
              }
            </S.FormGroup>

            <S.FormGroup>
              <S.Label htmlFor="followup_message">Mensagem de follow-up</S.Label>
              <S.TextArea
                id="followup_message"
                rows={4}
                placeholder={FOLLOWUP_FALLBACK}
                value={form.followup_message}
                onChange={set('followup_message')}
                disabled={isSaving}
              />
              <S.HelpText>Se vazio, a mensagem padrão é usada (exibida como placeholder acima).</S.HelpText>
            </S.FormGroup>
          </S.Section>
        </S.SectionsGrid>

        <S.FormFooter>
          {saveStatus === 'success' && (
            <S.SaveStatus $variant="success">
              <Check size={16} />
              Configurações salvas com sucesso
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
            {isSaving ? 'Salvando...' : 'Salvar configurações'}
          </S.SaveButton>
        </S.FormFooter>

      </S.Form>
    </S.ContentArea>
  );
}
