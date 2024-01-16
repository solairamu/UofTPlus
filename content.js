// content.js
document.addEventListener('DOMContentLoaded', function() {
    // Select the h1 element with the class 'page-title'
    var titleElement = document.querySelector('.page-title');
    // Check if the element exists and has been captured
    if (titleElement) {
        // Extract the full text from the element
        var fullText = titleElement.innerText.trim();
        // Define the regular expression pattern for the course code
        var courseCodePattern = /([A-Z]{3}\d{3}[A-Z]\d)|([A-Z]{4}\d{2}[A-Z]\d)/;
        // Attempt to match the pattern with the full text
        var courseCodeMatch = fullText.match(courseCodePattern);
        // If a match is found, log the first match (the course code)
        if (courseCodeMatch) {
            var courseCode = courseCodeMatch[0];
            console.log('Extracted course code:', courseCode);
        } else {
            // If no match is found, log an error messag
            console.log('Course code not found in the title');
        }
    } else {
        // If the element is not found, log an error message
        console.log('Title element not found');
    }
});


// Below is to test in Chrome Console 

// var titleElement = document.querySelector('.page-title');
//     if (titleElement) {
//         var fullText = titleElement.innerText.trim();
//         var courseCodePattern = /([A-Z]{3}\d{3}[A-Z]\d)|([A-Z]{4}\d{2}[A-Z]\d)/;
//         var courseCodeMatch = fullText.match(courseCodePattern);
//         if (courseCodeMatch) {
//             var courseCode = courseCodeMatch[0];
//             console.log('Extracted course code:', courseCode);
//             // You can now use courseCode for further processing or display
//         } else {
//             console.log('Course code not found in the title');
//         }
//     } else {
//         console.log('Title element not found');
//     };