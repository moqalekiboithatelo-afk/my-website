# Student Management System

An interactive web application for viewing, adding, editing and deleting student records.
Built with **React** and **JavaScript** (Vite) for the DIWA2110 Web Application Development
individual assignment, Limkokwing University of Creative Technology, Lesotho.

**Live application:** _add your Netlify or Vercel URL here_
**Repository:** _add your GitHub URL here_

---

## Features

- **Student dashboard** showing a responsive table with student ID, full name, age, email,
  course of study and enrollment status.
- **Add student**, **edit student** and **delete student** actions, each in a functional modal
  dialog that opens, closes (X button, Cancel, backdrop click or Escape) and manages its own form state.
- **Delete confirmation** before any record is removed.
- **Validation** with messages under each field: required fields, unique student IDs,
  whole-number age from 16 to 100, email format, and course and status from fixed lists.
  Invalid forms cannot be submitted.
- **Immediate updates** after every operation. No page refresh is needed.
- **Persistent storage** in `localStorage`, so records survive a refresh. The first run loads three sample records.
- **Empty-state message** when there are no students.
- **Responsive layout**: the table becomes stacked cards on narrow (mobile) screens.

## Technologies

| Area              | Used                                    |
| ----------------- | --------------------------------------- |
| UI framework      | React 18 (functional components, hooks) |
| Build tool        | Vite                                    |
| Testing           | Vitest, React Testing Library, jsdom    |
| Storage           | Browser `localStorage`                  |

## Project structure

```
student-management-system/
├── index.html                  # Vite entry HTML
├── package.json                # Scripts and dependencies
├── vite.config.js              # Vite + Vitest configuration
├── src/
│   ├── main.jsx                # Mounts <App /> into the page
│   ├── App.jsx                 # Root component: student state, CRUD handlers, which modal is open
│   ├── App.css                 # Layout, table, modal, form and responsive styles
│   ├── index.css               # Global variables and base styles
│   ├── setupTests.js           # Test setup (jest-dom matchers)
│   ├── components/
│   │   ├── Modal.jsx           # Reusable modal dialog (open/close, Escape, backdrop, focus)
│   │   ├── StudentForm.jsx     # Controlled add/edit form with validation
│   │   └── StudentTable.jsx    # Dashboard table with empty state and Edit/Delete buttons
│   ├── utils/
│   │   ├── constants.js        # Course list, status list, age limits
│   │   ├── storage.js          # Load/save helpers for localStorage, sample data
│   │   └── validation.js       # Pure validation functions (easy to test)
│   └── __tests__/
│       ├── validation.test.js  # Unit tests for every validation rule
│       └── App.test.jsx        # Integration tests for add, edit, delete, cancel, empty state
└── .gitignore                  # Excludes node_modules and build output
```

## Getting started

Requirements: **Node.js 18 or later** and npm.

```bash
# 1. Install dependencies (creates node_modules locally; it is not committed)
npm install

# 2. Start the development server, then open the URL shown (usually http://localhost:5173)
npm run dev

# 3. Run the test suite
npm test

# 4. Create a production build in the dist/ folder
npm run build

# 5. Preview the production build locally
npm run preview
```

## How it works

- **State.** `App.jsx` holds the list of students in `useState`. It is loaded from `localStorage`
  once, and a `useEffect` saves it again whenever the list changes.
- **Modals.** A single `modal` state value decides which dialog is shown: `null`, `{ type: 'add' }`,
  `{ type: 'edit', student }` or `{ type: 'delete', student }`. Closing a modal sets it back to `null`.
- **Props.** `App` passes data and callbacks down to `StudentTable`, `StudentForm` and `Modal`.
  Child components never change the list themselves. They call the handlers they were given.
- **Validation.** `validateStudent()` in `utils/validation.js` is a pure function. It takes the form values
  and the existing students, and returns an object of error messages. The form only saves when that object is empty.
- **Editing.** The student ID is locked while editing, so records stay traceable. The duplicate-ID
  check ignores the record being edited.

## JavaScript concepts used

| Concept | Where |
| --- | --- |
| Primitive types (`string`, `number`, `boolean`) | Form values, `age`, `status` checks, `Boolean(initialStudent)` |
| Non-primitive types (`array`, `object`) | Student list (array of objects), error and form objects |
| `const` | Values that are never reassigned, such as `NAME_PATTERN`, `COURSES`, the React hooks' return values |
| `let` | Values that change inside a block, for example in loops or conditional assignments |
| `var` | Not used. `var` has function scope and no block scope, so `let` and `const` are safer. |
| User-defined functions | `validateStudent`, `loadStudents`, `saveStudents`, `fillForm` (in tests) |
| Arrow functions | Event handlers, `addStudent`, `updateStudent`, `deleteStudent`, array callbacks |
| Array methods | `map` (table rows and option lists), `filter` (delete), `some` (duplicate check), `reduce` (mark all fields touched) |
| Conditional statements | `if`/`else` in validation, `&&` and `?.` in JSX, the `modal?.type` checks |
| Event handling | `onChange`, `onBlur`, `onSubmit` (with `preventDefault`), `onClick`, Escape key listener |

## Testing

`npm test` runs two test files:

- **`validation.test.js`** checks every validation rule: required fields, ID format and uniqueness,
  name characters, age range and whole numbers, email format, and the course and status lists.
- **`App.test.jsx`** checks the user flows end to end in a simulated browser:
  - add a student (valid data, and invalid data showing messages);
  - reject a duplicate student ID;
  - edit a student, and cancel an edit without saving;
  - delete a student after confirming, and cancel a delete;
  - close a modal with Escape;
  - show the empty state when no students remain;
  - save changes to `localStorage`.

## Deployment (Netlify)

1. Push the project to GitHub. `node_modules` and `dist` are excluded by `.gitignore`.
2. In Netlify choose **Add new site → Import an existing project** and select the repository.
3. Use these settings: **Build command** `npm run build`, **Publish directory** `dist`.
4. Deploy, then open the generated URL and check that adding, editing and deleting work.

Vercel works the same way. It detects Vite automatically, so the default settings are fine.

## Notes and limitations

- Data is stored in the browser where the user is working. It is not shared between devices or users.
  Clearing site data removes the records. The first run reloads the three sample records.
- Authentication and a backend database are outside the scope of this assignment.
