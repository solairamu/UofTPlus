let storedCourseCode = null;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "storeCourseCode") {
        storedCourseCode = request.data;
    } else if (request.action === "fetchStoredCourseCode") {
        sendResponse({ courseCode: storedCourseCode });
    }
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if (changeInfo.status === 'complete') {
        chrome.scripting.executeScript({
            target: { tabId: tabId },
            files: ['contentSite1.js', 'contentSite2.js']
        });
    }
});

chrome.tabs.onActivated.addListener(function(activeInfo) {
    chrome.tabs.get(activeInfo.tabId, function(tab) {
        chrome.scripting.executeScript({
            target: { tabId: activeInfo.tabId },
            files: ['contentSite1.js', 'contentSite2.js']
        });
    });
});
