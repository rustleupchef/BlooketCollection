window.onload = function() {
    fetch('blookets.json')
        .then(response => response.json())
        .then(data => {
            const container = document.getElementsByClassName('container')[0];
            data.forEach(blooket => {
                const button = document.createElement('button');
                button.innerText = blooket.name;
                button.onclick = () => {
                    window.open(blooket.url, '_blank');
                };
                container.appendChild(button);
            });
        })
        .catch(error => console.error('Error loading Blookets:', error));
}