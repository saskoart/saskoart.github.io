import React, { useState } from 'react';
import { Figure, FigureCaption, FigureImage, Modal } from "react-bootstrap";
import { Document, Page } from 'react-pdf';

function GalleryTab({ title, description, description_english, data, folder }) {
    const [show, setShow] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const isPDF = (filename) => filename && filename.toLowerCase().endsWith('.pdf');

    const handleOpen = (item, itemTitle) => {
        setSelectedItem({ item, itemTitle, isPdf: isPDF(item) });
        setShow(true);
    };

    const [numPages, setNumPages] = useState();
    const [pageNumber, setPageNumber] = useState(1);

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }

    return (
        <div className="contentStyle">
            <h2>{title}</h2>
            {data.map((item, index) => (
                <Figure
                    key={index}
                    className="figureComponent"
                    onClick={() => handleOpen(item.image, item.title)}
                >
                    {isPDF(item.image) ? (
                        <Document file={`${folder}/images/${item.image}`} onLoadSuccess={onDocumentLoadSuccess}>
                            <Page pageNumber={pageNumber} />
                        </Document>
                    ) : (
                        <FigureImage
                            src={`${folder}/images/${item.image}`}
                            alt={item.title}
                            className="figureComponentImage"
                        />
                    )}
                    <FigureCaption>
                        <h3 className="figureCaptionTitle">{item.title}</h3>
                        <p>{item.description}</p>
                    </FigureCaption>
                </Figure>
            ))}
            {description != null && description !== ""
                ? description.split("\n").map((line, index) => (
                    <p key={index + "deutsch"}>
                        {line}
                    </p>
                ))
                : null}
            {description_english != null && description_english !== ""
                ? description_english.split("\n").map((line, index) => (
                    <p className="english-text" key={index + "english"}>
                        {line}
                    </p>
                ))
                : null}

            {/* Modal for enlarged image or PDF */}
            <Modal show={show} onHide={() => setShow(false)} size={selectedItem?.isPdf ? "lg" : "md"}>
                <Modal.Header closeButton>
                    {selectedItem ? selectedItem.itemTitle : ""}
                </Modal.Header>
                <Modal.Body style={{ textAlign: "center" }}>
                    {selectedItem ? (
                        selectedItem.isPdf ? (
                            <iframe
                                src={`${folder}/images/${selectedItem.item}`}
                                width="100%"
                                height="600px"
                                style={{ border: 'none' }}
                                title={selectedItem.itemTitle}
                            />
                        ) : (
                            <img
                                src={`${folder}/images/${selectedItem.item}`}
                                alt={selectedItem.itemTitle}
                                className="figureModalImage"
                            />
                        )
                    ) : null}
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default GalleryTab;
