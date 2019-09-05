const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");
console.log(id);

let retter;
const sheetID = "17Dd7DvkPaFamNUdUKlrFgnH6POvBJXac7qyiS6zNRw0";
const url = `https://spreadsheets.google.com/feeds/list/${sheetID}/od6/public/values?alt=json`;
console.log(url);

document.addEventListener("DOMContentLoaded", start);

function start() {
    loadData();
}

async function loadData() {
    const response = await fetch(url);
    retter = await response.json();
    vis();
}

function vis() {
    retter.feed.entry.forEach(ret => {
        if (ret.gsx$id.$t == id) {
            document.querySelector("#detalje h2").textContent = ret.gsx$navn.$t;
            document.querySelector("#detalje img").src = "/imgs/large/" + ret.gsx$billede.$t + ".jpg";
            document.querySelector("#detalje img").alt = `Billede af ${ret.gsx$billede.$t}`;
            document.querySelector("#detalje .beskrivelse-lang").textContent += " " + ret.gsx$lang.$t;
            document.querySelector("#detalje .pris").textContent += ret.gsx$pris.$t + "kr.";

            document.querySelector(".luk").addEventListener("click", () => {
                history.back();
            })

        }
    })
}
