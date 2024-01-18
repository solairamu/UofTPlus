function updatePopupContent() {
    chrome.runtime.sendMessage({ action: "fetchCurrentCourseInfo" }, function(response) {
        const courseInfoDiv = document.getElementById('courseInfo');
        courseInfoDiv.innerHTML = ''; // Clear existing content
        const contentDiv = document.createElement('div'); // Create a new div for the content

        if (response && response.courseInfo && response.courseInfo.length > 0) {
            response.courseInfo.forEach(info => {
                contentDiv.innerHTML += `Course: ${info.Code}, Semester: ${info.Semester}, Average: ${info.Average}<br>`;
            });

            // Display related programs
            if (response.programs && response.programs.length > 0) {
                contentDiv.innerHTML += '<br>Related Programs:<br>';
                response.programs.forEach(program => {
                    contentDiv.innerHTML += `${program}<br>`;
                });
            }
        } else {
            contentDiv.innerHTML = 'No data available';
        }

        courseInfoDiv.appendChild(contentDiv); // Append the new content div to courseInfo
    });
}


// Fetch and update data when the popup is opened
updatePopupContent();
