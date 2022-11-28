"use strict";

class Kleurplaat {
    #aantalRijen;
    #aantalKolommen;
    #kleurplaatArray = [];
    constructor(aantalRijen, aantalKolommen) {
        this.#aantalRijen = aantalRijen;
        this.#aantalKolommen = aantalKolommen;
    }
    maakKleurplaat() {
        this.#kleurplaatArray = [];
        for (let i = 0; i < this.#aantalRijen; i++) {
            this.#kleurplaatArray.splice(i, 0, ["#FFFFFF", "#FFFFFF"]);
            for (let j = 0; j < this.#aantalKolommen - 2; j++) {
                this.#kleurplaatArray[i].push("#FFFFFF");
            }
        }
    }
    visualiseerKleurplaat() {
        let table = document.getElementById("kleurplaat");
        table.innerHTML = "";
        for (let i = 0; i < this.#aantalRijen; i++) {
            let tr = table.insertRow();
            for (let j = 0; j < this.#aantalKolommen; j++) {
                tr.insertCell();
            }
        }
        console.table(this.#kleurplaatArray);
    }
    getKleurvak(rowIndex, cellIndex) {
        return this.#kleurplaatArray[rowIndex][cellIndex];
    }
    updateKleurvak(table, rowIndex, cellIndex, kleur) {
        this.#kleurplaatArray[rowIndex][cellIndex] = kleur;
        let gekozenCel = table.rows[rowIndex].cells[cellIndex];
        gekozenCel.style.backgroundColor = kleur;
        console.table(this.#kleurplaatArray);
    }
    exportNaarJson() {
        let json = JSON.stringify(this.#kleurplaatArray);
        let a = document.createElement("a");
        a.href = URL.createObjectURL(new Blob([json]), { type: "application/json" });
        a.setAttribute("download", "kleurplaat.json");
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }
}

let kleurplaat = new Kleurplaat(10, 10);
let kleur = "#FFFFFF";
kleurplaat.maakKleurplaat();
kleurplaat.visualiseerKleurplaat();

let formKleurplaat = document.getElementById("kleurplaatForm");
let buttonKleurplaat = document.getElementById("maakKleurplaat");
buttonKleurplaat.onclick = function () {
    kleurplaat = new Kleurplaat(formKleurplaat.hoogte.value, formKleurplaat.breedte.value);
    kleurplaat.maakKleurplaat();
    kleurplaat.visualiseerKleurplaat();
}

let buttonKleurkeuze = document.getElementById("kiesKleur");
buttonKleurkeuze.onclick = function () {
    kleur = document.getElementById("colorpicker").value;
}

let table = document.getElementById("kleurplaat");
table.onclick = function (cel) {
    let rowIndex = cel.target.parentNode.rowIndex;
    let cellIndex = cel.target.cellIndex;
    kleurplaat.updateKleurvak(table, rowIndex, cellIndex, kleur);
    let kleurGekozenCel = kleurplaat.getKleurvak(rowIndex, cellIndex);
    console.log("Ik ben veld " + (rowIndex + 1) + ", " + (cellIndex + 1) + " en ik ben " + kleurGekozenCel);
}

let buttonExportJson = document.getElementById("exportNaarJson");
buttonExportJson.onclick = function () {
    kleurplaat.exportNaarJson();
}

let buttonReset = document.getElementById("reset");
buttonReset.onclick = function () {
    kleurplaat.maakKleurplaat();
    kleurplaat.visualiseerKleurplaat();
}