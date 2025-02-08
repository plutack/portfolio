---
name: "Seedrlike"
date: "2025-01-02"
range: "Jan 2025 - Feb 2025"
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

shortDescription: "A web application for dowonloading torrents and uploading them to gofile."
links:
  github: "https://github.com/plutack/seedrlike"
---

Seedrlike is a personal replication of [seedr](https://seedr.cc). The web app can be used to download torrents while saving the download files to gofiles. The codebase implements an SQL database to keep track what has or is being downloaded. Another core technology was the use of websocket to get real time updates in form of torrent status, download speed rate, download progress and some other details to develop an intuitive design.
Some key features of the project include:

- Torrents download via magnet Link
- Websockets for real-time updates about a torrent marked for download
- Download history kept for available torrent folders.
