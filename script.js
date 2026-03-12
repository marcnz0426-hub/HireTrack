let jobApplicationList = [];

const companyInput = document.getElementById("company")
const positionInput = document.getElementById("position")
const dateInput = document.getElementById("date")
const statusInput = document.getElementById("status")
const applicationForm = document.getElementById("add-application-form")
const applicationContainer = document.getElementById("application-container");
const noApplicationsAddedYet = document.getElementById("empty-state")

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
    applicationContainer.innerHTML = "";

    // .forEach needs to be inside the function renderApplication

jobApplicationList.forEach(function(application) {
    // HTML string using backticks and inject the data
       const applicationCardHTML =`
            <table class="card">
                <caption>Job Applications</caption>
                <thead>
                    <tr>
                        <th>Company</th>
                        <th>Position</th>
                        <th>Date</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th>${application.companyName}</th>
                        <td>${application.position}</td>
                        <td>${application.applicationDate}</td>
                        <td>${application.status}</td>
                    </tr>
                </tbody>
            </table>
       `;
       // Append (add) this new HTML string into our container
       applicationContainer.innerHTML += applicationCardHTML;

        noApplicationsAddedYet.style.display = "none";
    });
}