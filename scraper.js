const fetch  = require('node-fetch');
const fs = require('fs');

const jQuery = require('cheerio');

const urls = [
    'https://www.procyclingstats.com/rider/amalie-dideriksen',
    'https://www.procyclingstats.com/rider.php?id=168160',
    'https://www.procyclingstats.com/rider/annemiek-van-vleuten',
    'https://www.procyclingstats.com/rider/amanda-spratt',
    'https://www.procyclingstats.com/rider/anna-van-der-breggen',
    'https://www.procyclingstats.com/rider/julie-leth',
    'https://www.procyclingstats.com/rider.php?id=140856',
    'https://www.procyclingstats.com/rider/kirsten-wild',
    'https://www.procyclingstats.com/rider/lorena-wiebes',
    'https://www.procyclingstats.com/rider/marta-bastianelli',
    'https://www.procyclingstats.com/rider/amy-pieters',
    'https://www.procyclingstats.com/rider/leah-kirchmann',
    'https://www.procyclingstats.com/rider/ellen-van-dijk',
    'https://www.procyclingstats.com/rider/chloe-dygert-owen',

    'https://www.procyclingstats.com/rider/idar-andersen',
    'https://www.procyclingstats.com/rider/morten-hulgaard',
    'https://www.procyclingstats.com/rider/christoffer-lisson',
    'https://www.procyclingstats.com/rider/jasper-philipsen',
    'https://www.procyclingstats.com/rider/benoit-cosnefroy',
    'https://www.procyclingstats.com/rider/ryan-gibbons',
    'https://www.procyclingstats.com/rider/marc-hirschi',
    'https://www.procyclingstats.com/rider/christophe-laporte',
    'https://www.procyclingstats.com/rider/daniel-felipe-martinez',
    'https://www.procyclingstats.com/rider/tony-gallopin',
    'https://www.procyclingstats.com/rider/alexis-vuillermoz',
    'https://www.procyclingstats.com/rider/damiano-caruso',
    'https://www.procyclingstats.com/rider/daniel-oss',
    'https://www.procyclingstats.com/rider/maciej-bodnar',
    'https://www.procyclingstats.com/rider/alessandro-de-marchi',
    'https://www.procyclingstats.com/rider/ben-swift',
    'https://www.procyclingstats.com/rider/jonathan-castroviejo',
    'https://www.procyclingstats.com/rider/anthony-roux',
    'https://www.procyclingstats.com/rider/alexandre-geniez',
    'https://www.procyclingstats.com/rider/dario-cataldo',
    'https://www.procyclingstats.com/rider/yevgeniy-gidich',
    'https://www.procyclingstats.com/rider/sergio-luis-henao',
    'https://www.procyclingstats.com/rider/sebastian-henao',
    'https://www.procyclingstats.com/rider/michael-carbel',
    'https://www.procyclingstats.com/rider/caleb-ewan',
    'https://www.procyclingstats.com/rider/mike-teunissen',
    'https://www.procyclingstats.com/rider/sergio-higuita',
    'https://www.procyclingstats.com/rider/jack-haig',
    'https://www.procyclingstats.com/rider/pavel-sivakov',
    'https://www.procyclingstats.com/rider/giulio-ciccone',
    'https://www.procyclingstats.com/rider/edoardo-affini',
    'https://www.procyclingstats.com/rider/filippo-ganna',
    'https://www.procyclingstats.com/rider/dylan-van-baarle',
    'https://www.procyclingstats.com/rider/sepp-kuss',
    'https://www.procyclingstats.com/rider/gorka-izagirre',
    'https://www.procyclingstats.com/rider/angel-madrazo',
    'https://www.procyclingstats.com/rider/marc-soler',
    'https://www.procyclingstats.com/rider/tobias-foss',
    'https://www.procyclingstats.com/rider/andreas-leknessund',
    'https://www.procyclingstats.com/rider/markus-hoelgaard',
    'https://www.procyclingstats.com/rider/jacob-hindsgaul-madsen',
    'https://www.procyclingstats.com/rider/andreas-kron',
    'https://www.procyclingstats.com/rider/mathias-norsgaard',
    'https://www.procyclingstats.com/rider/lucas-eriksson',
    'https://www.procyclingstats.com/rider/nicolai-brochner',
    'https://www.procyclingstats.com/rider/rasmus-bogh-wallin',
    'https://www.procyclingstats.com/rider/tobias-kongstad',
    'https://www.procyclingstats.com/rider/frederik-rodenberg',
    'https://www.procyclingstats.com/rider/johan-price-pejtersen',
    'https://www.procyclingstats.com/rider.php?id=184409',
    'https://www.procyclingstats.com/rider/david-de-la-cruz',
    'https://www.procyclingstats.com/rider/jesus-herrada-lopez',
    'https://www.procyclingstats.com/rider/jose-herrada',
    'https://www.procyclingstats.com/rider/bryan-coquard',
    'https://www.procyclingstats.com/rider/ivan-ramiro-sosa',
    'https://www.procyclingstats.com/rider.php?id=184433',
    'https://www.procyclingstats.com/rider/magnus-cort-nielsen',
    'https://www.procyclingstats.com/rider/remco-evenepoel',
    'https://www.procyclingstats.com/rider/victor-campenaerts',
    'https://www.procyclingstats.com/rider/pello-bilbao',
    'https://www.procyclingstats.com/rider/kenny-de-ketele',
    'https://www.procyclingstats.com/rider/mikkel-bjerg',
    'https://www.procyclingstats.com/rider/mathieu-van-der-poel',
    'https://www.procyclingstats.com/rider/wout-van-aert',
    'https://www.procyclingstats.com/rider/richard-carapaz',
    'https://www.procyclingstats.com/rider/diego-ulissi',
    'https://www.procyclingstats.com/rider/alberto-bettiol',
    'https://www.procyclingstats.com/rider/sam-bennett',
    'https://www.procyclingstats.com/rider/simon-clarke',
    'https://www.procyclingstats.com/rider/michael-woods',
    'https://www.procyclingstats.com/rider/emanuel-buchmann',
    'https://www.procyclingstats.com/rider/bob-jungels',
    'https://www.procyclingstats.com/rider/maximilian-schachmann',
    'https://www.procyclingstats.com/rider/aleksey-lutsenko',
    'https://www.procyclingstats.com/rider/matej-mohoric',
    'https://www.procyclingstats.com/rider/pascal-ackermann',
    'https://www.procyclingstats.com/rider/kasper-asgreen',
    'https://www.procyclingstats.com/rider/alexander-kamp',
    'https://www.procyclingstats.com/rider/martin-toft-madsen',
    'https://www.procyclingstats.com/rider/andreas-stokbro',
    'https://www.procyclingstats.com/rider/emil-vinjebo',
    'https://www.procyclingstats.com/rider/torkil-veyhe',
    'https://www.procyclingstats.com/rider/rasmus-quaade',
    'https://www.procyclingstats.com/rider/julius-johansen',
    'https://www.procyclingstats.com/rider/casper-pedersen',
    'https://www.procyclingstats.com/rider/mikkel-honore',
    'https://www.procyclingstats.com/rider/jonas-vingegaard-rasmussen',
    'https://www.procyclingstats.com/rider/asbjorn-kragh-andersen',
    'https://www.procyclingstats.com/rider/niklas-eg',
    'https://www.procyclingstats.com/rider/fabio-jakobsen',
    'https://www.procyclingstats.com/rider.php?id=140870',
    'https://www.procyclingstats.com/rider/michael-valgren-andersen',
    'https://www.procyclingstats.com/rider/jesper-hansen-1',
    'https://www.procyclingstats.com/rider/omar-fraile',
    'https://www.procyclingstats.com/rider/luis-leon-sanchez',
    'https://www.procyclingstats.com/rider.php?id=140495',
    'https://www.procyclingstats.com/rider.php?id=135315',
    'https://www.procyclingstats.com/rider/pierre-latour',
    'https://www.procyclingstats.com/rider/vincenzo-nibali',
    'https://www.procyclingstats.com/rider/ion-izagirre',
    'https://www.procyclingstats.com/rider/domenico-pozzovivo',
    'https://www.procyclingstats.com/rider/richie-porte',
    'https://www.procyclingstats.com/rider/greg-van-avermaet',
    'https://www.procyclingstats.com/rider/tejay-van-garderen',
    'https://www.procyclingstats.com/rider/peter-sagan',
    'https://www.procyclingstats.com/rider/rafal-majka',
    'https://www.procyclingstats.com/rider/nacer-bouhanni',
    'https://www.procyclingstats.com/rider/lilian-calmejane',
    'https://www.procyclingstats.com/rider/thibaut-pinot',
    'https://www.procyclingstats.com/rider.php?id=140818',
    'https://www.procyclingstats.com/rider.php?id=140786',
    'https://www.procyclingstats.com/rider/thomas-de-gendt',
    'https://www.procyclingstats.com/rider.php?id=133024',
    'https://www.procyclingstats.com/rider/simon-yates',
    'https://www.procyclingstats.com/rider/johan-esteban-chaves',
    'https://www.procyclingstats.com/rider/matteo-trentin',
    'https://www.procyclingstats.com/rider/christopher-juul-jensen',
    'https://www.procyclingstats.com/rider/nairo-quintana',
    'https://www.procyclingstats.com/rider/mikel-landa',
    'https://www.procyclingstats.com/rider/alejandro-valverde',
    'https://www.procyclingstats.com/rider/julian-alaphilippe',
    'https://www.procyclingstats.com/rider/fernando-gaviria',
    'https://www.procyclingstats.com/rider/philippe-gilbert',
    'https://www.procyclingstats.com/rider/michael-morkov',
    'https://www.procyclingstats.com/rider/louis-meintjes',
    'https://www.procyclingstats.com/rider/mark-cavendish',
    'https://www.procyclingstats.com/rider/edvald-boasson-hagen',
    'https://www.procyclingstats.com/rider/rigoberto-uran',
    'https://www.procyclingstats.com/rider/pierre-rolland',
    'https://www.procyclingstats.com/rider/tao-geoghegan-hart',
    'https://www.procyclingstats.com/rider/jonas-gregaard',
    'https://www.procyclingstats.com/rider/sep-vanmarcke',
    'https://www.procyclingstats.com/rider/warren-barguil',
    'https://www.procyclingstats.com/rider/ilnur-zakarin',
    'https://www.procyclingstats.com/rider/tony-martin',
    'https://www.procyclingstats.com/rider/mads-wurtz-schmidt',
    'https://www.procyclingstats.com/rider/dylan-groenewegen',
    'https://www.procyclingstats.com/rider/steven-kruijswijk',
    'https://www.procyclingstats.com/rider/primoz-roglic',
    'https://www.procyclingstats.com/rider/christopher-froome',
    'https://www.procyclingstats.com/rider/geraint-thomas',
    'https://www.procyclingstats.com/rider/egan-bernal',
    'https://www.procyclingstats.com/rider/michal-kwiatkowski',
    'https://www.procyclingstats.com/rider/wout-poels',
    'https://www.procyclingstats.com/rider.php?id=140118',
    'https://www.procyclingstats.com/rider/soren-kragh-andersen',
    'https://www.procyclingstats.com/rider/bauke-mollema',
    'https://www.procyclingstats.com/rider/john-degenkolb',
    'https://www.procyclingstats.com/rider/mads-pedersen',
    'https://www.procyclingstats.com/rider/alexander-kristoff',
    'https://www.procyclingstats.com/rider/dan-martin',
    'https://www.procyclingstats.com/rider/fabio-aru',
    'https://www.procyclingstats.com/rider/guillaume-martin',
    'https://www.procyclingstats.com/rider/lasse-norman-hansen',
    'https://www.procyclingstats.com/rider/enric-mas',
    'https://www.procyclingstats.com/rider/miguel-angel-lopez',
    'https://www.procyclingstats.com/rider/elia-viviani',
    'https://www.procyclingstats.com/rider/tim-wellens',
    'https://www.procyclingstats.com/rider/michael-matthews',
    'https://www.procyclingstats.com/rider/jasper-stuyven',
    'https://www.procyclingstats.com/rider/niki-terpstra',
    'https://www.procyclingstats.com/rider/sonny-colbrelli',
    'https://www.procyclingstats.com/rider/zdenek-stybar',
    'https://www.procyclingstats.com/rider/gianni-moscon',
    'https://www.procyclingstats.com/rider/tiesj-benoot',
    'https://www.procyclingstats.com/rider/daryl-impey',
    'https://www.procyclingstats.com/rider/rohan-dennis',
    'https://www.procyclingstats.com/rider/stefan-kung',
    'https://www.procyclingstats.com/rider/felix-grossschartner',
    'https://www.procyclingstats.com/rider/dylan-teuns',
    'https://www.procyclingstats.com/rider/yves-lampaert',
    'https://www.procyclingstats.com/rider/nils-politt',
    'https://www.procyclingstats.com/rider/rui-costa',
    'https://www.procyclingstats.com/rider/tadej-pogacar',
    'https://www.procyclingstats.com/rider/danny-van-poppel',
    'https://www.procyclingstats.com/rider/george-bennett',
    'https://www.procyclingstats.com/rider/davide-formolo',
    'https://www.procyclingstats.com/rider/wilco-kelderman',
    'https://www.procyclingstats.com/rider/sam-oomen',
    'https://www.procyclingstats.com/rider/patrick-konrad',
    'https://www.procyclingstats.com/rider/timothy-dupont',
    'https://www.procyclingstats.com/rider/valentin-madouas',
    'https://www.procyclingstats.com/rider/david-gaudu',
    'https://www.procyclingstats.com/rider/eduard-prades'
]; //.filter((a,b) => b<1);


//https://stackoverflow.com/questions/2970525/converting-any-string-into-camel-case
function camelize(str) {
    return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function (match, index) {
        if (+match === 0) return ""; // or if (/\s+/.test(match)) for white spaces
        return index == 0 ? match.toLowerCase() : match.toUpperCase();
    });
}

const parser = (response, url) => {
    const content = jQuery(response);

    const team = content.find('h1 .red').text();
    const name = content.find('h1').text().replace(team, '').replace('»', '').trim();
    const image = 'https://www.procyclingstats.com/' + content.find('.content h3').first().next().find('a img').first().attr('src');
    const info = content.find('.rdr-info-cont');
    const bitchdayMatch = info.text().match(/Date of birth: ([\w\d\s]+)/i);
    const birthday = bitchdayMatch ? bitchdayMatch[1].trim() : '';
    const countryMatch = info.find('.flag').first().attr('class')
    const country = countryMatch ? countryMatch.replace('flag', '').trim() : '';
    const weightMatch = info.text().match(/Weight: ([\d]+) kg/i);
    const weight = weightMatch ? weightMatch[1].trim() : '-';
    const heightMatch = info.text().match(/Height: ([\d\.]+) m/i);
    const height = heightMatch ? heightMatch[1].trim() : '-';
    const uciRank = info.find('.rdrStandings span').eq(1).text();

    const winsText = content.find('.key-stats li');

    const proWins = winsText.eq(2).find('div').first().text().trim();
    const grandTourStarts = winsText.eq(0).find('div').first().text().trim();
    const monumentStarts = winsText.eq(1).find('div').first().text().trim();

    const specialities = {};

    info.find('.pps li').toArray().map(row => {
        return {
            score: jQuery(row).find('span').eq(1).text(),
            label: jQuery(row).find('span').eq(2).text(),
        };
    }).forEach(item => {
        specialities[camelize(item.label)] = item.score
    });

    return {
        name,
        team,
        image,
        birthday,
        country,
        weight,
        height,
        specialities,
        uciRank,
        proWins,
        grandTourStarts,
        monumentStarts,
        url
    };
}

const requests = Promise.all(urls.map(url => 
        fetch(url)
            .then(res => res.text())
            .then(content => {
                try {
                    return parser(content, url) 
                } catch(err) {
                    console.log(err);
                    return {url, err}
                }              
            })
    ));

requests.then(riders => {
    riders = riders.sort((riderA, riderB) => +riderA.uciRank - riderB.uciRank)
    fs.writeFileSync('riders.json', JSON.stringify(riders));
    console.log('riders.json created...');
});



