(function() {
    chrome.runtime.sendMessage({ action: "fetchStoredCourseCode" }, response => {
        if (response && response.courseCode) {
            typeCourseCode(response.courseCode);
        }
    });

    function typeCourseCode(courseCode) {
        const inputBox = document.getElementById('searchBar');
        if (inputBox) {
            inputBox.value = courseCode;
            inputBox.dispatchEvent(new Event('input', { bubbles: true }));
        } else {
            console.log('Search input box not found');
        }
    }
})();
