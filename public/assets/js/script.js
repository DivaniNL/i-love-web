document.addEventListener('DOMContentLoaded', function () {
    addNoteAnchors();
});

function addNoteAnchors(){
    const noteGroups = document.querySelectorAll('.blocks-group.note-group');
    noteGroups.forEach((noteGroup, index) => {
    noteGroup.id = `noteID-${index + 1}`;
    });
}

// const dividers = document.querySelectorAll('.sprint-divider');
// dividers.forEach((divider) => {
//     let angle = 90; // Starting angle for each divider

//     function rotateGradient() {
//         // Increment the angle
//         angle += 1; // Adjust this value for faster/slower rotation

//         divider.style.setProperty('--angle', `${angle}deg`);

//         // Call the function again on the next animation frame
//         requestAnimationFrame(rotateGradient);
//     }

//     // Start the rotation for this divider
//     rotateGradient();
// });


if(document.getElementById('normalizeFont')){
document.getElementById('normalizeFont').addEventListener('click', function() {
    const section = document.querySelector('.blocks-group.note-group.divani-font');
    if (section) {
        section.classList.toggle('normalise-font');
    }
});
}