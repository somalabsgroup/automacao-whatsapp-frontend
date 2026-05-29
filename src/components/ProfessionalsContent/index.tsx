'use client';

import { useState, useMemo } from 'react';
import styled from 'styled-components';
import { Professional, CreateProfessionalInput } from '@/types';
import { createClient } from '@/lib/supabase/client';
import {
  createProfessional,
  updateProfessional,
  activateProfessional,
  deactivateProfessional,
} from '@/lib/services/professionals';
import ProfessionalForm from '../ProfessionalForm';
import ProfessionalList from '../ProfessionalList';
import Header, { HeaderMetric } from '../Header';

const ContentArea = styled.div`
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  flex: 1;
  background-color: ${({ theme }) => theme.bg.secondary};
  transition: background-color 0.2s ease;
`;

interface ProfessionalsContentProps {
  initialProfessionals: Professional[];
  tenantId: string;
}

export default function ProfessionalsContent({
  initialProfessionals,
  tenantId,
}: ProfessionalsContentProps) {
  const [professionals, setProfessionals] = useState<Professional[]>(initialProfessionals);
  const [showForm, setShowForm] = useState(false);
  const [editingProfessional, setEditingProfessional] = useState<Professional | null>(null);
  const [showInactive, setShowInactive] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const supabase = createClient();

  const handleAdd = () => {
    setEditingProfessional(null);
    setShowForm(true);
  };

  const handleEdit = (professional: Professional) => {
    setEditingProfessional(professional);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingProfessional(null);
  };

  const handleSubmit = async (data: CreateProfessionalInput) => {
    setIsSubmitting(true);
    try {
      if (editingProfessional) {
        const updated = await updateProfessional(
          supabase,
          editingProfessional.id,
          tenantId,
          data
        );
        setProfessionals((prev) =>
          prev.map((p) => (p.id === updated.id ? updated : p))
        );
      } else {
        const newProfessional = await createProfessional(supabase, tenantId, data);
        setProfessionals((prev) => [newProfessional, ...prev]);
      }
      setShowForm(false);
      setEditingProfessional(null);
    } catch {
      alert('Erro ao salvar profissional. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleToggleActive = async (professional: Professional) => {
    try {
      if (professional.isActive) {
        await deactivateProfessional(supabase, professional.id, tenantId);
        setProfessionals((prev) =>
          prev.map((p) => (p.id === professional.id ? { ...p, isActive: false } : p))
        );
      } else {
        await activateProfessional(supabase, professional.id, tenantId);
        setProfessionals((prev) =>
          prev.map((p) => (p.id === professional.id ? { ...p, isActive: true } : p))
        );
      }
    } catch {
      alert('Erro ao alterar status do profissional. Tente novamente.');
    }
  };

  const metrics: HeaderMetric[] = useMemo(() => {
    const totalProfessionals = professionals.length;
    const activeProfessionals = professionals.filter((p) => p.isActive).length;

    return [
      {
        label: 'Total',
        value: totalProfessionals,
        variant: 'info' as const,
      },
      {
        label: 'Ativos',
        value: activeProfessionals,
        variant: 'success' as const,
      },
      {
        label: 'Inativos',
        value: totalProfessionals - activeProfessionals,
        variant: 'default' as const,
      },
    ];
  }, [professionals]);

  return (
    <>
      <Header
        title="Profissionais"
        subtitle="Gerencie os profissionais da clínica"
        metrics={metrics}
      />
      <ContentArea>
        {showForm ? (
          <ProfessionalForm
            professional={editingProfessional || undefined}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            isSubmitting={isSubmitting}
          />
        ) : (
          <ProfessionalList
            professionals={professionals}
            onAdd={handleAdd}
            onEdit={handleEdit}
            onToggleActive={handleToggleActive}
            showInactive={showInactive}
            onToggleShowInactive={() => setShowInactive(!showInactive)}
          />
        )}
      </ContentArea>
    </>
  );
}
