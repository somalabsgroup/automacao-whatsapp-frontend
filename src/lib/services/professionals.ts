import { SupabaseClient } from '@supabase/supabase-js';
import { Professional, CreateProfessionalInput, UpdateProfessionalInput, WorkingHours } from '@/types';

type DBWorkingHours = Record<string, Array<{ start: string; end: string }>>;

// Converte formato do banco (array) para nosso formato (enabled)
function convertWorkingHoursFromDB(dbHours: unknown): WorkingHours {
  if (!dbHours || typeof dbHours !== 'object') return {};
  
  const result: WorkingHours = {};
  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'] as const;
  const hoursObj = dbHours as DBWorkingHours;
  
  for (const day of days) {
    const dayData = hoursObj[day];
    if (Array.isArray(dayData) && dayData.length > 0 && dayData[0]) {
      result[day] = {
        start: dayData[0].start || '08:00',
        end: dayData[0].end || '18:00',
        enabled: true,
      };
    } else {
      result[day] = {
        start: '08:00',
        end: '18:00',
        enabled: false,
      };
    }
  }
  
  return result;
}

// Converte nosso formato (enabled) para formato do banco (array)
function convertWorkingHoursToDB(hours: WorkingHours | undefined): DBWorkingHours {
  if (!hours) return {};
  
  const result: DBWorkingHours = {};
  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'] as const;
  
  for (const day of days) {
    const dayData = hours[day];
    if (dayData?.enabled) {
      result[day] = [{
        start: dayData.start,
        end: dayData.end,
      }];
    } else {
      result[day] = [];
    }
  }
  
  return result;
}

/**
 * Busca todos os profissionais de um tenant
 */
export async function getProfessionals(
  supabase: SupabaseClient,
  tenantId: string,
  activeOnly: boolean = false
): Promise<Professional[]> {
  let query = supabase
    .from('professionals')
    .select('*')
    .eq('tenant_id', tenantId)
    .order('name', { ascending: true });

  if (activeOnly) {
    query = query.eq('is_active', true);
  }

  const { data, error } = await query;

  if (error) throw error;
  if (!data) return [];

  return data.map((prof) => ({
    id: prof.id,
    tenantId: prof.tenant_id,
    name: prof.name,
    specialty: prof.specialty,
    defaultDuration: prof.default_duration,
    calendarColorId: prof.calendar_color_id,
    workingHours: convertWorkingHoursFromDB(prof.working_hours),
    isActive: prof.is_active,
    notes: prof.notes,
    createdAt: new Date(prof.created_at),
    updatedAt: new Date(prof.updated_at),
  }));
}

/**
 * Busca um profissional específico
 */
export async function getProfessionalById(
  supabase: SupabaseClient,
  professionalId: string,
  tenantId: string
): Promise<Professional | null> {
  const { data, error } = await supabase
    .from('professionals')
    .select('*')
    .eq('id', professionalId)
    .eq('tenant_id', tenantId)
    .single();

  if (error || !data) return null;

  return {
    id: data.id,
    tenantId: data.tenant_id,
    name: data.name,
    specialty: data.specialty,
    defaultDuration: data.default_duration,
    calendarColorId: data.calendar_color_id,
    workingHours: convertWorkingHoursFromDB(data.working_hours),
    isActive: data.is_active,
    notes: data.notes,
    createdAt: new Date(data.created_at),
    updatedAt: new Date(data.updated_at),
  };
}

/**
 * Cria um novo profissional
 */
export async function createProfessional(
  supabase: SupabaseClient,
  tenantId: string,
  input: CreateProfessionalInput
): Promise<Professional> {
  const { data, error } = await supabase
    .from('professionals')
    .insert({
      tenant_id: tenantId,
      name: input.name,
      specialty: input.specialty,
      default_duration: input.defaultDuration,
      calendar_color_id: input.calendarColorId || '7',
      working_hours: convertWorkingHoursToDB(input.workingHours),
      notes: input.notes,
    })
    .select()
    .single();

  if (error) throw error;

  return {
    id: data.id,
    tenantId: data.tenant_id,
    name: data.name,
    specialty: data.specialty,
    defaultDuration: data.default_duration,
    calendarColorId: data.calendar_color_id,
    workingHours: convertWorkingHoursFromDB(data.working_hours),
    isActive: data.is_active,
    notes: data.notes,
    createdAt: new Date(data.created_at),
    updatedAt: new Date(data.updated_at),
  };
}

/**
 * Atualiza um profissional existente
 */
export async function updateProfessional(
  supabase: SupabaseClient,
  professionalId: string,
  tenantId: string,
  input: UpdateProfessionalInput
): Promise<Professional> {
  const updateData: Record<string, unknown> = {};

  if (input.name !== undefined) updateData.name = input.name;
  if (input.specialty !== undefined) updateData.specialty = input.specialty;
  if (input.defaultDuration !== undefined) updateData.default_duration = input.defaultDuration;
  if (input.calendarColorId !== undefined) updateData.calendar_color_id = input.calendarColorId;
  if (input.workingHours !== undefined) updateData.working_hours = convertWorkingHoursToDB(input.workingHours);
  if (input.notes !== undefined) updateData.notes = input.notes;
  if (input.isActive !== undefined) updateData.is_active = input.isActive;

  const { data, error } = await supabase
    .from('professionals')
    .update(updateData)
    .eq('id', professionalId)
    .eq('tenant_id', tenantId)
    .select()
    .single();

  if (error) throw error;

  return {
    id: data.id,
    tenantId: data.tenant_id,
    name: data.name,
    specialty: data.specialty,
    defaultDuration: data.default_duration,
    calendarColorId: data.calendar_color_id,
    workingHours: convertWorkingHoursFromDB(data.working_hours),
    isActive: data.is_active,
    notes: data.notes,
    createdAt: new Date(data.created_at),
    updatedAt: new Date(data.updated_at),
  };
}

/**
 * Desativa um profissional (soft delete)
 */
export async function deactivateProfessional(
  supabase: SupabaseClient,
  professionalId: string,
  tenantId: string
): Promise<void> {
  const { error } = await supabase
    .from('professionals')
    .update({ is_active: false })
    .eq('id', professionalId)
    .eq('tenant_id', tenantId);

  if (error) throw error;
}

/**
 * Reativa um profissional
 */
export async function activateProfessional(
  supabase: SupabaseClient,
  professionalId: string,
  tenantId: string
): Promise<void> {
  const { error } = await supabase
    .from('professionals')
    .update({ is_active: true })
    .eq('id', professionalId)
    .eq('tenant_id', tenantId);

  if (error) throw error;
}

/**
 * Deleta permanentemente um profissional
 */
export async function deleteProfessional(
  supabase: SupabaseClient,
  professionalId: string,
  tenantId: string
): Promise<void> {
  const { error } = await supabase
    .from('professionals')
    .delete()
    .eq('id', professionalId)
    .eq('tenant_id', tenantId);

  if (error) throw error;
}
