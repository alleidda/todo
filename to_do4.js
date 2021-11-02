let to_do = document.getElementById('to_do');
let to_do_case = document.getElementById('to_do_case');
let btn_add = document.getElementById('btn_add');
let btn_delete = document.getElementById('delete');
let task_list = [];
let task_id = 0;
let task_edit_id = 0;
let local_tab = localStorage.getItem("tab");

if (local_tab == null) {
    document.getElementById("message").innerHTML = '';
}
else {
    local_tab = local_tab.split(",");
    console.log("task = "+ local_tab);
    let new_tab = local_tab.filter(function(nb) {
        return nb != '';
    })
    console.log(new_tab);
    task_list = local_tab;
    task_id = task_list.length;
    create_task(new_tab);
}

btn_add.addEventListener('click', () => {
    if (btn_add.textContent == 'Add') {
        if (to_do_case.value !=='') {
        task_list[task_id]= to_do_case.value;
    task_id++;
        }
    }
    else if (btn_add.textContent == 'Edit') {
        task_list[task_edit_id] = to_do_case.value;
        btn_add.textContent = 'Add';
    }
    let new_tab = task_list.filter(function(nb) {
        return nb != '';
    })
    create_task(new_tab);
    localStorage.setItem("tab", new_tab.toString());
})

function create_task(tabs)
{ 
let tasks = '';
tabs.forEach((tab,index) => {
 tasks += `
 <tr>
 <td>
 <i class="fa fa-sun-o" aria-hidden="true"></i>
 </td>
 <td id="to_do_text">${tab}</td>
 <td id="options">
    <button class="btn btn-primary" id="edit" onclick = "edit_task(${index})"><i class="far fa-edit"></i></button>
    <button class="btn btn-danger" id="delete" onclick = "delete_task(${index})"><i class="far fa-trash-alt "></i></button>
 </td>
 </tr>
 `;
});
to_do.innerHTML = tasks;
}

function edit_task(num_task)
{
    to_do_case.value = task_list[num_task];
    btn_add.textContent = "Edit";
    task_edit_id = num_task;
}

function delete_task(num_task)
{
    console.log(num_task);
    task_list.splice(num_task, 1);
    console.log(task_list);
    create_task(task_list);
    localStorage.setItem("tab", local_tab.toString());
}