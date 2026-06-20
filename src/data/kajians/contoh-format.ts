import { Kajian } from "../types";

export const contohFormat: Kajian = {
  id: "contoh-format",
  type: "series", // "series" jika ada beberapa pertemuan, "single" jika hanya 1 pertemuan tanpa list pertemuan
  title: "Judul Kajian (Contoh)",
  pemateri: "Nama Ustadz / Syaikh",
  cover_tag: "Label di Cover",
  tags: ["tag1", "tag2"],
  color: {
    primary: "#3D2030", // Warna utama (header, border)
    soft: "#FDF0EE", // Warna background (putih/krem/pink pucat)
    accent: "#C4788A", // Warna aksen (ikon, tombol, hover)
  },
  // Gunakan 'pertemuan' jika type adalah 'series'
  pertemuan: [
    {
      id: 1,
      title: "Judul Pertemuan 1",
      date: "2026-06-20",
      slides: [
        {
          tag: "Intro",
          title: "Judul Slide Pertama",
          content: "Isi konten dari slide bisa menggunakan format **Markdown**.\n\n- Poin 1\n- Poin 2",
        },
        {
          tag: "Materi",
          title: "Judul Slide Kedua",
          content: "Isi slide kedua...",
        },
      ],
    },
  ],
  // Gunakan attributes di bawah jika type adalah 'single' (hapus 'pertemuan')
  // date: "2026-06-20",
  // slides: [
  //   {
  //     tag: "Materi",
  //     title: "Judul Slide",
  //     content: "Isi konten...",
  //   }
  // ]
};
