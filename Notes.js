const todos = document.querySelectorAll(".todo");
const all_status = document.querySelectorAll(".status");
let draggableTodo = null;

todos.forEach((todo) => {
    todo.addEventListener("dragstart", dragStart);
    todo.addEventListener("dragend", dragEnd);
});

function dragStart() {
    draggableTodo = this;
    setTimeout(() => {
        this.style.display = "none";
    }, 0);
    console.log("dragStart");
}

function dragEnd() {
    draggableTodo = null;
    setTimeout(() => {
        this.style.display = "block";
    }, 0);
    console.log("dragEnd");
}

all_status.forEach((status) => {
    status.addEventListener("dragover", dragOver);
    status.addEventListener("dragenter", dragEnter);
    status.addEventListener("dragleave", dragLeave);
    status.addEventListener("drop", dragDrop);
});

function dragOver(e) {
    e.preventDefault();
    //   console.log("dragOver");
}

function dragEnter() {
    this.style.border = "1px dashed #ccc";
    console.log("dragEnter");
}

function dragLeave() {
    this.style.border = "none";
    console.log("dragLeave");
}

function dragDrop() {
    this.style.border = "none";
    this.appendChild(draggableTodo);
    console.log("dropped");
}

/* modal */
const btns = document.querySelectorAll("[data-target-modal]");
const close_modals = document.querySelectorAll(".close-modal");
const overlay = document.getElementById("overlay");

btns.forEach((btn) => {
    btn.addEventListener("click", () => {
        document.querySelector(btn.dataset.targetModal).classList.add("active");
        overlay.classList.add("active");
    });
});

close_modals.forEach((btn) => {
    btn.addEventListener("click", () => {
        const modal = btn.closest(".modal");
        modal.classList.remove("active");
        overlay.classList.remove("active");
    });
});

window.onclick = (event) => {
    if (event.target == overlay) {
        const modals = document.querySelectorAll(".modal");
        modals.forEach((modal) => modal.classList.remove("active"));
        overlay.classList.remove("active");
    }
};

/* create todo  */
// const todo_submit = document.getElementById("todo_submit");

// todo_submit.addEventListener("click", createTodo);

// function createTodo() {
//     const todo_div = document.createElement("div");
//     const input_val = document.getElementById("todo_input").value;
//     const txt = document.createTextNode(input_val);

//     todo_div.appendChild(txt);
//     todo_div.classList.add("todo");
//     todo_div.setAttribute("draggable", "true");

//     /* create span */
//     const span = document.createElement("span");
//     const span_txt = document.createTextNode("\u00D7");
//     span.classList.add("close");
//     span.appendChild(span_txt);

//     todo_div.appendChild(span);

//     no_status.appendChild(todo_div);

//     span.addEventListener("click", () => {
//         span.parentElement.style.display = "none";
//     });
//     //   console.log(todo_div);

//     todo_div.addEventListener("dragstart", dragStart);
//     todo_div.addEventListener("dragend", dragEnd);

//     document.getElementById("todo_input").value = "";
//     todo_form.classList.remove("active");
//     overlay.classList.remove("active");
// }

const close_btns = document.querySelectorAll(".close");

close_btns.forEach((btn) => {
    btn.addEventListener("click", () => {
        btn.parentElement.style.display = "none";
    });
});

function showData() {

    let user_record = new Array();
    user_record = JSON.parse(localStorage.getItem("user")) ? JSON.parse(localStorage.getItem("user")) : []
    if (user_record) {
        for (let i = 0; i < user_record.length; i++) {

            console.log(user_record[i]);
            let addDiv = document.createElement('div');
            addDiv.className = "todo";
            addDiv.setAttribute("draggable", "true");
            addDiv.innerHTML = `${user_record[i].task} <span style='font-size:40px;'  onclick="edittask(${i})" >&#x270D;</span> <span style='font-size:40px;'  onclick="ondel(${i})" >&times;</span>
           
         
        `;
            addDiv.addEventListener("dragstart", dragStart);
            addDiv.addEventListener("dragend", dragEnd);
            document.getElementById("no_status").appendChild(addDiv);

        }
    }
}

function getval() {

    const val = document.getElementById('todo_input').value;
    console.log(val);
    let user_record = new Array();
    user_record = JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')) : []
    user_record.push({
        'task': val,
    })


    localStorage.setItem('user', JSON.stringify(user_record));
    document.getElementById('todo_form').style.display = 'none';
    todo_form.classList.remove('active')
    overlay.classList.remove("active");
    document.getElementById("myForm").reset();




    location.reload(true);


}
function ondel(i) {

    let webtask = localStorage.getItem('user');
    console.log(webtask);
    let taskobj = JSON.parse(webtask);
    console.log(taskobj);
    taskobj.splice(i, 1);
    localStorage.setItem('user', JSON.stringify(taskobj));

    // var delitem = JSON.parse()
    // delitem.splice(i, 1);
    // localStorage.setItem('user', JSON.stringify(delitem));
    // var key = document.getElementById('fullName').value; //gets key from user
    // localStorage.removeItem(key) //passes key to the removeItem method
    // console.log("remove items");
    location.reload(true);

}
function edittask(i) {
    console.log('yessss');


    todo_form.classList.add("active");
    overlay.classList.add("active");
    let todo_input;
    todo_input = document.getElementById('todo_input');


    let saveindex = document.getElementById("saveindex");
    let addtaskbtn = document.getElementById("addtaskbtn");
    let todo_submit = document.getElementById("todo_submit");
    saveindex.value = i;
    console.log(saveindex.value);
    let webtask = localStorage.getItem('user');
    let taskObj = JSON.parse(webtask);

    // addtaskinput.value = taskObj[index]['task_name'];
    todo_input.value = taskObj[i]['task'];


    todo_submit.style.display = 'none';
    addtaskbtn.style.display = 'block';


}





// savetask

function task() {
    let todo_input;
    todo_input = document.getElementById('todo_input');



    let webtask = localStorage.getItem("user");
    let taskObj = JSON.parse(webtask);
    let saveindex = document.getElementById("saveindex").value;

    let addtaskbtn = document.getElementById("addtaskbtn");
    let todo_submit = document.getElementById("todo_submit");
    // taskObj[saveindex] = 

    for (keys in taskObj[saveindex]) {
        if (keys == 'task') {
            // taskObj[saveindex].task_name = addtaskinput.value;

            taskObj[saveindex]['task'] = todo_input.value;



        }
        // if(keys == 'email'){
        //     taskObj[saveindex].email = email;
        // }
        // if(keys == 'mobile'){
        //     taskObj[saveindex].mobile = mobile;
        // }
        // if(keys == 'state'){
        //     taskObj[saveindex].state = state;
        // }
        // if(keys == 'city'){
        //     taskObj[saveindex].city = city;
        // }
    }
    // taskObj[saveindex] = {'task_name':addtaskinput.value, 'completeStatus':false} ;
    //  taskObj[saveindex][task_name] = addtaskinput.value;

    localStorage.setItem("user", JSON.stringify(taskObj));


    todo_submit.style.display = 'block';
    addtaskbtn.style.display = 'none';

    

    todo_form.classList.remove('active')
    overlay.classList.remove("active");
     location.reload(true);
}




showData()
