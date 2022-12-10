function changeActive(element){
    document.getElementsByClassName("activeForm").forEach((el) => el.classList.remove('hover'));
    element.classList.add("activeForm");
}