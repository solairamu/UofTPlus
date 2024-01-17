function updatePopupContent() {
    chrome.runtime.sendMessage({ action: "fetchCurrentCourseInfo" }, function(response) {
        const courseInfoDiv = document.getElementById('courseInfo');
        if (response && response.data && response.data.length > 0) {
            courseInfoDiv.innerHTML = ''; // Clear existing content

            response.data.forEach(info => {
                courseInfoDiv.innerHTML += `Code: ${info.Code}, Semester: ${info.Semester}, Average: ${info.Average}<br>`;
            });
        } else {
            courseInfoDiv.innerHTML = 'No data available';
        }
    });
}

// Fetch and update data when the popup is opened
updatePopupContent();
