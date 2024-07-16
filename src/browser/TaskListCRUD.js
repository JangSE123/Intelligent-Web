import React, { useState } from 'react';
import styles from './TaskListCRUD.module.css';
import axios from 'axios';

function TaskListCRUD({ tasks, setTasks, selectedDate }) {
    const [isEditing, setIsEditing] = useState(false);
    const [currentTask, setCurrentTask] = useState(null);
    const [newActValue, setNewActValue] = useState('');

    const displayDate = selectedDate || new Date();
    const formattedDate = displayDate.toISOString().split('T')[0];
    const dayName = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'][displayDate.getDay()];

    const handleEditClick = (task) => {
        setIsEditing(true);
        setCurrentTask(task);
        setNewActValue(task.name.split(' - ')[1]); // Adjust this line to extract `task.Act`
    };

    const handleEditSubmit = async () => {
        if (currentTask) {
            try {
                await axios.put('http://localhost:5001/api/tasks', {
                    id: currentTask.id,
                    act: newActValue,
                });
                // Update tasks in state after successful update
                setTasks(tasks.map(task =>
                    task.id === currentTask.id ? { ...task, name: task.name.split(' - ')[0] + ' - ' + newActValue } : task
                ));
                setIsEditing(false);
                setCurrentTask(null);
                setNewActValue('');
            } catch (error) {
                console.error('Error updating task:', error);
            }
        }
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        setCurrentTask(null);
        setNewActValue('');
    };

    return (
        <div>
            <div className={styles.container}>
                <div className={styles.header}>
                    <span>{dayName}</span>
                    <span className={styles.date}>{formattedDate}</span>
                </div>
                <div id="tasks">
                    {tasks.map((task) => (
                        <div key={task.id} className={styles.task}>
                            <div
                                className={task.status ? styles.green : styles.red}
                                style={{ cursor: 'pointer' }}
                            ></div>
                            <span
                                className={task.status ? styles.strikethrough : ''}
                                onClick={() => handleEditClick(task)}
                            >
                                {task.name}
                            </span>
                        </div>
                    ))}
                </div>
                {isEditing && (
                <div className={styles.edtContainer}>
                    <input
                        type="text"
                        value={newActValue}
                        onChange={(e) => setNewActValue(e.target.value)}
                        className={styles.acttext}
                    />
                    <button onClick={handleEditSubmit} className={styles.save}>저 장</button>
                    <button onClick={handleCancelEdit} className={styles.cancel}>취 소</button>
                </div>
            )}
        </div>
            </div>
            
    );
}

export default TaskListCRUD;
