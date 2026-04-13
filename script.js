let jobApplicationList = 
JSON.parse(localStorage.getItem("hireTrackJobs")) || [];

const companyInput = document.getElementById("company");
const positionInput = document.getElementById("position");
const dateInput = document.getElementById("date");
const statusInput = document.getElementById("status");
const applicationForm = document.getElementById("add-application-form");
const applicationContainer = document.getElementById("application-container");
const noApplicationsAddedYet = document.getElementById("empty-state");
const totalApp = document.getElementById("total-applications");
const interview = document.getElementById("interviewing-count");
const applicationList = document.getElementById("application-list");
const filterBtn = document.getElementById("filter");
const filterDropdown = document.getElementById("filter-dropdown");
const filterOption = document.querySelectorAll(".filter-option");
const interviewing = document.getElementById("Interviewing");
const applied = document.getElementById("Applied");
const offered = document.getElementById("Offered");
const rejected = document.getElementById("Rejected");
const sortBtn = document.getElementById("sort");
const sortDropdown = document.getElementById("sort-dropdown");
const sortOption = document.querySelectorAll(".sort-option");

renderApplication(jobApplicationList);

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

    const stringifiedData = JSON.stringify(jobApplicationList);

    localStorage.setItem("hireTrackJobs", stringifiedData);

    // clear form and update the list on sidebar form
    applicationForm.reset();
        renderApplication(jobApplicationList);
    });

function renderApplication(arrayToRender) {
    applicationList.innerHTML = "";

    // .forEach needs to be inside the function renderApplication

arrayToRender.forEach(function(application) {
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

filterBtn.addEventListener("click", function(event) {
    event.preventDefault();

    if (filterDropdown.style.display === "none" ||
        filterDropdown.style.display === "") {
            filterDropdown.style.display = "block";
    }
    else {
        filterDropdown.style.display = "none";
    }   
});

filterOption.forEach(item => {
    item.addEventListener("click", function() {

        const appStatus = item.getAttribute("data-status");
    
        if (appStatus === "All") {
        renderApplication(jobApplicationList); // Render the master list
        filterDropdown.style.display = "none"; // Hide the dropdown!
        return; // This tells the function to STOP and exit right now.
    }
        const filteredList = jobApplicationList.filter(app => 
        app.status === appStatus); // .filter() math

        renderApplication(filteredList); // to render the filtered list

      filterDropdown.style.display = "none";
    });

});

document.addEventListener("click", function(event) {

    // the user clicked the filter button and sort button
    const clickedInsideButton = filterBtn.contains(event.target);
    const clickedInsideSortBtn = sortBtn.contains(event.target);

    // the user clicked the filter-dropdown and sort dorpdown
    const clickedDropdown = filterDropdown.contains(event.target);
    const clickedSortDropdown = sortDropdown.contains(event.target)

    // if the user did not clicked the filter button and filter dropdown
    if (!clickedInsideButton && !clickedDropdown && 
        !clickedInsideSortBtn && !clickedSortDropdown) {

        // if the user clicked outside the button and dropdown
        filterDropdown.style.display = "none";
        sortDropdown.style.display = "none";
    }
});

sortBtn.addEventListener("click", function(event) {
    event.preventDefault();

    if (sortDropdown.style.display === "none" ||
        sortDropdown.style.display === "") {
            sortDropdown.style.display = "block";
    }
    else {
        sortDropdown.style.display = "none";
    }   
});

sortOption.forEach(item => {
    item.addEventListener("click", function() {

        const userChoice = item.getAttribute("data-sort")

        if (userChoice === "az") {
            jobApplicationList.sort(function(a, b) {

        // compare company names A to B the companyName for the variables in const newApplication
        return a.companyName.localeCompare(b.companyName);
            });
        }

        else if (userChoice === "newest") {
            jobApplicationList.sort(function(a, b) {
            return new Date(b.applicationDate) - new Date(a.applicationDate);
            })
        }

        else if (userChoice === "za") {
            jobApplicationList.sort(function(a, b) {
                return b.companyName.localeCompare(a.companyName);
            });
        }

        else if (userChoice === "oldest") {
            jobApplicationList.sort(function(a, b) {
            return new Date(a.applicationDate) - new Date(b.applicationDate);
            })
        }
        
    renderApplication(jobApplicationList); // sort math call
    sortDropdown.style.display = "none";
    });
});