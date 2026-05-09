# Nota — Notes App (Bootstrap + Spring Boot)

## Run the app

```bash
npm install
npm run dev
# Open http://localhost:5173
```

Make sure your Spring Boot backend is running on port 8080.
Add CorsConfig.java (from earlier) so the browser allows cross-origin requests.

## Demo
Register a new account → then sign in with the same credentials.

## Project structure

```
src/
  api/
    notesApi.js        ← ALL fetch calls to Spring Boot (one place)
  hooks/
    useAuth.js         ← register & login logic
    useNotes.js        ← fetch, add, edit, delete notes
  components/
    Navbar.jsx         ← top navigation bar
    NoteCard.jsx       ← single note card in the grid
    NoteModal.jsx      ← add/edit note popup
    SkeletonGrid.jsx   ← loading placeholder
  pages/
    LoginPage.jsx      ← sign in + register tabs
    DashboardPage.jsx  ← main notes view
  styles/
    app.css            ← custom CSS on top of Bootstrap
  App.jsx              ← root, manages login state
  main.jsx             ← entry point, imports Bootstrap
```

## API endpoints used

| Action      | Method | Endpoint                      |
|-------------|--------|-------------------------------|
| Register    | POST   | /api/users/register           |
| Get user    | GET    | /api/users/{id}               |
| Get notes   | GET    | /api/notes/user/{userId}      |
| Create note | POST   | /api/notes/user/{userId}      |
| Update note | PUT    | /api/notes/{id}               |
| Delete note | DELETE | /api/notes/{id}               |
