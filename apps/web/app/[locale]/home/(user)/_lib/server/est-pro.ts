import { getSupabaseServerClient } from '@kit/supabase/server-client';

// Renvoie true si le compte a un abonnement Pro actif.
// On s'appuie sur la fonction Makerkit `has_active_subscription` (active = true).
export async function estPro(accountId: string) {
  const client = getSupabaseServerClient();

  const { data } = await client.rpc('has_active_subscription', {
    target_account_id: accountId,
  });

  return data === true;
}
