// Backend health value (example, replace this with real data from your backend)
let healthX = 75; // This is the value you get from the backend (max: 100)

// Function to update the progress circle for Eco Health
function updateHealthCircle(health) {
    const progressBar = document.querySelector('.progress-bar');
    const progressText = document.querySelector('.progress-text');

    // Calculate the stroke-dashoffset based on the health percentage
    const maxStrokeLength = 408; // Circumference of the circle (2 * Math.PI * radius)
    const dashOffset = maxStrokeLength - (health / 100) * maxStrokeLength;

    // Update the circle and the text
    progressBar.style.strokeDashoffset = dashOffset;
    progressText.textContent = `${health}%`;
}

// Simulate receiving the health value from the backend
setTimeout(() => {
    updateHealthCircle(healthX); // Update the circle with the backend value
}, 1000); // Simulate a delay of 1 second

// Backend storage values (example, replace these with real data from your backend)
let totalStorage = 100; // Total storage in GB
let usedStorage = 40; // Used storage in GB
let availableStorage = totalStorage - usedStorage;

// Function to calculate gradient color based on usage percentage
function getGradientColor(percentage) {
    if (percentage <= 50) {
        return "#4caf50"; // Green
    } else if (percentage <= 75) {
        return "#4682b4"; // Blueish
    } else {
        return "#ff6347"; // Red
    }
}

// Function to update the storage circle
function updateStorageCircle(total, used) {
    const progressBarUsed = document.querySelector('.progress-bar-used');
    const progressBarAvailable = document.querySelector('.progress-bar-available');
    const progressTextStorage = document.querySelector('.progress-text-storage');

    // Calculate the stroke-dashoffset for used and available storage
    const maxStrokeLength = 408; // Circumference of the circle (2 * Math.PI * radius)
    const dashOffsetUsed = maxStrokeLength - (used / total) * maxStrokeLength;

    // Calculate used percentage
    const usedPercentage = (used / total) * 100;

    // Get the gradient color based on the percentage
    const gradientColor = getGradientColor(usedPercentage);

    // Update the circles and the text
    progressBarUsed.style.strokeDashoffset = dashOffsetUsed;
    progressBarUsed.style.stroke = gradientColor; // Apply the gradient color dynamically

    // Update the text
    progressTextStorage.innerHTML = `
        <p>Total: ${total}GB</p>
        <p>Used: ${used}GB</p>
        <p>Available: ${total - used}GB</p>
    `;
}

// Simulate receiving the storage values from the backend
setTimeout(() => {
    updateStorageCircle(totalStorage, usedStorage); // Update the circle with backend values
}, 1000); // Simulate a delay of 1 second