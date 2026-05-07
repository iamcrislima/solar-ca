import React, { useState, useEffect } from 'react';

//  Contexts 
import { LangContext, IsMobileContext } from './i18n';
import type { Lang } from './i18n';

//  Types 
import type { Page, Pendencia, ProcessoLiberado, Servico } from './types';

//  Components 
import LoginModal   from './components/LoginModal';
import Header       from './components/Header';
import SideMenu     from './components/SideMenu';
import Breadcrumb   from './components/Breadcrumb';
import { MobileHeader, MobileDrawer, MobileBottomNav } from './components/Mobile';

//  Pages 
import HomePage             from './pages/HomePage';
import ConsultaProcessos    from './pages/ConsultaProcessos';
import ProcessoDetalhe      from './pages/ProcessoDetalhe';
import ConsultaDocumentos   from './pages/ConsultaDocumentos';
import MeusDados            from './pages/MeusDados';
import MeusProcessos        from './pages/MeusProcessos';
import MinhasPendencias     from './pages/MinhasPendencias';
import ProcessosLiberados   from './pages/ProcessosLiberados';
import ResolverPendencia    from './pages/ResolverPendencia';
import SolicitacaoServicos  from './pages/SolicitacaoServicos';
import CatServicos          from './pages/CatServicos';
import ServicoDetalhe       from './pages/ServicoDetalhe';
import ServicoForm          from './pages/ServicoForm';
import ErrorBoundary        from './components/ErrorBoundary';

//  Componente principal 
export default function App() {
  const [page,              setPage]              = useState<Page>('home');
  const [expanded,          setExpanded]          = useState(false);
  const [showLogin,         setShowLogin]         = useState(false);
  const [isLoggedIn,        setIsLoggedIn]        = useState(false);
  const [lang,              setLang]              = useState<Lang>('pt');
  const [darkMode,          setDarkMode]          = useState(false);
  const [highContrast,      setHighContrast]      = useState(false);
  const [selectedCat,       setSelectedCat]       = useState<{ label: string; icon: string } | null>(null);
  const [selectedService,   setSelectedService]   = useState<Servico | null>(null);
  const [selectedPendencia, setSelectedPendencia] = useState<Pendencia | null>(null);
  const [selectedLiberado,  setSelectedLiberado]  = useState<ProcessoLiberado | null>(null);
  const [isMobile,          setIsMobile]          = useState(() => window.innerWidth < 768);
  const [drawerOpen,        setDrawerOpen]        = useState(false);

  function handleLogin()  { setIsLoggedIn(true);  setShowLogin(false); }
  function handleLogout() { setIsLoggedIn(false); setPage('home'); setDrawerOpen(false); }

  useEffect(() => {
    const check = () => setIsMobile(prev => { const next = window.innerWidth < 768; return prev === next ? prev : next; });
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-dark', darkMode ? 'true' : 'false');
  }, [darkMode]);

  useEffect(() => {
    document.documentElement.setAttribute('data-contrast', highContrast ? 'true' : 'false');
  }, [highContrast]);

  //  Contedo de pgina (compartilhado mobile/desktop) 
  const pageContent = (
    <>
      {page === 'home'       && (
        <HomePage
          onNavigateCat={cat => { setSelectedCat(cat); setPage('cat-servicos'); }}
          isLoggedIn={isLoggedIn}
          onNavigate={setPage}
        />
      )}
      {page === 'consulta'   && (
        <ConsultaProcessos
          onNavigateProcesso={() => { setSelectedLiberado(null); setPage('processo'); }}
        />
      )}
      {page === 'processo'   && (
        <ErrorBoundary fallbackTitle="Erro ao carregar o processo">
          <ProcessoDetalhe
            onVoltar={() => { setSelectedLiberado(null); setPage(selectedLiberado ? 'processosliberados' : 'consulta'); }}
            liberadoItem={selectedLiberado}
            initialTab={selectedLiberado ? 'documentos' : undefined}
          />
        </ErrorBoundary>
      )}
      {page === 'documentos' && <ConsultaDocumentos />}
      {page === 'meusdados'  && <MeusDados />}
      {page === 'meusprocessos' && (
        <MeusProcessos
          onNavigateProcesso={() => { setSelectedLiberado(null); setPage('processo'); }}
        />
      )}
      {page === 'minhaspendencias' && (
        <MinhasPendencias
          onNavigateProcesso={() => setPage('processo')}
          onResolverPendencia={p => { setSelectedPendencia(p); setPage('pendencia-resolver'); }}
        />
      )}
      {page === 'processosliberados' && (
        <ProcessosLiberados
          onVerAnexos={item => { setSelectedLiberado(item); setPage('processo'); }}
        />
      )}
      {page === 'pendencia-resolver' && (
        <ErrorBoundary fallbackTitle="Erro ao carregar a pendência">
          <ResolverPendencia
            pendencia={selectedPendencia}
            onVoltar={() => setPage('minhaspendencias')}
            onConcluir={() => setPage('minhaspendencias')}
          />
        </ErrorBoundary>
      )}
      {page === 'solicitacao' && (
        <SolicitacaoServicos
          onNavigateCat={cat => { setSelectedCat(cat); setPage('cat-servicos'); }}
          onNavigateDetalhe={svc => { setSelectedService(svc); setPage('servico-detalhe'); }}
        />
      )}
      {page === 'cat-servicos' && selectedCat && (
        <CatServicos
          catLabel={selectedCat.label}
          catIcon={selectedCat.icon}
          onNavigateDetalhe={svc => { setSelectedService(svc); setPage('servico-detalhe'); }}
          onNavigateForm={svc => { setSelectedService(svc); setPage('servico-form'); }}
        />
      )}
      {page === 'servico-detalhe' && selectedService && (
        <ServicoDetalhe
          service={selectedService}
          onNavigateForm={svc => { setSelectedService(svc); setPage('servico-form'); }}
        />
      )}
      {page === 'servico-form' && selectedService && (
        <ServicoForm service={selectedService} />
      )}
    </>
  );

  return (
    <LangContext.Provider value={lang}>
      <IsMobileContext.Provider value={isMobile}>
        {showLogin && <LoginModal onClose={() => setShowLogin(false)} onLogin={handleLogin} />}

        {isMobile ? (
          /*  Layout mobile  */
          <div style={{ background: 'var(--background-color-light)', height: '100dvh', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <MobileHeader
              onOpenDrawer={() => setDrawerOpen(true)}
              onLogin={() => setShowLogin(true)}
              isLoggedIn={isLoggedIn}
              onNavigate={setPage}
            />
            <MobileDrawer
              open={drawerOpen}
              onClose={() => setDrawerOpen(false)}
              activePage={page}
              onNavigate={p => { setPage(p); setDrawerOpen(false); }}
              isLoggedIn={isLoggedIn}
              onLogin={() => { setShowLogin(true); setDrawerOpen(false); }}
              onLogout={handleLogout}
              darkMode={darkMode}      onToggleDark={() => setDarkMode(d => !d)}
              highContrast={highContrast} onToggleContrast={() => setHighContrast(c => !c)}
              lang={lang}              onSetLang={setLang}
            />
            <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 'calc(64px + env(safe-area-inset-bottom))' }}>
              {pageContent}
            </div>
            <MobileBottomNav
              activePage={page}
              onNavigate={setPage}
              isLoggedIn={isLoggedIn}
              onLogin={() => setShowLogin(true)}
            />
          </div>
        ) : (
          /*  Layout desktop  */
          <div style={{ background: 'var(--background-color-light)', height: '100vh', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <Header
              onToggle={() => setExpanded(e => !e)}
              onLogin={() => setShowLogin(true)}
              isLoggedIn={isLoggedIn}
              onLogout={handleLogout}
              onNavigate={setPage}
              darkMode={darkMode}
              onToggleDark={() => setDarkMode(d => !d)}
              highContrast={highContrast}
              onToggleContrast={() => setHighContrast(c => !c)}
              lang={lang}
              onSetLang={setLang}
            />
            <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
              <SideMenu
                activePage={page}
                onNavigate={setPage}
                expanded={expanded}
                onLogin={() => setShowLogin(true)}
                isLoggedIn={isLoggedIn}
                onLogout={handleLogout}
              />
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, overflow: 'hidden' }}>
                <Breadcrumb page={page} onNavigate={setPage} selectedCat={selectedCat} selectedService={selectedService} />
                <div style={{ flex: 1, overflowY: 'auto' }}>
                  {pageContent}
                </div>
              </div>
            </div>
          </div>
        )}
      </IsMobileContext.Provider>
    </LangContext.Provider>
  );
}
