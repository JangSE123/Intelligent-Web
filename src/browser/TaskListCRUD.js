import React, { useState } from 'react';
import styles from './TaskListCRUD.module.css';
import axios from 'axios';

function TaskListCRUD({ tasks, setTasks, selectedDate }) {
    const [isEditing, setIsEditing] = useState(false);
    const [currentTask, setCurrentTask] = useState(null);
    const [newTaskName, setNewTaskName] = useState('');

    const displayDate = selectedDate || new Date();
    const formattedDate = displayDate.toISOString().split('T')[0];
    const dayName = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'][displayDate.getDay()];

    const toggleTaskStatus = (id) => {
        setTasks(prevTasks =>
            prevTasks.map(task =>
                task.id === id ? { ...task, status: !task.status } : task
            )
        );
    };

    const handleEditSubmit = async () => {
        if (currentTask) {
            try {
                await axios.put('/api/tasks', {
                    id: currentTask.id,
                    name: newTaskName,
                });
                // update tasks in state after successful update
                setTasks(tasks.map(task =>
                    task.id === currentTask.id ? { ...task, name: newTaskName } : task
                ));
                setIsEditing(false);
                setCurrentTask(null);
                setNewTaskName('');
            } catch (error) {
                console.error('Error updating task:', error);
            }
        }
    };

    return (
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
                            onClick={() => toggleTaskStatus(task.id)}
                            style={{ cursor: 'pointer' }}
                        ></div>
                        <span className={task.status ? styles.strikethrough : ''}>
                            {task.name}
                        </span>
                    </div>
                ))}
            </div>
            {isEditing && (
                <div>
                    <input
                        type="text"
                        value={newTaskName}
                        onChange={(e) => setNewTaskName(e.target.value)}
                    />
                    <button onClick={handleEditSubmit}>Save</button>
                    <button onClick={() => setIsEditing(false)}>Cancel</button>
                </div>
            )}
        </div>
    );
}

export default TaskListCRUD;
