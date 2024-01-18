function updatePopupContent() {
    chrome.runtime.sendMessage({ action: "fetchCurrentCourseInfo" }, function(response) {
        const courseInfoDiv = document.getElementById('courseInfo');
        const courseContentDiv = document.createElement('div'); // Create a new div for the course content
        const programSelectDiv = document.createElement('div'); // Create a new div for the program dropdown

        if (response && response.data && response.data.length > 0) {
            const courseInfo = response.data[0];
            courseContentDiv.innerHTML = `Course: ${courseInfo.Code}, Semester: ${courseInfo.Semester}, Average: ${courseInfo.Average}<br>`;
            courseInfoDiv.appendChild(courseContentDiv);
            
            // Create dropdown for program information
            const programSelect = document.createElement('select');
            programSelect.id = 'programSelect';
            programSelect.innerHTML = `<option value="">View Applicable Programs</option>`;
            programSelect.onchange = function() {
                alert(`You selected: ${this.value}`);
            };

            // Fetch and populate program information
            chrome.runtime.sendMessage({ action: "fetchProgramsForCourse", data: courseInfo.Code }, function(progResponse) {
                if (progResponse && progResponse.data && progResponse.data.length > 0) {
                    progResponse.data.forEach(program => {
                        const option = document.createElement('option');
                        option.value = program;
                        option.textContent = program;
                        programSelect.appendChild(option);
                    });
                } else {
                    const option = document.createElement('option');
                    option.value = "";
                    option.textContent = 'No programs available for this course';
                    programSelect.appendChild(option);
                }
            });

            programSelectDiv.appendChild(programSelect);
        } else {
            courseContentDiv.innerHTML = 'No data available';
        }

        courseInfoDiv.appendChild(courseContentDiv); // Append the course content div to courseInfo
        courseInfoDiv.appendChild(programSelectDiv); // Append the program dropdown div to courseInfo
    });
}

// Fetch and update data when the popup is opened
updatePopupContent();
