import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import GalleryTab from "./components/GalleryTab";
import {Nav} from "react-bootstrap";
import {loadStructure} from "./utils";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
    const [structure, setStructure] = useState({});
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        loadStructure(setStructure);
    }, []);

    return (
        <Router>
            <div className="layoutStyle">
                <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen}/>
                <div className="mainArea">
                    <div className={`sidebarStyle ${menuOpen ? "open" : ""}`}>

                        <Nav className="flex-column">
                            {"folders" in structure ? Object.keys(structure.folders).map(folder => (
                                <Nav.Item key={folder}>
                                    <Link
                                        to={`/${folder}`}
                                        className="linkStyle"
                                        onMouseEnter={(e) =>
                                            (e.target.style.backgroundColor = "rgba(255,255,255,0.2)")
                                        }
                                        onMouseLeave={(e) =>
                                            (e.target.style.backgroundColor = "transparent")
                                        }
                                        onClick={(e) => setMenuOpen(false)}
                                    >
                                        {structure.folders[folder].title}
                                    </Link>
                                </Nav.Item>
                            )) : null}
                        </Nav>
                    </div>
                    <div className="contentStyle">
                        <Routes>
                            {"tabs" in structure ? Object.keys(structure.tabs).map(folder => (
                                <Route
                                    key={folder}
                                    path={`/${folder}`}
                                    element={
                                        <GalleryTab
                                            title={structure.folders[folder].title}
                                            description={structure.folders[folder].description}
                                            data={structure.tabs[folder].entries}
                                            folder={structure.tabs[folder].folderPath}
                                        />
                                    }
                                />
                            )) : null}
                            <Route path="/" element={<h2>Bitte ein Tab auswählen.</h2>} />
                        </Routes>
                    </div>
                </div>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
