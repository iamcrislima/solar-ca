import React, { Fragment } from 'react';
import { useT, useIsMobile } from '../i18n';
import { Servico } from '../types';
import FAIcon from '../components/FAIcon';
//  Tela: Detalhe do serviço 
export default function ServicoDetalhe({ service, onNavigateForm }: {
  service: Servico;
  onNavigateForm: (service: Servico) => void;
}) {
  const t = useT();
  const isMobile = useIsMobile();

  const descricoesPorCategoria: Record<string, string> = {
    'Impostos e taxas':                    'serviço relacionado  emisso, consulta e pagamento de impostos e taxas municipais. Facilita o cumprimento das obrigaes fiscais de forma digital, sem necessidade de comparecimento presencial.',
    'Alvars, autorizaes e licenças':    'Emisso e renovao de alvars, autorizaes e licenças municipais de forma eletrnica. Agilize a regularizao da sua atividade ou obra com segurana e praticidade.',
    'Certides, declaraes e documentos': 'Solicite certides, declaraes e documentos oficiais emitidos pela Prefeitura Municipal. O processo  totalmente digital e os documentos possuem validade jurdica.',
    'Assistncia social':                  'Acesso a serviços de assistncia social e proteo social oferecidos pelo municpio. Atendimento humanizado voltado ao bem-estar e  incluso social dos cidados.',
    'Obras e urbanismo':                   'serviços relacionados a projetos, aprovaes e fiscalizao de obras no municpio. Regularize sua construo respeitando as normas urbansticas vigentes.',
    'Meio ambiente':                       'serviços ambientais para preservao e proteo do meio ambiente municipal. Contribua com a sustentabilidade e o equilbrio ecolgico de Florianpolis.',
    'Sade':                               'Acesso a serviços de sade pblica municipal, incluindo agendamentos, vacinao e vigilncia sanitria. Cuide da sua sade com os servios do municpio.',
    'Solicitaes':                        'Registre solicitaes de serviços municipais de forma prtica e acompanhe o andamento em tempo real atravs da plataforma digital.',
    'Comrcio e serviços':                 'Regularize e gerencie sua atividade comercial ou de prestao de serviços no município de Florianópolis de forma digital e segura.',
  };

  const desc = descricoesPorCategoria[service.categoria]
    ?? 'Solicite este serviço municipal de forma digital, com acompanhamento em tempo real do andamento do seu pedido atravs da plataforma FloripaOn.';

  const steps = [
    'Preencha o formulrio de solicitação com seus dados pessoais',
    'Informe os detalhes especficos do serviço solicitado',
    'Anexe os documentos necessrios conforme a lista indicada',
    'Envie a solicitação e aguarde anlise pelo rgo responsvel',
    'Acompanhe o status em "Meus processos" na plataforma',
  ];

  const docs = [
    'Documento de identificao com foto (RG, CNH ou passaporte)',
    'CPF (pode estar no documento de identificao)',
    'Comprovante de residncia emitido nos ltimos 3 meses',
    'Documentos especficos conforme o tipo de serviço',
  ];

  const linksRelacionados = [
    { label: 'Legislao municipal  Lei n 12.345/2022', url: '#' },
    { label: 'Regulamento de alvars e licenças', url: '#' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, padding: isMobile ? '16px 16px 80px 16px' : '24px 24px 48px 24px' }}>

      {/* Cabealho */}
      <div style={{ background: 'white', border: '1px solid var(--card-border)', borderRadius: 10, padding: isMobile ? '20px' : 28, boxShadow: '0px 4px 12px rgba(24,39,75,0.10)' }}>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 12 }}>
          <span style={{ background: 'var(--primary-light)', color: 'var(--primary-pure)', borderRadius: 100, padding: '3px 12px', fontWeight: 600, fontSize: 12 }}>{service.categoria}</span>
          {service.destino.map(d => (
            <span key={d} style={{ background: 'var(--neutral-light-medium)', color: 'var(--neutral-dark-down)', borderRadius: 100, padding: '3px 12px', fontWeight: 600, fontSize: 12 }}>{d}</span>
          ))}
          {'agrupado' in service && service.agrupado && (
            <span style={{ background: 'var(--badge-simplified-bg)', color: 'var(--badge-simplified-color)', borderRadius: 100, padding: '3px 12px', fontWeight: 600, fontSize: 12 }}>{t('solSimplificado')}</span>
          )}
        </div>
        <h1 style={{ fontWeight: 700, fontSize: isMobile ? 20 : 28, color: 'var(--neutral-ink-strong)', margin: '0 0 8px 0' }}>{service.servico}</h1>
        <p style={{ fontSize: 14, color: 'var(--neutral-dark-down)', margin: '0 0 20px 0', lineHeight: '22px' }}>
          {service.setor}
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
          <button
            onClick={() => onNavigateForm(service)}
            style={{ height: 44, padding: '0 32px', border: 'none', borderRadius: 8, background: 'var(--primary-pure)', color: 'white', fontWeight: 700, fontSize: 15, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, transition: 'background 0.12s' }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = 'var(--primary-pure-hover)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'var(--primary-pure)'; }}
          >
            <FAIcon icon="fa-regular fa-paper-plane" style={{ fontSize: 15 }} />
            Solicitar servio
          </button>
          <button
            onClick={() => window.print()}
            style={{ height: 44, padding: '0 20px', border: '1.5px solid var(--neutral-light-down)', borderRadius: 8, background: 'white', color: 'var(--neutral-dark-down)', fontWeight: 600, fontSize: 14, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, transition: 'all 0.12s' }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--primary-pure)'; (e.currentTarget as HTMLButtonElement).style.color = 'var(--primary-pure)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--neutral-light-down)'; (e.currentTarget as HTMLButtonElement).style.color = 'var(--neutral-dark-down)'; }}
          >
            <FAIcon icon="fa-regular fa-file-arrow-down" style={{ fontSize: 14 }} />
            {t('exportarDescritivo')}
          </button>
        </div>
      </div>

      {/* Modo agrupado: renderiza HTML */}
      {'agrupado' in service && service.agrupado ? (
        <div style={{ background: 'white', border: '1px solid var(--card-border)', borderRadius: 10, padding: 28 }}>
          <div dangerouslySetInnerHTML={{ __html: service.htmlContent ?? '' }} />
        </div>
      ) : (
        <>
          {/* Box principal */}
          <div style={{ background: 'white', border: '1px solid var(--card-border)', borderRadius: 10, padding: 24, display: 'flex', flexDirection: 'column', gap: 24 }}>

            {/* O que  */}
            <div>
              <h2 style={{ fontWeight: 700, fontSize: 17, color: 'var(--colors-neutral-01)', margin: '0 0 10px 0', display: 'flex', alignItems: 'center', gap: 8 }}>
                <FAIcon icon="fa-regular fa-circle-info" style={{ fontSize: 15, color: 'var(--primary-pure)' }} />
                O que  este serviço?
              </h2>
              <p style={{ fontSize: 14, color: 'var(--neutral-dark-pure)', margin: 0, lineHeight: '23px' }}>{desc}</p>
            </div>

            <div style={{ height: 1, background: 'var(--neutral-light-medium)' }} />

            {/* Informaes */}
            <div>
              <h2 style={{ fontWeight: 700, fontSize: 17, color: 'var(--colors-neutral-01)', margin: '0 0 12px 0', display: 'flex', alignItems: 'center', gap: 8 }}>
                <FAIcon icon="fa-regular fa-clock" style={{ fontSize: 15, color: 'var(--primary-pure)' }} />
                Informaes
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', gap: 12 }}>
                {[
                  { label: 'Prazo de atendimento', value: 'At 30 dias teis', icon: 'fa-regular fa-calendar' },
                  { label: 'Custo',                value: 'Gratuito',          icon: 'fa-regular fa-circle-check' },
                  { label: 'rgo responsvel',    value: service.setor.split('/')[0], icon: 'fa-regular fa-building' },
                  { label: 'Setor',                value: service.setor.split('/').pop() ?? '', icon: 'fa-regular fa-sitemap' },
                ].map((info) => (
                  <div key={info.label} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', background: 'var(--bg-subtle)', borderRadius: 8, padding: '10px 14px' }}>
                    <FAIcon icon={info.icon} style={{ fontSize: 14, color: 'var(--neutral-dark-medium)', marginTop: 2, flexShrink: 0 }} />
                    <div>
                      <div style={{ fontWeight: 600, fontSize: 11, color: 'var(--neutral-dark-medium)', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 2 }}>{info.label}</div>
                      <div style={{ fontSize: 13, color: 'var(--neutral-dark-pure)', fontWeight: 600 }}>{info.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ height: 1, background: 'var(--neutral-light-medium)' }} />

            {/* Como solicitar */}
            <div>
              <h2 style={{ fontWeight: 700, fontSize: 17, color: 'var(--colors-neutral-01)', margin: '0 0 14px 0', display: 'flex', alignItems: 'center', gap: 8 }}>
                <FAIcon icon="fa-regular fa-list-check" style={{ fontSize: 15, color: 'var(--primary-pure)' }} />
                Como solicitar?
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {steps.map((step, i) => (
                  <div key={step} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                    <div style={{ width: 26, height: 26, borderRadius: '50%', background: 'var(--primary-pure)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
                      <span style={{ fontWeight: 700, fontSize: 11, color: 'white' }}>{i + 1}</span>
                    </div>
                    <p style={{ fontSize: 14, color: 'var(--neutral-dark-pure)', margin: 0, lineHeight: '22px', paddingTop: 2 }}>{step}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Box Documentos necessrios */}
          <div style={{ background: 'white', border: '1px solid var(--card-border)', borderRadius: 10, padding: 24 }}>
            <h2 style={{ fontWeight: 700, fontSize: 17, color: 'var(--colors-neutral-01)', margin: '0 0 14px 0', display: 'flex', alignItems: 'center', gap: 8 }}>
              <FAIcon icon="fa-regular fa-paperclip" style={{ fontSize: 15, color: 'var(--primary-pure)' }} />
              Documentos necessrios
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {docs.map((doc) => (
                <div key={doc} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', padding: '8px 12px', background: 'var(--bg-subtle)', borderRadius: 8 }}>
                  <FAIcon icon="fa-regular fa-file-check" style={{ fontSize: 14, color: 'var(--primary-pure)', flexShrink: 0, marginTop: 2 }} />
                  <span style={{ fontSize: 13, color: 'var(--neutral-dark-pure)', lineHeight: '20px' }}>{doc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Box Links relacionados */}
          <div style={{ background: 'white', border: '1px solid var(--card-border)', borderRadius: 10, padding: 24 }}>
            <h2 style={{ fontWeight: 700, fontSize: 17, color: 'var(--colors-neutral-01)', margin: '0 0 14px 0', display: 'flex', alignItems: 'center', gap: 8 }}>
              <FAIcon icon="fa-regular fa-link" style={{ fontSize: 15, color: 'var(--primary-pure)' }} />
              Links relacionados
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {linksRelacionados.map((link) => (
                <a key={link.url} href={link.url} style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none', color: 'var(--primary-pure)', fontSize: 14, fontWeight: 600 }}>
                  <FAIcon icon="fa-regular fa-arrow-up-right-from-square" style={{ fontSize: 12, flexShrink: 0 }} />
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Box Fluxo */}
          <div style={{ background: 'white', border: '1px solid var(--card-border)', borderRadius: 10, padding: 24 }}>
            <h2 style={{ fontWeight: 700, fontSize: 17, color: 'var(--colors-neutral-01)', margin: '0 0 14px 0', display: 'flex', alignItems: 'center', gap: 8 }}>
              <FAIcon icon="fa-regular fa-diagram-project" style={{ fontSize: 15, color: 'var(--primary-pure)' }} />
              Fluxo do serviço
            </h2>
            <div style={{ background: 'var(--bg-subtle)', borderRadius: 8, padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 0, overflowX: 'auto' }}>
              {['Protocolo', 'Anlise', 'Aprovao', 'Emisso', 'Entrega'].map((etapa, i, arr) => (
                <Fragment key={etapa}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, flexShrink: 0 }}>
                    <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--primary-pure)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span style={{ fontWeight: 700, fontSize: 13, color: 'white' }}>{i + 1}</span>
                    </div>
                    <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--neutral-dark-pure)', whiteSpace: 'nowrap' }}>{etapa}</span>
                  </div>
                  {i < arr.length - 1 && <div style={{ flex: 1, height: 2, background: 'var(--card-border-hover)', minWidth: 20, marginBottom: 20 }} />}
                </Fragment>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}





