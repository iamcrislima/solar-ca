import React, { useState, useRef, useEffect, Fragment } from 'react';
import { createPortal } from 'react-dom';
import { useT } from '../i18n';
import type { Pendencia, DocParaAssinar } from '../types';
import FAIcon from '../components/FAIcon';
import DynamicFormRenderer from '../components/DynamicFormRenderer';
import { FORM_FIELDS_COMUNIQUE, FORM_FIELDS_ANALISE, PENDENCIA_ICON } from '../mocks';
import { PrazoBadge } from './MinhasPendencias';

//  Modal: Confirmar Assinaturas 
function ConfirmarAssinaturaModal({ onClose, onConfirmar }: { onClose: () => void; onConfirmar: () => void }) {
  const [tipo,   setTipo]   = useState('ICP Brasil');
  const [padrao, setPadrao] = useState('PAdES');

  return createPortal(
    <div
      style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(0,0,0,0.48)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}
      onClick={onClose}
    >
      <div
        style={{ background: 'white', borderRadius: 14, padding: 28, maxWidth: 440, width: '100%', boxShadow: '0px 20px 60px rgba(0,0,0,0.22)' }}
        onClick={e => e.stopPropagation()}
      >
        {/* Cabeçalho */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 22 }}>
          <div style={{ width: 48, height: 48, borderRadius: 12, background: 'var(--primary-bg-hover)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <FAIcon icon="fa-regular fa-signature" style={{ fontSize: 22, color: 'var(--primary-pure)' }} />
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 18, color: 'var(--neutral-ink-strong)' }}>Confirmar assinaturas</div>
            <div style={{ fontSize: 13, color: 'var(--neutral-dark-medium)', marginTop: 2 }}>Defina o tipo e padrão de assinatura digital</div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {/* Tipo */}
          <div>
            <label style={LABEL_STYLE}>
              Tipo de assinatura
            </label>
            <select
              value={tipo}
              onChange={e => setTipo(e.target.value)}
              style={{ width: '100%', height: 44, border: '1.5px solid var(--neutral-light-down)', borderRadius: 8, padding: '0 14px', fontSize: 14, color: 'var(--neutral-dark-pure)', outline: 'none', background: 'white', cursor: 'pointer' }}
            >
              <option>ICP Brasil</option>
              <option>Sistema</option>
            </select>
          </div>

          {/* Padrão */}
          <div>
            <label style={LABEL_STYLE}>
              Padrão de assinatura
            </label>
            <select
              value={padrao}
              onChange={e => setPadrao(e.target.value)}
              style={{ width: '100%', height: 44, border: '1.5px solid var(--neutral-light-down)', borderRadius: 8, padding: '0 14px', fontSize: 14, color: 'var(--neutral-dark-pure)', outline: 'none', background: 'white', cursor: 'pointer' }}
            >
              <option>PAdES</option>
              <option>CAdES</option>
              <option>XAdES</option>
            </select>
          </div>

          {/* Info */}
          <div style={{ background: 'var(--background-color-light)', borderRadius: 8, padding: '10px 14px', display: 'flex', gap: 10, alignItems: 'flex-start' }}>
            <FAIcon icon="fa-regular fa-circle-info" style={{ fontSize: 13, color: 'var(--neutral-dark-medium)', flexShrink: 0, marginTop: 2 }} />
            <span style={{ fontSize: 12, color: 'var(--neutral-dark-down)', lineHeight: '18px' }}>
              A assinatura <strong>{tipo}</strong> no padrão <strong>{padrao}</strong> será aplicada a todos os documentos marcados para assinar.
            </span>
          </div>
        </div>

        {/* Ações */}
        <div style={{ display: 'flex', gap: 10, marginTop: 24, justifyContent: 'flex-end' }}>
          <button
            onClick={onClose}
            style={{ height: 44, padding: '0 20px', borderRadius: 8, background: 'white', border: '1.5px solid var(--neutral-light-down)', color: 'var(--neutral-dark-down)', fontWeight: 600, fontSize: 14, cursor: 'pointer' }}
            onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.background = 'var(--background-color-light)'}
            onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.background = 'white'}
          >
            Cancelar
          </button>
          <button
            onClick={() => { onConfirmar(); onClose(); }}
            style={{ height: 44, padding: '0 24px', borderRadius: 8, background: 'var(--primary-pure)', border: 'none', color: 'white', fontWeight: 700, fontSize: 14, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 8 }}
            onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.background = 'var(--primary-pure-hover)'}
            onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.background = 'var(--primary-pure)'}
          >
            <FAIcon icon="fa-regular fa-signature" style={{ fontSize: 14 }} />
            Confirmar
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}

// Tela: Resolver Pendência

const LABEL_STYLE: React.CSSProperties = {
  display: 'block', fontWeight: 600, fontSize: 11, color: 'var(--neutral-label)',
  letterSpacing: '0.07em', textTransform: 'uppercase', marginBottom: 6,
};

const MOCK_DOCUMENTOS_ASSINATURA: DocParaAssinar[] = [
  { id: 'd1', nome: 'Contrato de prestação de serviços',   descricao: 'Termo principal que estabelece obrigações e condições', tipo: 'PDF',  paginas: 12, tamanho: '380 KB' },
  { id: 'd2', nome: 'Anexo I — Termo de responsabilidade', descricao: 'Responsabilidades do contratante',                        tipo: 'PDF',  paginas: 3,  tamanho: '98 KB'  },
  { id: 'd3', nome: 'Anexo II — Cronograma de entregas',   descricao: 'Prazos e marcos do projeto',                              tipo: 'PDF',  paginas: 2,  tamanho: '64 KB'  },
  { id: 'd4', nome: 'Declaração de ciência',               descricao: 'Confirma que leu e concorda com os termos',              tipo: 'PDF',  paginas: 1,  tamanho: '45 KB'  },
];

export default function ResolverPendencia({ pendencia, onVoltar, onConcluir }: { pendencia: Pendencia | null; onVoltar: () => void; onConcluir: () => void }) {
  const t = useT();
  const readOnly = pendencia?.status === 'Finalizada';
  const tipo = pendencia?.tipo ?? 'Assinatura de documentos';

  // Estado — Assinatura de documentos
  const [paraAssinar,         setParaAssinar]         = useState<Set<string>>(new Set());
  const [paraRecusar,         setParaRecusar]         = useState<Set<string>>(new Set());
  const [parecer,             setParecer]             = useState('');
  const [showConfirmarModal,  setShowConfirmarModal]  = useState(false);
  const [tipoAssMap,          setTipoAssMap]          = useState<Record<string, string>>({});
  const [padraoAssMap,        setPadraoAssMap]        = useState<Record<string, string>>({});


  // Estado — Verificar informaes / Complementar dados / Anlise
  const [observacao, setObservacao] = useState('');
  const [docComplementar, setDocComplementar] = useState('');
  const [itensVerificados, setItensVerificados] = useState<Set<string>>(new Set());

  const docs = MOCK_DOCUMENTOS_ASSINATURA;
  const totalAssinar  = paraAssinar.size;
  const totalRecusar  = paraRecusar.size;
  const todosAssinar  = totalAssinar === docs.length && docs.length > 0;

  function toggleDoc(id: string, alvo: 'assinar' | 'recusar') {
    const [setMain, setOther] = alvo === 'assinar'
      ? [setParaAssinar, setParaRecusar]
      : [setParaRecusar, setParaAssinar];
    setMain(prev => { const s = new Set(prev); s.has(id) ? s.delete(id) : s.add(id); return s; });
    setOther(prev => { const s = new Set(prev); s.delete(id); return s; });
  }

  function assinarTodos() {
    setParaAssinar(new Set(docs.map(d => d.id)));
    setParaRecusar(new Set());
  }

  function recusarTodos() {
    setParaRecusar(new Set(docs.map(d => d.id)));
    setParaAssinar(new Set());
  }

  function limparSelecao() {
    setParaAssinar(new Set());
    setParaRecusar(new Set());
  }

  const iconInfo = pendencia ? PENDENCIA_ICON[pendencia.tipo] : PENDENCIA_ICON['Assinatura de documentos'];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, padding: '24px 24px 48px 24px' }}>
      {/* Boto voltar */}
      <button
        onClick={onVoltar}
        style={{
          alignSelf: 'flex-start',
          background: 'none', border: 'none', cursor: 'pointer',
          display: 'inline-flex', alignItems: 'center', gap: 8,
          padding: '4px 0', color: 'var(--primary-pure)',
          fontWeight: 600, fontSize: 13,
        }}
      >
        <FAIcon icon="fa-regular fa-arrow-left" style={{ fontSize: 13 }} />
        {t('rpVoltar')}
      </button>

      {/* Cabealho da pendncia */}
      <div style={{
        background: 'white', border: '1px solid var(--card-border)', borderRadius: 10,
        padding: '20px 24px', display: 'flex', alignItems: 'center', gap: 16,
        boxShadow: '0px 2px 8px rgba(24,39,75,0.06)',
      }}>
        <div style={{
          width: 56, height: 56, borderRadius: 12,
          background: readOnly ? 'var(--success-bg)' : iconInfo.bg,
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
        }}>
          <FAIcon icon={readOnly ? 'fa-regular fa-circle-check' : iconInfo.icon} style={{ fontSize: 22, color: readOnly ? 'var(--success-color)' : iconInfo.color }} />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
            <h1 style={{ fontWeight: 700, fontSize: 20, color: 'var(--neutral-ink-strong)', margin: 0 }}>
              {pendencia?.titulo || t('rpAssinaturaTitle')}
            </h1>
            {readOnly && (
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'var(--success-bg)', color: 'var(--success-color)', borderRadius: 100, padding: '3px 12px', fontWeight: 700, fontSize: 12, whiteSpace: 'nowrap' }}>
                <FAIcon icon="fa-solid fa-check" style={{ fontSize: 10 }} />
                Resolvida
              </span>
            )}
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, marginTop: 6, fontSize: 12, color: 'var(--neutral-dark-down)' }}>
            <span><strong style={{ color: 'var(--neutral-dark-medium)' }}>{t('rpTipo')}:</strong> {pendencia?.tipo || '-'}</span>
            <span></span>
            <span><strong style={{ color: 'var(--neutral-dark-medium)' }}>{t('rpProcesso')}:</strong> {pendencia?.processo || '-'}</span>
            {pendencia?.prazo && (
              <>
                <span></span>
                <PrazoBadge prazo={pendencia.prazo} diasRestantes={pendencia.diasRestantes} finalizada={readOnly} />
              </>
            )}
          </div>
        </div>
      </div>

      {/*  TEMPLATE: Assinatura de documentos  */}
      {tipo === 'Assinatura de documentos' && (
      <div style={{ background: 'white', border: '1px solid var(--card-border)', borderRadius: 10, padding: 24, boxShadow: '0px 4px 12px rgba(24,39,75,0.08)', display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
          <div>
            <h2 style={{ fontWeight: 700, fontSize: 16, color: 'var(--neutral-ink-strong)', margin: 0 }}>{t('rpAssinaturaTitle')}</h2>
            <p style={{ fontSize: 13, color: 'var(--neutral-dark-down)', margin: '4px 0 0 0', lineHeight: 1.5 }}>
              {readOnly ? 'Assinatura concluda. Veja o resultado abaixo.' : t('rpAssinaturaDesc')}
            </p>
          </div>
          {!readOnly && (
            <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
              <button onClick={assinarTodos}
                style={{ height: 34, padding: '0 14px', border: '1.5px solid var(--primary-pure)', borderRadius: 6, background: todosAssinar ? 'var(--primary-pure)' : 'white', color: todosAssinar ? 'white' : 'var(--primary-pure)', fontWeight: 600, fontSize: 12, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                <FAIcon icon="fa-regular fa-signature" style={{ fontSize: 11 }} />
                {t('rpAssinarTodos')}
              </button>
              <button onClick={recusarTodos}
                style={{ height: 34, padding: '0 14px', border: '1.5px solid var(--error-color)', borderRadius: 6, background: 'white', color: 'var(--error-color)', fontWeight: 600, fontSize: 12, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                <FAIcon icon="fa-regular fa-xmark-circle" style={{ fontSize: 11 }} />
                {t('rpRecusarTodos')}
              </button>
              {(totalAssinar > 0 || totalRecusar > 0) && (
                <button onClick={limparSelecao}
                  style={{ height: 34, padding: '0 12px', border: '1.5px solid var(--neutral-light-down)', borderRadius: 6, background: 'white', color: 'var(--neutral-dark-down)', fontWeight: 600, fontSize: 12, cursor: 'pointer' }}>
                  <FAIcon icon="fa-regular fa-xmark" style={{ fontSize: 11 }} />
                </button>
              )}
            </div>
          )}
        </div>

        {/* Tabela de documentos */}
        <div style={{ overflowX: 'auto', border: '1px solid var(--neutral-light-medium)', borderRadius: 10 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: 'var(--background-color-light)' }}>
                {[
                  { w: 50,  label: 'Assinar' },
                  { w: 50,  label: 'Recusar' },
                  { w: 160, label: 'Tipo assinatura' },
                  { w: 130, label: 'Padrão' },
                  { w: undefined, label: 'Nome do documento' },
                  { w: 150, label: 'Usurio insero' },
                  { w: 110, label: 'Data insero' },
                  { w: 48,  label: '' },
                ].map((col, ci) => (
                  <th key={col.label || ci} style={{ padding: '10px 14px', textAlign: ci <= 1 ? 'center' : 'left', fontWeight: 700, fontSize: 11, color: 'var(--neutral-dark-medium)', textTransform: 'uppercase', letterSpacing: '0.06em', borderBottom: '1px solid var(--neutral-light-medium)', whiteSpace: 'nowrap', width: col.w }}>
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {docs.map((doc, i) => {
                const assinando = readOnly ? true  : paraAssinar.has(doc.id);
                const recusando = readOnly ? false : paraRecusar.has(doc.id);
                const rowBg = assinando ? 'var(--row-selected-blue)' : recusando ? 'var(--row-selected-red)' : i % 2 === 1 ? 'var(--bg-subtle)' : 'white';
                const tipoV   = tipoAssMap[doc.id]   ?? 'ICP Brasil';
                const padraoV = padraoAssMap[doc.id] ?? 'PAdES';
                return (
                  <tr key={doc.id} style={{ background: rowBg, transition: 'background 0.12s' }}>
                    {/*  Assinar */}
                    <td style={{ padding: '12px 14px', textAlign: 'center', borderBottom: '1px solid var(--neutral-light-medium)' }}>
                      <div
                        onClick={() => !readOnly && toggleDoc(doc.id, 'assinar')}
                        style={{ width: 20, height: 20, borderRadius: 5, border: `2px solid ${assinando ? 'var(--primary-pure)' : 'var(--neutral-dark-up)'}`, background: assinando ? 'var(--primary-pure)' : 'white', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', cursor: readOnly ? 'default' : 'pointer', transition: 'all 0.12s' }}
                      >
                        {assinando && <FAIcon icon="fa-solid fa-check" style={{ fontSize: 10, color: 'white' }} />}
                      </div>
                    </td>
                    {/*  Recusar */}
                    <td style={{ padding: '12px 14px', textAlign: 'center', borderBottom: '1px solid var(--neutral-light-medium)' }}>
                      <div
                        onClick={() => !readOnly && toggleDoc(doc.id, 'recusar')}
                        style={{ width: 20, height: 20, borderRadius: 5, border: `2px solid ${recusando ? 'var(--error-color)' : 'var(--neutral-dark-up)'}`, background: recusando ? 'var(--error-color)' : 'white', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', cursor: readOnly ? 'default' : 'pointer', transition: 'all 0.12s' }}
                      >
                        {recusando && <FAIcon icon="fa-solid fa-xmark" style={{ fontSize: 10, color: 'white' }} />}
                      </div>
                    </td>
                    {/* Tipo assinatura */}
                    <td style={{ padding: '8px 14px', borderBottom: '1px solid var(--neutral-light-medium)' }}>
                      {readOnly ? (
                        <span style={{ fontSize: 13, color: 'var(--neutral-dark-pure)' }}>{tipoV}</span>
                      ) : (
                        <select
                          value={tipoV}
                          onChange={e => setTipoAssMap(m => ({ ...m, [doc.id]: e.target.value }))}
                          style={{ height: 32, border: '1px solid var(--neutral-light-down)', borderRadius: 6, padding: '0 8px', fontSize: 12, color: 'var(--neutral-dark-pure)', outline: 'none', background: 'white', width: '100%' }}
                        >
                          <option>ICP Brasil</option>
                          <option>Sistema</option>
                        </select>
                      )}
                    </td>
                    {/* Padrão */}
                    <td style={{ padding: '8px 14px', borderBottom: '1px solid var(--neutral-light-medium)' }}>
                      {readOnly ? (
                        <span style={{ fontSize: 13, color: 'var(--neutral-dark-pure)' }}>{padraoV}</span>
                      ) : (
                        <select
                          value={padraoV}
                          onChange={e => setPadraoAssMap(m => ({ ...m, [doc.id]: e.target.value }))}
                          style={{ height: 32, border: '1px solid var(--neutral-light-down)', borderRadius: 6, padding: '0 8px', fontSize: 12, color: 'var(--neutral-dark-pure)', outline: 'none', background: 'white', width: '100%' }}
                        >
                          <option>PAdES</option>
                          <option>CAdES</option>
                          <option>XAdES</option>
                        </select>
                      )}
                    </td>
                    {/* Nome documento */}
                    <td style={{ padding: '12px 14px', borderBottom: '1px solid var(--neutral-light-medium)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <FAIcon icon="fa-regular fa-file-pdf" style={{ fontSize: 14, color: 'var(--error-color)', flexShrink: 0 }} />
                        <div>
                          <div style={{ fontWeight: 700, fontSize: 13, color: 'var(--primary-pure)', cursor: 'pointer', textDecoration: 'underline' }}>{doc.nome}</div>
                          <div style={{ fontSize: 11, color: 'var(--neutral-dark-medium)' }}>{doc.tipo}  {doc.paginas}p  {doc.tamanho}</div>
                        </div>
                      </div>
                    </td>
                    {/* Usurio insero */}
                    <td style={{ padding: '12px 14px', borderBottom: '1px solid var(--neutral-light-medium)', fontSize: 13, color: 'var(--neutral-dark-down)', whiteSpace: 'nowrap' }}>
                      Sistema Solar BPM
                    </td>
                    {/* Data insero */}
                    <td style={{ padding: '12px 14px', borderBottom: '1px solid var(--neutral-light-medium)', fontSize: 13, color: 'var(--neutral-dark-down)', whiteSpace: 'nowrap' }}>
                      {`0${i + 1}/04/2026`}
                    </td>
                    {/* Visualizar */}
                    <td style={{ padding: '8px 14px', borderBottom: '1px solid var(--neutral-light-medium)', textAlign: 'center' }}>
                      <button
                        style={{ width: 32, height: 32, border: '1px solid var(--neutral-light-down)', borderRadius: 6, background: 'white', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: 'var(--neutral-dark-down)' }}
                        onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = 'var(--primary-bg-hover)'; (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--primary-pure)'; (e.currentTarget as HTMLButtonElement).style.color = 'var(--primary-pure)'; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'white'; (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--neutral-light-down)'; (e.currentTarget as HTMLButtonElement).style.color = 'var(--neutral-dark-down)'; }}
                      >
                        <FAIcon icon="fa-regular fa-eye" style={{ fontSize: 13 }} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Parecer */}
        <div>
          <label style={LABEL_STYLE}>
            {t('rpParecer')}
          </label>
          <textarea
            disabled={readOnly}
            value={readOnly ? 'Todos os documentos foram revisados. Concordo com os termos do contrato e apropriei as assinaturas conforme orientado pela unidade responsvel.' : parecer}
            onChange={e => setParecer(e.target.value)}
            placeholder={t('rpParecerPlaceholder')}
            rows={3}
            style={{ width: '100%', boxSizing: 'border-box', background: readOnly ? 'var(--bg-subtle)' : 'white', border: '1px solid var(--neutral-light-down)', borderRadius: 8, padding: '10px 14px', fontSize: 14, color: readOnly ? 'var(--neutral-dark-down)' : 'var(--neutral-dark-pure)', outline: 'none', resize: 'vertical', minHeight: 80 }}
            onFocus={e => { if (!readOnly) (e.currentTarget as HTMLTextAreaElement).style.borderColor = 'var(--primary-pure)'; }}
            onBlur={e => (e.currentTarget as HTMLTextAreaElement).style.borderColor = 'var(--neutral-light-down)'}
          />
        </div>
      </div>
      )} {/* fim template Assinatura */}

      {showConfirmarModal && (
        <ConfirmarAssinaturaModal
          onClose={() => setShowConfirmarModal(false)}
          onConfirmar={onConcluir}
        />
      )}

      {/*  TEMPLATE: Comunique-se  */}
      {tipo === 'Comunique-se' && (
        <div style={{ background: 'white', border: '1px solid var(--card-border)', borderRadius: 10, padding: 24, boxShadow: '0px 4px 12px rgba(24,39,75,0.08)', display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <h2 style={{ fontWeight: 700, fontSize: 16, color: 'var(--neutral-ink-strong)', margin: 0 }}>Responder comunicado</h2>
            <p style={{ fontSize: 13, color: 'var(--neutral-dark-down)', margin: '4px 0 0 0', lineHeight: 1.5 }}>
              {readOnly ? 'Resposta enviada. Esta pendncia j foi concluda.' : 'Preencha os campos abaixo para responder ao comunicado da unidade.'}
            </p>
          </div>
          {/* Mensagem da unidade */}
          <div style={{ background: 'var(--background-color-light)', border: '1px solid var(--card-border)', borderRadius: 8, padding: '14px 16px' }}>
            <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', color: 'var(--neutral-label)', marginBottom: 6 }}>Comunicado da unidade</div>
            <div style={{ fontSize: 14, color: 'var(--neutral-dark-pure)', lineHeight: '22px' }}>
              Prezado(a), solicitamos que informe sobre a documentao de residncia referente ao processo {pendencia?.processo}. Verifique se os documentos apresentados correspondem ao endereo atual e, se necessrio, encaminhe nova documentao atualizada.
            </div>
          </div>
          <DynamicFormRenderer fields={FORM_FIELDS_COMUNIQUE} readOnly={readOnly} />
        </div>
      )}

      {/*  TEMPLATE: Verificar informaes  */}
      {tipo === 'Verificar informações' && (() => {
        const campos = [
          { id: 'nome',      label: 'Nome completo',           valor: 'FERNANDO NAIM SCHMITZ' },
          { id: 'cpf',       label: 'CPF',                     valor: '006.334.989-20' },
          { id: 'endereco',  label: 'Endereço',                valor: 'Rua das Flores, 123  Bairro Centro, Florianpolis  SC' },
          { id: 'telefone',  label: 'Telefone de contato',     valor: '(48) 99123-4567' },
          { id: 'email',     label: 'E-mail',                  valor: 'fernando.schmitz@email.com' },
        ];
        const toggleItem = (id: string) => {
          setItensVerificados(prev => { const next = new Set(prev); next.has(id) ? next.delete(id) : next.add(id); return next; });
        };
        return (
          <div style={{ background: 'white', border: '1px solid var(--card-border)', borderRadius: 10, padding: 24, boxShadow: '0px 4px 12px rgba(24,39,75,0.08)', display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <h2 style={{ fontWeight: 700, fontSize: 16, color: 'var(--neutral-ink-strong)', margin: 0 }}>Verificar informaes cadastrais</h2>
              <p style={{ fontSize: 13, color: 'var(--neutral-dark-down)', margin: '4px 0 0 0', lineHeight: 1.5 }}>
                {readOnly ? 'Informaes verificadas. Esta pendncia j foi concluda.' : 'Confirme se as informaes abaixo esto corretas. Marque cada item verificado.'}
              </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {campos.map(c => {
                const checked = readOnly || itensVerificados.has(c.id);
                return (
                  <div key={c.id} onClick={() => !readOnly && toggleItem(c.id)} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '12px 16px', background: checked ? 'var(--success-bg-light)' : 'white', border: `1.5px solid ${checked ? 'var(--success-border-light)' : 'var(--card-border)'}`, borderRadius: 8, cursor: readOnly ? 'default' : 'pointer', transition: 'all 0.12s' }}>
                    <div style={{ width: 22, height: 22, borderRadius: 6, border: `2px solid ${checked ? 'var(--success-color)' : 'var(--neutral-dark-up)'}`, background: checked ? 'var(--success-color)' : 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      {checked && <FAIcon icon="fa-solid fa-check" style={{ fontSize: 11, color: 'white' }} />}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--neutral-label)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 2 }}>{c.label}</div>
                      <div style={{ fontSize: 14, color: 'var(--neutral-ink)', fontWeight: 500 }}>{c.valor}</div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div>
              <label style={LABEL_STYLE}>Observaes (opcional)</label>
              <textarea
                disabled={readOnly}
                value={readOnly ? 'Todos os dados foram verificados e esto corretos. Nenhuma divergncia encontrada.' : observacao}
                onChange={e => setObservacao(e.target.value)}
                placeholder="Informe se h alguma divergncia ou correo necessria..."
                rows={3}
                style={{ width: '100%', boxSizing: 'border-box', background: readOnly ? 'var(--bg-subtle)' : 'white', border: '1px solid var(--neutral-light-down)', borderRadius: 8, padding: '10px 14px', fontSize: 14, color: readOnly ? 'var(--neutral-dark-down)' : 'var(--neutral-dark-pure)', outline: 'none', resize: 'vertical' }}
                onFocus={e => { if (!readOnly) (e.currentTarget as HTMLTextAreaElement).style.borderColor = 'var(--primary-pure)'; }}
                onBlur={e => (e.currentTarget as HTMLTextAreaElement).style.borderColor = 'var(--neutral-light-down)'}
              />
            </div>
          </div>
        );
      })()}

      {/*  TEMPLATE: Anlise de documentos  */}
      {tipo === 'Análise de documentos' && (
        <div style={{ background: 'white', border: '1px solid var(--card-border)', borderRadius: 10, padding: 24, boxShadow: '0px 4px 12px rgba(24,39,75,0.08)', display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <h2 style={{ fontWeight: 700, fontSize: 16, color: 'var(--neutral-ink-strong)', margin: 0 }}>Anlise de documentos</h2>
            <p style={{ fontSize: 13, color: 'var(--neutral-dark-down)', margin: '4px 0 0 0', lineHeight: 1.5 }}>
              {readOnly ? 'Anlise concluda. Veja o resultado abaixo.' : 'Preencha os campos de anlise tcnica e emita seu parecer.'}
            </p>
          </div>
          {/* Documentos para reviso */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              { nome: 'Parecer tcnico de vistoria',      paginas: 8,  status: readOnly ? 'Aprovado'     : null },
              { nome: 'Laudo de conformidade ambiental',  paginas: 14, status: readOnly ? 'Aprovado'     : null },
              { nome: 'Planta de situação do terreno',    paginas: 3,  status: readOnly ? 'Em ressalva'  : null },
            ].map((doc) => (
              <div key={doc.nome} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px', background: 'var(--bg-subtle)', border: '1px solid var(--neutral-light-medium)', borderRadius: 8 }}>
                <FAIcon icon="fa-regular fa-file-pdf" style={{ fontSize: 16, color: 'var(--error-color)', flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: 13, color: 'var(--neutral-ink-strong)' }}>{doc.nome}</div>
                  <div style={{ fontSize: 11, color: 'var(--neutral-dark-medium)' }}>PDF  {doc.paginas} pginas</div>
                </div>
                {doc.status ? (
                  <span style={{ fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 100, background: doc.status === 'Aprovado' ? 'var(--success-bg)' : 'var(--warning-bg)', color: doc.status === 'Aprovado' ? 'var(--success-color)' : 'var(--warning-color)', whiteSpace: 'nowrap' }}>{doc.status}</span>
                ) : (
                  <button style={{ height: 30, padding: '0 10px', border: '1.5px solid var(--primary-pure)', borderRadius: 6, background: 'white', color: 'var(--primary-pure)', fontWeight: 600, fontSize: 12, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                    <FAIcon icon="fa-regular fa-eye" style={{ fontSize: 11 }} />
                    Visualizar
                  </button>
                )}
              </div>
            ))}
          </div>
          <div style={{ height: 1, background: 'var(--neutral-light-medium)' }} />
          <DynamicFormRenderer fields={FORM_FIELDS_ANALISE} readOnly={readOnly} />
        </div>
      )}

      {/*  TEMPLATE: Complementar dados  */}
      {tipo === 'Complementar dados' && (
        <div style={{ background: 'white', border: '1px solid var(--card-border)', borderRadius: 10, padding: 24, boxShadow: '0px 4px 12px rgba(24,39,75,0.08)', display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <h2 style={{ fontWeight: 700, fontSize: 16, color: 'var(--neutral-ink-strong)', margin: 0 }}>Complementar dados do processo</h2>
            <p style={{ fontSize: 13, color: 'var(--neutral-dark-down)', margin: '4px 0 0 0', lineHeight: 1.5 }}>
              {readOnly ? 'Dados complementados. Esta pendncia j foi concluda.' : 'Anexe a documentao solicitada e descreva as informaes adicionais necessrias.'}
            </p>
          </div>
          {/* O que foi solicitado */}
          <div style={{ background: 'var(--warning-bg)', border: '1px solid var(--warning-border-light)', borderRadius: 8, padding: '12px 16px', display: 'flex', alignItems: 'flex-start', gap: 10 }}>
            <FAIcon icon="fa-regular fa-triangle-exclamation" style={{ fontSize: 14, color: 'var(--warning-color)', flexShrink: 0, marginTop: 2 }} />
            <div style={{ fontSize: 13, color: 'var(--warning-deep)', lineHeight: '20px' }}>
              <strong>Documentao solicitada:</strong> Comprovante de endereo atualizado (emitido nos ltimos 90 dias) e comprovante de renda dos ltimos 3 meses.
            </div>
          </div>
          {/* Upload */}
          <div>
            <label style={LABEL_STYLE}>Documentos anexados</label>
            {readOnly ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {['comprovante_endereco.pdf', 'comprovante_renda_mar2026.pdf'].map((f) => (
                  <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', background: 'var(--bg-subtle)', border: '1px solid var(--neutral-light-medium)', borderRadius: 8 }}>
                    <FAIcon icon="fa-regular fa-file-pdf" style={{ fontSize: 16, color: 'var(--error-color)' }} />
                    <span style={{ fontSize: 13, color: 'var(--neutral-dark-pure)', flex: 1 }}>{f}</span>
                    <span style={{ fontSize: 10, fontWeight: 600, color: 'var(--success-color)', background: 'var(--success-bg)', borderRadius: 4, padding: '2px 8px' }}>Enviado</span>
                  </div>
                ))}
              </div>
            ) : (
              <label style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '24px 16px', border: '2px dashed var(--card-border-hover)', borderRadius: 10, background: 'var(--bg-subtle)', cursor: 'pointer' }}>
                <FAIcon icon="fa-regular fa-cloud-arrow-up" style={{ fontSize: 28, color: 'var(--primary-pure)' }} />
                <div style={{ fontSize: 13, color: 'var(--primary-pure)', fontWeight: 600 }}>
                  {docComplementar || 'Clique para selecionar ou arraste os arquivos aqui'}
                </div>
                <div style={{ fontSize: 11, color: 'var(--neutral-dark-medium)' }}>PDF, DOCX, JPG at 10 MB</div>
                <input type="file" style={{ display: 'none' }} onChange={e => setDocComplementar(e.target.files?.[0]?.name || '')} />
              </label>
            )}
          </div>
          {/* Observaes */}
          <div>
            <label style={LABEL_STYLE}>Informaes adicionais</label>
            <textarea
              disabled={readOnly}
              value={readOnly ? 'Documentos enviados conforme solicitação. O comprovante de endereo  referente ao ms de maro/2026 e o comprovante de renda cobre o trimestre de janeiro a maro de 2026.' : observacao}
              onChange={e => setObservacao(e.target.value)}
              placeholder="Descreva informaes adicionais que julgar pertinentes..."
              rows={3}
              style={{ width: '100%', boxSizing: 'border-box', background: readOnly ? 'var(--bg-subtle)' : 'white', border: '1px solid var(--neutral-light-down)', borderRadius: 8, padding: '10px 14px', fontSize: 14, color: readOnly ? 'var(--neutral-dark-down)' : 'var(--neutral-dark-pure)', outline: 'none', resize: 'vertical' }}
              onFocus={e => { if (!readOnly) (e.currentTarget as HTMLTextAreaElement).style.borderColor = 'var(--primary-pure)'; }}
              onBlur={e => (e.currentTarget as HTMLTextAreaElement).style.borderColor = 'var(--neutral-light-down)'}
            />
          </div>
        </div>
      )}

      {/*  Barra de aes (apenas em modo edio)  */}
      {!readOnly && (
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, flexWrap: 'wrap' }}>
          <button
            onClick={onVoltar}
            style={{ height: 44, padding: '0 20px', borderRadius: 8, background: 'white', border: '1.5px solid var(--neutral-light-down)', color: 'var(--neutral-dark-down)', fontWeight: 600, fontSize: 14, cursor: 'pointer' }}
            onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.background = 'var(--background-color-light)'}
            onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.background = 'white'}
          >
            {t('rpCancelar')}
          </button>
          <button
            onClick={tipo === 'Assinatura de documentos' ? () => setShowConfirmarModal(true) : onConcluir}
            style={{ height: 44, padding: '0 24px', borderRadius: 8, background: 'var(--primary-pure)', border: '1.5px solid var(--primary-pure)', color: 'white', fontWeight: 700, fontSize: 14, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 8, boxShadow: '0px 2px 6px rgba(0,88,219,0.24)' }}
            onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.background = 'var(--primary-pure-hover)'}
            onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.background = 'var(--primary-pure)'}
          >
            <FAIcon icon={tipo === 'Assinatura de documentos' ? 'fa-regular fa-signature' : 'fa-regular fa-circle-check'} style={{ fontSize: 15 }} />
            {tipo === 'Assinatura de documentos' ? 'Concluir assinaturas' : t('rpConcluir')}
          </button>
        </div>
      )}

      {/*  Boto de retorno em modo leitura  */}
      {readOnly && (
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button
            onClick={onVoltar}
            style={{ height: 44, padding: '0 24px', borderRadius: 8, background: 'white', border: '1.5px solid var(--neutral-light-down)', color: 'var(--neutral-dark-down)', fontWeight: 600, fontSize: 14, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 8 }}
            onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.background = 'var(--background-color-light)'}
            onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.background = 'white'}
          >
            <FAIcon icon="fa-regular fa-arrow-left" style={{ fontSize: 13 }} />
            Voltar s pendncias
          </button>
        </div>
      )}
    </div>
  );
}





