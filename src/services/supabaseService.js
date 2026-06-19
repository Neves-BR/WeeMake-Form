import { createClient } from '@supabase/supabase-js';

// Inicializar cliente Supabase
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('⚠️ Variáveis de ambiente Supabase não configuradas');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Salva um novo briefing no Supabase
 * @param {Object} briefingData - Dados do formulário
 * @returns {Promise<Object>} Resultado da operação
 */
export const saveBriefing = async (briefingData) => {
  try {
    const { data, error } = await supabase
      .from('briefings')
      .insert([
        {
          company_name: briefingData.company_name,
          industry: briefingData.industry,
          company_description: briefingData.company_description,
          tone_type: briefingData.tone_type,
          brand_personality: briefingData.brand_personality,
          core_values: briefingData.core_values,
          brand_phrases: briefingData.brand_phrases,
          products_list: briefingData.products_list,
          main_product: briefingData.main_product,
          product_details: briefingData.product_details,
          show_prices: briefingData.show_prices,
          pricing_strategy: briefingData.pricing_strategy,
          price_ranges: briefingData.price_ranges,
          offers_installments: briefingData.offers_installments,
          target_audience: briefingData.target_audience,
          integrations: briefingData.integrations,
          seasonality: briefingData.seasonality,
          success_stories: briefingData.success_stories,
          competitors: briefingData.competitors,
          competitive_advantage: briefingData.competitive_advantage,
          forbidden_topics: briefingData.forbidden_topics,
          words_to_avoid: briefingData.words_to_avoid,
          offer_scheduling: briefingData.offer_scheduling,
          collect_leads: briefingData.collect_leads,
          escalate_human: briefingData.escalate_human,
          response_speed: briefingData.response_speed,
          scheduling_tool: briefingData.scheduling_tool,
          scheduling_link: briefingData.scheduling_link,
          available_hours: briefingData.available_hours,
          additional_info: briefingData.additional_info,
          contact_method: briefingData.contact_method,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ])
      .select();

    if (error) {
      console.error('❌ Erro ao salvar briefing:', error);
      return { success: false, error: error.message };
    }

    console.log('✅ Briefing salvo com sucesso:', data[0].id);
    return { success: true, data: data[0] };
  } catch (error) {
    console.error('❌ Erro ao salvar briefing:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Atualiza um briefing existente
 * @param {string} id - ID do briefing
 * @param {Object} briefingData - Dados atualizados
 * @returns {Promise<Object>} Resultado da operação
 */
export const updateBriefing = async (id, briefingData) => {
  try {
    const { data, error } = await supabase
      .from('briefings')
      .update({
        ...briefingData,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select();

    if (error) {
      console.error('❌ Erro ao atualizar briefing:', error);
      return { success: false, error: error.message };
    }

    console.log('✅ Briefing atualizado com sucesso');
    return { success: true, data: data[0] };
  } catch (error) {
    console.error('❌ Erro ao atualizar briefing:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Recupera um briefing pelo ID
 * @param {string} id - ID do briefing
 * @returns {Promise<Object>} Dados do briefing
 */
export const getBriefing = async (id) => {
  try {
    const { data, error } = await supabase
      .from('briefings')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('❌ Erro ao buscar briefing:', error);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (error) {
    console.error('❌ Erro ao buscar briefing:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Lista todos os briefings do usuário
 * @returns {Promise<Object>} Lista de briefings
 */
export const listBriefings = async () => {
  try {
    const { data, error } = await supabase
      .from('briefings')
      .select('id, company_name, industry, created_at, updated_at')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('❌ Erro ao listar briefings:', error);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (error) {
    console.error('❌ Erro ao listar briefings:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Deleta um briefing
 * @param {string} id - ID do briefing
 * @returns {Promise<Object>} Resultado da operação
 */
export const deleteBriefing = async (id) => {
  try {
    const { error } = await supabase
      .from('briefings')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('❌ Erro ao deletar briefing:', error);
      return { success: false, error: error.message };
    }

    console.log('✅ Briefing deletado com sucesso');
    return { success: true };
  } catch (error) {
    console.error('❌ Erro ao deletar briefing:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Salva com auto-save (debounce)
 * @param {string} id - ID do briefing (null se novo)
 * @param {Object} briefingData - Dados do formulário
 * @returns {Promise<Object>} Resultado da operação
 */
export const autoSaveBriefing = async (id, briefingData) => {
  try {
    if (!id) {
      // Se não tem ID, é um novo briefing
      return await saveBriefing(briefingData);
    } else {
      // Se tem ID, atualiza
      return await updateBriefing(id, briefingData);
    }
  } catch (error) {
    console.error('❌ Erro no auto-save:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Verifica conexão com Supabase
 * @returns {Promise<boolean>} Status da conexão
 */
export const checkSupabaseConnection = async () => {
  try {
    const { error } = await supabase
      .from('briefings')
      .select('count()', { count: 'exact' });

    if (error) {
      console.error('❌ Erro de conexão Supabase:', error);
      return false;
    }

    console.log('✅ Conexão Supabase OK');
    return true;
  } catch (error) {
    console.error('❌ Erro de conexão Supabase:', error);
    return false;
  }
};
