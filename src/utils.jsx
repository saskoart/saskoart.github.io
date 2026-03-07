import Papa from "papaparse";

export async function loadStructure(setStructure) {

    /*
    load the folder structure
     */
    const foldersRes = await fetch("/data/folders.csv");
    const foldersText = await foldersRes.text();

    let { data: folderLines } = Papa.parse(foldersText, {
        delimiter: ",",      // since your CSV uses ;
        skipEmptyLines: true,
        quoteChar: '"',
        escapeChar: '"'
    });

    const first = folderLines[0][0].toLowerCase();

    if (first === "ordner") {
        folderLines = folderLines.slice(1);
    }

    let results = {};
    folderLines.forEach(folderLine => {
        results[folderLine[0]] = {
            title: folderLine[1],
            description: folderLine[2],
            description_english: folderLine[3],
            folderPath: `/data/${folderLine[0]}`
        };
    });

    /*
     *  load the tabs
     */

    for (const folder of Object.keys(results)) {
        const csvPath = `/data/${folder}/series.csv`;
        const response = await fetch(csvPath);
        const text = await response.text();

        const { data: rows } = Papa.parse(text, {
            delimiter: ",",      // since your CSV uses ;
            skipEmptyLines: true,
            quoteChar: '"',
            escapeChar: '"'
        });

        console.log(csvPath);

        const firstRow = rows[0];
        let dataRows = rows;

        if (
            firstRow[0].toLowerCase().includes("image") ||
            firstRow[1]?.toLowerCase().includes("titel") ||
            firstRow[2]?.toLowerCase().includes("beschreibung")
        ) {
            dataRows = rows.slice(1);
        }

        results[folder].entries = dataRows.map(row => ({
            image: row[0],
            title: row[1],
            description: row[2]
        }));
    }
    setStructure(results);
}