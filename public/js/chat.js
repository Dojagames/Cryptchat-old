let loadedChat = false;

function createDiv(){
    DrawDate("test");
}

function openFile(event){
    var input = event.target;
    var reader = new FileReader();

    reader.onload = function() {
    var text = reader.result;
    editChat(text);
    }
    reader.readAsText(input.files[0]);
}

var msgList = [[],[],[],[]];
var namelist = [];
function editChat(text){
    var lines = text.split(/\r?\n/);
    
    var msgStart;
    var buffer;
    var buffer_name;
    var msgIndex = 0;

    for(var i = 0; i < lines.length; i++){
        buffer = lines[i];
        msgStart = 20;
        buffer_name = "";

        if (buffer.Length < 15)
        {
            msgList[3][msgIndex] += "<br>" + buffer;
            continue;
        }
        if (buffer.charAt(2) != "/" && buffer.charAt(5) != "/")
        {
            msgList[3][msgIndex] += "<br>" + buffer;
            continue;
        }


        msgIndex++;
        msgList[0][msgIndex] = buffer.substring(0, 10);
        msgList[1][msgIndex] = buffer.substring(12, 17);

        var _j = 0;
        while(true){
            if (buffer.charAt(20 + _j) == ":")
            {
                msgStart = 21 + _j;
                break;
            }
            if (_j > 25)
            {
                buffer_name = "System";
                break;
            }
            buffer_name += buffer.charAt(20 + _j);
            _j++;
        }
        if (!namelist.includes(buffer_name)) namelist.push(buffer_name);
        msgList[2][msgIndex] = buffer_name;
        msgList[3][msgIndex] = buffer.substring(msgStart);
    }

    loadedChat = true;
    DrawChat();
}









function DrawChat(){
    if(!loadedChat){
        alert("please load chat first!");
        return;
    } 

    let currentDate;
    let yourName = namelist[1];
    let lastName = "";
    for(let i = 0; i < msgList[0].length; i++){
        if(msgList[0][i] == null || msgList[0][i] == "") continue;
        
        if(currentDate == null || currentDate == "" || currentDate != msgList[0][i]){
            DrawDate(msgList[0][i]);
            currentDate = msgList[0][i];
        }

        if(msgList[2][i] == "System") {
            DrawSystem(msgList[3][i]);
            continue;
        }
        
        if(lastName != msgList[2][i]) {
            lastName = msgList[2][i];
            DrawBuffer();
        }

        if(msgList[2][i] == yourName){
            DrawMsg1(msgList[3][i], msgList[1][i]);
        } else {
            DrawMsg2(msgList[3][i], msgList[1][i]);
        }
    } 
}

function DrawDate(date){
    var div = document.createElement("div");
    div.className = "msgWrapper";
    var child = document.createElement("div");
    child.className = "date";
    var par = document.createElement("p");
    par.innerHTML = date;
    div.appendChild(child).appendChild(par);
    document.getElementById("chatBox").appendChild(div);
}

function DrawSystem(msg){
    var div = document.createElement("div");
    div.className = "msgWrapper";
    var child = document.createElement("div");
    child.className = "systemMsg";
    var par = document.createElement("p");
    par.innerHTML = msg;
    div.appendChild(child).appendChild(par);
    document.getElementById("chatBox").appendChild(div);
}

function DrawMsg2(msg, time){
    var div = document.createElement("div");
    div.className = "msgWrapper";
    var child = document.createElement("div");
    child.className = "msgBox leftBox";
    var par = document.createElement("p");
    if(!msg.includes("<br>")){
        msg = msg.replace('<', '&lt');
        msg = msg.replace('>', '&gt');
    }
    par.innerHTML = msg;
    var small = document.createElement("small");
    small.className = "internText";
    small.innerHTML = time;
    div.appendChild(child).appendChild(par).appendChild(small);
    document.getElementById("chatBox").appendChild(div);
}

function DrawMsg1(msg, time){
    var div = document.createElement("div");
    div.className = "msgWrapper";
    var child = document.createElement("div");
    child.className = "msgBox rightBox";
    var par = document.createElement("p");
    if(!msg.includes("<br>")){
        msg = msg.replace('<', '&lt');
        msg = msg.replace('>', '&gt');
    }
    par.innerHTML = msg;
    var small = document.createElement("small");
    small.className = "internText";
    small.innerHTML = time;
    div.appendChild(child).appendChild(par).appendChild(small);
    document.getElementById("chatBox").appendChild(div);
}

function DrawBuffer(){
    var div = document.createElement("div");
    div.className = "msgWrapper";
    var child = document.createElement("div");
    child.className = "bufferBox";
    div.appendChild(child);
    document.getElementById("chatBox").appendChild(div);
}


//css
//document.getElementById("bottomSection").height = Vie


function openChat(element){
    if(window.innerHeight > window.innerWidth){
        //vertical
        document.getElementById("chatVerticalBar").style.display = "flex";
        document.getElementById("chatBox").style.display = "block";
        document.getElementById("chatDrawer").style.display = "none";
        document.getElementById("drawerVerticalBar").style.display = "none";
    } else {
        // horizontal
        document.getElementById("chatBox").style.display = "block";

        //element
        document.getElementById("chatWrapper").innerHTML = "";
        
        document.querySelectorAll('*').forEach(e => {
            e.classList.remove("activeChat");
        });

        element.classList.add("activeChat");
    }
}


//vertical css

function openDrawer(){
    document.getElementById("chatDrawer").style.display = "block";
    document.getElementById("drawerVerticalBar").style.display = "block";
    document.getElementById("chatBox").style.display = "none";
    document.getElementById("chatVerticalBar").style.display = "none";
}