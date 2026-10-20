import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const DEFAULT_SUPABASE_URL = 'https://mkcczxjrjfnkpejencnw.supabase.co';
const DEFAULT_SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1rY2N6eGpyamZua3BlamVuY253Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTI0OTAxNDYsImV4cCI6MjEwODA2NjE0Nn0._BbzQSrL6vhzTe2KjHDY37RqdhSOn7bXlS_8VU9uOg8';

const supabaseUrl = (import.meta.env.VITE_SUPABASE_URL || DEFAULT_SUPABASE_URL).trim();
const supabaseAnonKey = (import.meta.env.VITE_SUPABASE_ANON_KEY || DEFAULT_SUPABASE_ANON_KEY).trim();

export const isSupabaseReady = (): boolean => {
  return (
    supabaseUrl.startsWith('https://') &&
    supabaseAnonKey.length > 20 &&
    !supabaseUrl.includes('YOUR_PROJECT')
  );
};

export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});

export const SUPABASE_MEDIA_BUCKET = 'fkf-media';

/**
 * Uploads an image file to the Supabase Storage bucket `fkf-media` and returns its public CDN URL.
 */
export async function uploadImageToSupabase(file: File, folder = 'general'): Promise<string> {
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
  const { error } = await supabase.from(tableName).delete().eq('id', String(id));
  if (error) {
    console.error(`[Supabase] Delete error on ${tableName}/${id}:`, error.message);
  }
}
