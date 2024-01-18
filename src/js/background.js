let courseData = [];
let currentCourseInfo = null; // Store the current course info
let programData = []; // New variable to store program data

// Load the program data from the local JSON file
fetch(chrome.runtime.getURL('programs.json'))
    .then(response => response.json())
    .then(jsonData => {
        programData = jsonData;
    })
    .catch(error => {
        console.error('Error reading the program data file:', error);
    });

// Load the course data from the local JSON file
fetch(chrome.runtime.getURL('courses.json'))
    .then(response => response.json())
    .then(jsonData => {
        courseData = jsonData;
    })
    .catch(error => {
        console.error('Error reading the local data file:', error);
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

        // Find programs that include the course code
        let relatedPrograms = [];
        for (let program in programData) {
            if (programData[program].classes.includes(courseCode)) {
                relatedPrograms.push(program);
            }
        }

        // Send both course info and related programs
        sendResponse({ courseInfo: currentCourseInfo, programs: relatedPrograms });
    }
    
        return true; // Keep the message channel open for the sendResponse callback
    });