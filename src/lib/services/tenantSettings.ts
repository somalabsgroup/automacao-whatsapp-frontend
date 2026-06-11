import { SupabaseClient } from '@supabase/supabase-js';
import { TenantSettings } from '@/types';

// Only these keys are touched by this service.
// Any other key already in tenants.settings (e.g. evolution config) is always preserved.
const MANAGED_KEYS = ['custom_prompt', 'business_hours', 'followup_message', 'followup_days', 'ai_enabled'] as const;

export async function getTenantSettings(
  supabase: SupabaseClient,
  tenantId: string,
): Promise<TenantSettings> {
  const { data, error } = await supabase
    .from('tenants')
    .select('settings')
    .eq('id', tenantId)
    .single();

  if (error) throw error;

  const s = ((data?.settings ?? {}) as Record<string, unknown>);

  return {
    custom_prompt: typeof s.custom_prompt === 'string' ? s.custom_prompt : undefined,
    business_hours: typeof s.business_hours === 'string' ? s.business_hours : undefined,
    followup_message: typeof s.followup_message === 'string' ? s.followup_message : undefined,
    // DB may store the value as number or as numeric string (cast accepted by flow SQL)
    followup_days:
      typeof s.followup_days === 'number'
        ? s.followup_days
        : typeof s.followup_days === 'string'
        ? parseInt(s.followup_days, 10) || undefined
        : undefined,
    ai_enabled: typeof s.ai_enabled === 'boolean' ? s.ai_enabled : true,
  };
}

// Merges the managed keys into tenants.settings without touching any other key.
// Convention for empty values:
//   - string fields: empty/whitespace-only → key removed from JSONB (flow fallback takes over)
//   - followup_days: undefined or < 1 → key removed (flow falls back to 1 day)
//   - followup_days: valid integer ≥ 1 → stored as JSON integer (not string)
//   - ai_enabled: always stored as boolean; defaults to true unless explicitly false
export async function updateTenantSettings(
  supabase: SupabaseClient,
  tenantId: string,
  patch: TenantSettings,
): Promise<void> {
  // 1. Read current settings to preserve unmanaged keys (two-step merge in JS)
  const { data, error } = await supabase
    .from('tenants')
    .select('settings')
    .eq('id', tenantId)
    .single();

  if (error) throw error;

  const next: Record<string, unknown> = { ...((data?.settings ?? {}) as Record<string, unknown>) };

  // 2. Apply patch — iterate all managed keys so empty values also delete stale entries
  for (const key of MANAGED_KEYS) {
    if (key === 'followup_days') {
      const days = typeof patch.followup_days === 'number' && patch.followup_days >= 1
        ? patch.followup_days
        : undefined;
      if (days !== undefined) {
        next.followup_days = days; // JSON integer, compatible with (settings->>'followup_days')::int
      } else {
        delete next.followup_days;
      }
    } else if (key === 'ai_enabled') {
      next.ai_enabled = patch.ai_enabled !== false;
    } else {
      const val = typeof patch[key] === 'string' ? (patch[key] as string).trim() : '';
      if (val) {
        next[key] = val;
      } else {
        delete next[key];
      }
    }
  }

  // 3. Write merged settings back — Supabase JS serialises the object to JSONB
  const { error: updateError } = await supabase
    .from('tenants')
    .update({ settings: next })
    .eq('id', tenantId);

  if (updateError) throw updateError;
}

export async function getGoogleCalendarId(
  supabase: SupabaseClient,
  tenantId: string,
): Promise<string | null> {
  const { data, error } = await supabase
    .from('tenants')
    .select('google_calendar_id')
    .eq('id', tenantId)
    .single();

  if (error) throw error;
  const val = data?.google_calendar_id;
  return typeof val === 'string' && val.length > 0 ? val : null;
}

// Writes only google_calendar_id — does not touch settings or any other column.
// Convention: empty/whitespace → NULL (flow checks for truthy value).
export async function updateGoogleCalendarId(
  supabase: SupabaseClient,
  tenantId: string,
  calendarId: string | null,
): Promise<void> {
  const value = calendarId?.trim() || null;

  const { error } = await supabase
    .from('tenants')
    .update({ google_calendar_id: value })
    .eq('id', tenantId);

  if (error) throw error;
}
