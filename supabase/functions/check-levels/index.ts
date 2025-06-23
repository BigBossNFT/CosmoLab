
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface LevelPurchaseRequest {
  target_level: number;
  user_id: string;
}

interface LevelPurchaseResponse {
  levels_to_purchase: number[];
  total_cost: number;
  already_unlocked: number[];
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

    const { target_level, user_id }: LevelPurchaseRequest = await req.json();

    if (!target_level || !user_id || target_level < 1 || target_level > 10) {
      return new Response('Invalid target level or user ID', { 
        status: 400, 
        headers: corsHeaders 
      });
    }

    console.log(`Checking levels for user ${user_id}, target level: ${target_level}`);

    // Получаем текущие уровни пользователя
    const { data: agentLevels, error } = await supabaseClient
      .from('agent_levels')
      .select('level_number, is_unlocked, unlock_price')
      .eq('user_id', user_id)
      .order('level_number');

    if (error) {
      console.error('Error fetching agent levels:', error);
      return new Response('Error fetching user levels', { 
        status: 500, 
        headers: corsHeaders 
      });
    }

    if (!agentLevels || agentLevels.length === 0) {
      return new Response('No levels found for user', { 
        status: 404, 
        headers: corsHeaders 
      });
    }

    const already_unlocked: number[] = [];
    const levels_to_purchase: number[] = [];
    let total_cost = 0;

    // Проверяем каждый уровень от 1 до target_level
    for (let i = 1; i <= target_level; i++) {
      const level = agentLevels.find(l => l.level_number === i);
      
      if (!level) {
        console.error(`Level ${i} not found for user`);
        continue;
      }

      if (level.is_unlocked) {
        already_unlocked.push(i);
      } else {
        levels_to_purchase.push(i);
        total_cost += parseFloat(level.unlock_price.toString());
      }
    }

    const response: LevelPurchaseResponse = {
      levels_to_purchase,
      total_cost,
      already_unlocked
    };

    console.log('Purchase check result:', response);

    return new Response(JSON.stringify(response), {
      headers: { 
        ...corsHeaders, 
        'Content-Type': 'application/json' 
      },
    });

  } catch (error) {
    console.error('Error in check-levels function:', error);
    return new Response('Internal server error', { 
      status: 500, 
      headers: corsHeaders 
    });
  }
});
