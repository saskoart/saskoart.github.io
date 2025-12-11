import React from 'react';
import { Figure, FigureCaption, FigureImage } from "react-bootstrap";
import {Link} from "react-router-dom";

function WelcomePage({ structure }) {

    return (
        <div className="contentStyle">
            <h2>Welcome</h2>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            {
                structure ? <>
                    {
                        Object.keys(structure).map(folder => <Link to={`/${folder}`} key={folder}>
                            <Figure>
                                <FigureCaption>
                                    {structure[folder].title}
                                </FigureCaption>
                                <FigureImage
                                    src={`data/${folder}/images/${structure[folder].entries[0].image}`}
                                    alt={structure[folder].entries[0].title}
                                />
                            </Figure>
                        </Link>)
                    }
                </> : null
            }
        </div>
    );
}

export default WelcomePage;
