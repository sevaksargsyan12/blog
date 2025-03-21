# Simple Blog CRUD

A minimal blog monorepo application where users can create, edit, delete, and view blog posts.

### Stack

- Node.js
- Postgres as data store (free url from render.com in .env file)
- React / Typescript

### Prerequisites

What things you need to install the software and how to install them:

- [Node.js](https://nodejs.org/) - JavaScript runtime built on Chrome's V8 JavaScript engine.
- [pnpm](https://pnpm.io/installation) - Fast, disk space efficient package manager:

  ```bash
  npm install -g pnpm
  ```
### Installation

#### Locally
To run the project in development mode:

- Navigate to the project's root folder.
- Install dependencies
```bash
  pnpm install-all
```
- Start the development server:

```bash
  pnpm run dev
```

#### For production
To build and start the project for production:
- Navigate to the project's root folder.
- run this commands

Install dependencies:
```bash
  pnpm install-all
```

Build the project:
```bash
  pnpm run build
```

Start the production server:
```bash
  pnpm run start
```

