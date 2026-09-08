---
name: "Seedrlike"
date: "2026-06-21"
range: "Jan 2025 - Present"
skills:
  - "Go"
  - "HTMX"
  - "AlpineJS"
  - "TailwindCSS"
  - "Daisy UI"
  - "Templ"
  - "Air"
  - "MySQL"
  - "sqlc"
  - "goose"
  - "Coolify"

tags:
  - "Web App"
  - "File Management"
  - "Real-time"
images:
  - "/images/seedrlike/seedrlike-downloading.png"
  - "/images/seedrlike/seedrlike-uploading.png"

shortDescription: "A self-hosted torrent-to-HTTPS web app with private accounts, built-in search, live transfer progress, optional ZIP packaging, and a responsive file manager."
links:
  github: "https://github.com/plutack/seedrlike"
  live: "https://torrent.talut.xyz"
---

Seedrlike is a self-hosted web app inspired by [Seedr](https://seedr.cc). Users can search for a torrent or paste a magnet link, let the server download and upload its contents, then retrieve the files over HTTPS without running a torrent client locally.

The redesigned interface works like a responsive file manager, with folder navigation, light and dark themes, active-transfer controls, and clear states for downloading, zipping, and uploading. Username and password authentication uses bcrypt and JWT-backed HTTP-only cookies, while stored files and live WebSocket updates are scoped to each signed-in user.

## Features

- Built-in torrent search with source, seeder, size, and name filtering
- Magnet-link downloads with configurable concurrency and cancellation controls
- Live progress, transferred size, speed, and ETA across download, ZIP, and upload stages
- Optional ZIP packaging before files are uploaded to GoFile for HTTPS access
- Account registration, login, logout, and user-scoped file libraries
- Responsive folder browsing, file deletion, stale-content cleanup, and light or dark themes
