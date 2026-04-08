window.onload = function() {
    const searchInput = document.getElementById('searchBar');
    const container = document.getElementsByClassName('container')[0];
    let allBlookets = [];

    const extractNumbers = text => {
        const matches = [...text.matchAll(/\d+(?:\.\d+)?/g)];
        return matches.map(match => parseFloat(match[0]));
    };

    const compareByNumbers = (a, b) => {
        const numsA = extractNumbers(a.name);
        const numsB = extractNumbers(b.name);

        if (!numsA.length && !numsB.length) {
            return a.name.localeCompare(b.name);
        }
        if (!numsA.length) return 1;
        if (!numsB.length) return -1;

        for (let i = 0; i < Math.min(numsA.length, numsB.length); i++) {
            if (numsA[i] !== numsB[i]) {
                return numsA[i] - numsB[i];
            }
        }

        if (numsA.length !== numsB.length) {
            return numsA.length - numsB.length;
        }

        return a.name.localeCompare(b.name);
    };

    const renderBlookets = items => {
        container.innerHTML = '';
        items.forEach(blooket => {
            const button = document.createElement('button');
            button.innerText = blooket.name;
            button.onclick = () => {
                window.open(blooket.url, '_blank');
            };
            container.appendChild(button);
        });
    };

    const filterBlookets = () => {
        const query = searchInput.value.trim().toLowerCase();
        const filtered = query
            ? allBlookets.filter(blooket => blooket.name.toLowerCase().includes(query))
            : allBlookets;
        renderBlookets(filtered);
    };

    fetch('blookets.json')
        .then(response => response.json())
        .then(data => {
            allBlookets = data.sort(compareByNumbers).reverse();
            renderBlookets(allBlookets);
        })
        .catch(error => console.error('Error loading Blookets:', error));

    searchInput.addEventListener('input', filterBlookets);
};