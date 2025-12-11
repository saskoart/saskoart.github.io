import React from 'react';
import {Figure, FigureCaption, FigureImage} from "react-bootstrap";

function GalleryTab({ title, description, data, folder }) {
    return (
        <div style={{ marginTop: 30 }}>
            <h3>{title}</h3>
            {description != null || description === "" ? <p>{description}</p> : null}
            {data.map((item, index) => (
                <Figure key={index} style={{ marginBottom: 40 }}>
                    <FigureImage
                        src={`${folder}/images/${item.image}`}
                        alt={item.title}
                        style={{ width: 300, borderRadius: "8px" }}
                    />
                    <FigureCaption>
                        <h3>{item.title}</h3>
                        <p>{item.description}</p>
                    </FigureCaption>
                </Figure>
            ))}
        </div>
    );
}

export default GalleryTab;
