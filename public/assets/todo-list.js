let app = {};
app.init = function(){
	const form = document.querySelector("form");
	
	form.addEventListener("submit",(e)=>{
		e.preventDefault();
		const item = document.querySelector("form input");
		const todo = {item:item.value};
		fetch("/todo",{
			method: "POST",
			headers: {"Content-Type": "application/json"},
			body:JSON.stringify(todo)
		})
			.then(response =>response.json())
			.then(data=>{
				location.reload();
			});
	}); 

	let allToDoList = document.querySelectorAll("li");
	for(let i = 0;i < allToDoList.length;i++){
		allToDoList[i].addEventListener("click",()=>{
			let _id = allToDoList[i].getAttribute("todo_id");
			fetch("/todo/" + _id,{method: "DELETE"})
				.then(response =>response.json())
				.then(data=>{
					location.reload();
				});
		});
	}
};

window.addEventListener("DOMContentLoaded", app.init);