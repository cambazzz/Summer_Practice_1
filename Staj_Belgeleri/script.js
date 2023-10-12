var jsonVerileri = []; // JSON verilerini saklamak için boş bir dizi oluşturuyoruz.

document.getElementById('jsonFileInput').addEventListener('change', function(e) {
    var file = e.target.files[0];

    if (file) {
        var reader = new FileReader();

        reader.onload = function(e) {
            var jsonContent = e.target.result;
            var parsedJson = JSON.parse(jsonContent);

            jsonVerileri = parsedJson; // JSON verilerini güncelliyoruz.

            // JSON verilerini fiyat, oda türü ve mahalle filtrelemesi için kullanabilirsiniz.
        };

        reader.readAsText(file);
    }
});

function fiyataGoreFiltrele() {
    var minFiyat = parseInt(document.getElementById('minFiyat').value);
    var maxFiyat = parseInt(document.getElementById('maxFiyat').value);

    var filtrelenmisKonaklamalar = jsonVerileri.filter(function(konaklama) {
        return konaklama.price >= minFiyat && konaklama.price <= maxFiyat;
    });

    tabloyaEkle(filtrelenmisKonaklamalar, 'jsonOutputFiyat');
}

function odaTuruneGoreFiltrele() {
    var secilenOdaTuru = document.getElementById('odaTuru').value;

    var filtrelenmisKonaklamalar = jsonVerileri.filter(function(konaklama) {
        return konaklama.room_type === secilenOdaTuru;
    });

    tabloyaEkle(filtrelenmisKonaklamalar, 'jsonOutputOdaTur');
}

function mahalleyeGoreFiltrele() {
    var secilenMahalle = document.getElementById('mahalle').value;

    var filtrelenmisKonaklamalar = jsonVerileri.filter(function(konaklama) {
        return konaklama.neighbourhood === secilenMahalle;
    });

    tabloyaEkle(filtrelenmisKonaklamalar, 'jsonOutputMahalle');
}

function tabloyaEkle(veriler, elementId) {
    var tablo = document.getElementById(elementId);
    tablo.innerHTML = ""; // Önceki içeriği temizle

    veriler.forEach(function(konaklama) {
        var satir = document.createElement("tr");
        satir.innerHTML = `
            <td>${konaklama.id}</td>
            <td>${konaklama.name}</td>
            <td>${konaklama.room_type}</td>
            <td>${konaklama.neighbourhood}</td>
			 <td>${konaklama.room_type}</td>
             <td>${konaklama.price}</td>
        `;

        tablo.appendChild(satir);
    });
}
