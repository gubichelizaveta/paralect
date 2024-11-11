import React, { useState, useEffect } from 'react';
import axios from 'axios';

function JobForm({ refreshJobs, selectedJob, setSelectedJob, closeModal }) {
    const [formData, setFormData] = useState({
        company: '',
        position: '',
        salaryRange: '',
        status: '',
        note: ''
    });

    useEffect(() => {
        if (selectedJob) {
            setFormData(selectedJob);
        }
    }, [selectedJob]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (selectedJob) {
            await axios.put(`/api/jobs/${selectedJob._id}`, formData);
        } else {
            await axios.post('/api/jobs', formData);
        }
        setFormData({ company: '', position: '', salaryRange: '', status: '', note: '' });
        setSelectedJob(null);
        refreshJobs();
        closeModal();
    };

    return (
        <form onSubmit={handleSubmit} className="job-form">
            <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="Компания"
                required
            />
            <input
                type="text"
                name="position"
                value={formData.position}
                onChange={handleChange}
                placeholder="Вакансия"
                required
            />
            <input
                type="text"
                name="salaryRange"
                value={formData.salaryRange}
                onChange={handleChange}
                placeholder="Зарплатная вилка"
            />
            <input
                type="text"
                name="status"
                value={formData.status}
                onChange={handleChange}
                placeholder="Статус"
            />
            <textarea
                name="note"
                value={formData.note}
                onChange={handleChange}
                placeholder="Заметка"
            />
            <button className="submit-button" type="submit">{selectedJob ? 'Сохранить' : 'Добавить'}</button>
            <button className="close-button" type="button" onClick={closeModal}>Закрыть</button>
        </form>
    );
}

export default JobForm;
