document.addEventListener('DOMContentLoaded', function () {
    addNoteAnchors();
});

function addNoteAnchors(){
    const noteGroups = document.querySelectorAll('.blocks-group.note-group');
    noteGroups.forEach((noteGroup, index) => {
    noteGroup.id = `noteID-${index + 1}`;
    });
}
// document.querySelectorAll("pre code").forEach(function(element) {
//     var html = element.innerHTML;
//     var pattern = html.match(/\s*\n[\t\s]*/);
//     if (pattern) {
//         var regex = new RegExp(pattern[0], "g");
//         element.innerHTML = html.replace(regex, '\n');
//     }
// });