# ScamShield — Astro starter kit: Basics

```sh
npm create astro@latest -- --template basics
```

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
│   └── favicon.svg
├── src
│   ├── assets
│   │   └── astro.svg
│   ├── components
│   │   └── Welcome.astro
│   ├── layouts
│   │   └── Layout.astro
│   └── pages
│       └── index.astro
└── package.json
```

To learn more about the folder structure of an Astro project, refer to [our guide on project structure](https://docs.astro.build/en/basics/project-structure/).

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |

## 👀 Want to learn more?

Also see [ScamShield — Digital Fraud Investigation](#scamshield) below.

Feel free to check out [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).

---

# ScamShield

ScamShield is a hackathon application for cyber-fraud investigation and victim
assistance in India. It examines a suspicious message or screenshot, isolates
the language and identifiers that matter, and files them as a structured case.

**Phase 1 is complete: the investigative interface and the backend foundation.**
The analysis engine is Phase 2 and is not implemented yet — the application
never fabricates a risk score or classification.

## Repository layout

```text
p-2/
├── frontend/            React + TypeScript + Vite application
│   ├── src/
│   │   ├── components/  App shell, evidence inputs, analysis panel
│   │   ├── pages/       Investigate, Replay, Connected Reports
│   │   ├── hooks/       Backend health polling
│   │   ├── services/    API client, case-reference helpers
│   │   ├── styles/      Design tokens + global CSS
│   │   └── types/       Shared TypeScript contracts
│   ├── index.html
│   └── vite.config.ts
├── backend/             Python FastAPI service
│   ├── app/
│   │   ├── api/         HTTP routes (/api/health, /api/analysis)
│   │   ├── core/        Settings (environment-driven)
│   │   ├── schemas/     Pydantic request/response models
│   │   └── services/    Case intake logic
│   ├── tests/           Pytest suite
│   └── requirements.txt
├── README.md
└── .gitignore
```

> Note: the Astro starter files at the repository root
> (`src/`, `public/`, `astro.config.mjs`, root `package.json`) are leftover
> scaffolding from project initialization. The real application lives in
> `frontend/` and `backend/` and does not use Astro.

## Prerequisites

- Node.js 22+ and npm
- Python 3.11+ (developed against 3.12)

## Frontend setup

```powershell
cd frontend
npm install
copy .env.example .env       # optional; defaults work for local development
npm run dev                  # http://localhost:5173
```

Other frontend commands:

```powershell
npm run build                # type-check and produce a production build
npm run lint                 # Oxlint
npm run preview              # preview the production build
```

### Frontend environment variables (`frontend/.env`)

| Variable              | Default                 | Purpose                                      |
| :-------------------- | :---------------------- | :------------------------------------------- |
| `VITE_API_BASE_URL`   | `http://localhost:8000` | Base URL of the FastAPI backend              |
| `VITE_PROXY_TARGET`   | `http://localhost:8000` | Target the Vite dev server proxies `/api` to |

## Backend setup

Windows (PowerShell):

```powershell
cd backend
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
copy .env.example .env      # optional; defaults work for local development
uvicorn app.main:app --reload --port 8000
```

macOS / Linux:

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
uvicorn app.main:app --reload --port 8000
```

Run the tests:

```bash
cd backend
.venv\Scripts\Activate.ps1    # or: source .venv/bin/activate
pytest tests
```

### Backend environment variables (`backend/.env`)

| Variable                    | Default                                    | Purpose                                  |
| :-------------------------- | :----------------------------------------- | :--------------------------------------- |
| `SCAMSHIELD_APP_NAME`       | `ScamShield AI`                            | Service name reported by `/api/health`   |
| `SCAMSHIELD_VERSION`        | `0.1.0`                                    | Version reported by `/api/health`        |
| `SCAMSHIELD_API_PREFIX`     | `/api`                                     | Route prefix for all API routes          |
| `SCAMSHIELD_CORS_ORIGINS`   | `http://localhost:5173,...`                | Comma-separated allowed origins          |
| `SCAMSHIELD_ENV`            | `development`                              | Set to `production` when deployed        |
| `SCAMSHIELD_LLM_API_KEY`    | *(empty)*                                  | Optional Phase-2 provider key; never commit it |

## Verifying the stack

1. Start the backend (port 8000), then the frontend (port 5173).
2. Open <http://localhost:5173>.
3. The header privacy indicator shows whether the backend service is reachable.

```bash
# Health check
curl http://localhost:8000/api/health
# PowerShell equivalent
Invoke-RestMethod http://localhost:8000/api/health
```

Expected response:

```json
{
  "status": "ok",
  "service": "ScamShield AI",
  "version": "0.1.0",
  "time": "2026-10-13T09:41:00+00:00"
}
```

## Phase status

| Area                    | Phase 1                                                         |
| :---------------------- | :-------------------------------------------------------------- |
| Investigate page        | Case-file intake: message paste and screenshot drag-and-drop    |
| Analysis                | Not connected — no classifications or scores are produced       |
| Replay                  | Placeholder; timeline engine arrives in Phase 2                 |
| Connected Reports       | Placeholder; report linking arrives in Phase 2                  |
| Backend                 | `/api/health`, `/api/analysis` (pending acknowledgement only)    |

## Design language

The interface is an investigative case file, not an AI dashboard: paper
background (`#F7F5F0`), ink text (`#24231F`), hairline borders (`#DCD8CF`), a
single restrained accent (`#B54432`), serif headings with sans body copy, and
monospaced type reserved for case IDs, timestamps, and evidence. Tokens live
in `frontend/src/styles/tokens.css`.
