import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import GalleryTab from "./components/GalleryTab";

function App() {
    const [tabs, setTabs] = useState({});

    useEffect(() => {
        const loadTabs = async () => {
            // === 1. Folders.csv einlesen ===
            const foldersRes = await fetch("/data/folders.csv");
            const foldersText = await foldersRes.text();

            const folderLines = foldersText
                .split("\n")
                .map(line => line.trim())
                .filter(line => line.length > 0);

            // Header entfernen, wenn vorhanden
            const first = folderLines[0].toLowerCase();
            let folderNames = folderLines;

            if (first === "folder") {
                folderNames = folderLines.slice(1);
            }

            const result = {};

            // === 2. Für jeden Ordner die passende CSV laden ===
            for (const folder of folderNames) {
                const csvPath = `/data/${folder}/${folder}.csv`;
                const response = await fetch(csvPath);
                const text = await response.text();

                const rows = text
                    .split("\n")
                    .map(r => r.trim())
                    .filter(r => r.length > 0)
                    .map(r => r.split(","));

                // Header entfernen, falls vorhanden
                const firstRow = rows[0];
                let dataRows = rows;

                if (
                    firstRow[0].toLowerCase().includes("image") ||
                    firstRow[1]?.toLowerCase().includes("titel") ||
                    firstRow[2]?.toLowerCase().includes("beschreibung")
                ) {
                    dataRows = rows.slice(1);
                }

                const entries = dataRows.map(row => ({
                    image: row[0],
                    title: row[1],
                    description: row[2]
                }));

                result[folder] = {
                    folderPath: `/data/${folder}`,
                    entries
                };
            }

            setTabs(result);
        };

        loadTabs();
    }, []);

    return (
        <Router>
            <h1>SaskoArt</h1>

            <nav>
                {Object.keys(tabs).map(tab => (
                    <Link key={tab} to={`/${tab}`} style={{ marginRight: 20 }}>
                        {tab}
                    </Link>
                ))}
            </nav>

            <Routes>
                {Object.keys(tabs).map(tab => (
                    <Route
                        key={tab}
                        path={`/${tab}`}
                        element={
                            <GalleryTab
                                data={tabs[tab].entries}
                                folder={tabs[tab].folderPath}
                            />
                        }
                    />
                ))}

                <Route path="/" element={<h2>Bitte ein Tab auswählen.</h2>} />
            </Routes>
        </Router>
    );
}

export default App;
