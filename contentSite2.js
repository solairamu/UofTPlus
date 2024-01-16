// contentSite2.js

// This script requests the course code from the background script and types it into the search bar
function typeCourseCode(courseCode1) {
    const inputBox = document.getElementById('searchBar');
    if (inputBox) {
        inputBox.value = courseCode1;
        inputBox.dispatchEvent(new Event('input', { bubbles: true }));
        // Add any additional actions needed to submit the search
    } else {
        console.log('Search input box not found');
    }
}

chrome.runtime.sendMessage({ action: "fetchStoredCourseCode" }, response => {
    if (response && response.courseCode) {
        typeCourseCode(response.courseCode);
    }
});

