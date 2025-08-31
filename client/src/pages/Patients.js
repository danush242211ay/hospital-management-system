import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PatientForm from '../components/PatientForm';
import PatientList from '../components/PatientList';

const Patients = () => {
  const [patients, setPatients] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingPatient, setEditingPatient] = useState(null);

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const response = await axios.get('/api/patients');
      setPatients(response.data);
    } catch (error) {
      console.error('Error fetching patients:', error);
    }
  };

  const handleCreatePatient = async (patientData) => {
    try {
      await axios.post('/api/patients', patientData);
      fetchPatients();
      setShowForm(false);
    } catch (error) {
      console.error('Error creating patient:', error);
    }
  };

  const handleUpdatePatient = async (id, patientData) => {
    try {
      await axios.put(`/api/patients/${id}`, patientData);
      fetchPatients();
      setEditingPatient(null);
    } catch (error) {
      console.error('Error updating patient:', error);
    }
  };

  const handleDeletePatient = async (id) => {
    if (window.confirm('Are you sure you want to delete this patient?')) {
      try {
        await axios.delete(`/api/patients/${id}`);
        fetchPatients();
      } catch (error) {
        console.error('Error deleting patient:', error);
      }
    }
  };

  return (
    <div>
      <div className="page-header">
        <h1>Patient Management</h1>
        <button 
          className="btn btn-primary"
          onClick={() => setShowForm(true)}
        >
          Add New Patient
        </button>
      </div>

      {showForm && (
        <PatientForm
          onSubmit={handleCreatePatient}
          onCancel={() => setShowForm(false)}
        />
      )}

      {editingPatient && (
        <PatientForm
          patient={editingPatient}
          onSubmit={(data) => handleUpdatePatient(editingPatient._id, data)}
          onCancel={() => setEditingPatient(null)}
        />
      )}

      <PatientList
        patients={patients}
        onEdit={setEditingPatient}
        onDelete={handleDeletePatient}
      />
    </div>
  );
};

export default Patients;