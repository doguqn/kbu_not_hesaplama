document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('note-form');
    const resetBtn = document.getElementById('reset-btn');
    
    const vizeInput = document.getElementById('vize');
    const finalInput = document.getElementById('final');
    const calismaInput = document.getElementById('calisma');
    const butunlemeInput = document.getElementById('butunleme');
    
    const devamsizCheck = document.getElementById('devamsiz');
    const sinavGirmedimCheck = document.getElementById('sinavGirmedim');

    const basariNotuSpan = document.getElementById('basari-notu');
    const harfNotuSpan = document.getElementById('harf-notu');
    const durumSpan = document.getElementById('durum');
    const aciklamaSpan = document.getElementById('aciklama');
    const resultCard = document.getElementById('result-card');

    const errorVize = document.getElementById('error-vize');
    const errorFinal = document.getElementById('error-final');
    const errorCalisma = document.getElementById('error-calisma');
    const errorButunleme = document.getElementById('error-butunleme');
    
    const HARF_ARALIKLARI = [
        { min: 90, max: 100, harf: 'A1', katsayi: 4.00 },
        { min: 80, max: 89, harf: 'A2', katsayi: 3.50 },
        { min: 70, max: 79, harf: 'B1', katsayi: 3.00 },
        { min: 65, max: 69, harf: 'B2', katsayi: 2.75 },
        { min: 60, max: 64, harf: 'C', katsayi: 2.50 },
    ];

    function validateInput(inputElement, errorMessageElement, isRequired = true) {
        const value = inputElement.value.trim();
        
        errorMessageElement.textContent = '';
        inputElement.classList.remove('error');

        if (isRequired && value === '') {
            errorMessageElement.textContent = `${inputElement.previousElementSibling.textContent.split('(')[0].trim()} gereklidir.`;
            inputElement.classList.add('error');
            return null;
        }

        if (value === '') {
            return null; 
        }

        const num = parseFloat(value);
        if (isNaN(num) || num < 0 || num > 100) {
            errorMessageElement.textContent = '0 ile 100 arasında geçerli bir not girin.';
            inputElement.classList.add('error');
            return null;
        }

        return num;
    }

    function clearResults(initial = false) {
        basariNotuSpan.textContent = '--';
        harfNotuSpan.textContent = '--';
        harfNotuSpan.classList.remove('grade-pass', 'grade-fail');
        durumSpan.textContent = initial ? 'Hesaplama bekleniyor...' : 'Sıfırlandı.';
        aciklamaSpan.textContent = initial ? 'Gerekli alanları doldurup "Hesapla" butonuna tıklayınız.' : '';
        resultCard.style.display = 'block'; 
    }

    function applyGradeStyle(harf) {
        harfNotuSpan.classList.remove('grade-pass', 'grade-fail');
        if (harf === 'A1' || harf === 'A2' || harf === 'B1' || harf === 'B2' || harf === 'C') {
            harfNotuSpan.classList.add('grade-pass');
        } else {
            harfNotuSpan.classList.add('grade-fail');
        }
    }

    function calculateGrade(event) {
        event.preventDefault();

        const vize = validateInput(vizeInput, errorVize, true);
        const final = validateInput(finalInput, errorFinal, true);
        let calisma = validateInput(calismaInput, errorCalisma, false);
        let butunleme = validateInput(butunlemeInput, errorButunleme, false);
        
        if (vize === null || final === null || (calisma === null && calismaInput.value.trim() !== '') || (butunleme === null && butunlemeInput.value.trim() !== '')) {
            clearResults();
            durumSpan.textContent = 'Hata oluştu.';
            aciklamaSpan.textContent = 'Lütfen işaretli alanlardaki hataları düzeltin ve gerekli alanları doldurun.';
            applyGradeStyle('F'); 
            return;
        }

        clearResults(false);

        if (devamsizCheck.checked) {
            basariNotuSpan.textContent = '--';
            harfNotuSpan.textContent = 'F1';
            durumSpan.textContent = 'Kaldı (F1 Nedeniyle)';
            aciklamaSpan.textContent = 'Dersten devamsızlıktan kaldınız. (F1: Devamsız, Genel/Bütünleme Hakkı Yok)';
            applyGradeStyle('F1');
            return;
        }
        
        if (sinavGirmedimCheck.checked) {
            basariNotuSpan.textContent = '--';
            harfNotuSpan.textContent = 'F2';
            durumSpan.textContent = 'Kaldı (F2 Nedeniyle)';
            aciklamaSpan.textContent = 'Genel/Bütünleme sınavına girmediğiniz için kaldınız. (F2: Sınava Girmedi)';
            applyGradeStyle('F2');
            return;
        }

        const yilIci = (calisma === null || isNaN(calisma)) ? vize : calisma;
        const sinavNotu = (butunleme !== null) ? butunleme : final;

        let basariNotu = (yilIci * 0.40) + (sinavNotu * 0.60);
        basariNotu = parseFloat(basariNotu.toFixed(2)); 

        let harfNotu = '';
        let durum = '';
        let aciklama = '';

        if (sinavNotu < 50) {
            harfNotu = 'F3';
            durum = 'Kaldı (F3 Nedeniyle)';
            aciklama = `Genel/Bütünleme sınav notu (${sinavNotu}) 50'nin altında olduğu için kaldı.`;
        } 
        else if (basariNotu < 60) {
            harfNotu = 'F3';
            durum = 'Kaldı (F3 Nedeniyle)';
            aciklama = `Ders başarı notu (${basariNotu}) 60'ın altında olduğu için kaldı.`;
        } 
        else {
            durum = 'Geçti';
            aciklama = 'Geçme koşulları sağlandı: Sınav Notu ≥ 50 ve Başarı Notu ≥ 60.';

            harfNotu = HARF_ARALIKLARI.find(item => basariNotu >= item.min && basariNotu <= item.max)?.harf || 'C';
        }

        basariNotuSpan.textContent = basariNotu;
        harfNotuSpan.textContent = harfNotu;
        durumSpan.textContent = durum;
        aciklamaSpan.textContent = aciklama;
        applyGradeStyle(harfNotu); 
    }

    function resetForm() {
        form.reset();
        document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
        document.querySelectorAll('input.error').forEach(el => el.classList.remove('error'));
        clearResults(true); 
    }

    form.addEventListener('submit', calculateGrade);
    resetBtn.addEventListener('click', resetForm);
    
    clearResults(true);
});