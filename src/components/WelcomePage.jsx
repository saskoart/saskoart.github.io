import React from 'react';
import { Figure, FigureCaption, FigureImage } from "react-bootstrap";
import {Link} from "react-router-dom";

function WelcomePage({ structure }) {

    return (
        <div className="contentStyle">
            <h2>Welcome</h2>
            <p>
                Unterscheidet sich ein Kunstwerk von einem Nicht-Kunstwerk im Material oder per Definition? Früher, war dies so. Ein Kunstwerk musste aus zum Beispiel aus Ölfarbe, Marmor oder Bronze sein. Heute werden in Kunstwerken auch Alltagsmaterialien eingesetzt. Die Definitionsfrage „Was ist Kunst?“ wird heute weiter gefasst – bis hin nur auf die Wirkung abstellend.
                Ich habe Freude mit verschiedenen Materialien zu arbeiten. Es kommen neben Aquarell-, Acryl- und Ölfarben, Kreiden, Teer, Zement, gemahlener Marmor, Sand und viele andere Materialien zum Einsatz. Es macht mir Spass, mit lipophilen und hydrophilen Phasen zu arbeiten. Ausserdem fasziniert mich das Wechselspiel zwischen Flächen und Formen, Linien und kräftigen Farben.
                Daneben beschäftige ich mich gerne mit Urban Sketching und Aquarellmalerei. Hier geht es mir darum, den Augenblick einzufangen. Jeder Farbtupfer ist beim Aquarell definitiv und kaum korrigierbar. Ich lege Wert auf das Spiel mit Kontrasten und versuche damit auch Tiefenwirkung zu erzeugen. Städte und Landschaften sind dabei meine Hauptthemen für mein Schaffen.
                <br/>
                Does a work of art differ from a non-work of art by its material, or by definition? In the past, this was indeed the case. A work of art had to be made, for example, of oil paint, marble, or bronze. Today, however, everyday materials are also used in artworks. The definitional question “What is art?” is now understood more broadly – sometimes focusing solely on its effect.
                I enjoy working with a variety of materials. In addition to watercolor, acrylic, and oil paints, I use chalks, tar, cement, ground marble, sand, and many other materials. I find it exciting to work with lipophilic and hydrophilic phases. I am also fascinated by the interplay between surfaces and forms, lines and bold colors.
                Alongside this, I like to engage in urban sketching and watercolor painting. Here, my aim is to capture the moment. Every brushstroke in watercolor is definitive and can hardly be corrected. I place great importance on the play of contrasts and use them to create a sense of depth. Cities and landscapes are the main themes of my artistic work.
            </p>
            {
                structure ? <>
                    {
                        Object.keys(structure).map(folder => <Link to={`/${folder}`} key={folder}>
                            <Figure>
                                <FigureCaption>
                                    <h3 className="figureCaptionTitle">{structure[folder].title}</h3>
                                </FigureCaption>
                                <FigureImage
                                    src={`data/${folder}/images/${structure[folder].entries[0].image}`}
                                    alt={structure[folder].entries[0].title}
                                    className="figureComponentImage"
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
