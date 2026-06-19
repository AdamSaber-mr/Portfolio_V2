# CLAUDE.md

## Git & commits — strikte regels

**Vanaf nu nooit meer jezelf, Claude of een andere AI toevoegen als co-author,
contributor of auteur in Git commits.**

- Alle Git-commando's (`commit`, `push`, `branch`, `merge`, etc.) draaien
  **altijd alleen onder het GitHub-account van Adam Saber**. Geen extra auteurs,
  geen `Co-authored-by`-regels, geen verwijzing naar Claude/AI als contributor.
- Een voorgestelde commit message bevat **absoluut geen** `Co-authored-by` of
  andere auteursregels. Gebruik alleen normale tekst, bijvoorbeeld:

  ```
  feat: add new dashboard layout
  ```

- Als een tool of template automatisch een `Co-authored-by`-regel zou toevoegen,
  verwijder die **expliciet** en waarschuw met een zin als:

  > "Let op: ik heb alle co-author regels verwijderd zodat alleen jouw account
  > als auteur in de commit komt te staan."

- **Commits niet in één keer doen**, maar opsplitsen in passende, logische blokken
  (per samenhangende wijziging een eigen commit met een duidelijke message).

## Project

React + TypeScript + Vite portfolio voor Adam Saber. Zie `README.md` voor scripts
en structuur.

## Skills

Design-skills geïnstalleerd in `.claude/skills/` (via de `skills` CLI, bron in
`.agents/skills/`): `frontend-design`, `ui-ux-pro-max` (+ `ckm-*`),
`emil-design-eng`, `review-animations`. Gebruik deze bij UI/UX- en designwerk.
