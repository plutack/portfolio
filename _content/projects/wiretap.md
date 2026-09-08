---
name: "Wiretap"
date: "2026-07-20"
range: "Jul 2026 - Present"
skills:
  - "Go"
  - "TypeScript"
  - "Wails"
  - "Preact"
  - "SQLite"
  - "Bubble Tea"
tags:
  - "Developer Tool"
  - "Desktop App"
  - "CLI"
images:
  - "/images/wiretap/wiretap-webhooks.png"
  - "/images/wiretap/wiretap-intercept.png"
  - "/images/wiretap/wiretap-transforms.png"

shortDescription: "A local HTTP debugging toolkit for capturing traffic, receiving public webhooks, transforming payloads, replaying requests, and exporting them as code."
links:
  github: "https://github.com/plutack/wiretap"
---

Wiretap brings local HTTP inspection and public webhook testing into one self-hosted developer tool. Its desktop GUI, terminal UI, and CLI share the same local store, so captured traffic and webhook deliveries can be inspected, transformed, replayed, and exported without sending sensitive request data through a third-party debugging service.

## Features

- Captures HTTP and HTTPS traffic from an isolated shell through a local recording proxy
- Receives public webhooks through a self-hosted relay, including deliveries sent while the desktop is offline
- Runs local JavaScript transforms on requests, responses, replays, and incoming webhooks
- Replays stored webhooks to a local target and exports captures as runnable code snippets
- Provides desktop, terminal, and command-line interfaces over the same SQLite data
