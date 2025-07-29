# Notepad Pro WebFrontendContainer

This is the main web frontend for Notepad Pro, a full-featured notes application.

## Features

- User registration, login, and profile management
- Rich text note creation, editing, and deletion
- Note organization with folders and tags
- Full-text search and advanced filtering
- Real-time synchronization of notes/changes (via WebSocket)
- Responsive and accessible web interface (keyboard, ARIA, color contrast)
- REST API and WebSocket integration with backend
- Automated testing support

## Environment Variables

Copy `.env.example` to `.env` and fill in:

```
REACT_APP_API_URL=...
REACT_APP_WS_URL=...
```

## Accessibility & Usability

- All interactive elements are keyboard accessible.
- Uses ARIA labels/roles.
- Good color contrast; dark/light mode toggle.
- Live-region for loading/error.
- Responsive on desktop, tablet, and mobile.

## Running & Developing

```
npm install
npm start
```

Runs on http://localhost:3000

## Testing

```
npm test
```

