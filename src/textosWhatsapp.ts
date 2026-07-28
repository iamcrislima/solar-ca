// ── Textos das telas de autenticação via WhatsApp ────────────────────────────
// Recorte de copy deste fluxo, alimentado pelo MESMO LangContext do portal
// (useLang) — não é um i18n paralelo. Copy PT é a do protótipo de referência
// (docs/referencia/autenticacao-whatsapp.html).
import { useLang } from './i18n';
import type { Lang } from './i18n';

export interface TextosWa {
  // Faixa de contexto
  faixaLabel: string;
  faixaMotivoLogin: string;
  faixaMotivoSessao: string;
  // Tela: entrar
  loginTitulo: string;
  loginSub: string;
  // Tela: senha (título, "Senha", "Esqueci a senha", "Entrar" e "Voltar" vêm do i18n do portal)
  senhaSub: string;
  senhaIdentificador: string;
  senhaIdentificadorPlaceholder: string;
  senhaCampoPlaceholder: string;
  // Validade da SESSÃO — {prazo} é substituído pelo valor derivado do config
  validadeSessao: string;
  validadeSessaoTooltip: string;
  prazoDias: (n: number) => string;
  // Tela: identidade confirmada
  okTitulo: string;
  okValidoAte: (data: string) => string;
  okTextoMobile: string;
  okTextoDesktop: string;
  okBotaoMobile: string;
  okContagem: (s: number) => string;
  okQrLabel: string;
  abrirWhatsappWeb: string;
  // Tela: sessão ainda válida
  sessaoTitulo: string;
  sessaoTexto: (nome: string, cpf: string) => string;
  sessaoBotaoMobile: string;
  sessaoNaoEhVoce: string;
  // Tela: link expirado
  expiradoTitulo: string;
  expiradoTexto: (minutos: number) => string;
  expiradoBotaoMobile: string;
  expiradoNadaPerdido: string;
  // Rodapé do card
  legal: string;
  legalLink: string;
  powered: string;
  // Demonstração / rota inexistente
  estadosTitulo: string;
  estadosSub: string;
  naoEncontradoTitulo: string;
  naoEncontradoTexto: string;
  irParaPortal: string;
}

const PT: TextosWa = {
  faixaLabel: 'Atendimento via WhatsApp',
  faixaMotivoLogin: 'Confirme sua identidade para abrir o protocolo e voltar à conversa.',
  faixaMotivoSessao: 'Verificamos sua identidade automaticamente.',

  loginTitulo: 'Entre para continuar seu atendimento',
  loginSub: 'Escolha como quer se identificar. Você volta para a conversa em seguida.',

  senhaSub: 'Use o e-mail ou o documento cadastrado no FloripaOn.',
  senhaIdentificador: 'E-mail ou CPF/CNPJ',
  senhaIdentificadorPlaceholder: 'Insira seu e-mail, CPF ou CNPJ',
  senhaCampoPlaceholder: 'Insira sua senha',

  validadeSessao: 'Depois de entrar, você não precisa autenticar de novo por {prazo}.',
  validadeSessaoTooltip: 'Valor parametrizável por cliente: 1 dia, 10 dias, 1 ano…',
  prazoDias: n => (n === 1 ? '1 dia' : n === 365 ? '1 ano' : `${n} dias`),

  okTitulo: 'Identidade confirmada',
  okValidoAte: data => `Válido até ${data}`,
  okTextoMobile: 'Volte para a conversa e a LIA continua a abertura do seu protocolo de onde parou.',
  okTextoDesktop: 'Abra o WhatsApp no seu celular para continuar a abertura do protocolo com a LIA.',
  okBotaoMobile: 'Voltar para o WhatsApp',
  okContagem: s => `Levamos você de volta em ${s}s`,
  okQrLabel: 'Código QR para abrir a conversa',
  abrirWhatsappWeb: 'Abrir no WhatsApp Web',

  sessaoTitulo: 'Você já está identificado',
  sessaoTexto: (nome, cpf) => `Entrou como ${nome} · CPF ${cpf}. Não precisa entrar de novo.`,
  sessaoBotaoMobile: 'Continuar no WhatsApp',
  sessaoNaoEhVoce: 'Não é você? Sair desta conta',

  expiradoTitulo: 'Este link já expirou',
  expiradoTexto: minutos =>
    `Links de identificação valem por ${minutos} minutos, por segurança. Peça um novo à LIA na conversa e seu protocolo em rascunho continua salvo.`,
  expiradoBotaoMobile: 'Pedir novo link no WhatsApp',
  expiradoNadaPerdido: 'Nada do que você já respondeu foi perdido.',

  legal: 'Ao continuar você concorda com o nosso',
  legalLink: 'Aviso de Privacidade',
  powered: 'Powered by',

  estadosTitulo: 'Telas do fluxo',
  estadosSub: 'Lista de demonstração — habilitada por VITE_MOSTRAR_TELAS.',
  naoEncontradoTitulo: 'Página não encontrada',
  naoEncontradoTexto: 'O endereço acessado não existe neste portal.',
  irParaPortal: 'Ir para o FloripaOn',
};

const EN: TextosWa = {
  faixaLabel: 'WhatsApp support',
  faixaMotivoLogin: 'Confirm your identity to open the request and return to the chat.',
  faixaMotivoSessao: 'We verified your identity automatically.',

  loginTitulo: 'Sign in to continue your request',
  loginSub: 'Choose how to identify yourself. You will return to the chat right after.',

  senhaSub: 'Use the e-mail or the document registered on FloripaOn.',
  senhaIdentificador: 'E-mail or CPF/CNPJ',
  senhaIdentificadorPlaceholder: 'Enter your e-mail, CPF or CNPJ',
  senhaCampoPlaceholder: 'Enter your password',

  validadeSessao: 'Once you sign in, you will not need to authenticate again for {prazo}.',
  validadeSessaoTooltip: 'Configurable per client: 1 day, 10 days, 1 year…',
  prazoDias: n => (n === 1 ? '1 day' : n === 365 ? '1 year' : `${n} days`),

  okTitulo: 'Identity confirmed',
  okValidoAte: data => `Valid until ${data}`,
  okTextoMobile: 'Go back to the chat and LIA resumes your request where it stopped.',
  okTextoDesktop: 'Open WhatsApp on your phone to continue the request with LIA.',
  okBotaoMobile: 'Back to WhatsApp',
  okContagem: s => `Taking you back in ${s}s`,
  okQrLabel: 'QR code to open the chat',
  abrirWhatsappWeb: 'Open WhatsApp Web',

  sessaoTitulo: 'You are already identified',
  sessaoTexto: (nome, cpf) => `Signed in as ${nome} · CPF ${cpf}. No need to sign in again.`,
  sessaoBotaoMobile: 'Continue on WhatsApp',
  sessaoNaoEhVoce: 'Not you? Sign out of this account',

  expiradoTitulo: 'This link has expired',
  expiradoTexto: minutos =>
    `Identification links are valid for ${minutos} minutes, for security reasons. Ask LIA for a new one in the chat — your draft request is still saved.`,
  expiradoBotaoMobile: 'Ask for a new link on WhatsApp',
  expiradoNadaPerdido: 'Nothing you have answered was lost.',

  legal: 'By continuing you agree to our',
  legalLink: 'Privacy Notice',
  powered: 'Powered by',

  estadosTitulo: 'Flow screens',
  estadosSub: 'Demo list — enabled by VITE_MOSTRAR_TELAS.',
  naoEncontradoTitulo: 'Page not found',
  naoEncontradoTexto: 'The address you opened does not exist in this portal.',
  irParaPortal: 'Go to FloripaOn',
};

const ES: TextosWa = {
  faixaLabel: 'Atención por WhatsApp',
  faixaMotivoLogin: 'Confirme su identidad para abrir el trámite y volver a la conversación.',
  faixaMotivoSessao: 'Verificamos su identidad automáticamente.',

  loginTitulo: 'Ingrese para continuar su atención',
  loginSub: 'Elija cómo desea identificarse. Volverá a la conversación enseguida.',

  senhaSub: 'Use el correo o el documento registrado en FloripaOn.',
  senhaIdentificador: 'Correo o CPF/CNPJ',
  senhaIdentificadorPlaceholder: 'Ingrese su correo, CPF o CNPJ',
  senhaCampoPlaceholder: 'Ingrese su contraseña',

  validadeSessao: 'Después de ingresar, no necesita autenticarse de nuevo por {prazo}.',
  validadeSessaoTooltip: 'Valor configurable por cliente: 1 día, 10 días, 1 año…',
  prazoDias: n => (n === 1 ? '1 día' : n === 365 ? '1 año' : `${n} días`),

  okTitulo: 'Identidad confirmada',
  okValidoAte: data => `Válido hasta ${data}`,
  okTextoMobile: 'Vuelva a la conversación y LIA continúa la apertura de su trámite donde quedó.',
  okTextoDesktop: 'Abra WhatsApp en su celular para continuar el trámite con LIA.',
  okBotaoMobile: 'Volver a WhatsApp',
  okContagem: s => `Lo llevamos de vuelta en ${s}s`,
  okQrLabel: 'Código QR para abrir la conversación',
  abrirWhatsappWeb: 'Abrir WhatsApp Web',

  sessaoTitulo: 'Usted ya está identificado',
  sessaoTexto: (nome, cpf) => `Ingresó como ${nome} · CPF ${cpf}. No necesita ingresar de nuevo.`,
  sessaoBotaoMobile: 'Continuar en WhatsApp',
  sessaoNaoEhVoce: '¿No es usted? Salir de esta cuenta',

  expiradoTitulo: 'Este enlace ya expiró',
  expiradoTexto: minutos =>
    `Los enlaces de identificación valen por ${minutos} minutos, por seguridad. Pida uno nuevo a LIA en la conversación y su trámite en borrador sigue guardado.`,
  expiradoBotaoMobile: 'Pedir un nuevo enlace en WhatsApp',
  expiradoNadaPerdido: 'Nada de lo que ya respondió se perdió.',

  legal: 'Al continuar usted acepta nuestro',
  legalLink: 'Aviso de Privacidad',
  powered: 'Powered by',

  estadosTitulo: 'Pantallas del flujo',
  estadosSub: 'Lista de demostración — habilitada por VITE_MOSTRAR_TELAS.',
  naoEncontradoTitulo: 'Página no encontrada',
  naoEncontradoTexto: 'La dirección abierta no existe en este portal.',
  irParaPortal: 'Ir a FloripaOn',
};

export const TEXTOS_WA: Record<Lang, TextosWa> = { pt: PT, en: EN, es: ES };

export function useWaT(): TextosWa {
  return TEXTOS_WA[useLang()];
}
