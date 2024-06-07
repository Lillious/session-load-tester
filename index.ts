const userAgents = [{"ua": "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Mobile Safari/537.3", "pct": 41.89}, {"ua": "Mozilla/5.0 (iPhone; CPU iPhone OS 17_4_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4.1 Mobile/15E148 Safari/604.", "pct": 24.32}, {"ua": "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/25.0 Chrome/121.0.0.0 Mobile Safari/537.3", "pct": 9.46}, {"ua": "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Mobile Safari/537.3", "pct": 6.76}, {"ua": "Mozilla/5.0 (iPhone; CPU iPhone OS 17_5_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Mobile/15E148 Safari/604.", "pct": 5.41}, {"ua": "Mozilla/5.0 (iPhone; CPU iPhone OS 17_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/125.0.6422.80 Mobile/15E148 Safari/604.", "pct": 2.7}, {"ua": "Mozilla/5.0 (iPhone; CPU iPhone OS 17_3_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.3.1 Mobile/15E148 Safari/604.", "pct": 1.35}, {"ua": "Mozilla/5.0 (iPhone; CPU iPhone OS 17_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) GSA/317.0.634488990 Mobile/15E148 Safari/604.", "pct": 1.35}, {"ua": "Mozilla/5.0 (Linux; Android 10.0.99; S109 Build/LMY47I; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/95.0.4638.74 Safari/537.3", "pct": 1.35}, {"ua": "Mozilla/5.0 (Linux; U; Android 9; sk-sk; Redmi Note 7 Build/PKQ1.180904.001) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/112.0.5615.136 Mobile Safari/537.36 XiaoMi/MiuiBrowser/14.10.1-g", "pct": 1.35}, {"ua": "Mozilla/5.0 (Linux; Android 9; moto x4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.127 Mobile Safari/537.3", "pct": 1.35}, {"ua": "Mozilla/5.0 (Linux; Android 10; MAR-LX1A) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.0.0 Mobile Safari/537.3", "pct": 1.35}, {"ua": "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/24.0 Chrome/117.0.0.0 Mobile Safari/537.3", "pct": 1.35}];
const args = process.argv.slice(2);

if (args.length === 1 && args[0] === '-help') {
    console.log('Usage: .\\session-load-tester.exe -url <url> -count <count> -wait <wait>');
    process.exit(0);
}

const urlIndex = args.indexOf('-url');
const url = args[urlIndex + 1];

if (urlIndex === -1 || !url) {
    console.error('Please provide a url with the -url flag');
    process.exit(1);
}

const urlRegex = new RegExp('^(http|https)://', 'i');
if (!urlRegex.test(url)) {
    console.error('Please provide a valid url');
    process.exit(1);
}

// Number of requests to make
const countIndex = args.indexOf('-count');
const count = args[countIndex + 1];

if (countIndex === -1 || !count) {
    console.error('Please provide a count with the -count flag');
    process.exit(1);
}

if (isNaN(Number(count)) || Number(count) < 1) {
    console.error('Please provide a valid count');
    process.exit(1);
}

// Time in seconds to wait between requests
const waitIndex = args.indexOf('-wait');
const wait = args[waitIndex + 1];

if (waitIndex === -1 || !wait) {
    console.error('Please provide a wait with the -wait flag');
    process.exit(1);
}

if (isNaN(Number(wait)) || Number(wait) === 0) {
    console.error('Please provide a valid wait');
    process.exit(1);
}

console.log(`Making ${count} requests to ${url} with a ${wait} second wait between requests`);

function getRandomUserAgent() {
    return userAgents[Math.floor(Math.random() * userAgents.length)].ua;
}

async function MakeRequest(ua: string) {
    await fetch(url,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'user-agent': ua
            }
        })
}

for (let i = 0; i < Number(count); i++) {
    setTimeout(async () => {
        const ua = getRandomUserAgent();
        console.log(`Request ${i + 1} with user agent: ${ua}`);
        await MakeRequest(ua).catch(console.error);
    }, i * Number(wait) * 1000);
}