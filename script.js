let currentTask = null;

function addTask() {
  const title = prompt('Digite o título da tarefa:');
  if (!title) return;
  const task = { title, status: 'todo' };
  renderTask(task);
}

function renderTask(task) {
  const container = document.getElementById('taskList');
  const div = document.createElement('div');
  div.className = 'task';
  div.dataset.status = task.status;
  div.innerHTML = `
    <h4>${task.title} <button onclick="editTask(this)">✏️</button></h4>
    <span class="status">${statusLabel(task.status)}</span>
  `;
  container.appendChild(div);
}

function statusLabel(status) {
  if (status === 'todo') return 'A Fazer';
  if (status === 'doing') return 'Em Progresso';
  if (status === 'done') return 'Feito';
}

function editTask(button) {
  const taskElement = button.closest('.task');
  currentTask = taskElement;
  document.getElementById('editTitle').value = taskElement.querySelector('h4').textContent.replace('✏️', '').trim();
  document.getElementById('editStatus').value = taskElement.dataset.status;
  document.getElementById('editModal').style.display = 'flex';
}

function closeModal() {
  document.getElementById('editModal').style.display = 'none';
}

function saveEdit() {
  const title = document.getElementById('editTitle').value;
  const status = document.getElementById('editStatus').value;
  if (currentTask) {
    currentTask.querySelector('h4').childNodes[0].textContent = title + ' ';
    currentTask.dataset.status = status;
    currentTask.querySelector('.status').textContent = statusLabel(status);
  }
  closeModal();
  filterTasks();
}

function filterTasks() {
  const filter = document.getElementById('statusFilter').value;
  const tasks = document.querySelectorAll('.task');
  tasks.forEach(t => {
    if (filter === 'all' || t.dataset.status === filter) {
      t.style.display = 'block';
    } else {
      t.style.display = 'none';
    }
  });
}