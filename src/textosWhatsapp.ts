// ── Textos das telas de autenticação via WhatsApp ────────────────────────────
// Recorte de copy deste fluxo, alimentado pelo MESMO LangContext do portal
// (useLang) — não é um i18n paralelo.
// Nos títulos, o trecho entre ** vai em negrito (como nas telas de referência).
import { useLang } from './i18n';
import type { Lang } from './i18n';

export interface TextosWa {
  // Tela: entrar
  tituloLogin: string;
  entrarGoogle: string;
  identificacaoLabel: string;
  identificacaoPlaceholder: string;
  prosseguir: string;
  // Tela: certificado
  tituloCertificado: string;
  certificadoLabel: string;
  certificadoPlaceholder: string;
  // Tela: senha
  tituloSenha: string;
  senhaLabel: string;
  senhaPlaceholder: string;
  autenticar: string;
  esqueciSenha: string;
  // Tela: cadastro
  tituloCadastro: string;
  // Tela: recuperar senha
  avisoVoltaWhatsapp: string;
  voltar: string;
  politicaPrivacidade: string;
  politicaPrivacidadeLink: string;
  // Regras de senha (ordem: tamanho, letra, número, especial)
  regrasSenha: [string, string, string, string];
  // Tela: e-mail
  tituloEmail: string;
  telefoneLabel: string;
  emailLabel: string;
  emailPlaceholder: string;
  // Tela: e-mail enviado
  emailEnviado: (email: string) => string;
  emailEnviadoDetalhe: string;
  // Tela: criar senha
  tituloCriarSenha: string;
  criarEEntrar: string;
  // Tela: concluído
  concluidoAutenticacao: string;
  concluidoCadastro: string;
  voltarAoWhatsapp: string;
  // Rodapé do card
  powered: string;
  // Demonstração / rota inexistente
  estadosTitulo: string;
  estadosSub: string;
  naoEncontradoTitulo: string;
  naoEncontradoTexto: string;
  irParaPortal: string;
}

const PT: TextosWa = {
  tituloLogin: 'Entre ou cadastre-se para **autenticar com o WhatsApp**',
  entrarGoogle: 'Entrar com Google',
  identificacaoLabel: 'E-mail, CPF ou telefone',
  identificacaoPlaceholder: 'Insira seu e-mail, CPF ou telefone',
  prosseguir: 'Prosseguir',

  tituloCertificado: 'Entre com Certificado para **autenticar com o WhatsApp**',
  certificadoLabel: 'Certificado',
  certificadoPlaceholder: 'Escolha um certificado',

  tituloSenha: 'Insira sua senha para **autenticar com o WhatsApp**',
  senhaLabel: 'Senha',
  senhaPlaceholder: 'Insira sua senha',
  autenticar: 'Autenticar',
  esqueciSenha: 'Esqueci a minha senha',

  tituloCadastro: 'Crie uma conta para **autenticar com o WhatsApp**',
  avisoVoltaWhatsapp: 'Depois de redefinir a senha, você volta para a conversa no WhatsApp e continua de onde parou.',
  voltar: 'Voltar',
  politicaPrivacidade: 'Ao continuar, você aceita a',
  politicaPrivacidadeLink: 'Política de privacidade',

  regrasSenha: ['Ao menos 8 caracteres', 'Ao menos uma letra', 'Ao menos um número', 'Ao menos um caractere especial'],

  tituloEmail: 'Insira um e-mail para **autenticar com o WhatsApp**',
  telefoneLabel: 'Telefone',
  emailLabel: 'E-mail',
  emailPlaceholder: 'Insira um e-mail',

  emailEnviado: email => `Um e-mail foi enviado para ${email} com um link para criar uma senha`,
  emailEnviadoDetalhe: 'Você já tem uma conta cadastrada, mas precisa criar uma senha. Para isso, acesse sua caixa de e-mail e clique no link para criar uma nova senha.',

  tituloCriarSenha: 'Crie uma senha para finalizar seu cadastro e **autenticar com o WhatsApp**',
  criarEEntrar: 'Criar e entrar',

  concluidoAutenticacao: 'Autenticação concluída com sucesso!',
  concluidoCadastro: 'Cadastro e autenticação concluídas com sucesso!',
  voltarAoWhatsapp: 'Voltar ao WhatsApp',

  powered: 'Powered by',

  estadosTitulo: 'Telas do fluxo',
  estadosSub: 'Lista de demonstração — esconda com VITE_MOSTRAR_TELAS=false.',
  naoEncontradoTitulo: 'Página não encontrada',
  naoEncontradoTexto: 'O endereço acessado não existe neste portal.',
  irParaPortal: 'Ir para o FloripaOn',
};

const EN: TextosWa = {
  tituloLogin: 'Sign in or sign up to **authenticate with WhatsApp**',
  entrarGoogle: 'Sign in with Google',
  identificacaoLabel: 'E-mail, CPF or phone',
  identificacaoPlaceholder: 'Enter your e-mail, CPF or phone',
  prosseguir: 'Continue',

  tituloCertificado: 'Use a Certificate to **authenticate with WhatsApp**',
  certificadoLabel: 'Certificate',
  certificadoPlaceholder: 'Choose a certificate',

  tituloSenha: 'Enter your password to **authenticate with WhatsApp**',
  senhaLabel: 'Password',
  senhaPlaceholder: 'Enter your password',
  autenticar: 'Authenticate',
  esqueciSenha: 'I forgot my password',

  tituloCadastro: 'Create an account to **authenticate with WhatsApp**',
  avisoVoltaWhatsapp: 'After resetting your password you go back to the WhatsApp chat and continue where you stopped.',
  voltar: 'Back',
  politicaPrivacidade: 'By continuing, you accept the',
  politicaPrivacidadeLink: 'Privacy Policy',

  regrasSenha: ['At least 8 characters', 'At least one letter', 'At least one number', 'At least one special character'],

  tituloEmail: 'Enter an e-mail to **authenticate with WhatsApp**',
  telefoneLabel: 'Phone',
  emailLabel: 'E-mail',
  emailPlaceholder: 'Enter an e-mail',

  emailEnviado: email => `An e-mail was sent to ${email} with a link to create a password`,
  emailEnviadoDetalhe: 'You already have an account, but you still need a password. Open your inbox and click the link to create a new one.',

  tituloCriarSenha: 'Create a password to finish signing up and **authenticate with WhatsApp**',
  criarEEntrar: 'Create and sign in',

  concluidoAutenticacao: 'Authentication completed successfully!',
  concluidoCadastro: 'Registration and authentication completed successfully!',
  voltarAoWhatsapp: 'Back to WhatsApp',

  powered: 'Powered by',

  estadosTitulo: 'Flow screens',
  estadosSub: 'Demo list — hide it with VITE_MOSTRAR_TELAS=false.',
  naoEncontradoTitulo: 'Page not found',
  naoEncontradoTexto: 'The address you opened does not exist in this portal.',
  irParaPortal: 'Go to FloripaOn',
};

const ES: TextosWa = {
  tituloLogin: 'Ingrese o regístrese para **autenticar con WhatsApp**',
  entrarGoogle: 'Ingresar con Google',
  identificacaoLabel: 'Correo, CPF o teléfono',
  identificacaoPlaceholder: 'Ingrese su correo, CPF o teléfono',
  prosseguir: 'Continuar',

  tituloCertificado: 'Use un Certificado para **autenticar con WhatsApp**',
  certificadoLabel: 'Certificado',
  certificadoPlaceholder: 'Elija un certificado',

  tituloSenha: 'Ingrese su contraseña para **autenticar con WhatsApp**',
  senhaLabel: 'Contraseña',
  senhaPlaceholder: 'Ingrese su contraseña',
  autenticar: 'Autenticar',
  esqueciSenha: 'Olvidé mi contraseña',

  tituloCadastro: 'Cree una cuenta para **autenticar con WhatsApp**',
  avisoVoltaWhatsapp: 'Después de redefinir la contraseña, usted vuelve a la conversación en WhatsApp y continúa donde quedó.',
  voltar: 'Volver',
  politicaPrivacidade: 'Al continuar, usted acepta la',
  politicaPrivacidadeLink: 'Política de privacidad',

  regrasSenha: ['Al menos 8 caracteres', 'Al menos una letra', 'Al menos un número', 'Al menos un carácter especial'],

  tituloEmail: 'Ingrese un correo para **autenticar con WhatsApp**',
  telefoneLabel: 'Teléfono',
  emailLabel: 'Correo',
  emailPlaceholder: 'Ingrese un correo',

  emailEnviado: email => `Se envió un correo a ${email} con un enlace para crear una contraseña`,
  emailEnviadoDetalhe: 'Usted ya tiene una cuenta registrada, pero necesita crear una contraseña. Abra su correo y haga clic en el enlace para crearla.',

  tituloCriarSenha: 'Cree una contraseña para finalizar su registro y **autenticar con WhatsApp**',
  criarEEntrar: 'Crear e ingresar',

  concluidoAutenticacao: '¡Autenticación completada con éxito!',
  concluidoCadastro: '¡Registro y autenticación completados con éxito!',
  voltarAoWhatsapp: 'Volver a WhatsApp',

  powered: 'Powered by',

  estadosTitulo: 'Pantallas del flujo',
  estadosSub: 'Lista de demostración — ocúltela con VITE_MOSTRAR_TELAS=false.',
  naoEncontradoTitulo: 'Página no encontrada',
  naoEncontradoTexto: 'La dirección abierta no existe en este portal.',
  irParaPortal: 'Ir a FloripaOn',
};

export const TEXTOS_WA: Record<Lang, TextosWa> = { pt: PT, en: EN, es: ES };

export function useWaT(): TextosWa {
  return TEXTOS_WA[useLang()];
}
