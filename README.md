# Mini Page Builder

## Project Description

Mini Page Builder is a React-based web application that allows users to create a simple web page layout by dragging and dropping different UI elements (like labels, input fields, and buttons) onto a canvas. Users can configure each element's properties and export the page layout as a JSON file.

## How It Works

### Components

- **Canvas**: The main area where users can drag and drop UI elements. It supports the placement and positioning of elements.
- **ConfigModal**: A modal window that allows users to configure the properties of the selected element (like position, text, font size, and font weight).
- **Draggable**: Represents draggable UI elements (Label, Input, Button) that can be placed onto the Canvas.
- **Sidebar**: Contains the draggable elements and an export button to save the page layout.

### Functionality

- **Drag and Drop**: Users can drag elements from the Sidebar and drop them onto the Canvas.
- **Configure Elements**: When an element is placed on the Canvas, a modal appears allowing users to set properties like position, text, font size, and weight.
- **Edit Elements**: Users can click on any element on the Canvas to reconfigure its properties.
- **Export Layout**: The layout of the page can be exported as a JSON file, which includes details about all elements and their configurations.

## Running the Code

1. **Clone the Repository**: Clone this repository to your local machine using `git clone`.

2. **Install Dependencies**:
   Navigate to the project directory and run:
   npm install
