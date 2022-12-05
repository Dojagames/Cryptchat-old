auto_grow(document.getElementById("tempId3232"));

function auto_grow(element) {
    element.style.height = "5px";
    element.style.height = (element.scrollHeight)+"px";

    //document.getElementById("chatEndBox").style.backgroundColor = "#333"

    if( element.style.height >= "50px"){
        document.getElementById("chatEndBox").style.height = element.style.height;
    } else {
        document.getElementById("chatEndBox").style.height = "65px"
    }
    document.getElementById("chatEndBox").scrollIntoView();
}