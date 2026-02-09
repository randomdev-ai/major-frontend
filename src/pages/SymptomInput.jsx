import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppLayout from '../layouts/AppLayout.jsx';
import Card from '../components/Card.jsx';
import Button from '../components/Button.jsx';
import Stepper from '../components/Stepper.jsx';

const symptomChips = ['Headache', 'Fever', 'Nausea', 'Fatigue'];

const SymptomInput = () => {
  const navigate = useNavigate();
  const [selectedChips, setSelectedChips] = useState([]);

  const toggleChip = (chip) => {
    setSelectedChips((prev) =>
      prev.includes(chip) ? prev.filter((item) => item !== chip) : [...prev, chip]
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate('/analysis');
  };

  return (
    <AppLayout>
      <div className="page-header">
        <h1>Symptom Input</h1>
        <p>Step-by-step structured intake with privacy-first handling.</p>
      </div>
      <Card>
        <Stepper current={1} total={3} />
        <form className="form-grid" onSubmit={handleSubmit}>
          <label className="full-width">
            Describe your symptoms
            <textarea placeholder="Share how you're feeling, when it started, and anything notable." rows={4} />
          </label>
          <div className="full-width">
            <p className="label">Quick symptoms</p>
            <div className="chip-group">
              {symptomChips.map((chip) => (
                <button
                  type="button"
                  key={chip}
                  className={`chip ${selectedChips.includes(chip) ? 'active' : ''}`}
                  onClick={() => toggleChip(chip)}
                >
                  {chip}
                </button>
              ))}
            </div>
          </div>
          <label>
            Duration
            <input type="text" placeholder="e.g., 3 days" />
          </label>
          <label>
            Temperature
            <input type="text" placeholder="e.g., 99.8°F" />
          </label>
          <label className="full-width">
            Pain severity
            <input type="range" min="0" max="10" defaultValue="4" />
          </label>
          <div className="upload-area full-width">
            <p>Optional file upload</p>
            <span>Drag & drop supporting files or browse</span>
          </div>
          <div className="form-actions full-width">
            <p className="privacy-note">Encrypted intake. Your data stays private and secure.</p>
            <Button type="submit">Submit for analysis</Button>
          </div>
        </form>
      </Card>
    </AppLayout>
  );
};

export default SymptomInput;
