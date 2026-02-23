import { Student, UniformStatus, AssessmentStatus, FeeStatus, PaymentStatus, StudentType, StudentCategory, ApplicationStatus } from './types';

const CSV_DATA = `
,Monitoring Proses PSB ,,,,,,,,,,,,,,,,,,,,,,,,,,,
,Tahun Ajaran 2026/2027,,,,,,,,,,,,,,,,,,,,,,,,,,,
,Internal,30,Eksternal SN,1,Cancel,32,,,KELAS 1,73,,,,,,,,,,,,,,,,,,
,Eksternal,31,Special Need,7,,,,,,,,,,,,,,,,,,,,,,,,
,Pindahan,3,Beasiswa,2,,,,,,,,,,,,,,,,,,,,,,,,
,Internal karyawan,2,,PHASE ONE,,,,PHASE TWO,,,,,,,,PHASE THREE,,,PHASE FOUR,,,PHASE FIVE,,PHASE SIX,,,,
No,Nama Siswa ,Internal/Eksternal ,Keterangan,Tanggal Pembelian Formulir,Pengembalian Berkas Formulir ,Kelengkapan Dokumen Pendukung (Akte-KK),Cek Rekomendasi Guru TK untuk siswa internal,Pengiriman Undangan Observasi/Interview ,Jadwal Observasi Siswa,Notes,"Proses Interview (kecuali notes diisi admin, bagian lainnya diisi oleh Interviewer)",,,,,Pengukuran Seragam ,Penjelasan Keuangan ,Ttd Surat Pernyataan ,,Surat Penerimaan PSB,Tanggal booking Fee,Pembayaran ,Lama Proses (hari),Surat Rekomendasi bagi Siswa Pindahan (diberikan jika sudah pembayaran),Informasi Buku (siswa berkebutuhan khusus menyusul),Akun Email,Folder arsip info persiapan sekolah (di-share ke orang tua),Join Information WA Group
,,,,,,,,,,,Jadwal Interview,Notes,Interviewer ,Rekomendasi Hasil Interview ,Sibling di SMP/kakak akan masuk ke SMP Lazuardi,,,,Tgl Pengiriman Surat Penerimaan,,,,,,,,,
,,,,,,,,,,,,,,,,,,,,,,,,,,,,
1,Sherunaya Patriana,Cancel,,9/6/2025,9/9/2025,Lengkap,Disarankan observasi,,,,,,,,,,,,,,,,,,,,,
2,Reandra Pininta Kusuma,Internal,,9/6/2025,9/8/2025,Lengkap,,,,,10/31/2025,,Tr. Sari,Diterima,,,Sudah acc finance,Sudah ditandatangani tanpa materai,11/3/2025,Surat Penerimaan SD Lazuardi-ananda Reandra Pininta Kusuma.pdf,11/18/2025,Booking Fee,,,,,,
3,Jan Aldari Elmaco,Internal SN,,9/6/2025,9/24/2025,Lengkap,,,,,10/9/2025,,Tr. Sari,Diterima,,,Sudah acc finance,Sudah ditandatangani dengan materai,10/10/2025,Surat Penerimaan SD Lazuardi-ananda Jan Aldari Elmaco.pdf,10/27/2025,Booking Fee,,,,,,
4,Ashenath Harzky,Internal,,9/8/2025,9/26/2025,Lengkap,,,,,10/31/2025,,Tr. Fina,Diterima,,,Sudah acc finance,Sudah ditandatangani dengan materai,11/3/2025,Surat Penerimaan SD Lazuardi-ananda Ashenath Harzky.pdf,11/4/2025,Booking Fee,,,,,,
5,Reyhan Sakha Alfarizi,Internal,Adik Devandra Elhasyiq Muazzam,9/8/2025,9/26/2025,Lengkap,,,,,11/7/2025,,Tr. Sari,Diterima,Kakak di kelas 1-5 SD Lazuardi,,Sudah acc finance,Sudah ditandatangani dengan materai,11/10/2025,Surat Penerimaan SD Lazuardi-ananda Reyhan Sakha Alfarizi (1).pdf,11/10/2025,Lunas UP-SPP Juli,,,,,,
6,Hawla Kalani Zagira,Internal,,9/8/2025,10/9/2025,Lengkap,,,,,10/31/2025,,Tr. Sari,Diterima,,,Sudah acc finance,Sudah ditandatangani dengan materai,11/3/2025,Surat Penerimaan SD Lazuardi-ananda Hawla Kalani Zagira.pdf,11/11/2025,Lunas UP-SPP Juli,,,,,,
7,Rumi Amina Narayana,Internal,,9/8/2025,9/10/2025,Lengkap,,,,,11/13/2025,,Tr. Sari,Diterima,,,Sudah acc finance,Sudah ditandatangani tanpa materai,11/17/2025,Surat Penerimaan SD Lazuardi-ananda Rumi Amina Narayana.pdf,11/25/2025,Booking Fee,,,,,,
8,Ahmad Zewail Ryoutaziz Tahir,Internal SN,,9/10/2025,9/18/2025,Lengkap,,,,,10/1/2025,,Tr. Fina,Diterima,,,Sudah acc finance,Sudah ditandatangani tanpa materai,10/2/2025,Surat Penerimaan SD Lazuardi-ananda Ahmad Zewail Ryoutaziz Tahir.pdf,10/13/2025,Booking Fee,,,,,,
9,Saka Kata Athaillah Baihaqi ,Internal,,9/10/2025,9/19/2025,Lengkap,,,12/6/2025,,12/12/2025,,Tr. Sari,Diterima,,,Sudah acc finance,Sudah ditandatangani tanpa materai,12/15/2025,Surat Penerimaan SD Lazuardi-ananda Saka Kata Athaillah Baihaqi.pdf,12/29/2025,Booking Fee,,,,,,
10,Muhammad Ryuga Alezayn,Internal,,9/12/2025,9/26/2025,Lengkap,,,,,11/7/2025,,Tr. Fina,Diterima,Kakak di kelas 1-5 SD Lazuardi,,Sudah acc finance,Sudah ditandatangani dengan materai,11/10/2025,Surat Penerimaan SD Lazuardi-ananda Muhammad Ryuga Alezayn.pdf,11/24/2025,Lunas UP-SPP Juli,,,,,,
11,Muhammad Ardiaz Prayudi,Internal,,9/12/2025,11/13/2025,KK dan akte belum ada,,,,,11/13/2025,,Tr. Sari,Diterima,,,Sudah acc finance,Sudah ditandatangani dengan materai,11/17/2025,Surat Penerimaan SD Lazuardi-ananda Muhammad Ardiaz Prayudi.pdf,12/13/2025,Booking Fee,,,,,,
12,Kaiga Rauf Widodo,Internal,,9/12/2025,10/24/2025,Lengkap,,,12/6/2025,,12/11/2025,,Tr. Sari,Diterima,,,Sudah acc finance,Sudah ditandatangani dengan materai,12/15/2025,Surat Penerimaan SD Lazuardi-ananda Kaiga Rauf Widodo.pdf,12/22/2025,Booking Fee,,,,,,
13,Alexein Alvarendra Sudwi,Internal,,9/12/2025,12/8/2025,KK dan akte belum ada,,,12/6/2025,Hasil observasi menunjukkan ananda memerlukan asesmen/evaluasi ahli,12/11/2025,Jadwal asesmen di tgl 29 Januari,Tr. Fina,Menunggu Hasil Observasi Lanjutan,,,,,,,,,,,,,,
14,Mahdi Idrus,Internal,,9/12/2025,12/3/2025,Lengkap,,,12/6/2025,,12/11/2025,,Tr. Fina,Diterima,,,Sudah acc finance,Sudah ditandatangani dengan materai,12/15/2025,Surat Penerimaan SD Lazuardi-ananda Mahdi Idrus.pdf,12/29/2025,Booking Fee,,,,,,
15,Aurora Langit Biru,Internal,Adik Laksmana Samudra Biru,9/12/2025,9/24/2025,KK dan akte belum ada,,,,,11/6/2025,,Tr. Sari,Diterima,Kakak di kelas 1-5 SD Lazuardi,,Sudah acc finance,Sudah ditandatangani dengan materai,11/10/2025,Surat Penerimaan SD Lazuardi-ananda Aurora Langit Biru.pdf,10/22/2025,Lunas UP-SPP Juli,,,,,,
16,Hamzah Dahlan Rahadityo,Internal SN,,9/12/2025,10/16/2025,Lengkap,,,,,10/17/2025,,Tr. Sari,Diterima,,,Sudah acc finance,Sudah ditandatangani dengan materai,10/20/2025,Surat Penerimaan SD Lazuardi-ananda Hamzah Dahlan Rahadityo.pdf,11/6/2025,Booking Fee,,,,,,
17,Chayra Adinda Elfikri,Cancel,,9/12/2025,9/26/2025,Lengkap,,,,,10/31/2025,,Tr. Sari,cancel proses PSB permintaan ortu,,,Sudah acc finance,Sudah ditandatangani dengan materai,11/3/2025,Surat Penerimaan SD Lazuardi-ananda Chayra Adinda Elfikri.pdf,,,,,,,,
18,Muhammad Husain Ramadhan,Internal,,9/12/2025,9/19/2025,KK dan akte belum ada,,,12/20/2025,,1/9/2026,,Tr. Fina,Diterima,,,Sudah acc finance,Sudah ditandatangani dengan materai,1/12/2026,Surat Penerimaan SD Lazuardi-ananda Muhammad Husain Ramadhan.pdf,2/3/2026,Booking Fee,,,,,,
19,Valerie Aiza Setianegara,Cancel,,9/12/2025,9/26/2025,Belum ada Akte Lahir,,,,,,,,,,,,Sudah ditandatangani dengan materai,,,,,,,,,,
20,Nail Hamid Adkaruni,Internal,,9/12/2025,10/16/2025,Lengkap,,,12/6/2025,Ananda akan ikut observasi bersama siswa internal,11/13/2025,,Tr. Fina,Diterima,,,Sudah acc finance,Sudah ditandatangani dengan materai,12/15/2025,Surat Penerimaan SD Lazuardi-ananda Nail Hamid Adkaruni.pdf,12/22/2025,Booking Fee,,,,,,
21,Lateshia Aurora Maleeka,Internal,,9/12/2025,9/26/2025,Lengkap,,,,,11/13/2025,,Tr. Sari,Diterima,,,Sudah acc finance,Sudah ditandatangani dengan materai,11/17/2025,Surat Penerimaan SD Lazuardi-ananda Lateshia Aurora Maleeka.pdf,12/2/2025,Booking Fee,,,,,,
22,Zahra Aleefa Subiyanto,Internal,Adik Zaky Alvaronizam,9/12/2025,11/13/2025,Lengkap,,,,,11/13/2025,,Tr. Fina,Diterima,,,Sudah acc finance,Sudah ditandatangani tanpa materai,11/17/2025,Surat Penerimaan SD Lazuardi-ananda Zahra Aleefa Subiyanto.pdf,12/1/2025,Booking Fee,,,,,,
23,Arvilla Arjidin Putri Hurairah,Internal,Adik Arly Arjidin Putri Hurairah,9/12/2025,9/26/2025,Lengkap,,,,,11/14/2025,,Tr. Fina,Diterima,Kakak di kelas 1-5 SD Lazuardi,,Sudah acc finance,Sudah ditandatangani dengan materai,11/17/2025,Surat Penerimaan SD Lazuardi-ananda Arvilla Arjidin Putri Hurairah.pdf,11/27/2025,Booking Fee,,,,,,
24,Damar Handaru,Internal SN,,9/12/2025,10/1/2025,Lengkap,,,,,10/1/2025,,Tr. Fina,Diterima,,,Sudah acc finance,Sudah ditandatangani dengan materai,10/2/2025,Surat Penerimaan SD Lazuardi-ananda Damar Handaru.pdf,12/8/2025,Lunas UP,,,,,,
25,Demas Herdian,Internal SN,,9/12/2025,10/1/2025,Lengkap,,,,,10/1/2025,,Tr. Fina,Diterima,Kakak di kelas 1-5 SD Lazuardi,,Sudah acc finance,Sudah ditandatangani dengan materai,10/2/2025,Surat Penerimaan SD Lazuardi-ananda Demas Herdian.pdf,12/8/2025,Lunas UP,,,,,,
26,Atharazka Khairan Putra Lintang,Internal,,9/12/2025,9/15/2025,Lengkap,,,,,11/18/2025,,Tr. Sari,Diterima,Kakak di kelas 1-5 SD Lazuardi,,Sudah acc finance,Sudah ditandatangani tanpa materai,11/24/2025,Surat Penerimaan SD Lazuardi-ananda Atharazka Khairan Putra Lintang.pdf,12/8/2025,Booking Fee,,,,,,
27,Qyuzee Muizzu Nelson Dermawan,Internal SN,,9/12/2025,9/15/2025,Lengkap,,,,,10/1/2025,,Tr. Sari,Diterima,,,Sudah acc finance,Sudah ditandatangani tanpa materai,10/2/2025,Surat Penerimaan SD Lazuardi-ananda Qyuzee Muizzu Nelson Dermawan.pdf,10/2/2025,Booking Fee,,,,,,
28,Firnas Ammar Yusuf,Internal SN,,9/13/2025,10/1/2025,KK dan akte belum ada,,,,,10/1/2025,,Tr. Sari,Diterima,,,Sudah acc finance,Belum ditandatangani,10/2/2025,Surat Penerimaan SD Lazuardi-ananda Firnas Ammar Yusuf.pdf,10/15/2025,Booking Fee,,,,,,
29,Louis Siddhartha,Internal,,9/15/2025,9/26/2025,Lengkap,,,,,11/21/2025,,Tr. Fina,Diterima,,,Sudah acc finance,Sudah ditandatangani dengan materai,11/24/2025,Surat Penerimaan SD Lazuardi-ananda Louis Siddhartha.pdf,11/27/2025,Booking Fee,,,,,,
30,Rayhan Ashami Eishennoraz,Eksternal SN,Adik Rania Eishennoraz,9/15/2025,9/29/2025,Lengkap,,,9/27/2025,,10/1/2025,,Tr. Sari,Diterima,Kakak di kelas 1-5 SD Lazuardi,Sudah ukur seragam,Sudah acc finance,Sudah ditandatangani tanpa materai,10/2/2025,Surat Penerimaan SD Lazuardi-ananda Rayhan Ashami Eishenoraz.pdf,10/6/2025,Booking Fee,,,,,,
31,Qaleey Lunara Radityo,Internal,,9/15/2025,11/5/2025,Lengkap,,,,,11/7/2025,,Tr. Sari,Diterima,,,Sudah acc finance,Sudah ditandatangani tanpa materai,11/10/2025,Surat Penerimaan SD Lazuardi-ananda Qaleey Lunara Radityo.pdf,11/24/2025,Booking Fee,,,,,,
32,Ayesha Kyreen Mikhayla Kusnadi,Karyawan,,9/15/2025,11/7/2025,Belum ada Akte Lahir,,,,,11/13/2025,,Tr. Fina,Diterima,Kakak di kelas 1-5 SD Lazuardi,,Sudah acc finance,Sudah ditandatangani dengan materai,11/17/2025,Surat Penerimaan-ananda Ayesha Kyreen Mikhayla Kusnadi.pdf,12/12/2025,Booking Fee,,,,,,
33,Gemmica Jaden,Internal,Adik Geenesha Olivine,9/17/2025,10/1/2025,Lengkap,,,,,11/14/2025,,Tr. Fina,Diterima,Kakak di kelas 1-5 SD Lazuardi,,Sudah acc finance,Sudah ditandatangani dengan materai,11/17/2025,Surat Penerimaan SD Lazuardi-ananda Gemmica Jaden.pdf,11/17/2025,Lunas UP-SPP Juli,,,,,,
34,Albirru Isaac Mubarok,Internal,Adik Elvan Mubarok,9/18/2025,10/13/2025,Lengkap,,,1/10/2026,,1/22/2026,,Tr. Fina,Diterima,Kakak di kelas 1-5 SD Lazuardi,,Sudah acc finance,Sudah ditandatangani tanpa materai,1/26/2026,Surat Penerimaan SD Lazuardi-ananda Albirru Isaac Mubarok.pdf,1/30/2026,Booking Fee,,,,,,
35,Gemattaya Aaravasa Akbar,Eksternal,Adik Ahmad Azkavin,9/18/2025,10/2/2025,Lengkap,,,10/4/2025,,10/23/2025,,Tr. Sari,Diterima,Kakak di kelas 1-5 SD Lazuardi,Sudah ukur seragam,Sudah acc finance,Sudah ditandatangani tanpa materai,10/27/2025,Surat Penerimaan SD Lazuardi-ananda Gemattaya Aaravasa Akbar.pdf,12/8/2025,Booking Fee,,,,,,
36,Kiano Atharrazka Kalandra,Internal,Adik Alrafaeyza Muhammad Farzani,9/19/2025,9/26/2025,KK dan akte belum ada,,,,,11/7/2025,,Tr. Fina,Diterima,Kakak di kelas 1-5 SD Lazuardi,,Sudah acc finance,Sudah ditandatangani dengan materai,11/10/2025,Surat Penerimaan SD Lazuardi-ananda Kiano Atharrazka Kalandra.pdf,,,,,,,,
37,Janizara Ramadhani Bachtiar,Internal,Adik Fachri Akbar,9/19/2025,11/5/2025,Lengkap,,,,,11/6/2025,,Tr. Fina,Diterima,Kakak di kelas 1-5 SD Lazuardi,,Sudah acc finance,Sudah ditandatangani dengan materai,11/10/2025,Surat Penerimaan SD Lazuardi-ananda Janizara Ramadhani Bachtiar.pdf,10/22/2025,Booking Fee,,,,,,
39,Kassandra Wirahayu Sosodoro,Cancel,,9/20/2025,9/25/2025,Lengkap,,,9/27/2025,,10/9/2025,,Tr. Fina,cancel proses PSB permintaan ortu,,Sudah ukur seragam,Sudah acc finance,Belum ditandatangani,10/10/2025,Surat Penerimaan SD Lazuardi-ananda Kassandra Wirahayu Sosodoro.pdf,,,,,,,,
38,Alqantara Nabil Bastian,Cancel,,9/19/2025,,,,,,,,,,,,,,,,,,,,,,,,
41,Nadira Parisya Kahar,Cancel,,9/20/2025,,,,,,,,,,,,,,,,,,,,,,,,
40,Arsyanendra Kaisan,Eksternal,,9/20/2025,10/8/2025,Lengkap,,,10/11/2025,,10/24/2025,,Tr. Fina,Diterima,,Sudah ukur seragam,Sudah acc finance,Sudah ditandatangani dengan materai,10/27/2025,Surat Penerimaan SD Lazuardi-ananda Arsyanendra Kaisan Putra.pdf,11/7/2025,Booking Fee,,,,,,
43,Axel Hafeez Akbar,Cancel,,9/20/2025,10/1/2025,Lengkap,,,9/27/2025,Hasil asesmen tier 2,10/9/2025,,Tr. Fina,Diterima,,Sudah ukur seragam,,Sudah ditandatangani dengan materai,,,,,,,,,,
42,Ryola Divya Solihin,Eksternal,Adik Agnia Audy Solihin,9/20/2025,10/4/2025,Lengkap,,,9/27/2025,,10/17/2025,,Tr. Fina,Diterima,,Sudah ukur seragam,Sudah acc finance,Sudah ditandatangani dengan materai,10/20/2025,Surat Penerimaan SD Lazuardi-ananda Ryola Divya Solihin.pdf,10/22/2025,Lunas UP-SPP Juli,,,,,,
44,Sankara Rumimaha Herdanu,Eksternal,,9/20/2025,10/1/2025,Lengkap,,,9/27/2025,,10/9/2025,,Tr. Sari,Diterima,,Sudah ukur seragam,Sudah acc finance,Sudah ditandatangani dengan materai,10/10/2025,Surat Penerimaan SD Lazuardi-ananda Sankara Rumimaha Herdanu.pdf,10/23/2025,Booking Fee,,,,,,
45,Sophie Ailana Setiawan,Eksternal,,9/20/2025,9/22/2025,Lengkap,,,9/27/2025,,10/17/2025,,Tr. Sari,Diterima,,Sudah ukur seragam,Sudah acc finance,Sudah ditandatangani dengan materai,10/20/2025,Surat Penerimaan SD Lazuardi-ananda Sophie Ailana Setiawan.pdf,11/2/2025,Booking Fee,,,,,,
46,Anamishka Tabinda Giadin,Internal,,9/20/2025,11/5/2025,KK dan akte belum ada,,,,,11/20/2025,,Tr. Sari,Diterima,,,Sudah acc finance,Sudah ditandatangani dengan materai,11/24/2025,Surat Penerimaan SD Lazuardi-ananda Anamishka Tabinda Giadin.pdf,12/8/2025,Booking Fee,,,,,,
47,Wistara Raska Aswindra,Internal,Adik Wisankara Elshanum Gasendra,9/20/2025,11/20/2025,Lengkap,,,,,11/20/2025,,Tr. Fina,Diterima,Kakak di kelas 1-5 SD Lazuardi,,Sudah acc finance,,11/24/2025,Surat Penerimaan SD Lazuardi-ananda Wistara Raska Aswindra.pdf,12/8/2025,Booking Fee,,,,,,
48,Arlo Rasyid,Cancel,,9/20/2025,,,,,,,,,,,,,,,,,,,,,,,,
49,Shuna Amani Rasyid,Cancel,,9/20/2025,,,,,,,,,,,,,,,,,,,,,,,,
50,Zaina Aatreya,Cancel,,9/20/2025,,,,,,,,,,,,,,,,,,,,,,,,
51,Saadat Habib Samudra,Eksternal,,9/20/2025,9/26/2025,Lengkap,,,9/27/2025,,10/9/2025,,Tr. Fina,Diterima,,Sudah ukur seragam,Sudah acc finance,Sudah ditandatangani dengan materai,10/10/2025,Surat Penerimaan SD Lazuardi-ananda Saadat Habib Samudra.pdf,10/24/2025,Lunas UP-SPP Juli,,,,,,
52,Aruna Zahira Andamari,Eksternal,,9/20/2025,10/2/2025,Lengkap,,,10/4/2025,,10/23/2025,,Tr. Sari,Diterima,,Sudah ukur seragam,Sudah acc finance,Belum ditandatangani,10/17/2025,Surat Penerimaan SD Lazuardi-ananda Aruna Zahira Andamari.pdf,11/11/2025,Booking Fee,Mempertimbangan keputusan sampai deadline pelunasan karena uang tidak bisa kembali,,,,,
54,Damarayu Putri Maulana,Cancel,,9/20/2025,10/23/2025,Lengkap,,,10/4/2025,Hasil asesmen menunjukkan tier 4,10/23/2025,,Tr. Sari,Cancel karena hasil asesmen,,Sudah ukur seragam,,Sudah ditandatangani tanpa materai,,,,,,,,,,
55,Pradipta Aska Diriga,Cancel,,9/20/2025,9/27/2025,Lengkap,,,9/27/2025,Hasil observasi menunjukkan ananda memerlukan asesmen/evaluasi ahli,10/10/2025,Akan asesmen pada tgl 20 November 2025,Tr. Fina,Cancel karena hasil asesmen,,Sudah ukur seragam,,Belum ditandatangani,,,,,,,,,,
53,Banda Dhyra Rafif,Cancel,,9/20/2025,9/27/2025,Lengkap,,,9/27/2025,Hasil observasi menunjukkan ananda memerlukan asesmen/evaluasi ahli,10/9/2025,Tier 3,Tr. Sari,Menunggu Hasil Observasi Lanjutan,,Sudah ukur seragam,,Sudah ditandatangani tanpa materai,,,,,,,,,,
56,Nara Magani Natabumi,Eksternal,,9/20/2025,10/1/2025,Lengkap,,,10/4/2025,,10/23/2025,,Tr. Sari,Diterima,,Sudah ukur seragam,Sudah acc finance,Sudah ditandatangani dengan materai,10/27/2025,Surat Penerimaan SD Lazuardi-ananda Nara Magani Natabumi.pdf,10/27/2025,Booking Fee,,,,,,
57,Raghdan A. Soemada,Eksternal,,9/20/2025,10/17/2025,KK dan akte belum ada,,,9/27/2025,,10/17/2025,,Tr. Sari,Diterima,,Sudah ukur seragam,Sudah acc finance,Sudah ditandatangani tanpa materai,10/20/2025,Surat Penerimaan SD Lazuardi-ananda Raghdan Abqarizz Soemada.pdf,10/25/2025,Booking Fee,,,,,,
58,Hafshah Akatara Atahiktri ,Cancel,,9/20/2025,9/26/2025,Lengkap,,,9/27/2025,,10/10/2025,,Tr. Fina,Diterima,,Sudah ukur seragam,Sudah acc finance,Sudah ditandatangani tanpa materai,10/10/2025,Surat Penerimaan SD Lazuardi-ananda Hafshah Akatara Atahiktri .pdf,10/24/2025,Booking Fee,,,,,,
59,Annasya Mouneera Ayrasachi,Cancel,,9/20/2025,10/4/2025,Lengkap,,,10/4/2025,Diterima tetapi butuh dukungan untuk beradaptasi,10/23/2025,Akan ikut observasi kedua pada sebelum masuk tahun ajaran baru,Tr. Fina,Diterima,,Sudah ukur seragam,Sudah acc finance,,10/27/2025,Surat Penerimaan SD Lazuardi-ananda Annasya Mouneera Ayrasachi.pdf,,,,,,,,
60,Shireen Almahyra Shanum,Eksternal,,9/20/2025,10/14/2025,Lengkap,,,9/27/2025,,10/17/2025,,Tr. Fina,Diterima,,Sudah ukur seragam,Sudah acc finance,,10/20/2025,Surat Penerimaan SD Lazuardi-ananda Shireen Almahyra Shanum.pdf,10/24/2025,Booking Fee,,,,,,
63,Minara Kamaniya,Cancel,,9/20/2025,10/2/2025,Lengkap,,,10/4/2025,"Sudah asesmen, hasil asesmen tier 2",10/24/2025,,Tr. Sari,cancel proses PSB permintaan ortu,,Sudah ukur seragam,,,,,,,,,,,,
62,Ghaisan Ubaidillah,Cancel,,9/20/2025,10/11/2025,KK dan akte belum ada,,,10/11/2025,"Reschedule interview, orangtua umroh",,,,,,Sudah ukur seragam,,,,,,,,,,,,
61,Razka Bergat Lakeswara,Eksternal,,9/20/2025,9/25/2025,Lengkap,,,9/27/2025,,10/17/2025,,Tr. Fina,Diterima,,Sudah ukur seragam,Sudah acc finance,,10/20/2025,Surat Penerimaan SD Lazuardi-ananda Razka Bergat Lakeswara.pdf,11/1/2025,Booking Fee,,,,,,
64,Yusuf Harits El Zhafran,Cancel,,9/20/2025,9/30/2025,Lengkap,,,10/4/2025,Hasil observasi menunjukkan ananda memerlukan asesmen/evaluasi ahli,10/24/2025,Jadwal asesmen pada tgl 8 Januari 2026,Tr. Sari,Menunggu Hasil Observasi Lanjutan,,Sudah ukur seragam,,,,,,,,,,,,
65,Rakastra Reyn Ramadhan,Eksternal,Adik Rasyadan Reyn Ramadhan,9/20/2025,9/26/2025,Lengkap,,,10/4/2025,,10/24/2025,,Tr. Sari,Diterima,Kakak di kelas 1-5 SD Lazuardi,Sudah ukur seragam,Sudah acc finance,,10/27/2025,Surat Penerimaan SD Lazuardi-ananda Rakastra Reyn Ramadhan.pdf,11/11/2025,Booking Fee,,,,,,
66,Gemma Kaindra Oskar,Pindahan,Pindahan kelas 4,9/22/2025,9/25/2025,Lengkap,,,11/26/2025,,12/4/2025,,Tr. Fina,Diterima,,,Sudah acc finance,,12/8/2025,Surat Penerimaan SD Lazuardi-ananda Gemma Kaindra Oskar.pdf,,,,,,,,
67,Nayzeela Humaira Kusumodityo,Internal,,9/23/2025,,,,,,,11/21/2025,,Tr. Fina,Diterima,Kakak di kelas 1-5 SD Lazuardi,,Sudah acc finance,,11/24/2025,Surat Penerimaan SD Lazuardi-ananda Nayzeela Humaira Kusumodityo.pdf,12/8/2025,Booking Fee,,,,,,
70,Adsakha Ramaditya Laidan,Cancel,,9/24/2025,10/1/2025,KK dan akte belum ada,,,10/4/2025,Hasil observasi menunjukkan ananda memerlukan asesmen/evaluasi ahli,10/30/2025,Perkiraan asesmen pada tgl 15 Januari 2026,Tr. Fina,cancel proses PSB permintaan ortu,,Sudah ukur seragam,,Sudah ditandatangani tanpa materai,,,,,,,,,,
68,Fakhira Agassie Putri,Internal,,9/23/2025,11/17/2025,Belum ada Akte Lahir,,,,,11/21/2025,,Tr. Sari,Diterima,Kakak di kelas 1-5 SD Lazuardi,,Sudah acc finance,,11/24/2025,Surat Penerimaan SD Lazuardi-ananda Fakhira Agassie Putri.pdf,12/8/2025,Booking Fee,,,,,,
69,Savian Abraham Al-Hari,Eksternal,Adik Vishal Erdogan Al-Hari,9/23/2025,10/3/2025,Lengkap,,,10/4/2025,,10/24/2025,,Tr. Fina,Diterima,,Sudah ukur seragam,Sudah acc finance,,10/27/2025,Surat Penerimaan SD Lazuardi-ananda Savian Abraham Al-Hari.pdf,10/28/2025,Booking Fee,,,,,,
95,Rajendra Katondaru Mahardika,Cancel,,11/21/2025,12/1/2025,Lengkap,,,,,,,,,,,,,,,,,,,,,,
71,Muhammad Aqsa Rayyanka Al Kahfi,Eksternal,Adik Arshaq Musa,9/25/2025,10/6/2025,Lengkap,,,10/18/2025,,10/23/2025,,Tr. Fina,Diterima,,Sudah ukur seragam,Sudah acc finance,,10/27/2025,Surat Penerimaan SD Lazuardi-ananda Muhammad Aqsa Rayyanka Al Kahfi.pdf,10/27/2025,Booking Fee,,,,,,
75,Giotama Satya Antoro,Cancel,,10/1/2025,10/17/2025,Lengkap,,,10/25/2025,,11/6/2025,,Tr. Sari,Diterima,,Sudah ukur seragam,Sudah acc finance,,11/10/2025,Surat Penerimaan SD Lazuardi-ananda Giotama Satya Antoro.pdf,,,,,,,,
72,Muhammad Rasya Al Qiyam Ramadhan,Eksternal,Adik Muhammad Al Fatih,9/27/2025,10/16/2025,Lengkap,,,11/15/2025,,11/28/2025,,Tr. Fina,Diterima,Kakak di kelas 1-5 SD Lazuardi,Sudah ukur seragam,Sudah acc finance,,12/1/2025,Surat Penerimaan SD Lazuardi-ananda Muhammad Rasya Al Qiyam Ramadhan.pdf,12/12/2025,Booking Fee,,,,,,
73,Sagrada Ali Satyakusuma,Eksternal,,9/27/2025,10/3/2025,Lengkap,,,10/25/2025,,10/30/2025,,Tr. Sari,Diterima,,Sudah ukur seragam,Sudah acc finance,,11/3/2025,Surat Penerimaan SD Lazuardi-ananda Sagrada Ali Satyakusuma.pdf,11/17/2025,Booking Fee,,,,,,
74,Alira Daima Atarya,Eksternal,Adik Aldio Rananda Atarya,9/30/2025,10/30/2025,Lengkap,,,10/11/2025,,10/30/2025,,Tr. Fina,Diterima,,Sudah ukur seragam,Sudah acc finance,,11/3/2025,Surat Penerimaan SD Lazuardi-ananda Alira Daima Atarya.pdf,11/17/2025,Booking Fee,,,,,,
76,Devandra Alkhalifi Nadi,Pindahan,Pindahan Kelas 2,10/4/2025,1/29/2026,Lengkap,,,1/22/2026,sit in,1/29/2026,,Tr. Sari,Diterima,Kakak di kelas 1-5 SD Lazuardi,Sudah ukur seragam,Sudah acc finance,,2/2/2026,Surat Penerimaan SD Lazuardi-ananda Devandra Alkhalifi Nadi.pdf,2/10/2026,Booking Fee,,,,,,
81,Muhammad Zhafran Arsakha,Cancel,,10/7/2025,10/16/2025,Lengkap,,,10/25/2025,,11/3/2025,,Tr. Sari,Diterima,,Sudah ukur seragam,Sudah acc finance,,11/10/2025,Surat Penerimaan SD Lazuardi-ananda Muhammad Zhafran Arsakha.pdf,,,,,,,,
77,Shaquille Atharrazka Maliq,Eksternal,Adik Devandra Alkhalifi Nadi,10/4/2025,10/13/2025,Lengkap,,,10/11/2025,,10/24/2025,,Tr. Fina,Diterima,Kakak di kelas 1-5 SD Lazuardi,Sudah ukur seragam,Sudah acc finance,,10/27/2025,Surat Penerimaan SD Lazuardi-ananda Shaquille Atharrazka Maliq.pdf,11/4/2025,Booking Fee,,,,,,
78,Anissa Anarawati Drajat,Eksternal,,10/4/2025,10/6/2025,Lengkap,,,10/18/2025,,10/30/2025,,Tr. Sari,Diterima,,Sudah ukur seragam,Sudah acc finance,,11/3/2025,Surat Penerimaan SD Lazuardi-ananda Anissa Anarawati Drajat.pdf,11/3/2025,Booking Fee,,,,,,
79,Rayyan Nata Arshanu Haidi,Cancel,,10/7/2025,10/17/2025,Lengkap,,,10/18/2025,,11/3/2025,,Tr. Fina,Diterima,,Sudah ukur seragam,Sudah acc finance,,11/10/2025,Surat Penerimaan SD Lazuardi-ananda Rayyan Nata Arshanu Haidi.pdf,,Permohonan Perpanjangan Waktu,Adanya perpanjangan deadline booking fee karena orangtua bimbang apakah lanjut SD atau mengulang TK,,,,,
80,Syarifah Diara,Eksternal,,10/6/2025,10/8/2025,Lengkap,,,10/11/2025,,10/30/2025,,Tr. Fina,Diterima,,Sudah ukur seragam,Sudah acc finance,,11/3/2025,Surat Penerimaan SD Lazuardi-ananda Syarifah Diara.pdf,11/7/2025,Booking Fee,,,,,,
83,Callathea Shreya Risandy,Cancel,,10/9/2025,10/16/2025,Lengkap,,,11/8/2025,,,,,,,,,,,,,,,,,,,
82,Ranum Kalifa Almeera,Karyawan,Anak Karyawan Deisy Nursifa,10/9/2025,11/20/2025,Lengkap,,,,,11/20/2025,,Tr. Fina,Diterima,,,Sudah acc finance,,11/24/2025,Surat Penerimaan-ananda Ranum Kalifa Almeera.pdf,12/2/2025,Booking Fee,,,,,,
90,Moehammad Dylan Matteo Padang,Cancel,,10/30/2025,10/31/2025,Lengkap,,,11/15/2025,Hasil observasi menunjukkan ananda memerlukan asesmen/evaluasi ahli,11/28/2025,,Tr. Fina,cancel proses PSB permintaan ortu,,Sudah ukur seragam,,,,,,,,,,,,
84,Ralina Aura Malika,Internal,Adik Rafif Alfatih,10/14/2025,10/24/2025,Lengkap,,,,,12/4/2025,,Tr. Sari,Diterima,Kakak di kelas 1-5 SD Lazuardi,,Sudah acc finance,,12/8/2025,Surat Penerimaan SD Lazuardi-ananda Ralina Aura Malika.pdf,12/22/2025,Booking Fee,,,,,,
87,Raka Radeya Mahardika,Cancel,,10/16/2025,10/20/2025,Lengkap,,,10/18/2025,Hasil observasi menunjukkan ananda memerlukan asesmen/evaluasi ahli,10/31/2025,Ortu memutuskan utk ulang TK B dibarengi dengan terapi di Pelangi. Sdh daftar di Pelangi dan akan asesmen di November. Akan daftar lagi di SD tahun 2027/2028,Tr. Fina,cancel proses PSB permintaan ortu,,Sudah ukur seragam,,,,,,,,,,,,
85,Ayyash Radeya Mauzakani,Eksternal,,10/15/2025,10/22/2025,Lengkap,,,10/18/2025,,10/30/2025,,Tr. Sari,Diterima,,Sudah ukur seragam,Sudah acc finance,,11/3/2025,Surat Penerimaan SD Lazuardi-ananda Ayyash Radeya Mauzakani.pdf,11/8/2025,Booking Fee,,,,,,
86,Alisya lubna sahira,Eksternal,,10/16/2025,10/22/2025,Lengkap,,,10/25/2025,,11/6/2025,,Tr. Fina,Diterima,,Sudah ukur seragam,Sudah acc finance,,11/10/2025,Surat Penerimaan SD Lazuardi-ananda Alisya Lubna Sahira.pdf,11/17/2025,Lunas UP-SPP Juli,,,,,,
88,Unna Mikayla,Beasiswa Full,Beasiswa,11/19/2025,11/20/2025,Lengkap,,,,,12/11/2025,,Tr. Fina,Diterima,,,Sudah acc finance,,12/15/2025,Surat Penerimaan SD Lazuardi-ananda Unna Mikayla.pdf,12/16/2025,Lunas UP-SPP Juli,,,,,,
91,Shazia Kiana Nalani,Cancel,,11/1/2025,11/11/2025,Lengkap,,,,,,,,,,,,,,,,,,,,,,
89,Dariya Haura Insiya,Eksternal,Adik Darish Kazhim Elazzan,10/20/2025,10/25/2025,KK dan akte belum ada, ,,10/25/2025,,11/7/2025,,Tr. Sari,Diterima,Kakak di kelas 7-8 SMP Lazuardi,Sudah ukur seragam,Sudah acc finance,,11/10/2025,Surat Penerimaan SD Lazuardi-ananda Dariya Haura Insiya.pdf,1/8/2026,Lunas UP-SPP Juli,,,,,,
97,Leia Candisa Ritamadini,Cancel,,11/22/2025,11/26/2025,Lengkap,,,1/10/2026,,,,,,,,,,,,,,,,,,,
92,Adena Fayza Imtiyaz,Cancel,,11/4/2025,11/13/2025,Lengkap,,,11/15/2025,,,,,,,Sudah ukur seragam,,,,,,,,,,,,
93,Ahmad Husein,Eksternal,,11/5/2025,11/13/2025,Belum ada Akte Lahir,,,11/29/2025,,12/4/2025,,Tr. Sari,Diterima,,Sudah ukur seragam,Sudah acc finance,,12/8/2025,Surat Penerimaan SD Lazuardi-ananda Ahmad Husein.pdf,12/11/2025,Booking Fee,,,,,,
94,Fahima Ilmi Gayatri,Cancel,Adik Hamzah Alfarizi Wicaksana,11/14/2025,12/1/2025,KK dan akte belum ada,,,,,12/12/2025,,Tr. Fina,Diterima,Kakak di kelas 1-5 SD Lazuardi,Sudah ukur seragam,Sudah acc finance,,12/15/2025,Surat Penerimaan SD Lazuardi-ananda Fahima Ilmi Gayatri.pdf,,,,,,,,
96,Logika Deviatama,Cancel,,11/22/2025,11/24/2025,Lengkap,,,11/29/2025,,12/4/2025,,Tr. Fina,Diterima,,Sudah ukur seragam,Sudah acc finance,,12/8/2025,Surat Penerimaan SD Lazuardi-ananda Logika Deviatama.pdf,,,,,,,,
98,Kaivan Rayhaan Athaya,Eksternal,Adik Kalandra Rasyaad Abqary,11/25/2025,12/18/2025,Lengkap,,,1/19/2026,,1/29/2026,,Tr. Sari,Diterima,Kakak di kelas 1-5 SD Lazuardi,Sudah ukur seragam,Sudah acc finance,,2/2/2026,Surat Penerimaan SD Lazuardi-ananda Kaivan Rayhaan Athaya.pdf,,,,,,,,
99,Kalulla Almahyra Ghassani,Eksternal,Adik Kanindra Al Faheem Bhamakerti,11/26/2025,11/29/2025,Lengkap,,,11/29/2025,,12/11/2025,,Tr. Sari,Diterima,,Sudah ukur seragam,Sudah acc finance,,12/15/2025,Surat Penerimaan SD Lazuardi-ananda Kalulla Almahyra Ghassani.pdf,12/29/2025,Booking Fee,,,,,,
100,Kalandra Arfiendy Taufiq,Cancel,,11/28/2025,11/29/2025,Lengkap,,,11/29/2025,Hasil observasi menunjukkan ananda memerlukan asesmen/evaluasi ahli,12/4/2025,Waiting list SN,Tr. Sari,cancel proses PSB permintaan ortu,,Sudah ukur seragam,,,,,,,,,,,,
101,Haider Eshan Atotia,Eksternal,,11/28/2025,12/3/2025,Lengkap,,,12/6/2025,,12/11/2025,,Tr. Sari,Diterima,,Sudah ukur seragam,Sudah acc finance,,12/15/2025,Surat Penerimaan SD Lazuardi-ananda Haider Eshan Atotia.pdf,12/22/2025,Booking Fee,,,,,,
102,Arsya Fadhilah Khair,Eksternal,,11/28/2025,12/20/2025,Lengkap,,,12/20/2025,Hasil observasi menunjukkan ananda memerlukan asesmen/evaluasi ahli,1/8/2026,Jadwal asesmen di tgl 22 Januari,Tr. Sari,Menunggu Hasil Observasi Lanjutan,,Sudah ukur seragam,,,,,,,,,,,,
103,Aisha Zaleena Azzahra,Eksternal,,12/13/2025,12/20/2025,Lengkap,,,12/20/2025,,1/8/2026,,Tr. Sari,Diterima,,Sudah ukur seragam,Sudah acc finance,,1/12/2026,Surat Penerimaan SD Lazuardi-ananda Aisha Zaleena Azzahra.pdf,,Permohonan Perpanjangan Waktu,perpanjangan hingga 17 februari,,,,,
104,Raziq Al Baihaqi,Beasiswa Full,,11/19/2025,1/6/2026,Lengkap,,,,,1/9/2026,,Tr. Fina,Diterima,,,Sudah acc finance,,1/12/2026,Surat Penerimaan SD Lazuardi-ananda Raziq Al Baihaqi.pdf,,Lunas UP-SPP Juli,,,,,,
105,Almaira Shadiya,Internal,Adik Anindya Shadira,1/5/2026,1/9/2026,Lengkap,,,,,2/12/2026,,Tr. Sari,Diterima,Kakak di kelas 1-5 SD Lazuardi,,,,,,,,,,,,,
106,Keenan Rafisqy Faldi,Eksternal,,1/14/2026,1/24/2026,Lengkap,,,1/24/2026,,1/29/2026,,Tr. Fina,Diterima,,Sudah ukur seragam,Sudah acc finance,,2/2/2026,Surat Penerimaan SD Lazuardi-ananda Keenan Rafisqy Faldi.pdf,,,,,,,,
107,Akira Keanu Adtara,Eksternal,,1/21/2026,1/30/2026,Lengkap,,,1/24/2026,Hasil observasi menunjukkan ananda memerlukan asesmen/evaluasi ahli,1/29/2026,,Tr. Sari,Menunggu Hasil Observasi Lanjutan,,,,,,,,,,,,,,
108,Cahaya Jingga,Pindahan,Pindahan kelas 3,9/10/2025,9/11/2025,Lengkap,,,2/5/2026,,,,,,,,,,,,,,,,,,,
109,,None,,,,,,,,,,,,,,,,,,,,,,,,,,
110,,None,,,,,,,,,,,,,,,,,,,,,,,,,,
111,,None,,,,,,,,,,,,,,,,,,,,,,,,,,
112,,None,,,,,,,,,,,,,,,,,,,,,,,,,,
113,,None,,,,,,,,,,,,,,,,,,,,,,,,,,
114,,None,,,,,,,,,,,,,,,,,,,,,,,,,,
115,,None,,,,,,,,,,,,,,,,,,,,,,,,,,
`;

export const parseCSV = (csv: string): Student[] => {
    const lines = csv.trim().split('\n');
    const students: Student[] = [];
    
    // Find header
    const dataStartIndex = lines.findIndex(line => line.toLowerCase().includes('no,nama siswa'));
    if (dataStartIndex === -1) return [];

    const dataLines = lines.slice(dataStartIndex + 2);

    for (const line of dataLines) {
        const columns = line.split(',').map(c => c.trim().replace(/"/g, ''));
        
        if (columns.length < 2 || !columns[0] || isNaN(parseInt(columns[0]))) continue;

        const id = parseInt(columns[0]);
        const name = columns[1];
        if (!name || name.toLowerCase() === 'none') continue;
        
        const typeStr = columns[2] || '';
        const keterngan = columns[3] || '';
        
        let applicationStatus = ApplicationStatus.ACTIVE;
        if (typeStr.toLowerCase().includes('cancel') || keterngan.toLowerCase().includes('cancel')) {
            applicationStatus = ApplicationStatus.CANCELLED;
        }

        let studentType: StudentType = StudentType.EXTERNAL; 
        let studentCategory: StudentCategory = StudentCategory.REGULER;

        if (typeStr.toLowerCase().includes('internal sn')) {
            studentType = StudentType.INTERNAL;
            studentCategory = StudentCategory.ABK;
        } else if (typeStr.toLowerCase().includes('eksternal sn')) {
            studentType = StudentType.EXTERNAL;
            studentCategory = StudentCategory.ABK;
        } else if (typeStr.toLowerCase().includes('internal')) {
            studentType = StudentType.INTERNAL;
        } else if (typeStr.toLowerCase().includes('eksternal')) {
            studentType = StudentType.EXTERNAL;
        } else if (typeStr.toLowerCase().includes('pindahan')) {
            studentType = StudentType.TRANSFER;
        } else if (typeStr.toLowerCase().includes('karyawan')) {
            studentType = StudentType.KARYAWAN;
        } else if (typeStr.toLowerCase().includes('beasiswa')) {
            studentType = StudentType.INTERNAL;
        }
        
        const transferGradeMatch = keterngan.match(/kelas (\d+)/i);
        
        const student: Student = {
            id,
            name,
            applicationStatus,
            studentType,
            studentCategory,
            transferGrade: studentType === StudentType.TRANSFER ? (transferGradeMatch ? `Kelas ${transferGradeMatch[1]}` : 'Pindahan') : null,
            formPurchaseDate: columns[4] || null,
            formReturnDate: columns[5] || null,
            docsComplete: (columns[6] || '').toLowerCase() === 'lengkap',
            observationDate: columns[9] || null,
            sitInDate: null, 
            interviewDate: columns[11] || null,
            uniformStatus: (columns[16] || '').toLowerCase().includes('sudah') ? UniformStatus.DONE : UniformStatus.PENDING,
            assessmentNote: ((columns[10] || '') + (columns[12] || '') + (columns[14] || '')).toLowerCase().includes('asesmen') ? AssessmentStatus.REQUIRED : AssessmentStatus.NOT_REQUIRED,
            feeStatus: (columns[17] || '').toLowerCase().includes('acc') ? FeeStatus.APPROVED : FeeStatus.PENDING,
            acceptanceLetterDate: columns[19] || null,
            paymentDate: columns[21] || null,
            paymentStatus: PaymentStatus.PENDING,
            notes: columns[10] || columns[12] || '',
        };
        
        const paymentStr = (columns[22] || '').toLowerCase();
        if (paymentStr.includes('lunas')) {
            student.paymentStatus = PaymentStatus.FULL;
        } else if (paymentStr.includes('booking fee')) {
            student.paymentStatus = PaymentStatus.BOOKING_FEE;
        }

        if(student.studentType === StudentType.TRANSFER) {
            student.sitInDate = student.observationDate;
            student.observationDate = null;
        }

        students.push(student);
    }
    
    return students;
};

export const MOCK_STUDENTS: Student[] = parseCSV(CSV_DATA);
