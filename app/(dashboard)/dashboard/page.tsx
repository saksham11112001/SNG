// app/(dashboard)/dashboard/page.tsx
// Pure server component — only fetches data, zero interactivity here
import { redirect }           from 'next/navigation'
import { createSupabaseServerClient } from '@/lib/supabase/server'
import { DashboardNav }       from '@/components/dashboard/DashboardNav'
import { DashboardContent }   from '@/components/dashboard/DashboardContent'

export const dynamic = 'force-dynamic'

export default async function DashboardPage() {
  const supabase = await createSupabaseServerClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('user_profiles')
    .select('full_name, avatar_url')
    .eq('id', user.id)
    .single()

  const { data: subs } = await supabase
    .from('product_subscriptions')
    .select('product, plan, status, expires_at')
    .eq('user_id', user.id)

  const getSub = (p: string) => subs?.find((s) => s.product === p) ?? null

  return (
    <div style={{ minHeight: '100vh', background: '#0D0E1A' }}>
      <DashboardNav
        fullName={profile?.full_name ?? null}
        email={user.email ?? null}
        avatarUrl={profile?.avatar_url ?? null}
      />
      <DashboardContent
        firstName={profile?.full_name?.split(' ')[0] ?? 'there'}
        email={user.email ?? ''}
        fullName={profile?.full_name ?? null}
        avatarUrl={profile?.avatar_url ?? null}
        createdAt={user.created_at}
        planoraSub={getSub('planora')}
        flowOsSub={getSub('flowos')}
        planoraUrl={process.env.NEXT_PUBLIC_PLANORA_URL ?? 'https://tasks.sngadvisors.com'}
        flowOsUrl={process.env.NEXT_PUBLIC_FLOWOS_URL ?? 'https://fms.sngadvisors.com'}
      />
    </div>
  )
}
