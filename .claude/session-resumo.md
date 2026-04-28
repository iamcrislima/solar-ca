# Solar BPM / FloripaOn — Resumo da sessão (2026-04-23)

## Projeto
- **Repo:** `iamcrislima/solar-ca` (GitHub)
- **Deploy:** Vercel (auto-deploy no push para `main`)
- **Arquivo principal:** `C:\Users\cristianderson.lima\solar-bpm\src\App.tsx` (~5300+ linhas)
- **Stack:** React 19 + TypeScript + Vite + `@1doc/1ds-react` + FontAwesome Pro

## O que já foi feito nesta sessão
- Versão mobile completa: `MobileHeader`, `MobileDrawer`, `MobileBottomNav`, layouts responsivos
- Ícones por aba em `MobileBottomNav`, safe area iOS
- `IsMobileContext` + `useIsMobile()` hook (breakpoint: 768px)
- Logo Solar BPM light no sidebar
- Login por certificado digital no `LoginModal`
- `CatServicos` com cards verticais
- `ProcessosLiberados` com botão "Ver anexos"
- `ProcessoDetalhe` com banner verde quando vindo de liberado + tab inicial
- `DespachoModal` (ícone olho na tabela de tramitações)
- `SearchableSelect` combobox com busca integrada
- Campo "ano" mais estreito nos campos segmentados
- Banner de aviso na aba Documentos

## Tarefas pendentes (4 correções do último pedido do usuário)

### 1. ✅ INICIADA — `createPortal` import adicionado
Linha 2 do App.tsx já tem:
```tsx
import { createPortal } from 'react-dom';
```

### 2. ❌ Logo filenames errados
**Collapsed sidebar** (linha ~1278): trocar por `/Logo compacta.png`
**Expanded sidebar** (linha ~1274): trocar por `/Logo completa.png`
**MobileDrawer footer** (linha ~5047): trocar por `/Logo completa.png`

Código atual (linhas 1264–1282):
```tsx
{expanded ? (
  <img src="/solarBPM_principal_horizontal_fundoclaro.png" alt="SolarBPM"
    style={{ height: 28, objectFit: 'contain', maxWidth: '100%' }} />
) : (
  <div style={{ width: 24, height: 24, overflow: 'hidden', flexShrink: 0 }}>
    <img src="/solarBPM_principal_horizontal_fundoclaro.png" alt="SolarBPM"
      style={{ height: 24, maxWidth: 'none', objectFit: 'cover', objectPosition: 'left center' }} />
  </div>
)}
```
Deve virar:
```tsx
{expanded ? (
  <img src="/Logo completa.png" alt="SolarBPM"
    style={{ height: 28, objectFit: 'contain', maxWidth: '100%' }} />
) : (
  <img src="/Logo compacta.png" alt="SolarBPM"
    style={{ height: 28, objectFit: 'contain' }} />
)}
```

### 3. ❌ ServiceCard — ícone por card, não por item
Linha ~1376–1393. Remover `<FAIcon icon="fa-regular fa-file-lines" .../>` de cada item.
Adicionar prop `icon` ao componente e renderizar UMA vez no cabeçalho do card.

Chamada na HomePage (linhas 4906–4907):
```tsx
<ServiceCard title={t('emDestaque')}    items={featuredServices} icon="fa-regular fa-star" />
<ServiceCard title={t('maisAcessados')} items={popularServices}  icon="fa-regular fa-fire" />
```

### 4. ❌ Search bars — compactar (não flex full-width)
Nos containers `display: 'inline-flex'` do `ConsultaProcessos` e `ConsultaDocumentos` (desktop),
adicionar `alignSelf: 'flex-start'` para não esticar full-width dentro do flex column pai.

Linhas afetadas:
- ConsultaProcessos (~linha 1718): `<div style={{ display: 'inline-flex', alignItems: 'stretch', border: '1.5px solid #0058db', ... }}`
- ConsultaDocumentos (~linha 1741): mesmo padrão para o campo "Número do processo"
- ConsultaDocumentos (~linha 1741): mesmo padrão para o campo "Código do documento"

### 5. ❌ SearchableSelect — dropdown bugado (clipped por overflow:hidden)
**Problema:** dropdown usa `position: 'absolute'` mas o pai tem `overflow: 'hidden'`, cortando o menu.
**Solução:** usar `createPortal` + `getBoundingClientRect()`.

Código da função SearchableSelect (linha ~1471) deve ser refatorado para:
```tsx
function SearchableSelect({ label, value, onChange, options, placeholder, width }: {
  label: string; value: string; onChange: (v: string) => void;
  options: string[]; placeholder?: string; width?: number;
}) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const ref = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [dropPos, setDropPos] = useState({ top: 0, left: 0, width: 0 });

  useEffect(() => {
    function onOut(e: MouseEvent) {
      if (
        ref.current && !ref.current.contains(e.target as Node) &&
        !(dropdownRef.current && dropdownRef.current.contains(e.target as Node))
      ) setOpen(false);
    }
    document.addEventListener('mousedown', onOut);
    return () => document.removeEventListener('mousedown', onOut);
  }, []);

  function handleOpen() {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setDropPos({ top: rect.bottom + 4, left: rect.left, width: Math.max(rect.width, 200) });
    }
    setOpen(o => !o);
    setSearch('');
  }

  const filtered = options.filter(o => o.toLowerCase().includes(search.toLowerCase()));
  const selected = value || (placeholder ?? options[0]);
  const isPlaceholder = !value;

  return (
    <div ref={ref} style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: 2, flex: 'none', width: width ?? undefined, borderRight: '1px solid #b3c7e6', padding: '8px 14px' }}>
      <label style={{ fontFamily: 'Open Sans, sans-serif', fontWeight: 700, fontSize: 10, color: '#8a9ab5', letterSpacing: '0.07em', textTransform: 'uppercase', lineHeight: '14px' }}>{label}</label>
      <div ref={triggerRef} onClick={handleOpen} style={{ display: 'flex', alignItems: 'center', gap: 4, cursor: 'pointer', minWidth: 0 }}>
        <span style={{ fontFamily: 'Open Sans, sans-serif', fontSize: 15, color: isPlaceholder ? '#a3a3a3' : '#222', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', flex: 1 }}>
          {selected}
        </span>
        <FAIcon icon="fa-regular fa-chevron-down" style={{ fontSize: 11, color: '#8a9ab5', flexShrink: 0 }} />
      </div>
      {open && createPortal(
        <div ref={dropdownRef} style={{ position: 'fixed', top: dropPos.top, left: dropPos.left, minWidth: dropPos.width, zIndex: 9999, background: 'white', border: '1.5px solid #0058db', borderRadius: 8, boxShadow: '0px 8px 24px rgba(0,0,0,0.12)', overflow: 'hidden' }}>
          <div style={{ padding: '8px 10px', borderBottom: '1px solid #f0f0f0' }}>
            <input autoFocus value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar..." style={{ width: '100%', border: '1px solid #dce6f5', borderRadius: 6, padding: '5px 8px', fontFamily: 'Open Sans, sans-serif', fontSize: 13, outline: 'none', background: '#f8f9fb', color: '#333' }} />
          </div>
          <div style={{ maxHeight: 180, overflowY: 'auto' }}>
            {filtered.map(o => (
              <div key={o} onClick={() => { onChange(o); setOpen(false); setSearch(''); }}
                style={{ padding: '9px 14px', fontFamily: 'Open Sans, sans-serif', fontSize: 14, color: o === value ? '#0058db' : '#333', fontWeight: o === value ? 700 : 400, cursor: 'pointer', background: o === value ? '#edf2ff' : 'white' }}
                onMouseEnter={e => { if (o !== value) (e.currentTarget as HTMLDivElement).style.background = '#f0f5ff'; }}
                onMouseLeave={e => { if (o !== value) (e.currentTarget as HTMLDivElement).style.background = 'white'; }}
              >
                {o}
              </div>
            ))}
            {filtered.length === 0 && (
              <div style={{ padding: '12px 14px', fontFamily: 'Open Sans, sans-serif', fontSize: 13, color: '#a3a3a3', textAlign: 'center' }}>Nenhum resultado</div>
            )}
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
```

Após corrigir SearchableSelect, aplicar também ao ConsultaProcessos — substituir os `SelectSegment` de órgão e procedência por `SearchableSelect` (já está feito, linhas 1719–1720).

## Padrões do projeto (Arthas)
- Inline styles apenas (`React.CSSProperties`)
- `const t = useT()` em todo componente que usa strings
- FAIcon com `dangerouslySetInnerHTML` para ícones FA
- Routing via `useState` (sem react-router)
- `LangContext` PT/EN
- `IsMobileContext` para responsivo
- Cards com hover em listas, nunca tabelas
- `Fragment` importado explicitamente quando precisa de `key`
