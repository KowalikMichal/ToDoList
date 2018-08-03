const items = JSON.parse(localStorage.getItem('items')) || [];
let taskList, addItems, actions;

document.addEventListener("DOMContentLoaded", evt => {
	readyFuntion();
});

function readyFuntion(){
	addItems = document.querySelector('.add-Items');
	taskList = document.querySelector('.list');
	actions = document.querySelector('.actions');

	populateList(items, taskList);
	addItems.addEventListener('submit', addItem);
	taskList.addEventListener('click', toggleDone);
	actions.addEventListener('click', deteminateAction);
}

function addItem(e) {
	e.preventDefault();
	const Text = (this.querySelector('[name=item]')).value;
	const item = {
		Text,
		done: false
	};
	items.push(item);
	populateList(items, taskList);
	localStorage.setItem('items', JSON.stringify(items));
	this.reset();
}

function populateList(tasks = [], taskList){
	taskList.innerHTML = tasks.map((task, i)=> {
		return `
			<li>
				<input type="checkbox" data-index=${i} id="item${i}" ${task.done ? 'checked':''}/>
				<label for="item${i}">${task.Text}</label>
				<input type="radio" data-index=${i} value="this" id="delete${i}"/>
				<label for="delete${i}"></label>
			</li>
		`;
	}).join('');
}

function toggleDone(e){
	if (e.target.matches('input[type="checkbox"]')){
		const element = e.target;
		const index = element.dataset.index;
		items[index].done = !items[index].done;
		localStorage.setItem('items', JSON.stringify(items));
		populateList(items, taskList);
	}else if (e.target.matches('input[type="radio"]')){
		const element = e.target;
		const index = element.dataset.index;
		items.splice(index, 1);
		localStorage.setItem('items', JSON.stringify(items));
		populateList(items, taskList);
	}else{
		return;
	}
}

function deteminateAction(e){
	e.preventDefault();
	const element = e.target;
	const action = element.dataset.action;
	switch (action) {
		case 'remove':
			clearAll();
			break;
		case 'change':
			var status = ~~element.dataset.done;
			changeStatus(status);
			break;
	}
}

function clearAll(){
	localStorage.removeItem('items');
	while (items.length) items.pop()
	populateList(items, taskList);
}

function changeStatus(status){
	items.map((task) => {
		task.done = status;
	});
	localStorage.setItem('items', JSON.stringify(items));
	populateList(items, taskList);
}