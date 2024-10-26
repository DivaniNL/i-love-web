document.addEventListener('DOMContentLoaded', function () {
    addNoteAnchors();
});

function addNoteAnchors(){
    const noteGroups = document.querySelectorAll('.blocks-group.note-group');
    noteGroups.forEach((noteGroup, index) => {
    noteGroup.id = `noteID-${index + 1}`;
    });
}

const dividers = document.querySelectorAll('.sprint-divider');

dividers.forEach((divider) => {
    let angle = 90; // Starting angle for each divider

    function rotateGradient() {
        // Increment the angle
        angle += 1; // Adjust this value for faster/slower rotation

        // Update the background of the current rotating gradient
        divider.style.background = `conic-gradient(from ${angle}deg, violet, indigo, blue, green, yellow, orange, red, violet)`;

        // Call the function again on the next animation frame
        requestAnimationFrame(rotateGradient);
    }

    // Start the rotation for this divider
    rotateGradient();
});