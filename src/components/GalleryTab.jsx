import React from 'react';

function GalleryTab({ data, folder }) {
    return (
        <div style={{ marginTop: 30 }}>
            {data.map((item, index) => (
                <div key={index} style={{ marginBottom: 40 }}>
                    <img
                        src={`${folder}/images/${item.image}`}
                        alt={item.title}
                        style={{ width: 300, borderRadius: "8px" }}
                    />
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                </div>
            ))}
        </div>
    );
}

export default GalleryTab;
