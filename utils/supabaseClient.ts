

import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '../utils/types/database.types'

const supabaseClient = createBrowserSupabaseClient<Database>()

export default supabaseClient
