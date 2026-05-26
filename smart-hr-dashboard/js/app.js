const table =
document.getElementById(
"candidateTable"
);

let candidates =
JSON.parse(
localStorage.getItem("candidates")
) || [];

let editingId = null;

/* OPEN FORM */

function openForm(){

document.getElementById(
"candidateModal"
).style.display = "block";

}

/* CLOSE FORM */

function closeForm(){

document.getElementById(
"candidateModal"
).style.display = "none";

document.getElementById(
"candidateForm"
).reset();

editingId = null;

}

window.openForm = openForm;
window.closeForm = closeForm;

/* SAVE */

document.getElementById(
"candidateForm"
)

.addEventListener(
"submit",

function(e){

e.preventDefault();

const candidate = {

id:
editingId || Date.now(),

name:
document.getElementById("name").value,

email:
document.getElementById(
"candidateEmail"
).value,

phone:
document.getElementById("phone").value,

role:
document.getElementById("role").value,

recruiter:
document.getElementById("recruiter").value,

status:
document.getElementById("status").value,

experience:
document.getElementById("experience").value

};

if(editingId){

candidates =
candidates.map(c=>

c.id === editingId
? candidate
: c

);

showToast(
"Candidate Updated"
);

}else{

candidates.push(candidate);

showToast(
"Candidate Added"
);

}

localStorage.setItem(
"candidates",
JSON.stringify(candidates)
);

renderCandidates();

closeForm();

}
);

/* RENDER */

function renderCandidates(){

table.innerHTML = "";

const search =
document.getElementById("search")
.value
.toLowerCase();

const filter =
document.getElementById("filterStatus")
.value;

const filtered =
candidates.filter(candidate=>{

const matchSearch =

candidate.name
.toLowerCase()
.includes(search)

||

candidate.role
.toLowerCase()
.includes(search);

const matchFilter =

filter === ""

||

candidate.status === filter;

return(
matchSearch &&
matchFilter
);

});

filtered.forEach(candidate=>{

const row =
document.createElement("tr");

row.innerHTML = `

<td>

<div class="candidate-info">

<div class="avatar">

${candidate.name
.charAt(0)
.toUpperCase()}

</div>

<div>

<h4>
${candidate.name}
</h4>

<p class="candidate-email">
${candidate.email}
</p>

</div>

</div>

</td>

<td>
${candidate.phone}
</td>

<td>
${candidate.role}
</td>

<td>
${candidate.recruiter}
</td>

<td>

<span class="badge ${candidate.status}">

${candidate.status}

</span>

</td>

<td>
${candidate.experience}
</td>

<td class="action-buttons">

<button class="edit-btn">

✏ Edit

</button>

<button class="delete-btn">

🗑 Delete

</button>

</td>

`;

table.appendChild(row);

/* EDIT */

row.querySelector(".edit-btn")

.addEventListener(
"click",
()=>editCandidate(candidate.id)
);

/* DELETE */

row.querySelector(".delete-btn")

.addEventListener(
"click",
()=>deleteCandidate(candidate.id)
);

});

updateStats();

}

/* EDIT */

function editCandidate(id){

const candidate =
candidates.find(
c=>c.id === id
);

document.getElementById("name")
.value = candidate.name;

document.getElementById(
"candidateEmail"
).value = candidate.email;

document.getElementById("phone")
.value = candidate.phone;

document.getElementById("role")
.value = candidate.role;

document.getElementById("recruiter")
.value = candidate.recruiter;

document.getElementById("status")
.value = candidate.status;

document.getElementById("experience")
.value = candidate.experience;

editingId = id;

openForm();

}

/* DELETE */

function deleteCandidate(id){

const confirmDelete =
confirm(
"Delete Candidate?"
);

if(confirmDelete){

candidates =
candidates.filter(
c=>c.id !== id
);

localStorage.setItem(
"candidates",
JSON.stringify(candidates)
);

renderCandidates();

showToast(
"Candidate Deleted"
);

}

}

/* SEARCH */

document.getElementById("search")

.addEventListener(
"input",
renderCandidates
);

/* FILTER */

document.getElementById("filterStatus")

.addEventListener(
"change",
renderCandidates
);

/* STATS */

function updateStats(){

document.getElementById(
"totalCandidates"
).textContent =
candidates.length;

document.getElementById(
"interviews"
).textContent =

candidates.filter(c=>
c.status === "Interview"
).length;

document.getElementById(
"selected"
).textContent =

candidates.filter(c=>
c.status === "Hired"
).length;

document.getElementById(
"rejected"
).textContent =

candidates.filter(c=>
c.status === "Rejected"
).length;

}

/* TOAST */

function showToast(message){

const toast =
document.getElementById("toast");

toast.innerText = message;

toast.style.display = "block";

setTimeout(()=>{

toast.style.display = "none";

},2000);

}

/* INITIAL */

renderCandidates();