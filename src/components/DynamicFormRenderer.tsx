import React, { useState } from 'react';
import type { FormField } from '../types';
import FAIcon from './FAIcon';

/**
 * Renderiza dinamicamente um formulario baseado em um array de FormField.
 * Usado em ResolverPendencia para os tipos Comunique-se e Analise de documentos.
 */
export default function DynamicFormRenderer({ fields, readOnly }: { fields: FormField[]; readOnly: boolean }) {
  const [values, setValues] = useState<Record<string, string>>(() =>
    Object.fromEntries(fields.map(f => [f.id, readOnly ? (f.readonlyValue ?? '') : '']))
  );
  const [checked, setChecked] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(fields.filter(f => f.type === 'checkbox').map(f => [f.id, readOnly && f.readonlyValue === 'true']))
  );
  const [fileNames, setFileNames] = useState<Record<string, string>>(() =>
    Object.fromEntries(fields.filter(f => f.type === 'file').map(f => [f.id, readOnly ? (f.readonlyValue ?? '') : '']))
  );

  const labelStyle: React.CSSProperties = {
    display: 'block', fontWeight: 600, fontSize: 11,
    color: 'var(--neutral-label)', letterSpacing: '0.07em',
    textTransform: 'uppercase', marginBottom: 6,
  };
  const inputStyle: React.CSSProperties = {
    width: '100%', boxSizing: 'border-box', height: 44,
    border: '1.5px solid var(--neutral-light-down)', borderRadius: 8,
    padding: '0 14px', fontSize: 14, color: 'var(--neutral-dark-pure)',
    outline: 'none', background: readOnly ? 'var(--bg-subtle)' : 'white',
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {fields.map(field => (
        <div key={field.id}>
          {field.type !== 'checkbox' && (
            <label style={labelStyle}>
              {field.label}
              {field.required && !readOnly && <span style={{ color: 'var(--error-color)', marginLeft: 3 }}>*</span>}
            </label>
          )}

          {field.type === 'text' && (
            <input
              disabled={readOnly}
              value={values[field.id]}
              onChange={e => setValues(v => ({ ...v, [field.id]: e.target.value }))}
              placeholder={field.placeholder}
              style={inputStyle}
              onFocus={e => { if (!readOnly) (e.currentTarget as HTMLInputElement).style.borderColor = 'var(--primary-pure)'; }}
              onBlur={e => { (e.currentTarget as HTMLInputElement).style.borderColor = 'var(--neutral-light-down)'; }}
            />
          )}

          {field.type === 'textarea' && (
            <textarea
              disabled={readOnly}
              value={values[field.id]}
              onChange={e => setValues(v => ({ ...v, [field.id]: e.target.value }))}
              placeholder={field.placeholder}
              rows={4}
              style={{ ...inputStyle, height: undefined, minHeight: 88, padding: '10px 14px', resize: 'vertical', color: readOnly ? 'var(--neutral-dark-down)' : 'var(--neutral-dark-pure)' }}
              onFocus={e => { if (!readOnly) (e.currentTarget as HTMLTextAreaElement).style.borderColor = 'var(--primary-pure)'; }}
              onBlur={e => { (e.currentTarget as HTMLTextAreaElement).style.borderColor = 'var(--neutral-light-down)'; }}
            />
          )}

          {field.type === 'select' && (
            <select
              disabled={readOnly}
              value={values[field.id]}
              onChange={e => setValues(v => ({ ...v, [field.id]: e.target.value }))}
              style={{ ...inputStyle, cursor: readOnly ? 'default' : 'pointer' }}
            >
              {!values[field.id] && <option value="">Selecione...</option>}
              {field.options?.map(o => <option key={o} value={o}>{o}</option>)}
            </select>
          )}

          {field.type === 'date' && (
            <input
              type="date"
              disabled={readOnly}
              value={values[field.id]}
              onChange={e => setValues(v => ({ ...v, [field.id]: e.target.value }))}
              style={inputStyle}
              onFocus={e => { if (!readOnly) (e.currentTarget as HTMLInputElement).style.borderColor = 'var(--primary-pure)'; }}
              onBlur={e => { (e.currentTarget as HTMLInputElement).style.borderColor = 'var(--neutral-light-down)'; }}
            />
          )}

          {field.type === 'checkbox' && (
            <div
              onClick={() => !readOnly && setChecked(c => ({ ...c, [field.id]: !c[field.id] }))}
              style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 14px', background: checked[field.id] ? 'var(--success-bg-light)' : 'var(--bg-subtle)', border: `1.5px solid ${checked[field.id] ? 'var(--success-border-light)' : 'var(--card-border)'}`, borderRadius: 8, cursor: readOnly ? 'default' : 'pointer', transition: 'all 0.12s' }}
            >
              <div style={{ width: 20, height: 20, borderRadius: 5, border: `2px solid ${checked[field.id] ? 'var(--success-color)' : 'var(--neutral-dark-up)'}`, background: checked[field.id] ? 'var(--success-color)' : 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                {checked[field.id] && <FAIcon icon="fa-solid fa-check" style={{ fontSize: 10, color: 'white' }} />}
              </div>
              <span style={{ fontSize: 13, color: 'var(--neutral-dark-pure)', lineHeight: '18px' }}>{field.label}</span>
            </div>
          )}

          {field.type === 'file' && (
            readOnly ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', background: 'var(--bg-subtle)', border: '1px solid var(--neutral-light-medium)', borderRadius: 8 }}>
                <FAIcon icon="fa-regular fa-file-pdf" style={{ fontSize: 16, color: 'var(--error-color)' }} />
                <span style={{ fontSize: 13, color: 'var(--neutral-dark-pure)', flex: 1 }}>{fileNames[field.id] || ''}</span>
                <span style={{ fontSize: 10, fontWeight: 600, color: 'var(--success-color)', background: 'var(--success-bg)', borderRadius: 4, padding: '2px 8px' }}>Enviado</span>
              </div>
            ) : (
              <label style={{ display: 'inline-flex', alignItems: 'center', gap: 8, height: 40, padding: '0 16px', border: '1.5px dashed var(--card-border-hover)', borderRadius: 8, background: 'var(--bg-subtle)', cursor: 'pointer', fontSize: 13, color: 'var(--primary-pure)', fontWeight: 600 }}>
                <FAIcon icon="fa-regular fa-paperclip" style={{ fontSize: 13 }} />
                {fileNames[field.id] || 'Selecionar arquivo'}
                <input type="file" style={{ display: 'none' }} onChange={e => setFileNames(fn => ({ ...fn, [field.id]: e.target.files?.[0]?.name || '' }))} />
              </label>
            )
          )}
        </div>
      ))}
    </div>
  );
}
