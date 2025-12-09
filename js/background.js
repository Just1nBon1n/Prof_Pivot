document.addEventListener("DOMContentLoaded", function() {
    const container = document.getElementById('bg-container');
    if (!container) return;

    const cubes = [
        cubesBase + "Bracket.png",
        cubesBase + "Brush.png",
        cubesBase + "Camera.png",
        cubesBase + "Controler.png",
        cubesBase + "Monitor.png"
    ];

    // Fonction pour mélanger un tableau (Algorithme de Fisher-Yates)
    function shuffle(array) {
        let currentIndex = array.length, randomIndex;
        while (currentIndex != 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
        }
        return array;
    }

    for (let i = 0; i < 8; i++) {
        const row = document.createElement('div');
        row.className = 'row ' + (i % 2 === 0 ? 'move-left' : 'move-right');
        
        const track = document.createElement('div');
        track.className = 'track';
        
        // 1. On crée un ordre aléatoire propre à CETTE rangée
        const shuffledCubes = shuffle([...cubes]); 
        
        // 2. On duplique CET ordre aléatoire (2 ou 3 fois)
        // C'est vital de dupliquer le tableau DÉJÀ mélangé pour que le reset soit invisible
        const displayList = shuffledCubes.concat(shuffledCubes, shuffledCubes);
        
        displayList.forEach(function(src) {
            const img = document.createElement('img');
            img.src = src;
            track.appendChild(img);
        });
        
        row.appendChild(track);
        container.appendChild(row);
    }
});