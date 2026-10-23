import { Skeleton } from '@/shared'
import { useMember } from '@/features/dashboard/hooks/useMember'
import { SettingsSection } from '@/features/settings/components/SettingsSection'
import { ProfileForm } from '@/features/settings/components/ProfileForm'
import { PasswordForm } from '@/features/settings/components/PasswordForm'
import { AppearanceSection } from '@/features/settings/components/AppearanceSection'
import { AccountSection } from '@/features/settings/components/AccountSection'

export function SettingsPage() {
  const { data: member, isPending, isError } = useMember()

  return (
    <div className="flex w-full flex-col gap-6">
      {isPending && <Skeleton variant="title" />}
      {isError && <p className="text-red-600 dark:text-red-400">Impossible de charger votre profil.</p>}

      {member && (
        <SettingsSection
          id="settings-profile"
          title="Profil"
          description="Le nom affiché dans votre espace et sur les avis."
        >
          <ProfileForm key={member.name} defaultName={member.name} />
        </SettingsSection>
      )}

      <SettingsSection
        id="settings-security"
        title="Sécurité"
        description="Changez votre mot de passe. Il doit contenir au moins 8 caractères."
      >
        <PasswordForm />
      </SettingsSection>

      <SettingsSection
        id="settings-appearance"
        title="Apparence"
        description="Choisissez le thème clair ou sombre de l'interface."
      >
        <AppearanceSection />
      </SettingsSection>

      {member && (
        <SettingsSection
          id="settings-account"
          title="Compte"
          description="Informations de votre compte et déconnexion."
        >
          <AccountSection email={member.email} />
        </SettingsSection>
      )}
    </div>
  )
}
