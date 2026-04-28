let tasks = [];
let volunteers = [];
let filter = "all";

/* ---------- RENDER ---------- */
function render() {
  let list = $("#taskList");
  list.empty();

  let search = $("#search").val().toLowerCase();

  let filtered = tasks.filter(t =>
    (filter === "all" || t.priority === filter) &&
    t.title.toLowerCase().includes(search)
  );

  filtered.forEach((t, i) => {
    let disabled = t.status === "completed" ? "disabled style='opacity:.4;pointer-events:none'" : "";

    let el = $(`
      <div class="task ${t.priority}">
        <h4>${t.title}</h4>
        <p>${t.description}</p>
        <button class="status ${t.status}" data-i="${i}">${t.status}</button>
        <p>${t.assigned.length} assigned</p>
        <button class="assign" data-i="${i}" ${disabled}>+ Assign</button>
        <button class="delete" data-i="${i}">X</button>
      </div>
    `);

    list.append(el);
  });

  updateStats();
}

/* ---------- STATS ---------- */
function updateStats() {
  $("#activeCount").text(tasks.filter(t => t.status === "active").length);
  $("#criticalCount").text(tasks.filter(t => t.priority === "critical").length);
  $("#completedCount").text(tasks.filter(t => t.status === "completed").length);
  $("#volCount").text(volunteers.length);
}

/* ---------- STATUS ---------- */
$(document).on("click", ".status", function () {
  let i = $(this).data("i");
  let s = tasks[i].status;

  tasks[i].status =
    s === "pending" ? "active" :
    s === "active" ? "completed" : "pending";

  render();
});

/* ---------- DELETE WITH ANIMATION ---------- */
$(document).on("click", ".delete", function () {
  let i = $(this).data("i");
  let card = $(this).closest(".task");

  card.addClass("removing");

  setTimeout(() => {
    tasks.splice(i, 1);
    render();
  }, 300);
});

/* ---------- ASSIGN DROPDOWN ---------- */
$(document).on("click", ".assign", function (e) {
  e.stopPropagation();

  $(".assign-dropdown").remove();

  let i = $(this).data("i");
  let task = tasks[i];

  let available = volunteers.filter(v =>
    v.available && !task.assigned.includes(v.name)
  );

  let dropdown = $("<div class='assign-dropdown'></div>");

  if (available.length === 0) {
    dropdown.append("<div>No available</div>");
  } else {
    available.forEach(v => {
      let item = $(`<div>${v.name}</div>`);
      item.on("click", () => {
        task.assigned.push(v.name);
        v.available = false;
        renderVolunteers();
        render();
      });
      dropdown.append(item);
    });
  }

  $(this).after(dropdown);
});

/* CLOSE DROPDOWN */
$(document).on("click", () => $(".assign-dropdown").remove());

/* ---------- VOLUNTEERS ---------- */
function renderVolunteers() {
  let list = $("#volList");
  list.empty();

  volunteers.forEach(v => {
    list.append(`<div>${v.name} (${v.available ? "available" : "on task"})</div>`);
  });
}

$("#addVolunteer").click(() => {
  volunteers.push({
    name: $("#vName").val(),
    email: $("#vEmail").val(),
    available: true
  });

  $("#volModal").addClass("hidden");
  renderVolunteers();
  render();
});

/* ---------- CREATE TASK ---------- */
$("#createTask").click(() => {
  let title = $("#title").val();

  if (title.length < 5) {
    $("#titleError").text("Minimum 5 characters");
    return;
  }

  tasks.push({
    title,
    description: $("#desc").val(),
    priority: $("#priority").val(),
    status: "pending",
    minVol: $("#minVol").val(),
    assigned: []
  });

  $("#taskModal").addClass("hidden");
  render();
});

/* ---------- FILTER ---------- */
$(".filter").click(function () {
  $(".filter").removeClass("active");
  $(this).addClass("active");
  filter = $(this).data("filter");
  render();
});

/* ---------- SEARCH ---------- */
$("#search").on("input", render);

/* ---------- MODALS + FOCUS TRAP ---------- */
$("#fab").click(() => {
  $("#taskModal").removeClass("hidden");
  trapFocus("#taskModal");
});

$("#openVolModal").click(() => {
  $("#volModal").removeClass("hidden");
  trapFocus("#volModal");
});

$("#closeTaskModal").click(() => $("#taskModal").addClass("hidden"));
$("#closeVolModal").click(() => $("#volModal").addClass("hidden"));

function trapFocus(modal) {
  let focusable = $(modal).find("input,button,textarea,select");
  let first = focusable.first();
  let last = focusable.last();

  first.focus();

  $(modal).on("keydown", function (e) {
    if (e.key === "Tab") {
      if (e.shiftKey && document.activeElement === first[0]) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last[0]) {
        e.preventDefault();
        first.focus();
      }
    }
  });
}

/* ---------- CHAR COUNT ---------- */
$("#desc").on("input", function () {
  $("#charCount").text(200 - $(this).val().length);
});

/* INIT */
render();