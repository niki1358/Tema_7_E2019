        document.addEventListener("DOMContentLoaded", start);

        const sheetID = "17Dd7DvkPaFamNUdUKlrFgnH6POvBJXac7qyiS6zNRw0";
        const url = `https://spreadsheets.google.com/feeds/list/${sheetID}/od6/public/values?alt=json`;
        let retter;
        let filter = "alle";

        console.log(url);

        //Første funktion der kaldes efter DOM er loaded
        function start() {
            const filterKnapper = document.querySelectorAll("nav button");
            filterKnapper.forEach(knap => knap.addEventListener("click", filtrerRetter));
            loadData();
        }

        //En funktion der filtrerer personerne (json)
        function filtrerRetter() {
            filter = this.dataset.ret; //Sæt variable "filter" til aktuel værdi
            document.querySelector(".valgt").classList.remove("valgt"); // Fjern den valgte klasse på knappen
            this.classList.add("valgt"); //Marker den nye knap
            vis(); //Kald funktionen "vis" igen med nyt filter

        }

        //Funktion der henter data fra Google Sheet (via url)
        async function loadData() {
            const response = await fetch(url);
            retter = await response.json();
            vis();
        }

        //Funktion der viser personer i liste view
        function vis() {
            const skabelon = document.querySelector("template").content; // Select indhold af html-skabelonen (article)
            const dest = document.querySelector("#menukort"); // Container til artikler
            dest.textContent = ""; //Slet det der står i filter

            retter.feed.entry.forEach(ret => { //Her looper vi igennem json (personer)
                if (ret.gsx$kategori.$t == filter || filter == "alle") { // tjek hvilken kategori rettet har og sammenling med filter

                    const klon = skabelon.cloneNode(true); //
                    klon.querySelector(".navn").textContent = ret.gsx$navn.$t;
                    klon.querySelector(".beskrivelse-kort").textContent += " " + ret.gsx$kort.$t;
                    klon.querySelector(".pris").textContent += ret.gsx$pris.$t + "kr.";
                    klon.querySelector(".ret-billede").src = "/imgs/small/" + ret.gsx$billede.$t + "-sm.jpg";
                    klon.querySelector(".menu").addEventListener("click", () => {
                        location.href = `specific.html?id=${ret.gsx$id.$t}`;
                    });
                    dest.appendChild(klon);
                }
            })
        }

        function visDetalje(ret) {
            console.log(ret);

            document.querySelector("#detalje").style.display = "block";

            document.querySelector("#detalje .luk").addEventListener("click", skjulDetalje);

            document.querySelector("#detalje h2").textContent = ret.gsx$navn.$t;
            document.querySelector("#detalje img").src = "/imgs/large/" + ret.gsx$billede.$t + ".jpg";
            document.querySelector("#detalje img").alt = `Billede af ${ret.gsx$billede.$t}`;
            document.querySelector("#detalje .beskrivelse-lang").textContent += " " + ret.gsx$lang.$t;
            document.querySelector("#detalje .pris").textContent += ret.gsx$pris.$t + "kr.";


        }

        function skjulDetalje() {
            document.querySelector("#detalje").style.display = "none";
        }
