'use client';

import { useState } from 'react';
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
    } catch (error) {
      console.error('Erro ao salvar profissional:', error);
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
    } catch (error) {
      console.error('Erro ao alterar status:', error);
      alert('Erro ao alterar status do profissional. Tente novamente.');
    }
  };

  return (
    <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
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
    </div>
  );
}
