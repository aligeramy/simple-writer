// Load the saved content when the page loads
window.addEventListener('DOMContentLoaded', function() {
    const savedContent = localStorage.getItem('savedContent');
    if (savedContent) {
        document.getElementById('Writer').innerHTML = savedContent;
        hasTyped = true; // Set hasTyped to true if there is saved content
    }
});

// Flag to track whether the user has started typing
let hasTyped = false;

document.getElementById('Writer').addEventListener('input', function() {
    // Save the content to localStorage whenever it changes
    localStorage.setItem('savedContent', this.innerHTML);
});

document.getElementById('Writer').addEventListener('keydown', function(e) {
    // If the user has not started typing yet, clear the content
    if (!hasTyped) {
        this.innerHTML = '';
        hasTyped = true;
    }
    
    // Handle Ctrl+A for selecting all text
    if (e.key === 'a' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        const selection = window.getSelection();
        const range = document.createRange();
        range.selectNodeContents(this);
        selection.removeAllRanges();
        selection.addRange(range);
    }
});


document.getElementById('saveBtn').addEventListener('click', function() {
    let simpleHtml = document.getElementById('Writer').innerHTML;
    if (simpleHtml) {
        // Replace <div> and <br> tags with newline characters to preserve line breaks
        simpleHtml = simpleHtml.replace(/<div>/g, '\n').replace(/<\/div>|<br>/g, '');
        
        // Replace formatting tags with Markdown syntax
        simpleHtml = simpleHtml.replace(/<b>/g, '**').replace(/<\/b>/g, '**'); // Bold
        simpleHtml = simpleHtml.replace(/<i>/g, '_').replace(/<\/i>/g, '_'); // Italics
        simpleHtml = simpleHtml.replace(/<u>/g, '__').replace(/<\/u>/g, '__'); // Underline
        simpleHtml = simpleHtml.replace(/<strike>/g, '~~').replace(/<\/strike>/g, '~~'); // Strikethrough
        
        const blob = new Blob([simpleHtml], { type: 'text/plain' });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = 'file.txt';
        a.click();
    }
});

document.getElementById('boldBtn').addEventListener('click', function() {
    document.execCommand('bold');
    this.style.display = 'none';
});
