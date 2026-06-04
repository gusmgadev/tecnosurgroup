'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, Loader2, AlertCircle } from 'lucide-react'
import { theme } from '@/lib/theme'

const schema = z.object({
  email:    z.string().email('Email inválido'),
  password: z.string().min(6, 'Mínimo 6 caracteres'),
})

type FormData = z.infer<typeof schema>

const inputStyle = (hasError: boolean) => ({
  width: '100%',
  padding: '10px 14px',
  fontSize: theme.fontSizes.base,
  border: `1px solid ${hasError ? theme.colors.error : theme.dashboard.border}`,
  borderRadius: theme.radii.sm,
  outline: 'none',
  boxSizing: 'border-box' as const,
  backgroundColor: theme.dashboard.inputBg,
  color: theme.dashboard.text,
  fontFamily: 'inherit',
})

export default function SignInPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError]               = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)
    setError(null)

    const result = await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false,
    })

    setIsSubmitting(false)

    if (!result || result.error) {
      setError('Credenciales incorrectas. Verificá email y contraseña.')
      return
    }

    router.push(theme.auth.redirectAfterLogin)
  }

  return (
    <div>
      <h1 style={{ fontSize: theme.fontSizes.xl, fontWeight: theme.fontWeights.bold, color: theme.dashboard.text, marginBottom: theme.spacing.xs }}>
        Iniciar sesión
      </h1>
      <p style={{ fontSize: theme.fontSizes.sm, color: theme.dashboard.textMuted, marginBottom: theme.spacing.xl }}>
        Acceso al panel de administración
      </p>

      <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: theme.spacing.md }}>
        <div>
          <label htmlFor="email" style={{ display: 'block', fontSize: theme.fontSizes.sm, fontWeight: theme.fontWeights.medium, color: theme.dashboard.text, marginBottom: theme.spacing.xs }}>
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="admin@tecnosurgroup.com.ar"
            autoComplete="email"
            {...register('email')}
            style={inputStyle(!!errors.email)}
          />
          {errors.email && (
            <p style={{ marginTop: theme.spacing.xs, fontSize: theme.fontSizes.sm, color: theme.colors.error }}>
              {errors.email.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="password" style={{ display: 'block', fontSize: theme.fontSizes.sm, fontWeight: theme.fontWeights.medium, color: theme.colors.text, marginBottom: theme.spacing.xs }}>
            Contraseña
          </label>
          <div style={{ position: 'relative' }}>
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="current-password"
              {...register('password')}
              style={{ ...inputStyle(!!errors.password), paddingRight: '44px' }}
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: theme.dashboard.textMuted, padding: 0, display: 'flex', alignItems: 'center' }}
              aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {errors.password && (
            <p style={{ marginTop: theme.spacing.xs, fontSize: theme.fontSizes.sm, color: theme.colors.error }}>
              {errors.password.message}
            </p>
          )}
        </div>

        {error && (
          <div style={{ display: 'flex', alignItems: 'center', gap: theme.spacing.sm, padding: '12px 14px', backgroundColor: `${theme.colors.error}18`, border: `1px solid ${theme.colors.error}`, borderRadius: theme.radii.sm, color: theme.colors.error, fontSize: theme.fontSizes.sm }}>
            <AlertCircle size={16} style={{ flexShrink: 0 }} />
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          style={{ width: '100%', padding: '12px', marginTop: theme.spacing.sm, backgroundColor: isSubmitting ? `${theme.colors.accent}99` : theme.colors.accent, color: '#000000', fontSize: theme.fontSizes.base, fontWeight: theme.fontWeights.bold, border: 'none', borderRadius: theme.radii.sm, cursor: isSubmitting ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: theme.spacing.sm, transition: theme.transitions.fast }}
        >
          {isSubmitting && <Loader2 size={16} className="animate-spin" />}
          {isSubmitting ? 'Ingresando...' : 'Entrar'}
        </button>
      </form>
    </div>
  )
}
