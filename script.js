const siraData = [
    { year: -13, title: "بعثة النبي ﷺ", lat: 21.4572, lon: 39.8592, desc: "نزول الوحي في غار حراء." },
    { year: 0, title: "الهجرة النبوية", lat: 24.4673, lon: 39.6112, desc: "وصول النبي ﷺ إلى المدينة المنورة." },
    { year: 2, title: "غزوة بدر", lat: 23.7333, lon: 38.7833, desc: "يوم الفرقان ونصر المؤمنين." },
    { year: 8, title: "فتح مكة", lat: 21.4225, lon: 39.8262, desc: "تطهير الكعبة من الأصنام." }
];

const map = L.map('map', { zoomControl: false }).setView([24.4, 39.6], 6);
L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png').addTo(map);

let markers = [];
let currentText = "";

function updateApp(year) {
    markers.forEach(m => map.removeLayer(m));
    siraData.forEach(event => {
        if (event.year <= year) {
            const marker = L.circleMarker([event.lat, event.lon], { color: 'green', radius: 8 }).addTo(map);
            marker.on('click', () => {
                document.getElementById('eventTitle').innerText = event.title;
                document.getElementById('eventDesc').innerText = event.desc;
                currentText = event.title + ". " + event.desc;
                map.flyTo([event.lat, event.lon], 10);
            });
            markers.push(marker);
        }
    });
}

function playNarrator() {
    const speech = new SpeechSynthesisUtterance(currentText);
    speech.lang = 'ar-SA';
    window.speechSynthesis.speak(speech);
}

function locateMe() { map.locate({setView: true, maxZoom: 12}); }

document.getElementById('yearSlider').oninput = (e) => {
    document.getElementById('yearLabel').innerText = `السنة الهجرية: ${e.target.value}`;
    updateApp(e.target.value);
};

if ('serviceWorker' in navigator) { navigator.serviceWorker.register('sw.js'); }
updateApp(0);