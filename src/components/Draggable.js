import React from 'react';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import "./Home.css"

const Draggable = ({ type }) => {
    const handleMouseDown = (e) => {
        e.preventDefault();

        // Create a ghost element for visual feedback
        const ghost = document.createElement('div');
        ghost.textContent = type; 
        ghost.className = 'draggable-ghost'; 
        ghost.style.position = 'absolute';
        ghost.style.left = `${e.pageX}px`;
        ghost.style.top = `${e.pageY}px`;
        ghost.style.pointerEvents = 'none';
        ghost.style.opacity = '0.5';
        document.body.appendChild(ghost);

        const moveGhost = (moveEvent) => {
            ghost.style.left = `${moveEvent.pageX}px`;
            ghost.style.top = `${moveEvent.pageY}px`;
        };

        document.addEventListener('mousemove', moveGhost);

        document.addEventListener('mouseup', (upEvent) => {
            document.removeEventListener('mousemove', moveGhost);

            // Remove the ghost element
            document.body.removeChild(ghost);

            // Dispatch custom event with element type and position
            const dropEvent = new CustomEvent('elementDrop', {
                detail: {
                    type: type,
                    x: upEvent.clientX,
                    y: upEvent.clientY
                },
                bubbles: true
            });
            document.dispatchEvent(dropEvent);
        }, { once: true });
    };

    return (
        <div className="draggable-block" onMouseDown={handleMouseDown} style={{ cursor: 'grab' }}>
            <DragIndicatorIcon />
            <span>{type}</span>
        </div>
    );
};

export default Draggable;
