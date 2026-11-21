export const enInstallMessages = {
  cardBadge: 'CLI',
  cardTitle: 'Getting Started',
  cta: 'Use this route as the calm handoff into installation details.',
  description: 'Start the install flow with the core route.',
  routeLabel: 'Install',
  title: 'Install Purrfold',
  tabs: { cli: 'CLI', agent: 'Agent' },
  configurator: {
    title: 'Configure your install',
    hide: 'Hide flags',
    show: 'Configure flags',
    framework: 'Framework',
    unit: 'Unit tests (Vitest)',
    e2e: 'E2E tests (Playwright)',
    commitlint: 'Commit convention (commitlint)',
    ci: 'GitHub Actions workflows (CI)',
    mcp: 'shadcn MCP for Claude/Codex/OpenCode',
    motion: 'Motion for React (motion-framer skill)',
    query: 'TanStack Query (tanstack-query skill)',
    yes: 'Non-interactive mode (--yes)',
    ssr: 'Server rendering (SSR)',
    adapter: 'Astro SSR adapter',
    router: 'Vite router',
    routerLabels: {
      'react-router-data': 'React Router · data mode',
      'react-router-declarative': 'React Router · declarative mode',
      none: 'No router',
    },
    pm: 'Package manager',
    presetId: 'shadcn preset ID',
    presetPlaceholder: 'e.g. b3REw8vwo',
  },
  output: {
    cliLabel: 'CLI command',
    agentLabel: 'Agent prompt',
    command: 'npx purrfold@latest <project-directory>',
    agentIntro:
      'Scaffold a new {framework} app with purrfold (https://www.npmjs.com/package/purrfold). Read the README or run `npx purrfold@latest info --json` to discover available options.',
    agentOptionsHeading: 'Use exactly these options:',
    agentLineInclude: '- {label}: include — pass {flag}',
    agentLineSkip: '- {label}: skip — pass {flag}',
    agentLineSkipOmit: '- {label}: skip — do not pass {flag}',
    agentLineValue: '- {label}: {value} — pass {flag}',
    agentLineValueDefault: '- {label}: {value} — default, no flag needed',
    agentLabelUnit: 'Unit tests (Vitest)',
    agentLabelE2e: 'E2E tests (Playwright)',
    agentLabelCommitlint: 'Commit convention (commitlint)',
    agentLabelCi: 'GitHub Actions workflows',
    agentLabelMcp: 'shadcn MCP',
    agentLabelMotion: 'Motion for React (motion-framer skill)',
    agentLabelQuery: 'TanStack Query (tanstack-query skill)',
    agentLabelYes: 'Non-interactive mode',
    agentLabelFramework: 'Framework',
    agentLabelSsr: 'Rendering',
    agentLabelAdapter: 'Astro SSR adapter',
    agentLabelRouter: 'Vite router',
    agentLabelPm: 'Package manager',
    agentLabelPreset: 'shadcn preset',
    agentValueSsr: 'SSR (server rendering)',
    agentValueStatic: 'static build',
    agentValuePrerender: 'prerendered (static)',
    routerLabels: {
      'react-router-data': 'React Router · data mode',
      'react-router-declarative': 'React Router · declarative mode',
      none: 'No router',
    },
    agentValuePresetNone: 'none',
    agentRulesHeading: 'Rules:',
    agentRuleExact:
      '- Follow the list above exactly. Do not add, remove, or substitute any option.',
    agentRuleHusky:
      '- Husky is always installed by purrfold and is not optional. The commitlint choice only controls the commitlint config and the commit-msg hook; the pre-commit and pre-push hooks are installed either way.',
    agentOutro: 'Run `npm run check` after scaffolding to verify everything works.',
  },
  flagsReference: {
    title: 'All available flags',
    items: [
      {
        flag: '--framework <next|astro|vite|react-router>',
        description: 'Choose the framework to scaffold (prompts, with next as the default)',
      },
      {
        flag: '--router <react-router-data|react-router-declarative|none>',
        description: 'Vite only: React Router data mode (default), declarative mode, or no router',
      },
      {
        flag: '--ssr / --no-ssr',
        description:
          'Astro and React Router: server rendering. Astro is static by default; React Router renders on the server by default and prerenders / with --no-ssr',
      },
      {
        flag: '--adapter <node|vercel|netlify|cloudflare>',
        description: 'Astro only: choose an SSR adapter; implies SSR (default cloudflare)',
      },
      {
        flag: '--pm <npm|pnpm|bun>',
        description:
          'Choose the package manager (prompts; with --yes, detects npm, pnpm, or bun and falls back to npm if detection fails; Astro rejects bun)',
      },
      {
        flag: '--unit / --no-unit',
        description: 'Include or skip Vitest + React Testing Library (included by default)',
      },
      { flag: '--e2e / --no-e2e', description: 'Include or skip Playwright (skipped by default)' },
      {
        flag: '--commitlint / --no-commitlint',
        description:
          'Include or skip commitlint and the commit-msg hook (skipped by default; standard hooks are generated regardless)',
      },
      {
        flag: '--ci / --no-ci',
        description:
          'Include or skip GitHub Actions workflows: quality.yml, plus playwright.yml with --e2e (default off)',
      },
      {
        flag: '--motion',
        description: 'Install Motion for React and the motion-framer agent skill (opt-in)',
      },
      {
        flag: '--query',
        description:
          'Install TanStack Query, React Query Devtools in development, and the tanstack-query agent skill (opt-in)',
      },
      {
        flag: '--mcp / --no-mcp',
        description: 'Run shadcn mcp init for Claude, Codex, and OpenCode (skipped by default)',
      },
      {
        flag: '--shadcn-args <args...>',
        description: 'Forward extra arguments to shadcn init, including --preset <id>',
      },
      {
        flag: '--icons <lucide|phosphor|tabler>',
        description:
          "Override the home-page cat's icon library; when omitted, use shadcn's choice if supported, otherwise lucide",
      },
      {
        flag: '--yes',
        description: 'Use non-interactive defaults (does not turn on --motion or --query)',
      },
      {
        flag: '--skip-install',
        description: 'Generate quality files without installing extra quality dependencies',
      },
      {
        flag: '--dry-run',
        description: 'Preview operations without writing files or installing packages',
      },
    ],
  },
  preset: {
    title: 'Using a shadcn preset',
    description: 'Pass a preset ID to shadcn init to skip the interactive style selection:',
    command: 'npx purrfold@latest my-app --shadcn-args --preset b3REw8vwo --yes',
    presetLabel: 'Preset ID (example)',
  },
} as const;

export const esInstallMessages = {
  cardBadge: 'CLI',
  cardTitle: 'Primeros pasos',
  cta: 'Usa esta ruta como transición hacia la instalación.',
  description: 'Inicia el flujo de instalación con la ruta principal.',
  routeLabel: 'Instalación',
  title: 'Instalar Purrfold',
  tabs: { cli: 'CLI', agent: 'Agente' },
  configurator: {
    title: 'Configura tu instalación',
    hide: 'Ocultar flags',
    show: 'Configurar flags',
    framework: 'Framework',
    unit: 'Tests unitarios (Vitest)',
    e2e: 'Tests E2E (Playwright)',
    commitlint: 'Convención de commits (commitlint)',
    ci: 'Flujos de trabajo de GitHub Actions (CI)',
    mcp: 'shadcn MCP para Claude/Codex/OpenCode',
    motion: 'Motion for React (skill motion-framer)',
    yes: 'Modo no interactivo (--yes)',
    ssr: 'Renderizado en servidor (SSR)',
    adapter: 'Adaptador SSR de Astro',
    query: 'TanStack Query (skill tanstack-query)',
    router: 'Router de Vite',
    routerLabels: {
      'react-router-data': 'React Router · modo data',
      'react-router-declarative': 'React Router · modo declarativo',
      none: 'Sin router',
    },
    pm: 'Administrador de paquetes',
    presetId: 'ID de preset de shadcn',
    presetPlaceholder: 'p. ej. b3REw8vwo',
  },
  output: {
    cliLabel: 'Comando CLI',
    agentLabel: 'Prompt para agente',
    command: 'npx purrfold@latest <directorio-del-proyecto>',
    agentIntro:
      'Genera un proyecto nuevo de {framework} con purrfold (https://www.npmjs.com/package/purrfold). Lee el README o ejecuta `npx purrfold@latest info --json` para descubrir las opciones disponibles.',
    agentOptionsHeading: 'Usa exactamente estas opciones:',
    agentLineInclude: '- {label}: incluir — usa {flag}',
    agentLineSkip: '- {label}: omitir — usa {flag}',
    agentLineSkipOmit: '- {label}: omitir — no uses {flag}',
    agentLineValue: '- {label}: {value} — usa {flag}',
    agentLineValueDefault: '- {label}: {value} — valor por defecto, no requiere flag',
    agentLabelUnit: 'Tests unitarios (Vitest)',
    agentLabelE2e: 'Tests E2E (Playwright)',
    agentLabelCommitlint: 'Convención de commits (commitlint)',
    agentLabelCi: 'Flujos de trabajo de GitHub Actions',
    agentLabelMcp: 'shadcn MCP',
    agentLabelMotion: 'Motion for React (skill motion-framer)',
    agentLabelQuery: 'TanStack Query (skill tanstack-query)',
    agentLabelYes: 'Modo no interactivo',
    agentLabelFramework: 'Framework',
    agentLabelSsr: 'Renderizado',
    agentLabelRouter: 'Router de Vite',
    agentValuePrerender: 'prerenderizado (estático)',
    routerLabels: {
      'react-router-data': 'React Router · modo data',
      'react-router-declarative': 'React Router · modo declarativo',
      none: 'Sin router',
    },
    agentLabelAdapter: 'Adaptador SSR de Astro',
    agentLabelPm: 'Administrador de paquetes',
    agentLabelPreset: 'Preset de shadcn',
    agentValueSsr: 'SSR (renderizado en servidor)',
    agentValueStatic: 'compilación estática',
    agentValuePresetNone: 'ninguno',
    agentRulesHeading: 'Reglas:',
    agentRuleExact:
      '- Sigue la lista anterior exactamente. No agregues, elimines ni sustituyas ninguna opción.',
    agentRuleHusky:
      '- purrfold siempre instala Husky y no es opcional. La elección de commitlint solo controla la configuración de commitlint y el hook commit-msg; los hooks pre-commit y pre-push se instalan en cualquier caso.',
    agentOutro:
      'Después del scaffolding, ejecuta `npm run check` para verificar que todo funcione.',
  },
  flagsReference: {
    title: 'Todos los flags disponibles',
    items: [
      {
        flag: '--framework <next|astro|vite|react-router>',
        description: 'Elegir el framework a generar (se pregunta; next es la opción por defecto)',
      },
      {
        flag: '--router <react-router-data|react-router-declarative|none>',
        description:
          'Solo Vite: React Router en modo data (por defecto), modo declarativo o sin router',
      },
      {
        flag: '--ssr / --no-ssr',
        description:
          'Astro y React Router: renderizado en servidor. Astro es estático por defecto; React Router renderiza en servidor por defecto y con --no-ssr prerenderiza /',
      },
      {
        flag: '--adapter <node|vercel|netlify|cloudflare>',
        description: 'Solo Astro: elegir un adaptador SSR; implica SSR (por defecto cloudflare)',
      },
      {
        flag: '--pm <npm|pnpm|bun>',
        description:
          'Elegir el administrador de paquetes (se pregunta; con --yes, detecta npm, pnpm o bun y usa npm si falla la detección; Astro rechaza bun)',
      },
      {
        flag: '--unit / --no-unit',
        description: 'Incluir u omitir Vitest + React Testing Library (incluido por defecto)',
      },
      {
        flag: '--e2e / --no-e2e',
        description: 'Incluir u omitir Playwright (omitido por defecto)',
      },
      {
        flag: '--commitlint / --no-commitlint',
        description:
          'Incluir u omitir commitlint y el hook commit-msg (omitido por defecto; los hooks estándar se generan en cualquier caso)',
      },
      {
        flag: '--ci / --no-ci',
        description:
          'Incluir u omitir los flujos de trabajo de GitHub Actions: quality.yml, más playwright.yml con --e2e (desactivado por defecto)',
      },
      {
        flag: '--motion',
        description: 'Instalar Motion for React y el skill motion-framer (opt-in)',
      },
      {
        flag: '--query',
        description:
          'Instalar TanStack Query, React Query Devtools solo en desarrollo y el skill tanstack-query (opt-in)',
      },
      {
        flag: '--mcp / --no-mcp',
        description: 'Ejecutar shadcn mcp init para Claude, Codex y OpenCode (omitido por defecto)',
      },
      {
        flag: '--shadcn-args <args...>',
        description: 'Reenviar argumentos extra a shadcn init, incluyendo --preset <id>',
      },
      {
        flag: '--icons <lucide|phosphor|tabler>',
        description:
          'Elegir la librería de iconos del gato de la página principal; si se omite, se usa la opción de shadcn cuando es compatible y, de lo contrario, lucide',
      },
      {
        flag: '--yes',
        description: 'Usar valores por defecto no interactivos (no activa --motion ni --query)',
      },
      {
        flag: '--skip-install',
        description: 'Generar archivos de calidad sin instalar dependencias de calidad adicionales',
      },
      {
        flag: '--dry-run',
        description: 'Previsualizar operaciones sin escribir archivos ni instalar paquetes',
      },
    ],
  },
  preset: {
    title: 'Usar un preset de shadcn',
    description:
      'Pasa un ID de preset a shadcn init para omitir la selección interactiva de estilo:',
    command: 'npx purrfold@latest my-app --shadcn-args --preset b3REw8vwo --yes',
    presetLabel: 'ID de preset (ejemplo)',
  },
} as const;
