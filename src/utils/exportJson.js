export const exportToJson = (elements) => {
    const jsonString = JSON.stringify(elements, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'page-configuration.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
};
