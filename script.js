// بيانات السيرة النبوية - شرح مفصل
const siraData = [
    { 
        year: -13, 
        title: "بعثة النبي ﷺ", 
        lat: 21.4572, 
        lon: 39.8592, 
        desc: "في سن الأربعين، نزل الوحي جبريل عليه السلام على النبي ﷺ في غار حراء، وكانت أول كلمة هي 'اقرأ'، لتبدأ أعظم رحلة في تاريخ البشرية من قلب مكة." 
    },
    { 
        year: 0, 
        title: "الهجرة النبوية الشريفة", 
        lat: 24.4673, 
        lon: 39.6112, 
        desc: "بعد اشتداد أذى قريش، هاجر النبي ﷺ مع أبي بكر الصديق إلى يثرب (المدينة المنورة)، حيث استقبله الأنصار بالفرح، وبدأ بناء الدولة الإسلامية والمسجد النبوي." 
    },
    { 
        year: 2, 
        title: "غزوة بدر الكبرى", 
        lat: 23.7333, 
        lon: 38.7833, 
        desc: "أول معركة فاصلة بين المسلمين وقريش. وقعت عند آبار بدر، ورغم قلة عدد المسلمين، إلا أن الله نصرهم بجنود من الملائكة، وكانت فرقاناً بين الحق والباطل." 
    },
    { 
        year: 3, 
        title: "غزوة أحد", 
        lat: 24.5031, 
        lon: 39.6108, 
        desc: "وقعت عند جبل أحد. كان النصر للمسلمين في البداية، لكن مخالفة الرماة لأوامر النبي ﷺ غيرت الموازين، واستشهد فيها حمزة بن عبد المطلب عم النبي ﷺ." 
    },
    { 
        year: 8, 
        title: "فتح مكة", 
        lat: 21.4225, 
        lon: 39.8262, 
        desc: "دخل النبي ﷺ مكة فاتحاً بعشرة آلاف مقاتل دون قتال، وحطم الأصنام حول الكعبة، وأعلن العفو العام قائلاً: 'اذهبوا فأنتم الطلقاء'، ليدخل الناس في دين الله أفواجاً." 
    }
];

// إعداد الخريطة
const map = L.map('map', { zoomControl: false }).setView([24.4, 39.6], 5);
L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png').addTo(map);

let markers = [];
let currentText = "مرحباً بك في أطلس السيرة النبوية. حرك شريط الزمن بالأسفل واستكشف الأحداث.";

// وظيفة تحديث التطبيق بناءً على السنة
function updateApp(selectedYear) {
    // مسح النقط القديمة
    markers.forEach(m => map.removeLayer(m));
    markers = [];

    siraData.forEach(event => {
        // إظهار النقطة فقط إذا كانت السنة مطابقة أو قبل السنة المختارة
        if (event.year <= selectedYear) {
            const marker = L.circleMarker([event.lat, event.lon], {
                color: '#C19A6B',
                fillColor: '#2E7D32',
                fillOpacity: 0.8,
                radius: 10
            }).addTo(map);

            marker.on('click', () => {
                document.getElementById('eventTitle').innerText = event.title;
                document.getElementById('eventDesc').innerText = event.desc;
                currentText = event.title + ". " + event.desc; // لتجهيز النص للراوي
                map.flyTo([event.lat, event.lon], 9);
            });
            markers.push(marker);
        }
    });
}

// وظيفة الراوي (تم إصلاحها لتعمل على الموبايل)
function playNarrator() {
    // إيقاف أي صوت شغال حالياً
    window.speechSynthesis.cancel();
    
    const speech = new SpeechSynthesisUtterance(currentText);
    speech.lang = 'ar-SA';
    speech.pitch = 1;
    speech.rate = 0.9; // سرعة هادئة ومناسبة
    window.speechSynthesis.speak(speech);
}

function locateMe() { map.locate({setView: true, maxZoom: 10}); }

// ربط شريط الزمن
document.getElementById('yearSlider').oninput = (e) => {
    const val = e.target.value;
    document.getElementById('yearLabel').innerText = val < 0 ? `السنة: ${Math.abs(val)} قبل الهجرة` : `السنة الهجرية: ${val}`;
    updateApp(val);
};

// التشغيل الأولي
updateApp(0);