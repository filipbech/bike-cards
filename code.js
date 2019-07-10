//const dataurl = 'https://spreadsheets.google.com/feeds/list/1o4QkPboOaHwBH951_dibMcxfSBgzPGLbtmj-EvCsCY0/od6/public/values?alt=json';
const dataurl = '/riders.json';

const container = document.getElementById('container');

const html = String.raw;

const competeFields = [{
    label: 'Fødselsår 🔺',
    key: 'birthyear'
}, {
    label: 'Pro wins 🔺',
    key: 'proWins'
}, {
    label: 'Højde 🔻',
    key: 'height'
}, {
    label: 'Vægt 🔻',
    key: 'weight'
}, {
    label: 'Grand tours 🔺',
    key: 'grandTourStarts'
}, {
    label: 'Monuments 🔺',
    key: 'monumentStarts'
}];

const countries = {
    dk: '🇩🇰',
    es: '🇪🇸',
    fr: '🇫🇷',
    au: '🇦🇺',
    be:'🇧🇪',
    it:'🇮🇹',
    us:'🇺🇸',
    si:'🇸🇮',
    sk:'🇸🇰',
    pl:'🇵🇱',
    de:'🇩🇪',
    gb: '🇬🇧',
    co:'🇨🇴',
    za:'🇿🇦',
    no:'🇳🇴',
    ru:'🇷🇺',
    nl:'🇳🇱',
    ie: '🇮🇪',
    ca: '🇨🇦',
    kz: '🇰🇿',
    lu: '🇱🇺',
    ec: '🇪🇨',
    ch: '🇨🇭',
    cz: '🇨🇿',
    at: '🇦🇹',
    pt: '🇵🇹',
    ie: '🇮🇪',
    nz: '🇳🇿'
}

fetch(dataurl)
    .then(res=>res.json())
    .then(list => list.map(item => {
        const birthdayMatch = item.birthday.match(/([\d]+)$/);
        return {
            name: item.name,
            country: countries[item.country],
            img: item.image,
            result: 0,
            debut: 0,
            specialities: item.specialities,
            birthyear: birthdayMatch ? birthdayMatch[1] : '',
            team: item.team,
            height: `${item.height} m`,
            tourwins: 0,
            ridertype: '-',
            proWins: item.proWins,
            ucirank: item.uciRank,
            weight: `${item.weight} kg`,
            grandTourStarts: item.grandTourStarts,
            monumentStarts: item.monumentStarts
        };
    }))
    .then(riders => {
        riders.forEach(rider => {
            container.innerHTML += html`
                <div class="card">
                    <div class="img" style="background-image:url('${rider.img}')">
                        <div class="ranking">${rider.ucirank}.</div>    
                    </div>
                    <div class="name">
                        ${rider.name} ${rider.country}
                    </div>
                    <div class="stats">
                        ${competeFields.map(field => {
                            return html`
                            <div class="field">
                                <div class="label">${field.label}:</div>
                                <div class="value">${rider[field.key]}</div>
                            </div>
                            `;
                        }).join('')}
                    </div>
                    <div class="specialities">
                        <div class="spec">
                            <div class="label">1dags løb</div>
                            <div class="value">${rider.specialities.oneDayRaces}</div>
                        </div>
                        <div class="spec">
                            <div class="label">Klassement</div>
                            <div class="value">${rider.specialities.gC}</div>
                        </div>
                        <div class="spec">
                            <div class="label">Enkeltstart</div>
                            <div class="value">${rider.specialities.timeTrial}</div>
                        </div>
                        <div class="spec">
                            <div class="label">Sprint</div>
                            <div class="value">${rider.specialities.sprint}</div>
                        </div>
                    </div>
                    <div class="team">${rider.team}</div>
                    <div class="team-color ${rider.team.replace(',','')}"></div>
                </div>
            `;
        });
    });