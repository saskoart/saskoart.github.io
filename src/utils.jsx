export async function loadStructure(setStructure) {

    /*
    load the folder structure
     */
    const foldersRes = await fetch("/data/folders.csv");
    const foldersText = await foldersRes.text();

    let folderLines = foldersText
        .split("\n")
        .map(line => line.trim())
        .filter(line => line.length > 0)
        .map(r => r.split(";"));

    const first = folderLines[0][0].toLowerCase();

    if (first === "ordner") {
        folderLines = folderLines.slice(1);
    }

    let results = {};
    folderLines.forEach(folderLine => {
        results[folderLine[0]] = {
            title: folderLine[1],
            description: folderLine[2],
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

        const rows = text
            .split("\n")
            .map(r => r.trim())
            .filter(r => r.length > 0)
            .map(r => r.split(";"));

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