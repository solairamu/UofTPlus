let courseData = [];
let currentCourseInfo = null; // Store the current course info
let programData = {};

// Load the course data from the local JSON file
fetch(chrome.runtime.getURL('courses.json'))
    .then(response => response.json())
    .then(jsonData => {
        courseData = jsonData;
    })
    .catch(error => {
        console.error('Error reading the local data file:', error);
    });

fetch(chrome.runtime.getURL('programs.json'))
.then(response => response.json())
.then(jsonData => {
        programData = jsonData;
    })
    .catch(error => {
        console.error('Error reading the programs data file:', error);
    });

    chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
        if (changeInfo.status === 'complete' && tab.url && tab.url.includes("utoronto.ca")) {
            chrome.scripting.executeScript({
                target: { tabId: tabId },
                files: ['src/js/contentSite1.js']
            });
        }
    });
    
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        if (request.action === "fetchCourseInfo") {
            const courseCode = request.data;
            currentCourseInfo = courseData.filter(course => course.Code === courseCode);
            // Assuming you also want to send this back to the content script
            sendResponse({ data: currentCourseInfo });
        }
    
        if (request.action === "fetchCurrentCourseInfo") {
            sendResponse({ data: currentCourseInfo });
        }

        if (request.action === "fetchProgramsForCourse") {
            const courseCode = request.data;
            const programsForCourse = Object.entries(programData)
                .filter(([program, details]) => details.classes.includes(courseCode))
                .map(([program]) => program);
    
            sendResponse({ data: programsForCourse });
        }
    
        return true; // Keep the message channel open for the sendResponse callback
    });