import React, { useState } from 'react';
import { Figure, FigureCaption, FigureImage, Modal } from "react-bootstrap";

function GalleryTab({ title, description, data, folder }) {
    const [show, setShow] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    const handleOpen = (image, title) => {
        setSelectedImage({ image, title });
        setShow(true);
    };

    return (
        <div className="contentStyle">
            <h2>{title}</h2>
            {description != null || description === "" ? <p>{description}</p> : null}

            {data.map((item, index) => (
                <Figure
                    key={index}
                    className="figureComponent"
                    onClick={() => handleOpen(item.image, item.title)}
                >
                    <FigureImage
                        src={`${folder}/images/${item.image}`}
                        alt={item.title}
                    />
                    <FigureCaption>
                        <h3>{item.title}</h3>
                        <p>{item.description}</p>
                    </FigureCaption>
                </Figure>
            ))}

            {/* Modal for enlarged image */}
            <Modal show={show} onHide={() => setShow(false)} centered size="lg">
                <Modal.Header closeButton>
                    {selectedImage ? selectedImage.title : ""}
                </Modal.Header>
                <Modal.Body style={{ textAlign: "center" }}>
                    {selectedImage ? <img
                            src={`${folder}/images/${selectedImage.image}`}
                            alt={selectedImage.title}
                            className="figureModal"
                        /> : null}
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default GalleryTab;
