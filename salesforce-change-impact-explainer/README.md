# Salesforce Change-Impact Explainer

A GitHub-ready starter mockup for a **read-first, AI-assisted Salesforce pre-change risk analysis tool**.

This repository packages the concept into a minimal Next.js app so other builders can:
- understand the product idea quickly,
- run the mock UI locally,
- fork it into a real prototype,
- use the structure as a starting point for validation, alpha, or demo builds.

## Product concept

**Salesforce Change-Impact Explainer** is a pre-deployment analysis assistant for Salesforce admins, consultants, and platform owners.

It aims to answer:
- What components are likely affected?
- What could break?
- Who is impacted?
- What should be tested?
- What is confirmed vs inferred vs unknown?

## What is included

- a single polished mock screen for the core workflow,
- a standardized impact report layout,
- V1 positioning aligned to a narrow metadata-analysis product,
- starter repository structure for GitHub upload and extension.

## What is not included

This repo is a **concept starter**, not a production implementation.

It does **not** currently include:
- Salesforce authentication,
- metadata ingestion,
- dependency graph construction,
- MCP integration,
- database persistence,
- report generation backend,
- export pipelines,
- billing or multi-user support.

## Local setup

### 1. Install dependencies

```bash
npm install
```

### 2. Run the development server

```bash
npm run dev
```

### 3. Open the app

Open `http://localhost:3000`

## Suggested next build steps

1. Add Salesforce sandbox auth.
2. Build metadata ingestion for fields, validation rules, formula fields, and record-triggered Flows.
3. Normalize metadata into relational tables.
4. Extract deterministic dependency edges.
5. Add a backend endpoint for structured impact report generation.
6. Save impact reports and evidence references.
7. Add export and share flows.

## Recommended V1 architecture

- **Frontend:** Next.js, TypeScript, Tailwind CSS
- **Backend:** Next.js route handlers or a small Node service
- **Jobs:** Trigger.dev or Inngest
- **Storage:** Postgres via Supabase or Neon
- **Caching:** Redis optional
- **LLMs:** one stronger reasoning model for reports, one cheaper model for extraction or classification

## Intended audience

- solo Salesforce consultants
- in-house Salesforce admins
- boutique Salesforce agencies
- platform owners inheriting messy orgs

## Licensing

Licensed under the **Apache License 2.0**.

Copyright © Jyotishko Roy

See the `LICENSE` file for details.
