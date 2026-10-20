import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = (import.meta.env.VITE_SUPABASE_URL || '').trim();
const supabaseAnonKey = (import.meta.env.VITE_SUPABASE_ANON_KEY || '').trim();

export const isSupabaseReady = (): boolean => {
  return (
    supabaseUrl.startsWith('https://') &&
    supabaseAnonKey.length > 20 &&
    !supabaseUrl.includes('YOUR_PROJECT')
  );
};

export const supabase: SupabaseClient | null = isSupabaseReady()
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
    })
  : null;

export const SUPABASE_MEDIA_BUCKET = 'fkf-media';

/**
 * Uploads an image file to the Supabase Storage bucket `fkf-media` and returns its public CDN URL.
 */
export async function uploadImageToSupabase(file: File, folder = 'general'): Promise<string> {
  if (!supabase) {
    throw new Error('Supabase client is not configured');
  }

  const fileExt = file.name.split('.').pop()?.toLowerCase() || 'jpg';
  const filePath = `${folder}/${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${fileExt}`;

  const { error: uploadError } = await supabase.storage
    .from(SUPABASE_MEDIA_BUCKET)
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: true,
      contentType: file.type || 'image/jpeg',
    });

  if (uploadError) {
    throw uploadError;
  }

  const { data } = supabase.storage.from(SUPABASE_MEDIA_BUCKET).getPublicUrl(filePath);
  return data.publicUrl;
}

/**
 * Helper to fetch all rows from a JSONB-backed Supabase table.
 */
export async function fetchSupabaseCollection<T>(tableName: string): Promise<T[] | null> {
  if (!supabase) return null;
  const { data, error } = await supabase.from(tableName).select('id, data');
  if (error || !data) {
    console.warn(`[Supabase] Error fetching ${tableName}:`, error?.message);
    return null;
  }
  return data.map((row: { id: string; data: any }) => ({
    ...row.data,
    id: row.data?.id ?? row.id,
  })) as T[];
}

/**
 * Helper to fetch a single row by ID from a JSONB-backed Supabase table.
 */
export async function fetchSupabaseDoc<T>(tableName: string, id: string): Promise<T | null> {
  if (!supabase) return null;
  const { data, error } = await supabase
    .from(tableName)
    .select('id, data')
    .eq('id', id)
    .maybeSingle();
  if (error || !data) {
    return null;
  }
  return data.data as T;
}

/**
 * Helper to upsert a document into a JSONB-backed Supabase table.
 */
export async function upsertSupabaseDoc(tableName: string, id: string, payload: any): Promise<void> {
  if (!supabase) return;
  const { error } = await supabase.from(tableName).upsert(
    {
      id: String(id),
      data: payload,
      updated_at: new Date().toISOString(),
    },
    { onConflict: 'id' }
  );
  if (error) {
    console.error(`[Supabase] Upsert error on ${tableName}/${id}:`, error.message);
  }
}

/**
 * Helper to delete a document from a JSONB-backed Supabase table.
 */
export async function deleteSupabaseDoc(tableName: string, id: string): Promise<void> {
  if (!supabase) return;
  const { error } = await supabase.from(tableName).delete().eq('id', String(id));
  if (error) {
    console.error(`[Supabase] Delete error on ${tableName}/${id}:`, error.message);
  }
}
