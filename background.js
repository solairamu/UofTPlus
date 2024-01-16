// background.js

// This script acts as a bridge between the two content scripts
let storedCourseCode = null;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "storeCourseCode") {
        storedCourseCode = request.data;
    } else if (request.action === "fetchStoredCourseCode") {
        sendResponse({ courseCode: storedCourseCode });
    }
});
