const socket = new WebSocket("ws://dyalog_root/");

const table = document.getElementById("tab");
const restart = document.getElementById("restart");
const text = document.getElementById("text");

restart.addEventListener("click", e => {
    socket.send(JSON.stringify([2, 0]));
});

let cells = []; let ena = 1;

function init(width, height) {
    for (let m = 0; m<height; ++m) {
        const r = table.insertRow();
        for (let n = 0; n<width; ++n) {
            cells.push(r.insertCell());
        }
    }
    for (let i = 0; i < cells.length; ++i) {
        const ii = i;
        const cell = cells[i];
        cell.className = "cell";
        cell.innerHTML = "&nbsp";
        cell.addEventListener("click", e => {
            e.stopPropagation();
            if (ena===1) {
                socket.send(JSON.stringify([0, ii]));
            }
        });
        cell.addEventListener("contextmenu", e => {
            e.stopPropagation();
            e.preventDefault();
            if (ena===1) {
                socket.send(JSON.stringify([1, ii]));
            }
        });
    }
}

const colors = {
    "1": "#3333cc", "2": "#006600", "3": "#cc0000", 
    "4": "#660066", "5": "#006666"
}

function render(txt, str) {
    text.innerText = txt;
    for (let i = 0; i < cells.length; ++i) {
        const cell = cells[i];
        const c = str.charAt(i);
        if (c===".") {
            cell.innerHTML = "&nbsp";
            cell.style.color = "#000000";
            cell.classList.remove("open");
        }
        else if (c===" ") {
            cell.innerHTML = "&nbsp";
            cell.style.color = "#000000";
            cell.classList.add("open");
        }
        else if (c==="?") {
            cell.innerText = c;
            cell.style.color = "#000000";
            cell.classList.remove("open");
        }
        else if (c==="@") {
            cell.innerText = "@";
            cell.style.color = "#000000";
            cell.classList.add("open");
        }
        else if (c in colors) {
            cell.innerText = c;
            cell.style.color = colors[c];
            cell.classList.add("open");
        }
        else {
            cell.innerText = c;
            cell.style.color = "#000000";
            cell.classList.add("open");
        }
    }
}

socket.addEventListener("message", e => {
    if (typeof e.data === "string") {
        const json = JSON.parse(e.data);
        if (json.k===0) {
            init(json.w, json.h);
        } else {
            ena = json.v;
            render(json.t, json.f);
        }
    }
});
