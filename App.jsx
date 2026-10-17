import { useEffect, useState } from 'react';
import Modal from './components/Modal.jsx';
import StudentForm from './components/StudentForm.jsx';
import StudentTable from './components/StudentTable.jsx';
import { loadStudents, saveStudents } from './utils/storage.js';
import './App.css';

function App() {
  
  const [students, setStudents] = useState(loadStudents);
  const [modal, setModal] = useState(null);
  const [notice, setNotice] = useState(null); // { type: 'success' | 'error', text }

  useEffect(() => {
    saveStudents(students);
  }, [students]);

  useEffect(() => {
    if (!notice) return undefined;
    const timer = setTimeout(() => setNotice(null), 3500);
    return () => clearTimeout(timer);
  }, [notice]);

  const closeModal = () => setModal(null);

  const addStudent = (student) => {
    setStudents((prev) => [...prev, student]);
    setNotice({ type: 'success', text: `${student.fullName} was added.` });
    closeModal();
  };

  const updateStudent = (updated) => {
    setStudents((prev) => prev.map((s) => (s.id === updated.id ? updated : s)));
    setNotice({ type: 'success', text: `${updated.fullName}'s record was updated.` });
    closeModal();
  };

  const deleteStudent = (studentToDelete) => {
    setStudents((prev) => prev.filter((s) => s.id !== studentToDelete.id));
    setNotice({ type: 'success', text: `${studentToDelete.fullName} was deleted.` });
    closeModal();
  };


  return (
    <div className="app">
      <header className="app-header">
        <div>
          <h1>Student Management System</h1>
          <p className="app-subtitle">
            {students.length} {students.length === 1 ? 'student' : 'students'} enrolled
          </p>
        </div>
        <button
          type="button"
          className="button button--primary"
          onClick={() => setModal({ type: 'add' })}
        >
          + Add student
        </button>
      </header>

      {notice && (
        <div className={`notice notice--${notice.type}`} role="status">
          {notice.text}
        </div>
      )}

      <main>
        <StudentTable
          students={students}
          onEdit={(student) => setModal({ type: 'edit', student })}
          onDelete={(student) => setModal({ type: 'delete', student })}
        />
      </main>

      {modal?.type === 'add' && (
        <Modal title="Add student" onClose={closeModal}>
          <StudentForm
            existingStudents={students}
            onSave={addStudent}
            onCancel={closeModal}
          />
        </Modal>
      )}

      {modal?.type === 'edit' && (
        <Modal title="Edit student" onClose={closeModal}>
          <StudentForm
            initialStudent={modal.student}
            existingStudents={students}
            onSave={updateStudent}
            onCancel={closeModal}
          />
        </Modal>
      )}

      {modal?.type === 'delete' && (
        <Modal title="Delete student" onClose={closeModal}>
          <p>
            Are you sure you want to delete <strong>{modal.student.fullName}</strong> (
            {modal.student.id})? This cannot be undone.
          </p>
          <div className="form-actions">
            <button type="button" className="button button--secondary" onClick={closeModal}>
              Cancel
            </button>
            <button
              type="button"
              className="button button--danger"
              onClick={() => deleteStudent(modal.student)}
            >
              Yes, delete
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default App;
