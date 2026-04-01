# Wild Washington

Wild Washington is a Washington wildlife field guide built as an educational web experience. It helps learners, classrooms, educators, and curious public users explore endangered species through trend stories, habitat maps, comparison tools, conservation context, and guided lesson pathways.

Live app: [wild-washington.vercel.app](https://wild-washington.vercel.app/)

## Who It Serves

- Learners who need a clearer way to understand what species trend data actually means.
- Educators who want classroom-ready pathways grounded in real Washington wildlife evidence.
- Curious public users who want more than a generic species website or a flat dashboard.

## What Makes It Different

- Species profiles combine trend interpretation, map context, threats, recovery work, lesson paths, and action links in one story flow.
- The comparison view normalizes each species to its own baseline so users can compare direction and scale without pretending every dataset uses the same metric.
- The learning hub is audience-first, with pathways for elementary, middle school, high school, and educator use.
- Methodology and source limits stay visible throughout the experience so the trust story is part of the product, not buried in documentation.

## Core Features

- Homepage framing that explains the app quickly for classrooms and public users
- Browseable species dashboard with search, trend filters, group filters, and stronger preview cards
- Signature comparison experience with shareable selections and starter comparison sets
- Species detail pages with clearer story hierarchy, trend interpretation, and next-step handoffs
- Learning hub and lesson pages built for real classroom use
- Conservation route grouped by action type so users can move from learning to local stewardship
- Methodology page that explains adaptation, metric differences, confidence, and limitations clearly

## Data Sources

Wild Washington draws from source-specific wildlife records and summaries, including:

- NOAA Fisheries
- Washington Department of Fish and Wildlife (WDFW)
- US Fish and Wildlife Service
- Center for Whale Research

See the in-app Methodology route and species source sections for species-specific links and notes.

## Methodology Summary

Wild Washington adapts different species datasets into a shared interface, but it does not flatten them into one fake metric.

- Some species use direct counts, some use minimum counts, and some use proxy or estimate-style indicators.
- Charts use observed checkpoints rather than inventing annual values between sparse source years.
- Comparison charts normalize each species to its own baseline so trajectories can be compared more honestly.
- Range maps are simplified teaching aids that highlight important Washington regions rather than exact occupied boundaries.
- Confidence is qualitative and should be read alongside each species' source notes and precision caveats.

## Tech Stack

- Next.js App Router
- React 19
- TypeScript
- Tailwind CSS v4
- Recharts
- Leaflet / React Leaflet

## Local Setup

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000)

## Available Scripts

```bash
npm run dev
npm run build
npm run lint
npm run start
```

## Project Structure

```text
app/            Routes, layout, metadata, and page-level composition
components/     Shared layout, species, and UI components
lib/data/       Source data, adapters, lesson planning content, and derived product helpers
public/         Static assets
types/          Shared TypeScript types
docs/           Release planning and supporting project notes
```

## Notes For Future Work

- Add formal automated tests and CI coverage for the data adapter layer and core user flows.
- Continue preparing the data model for expansion beyond Washington.
- Externalize more authored content from large TypeScript source files as the project grows.
