import React, { useState } from 'react';
import './Home.css'; 

const ConfigModal = ({ type, currentConfig, initialX, initialY, onSave, onClose }) => {
    const [x, setX] = useState(initialX);
    const [y, setY] = useState(initialY);
    const [title, setTitle] = useState(currentConfig.title || "This is a label");
    const [fontSize, setFontSize] = useState(currentConfig.fontSize || "20");
    const [fontWeight, setFontWeight] = useState(currentConfig.fontWeight || "400");

    const handleSaveClick = () => {
        onSave({ x, y, title, fontSize, fontWeight });
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <h2>Edit {type}</h2>
                    <button className="modal-close" onClick={onClose}>&times;</button>
                </div>
                {type === "Label" && (
                    <>
                        <div className="modal-field">
                            <label>Text</label>
                            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                        </div>
                        <div className="modal-field">
                            <label>Font Size</label>
                            <input type="number" value={fontSize} onChange={(e) => setFontSize(e.target.value)} />
                        </div>
                        <div className="modal-field">
                            <label>Font Weight</label>
                            <input type="number" value={fontWeight} onChange={(e) => setFontWeight(e.target.value)} />
                        </div>
                    </>
                )}
                <div className="modal-field">
                    <label>X</label>
                    <input type="number" value={x} onChange={(e) => setX(parseInt(e.target.value, 10))} />
                </div>
                <div className="modal-field">
                    <label>Y</label>
                    <input type="number" value={y} onChange={(e) => setY(parseInt(e.target.value, 10))} />
                </div>
                <div className="modal-actions">
                    <button className="save-button" onClick={handleSaveClick}>Save Changes</button>
                </div>
            </div>
        </div>
    );
};

export default ConfigModal;
