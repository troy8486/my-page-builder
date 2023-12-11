import React from 'react';
import "./Home.css";
import Draggable from './Draggable';
import { Button } from "@mui/material";
import { exportToJson } from "../utils/exportJson";

const Sidebar = (elements) => {
  return (
    <div className="sidebar noselect">
      <div className="sidebar-title">BLOCKS</div>
      <Draggable type="Label" />
      <Draggable type="Input" />
      <Draggable type="Button" />
      <div className='export-btn' >
        <Button variant="contained" onClick={() => exportToJson(elements)}>Export</Button>
      </div>
    </div>
  );
};

export default Sidebar;
