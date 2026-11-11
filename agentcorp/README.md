# AgentCorp OS — Internal AI Company / Empresa interna de IA

This folder contains the first, **non-integrated** AgentCorp foundation on top of the official Paperclip fork.
Esta pasta contém a primeira base **ainda não integrada** da AgentCorp sobre o fork oficial do Paperclip.

## Scope / Escopo
- Private/internal deployment only; no public signup or SaaS billing.
- Bilingual operation: Portuguese (Brazil) and English.
- General-purpose departments: executive, research, engineering, independent audit, marketing, sales, administration.
- Owner-approved high-impact actions, sandbox execution, project budget limits.

## Existing upstream features / Funcionalidades existentes
Paperclip already contains an i18next setup with `ui/src/i18n/locales/en.json` and `pt-BR.json`.
Do not replace these; extend them using the upstream validation and preference logic.
Paperclip também já possui organogramas, tarefas, aprovações e controles de custo. Reutilize estes módulos.

## This milestone / Este marco
- `teams/internal-company.yaml`: **design blueprint only**, not an importable team.
- `governance/policy.mjs`: **isolated example**, not wired into Paperclip authorization.
- `governance/policy.test.mjs`: six dependency-free Node tests.

Run / Executar: `node --test agentcorp/governance/policy.test.mjs`.

## Next integration steps / Próximas etapas
1. Audit Paperclip's current team catalog format and generate a valid importable template.
2. Connect approval policy to the real authenticated server-side action gateway.
3. Verify all UI routes and translation coverage (PT-BR and EN).
4. Add smoke tests for login, tasks, budget gates and agent sandbox.
5. Deploy privately with HTTPS, backups, explicit secrets and isolated execution workers.

**Security:** this example must never be used as the sole permission check.
**Segurança:** este exemplo nunca deve substituir as autorizações do servidor.
