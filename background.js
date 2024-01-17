let courseData = [];

// Load the course data from the local JSON file
fetch(chrome.runtime.getURL('courses.json'))
    .then(response => response.json())
    .then(jsonData => {
        courseData = jsonData;
    })
    .catch(error => {
        console.error('Error reading the local data file:', error);
    });

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "fetchCourseInfo") {
        const courseCode = request.data;
        const courseInfo = courseData.filter(course => course.Code === courseCode);
        sendResponse({ data: courseInfo });
    }
    return true;
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if (changeInfo.status === 'complete' && tab.url && tab.url.includes("utoronto.ca")) {
        chrome.scripting.executeScript({
            target: { tabId: tabId },
            files: ['contentSite1.js']
        });
    }
});
