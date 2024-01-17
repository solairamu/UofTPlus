function updatePopupContent() {
    chrome.runtime.sendMessage({ action: "fetchCurrentCourseInfo" }, function(response) {
        const courseInfoDiv = document.getElementById('courseInfo');
        const contentDiv = document.createElement('div'); // Create a new div for the content

        if (response && response.data && response.data.length > 0) {
            response.data.forEach(info => {
                contentDiv.innerHTML += `Course: ${info.Code}, Semester: ${info.Semester}, Average: ${info.Average}<br>`;
            });
        } else {
            contentDiv.innerHTML = 'No data available';
        }

        courseInfoDiv.appendChild(contentDiv); // Append the new content div to courseInfo
    });
}


// Fetch and update data when the popup is opened
updatePopupContent();
