function renderCategory(divId, tasks) {
    $(`${divId} .tasks`).html("");
    for (const task of tasks) {
        $(`${divId} .tasks`).append(`
        <div class="task" data-id="${task.id}">
            <div class="row mx-0 clickable" data-toggle="collapse" data-target="#actions-${task.id}">
                <div class="col">${task.title}</div>
                <div class="col-auto pr-2 pt-1"><i class="fas fa-angle-down"></i></div>
            </div>
            <div class="row mx-n1 pt-1 collapse" id="actions-${task.id}">
                <div class="col p-0">
                    <button type="button" class="btn btn-primary btn-block rounded-0 btn-sm">Prev</button>
                </div>
                <div class="col p-0">
                    <button type="button" class="btn btn-secondary btn-block rounded-0 btn-sm">Edit</button>
                </div>
                <div class="col p-0">
                    <button type="button" class="btn btn-secondary btn-block rounded-0 btn-sm">Delete</button>
                </div>

                <div class="col p-0">
                    <button type="button" class="btn btn-success btn-block rounded-0 btn-sm">Next</button>
                </div>
            </div>
        </div>
        `);
    }
}

function renderAll(model) {
    renderCategory("#backlog", model.backlog);
    renderCategory("#product", model.product);
    renderCategory("#development", model.development);
    renderCategory("#done", model.done);
}

function showKanban() {
    $("#kanban").show();
    $("#login").hide();
    $("#register").hide();
    $("body").addClass("blue");
    $.ajax("http://localhost:3000/todos", {
        type: "GET",
        headers: {
            "Authorization": localStorage.jwt
        }
    })
    .done(todos => {
        const model = {
            backlog: [],
            product: [],
            development: [],
            done: []
        };
        for (const todo of todos) {
            model[todo.category].push(todo);
        }
        renderAll(model);
    })
}

function showLogin() {
    $("#kanban").hide();
    $("#login").show();
    $("#register").hide();
    $("body").removeClass("blue");
}

function showRegister() {
    $("#kanban").hide();
    $("#login").hide();
    $("#register").show();
    $("body").removeClass("blue");
}

$(document).ready(function () {
    if(localStorage.jwt){
        showKanban();
        renderAll(model);
    }
    else{
        showLogin();
    }
});

$(".add-task").keyup(function(e){
    if(e.keyCode === 13) {
        const title = $(this).val();
        if(title!==""){
            $(this).val("");
            const category = $(this).parent().attr('id');
            $.ajax("http://localhost:3000/todos", {
                type: "POST",
                headers: {
                    "Authorization": localStorage.jwt
                },
                data: {
                    title,
                    category
                }
            })
            .done(() => {
                showKanban();
            })
            .fail(() => $(this).val(title));
        }
    }
});

$("#login-submit").click(function () {
    const email = $("#login-email").val();
    const password = $("#login-password").val();
    $.ajax("http://localhost:3000/user/login", {
        type: "POST",
        data: {
            email,
            password
        }
    })
    .done(data => {
        localStorage.jwt = data.token;
        showKanban();
    })
    .fail(err => console.log(err));
});

$("#login-register").click(function () {
    showRegister();
});

$("#register-submit").click(function () {
    const email = $("#login-email").val();
    const password = $("#login-password").val();
    $.ajax("http://localhost:3000/user/register", {
        type: "POST",
        data: {
            email,
            password
        }
    })
    .done(data => {
        localStorage.jwt = data.token;
        showKanban();
    })
    .fail(err => console.log(err));
});

$("#register-login").click(function () {
    showLogin();
});