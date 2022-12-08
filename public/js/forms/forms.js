function changeActive(element){
    try {document.getElementsByClassName("activeForm")[0].remove("activeForm");} catch {};
    element.classList.add("activeForm");
}