(function() {
    chrome.runtime.sendMessage({ action: "fetchStoredCourseCode" }, response => {
        if (response && response.courseCode) {
            typeCourseCode(response.courseCode);
            extractCourseInfo();
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

    function extractCourseInfo() {
        var tableBody = document.querySelector('#table > table > tbody');
        const courseData = [];
        for (const row of tableBody.rows) {
            // Adjust the indices according to your table's structure
            const semester = row.cells[2].innerText.trim();
            const average = row.cells[4].innerText.trim();
            courseData.push({ semester, average });
        }
        if (courseData.length === 0) {
            console.log('No Data Available');
        } else {
        console.log(courseData);
        }
    }
    
    // Call this function after the search results are loaded, you might need to set a timeout or use a mutation observer to wait for the data to load.
    
})();
