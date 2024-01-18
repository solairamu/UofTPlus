(function() {
    function extractCourseCode() {
        var titleElement = document.querySelector('.page-title');
        if (titleElement) {
            var fullText = titleElement.innerText.trim();
            var courseCodePattern = /([A-Z]{3}\d{3})|([A-Z]{4}\d{2})/;
            var courseCodeMatch = fullText.match(courseCodePattern);
            if (courseCodeMatch) {
                return courseCodeMatch[0];
            } else {
                console.log('Course code not found in the title');
                return null;
            }
        } else {
            console.log('Title element not found');
            return null;
        }
    }

    function fetchPrograms(courseCode) {
        chrome.runtime.sendMessage({ action: "fetchProgramsForCourse", data: courseCode }, function(response) {
            console.log("Programs for Course", response);
            // You can process the response here as needed
            // For example, display it on the page or log it
        });
    }

    var courseCode = extractCourseCode();
    if (courseCode) {
        chrome.runtime.sendMessage({ action: "fetchCourseInfo", data: courseCode }, function(response) {
            console.log("Course Info Response", response); // Additional log for debugging
            if (response && response.data && response.data.length > 0) {
                console.log(response.data);
            } else {
                console.log('No data found for course code:', courseCode);
            }

            // Fetch and log programs for the course
            fetchPrograms(courseCode);
        });
    } else {
        console.log('Course code extraction failed or returned null');
    }
})();
