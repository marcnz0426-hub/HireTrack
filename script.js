let jobApplicationList = [];

const companyInput = document.getElementById("company")
const positionInput = document.getElementById("position")
const dateInput = document.getElementById("date")
const statusInput = document.getElementById("status")
const applicationForm = document.getElementById("add-application-form")
const applicationContainer = document.getElementById("application-container");
const noApplicationsAddedYet = document.getElementById("empty-state")
const totalApp = document.getElementById("total-applications")
const interview = document.getElementById("interviewing-count")
const applicationList = document.getElementById("application-list")

applicationForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const newApplication = {
        companyName: companyInput.value,
        position: positionInput.value,
        applicationDate: dateInput.value,
        status: statusInput.value
    };

    // Push into master list array
    jobApplicationList.push(newApplication);

    // clear form and update the list on sidebar form
    applicationForm.reset();
        renderApplication();
    });

function renderApplication() {
    applicationList.innerHTML = "";

    // .forEach needs to be inside the function renderApplication

jobApplicationList.forEach(function(application) {
    // HTML string using backticks and inject the data
       const applicationCardHTML =`
                    <tr>
                        <th>${application.companyName}</th>
                        <td>${application.position}</td>
                        <td>${application.applicationDate}</td>
                        <td>${application.status}</td>
                    </tr>
       `;
       // Append (add) this new HTML string into container
       applicationList.innerHTML += applicationCardHTML;

        noApplicationsAddedYet.style.display = "none";
        applicationContainer.style.display = "block";
    });

    updateStatsOverview();

function updateStatsOverview() {
    totalApp.textContent = jobApplicationList.length;

    const interviewCount = jobApplicationList.filter(app => 
        app.status === `Interviewing`).length;
         interview.textContent = interviewCount;

    const activeCount = jobApplicationList.filter(app =>
        app.status === `Applied` || app.status === `Interviewing`
    ).length;
    totalApp.textContent = activeCount;
} 

}