
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface ConfirmPurchaseRequest {
  user_id: string;
  levels: number[];
  tx_hash: string;
  total_amount: number;
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
    )

    if (req.method !== 'POST') {
      return new Response('Method not allowed', { 
        status: 405, 
        headers: corsHeaders 
      });
    }

    const { user_id, levels, tx_hash, total_amount }: ConfirmPurchaseRequest = await req.json();

    if (!user_id || !levels || !tx_hash || !total_amount) {
      return new Response('Missing required fields', { 
        status: 400, 
        headers: corsHeaders 
      });
    }

    console.log(`Confirming purchase for user ${user_id}, levels: ${levels.join(', ')}, tx: ${tx_hash}`);

    // Начинаем транзакцию
    const { error: updateError } = await supabaseClient
      .from('agent_levels')
      .update({ 
        is_unlocked: true, 
        unlocked_at: new Date().toISOString() 
      })
      .eq('user_id', user_id)
      .in('level_number', levels);

    if (updateError) {
      console.error('Error updating agent levels:', updateError);
      return new Response('Error updating levels', { 
        status: 500, 
        headers: corsHeaders 
      });
    }

    // Записываем транзакцию для каждого уровня
    const transactions = levels.map(level => ({
      user_id,
      transaction_type: 'purchase',
      amount: total_amount / levels.length, // Распределяем сумму равномерно
      level_number: level,
      tx_hash,
      description: `Разблокирован Уровень Агентов ${level}`,
      status: 'completed'
    }));

    const { error: transactionError } = await supabaseClient
      .from('transactions')
      .insert(transactions);

    if (transactionError) {
      console.error('Error inserting transactions:', transactionError);
      // Не возвращаем ошибку, так как уровни уже разблокированы
    }

    // Создаем уведомление
    const { error: notificationError } = await supabaseClient
      .from('notifications')
      .insert({
        user_id,
        title: 'Уровни разблокированы',
        message: `Успешно разблокированы уровни: ${levels.join(', ')}`,
        notification_type: 'purchase'
      });

    if (notificationError) {
      console.error('Error creating notification:', notificationError);
    }

    console.log(`Purchase confirmed successfully for levels: ${levels.join(', ')}`);

    return new Response(JSON.stringify({ success: true, unlocked_levels: levels }), {
      headers: { 
        ...corsHeaders, 
        'Content-Type': 'application/json' 
      },
    });

  } catch (error) {
    console.error('Error in confirm-purchase function:', error);
    return new Response('Internal server error', { 
      status: 500, 
      headers: corsHeaders 
    });
  }
});
