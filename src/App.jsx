import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import GalleryTab from "./components/GalleryTab";
import {Nav} from "react-bootstrap";
import {loadStructure} from "./utils";
import Header from "./components/Header";
import Footer from "./components/Footer";
import WelcomePage from "./components/WelcomePage";

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
                            <Nav.Item key="welcome">
                                <Link
                                    to={`/`}
                                    className="linkStyle"
                                    onMouseEnter={(e) =>
                                        (e.target.style.backgroundColor = "rgba(255,255,255,0.2)")
                                    }
                                    onMouseLeave={(e) =>
                                        (e.target.style.backgroundColor = "transparent")
                                    }
                                    onClick={(e) => setMenuOpen(false)}
                                >
                                    Welcome
                                </Link>
                            </Nav.Item>
                            {structure ? Object.keys(structure).map(folder => (
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
                                        {structure[folder].title}
                                    </Link>
                                </Nav.Item>
                            )) : null}
                        </Nav>
                    </div>
                    <Routes>
                        {structure ? Object.keys(structure).map(folder => (
                            <Route
                                key={folder}
                                path={`/${folder}`}
                                element={
                                    <GalleryTab
                                        title={structure[folder].title}
                                        description={structure[folder].description}
                                        description_english={structure[folder].description_english}
                                        data={structure[folder].entries}
                                        folder={structure[folder].folderPath}
                                    />
                                }
                            />
                        )) : null}
                        <Route path="/" element={<WelcomePage structure={structure} />} />
                    </Routes>
                </div>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
