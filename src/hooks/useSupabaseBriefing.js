import { useState, useCallback, useEffect } from 'react';
import {
  saveBriefing,
  updateBriefing,
  getBriefing,
  checkSupabaseConnection,
} from '../services/supabaseService';

/**
 * Hook para gerenciar persistência com Supabase
 * @param {Object} initialData - Dados iniciais do formulário
 * @returns {Object} Estado e funções de controle
 */
export const useSupabaseBriefing = (initialData) => {
  const [briefingId, setBriefingId] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState('idle'); // idle, saving, success, error
  const [saveError, setSaveError] = useState(null);
  const [isConnected, setIsConnected] = useState(true);
  const [autoSaveTimer, setAutoSaveTimer] = useState(null);

  // Verificar conexão ao iniciar
  useEffect(() => {
    const checkConnection = async () => {
      const connected = await checkSupabaseConnection();
      setIsConnected(connected);
    };

    checkConnection();
  }, []);

  /**
   * Salva briefing no Supabase
   */
  const handleSave = useCallback(
    async (formData) => {
      if (!isConnected) {
        setSaveStatus('error');
        setSaveError('Sem conexão com o banco de dados');
        console.warn('⚠️ Supabase não conectado');
        return { success: false };
      }

      setIsSaving(true);
      setSaveStatus('saving');
      setSaveError(null);

      try {
        let result;

        if (!briefingId) {
          // Novo briefing
          result = await saveBriefing(formData);
          if (result.success) {
            setBriefingId(result.data.id);
            setSaveStatus('success');
          }
        } else {
          // Atualizar existente
          result = await updateBriefing(briefingId, formData);
          if (result.success) {
            setSaveStatus('success');
          }
        }

        if (!result.success) {
          setSaveStatus('error');
          setSaveError(result.error);
        }

        return result;
      } catch (error) {
        setSaveStatus('error');
        setSaveError(error.message);
        return { success: false };
      } finally {
        setIsSaving(false);

        // Auto-reset status
        setTimeout(() => {
          if (saveStatus === 'success') {
            setSaveStatus('idle');
          }
        }, 3000);
      }
    },
    [briefingId, isConnected, saveStatus]
  );

  /**
   * Auto-save com debounce (2 segundos)
   */
  const handleAutoSave = useCallback(
    (formData) => {
      // Limpar timer anterior
      if (autoSaveTimer) {
        clearTimeout(autoSaveTimer);
      }

      // Novo timer
      const timer = setTimeout(() => {
        handleSave(formData);
      }, 2000); // 2 segundos de debounce

      setAutoSaveTimer(timer);
    },
    [autoSaveTimer, handleSave]
  );

  /**
   * Carrega briefing existente
   */
  const handleLoad = useCallback(
    async (id) => {
      setIsSaving(true);
      const result = await getBriefing(id);
      setIsSaving(false);

      if (result.success) {
        setBriefingId(id);
        return result.data;
      } else {
        setSaveError(result.error);
        return null;
      }
    },
    []
  );

  /**
   * Limpa estado (novo formulário)
   */
  const handleReset = useCallback(() => {
    setBriefingId(null);
    setSaveStatus('idle');
    setSaveError(null);
  }, []);

  return {
    briefingId,
    isSaving,
    saveStatus,
    saveError,
    isConnected,
    onSave: handleSave,
    onAutoSave: handleAutoSave,
    onLoad: handleLoad,
    onReset: handleReset,
  };
};
