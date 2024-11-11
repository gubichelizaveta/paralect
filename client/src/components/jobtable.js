import React, { useState, useEffect } from 'react';
import axios from 'axios';
import JobForm from './jobform';
import '../jobtable.css'

function JobTable() {
    const [jobs, setJobs] = useState([]);
    const [selectedJob, setSelectedJob] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false); 

    useEffect(() => {
        fetchJobs();
    }, []);

    const fetchJobs = async () => {
        const res = await axios.get('/api/jobs');
        setJobs(res.data);
    };

    const deleteJob = async (id) => {
        await axios.delete(`/api/jobs/${id}`);
        fetchJobs();
    };

    const editJob = (job) => {
        setSelectedJob(job);
        setIsModalOpen(true);
    };

    const openAddJobForm = () => {
        setSelectedJob(null); 
        setIsModalOpen(true); 
    };

    const closeModal = () => {
        setIsModalOpen(false); 
    };

    return (
        <div className="job-table-container">
            <h1>вакансии</h1>
            <button className="add-button" onClick={openAddJobForm}>+</button>
            
            <table className="job-table">
                <thead>
                    <tr>
                        <th>Компания</th>
                        <th>Вакансия</th>
                        <th>Зарплатная вилка</th>
                        <th>Статус</th>
                        <th>Заметка</th>
                        <th>Действия</th>
                    </tr>
                </thead>
                <tbody>
                    {jobs.map((job) => (
                        <tr key={job._id}>
                            <td>{job.company}</td>
                            <td>{job.position}</td>
                            <td>{job.salaryRange}</td>
                            <td>{job.status}</td>
                            <td>{job.note}</td>
                            <td>
                                <button onClick={() => editJob(job)}>Редактировать</button>
                                <button onClick={() => deleteJob(job._id)}>Удалить</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {isModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <JobForm
                            refreshJobs={fetchJobs}
                            selectedJob={selectedJob}
                            setSelectedJob={setSelectedJob}
                            closeModal={closeModal}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

export default JobTable;
