document.addEventListener('DOMContentLoaded', function() {
    const div1 = document.getElementById('div1');
    const div2 = document.getElementById('div2');
    const characters = div1.textContent.split('');

    function moveCharacter(index, delay) {
        return new Promise(resolve => {
            setTimeout(() => {
                const char = characters[index];
                div2.textContent += char;
                characters[index] = '';
                div1.textContent = characters.join('');
                resolve();
            }, delay);
        });
    }

    async function animateCharacters(chars) {
        const oddDelays = [];
        const evenDelays = [];

        for (let i = 0; i < chars.length; i++) {
            if (i % 2 !== 0) { 
                const delay = 4 * 1000 + i * 1000;
                oddDelays.push({ index: i, delay });
            }
        }

        for (let i = 0; i < chars.length; i++) {
            if (i % 2 === 0) { 
                const prevOddIndex = i === 0 ? -1 : i - 1;
                const prevOddDelay = prevOddIndex >= 0 ? oddDelays.find(item => item.index === prevOddIndex).delay : 0;
                const delay = prevOddDelay + 1000;
                evenDelays.push({ index: i, delay });
            }
        }

        const delays = [...oddDelays, ...evenDelays].sort((a, b) => a.delay - b.delay);

        for (const { index, delay } of delays) {
            await moveCharacter(index, delay);
        }
    }

    animateCharacters(characters);
});
