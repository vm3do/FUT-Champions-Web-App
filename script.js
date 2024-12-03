let players = [
    {
        id: "player1",
        name: "Ronaldo",
        position: "ST",
        rating: 90,
        stats: { pac: 89, sho: 93, pas: 82, dri: 88, def: 40, phy: 79 },
        images: {
            flag: "https://cdn.sofifa.net/flags/pt.png",
            logo: "https://cdn.sofifa.net/meta/team/14/180.png",
            player: "https://cdn.sofifa.net/players/020/801/25_120.png",
            badge: "assets/badge_gold.webp"
        }
    },
    {
        id: "player2",
        name: "Messi",
        position: "RW",
        rating: 91,
        stats: { pac: 85, sho: 92, pas: 91, dri: 95, def: 34, phy: 65 },
        images: {
            flag: "https://cdn.sofifa.net/flags/ar.png",
            logo: "https://cdn.sofifa.net/meta/team/83/120.png",
            player: "https://cdn.sofifa.net/players/158/023/25_120.png",
            badge: "assets/badge_gold.webp"
        }
    },
    {
        id: "player3",
        name: "Mbappé",
        position: "LW",
        rating: 92,
        stats: { pac: 97, sho: 89, pas: 80, dri: 92, def: 36, phy: 78 },
        images: {
            flag: "https://cdn.sofifa.net/flags/fr.png",
            logo: "https://cdn.sofifa.net/meta/team/591/120.png",
            player: "https://cdn.sofifa.net/players/231/747/25_120.png",
            badge: "assets/badge_gold.webp"
        }
    },
];


//////////////////////
/////////////////////

localStorage.setItem('players', JSON.stringify(players))
let formationPlayers = [];


const formationDropdown = document.querySelector('header select');
const container1 = document.querySelector('.container1');
const container2 = document.querySelector('.container2');
const playersList = document.querySelector('.players-list');

formationDropdown.addEventListener('change', (event) => {
    const selectedFormation = event.target.value;

    container1.classList.add('hidden');
    container2.classList.add('hidden');

    if (selectedFormation === '4-4-2') {
        container1.classList.remove('hidden');
    } else if (selectedFormation === '4-3-3') {
        container2.classList.remove('hidden');
    }

    document.querySelectorAll('.card[data-position]').forEach(slot => {
        const playerId = slot.dataset.id;
        if (playerId) {
            const player = formationPlayers.find(p => p.id === playerId);

            players.push(player);

            const newCard = createPlayerCard(player);
            playersList.appendChild(newCard);

            slot.querySelector('.player-content').innerHTML = '';
            slot.querySelector('.player-content').classList.add('hidden');
            delete slot.dataset.id;
        }
    });
    formationPlayers = []; 

            localStorage.setItem('players', JSON.stringify(players));
            localStorage.setItem('formationPlayers', JSON.stringify(formationPlayers));
});


const positionDropdown = document.getElementById('player-position');
const playerStats = document.getElementById('players-stats');
const gkStats = document.getElementById('gk-stats');

positionDropdown.addEventListener('change', () => {
    if (positionDropdown.value === 'gk') {
        playerStats.classList.add('hidden');
        playerStats.classList.remove('stats');
        gkStats.classList.remove('hidden');
        gkStats.classList.add('stats');

    } else if ((positionDropdown.value !== 'gk')) {
        playerStats.classList.add('stats');
        playerStats.classList.remove('hidden');
        gkStats.classList.remove('stats');
        gkStats.classList.add('hidden');
    }
});



const addPlayerButton = document.getElementById('add-player');
const formAlert = document.querySelector('.form-alert');
const playerForm = document.querySelector('.form-alert form');
const errorMessageDiv = document.querySelector('.error-message');

addPlayerButton.addEventListener('click', () => {
    formAlert.classList.remove('hidden');
});

playerForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = document.getElementById('player-name').value.trim();
    const position = positionDropdown.value.toUpperCase();
    const flag = document.getElementById('flag-link').value.trim();
    const logo = document.getElementById('logo-link').value.trim();
    const playerImage = document.getElementById('player-pic').value.trim();
    const rating = Number(document.getElementById('player-rating').value);

    if (!/^[a-zA-Z\s]+$/.test(name)) {
        showError('Name must contain only alphabets!');
        return;
    }

    let stats = {};
    if (position.toLowerCase() === 'gk') {
        const gkInputs = ['div', 'han', 'kic', 'ref', 'spe', 'pos'];
        for (const stat of gkInputs) {
            const value = Number(document.getElementById(stat).value);
            if (isNaN(value) || value < 0 || value > 99) {
                showError(`${stat.toUpperCase()} must be between 0 and 99!`);
                return;
            }
            stats[stat] = value;
        }
    } else {
        const fieldInputs = ['pac', 'sho', 'pas', 'dri', 'def', 'phy'];
        for (const stat of fieldInputs) {
            const value = Number(document.getElementById(stat).value);
            if (isNaN(value) || value < 0 || value > 99) {
                showError(`${stat.toUpperCase()} must be between 0 and 99!`);
                return;
            }
            stats[stat] = value;
        }
    }

    if (!flag.startsWith('http') || !logo.startsWith('http') || !playerImage.startsWith('http')) {
        showError('All image links must be valid URLs!');
        return;
    }

    const newPlayer = {
        id: `player-${Date.now()}`,
        name,
        position,
        rating,
        stats,
        images: { flag, logo, player: playerImage, badge: 'assets/badge_gold.webp' }
    };
    players.push(newPlayer);

    localStorage.setItem('players', JSON.stringify(players));

    const newCard = createPlayerCard(newPlayer);
    playersList.appendChild(newCard);

    playerForm.reset();
    formAlert.classList.add('hidden');
});

function showError(message) {
    errorMessageDiv.innerHTML = message;
    errorMessageDiv.classList.remove('hidden');
}


function createPlayerCard(player) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.setAttribute('data-id', player.id);

    card.innerHTML = `
        <img src="${player.images.badge}" alt="Badge" class="badge">
        <div class="player-content">
            <div class="player-stats">
                <p class="player-rating">${player.rating}</p>
                <p class="player-position">${player.position}</p>
            </div>
            <img src="${player.images.flag}" alt="flag" class="flag">
            <img src="${player.images.logo}" alt="team" class="logo">
            <img src="${player.images.player}" alt="Player" class="player-img">
            <div class="player-info">
                <p class="player-name">${player.name}</p>
                <div class="player-attributes">
                    ${Object.keys(player.stats).map(stat => `
                        <div>
                            <p>${stat.toUpperCase()}</p>
                            <span>${player.stats[stat]}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
    return card;
}

let selectedSlot = null;

const formationSlots = document.querySelectorAll('.card[data-position]');

formationSlots.forEach(slot => {
    slot.addEventListener('click', () => {

        formationSlots.forEach(s => s.classList.remove('selected'));

        slot.classList.add('selected');

        selectedSlot = slot;

        const selectedPosition = slot.dataset.position;
    });
});


const playersListContainer = document.querySelector('.players-list');

function filterPlayersList() {

    if (!selectedSlot) {
        playersListContainer.querySelectorAll('.card').forEach(card => {
            card.classList.remove('hidden');
        });
        return;
    }

    const selectedPosition = selectedSlot.dataset.position;

    playersListContainer.querySelectorAll('.card').forEach(card => {
        const playerPosition = card.querySelector('.player-position').textContent;
        if (playerPosition === selectedPosition) {
            card.classList.remove('hidden');
        } else {
            card.classList.add('hidden');
        }
    });
}

formationSlots.forEach(slot => {
    slot.addEventListener('click', () => {
        filterPlayersList();
    });
});

document.addEventListener('click', (event) => {
    if (!event.target.closest('.card[data-position]')) {
        selectedSlot = null;
        formationSlots.forEach(s => s.classList.remove('selected'));
        filterPlayersList();
    }
});



function renderPlayersList() {

    const storedPlayers = JSON.parse(localStorage.getItem('players'));
    players = storedPlayers;

    playersListContainer.innerHTML = '';

    players.forEach(player => {
        const playerCard = createPlayerCard(player);
        playersListContainer.appendChild(playerCard);
    });
}

renderPlayersList()

playersListContainer.addEventListener('click', (event) => {
    const clickedCard = event.target.closest('.card');

    if (!clickedCard || !selectedSlot) return;

    const playerId = clickedCard.getAttribute('data-id');
    const playerFromList = players.find(p => p.id === playerId);

    const slotPlayerId = selectedSlot.getAttribute('data-id');

    if (slotPlayerId) {

        const slotPlayer = formationPlayers.find(p => p.id === slotPlayerId);

        formationPlayers = formationPlayers.filter(p => p.id !== slotPlayerId);
        players.push(slotPlayer);
    }

    const slotContent = selectedSlot.querySelector('.player-content');
    slotContent.innerHTML = clickedCard.querySelector('.player-content').innerHTML;
    slotContent.classList.remove('hidden');
    selectedSlot.setAttribute('data-id', playerFromList.id);

    players = players.filter(p => p.id !== playerFromList.id);
    formationPlayers.push(playerFromList);

    localStorage.setItem('formationPlayers', JSON.stringify(formationPlayers));
    localStorage.setItem('players', JSON.stringify(players));

    renderPlayersList();

    selectedSlot = null;
    formationSlots.forEach(slot => slot.classList.remove('selected'));
});

formationSlots.forEach(slot => {
    const deleteButton = slot.querySelector('.delete');
    
    deleteButton.addEventListener('click', () => {

        const playerId = slot.getAttribute('data-id');

        if (playerId) {

            const player = formationPlayers.find(p => p.id === playerId);

            if (player) {

                players.push(player);

                formationPlayers = formationPlayers.filter(p => p.id !== playerId);

                localStorage.setItem('players', JSON.stringify(players));
                localStorage.setItem('formationPlayers', JSON.stringify(formationPlayers));

                renderPlayersList();
            }

            slot.querySelector('.player-content').innerHTML = '';
            slot.querySelector('.player-content').classList.add('hidden');
            delete slot.dataset.id;

        }
    });
});

document.querySelectorAll('.container2 .player-rating').forEach( rating => {
    let sum = 0;
     sum += rating
    return sum;
})

///////////////////////////////////////////////////
///////////////////////////////////////////////////