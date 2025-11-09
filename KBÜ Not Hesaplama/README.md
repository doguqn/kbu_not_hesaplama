Karabük Üniversitesi (KBÜ) ders geçme yönetmeliğine göre vize ve final/bütünleme notları ile başarı notu ve harf notunu hesaplayan bir web uygulamasıdır.

## 📝 Proje Açıklaması

Bu proje, bir öğrencinin girilen notlara ve durumlara (devamsızlık, sınava girmeme) göre dersten geçip geçmediğini belirlemek amacıyla HTML, CSS ve JavaScript kullanılarak geliştirilmiştir.

## 🧮 KBÜ Hesaplama Mantığı

KBÜ kurallarına göre, ders geçme durumu iki ana koşula bağlıdır:

1.  **Ağırlıklı Başarı Notu:** Başarı notu **%40 Yıl İçi Puan** ve **%60 Genel/Bütünleme Sınav Notu** ağırlıklandırılarak hesaplanır.
2.  **Geçme Koşulları:**
    * Genel/Bütünleme Sınav notu en az **50** olmalıdır.
    * Ders Başarı Notu en az **60** olmalıdır.

Bu koşullar sağlanmazsa not **F3** olarak belirlenir. Devamsızlık durumunda **F1**, sınava girmeme durumunda ise **F2** verilir.

## 🚀 Kullanım Talimatı

1.  Proje dosyalarını (index.html, style.css, script.js) indirin.
2.  `index.html` dosyasını herhangi bir web tarayıcısı (Chrome, Firefox vb.) ile açın.
3.  Gerekli notları (Vize, Final) girin. Opsiyonel alanları ve durum kutucuklarını ayarlayın.
4.  **Hesapla** butonuna tıklayarak sonucu görün.

## 🧪 Test Senaryoları

Aşağıdaki senaryolar ve beklenen sonuçlar, hesaplama mantığının doğruluğunu test etmek için kullanılmıştır:

| Vize | Final | Bütünleme | Devamsız | Başarı Notu | Harf Notu | Durum |
| :---: | :---: | :---: | :---: | :---: | :---: | :--- |
| 70 | 60 | - | Hayır | 64.00 | C | Geçti |
| 95 | 48 | - | Hayır | 66.80 | F3 | Kaldı (Final < 50) |
| 58 | - | 55 | Hayır | 56.20 | F3 | Kaldı (Başarı < 60) |
| 70 | 70 | - | Evet | -- | F1 | Kaldı (Devamsızlık) |