const list = [];

function submitted(event) {
    event.preventDefault();
    list.push({ title: event.target.title.value, discription: event.target.description.value, cat: "todo" });
    manageModal('none')
}

function manageModal(val) {
    document.getElementById('modal').setAttribute('style', 'display:' + val + ';');
}

document.querySelectorAll('.draggable').forEach(function (item) {

    item.addEventListener('dragstart', function (e) {
        e.dataTransfer.setData("text", e.target.getAttribute('data-value'));
    });

    item.addEventListener('dragover', function (e) {
        e.preventDefault();
    });

    item.addEventListener('drop', function (e) {
        e.preventDefault();
        var data = e.dataTransfer.getData("text");
        var node = e.target;
        while (node.tagName !== "UL") {
            node = node.parentNode;
        }
        node.appendChild(document.getElementById(data));

    })
})
