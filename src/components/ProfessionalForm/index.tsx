'use client';

import { useState } from 'react';
import { z } from 'zod';
import { AlertCircle, ArrowLeft, Loader2 } from 'lucide-react';
import { Professional, CreateProfessionalInput, WorkingHours } from '@/types';
import {
  FormContainer,
  FormHeader,
  BackButton,
  FormTitle,
  FormSubtitle,
  FormContent,
  Form,
  FormRow,
  FormGroup,
  Label,
  Required,
  Input,
  Select,
  SelectWithPreview,
  ColorPreview,
  TextArea,
  ErrorMessage,
  HelpText,
  CharCounter,
  StickyFooter,
  ButtonGroup,
  Button,
  WorkingHoursSection,
  WorkingHoursHeader,
  WorkingHoursTitle,
  QuickActionButton,
  WorkingHoursHelp,
  DayRow,
  DayCheckbox,
  DayLabelGroup,
  DayLabel,
  TimeInputGroup,
  TimeInput,
  TimeLabel,
} from './styles';

const professionalSchema = z.object({
  name: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres').max(100, 'Nome muito longo'),
  specialty: z.string().min(2, 'Especialidade deve ter pelo menos 2 caracteres').max(100, 'Especialidade muito longa'),
  defaultDuration: z.number().int().min(15, 'Duração mínima: 15 minutos').max(480, 'Duração máxima: 8 horas'),
  calendarColorId: z.string().optional(),
  notes: z.string().max(500, 'Notas muito longas (máx. 500 caracteres)').optional(),
  workingHours: z.object({
    monday: z.object({ start: z.string(), end: z.string(), enabled: z.boolean() }).optional(),
    tuesday: z.object({ start: z.string(), end: z.string(), enabled: z.boolean() }).optional(),
    wednesday: z.object({ start: z.string(), end: z.string(), enabled: z.boolean() }).optional(),
    thursday: z.object({ start: z.string(), end: z.string(), enabled: z.boolean() }).optional(),
    friday: z.object({ start: z.string(), end: z.string(), enabled: z.boolean() }).optional(),
    saturday: z.object({ start: z.string(), end: z.string(), enabled: z.boolean() }).optional(),
    sunday: z.object({ start: z.string(), end: z.string(), enabled: z.boolean() }).optional(),
  }).optional(),
});

type ProfessionalFormData = z.infer<typeof professionalSchema>;

interface ProfessionalFormProps {
  professional?: Professional;
  onSubmit: (data: CreateProfessionalInput) => Promise<void>;
  onCancel: () => void;
  isSubmitting?: boolean;
}

const CALENDAR_COLORS = [
  { id: '1', name: 'Azul Claro', color: '#7986CB' },
  { id: '2', name: 'Verde', color: '#33B679' },
  { id: '3', name: 'Roxo', color: '#8E24AA' },
  { id: '4', name: 'Rosa', color: '#EC4899' },
  { id: '5', name: 'Amarelo', color: '#F6BF26' },
  { id: '6', name: 'Laranja', color: '#F4511E' },
  { id: '7', name: 'Azul', color: '#039BE5' },
  { id: '8', name: 'Cinza', color: '#616161' },
  { id: '9', name: 'Azul Escuro', color: '#3F51B5' },
  { id: '10', name: 'Verde Escuro', color: '#0B8043' },
  { id: '11', name: 'Vermelho', color: '#D50000' },
];

const DAYS = [
  { key: 'monday' as const, label: 'Segunda-feira' },
  { key: 'tuesday' as const, label: 'Terça-feira' },
  { key: 'wednesday' as const, label: 'Quarta-feira' },
  { key: 'thursday' as const, label: 'Quinta-feira' },
  { key: 'friday' as const, label: 'Sexta-feira' },
  { key: 'saturday' as const, label: 'Sábado' },
  { key: 'sunday' as const, label: 'Domingo' },
];

export default function ProfessionalForm({
  professional,
  onSubmit,
  onCancel,
  isSubmitting = false,
}: ProfessionalFormProps) {
  const [formData, setFormData] = useState<ProfessionalFormData>({
    name: professional?.name || '',
    specialty: professional?.specialty || '',
    defaultDuration: professional?.defaultDuration || 30,
    calendarColorId: professional?.calendarColorId || '7',
    notes: professional?.notes || '',
    workingHours: professional?.workingHours || {
      monday: { start: '08:00', end: '18:00', enabled: true },
      tuesday: { start: '08:00', end: '18:00', enabled: true },
      wednesday: { start: '08:00', end: '18:00', enabled: true },
      thursday: { start: '08:00', end: '18:00', enabled: true },
      friday: { start: '08:00', end: '18:00', enabled: true },
      saturday: { start: '08:00', end: '12:00', enabled: false },
      sunday: { start: '08:00', end: '12:00', enabled: false },
    },
  });

  const [errors, setErrors] = useState<Partial<Record<keyof ProfessionalFormData, string>>>({});

  const handleChange = (field: keyof ProfessionalFormData, value: unknown) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleWorkingHoursChange = (
    day: keyof WorkingHours,
    field: 'start' | 'end' | 'enabled',
    value: string | boolean
  ) => {
    setFormData((prev) => ({
      ...prev,
      workingHours: {
        ...prev.workingHours,
        [day]: {
          ...(prev.workingHours?.[day] || { start: '08:00', end: '18:00', enabled: false }),
          [field]: value,
        },
      },
    }));
  };

  const applyWeekdayHours = () => {
    const weekdays: Array<keyof WorkingHours> = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];
    const updatedHours: Partial<WorkingHours> = {};
    
    weekdays.forEach(day => {
      updatedHours[day] = { start: '08:00', end: '18:00', enabled: true };
    });

    setFormData((prev) => ({
      ...prev,
      workingHours: {
        ...prev.workingHours,
        ...updatedHours,
        saturday: { start: '08:00', end: '12:00', enabled: false },
        sunday: { start: '08:00', end: '12:00', enabled: false },
      },
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    try {
      const validatedData = professionalSchema.parse(formData);
      await onSubmit(validatedData);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Partial<Record<keyof ProfessionalFormData, string>> = {};
        error.issues.forEach((issue) => {
          const field = issue.path[0] as keyof ProfessionalFormData;
          if (field) {
            fieldErrors[field] = issue.message;
          }
        });
        setErrors(fieldErrors);
      }
    }
  };

  return (
    <FormContainer>
      <FormHeader>
        <BackButton onClick={onCancel} type="button">
          <ArrowLeft size={18} />
          Voltar
        </BackButton>
        <FormTitle>{professional ? 'Editar Profissional' : 'Novo Profissional'}</FormTitle>
        <FormSubtitle>
          Campos com <span>*</span> são obrigatórios
        </FormSubtitle>
      </FormHeader>

      <FormContent>
        <Form onSubmit={handleSubmit}>
          <FormRow>
          <FormGroup>
            <Label>
              Nome Completo <Required>*</Required>
            </Label>
            <Input
              type="text"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              placeholder="Ex: Dr. João Silva"
              $hasError={!!errors.name}
              disabled={isSubmitting}
            />
            {errors.name && (
              <ErrorMessage>
                <AlertCircle size={14} />
                {errors.name}
              </ErrorMessage>
            )}
          </FormGroup>

          <FormGroup>
            <Label>
              Especialidade <Required>*</Required>
            </Label>
            <Input
              type="text"
              value={formData.specialty}
              onChange={(e) => handleChange('specialty', e.target.value)}
              placeholder="Ex: Cardiologia"
              $hasError={!!errors.specialty}
              disabled={isSubmitting}
            />
            {errors.specialty && (
              <ErrorMessage>
                <AlertCircle size={14} />
                {errors.specialty}
              </ErrorMessage>
            )}
          </FormGroup>
        </FormRow>

        <FormRow>
          <FormGroup>
            <Label>
              Duração Padrão da Consulta (minutos) <Required>*</Required>
            </Label>
            <Select
              value={formData.defaultDuration}
              onChange={(e) => handleChange('defaultDuration', parseInt(e.target.value))}
              $hasError={!!errors.defaultDuration}
              disabled={isSubmitting}
            >
              <option value={15}>15 minutos</option>
              <option value={20}>20 minutos</option>
              <option value={30}>30 minutos</option>
              <option value={45}>45 minutos</option>
              <option value={60}>1 hora</option>
              <option value={90}>1h 30min</option>
              <option value={120}>2 horas</option>
            </Select>
            {errors.defaultDuration && (
              <ErrorMessage>
                <AlertCircle size={14} />
                {errors.defaultDuration}
              </ErrorMessage>
            )}
          </FormGroup>

          <FormGroup>
            <Label>Cor do Calendário</Label>
            <SelectWithPreview>
              <ColorPreview 
                $color={CALENDAR_COLORS.find(c => c.id === formData.calendarColorId)?.color || '#039BE5'} 
              />
              <Select
                value={formData.calendarColorId}
                onChange={(e) => handleChange('calendarColorId', e.target.value)}
                disabled={isSubmitting}
              >
                {CALENDAR_COLORS.map((color) => (
                  <option key={color.id} value={color.id}>
                    {color.name}
                  </option>
                ))}
              </Select>
            </SelectWithPreview>
            <HelpText>Cor para identificar no calendário de agendamentos</HelpText>
          </FormGroup>
        </FormRow>

        <FormGroup>
          <WorkingHoursHeader>
            <div>
              <WorkingHoursTitle>Horários de Trabalho</WorkingHoursTitle>
              <WorkingHoursHelp>Defina os dias e horários de atendimento</WorkingHoursHelp>
            </div>
            <QuickActionButton type="button" onClick={applyWeekdayHours} disabled={isSubmitting}>
              Aplicar Seg-Sex 8h-18h
            </QuickActionButton>
          </WorkingHoursHeader>
          <WorkingHoursSection>
            {DAYS.map((day) => {
              const dayData = formData.workingHours?.[day.key] || {
                start: '08:00',
                end: '18:00',
                enabled: false,
              };

              return (
                <DayRow key={day.key} $enabled={dayData.enabled}>
                  <DayLabelGroup>
                    <DayCheckbox
                      type="checkbox"
                      id={`day-${day.key}`}
                      checked={dayData.enabled}
                      onChange={(e) => handleWorkingHoursChange(day.key, 'enabled', e.target.checked)}
                      disabled={isSubmitting}
                    />
                    <DayLabel htmlFor={`day-${day.key}`}>{day.label}</DayLabel>
                  </DayLabelGroup>
                  <TimeInputGroup>
                    <TimeInput
                      type="time"
                      value={dayData.start}
                      onChange={(e) => handleWorkingHoursChange(day.key, 'start', e.target.value)}
                      disabled={!dayData.enabled || isSubmitting}
                    />
                    <TimeLabel>até</TimeLabel>
                    <TimeInput
                      type="time"
                      value={dayData.end}
                      onChange={(e) => handleWorkingHoursChange(day.key, 'end', e.target.value)}
                      disabled={!dayData.enabled || isSubmitting}
                    />
                  </TimeInputGroup>
                </DayRow>
              );
            })}
          </WorkingHoursSection>
        </FormGroup>

        <FormGroup>
          <Label>Observações</Label>
          <TextArea
            value={formData.notes}
            onChange={(e) => handleChange('notes', e.target.value)}
            placeholder="Informações adicionais sobre o profissional..."
            $hasError={!!errors.notes}
            disabled={isSubmitting}
          />
          {errors.notes && (
            <ErrorMessage>
              <AlertCircle size={14} />
              {errors.notes}
            </ErrorMessage>
          )}
          <HelpText style={{ display: 'flex', alignItems: 'center' }}>
            Informações adicionais (opcional)
            <CharCounter $isNearLimit={(formData.notes?.length || 0) > 400}>
              {formData.notes?.length || 0}/500
            </CharCounter>
          </HelpText>
        </FormGroup>
        </Form>
      </FormContent>

      <StickyFooter>
        <ButtonGroup>
          <Button type="button" $variant="secondary" onClick={onCancel} disabled={isSubmitting}>
            Cancelar
          </Button>
          <Button type="submit" $variant="primary" disabled={isSubmitting} onClick={handleSubmit}>
            {isSubmitting && <Loader2 size={16} className="animate-spin" />}
            {isSubmitting ? 'Salvando...' : professional ? 'Atualizar Profissional' : 'Cadastrar Profissional'}
          </Button>
        </ButtonGroup>
      </StickyFooter>
    </FormContainer>
  );
}
