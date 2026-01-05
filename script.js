document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task-input');
    const prioritySelect = document.getElementById('priority-select');
    const categoryInput = document.getElementById('category-input');
    const addTaskBtn = document.getElementById('add-task-btn');
    const taskList = document.getElementById('task-list');
    const filterCategoryInput = document.getElementById('filter-category-input');
    const filterPrioritySelect = document.getElementById('filter-priority-select');

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    const saveTasks = () => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    const renderTasks = () => {
        taskList.innerHTML = ''; // Clear current tasks

        const filterCategory = filterCategoryInput.value.toLowerCase();
        const filterPriority = filterPrioritySelect.value;

        const filteredTasks = tasks.filter(task => {
            const matchesCategory = filterCategory === '' || (task.category && task.category.toLowerCase().includes(filterCategory));
            const matchesPriority = filterPriority === 'all' || task.priority === filterPriority;
            return matchesCategory && matchesPriority;
        });

        filteredTasks.forEach(task => {
            const li = document.createElement('li');
            li.className = `task-item ${task.completed ? 'completed' : ''} ${'priority-' + task.priority}`;
            li.setAttribute('data-id', task.id);

            li.innerHTML = `
                <span class="task-text">${task.text}</span>
                <div class="task-meta">
                    ${task.category ? `<span class="category-tag">${task.category}</span>` : ''}
                    <span class="priority-tag">${task.priority} Priority</span>
                </div>
                <div class="actions">
                    <button class="complete-btn">${task.completed ? 'Undo' : 'Complete'}</button>
                    <button class="delete-btn">Delete</button>
                </div>
            `;

            taskList.appendChild(li);
        });
    };

    const addTask = () => {
        const text = taskInput.value.trim();
        const priority = prioritySelect.value;
        const category = categoryInput.value.trim();

        if (text === '') {
            alert('Task description cannot be empty!');
            return;
        }

        const newTask =.idea/sonarlint/issuestore/2/8/28f328637041f02c0356501168128d9a26315268
            id: Date.now(),
            text,
            priority,
            category,
            completed: false
        };

        tasks.push(newTask);
        saveTasks();
        renderTasks();

        taskInput.value = '';
        categoryInput.value = '';
        prioritySelect.value = 'low'; // Reset to default
    };

    const toggleTaskComplete = (id) => {
        const taskIndex = tasks.findIndex(task => task.id === id);
        if (taskIndex > -1) {
            tasks[taskIndex].completed = !tasks[taskIndex].completed;
            saveTasks();
            renderTasks();
        }
    };

    const deleteTask = (id) => {
        tasks = tasks.filter(task => task.id !== id);
        saveTasks();
        renderTasks();
    };

    addTaskBtn.addEventListener('click', addTask);

    taskList.addEventListener('click', (event) => {
        const target = event.target;
        const li = target.closest('.task-item');
        if (!li) return;

        const taskId = parseInt(li.getAttribute('data-id'));

        if (target.classList.contains('complete-btn')) {
            toggleTaskComplete(taskId);
        } else if (target.classList.contains('delete-btn')) {
            deleteTask(taskId);
        }
    });

    filterCategoryInput.addEventListener('input', renderTasks);
    filterPrioritySelect.addEventListener('change', renderTasks);

    // Initial render
    renderTasks();
});
