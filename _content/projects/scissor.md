---
name: "Scissor"
date: "2024-08-07"
range: "Jul 2024 - Aug 2024"
skills:
  - "PostgreSQL"
  - "Redis"
  - "nodeJS"
  - "Typescript"
  - "NextJS"
  - "Prisma"
tags:
  - "Web App"
  - "CRUD App"
images:
  - "/images/scissor/landing.png"
  - "/gifs/scissor/home.png"
  - "/gifs/scissor/link.png"
  - "/gifs/scissor/single.png"

shortDescription: "A sleek URL shortening service offering custom links, QR code generation, and basic analytics to streamline link sharing and management"
links:
  github: "https://github.com/plutack/scissor"
  live: "https://scissor.talut.tech"
---

Scissor is a fully featured URL shortening service that offers custom links, QR code generation, and basic analytics to streamline link sharing and management.

Some key features of the project include:

- Custom URL shortening: Users can create their own short URLs with a customizable domain and title.
- QR code generation: Users can generate QR codes for their short URLs, which can be easily scanned by other devices.
- Basic analytics: Users can view their short URL statistics, including the number of clicks, views, and unique visitors.
- charts: Users can view their short URL statistics in a chart format.
- Real-time data fetching: The server uses Redis to cache data and fetches real-time data from the database to enhance the user experience.

The project is built using Next.js, TypeScript, and Redis for caching and real-time data fetching. It also uses NextAuth.js for authentication and password resets. The QR code generation is implemented using the qrcode library.

Overall, Scissor is a user-friendly and efficient URL shortening service that provides a range of features to make it easy for users to share and manage their URLs.
