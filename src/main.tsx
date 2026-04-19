import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// 1DS Tokens (deve vir primeiro)
import '@1doc/1ds-tokens/dist/css/primitives.css'
import '@1doc/1ds-tokens/dist/css/semantic.css'
import '@1doc/1ds-tokens/dist/css/theme-1doc.css'

// 1DS Component styles
import '@1doc/1ds-react/dist/components/Button/Button.css'
import '@1doc/1ds-react/dist/components/Input/Input.css'
import '@1doc/1ds-react/dist/components/Icon/Icon.css'
import '@1doc/1ds-react/dist/components/Text/Text.css'

// FontAwesome Pro (JS renderizador via SVG)
import '@fortawesome/fontawesome-pro/js/all.min.js'

// App styles
import './index.css'
import App from './App.tsx'

// Aplicar tema 1doc no root
document.documentElement.setAttribute('data-theme', '1doc')

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
