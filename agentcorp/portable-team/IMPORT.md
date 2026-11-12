# AgentCorp Team — Import Guide / Guia de Importação

## English
This directory follows the Paperclip `agentcompanies/v1` team-package conventions: `TEAM.md` lists an agent manager plus included `AGENTS.md` role files. It is intended for a private company in Paperclip.

1. Check out branch `feat/agentcorp-foundation`.
2. Run `node agentcorp/portable-team/validate.mjs` to check references and reporting lines.
3. Start Paperclip in a protected development instance and use the company import preview to inspect how the package is parsed. **Do not install without previewing**.
4. Connect each role to a supported agent adapter, model and scoped credentials. No runtime is configured by these files.
5. Keep scheduled heartbeats disabled until execution, budgets and owner approvals have been tested.
6. Never expose the production instance to the internet without authentication, TLS and environment-specific secrets.

This milestone checks the portable file layout; it has NOT passed the native Paperclip import preview, browser tests, container build or production deployment.

## Português (Brasil)
Este diretório segue as convenções de equipes `agentcompanies/v1` do Paperclip: o `TEAM.md` aponta para o gestor e os arquivos `AGENTS.md` dos cargos.

1. Utilize a branch `feat/agentcorp-foundation`.
2. Execute `node agentcorp/portable-team/validate.mjs` para verificar referências e hierarquia.
3. Inicie o Paperclip em ambiente privado de testes e use a prévia de importação antes de instalar.
4. Configure o provedor/modelo e credenciais de cada agente com permissões mínimas.
5. Mantenha rotinas automáticas desativadas até validar orçamentos e aprovações.
6. Não exponha uma instância pública sem autenticação, HTTPS e segredos exclusivos.

Este marco NÃO comprova a importação nativa, interface completa, execução dos agentes, build Docker ou publicação na VPS.

## Next / Próximo
- Validate an actual Paperclip import preview and adjust any schema incompatibility.
- Hook organization-level approval gates into server-side authorization.
- Audit PT-BR coverage; Paperclip already has `en.json` and `pt-BR.json`.
- Add private VPS deployment only after credentials and access model are verified.
