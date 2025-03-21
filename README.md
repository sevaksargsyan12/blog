# Interactive Data Grid Component

A reusable data grid component that dynamically handles different data types and renders cells with various functionalities.

### Stack

- Node.js
- Redis as data store (free url from render.com in .env file)
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

### Future Improvements

#### Backend and db

- If data volume increases, consider modifying the Task → Assignee relationship (e.g., use IDs instead of nested objects).
- Evaluate the need for a different database system to handle scalability.
- Improve error handling in the backend.

#### Front End

- Move data fetching logic from the Home component to a dedicated service layer.
- If the data grows significantly and UI becomes complex, integrate state management solutions like Context API or Redux.
- In the AssigneeCell component, fetch users dynamically from the backend when filtering, requiring backend modifications as well.
- Introduce more reusable UI components (e.g., Avatar, Input, etc.) for better maintainability.
