jQuery(document).ready(function ($) {
   addNoteAnchors();
});

function addNoteAnchors(){
    const noteGroups = document.querySelectorAll('.blocks-group.note-group');
    noteGroups.forEach((noteGroup, index) => {
    noteGroup.id = `noteID-${index + 1}`;
    });
}