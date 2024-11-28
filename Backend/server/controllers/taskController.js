import pool from '../db.js';

export const getTasks = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM tasks ORDER BY id ASC');
    res.json(result.rows);
  } catch (err) {
    console.error('Error getting tasks:', err);
    res.status(500).json({ error: 'Failed to get tasks' });
  }
};

export const getTask = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM tasks WHERE id = $1', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Task not found' });
    }
    
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error getting task:', err);
    res.status(500).json({ error: 'Failed to get task' });
  }
};

export const createTask = async (req, res) => {
  try {
    const { title, description, status, additionalInfo } = req.body;
    const result = await pool.query(
      'INSERT INTO tasks (title, description, status, additional_info) VALUES ($1, $2, $3, $4) RETURNING *',
      [title, description, status, additionalInfo]
    );
    
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error creating task:', err);
    res.status(500).json({ error: 'Failed to create task' });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status, additionalInfo } = req.body;
    
    const result = await pool.query(
      'UPDATE tasks SET title = $1, description = $2, status = $3, additional_info = $4 WHERE id = $5 RETURNING *',
      [title, description, status, additionalInfo, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Task not found' });
    }
    
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error updating task:', err);
    res.status(500).json({ error: 'Failed to update task' });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM tasks WHERE id = $1 RETURNING *', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Task not found' });
    }
    
    res.json({ message: 'Task deleted successfully' });
  } catch (err) {
    console.error('Error deleting task:', err);
    res.status(500).json({ error: 'Failed to delete task' });
  }
}; 