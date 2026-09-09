export interface ComparisonItem {
  type: 'paragraph' | 'separator' | 'footnote' | 'list' | 'multilevel' | 'subheading';
  text?: string;
  items?: string[];
  notes?: string[];
}

interface ComparisonDocument {
  title: string;
  subheading: string;
  headingStyle?: 'chapter' | 'section';
  pageHeader?: string;
  pageFooter?: string;
  metadata?: string;
  bodyContent: ComparisonItem[];
  evaluations: string[];
}

export interface ComparisonCategory {
  id: 'footnote' | 'subbab' | 'halaman' | 'margin';
  label: string;
  description: string;
  filename: string;
  before: ComparisonDocument;
  after: ComparisonDocument;
}

const paragraphs = (texts: string[]): ComparisonItem[] =>
  texts.map((text) => ({ type: 'paragraph', text }));

// Illustrative excerpts, shared across each pair so only the presentation changes.
const footnoteParagraphs = [
  'Kepastian hukum menjadi salah satu pokok pembahasan dalam penelitian mengenai pelaksanaan putusan pengadilan. Konsep ini digunakan untuk membaca hubungan antara rumusan norma, pertimbangan hakim, dan pelaksanaan putusan oleh para pihak. Kajian mengenai pengertian serta tujuan hukum menjadi titik awal untuk menyusun kerangka analisis tersebut.[SUP1]',
  'Dalam penelitian ini, pembahasan diarahkan pada pertimbangan yuridis yang tercantum dalam putusan dan keterkaitannya dengan peraturan yang digunakan oleh hakim. Setiap pertimbangan dibaca dalam konteks perkara agar analisis tidak hanya bertumpu pada kesimpulan akhir, tetapi juga memperhatikan alasan yang melandasi pengambilan keputusan. Kerangka tersebut membantu penulis menguraikan persoalan secara runtut.[SUP2]',
  'Penelaahan selanjutnya dilakukan dengan membandingkan bahan hukum primer dan bahan hukum sekunder yang relevan. Hasil pembacaan dikelompokkan berdasarkan isu yang telah dirumuskan, kemudian diuraikan untuk menjelaskan hubungan antara norma dan penerapannya. Dengan cara ini, pembahasan diharapkan dapat memberikan gambaran yang jelas mengenai persoalan hukum yang menjadi fokus penelitian.',
];

const prefaceParagraphs = [
  'Puji syukur penulis panjatkan ke hadirat Tuhan Yang Maha Esa atas rahmat dan karunia-Nya sehingga skripsi ini dapat diselesaikan. Skripsi ini disusun sebagai salah satu syarat untuk memperoleh gelar sarjana pada program studi yang penulis tempuh. Proses penyusunannya memberikan kesempatan bagi penulis untuk memahami persoalan penelitian secara lebih mendalam dan menghubungkannya dengan pengetahuan yang diperoleh selama masa perkuliahan.',
  'Penyusunan skripsi ini tidak terlepas dari dukungan berbagai pihak. Penulis menyampaikan terima kasih kepada dosen pembimbing atas waktu, arahan, dan masukan yang diberikan sejak penyusunan proposal hingga penyelesaian naskah. Ucapan terima kasih juga penulis sampaikan kepada keluarga, rekan seperjuangan, serta seluruh pihak yang telah membantu pengumpulan bahan penelitian. Dukungan tersebut menjadi bagian yang berarti dalam setiap tahap penyusunan karya ini.',
  'Penulis menyadari bahwa skripsi ini masih memiliki keterbatasan, baik dalam pembahasan maupun penyajiannya. Oleh karena itu, penulis menerima kritik dan saran yang membangun sebagai bahan perbaikan pada masa mendatang. Semoga skripsi ini dapat memberikan manfaat bagi pembaca serta menjadi salah satu bahan pertimbangan untuk penelitian selanjutnya. Penulis berharap pengalaman selama proses penyusunan ini turut menjadi bekal untuk terus belajar dan mengembangkan kemampuan dalam bidang yang ditekuni.',
];

const methodologyParagraphs = [
  'Penelitian ini menggunakan pendekatan yuridis normatif dengan menelaah bahan hukum yang berkaitan dengan pelaksanaan putusan pengadilan. Pendekatan tersebut dipilih untuk memahami hubungan antara ketentuan peraturan perundang-undangan dan pertimbangan hukum dalam putusan yang dikaji. Ruang lingkup penelitian dibatasi pada isu yang telah dirumuskan agar pembahasan tetap terarah dan sesuai dengan tujuan penelitian yang ditetapkan sejak awal.',
  'Bahan hukum primer yang digunakan meliputi peraturan perundang-undangan serta putusan pengadilan yang relevan dengan objek penelitian. Bahan hukum sekunder diperoleh dari buku, artikel jurnal, dan hasil penelitian terdahulu yang membahas persoalan serupa. Pemilihan bahan dilakukan dengan mempertimbangkan keterkaitan isi, kejelasan sumber, serta kesesuaiannya dengan batasan penelitian. Seluruh bahan kemudian dicatat dan dikelompokkan untuk memudahkan proses penelaahan pada tahap berikutnya.',
  'Pengumpulan bahan hukum dilakukan melalui studi kepustakaan dengan menelusuri sumber yang tersedia di perpustakaan dan basis data ilmiah. Bahan yang telah terkumpul dianalisis secara kualitatif melalui pembacaan, pengelompokan isu, dan penafsiran terhadap ketentuan yang relevan. Hasil analisis disajikan secara deskriptif untuk menjelaskan hubungan antarbahan hukum serta menjawab rumusan masalah.',
];

const backgroundParagraph = 'Pelaksanaan putusan pengadilan merupakan bagian penting dalam penyelesaian sengketa. Penelitian ini menelaah pertimbangan yuridis dalam putusan serta persoalan yang muncul pada tahap pelaksanaannya. Pembahasan dibatasi pada hubungan antara ketentuan yang berlaku dan penerapannya dalam perkara yang dikaji.';
const researchQuestions = [
  'Bagaimana penerapan asas kepastian hukum dalam pertimbangan hakim?',
  'Apa saja hambatan dalam pelaksanaan putusan pengadilan?',
];
const researchObjective = 'Penelitian ini bertujuan untuk menganalisis penerapan asas kepastian hukum dalam pertimbangan hakim dan mengidentifikasi hambatan pelaksanaan putusan. Hasilnya diharapkan dapat menjadi bahan pembahasan bagi penelitian hukum berikutnya.';

export const comparisonCategories: ComparisonCategory[] = [
  {
    id: 'footnote',
    label: 'Footnote & sitasi',
    description: 'Rujukan lebih tertata, tanpa mengubah isi pembahasan.',
    filename: 'BAB II — Tinjauan Pustaka.docx',
    before: {
      title: 'Sebelum dirapikan',
      subheading: 'A. Tinjauan Asas Kepastian Hukum',
      headingStyle: 'section',
      pageHeader: '14',
      metadata: 'Nomor diketik manual · Rujukan belum seragam',
      bodyContent: [
        ...paragraphs(footnoteParagraphs.map((text) => text.replace(/\[SUP(\d+)\]/g, ' ($1)'))),
        {
          type: 'footnote',
          notes: [
            '(1) Peter Mahmud Marzuki, Pengantar Ilmu Hukum, Kencana, Jakarta, 2018, hal 45.',
            '(2) ibid. hal 50.',
          ],
        },
      ],
      evaluations: ['Penanda rujukan masih berupa angka dalam kurung.', 'Judul buku dan penulisan rujukan belum konsisten.'],
    },
    after: {
      title: 'Sesudah dirapikan',
      subheading: 'A. Tinjauan Asas Kepastian Hukum',
      headingStyle: 'section',
      pageHeader: '14',
      metadata: 'Nomor superskrip · Format rujukan konsisten',
      bodyContent: [
        ...paragraphs(footnoteParagraphs),
        {
          type: 'footnote',
          notes: [
            '[SUP1] Peter Mahmud Marzuki, *Pengantar Ilmu Hukum* (Jakarta: Kencana, 2018), hlm. 45.',
            '[SUP2] *Ibid.*, hlm. 50.',
          ],
        },
      ],
      evaluations: ['Penanda superskrip lebih ringan di dalam teks.', 'Catatan kaki tersusun rapi di bagian bawah halaman.'],
    },
  },
  {
    id: 'subbab',
    label: 'Bab & subbab',
    description: 'Urutan pembahasan terbaca jelas dari bab hingga rincian.',
    filename: 'BAB I — Pendahuluan.docx',
    before: {
      title: 'Sebelum dirapikan',
      subheading: 'BAB I\nPENDAHULUAN',
      headingStyle: 'chapter',
      pageFooter: '1',
      metadata: 'Penomoran bercampur · Inden belum konsisten',
      bodyContent: [
        { type: 'subheading', text: '1.1. Latar Belakang Masalah' },
        { type: 'paragraph', text: backgroundParagraph },
        { type: 'subheading', text: 'B. Rumusan Masalah' },
        { type: 'paragraph', text: 'Berdasarkan uraian tersebut, penelitian ini mengajukan dua pertanyaan berikut.' },
        { type: 'list', items: ['1. ' + researchQuestions[0], 'b) ' + researchQuestions[1]] },
        { type: 'subheading', text: '1.3 Tujuan Penelitian' },
        { type: 'paragraph', text: researchObjective },
      ],
      evaluations: ['Pola angka dan huruf bercampur pada tingkat yang sama.', 'Jarak judul dan rincian belum seragam.'],
    },
    after: {
      title: 'Sesudah dirapikan',
      subheading: 'BAB I\nPENDAHULUAN',
      headingStyle: 'chapter',
      pageFooter: '1',
      metadata: 'Hierarki A, B, C · Rincian bernomor konsisten',
      bodyContent: [
        { type: 'subheading', text: 'A. Latar Belakang Masalah' },
        { type: 'paragraph', text: backgroundParagraph },
        { type: 'subheading', text: 'B. Rumusan Masalah' },
        { type: 'paragraph', text: 'Berdasarkan uraian tersebut, penelitian ini mengajukan dua pertanyaan berikut.' },
        { type: 'multilevel', items: ['1. ' + researchQuestions[0], '2. ' + researchQuestions[1]] },
        { type: 'subheading', text: 'C. Tujuan Penelitian' },
        { type: 'paragraph', text: researchObjective },
      ],
      evaluations: ['Setiap tingkat judul menggunakan pola yang konsisten.', 'Inden rincian dan jarak antarbagian lebih teratur.'],
    },
  },
  {
    id: 'halaman',
    label: 'Nomor halaman',
    description: 'Halaman yang sama, dengan letak dan angka yang sesuai bagiannya.',
    filename: 'Bagian Awal — Kata Pengantar.docx',
    before: {
      title: 'Sebelum dirapikan',
      subheading: 'KATA PENGANTAR',
      headingStyle: 'chapter',
      pageHeader: '1',
      metadata: 'Angka Arab · Posisi kanan atas',
      bodyContent: paragraphs(prefaceParagraphs),
      evaluations: ['Bagian awal masih menggunakan angka Arab.', 'Posisi nomor belum disesuaikan dengan bagian naskah.'],
    },
    after: {
      title: 'Sesudah dirapikan',
      subheading: 'KATA PENGANTAR',
      headingStyle: 'chapter',
      pageFooter: 'iv',
      metadata: 'Angka Romawi · Posisi tengah bawah',
      bodyContent: paragraphs(prefaceParagraphs),
      evaluations: ['Angka Romawi membedakan bagian awal pada contoh ini.', 'Nomor halaman tertata di tengah margin bawah.'],
    },
  },
  {
    id: 'margin',
    label: 'Margin & paragraf',
    description: 'Ruang halaman lebih seimbang, alinea lebih nyaman dibaca.',
    filename: 'BAB III — Metode Penelitian.docx',
    before: {
      title: 'Sebelum dirapikan',
      subheading: 'A. Jenis dan Pendekatan Penelitian',
      headingStyle: 'section',
      pageHeader: '24',
      metadata: 'Margin 2,54 cm · Rata kiri',
      bodyContent: paragraphs(methodologyParagraphs),
      evaluations: ['Ruang tepi masih menggunakan pengaturan awal.', 'Awal alinea dan jarak paragraf belum tertata.'],
    },
    after: {
      title: 'Sesudah dirapikan',
      subheading: 'A. Jenis dan Pendekatan Penelitian',
      headingStyle: 'section',
      pageHeader: '24',
      metadata: 'Kiri/atas 4 cm · Kanan/bawah 3 cm · Spasi 1,5',
      bodyContent: paragraphs(methodologyParagraphs),
      evaluations: ['Margin pada contoh ini memberi ruang lebih untuk jilid.', 'Rata kanan-kiri dengan inden alinea yang konsisten.'],
    },
  },
];

