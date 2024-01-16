(function() {
    function extractCourseCode() {
        var titleElement = document.querySelector('.page-title');
        if (titleElement) {
            var fullText = titleElement.innerText.trim();
            var courseCodePattern = /([A-Z]{3}\d{3})|([A-Z]{4}\d{2})/;
            var courseCodeMatch = fullText.match(courseCodePattern);
            if (courseCodeMatch) {
                var courseCode = courseCodeMatch[0];
                return courseCode;
            } else {
                console.log('Course code not found in the title');
            }
        } else {
            console.log('Title element not found');
        }
    }

    var courseCode = extractCourseCode();
    if (courseCode) {
        chrome.runtime.sendMessage({ action: "storeCourseCode", data: courseCode });
    }
})();
