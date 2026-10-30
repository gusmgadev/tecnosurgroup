'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Plus, Pencil, Trash2, X, Loader2, AlertCircle, Save, Upload, Star } from 'lucide-react'
import { theme } from '@/lib/theme'
import { TRABAJO_CATEGORIAS, CATEGORIA_LABELS, type Trabajo, type TrabajoCategoria } from '@/types/trabajo'

const trabajoSchema = z.object({
  titulo:             z.string().min(2, 'Mínimo 2 caracteres'),
  descripcion:        z.string().optional(),
  categoria:          z.enum(TRABAJO_CATEGORIAS),
  imagenes:           z.array(z.string()).max(12, 'Máximo 12 fotos'),
  activo:             z.boolean(),
  mostrar_en_landing: z.boolean(),
})
type TrabajoForm = z.infer<typeof trabajoSchema>

const inputStyle = {
  width: '100%', padding: '10px 14px', fontSize: theme.fontSizes.base,
  border: `1px solid ${theme.dashboard.border}`, borderRadius: theme.radii.sm,
  outline: 'none', boxSizing: 'border-box' as const, fontFamily: 'inherit',
  backgroundColor: theme.dashboard.inputBg, color: theme.dashboard.text,
}
const labelStyle = {
  display: 'block', fontSize: theme.fontSizes.sm,
  fontWeight: theme.fontWeights.medium, color: theme.dashboard.text, marginBottom: '6px',
}
const thStyle: React.CSSProperties = {
  textAlign: 'left', padding: '12px 16px', fontSize: theme.fontSizes.xs,
  fontWeight: theme.fontWeights.medium, color: theme.dashboard.textMuted,
  textTransform: 'uppercase', letterSpacing: '0.05em',
  borderBottom: `1px solid ${theme.dashboard.border}`,
  backgroundColor: theme.dashboard.thBg,
}
const tdStyle: React.CSSProperties = {
  padding: '14px 16px', fontSize: theme.fontSizes.sm, color: theme.dashboard.text,
  borderBottom: `1px solid ${theme.dashboard.border}`,
}

function ModalOverlay({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 50, backgroundColor: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
      <div onClick={(e) => e.stopPropagation()} style={{ width: '100%', maxWidth: '560px', maxHeight: '90vh', overflowY: 'auto' }}>
        {children}
      </div>
    </div>
  )
}

function ModalCard({ title, onClose, children, formId }: { title: string; onClose: () => void; children: React.ReactNode; formId?: string }) {
  return (
    <div style={{ backgroundColor: theme.dashboard.cardBg, border: `1px solid ${theme.dashboard.border}`, borderRadius: theme.radii.md, boxShadow: '0 4px 16px rgba(0,0,0,0.12)', overflow: 'hidden' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 24px', borderBottom: `1px solid ${theme.dashboard.border}` }}>
        <h2 style={{ margin: 0, fontSize: theme.fontSizes.base, fontWeight: theme.fontWeights.bold, color: theme.dashboard.text }}>{title}</h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          {formId && (
            <button type="submit" form={formId} title="Guardar" style={{ background: 'none', border: `1px solid ${theme.dashboard.border}`, borderRadius: theme.radii.sm, cursor: 'pointer', color: theme.dashboard.textMuted, padding: '5px 8px', display: 'flex', alignItems: 'center' }}>
              <Save size={16} />
            </button>
          )}
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: theme.dashboard.textMuted, display: 'flex', padding: 0 }}>
            <X size={18} />
          </button>
        </div>
      </div>
      <div style={{ padding: '24px' }}>{children}</div>
    </div>
  )
}

function ErrorBox({ message }: { message: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 14px', backgroundColor: `${theme.colors.error}18`, border: `1px solid ${theme.colors.error}`, borderRadius: theme.radii.sm, color: theme.colors.error, fontSize: theme.fontSizes.sm }}>
      <AlertCircle size={14} style={{ flexShrink: 0 }} />{message}
    </div>
  )
}

// ── Gestor de fotos múltiples ────────────────────────────────────────────────
function PhotoManager({ imagenes, onChange }: { imagenes: string[]; onChange: (imgs: string[]) => void }) {
  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState<string | null>(null)

  async function handleFiles(files: FileList) {
    setUploading(true); setUploadError(null)
    const fd = new FormData()
    Array.from(files).forEach((f) => fd.append('files', f))
    const res = await fetch('/api/upload/trabajo', { method: 'POST', body: fd })
    const json = await res.json()
    setUploading(false)
    if (!res.ok) { setUploadError(json.error ?? 'Error al subir fotos'); return }
    onChange([...imagenes, ...json.urls].slice(0, 12))
  }

  function removePhoto(index: number) {
    onChange(imagenes.filter((_, i) => i !== index))
  }

  function setCover(index: number) {
    if (index === 0) return
    const next = [...imagenes]
    const [picked] = next.splice(index, 1)
    onChange([picked, ...next])
  }

  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(96px, 1fr))', gap: '10px' }}>
        {imagenes.map((url, i) => (
          <div key={url} style={{ position: 'relative', borderRadius: theme.radii.sm, overflow: 'hidden', border: `1px solid ${i === 0 ? theme.colors.accent : theme.dashboard.border}` }}>
            <img src={url} alt={`Foto ${i + 1}`} style={{ width: '100%', height: '72px', objectFit: 'cover', display: 'block' }} />
            {i === 0 && (
              <span style={{ position: 'absolute', bottom: 4, left: 4, padding: '2px 6px', backgroundColor: theme.colors.accent, color: '#000000', borderRadius: theme.radii.full, fontSize: theme.fontSizes.xs, fontWeight: theme.fontWeights.medium }}>
                Portada
              </span>
            )}
            {i !== 0 && (
              <button type="button" title="Hacer portada" onClick={() => setCover(i)}
                style={{ position: 'absolute', top: 4, left: 4, background: 'rgba(0,0,0,0.6)', border: 'none', borderRadius: '50%', width: 20, height: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#fff', padding: 0 }}>
                <Star size={11} />
              </button>
            )}
            <button type="button" title="Quitar foto" onClick={() => removePhoto(i)}
              style={{ position: 'absolute', top: 4, right: 4, background: theme.colors.error, border: 'none', borderRadius: '50%', width: 20, height: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#fff', padding: 0 }}>
              <X size={11} />
            </button>
          </div>
        ))}

        {imagenes.length < 12 && (
          <label htmlFor="fotos-upload"
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '4px', height: '72px', border: `1px dashed ${theme.dashboard.border}`, borderRadius: theme.radii.sm, cursor: uploading ? 'not-allowed' : 'pointer', fontSize: theme.fontSizes.xs, color: theme.dashboard.textMuted, backgroundColor: theme.dashboard.inputBg, textAlign: 'center', padding: '4px' }}>
            {uploading ? <Loader2 size={16} className="animate-spin" /> : <Upload size={16} />}
            {uploading ? 'Subiendo...' : 'Agregar fotos'}
          </label>
        )}
        <input id="fotos-upload" type="file" accept="image/jpeg,image/png,image/webp" multiple style={{ display: 'none' }} disabled={uploading}
          onChange={async (e) => { if (e.target.files?.length) await handleFiles(e.target.files); e.target.value = '' }} />
      </div>
      <p style={{ fontSize: theme.fontSizes.xs, color: theme.dashboard.textMuted, marginTop: '6px' }}>
        JPG, PNG o WEBP — máx 5MB por foto, hasta 12 fotos. La primera es la portada (⭐ la cambia).
      </p>
      {uploadError && <p style={{ color: theme.colors.error, fontSize: theme.fontSizes.xs, marginTop: '4px' }}>{uploadError}</p>}
    </div>
  )
}

function TrabajoFormFields({ form }: { form: ReturnType<typeof useForm<TrabajoForm>> }) {
  const imagenes = form.watch('imagenes') ?? []

  const selectStyle = { ...inputStyle, backgroundColor: theme.dashboard.inputBg }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>

        <div style={{ gridColumn: '1 / -1' }}>
          <label style={labelStyle}>Título <span style={{ color: theme.colors.error }}>*</span></label>
          <input {...form.register('titulo')} style={inputStyle} placeholder="Ej: Montaje de hidrogrúa XCMG" />
          {form.formState.errors.titulo && <p style={{ color: theme.colors.error, fontSize: theme.fontSizes.sm, marginTop: '4px' }}>{form.formState.errors.titulo.message}</p>}
        </div>

        <div>
          <label style={labelStyle}>Categoría <span style={{ color: theme.colors.error }}>*</span></label>
          <select {...form.register('categoria')} style={selectStyle}>
            {TRABAJO_CATEGORIAS.map((c) => (
              <option key={c} value={c}>{CATEGORIA_LABELS[c]}</option>
            ))}
          </select>
        </div>

        <div style={{ gridColumn: '1 / -1' }}>
          <label style={labelStyle}>Descripción</label>
          <textarea {...form.register('descripcion')} rows={3} style={{ ...inputStyle, resize: 'vertical' }} placeholder="Breve descripción del trabajo realizado..." />
        </div>

        <div style={{ gridColumn: '1 / -1' }}>
          <label style={labelStyle}>Fotos</label>
          <PhotoManager imagenes={imagenes} onChange={(imgs) => form.setValue('imagenes', imgs, { shouldDirty: true })} />
          {form.formState.errors.imagenes && <p style={{ color: theme.colors.error, fontSize: theme.fontSizes.sm, marginTop: '4px' }}>{form.formState.errors.imagenes.message}</p>}
        </div>

        <div style={{ gridColumn: '1 / -1', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <input type="checkbox" id="trabajo-active-check" {...form.register('activo')} style={{ width: '16px', height: '16px', cursor: 'pointer', accentColor: theme.colors.accent }} />
            <label htmlFor="trabajo-active-check" style={{ ...labelStyle, marginBottom: 0, cursor: 'pointer' }}>Trabajo activo</label>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <input type="checkbox" id="trabajo-landing-check" {...form.register('mostrar_en_landing')} style={{ width: '16px', height: '16px', cursor: 'pointer', accentColor: theme.colors.accent }} />
            <label htmlFor="trabajo-landing-check" style={{ ...labelStyle, marginBottom: 0, cursor: 'pointer' }}>Mostrar en landing</label>
          </div>
        </div>

      </div>
    </div>
  )
}

export default function TrabajosClient({ initialTrabajos }: { initialTrabajos: Trabajo[] }) {
  const [trabajos, setTrabajos]       = useState(initialTrabajos)
  const [showCreate, setShowCreate]   = useState(false)
  const [editTarget, setEditTarget]   = useState<Trabajo | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<Trabajo | null>(null)
  const [globalError, setGlobalError] = useState<string | null>(null)
  const [deleting, setDeleting]       = useState(false)

  const createForm = useForm<TrabajoForm>({ resolver: zodResolver(trabajoSchema), defaultValues: { categoria: 'HIDROGRUAS', imagenes: [], activo: true, mostrar_en_landing: true, titulo: '', descripcion: '' } })
  const [createError, setCreateError]   = useState<string | null>(null)
  const [createLoading, setCreateLoading] = useState(false)

  const editForm = useForm<TrabajoForm>({ resolver: zodResolver(trabajoSchema), defaultValues: { categoria: 'HIDROGRUAS', imagenes: [], activo: true, mostrar_en_landing: true, titulo: '', descripcion: '' } })
  const [editError, setEditError]   = useState<string | null>(null)
  const [editLoading, setEditLoading] = useState(false)

  const openCreate = () => {
    createForm.reset({ titulo: '', descripcion: '', categoria: 'HIDROGRUAS', imagenes: [], activo: true, mostrar_en_landing: true })
    setCreateError(null)
    setShowCreate(true)
  }

  const openEdit = (t: Trabajo) => {
    setEditTarget(t)
    editForm.reset({
      titulo:             t.titulo,
      descripcion:        t.descripcion ?? '',
      categoria:          (t.categoria as TrabajoCategoria) ?? 'HIDROGRUAS',
      imagenes:           t.imagenes ?? [],
      activo:             t.activo,
      mostrar_en_landing: t.mostrar_en_landing,
    })
    setEditError(null)
  }

  const onCreateSubmit = async (data: TrabajoForm) => {
    setCreateLoading(true); setCreateError(null)
    const res = await fetch('/api/dashboard/trabajos', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
    const json = await res.json()
    setCreateLoading(false)
    if (!res.ok) { setCreateError(json.error); return }
    setTrabajos((prev) => [json, ...prev])
    setShowCreate(false)
  }

  const onEditSubmit = async (data: TrabajoForm) => {
    if (!editTarget) return
    setEditLoading(true); setEditError(null)
    const res = await fetch(`/api/dashboard/trabajos/${editTarget.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
    const json = await res.json()
    setEditLoading(false)
    if (!res.ok) { setEditError(json.error); return }
    setTrabajos((prev) => prev.map((t) => (t.id === editTarget.id ? json : t)))
    setEditTarget(null)
  }

  const confirmDelete = async () => {
    if (!deleteTarget) return
    setDeleting(true); setGlobalError(null)
    const res = await fetch(`/api/dashboard/trabajos/${deleteTarget.id}`, { method: 'DELETE' })
    const json = await res.json()
    setDeleting(false)
    if (!res.ok) { setGlobalError(json.error); setDeleteTarget(null); return }
    setTrabajos((prev) => prev.filter((t) => t.id !== deleteTarget.id))
    setDeleteTarget(null)
  }

  const btnPrimary = (disabled: boolean) => ({
    width: '100%', padding: '11px', marginTop: '20px',
    backgroundColor: disabled ? `${theme.colors.accent}80` : theme.colors.accent,
    color: '#000000', fontSize: theme.fontSizes.base, fontWeight: theme.fontWeights.bold,
    border: 'none', borderRadius: theme.radii.sm,
    cursor: disabled ? 'not-allowed' : 'pointer',
    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
  })

  return (
    <>
      {/* Header row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <p style={{ fontSize: theme.fontSizes.sm, color: theme.dashboard.textMuted }}>
          {trabajos.length} trabajo{trabajos.length !== 1 ? 's' : ''}
        </p>
        <button
          onClick={openCreate}
          style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '9px 16px', backgroundColor: theme.colors.accent, color: '#000000', border: 'none', borderRadius: theme.radii.sm, fontSize: theme.fontSizes.sm, fontWeight: theme.fontWeights.bold, cursor: 'pointer' }}
        >
          <Plus size={15} /> Agregar trabajo
        </button>
      </div>

      {globalError && <div style={{ marginBottom: '16px' }}><ErrorBox message={globalError} /></div>}

      {/* Table */}
      <div style={{ backgroundColor: theme.dashboard.cardBg, borderRadius: theme.radii.md, border: `1px solid ${theme.dashboard.border}`, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>Foto</th>
              <th style={thStyle}>Título</th>
              <th style={thStyle}>Categoría</th>
              <th style={thStyle}>Fotos</th>
              <th style={thStyle}>Estado</th>
              <th style={thStyle}>Landing</th>
              <th style={{ ...thStyle, textAlign: 'right' }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {trabajos.length === 0 && (
              <tr>
                <td colSpan={7} style={{ ...tdStyle, textAlign: 'center', color: theme.dashboard.textMuted }}>
                  No hay trabajos registrados
                </td>
              </tr>
            )}
            {trabajos.map((t) => (
              <tr key={t.id}>
                <td style={tdStyle}>
                  {t.imagenes?.length
                    ? <img src={t.imagenes[0]} alt={t.titulo} style={{ width: 56, height: 40, objectFit: 'cover', borderRadius: theme.radii.sm, border: `1px solid ${theme.dashboard.border}`, display: 'block' }} />
                    : <div style={{ width: 56, height: 40, borderRadius: theme.radii.sm, border: `1px solid ${theme.dashboard.border}`, backgroundColor: theme.dashboard.thBg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: theme.dashboard.textMuted, fontSize: theme.fontSizes.xs }}>Sin foto</div>}
                </td>
                <td style={{ ...tdStyle, fontWeight: theme.fontWeights.medium, maxWidth: '280px' }}>
                  <span style={{ display: 'block' }}>{t.titulo}</span>
                  {t.descripcion && (
                    <span style={{ display: 'block', fontSize: theme.fontSizes.xs, color: theme.dashboard.textMuted, fontWeight: theme.fontWeights.regular, marginTop: '1px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '280px' }}>
                      {t.descripcion}
                    </span>
                  )}
                </td>
                <td style={tdStyle}>
                  <span style={{ padding: '3px 10px', backgroundColor: `${theme.colors.accent}18`, color: theme.colors.accent, borderRadius: theme.radii.full, fontSize: theme.fontSizes.xs, fontWeight: theme.fontWeights.medium, whiteSpace: 'nowrap' }}>
                    {CATEGORIA_LABELS[t.categoria as TrabajoCategoria] ?? t.categoria}
                  </span>
                </td>
                <td style={{ ...tdStyle, color: theme.dashboard.textMuted }}>{t.imagenes?.length ?? 0}</td>
                <td style={tdStyle}>
                  <span style={{ padding: '3px 10px', borderRadius: theme.radii.full, fontSize: theme.fontSizes.xs, fontWeight: theme.fontWeights.medium, backgroundColor: t.activo ? `${theme.colors.success}18` : `${theme.dashboard.textMuted}18`, color: t.activo ? theme.colors.success : theme.dashboard.textMuted }}>
                    {t.activo ? 'Activo' : 'Inactivo'}
                  </span>
                </td>
                <td style={tdStyle}>
                  {t.mostrar_en_landing
                    ? <span style={{ padding: '3px 10px', borderRadius: theme.radii.full, fontSize: theme.fontSizes.xs, fontWeight: theme.fontWeights.medium, backgroundColor: `${theme.colors.accent}18`, color: theme.colors.accent }}>Sí</span>
                    : <span style={{ color: theme.dashboard.textMuted }}>—</span>}
                </td>
                <td style={{ ...tdStyle, textAlign: 'right' }}>
                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                    <button onClick={() => openEdit(t)} style={{ background: 'none', border: `1px solid ${theme.dashboard.border}`, borderRadius: theme.radii.sm, cursor: 'pointer', color: theme.dashboard.textMuted, padding: '5px 8px', display: 'flex', alignItems: 'center' }}>
                      <Pencil size={13} />
                    </button>
                    <button onClick={() => setDeleteTarget(t)} style={{ background: 'none', border: `1px solid ${theme.colors.error}44`, borderRadius: theme.radii.sm, cursor: 'pointer', color: theme.colors.error, padding: '5px 8px', display: 'flex', alignItems: 'center' }}>
                      <Trash2 size={13} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Create modal */}
      {showCreate && (
        <ModalOverlay>
          <ModalCard title="Nuevo trabajo" onClose={() => setShowCreate(false)} formId="trabajo-create-form">
            <form id="trabajo-create-form" onSubmit={createForm.handleSubmit(onCreateSubmit)}>
              <TrabajoFormFields form={createForm} />
              {createError && <div style={{ marginTop: '14px' }}><ErrorBox message={createError} /></div>}
              <button type="submit" disabled={createLoading} style={btnPrimary(createLoading)}>
                {createLoading && <Loader2 size={15} className="animate-spin" />}
                {createLoading ? 'Guardando...' : 'Crear trabajo'}
              </button>
            </form>
          </ModalCard>
        </ModalOverlay>
      )}

      {/* Edit modal */}
      {editTarget && (
        <ModalOverlay>
          <ModalCard title="Editar trabajo" onClose={() => setEditTarget(null)} formId="trabajo-edit-form">
            <form id="trabajo-edit-form" onSubmit={editForm.handleSubmit(onEditSubmit)}>
              <TrabajoFormFields form={editForm} />
              {editError && <div style={{ marginTop: '14px' }}><ErrorBox message={editError} /></div>}
              <button type="submit" disabled={editLoading} style={btnPrimary(editLoading)}>
                {editLoading && <Loader2 size={15} className="animate-spin" />}
                {editLoading ? 'Guardando...' : 'Guardar cambios'}
              </button>
            </form>
          </ModalCard>
        </ModalOverlay>
      )}

      {/* Delete confirm */}
      {deleteTarget && (
        <ModalOverlay>
          <ModalCard title="Eliminar trabajo" onClose={() => setDeleteTarget(null)}>
            <p style={{ fontSize: theme.fontSizes.base, color: theme.dashboard.text, marginBottom: '8px' }}>
              ¿Eliminás el trabajo <strong>{deleteTarget.titulo}</strong>?
            </p>
            <p style={{ fontSize: theme.fontSizes.sm, color: theme.dashboard.textMuted, marginBottom: '24px' }}>
              Se eliminarán también sus fotos. Esta acción no se puede deshacer.
            </p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button onClick={() => setDeleteTarget(null)} style={{ flex: 1, padding: '10px', border: `1px solid ${theme.dashboard.border}`, borderRadius: theme.radii.sm, background: 'transparent', color: theme.dashboard.text, cursor: 'pointer', fontSize: theme.fontSizes.sm }}>
                Cancelar
              </button>
              <button onClick={confirmDelete} disabled={deleting}
                style={{ flex: 1, padding: '10px', backgroundColor: deleting ? `${theme.colors.error}99` : theme.colors.error, color: '#fff', border: 'none', borderRadius: theme.radii.sm, cursor: deleting ? 'not-allowed' : 'pointer', fontSize: theme.fontSizes.sm, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                {deleting && <Loader2 size={13} className="animate-spin" />}
                {deleting ? 'Eliminando...' : 'Sí, eliminar'}
              </button>
            </div>
          </ModalCard>
        </ModalOverlay>
      )}
    </>
  )
}
