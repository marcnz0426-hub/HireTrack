let jobApplicationList = [];

const companyInput = document.getElementById("company")
const positionInput = document.getElementById("position")
const dateInput = document.getElementById("date")
const statusInput = document.getElementById("status")
const applicationForm = document.getElementById("add-application-form")

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

    console.log(jobApplicationList)
});