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
  - "Air"
  - "MySQL"
  - "sqlc"
  - "goose"
  - "Coolify"

tags:
  - "Web App"
  - "CRUD App"
  - "Generative AI"
images:
  - "/images/seedrlike/seedrlike.png"

shortDescription: "A web app that lets you add magnet links and download torrents over HTTPS, with real-time progress streamed over websockets."
links:
  github: "https://github.com/plutack/seedrlike"
  live: "https://torrent.talut.xyz"
---

Seedrlike is a personal replication of [seedr](https://seedr.cc). Add a magnet link and the torrent becomes available for download over HTTPS — no torrent client needed on the user's end. The codebase uses a MySQL database (managed with goose migrations and sqlc) to keep track of what has been or is being downloaded, and websockets push real-time updates — download progress, speed, and ETA — to drive an intuitive UI.

Some key features of the project include:

- Torrent downloads initiated via magnet links
- Websockets streaming real-time progress, speed, and ETA (including upload-stage events)
- Download history for completed torrent folders
- Dockerized and configurable via direnv/envrc
