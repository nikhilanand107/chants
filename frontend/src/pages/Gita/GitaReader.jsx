import React, { useState, useEffect } from 'react';
import { BookOpen, Download, Search, Loader2, ChevronRight, ChevronLeft, ArrowLeft, X, Library, Sparkles } from 'lucide-react';
import API from '../../services/api';

const CHAPTERS_DATA = [
  {
    chapter_number: 1,
    verses_count: 47,
    name: "अर्जुनविषादयोग",
    translation: "Arjuna Visada Yoga",
    transliteration: "Arjun Viṣhād Yog",
    meaning: "Arjuna's Dilemma",
    summary: "The first chapter introduces the setup, setting, characters, and circumstances of the epic battle of Mahabharata at Kurukshetra. As both armies stand ready, Arjuna is overwhelmed by grief and despair at the prospect of fighting his relatives and teachers, and surrenders to Lord Krishna seeking guidance."
  },
  {
    chapter_number: 2,
    verses_count: 72,
    name: "सांख्ययोग",
    translation: "Sankhya Yoga",
    transliteration: "Sānkhya Yog",
    meaning: "Transcendental Knowledge",
    summary: "Lord Krishna begins His teachings by explaining the immortality of the soul and the temporary nature of the material body. He introduces the concepts of Nishkama Karma (selfless duty without attachment) and the qualities of a self-realized soul (Sthitaprajna)."
  },
  {
    chapter_number: 3,
    verses_count: 43,
    name: "कर्मयोग",
    translation: "Karma Yoga",
    transliteration: "Karma Yog",
    meaning: "Path of Selfless Action",
    summary: "Krishna establishes that action is essential and superior to inaction. He explains how performing one's prescribed duties as a selfless offering (yajna) to the Supreme purifies the mind and leads to spiritual liberation without accumulation of karmic reaction."
  },
  {
    chapter_number: 4,
    verses_count: 42,
    name: "ज्ञानकर्मसंन्यासयोग",
    translation: "Jnana Karma Sanyasa Yoga",
    transliteration: "Jñāna Karma Sannyāsa Yog",
    meaning: "Path of Knowledge & Discipline of Action",
    summary: "Krishna reveals the eternal history of yoga and explains His divine nature and incarnations. He clarifies how spiritual knowledge burns all karmic reactions to ashes, enabling a seeker to act in the world while remaining internally renounced."
  },
  {
    chapter_number: 5,
    verses_count: 29,
    name: "कर्मसंन्यासयोग",
    translation: "Karma Sanyasa Yoga",
    transliteration: "Karma Sannyāsa Yog",
    meaning: "Yoga of Renunciation",
    summary: "Arjuna asks whether renunciation of action or selfless action is better. Krishna explains that both lead to the same goal, but selfless service in devotion (Karma Yoga) is easier and quicker. A wise person sees all beings with an equal eye."
  },
  {
    chapter_number: 6,
    verses_count: 47,
    name: "आत्मसंयमयोग",
    translation: "Dhyana Yoga / Atmasanyam Yoga",
    transliteration: "Dhyāna Yog",
    meaning: "Yoga of Meditation",
    summary: "This chapter deals with controlling the mind and senses through meditation and self-discipline. Krishna explains the practice of Ashtanga Yoga, the importance of moderation, and assures Arjuna that a sincere seeker is never lost, even if they fail in one lifetime."
  },
  {
    chapter_number: 7,
    verses_count: 30,
    name: "ज्ञानविज्ञानयोग",
    translation: "Jnana Vijnana Yoga",
    transliteration: "Jñāna Vijñāna Yog",
    meaning: "Yoga of Wisdom & Realization",
    summary: "Krishna explains His material and spiritual energies, and how He is the source of everything. He describes the four types of people who surrender to Him and the four who do not, emphasizing that true wisdom leads to absolute surrender to the Divine."
  },
  {
    chapter_number: 8,
    verses_count: 28,
    name: "अक्षरब्रह्मयोग",
    translation: "Akshara Brahma Yoga",
    transliteration: "Akṣhara Brahma Yog",
    meaning: "Yoga of Imperishable Brahman",
    summary: "Krishna explains the destiny of the soul and the significance of remembering the Supreme Divine Personality at the time of death. He details the paths of light and darkness, showing how devotion leads straight to His eternal, unmanifest spiritual abode."
  },
  {
    chapter_number: 9,
    verses_count: 34,
    name: "राजविद्याराजगुह्ययोग",
    translation: "Raja Vidya Raja Guhya Yoga",
    transliteration: "Rāja Vidyā Rāja Guhya Yog",
    meaning: "Yoga of Sovereign Science & Secret",
    summary: "Krishna reveals the most confidential knowledge of His absolute relationship with the universe. He details the path of pure devotion (Bhakti), explaining how even the simplest offering made with love is accepted by Him and how devotion protects all seekers."
  },
  {
    chapter_number: 10,
    verses_count: 42,
    name: "विभूतियोग",
    translation: "Vibhuti Vistara Yoga",
    transliteration: "Vibhūti Yog",
    meaning: "Yoga of Divine Manifestations",
    summary: "To increase Arjuna's devotion, Krishna describes His opulences and manifestations in the world. He declares that all glorious, beautiful, and mighty creations are but a spark of His infinite splendor."
  },
  {
    chapter_number: 11,
    verses_count: 55,
    name: "विश्वरूपदर्शनयोग",
    translation: "Vishwarupa Darshana Yoga",
    transliteration: "Viśhvarūpa Darśhana Yog",
    meaning: "Yoga of Vision of Cosmic Form",
    summary: "At Arjuna's request, Krishna reveals His awe-inspiring and terrifying Cosmic Form (Vishwarupa), containing the entire universe. Arjuna bows in worship and requests Krishna to return to His gentle, four-armed and then two-armed human-like form."
  },
  {
    chapter_number: 12,
    verses_count: 20,
    name: "भक्तियोग",
    translation: "Bhakti Yoga",
    transliteration: "Bhakti Yog",
    meaning: "Yoga of Devotion",
    summary: "Krishna declares loving devotional service to the personal form of God as the highest and most practical spiritual path. He lists the qualities of devotees who are exceedingly dear to Him, such as tolerance, contentment, and compassion."
  },
  {
    chapter_number: 13,
    verses_count: 34,
    name: "क्षेत्रक्षेत्रज्ञविभागयोग",
    translation: "Kshetra Kshetragya Vibhaga Yoga",
    transliteration: "Kṣhetra Kṣhetrajña Vibhāga Yog",
    meaning: "Yoga of Field & Knower of Field",
    summary: "This chapter explains the distinction between the physical body (the field), the individual soul (the knower of the field), and the Supersoul (Paramatma). It details how understanding this difference frees one from material nature."
  },
  {
    chapter_number: 14,
    verses_count: 27,
    name: "गुणत्रयविभागयोग",
    translation: "Gunatraya Vibhaga Yoga",
    transliteration: "Guṇatraya Vibhāga Yog",
    meaning: "Yoga of Three Modes of Material Nature",
    summary: "Krishna explains the three modes (gunas) of material nature: Sattva (goodness), Rajas (passion), and Tamas (ignorance). He details how they influence human behavior, binding the soul, and how to transcend them to attain liberation."
  },
  {
    chapter_number: 15,
    verses_count: 20,
    name: "पुरुषोत्तमयोग",
    translation: "Purushottama Yoga",
    transliteration: "Puruṣhottama Yog",
    meaning: "Yoga of the Supreme Divine Personality",
    summary: "Using the metaphor of an upside-down Banyan tree, Krishna describes the material world and how to cut it down with the weapon of detachment. He describes the nature of the Supreme Divine Personality who sustains all existence."
  },
  {
    chapter_number: 16,
    verses_count: 24,
    name: "दैवासुरसम्पद्विभागयोग",
    translation: "Daivasura Sampad Vibhaga Yoga",
    transliteration: "Daivāsura Sampad Vibhāg Yog",
    meaning: "Yoga of Discerning Divine & Demoniac Natures",
    summary: "Krishna contrasts the divine qualities (like truthfulness, non-violence, and purity) with demonic qualities (like pride, anger, and greed). He warns that lust, anger, and greed are the three gates to hell and advises following scriptural rules."
  },
  {
    chapter_number: 17,
    verses_count: 28,
    name: "श्रद्धात्रयविभागयोग",
    translation: "Sraddhatraya Vibhaga Yoga",
    transliteration: "Śhraddhātraya Vibhāg Yog",
    meaning: "Yoga of Three Divisions of Faith",
    summary: "Krishna clarifies how faith, food, worship, sacrifice, austerity, and charity are also divided into three types matching the three gunas. He explains the sacred syllable 'Om Tat Sat' and its role in purifying all spiritual activities."
  },
  {
    chapter_number: 18,
    verses_count: 78,
    name: "मोक्षसंन्यासयोग",
    translation: "Moksha Sannyasa Yoga",
    transliteration: "Mokṣha Sannyās Yog",
    meaning: "Yoga of Perfection of Renunciation & Surrender",
    summary: "The final chapter summarizes the entire Bhagavad Gita. Krishna clarifies the difference between renunciation of actions and renunciation of desire. He explains the factors of action, the role of duty, and culminates in the ultimate message of absolute surrender to Him."
  }
];

const getProxyUrl = (url) => {
  return url; // Proxy disabled due to Gutenberg blocking Render IPs
};

// Helper function to map Gutenberg book formats to the structure expected by the frontend
function mapGutenbergBook(book) {
  if (!book) return null;

  let downloadUrl = '';
  let formatName = '';
  if (book.formats) {
    if (book.formats['application/pdf']) {
      downloadUrl = book.formats['application/pdf'];
      formatName = 'PDF';
    } else if (book.formats['application/epub+zip']) {
      downloadUrl = book.formats['application/epub+zip'];
      formatName = 'EPUB';
    } else if (book.formats['text/plain; charset=utf-8']) {
      downloadUrl = book.formats['text/plain; charset=utf-8'];
      formatName = 'Text File';
    } else if (book.formats['text/html']) {
      downloadUrl = book.formats['text/html'];
      formatName = 'Web Page';
    } else {
      downloadUrl = Object.values(book.formats)[0] || '';
      formatName = 'File';
    }
  }

  let description = '';
  if (book.summaries && book.summaries.length > 0) {
    description = book.summaries[0];
  } else if (book.subjects && book.subjects.length > 0) {
    description = `Subjects: ${book.subjects.join(', ')}`;
  } else {
    description = 'No description available for this Project Gutenberg title.';
  }

  return {
    id: book.id,
    title: book.title,
    subtitle: book.subjects && book.subjects.length > 0 ? book.subjects.slice(0, 2).join(', ') : '',
    authors: book.authors && book.authors.length > 0 
      ? book.authors.map(a => a.name.split(', ').reverse().join(' ')).join(', ') 
      : 'Unknown Author',
    image: book.formats && book.formats['image/jpeg'] ? getProxyUrl(book.formats['image/jpeg']) : '',
    url: book.formats && book.formats['text/html'] ? getProxyUrl(book.formats['text/html']) : '',
    download: getProxyUrl(downloadUrl),
    formatName: formatName,
    publisher: 'Project Gutenberg',
    pages: 'N/A',
    year: book.authors && book.authors.length > 0 && book.authors[0].birth_year
      ? `${book.authors[0].birth_year} - ${book.authors[0].death_year || 'Present'}`
      : 'N/A',
    description: description
  };
}

const GitaReader = () => {
  // Navigation Tabs: 'gita' or 'library'
  const [activeTab, setActiveTab] = useState('gita');

  // Gita Reader State
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [selectedVerseNumber, setSelectedVerseNumber] = useState(1);
  const [verseData, setVerseData] = useState(null);
  const [loadingVerse, setLoadingVerse] = useState(false);
  const [errorVerse, setErrorVerse] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [cachedVerses, setCachedVerses] = useState({});

  // Library State
  const [books, setBooks] = useState([]);
  const [librarySearchTerm, setLibrarySearchTerm] = useState('');
  const [loadingLibrary, setLoadingLibrary] = useState(false);
  const [errorLibrary, setErrorLibrary] = useState(null);
  const [selectedBookDetail, setSelectedBookDetail] = useState(null);
  const [loadingBookDetail, setLoadingBookDetail] = useState(false);
  const [lastReadLibrary, setLastReadLibrary] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem('lastReadLibrary');
    if (saved) {
      try {
        setLastReadLibrary(JSON.parse(saved));
      } catch(e) {}
    }
  }, []);

  // Fetch verse data (Gita Tab)
  useEffect(() => {
    if (!selectedChapter) return;

    const cacheKey = `${selectedChapter.chapter_number}-${selectedVerseNumber}`;
    if (cachedVerses[cacheKey]) {
      setVerseData(cachedVerses[cacheKey]);
      setErrorVerse(null);
      return;
    }

    const fetchVerse = async () => {
      setLoadingVerse(true);
      setErrorVerse(null);
      try {
        const response = await fetch(
          `https://vedicscriptures.github.io/slok/${selectedChapter.chapter_number}/${selectedVerseNumber}`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch shloka data. Please try again.');
        }
        const data = await response.json();
        
        // Cache the result
        setCachedVerses(prev => ({
          ...prev,
          [cacheKey]: data
        }));
        setVerseData(data);
      } catch (err) {
        console.error(err);
        setErrorVerse(err.message || 'An error occurred while fetching the verse.');
      } finally {
        setLoadingVerse(false);
      }
    };

    fetchVerse();
  }, [selectedChapter, selectedVerseNumber, cachedVerses]);

  // Fetch Library books based on selected Tab
  useEffect(() => {
    if (activeTab === 'library') {
      fetchRecentBooks();
    }
  }, [activeTab]);

  // Fetch books for Library Section
  const fetchRecentBooks = async () => {
    setLoadingLibrary(true);
    setErrorLibrary(null);
    try {
      const response = await fetch('https://gutendex.com/books/');
      if (!response.ok) throw new Error('No books found.');
      const data = await response.json();
      if (data && data.results) {
        setBooks(data.results.map(mapGutenbergBook).filter(Boolean));
      } else {
        throw new Error('No books found.');
      }
    } catch (err) {
      console.error(err);
      setErrorLibrary('Could not fetch books from catalog.');
    } finally {
      setLoadingLibrary(false);
    }
  };

  const handleLibrarySearch = async (e) => {
    if (e) e.preventDefault();
    if (!librarySearchTerm.trim()) {
      fetchRecentBooks();
      return;
    }
    setLoadingLibrary(true);
    setErrorLibrary(null);
    try {
      const query = encodeURIComponent(librarySearchTerm);
      const response = await fetch(`https://gutendex.com/books/?search=${query}`);
      if (!response.ok) throw new Error('Search failed');
      const data = await response.json();
      if (data && data.results) {
        setBooks(data.results.map(mapGutenbergBook).filter(Boolean));
      } else {
        setBooks([]);
      }
    } catch (err) {
      console.error(err);
      setErrorLibrary('Failed to search library catalog.');
    } finally {
      setLoadingLibrary(false);
    }
  };

  const viewBookDetails = async (bookId) => {
    setLoadingBookDetail(true);
    try {
      const response = await fetch(`https://gutendex.com/books/${bookId}`);
      if (!response.ok) throw new Error('Book not found');
      const data = await response.json();
      const mapped = mapGutenbergBook(data);
      if (mapped) {
        setSelectedBookDetail(mapped);
        localStorage.setItem('lastReadLibrary', JSON.stringify(mapped));
        setLastReadLibrary(mapped);
      }
    } catch (err) {
      console.error(err);
      alert('Could not fetch book details.');
    } finally {
      setLoadingBookDetail(false);
    }
  };

  const handleChapterSelect = (chapter) => {
    setSelectedChapter(chapter);
    setSelectedVerseNumber(1);
    setVerseData(null);
  };

  const handleNextVerse = () => {
    if (!selectedChapter) return;
    if (selectedVerseNumber < selectedChapter.verses_count) {
      setSelectedVerseNumber(prev => prev + 1);
    }
  };

  const handlePrevVerse = () => {
    if (selectedVerseNumber > 1) {
      setSelectedVerseNumber(prev => prev - 1);
    }
  };

  const filteredChapters = CHAPTERS_DATA.filter(ch =>
    ch.translation.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ch.meaning.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ch.chapter_number.toString() === searchTerm
  );

  return (
    <div className="relative min-h-[90vh] px-4 py-8 md:py-12 overflow-hidden">
      {/* Background radial glow */}
      <div className="aurora-bg"></div>

      <div className="relative z-10 max-w-6xl mx-auto space-y-8">
        
        {/* Navigation Tabs Switcher */}
        <div className="flex justify-center border-b border-slate-900 pb-2">
          <div className="flex flex-wrap gap-2 p-1 bg-slate-950/80 backdrop-blur-md border border-slate-900 rounded-full justify-center">
            <button
              onClick={() => setActiveTab('gita')}
              className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                activeTab === 'gita'
                  ? 'bg-linear-to-b from-spiritual-orange to-spiritual-gold text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              Srimad Bhagavad Gita
            </button>
            <button
              onClick={() => setActiveTab('library')}
              className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                activeTab === 'library'
                  ? 'bg-linear-to-b from-spiritual-orange to-spiritual-gold text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Library className="w-3.5 h-3.5" />
              Library Section
            </button>
          </div>
        </div>

        {/* Tab 1: Gita Reader */}
        {activeTab === 'gita' && (
          <div className="space-y-8 animate-fadeIn">
            {/* Header Section */}
            {!selectedChapter ? (
              <div className="text-center space-y-4 max-w-3xl mx-auto">
                <div className="inline-flex p-3 bg-spiritual-orange/10 rounded-full text-spiritual-orange mb-2">
                  <BookOpen className="w-8 h-8" />
                </div>
                <h1 className="text-3xl md:text-5xl font-display font-bold text-white tracking-tight">
                  Shrimad <span className="bg-linear-to-r from-spiritual-orange to-spiritual-gold bg-clip-text text-transparent glow-text-saffron">Bhagavad Gita</span>
                </h1>
                <p className="text-slate-400 font-devanagari text-lg md:text-xl italic select-none">
                  कर्मण्येवाधिकारस्ते मा फलेषु कदाचन । मा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि ॥
                </p>
                <p className="text-sm md:text-base text-slate-300 max-w-xl mx-auto">
                  Explore the timeless wisdom spoken by Lord Krishna to Arjuna on the battlefield of Kurukshetra. Read all 18 chapters and 700 verses with commentaries.
                </p>
                
                {/* Action Bar */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
                  <div className="relative w-full max-w-md">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input
                      type="text"
                      placeholder="Search chapters (e.g. Karma, Arjuna, 2)..."
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-950/60 border border-slate-900 focus:border-spiritual-orange/40 rounded-full text-sm text-slate-200 outline-hidden transition-all placeholder:text-slate-600"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <a
                    href="/bhagavad-gita.pdf"
                    download="Bhagavad_Gita_English.pdf"
                    className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-linear-to-r from-spiritual-orange to-spiritual-gold hover:from-spiritual-orange-dark hover:to-spiritual-gold text-white text-sm font-semibold transition-all shadow-md hover:shadow-spiritual-orange/20"
                  >
                    <Download className="w-4 h-4" /> Download PDF Book
                  </a>
                </div>
              </div>
            ) : (
              /* Chapter Reader Header */
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-900 pb-6">
                <button
                  onClick={() => setSelectedChapter(null)}
                  className="flex items-center gap-2 text-slate-400 hover:text-spiritual-orange transition-colors text-sm font-medium w-fit cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" /> Back to Chapters
                </button>
                <div className="space-y-1 text-left">
                  <h2 className="text-xl md:text-2xl font-display font-bold text-white flex items-center gap-2">
                    <span className="text-spiritual-orange font-devanagari">अध्याय {selectedChapter.chapter_number}:</span>
                    {selectedChapter.translation}
                  </h2>
                  <p className="text-xs text-slate-400 font-sans italic">{selectedChapter.meaning} • {selectedChapter.verses_count} Verses</p>
                </div>
                <a
                  href="/bhagavad-gita.pdf"
                  download="Bhagavad_Gita_English.pdf"
                  className="flex items-center justify-center gap-2 px-4 py-2 rounded-full border border-slate-800 hover:border-spiritual-orange/20 text-slate-300 hover:text-white text-xs font-semibold transition-all"
                >
                  <Download className="w-3.5 h-3.5" /> Download PDF
                </a>
              </div>
            )}

            {/* Content Container */}
            {!selectedChapter ? (
              /* Grid of Chapters */
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
                {filteredChapters.map((ch) => (
                  <div
                    key={ch.chapter_number}
                    onClick={() => handleChapterSelect(ch)}
                    className="glass-panel p-6 rounded-2xl border border-slate-900 hover:border-spiritual-orange/20 transition-all duration-300 group cursor-pointer flex flex-col justify-between h-full"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold px-2.5 py-1 bg-spiritual-orange/10 text-spiritual-orange rounded-full">
                          Chapter {ch.chapter_number}
                        </span>
                        <span className="text-xs text-slate-500 font-medium">
                          {ch.verses_count} Verses
                        </span>
                      </div>
                      <div>
                        <h3 className="text-lg font-display font-bold text-white group-hover:text-spiritual-orange transition-colors">
                          {ch.translation}
                        </h3>
                        <p className="text-xs text-slate-400 font-devanagari mt-0.5">{ch.name} ({ch.transliteration})</p>
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">
                        {ch.summary}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-spiritual-orange font-semibold mt-4 transition-transform group-hover:translate-x-1">
                      Start Reading <ChevronRight className="w-3 h-3" />
                    </div>
                  </div>
                ))}
                {filteredChapters.length === 0 && (
                  <div className="col-span-full text-center py-12 text-slate-500">
                    No chapters matched your search. Try searching for a number (1-18) or a Sanskrit term.
                  </div>
                )}
              </div>
            ) : (
              /* Split Reader Layout */
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* Left Panel: Verse Reader */}
                <div className="lg:col-span-8 space-y-6">
                  
                  {/* Chapter Summary (Shown when Verse 1 is active) */}
                  {selectedVerseNumber === 1 && (
                    <div className="glass-panel p-6 rounded-2xl border border-spiritual-orange/10 bg-linear-to-b from-slate-950/40 to-slate-900/40">
                      <h4 className="text-xs font-bold text-spiritual-orange uppercase tracking-wider mb-2">Chapter Overview</h4>
                      <p className="text-sm text-slate-300 leading-relaxed font-sans">
                        {selectedChapter.summary}
                      </p>
                    </div>
                  )}

                  {/* Shloka Card */}
                  <div className="glass-panel p-6 md:p-8 rounded-3xl border border-slate-900 bg-slate-950/30 space-y-6">
                    
                    {/* Verse Header Controls */}
                    <div className="flex items-center justify-between border-b border-slate-900/60 pb-4">
                      <span className="text-xs font-bold text-spiritual-orange">
                        VERSE {selectedChapter.chapter_number}.{selectedVerseNumber}
                      </span>
                      
                      <div className="flex gap-2">
                        <button
                          onClick={handlePrevVerse}
                          disabled={selectedVerseNumber === 1}
                          className="p-1.5 rounded-full border border-slate-800 hover:border-spiritual-orange/20 text-slate-400 hover:text-white disabled:opacity-40 disabled:hover:border-slate-800 disabled:hover:text-slate-400 transition-all cursor-pointer"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button
                          onClick={handleNextVerse}
                          disabled={selectedVerseNumber === selectedChapter.verses_count}
                          className="p-1.5 rounded-full border border-slate-800 hover:border-spiritual-orange/20 text-slate-400 hover:text-white disabled:opacity-40 disabled:hover:border-slate-800 disabled:hover:text-slate-400 transition-all cursor-pointer"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Shloka Content */}
                    {loadingVerse ? (
                      <div className="flex flex-col items-center justify-center py-20 space-y-4">
                        <Loader2 className="w-8 h-8 text-spiritual-orange animate-spin" />
                        <span className="text-xs text-slate-500 font-sans">Invoking spiritual wisdom...</span>
                      </div>
                    ) : errorVerse ? (
                      <div className="text-center py-16 space-y-4">
                        <p className="text-sm text-red-400">{errorVerse}</p>
                        <button
                          onClick={() => setCachedVerses({})} // Clear state to retry
                          className="px-4 py-2 bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-200 text-xs rounded-full cursor-pointer"
                        >
                          Retry Loading
                        </button>
                      </div>
                    ) : verseData ? (
                      <div className="space-y-8 animate-fadeIn">
                        
                        {/* Sanskrit Shloka */}
                        <div className="text-center space-y-3 px-4 py-6 bg-slate-950/50 rounded-2xl border border-slate-900">
                          <p className="text-lg md:text-2xl font-bold font-devanagari text-spiritual-orange leading-loose whitespace-pre-line tracking-wide select-all">
                            {verseData.slok}
                          </p>
                        </div>

                        {/* Transliteration */}
                        <div className="space-y-2">
                          <h5 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Transliteration</h5>
                          <p className="text-sm text-slate-300 italic font-sans leading-relaxed select-all">
                            {verseData.transliteration}
                          </p>
                        </div>

                        {/* Translation */}
                        <div className="space-y-2">
                          <h5 className="text-xs font-bold text-slate-500 uppercase tracking-wider">English Translation</h5>
                          <p className="text-sm md:text-base text-slate-200 font-sans leading-relaxed">
                            {verseData.prabhu?.et || verseData.translation || "Translation loading..."}
                          </p>
                        </div>

                        {/* Commentary */}
                        {verseData.prabhu?.ec && (
                          <div className="border-t border-slate-900/60 pt-6 space-y-3">
                            <h5 className="text-xs font-bold text-spiritual-gold uppercase tracking-wider flex items-center gap-1.5">
                              <span>•</span> Commentary (Bhaktivedanta Swami Prabhupada)
                            </h5>
                            <p className="text-xs md:text-sm text-slate-400 font-sans leading-relaxed whitespace-pre-line bg-slate-950/20 p-4 rounded-xl border border-slate-900/50">
                              {verseData.prabhu.ec}
                            </p>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="text-center py-20 text-slate-500 text-sm">
                        No verse data loaded.
                      </div>
                    )}
                  </div>
                </div>

                {/* Right Panel: Verse Picker Grid */}
                <div className="lg:col-span-4 space-y-4">
                  <div className="glass-panel p-5 rounded-2xl border border-slate-900 max-h-[70vh] overflow-y-auto flex flex-col">
                    <div className="pb-3 border-b border-slate-900 mb-3">
                      <h4 className="text-sm font-bold text-white flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-spiritual-orange" />
                        Select Verse
                      </h4>
                      <p className="text-xxs text-slate-500 mt-1">Jump to any of the {selectedChapter.verses_count} verses in this chapter.</p>
                    </div>
                    
                    <div className="grid grid-cols-5 gap-2 overflow-y-auto pr-1">
                      {Array.from({ length: selectedChapter.verses_count }).map((_, i) => {
                        const verseNum = i + 1;
                        const isActive = selectedVerseNumber === verseNum;
                        return (
                          <button
                            key={verseNum}
                            onClick={() => setSelectedVerseNumber(verseNum)}
                            className={`py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                              isActive
                                ? 'bg-linear-to-b from-spiritual-orange to-spiritual-gold text-white shadow-md'
                                : 'bg-slate-950/60 border border-slate-900 text-slate-400 hover:text-slate-200 hover:border-slate-800'
                            }`}
                          >
                            {verseNum}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

              </div>
            )}
          </div>
        )}

        {/* Tab 2: Library Section */}
        {activeTab === 'library' && (
          <div className="space-y-8 animate-fadeIn">
            <div className="text-center space-y-4 max-w-3xl mx-auto">
              <div className="inline-flex p-3 bg-spiritual-orange/10 rounded-full text-spiritual-orange mb-2">
                <Library className="w-8 h-8" />
              </div>
              <h1 className="text-3xl md:text-5xl font-display font-bold text-white tracking-tight">
                Library <span className="bg-linear-to-r from-spiritual-orange to-spiritual-gold bg-clip-text text-transparent glow-text-saffron">Section</span>
              </h1>
              <p className="text-sm md:text-base text-slate-300 max-w-xl mx-auto">
                Search and read thousands of free classic books from Project Gutenberg.
              </p>
              
              {/* Search Form */}
              <form onSubmit={handleLibrarySearch} className="flex gap-3 justify-center items-center max-w-md mx-auto pt-4">
                <div className="relative w-full">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type="text"
                    placeholder="Search free books (e.g. Shakespeare, Pride and Prejudice, Odyssey)..."
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-950/60 border border-slate-900 focus:border-spiritual-orange/40 rounded-full text-sm text-slate-200 outline-hidden transition-all placeholder:text-slate-600"
                    value={librarySearchTerm}
                    onChange={(e) => setLibrarySearchTerm(e.target.value)}
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full bg-linear-to-r from-spiritual-orange to-spiritual-gold text-white text-sm font-semibold transition-all shadow-md hover:shadow-spiritual-orange/20 cursor-pointer"
                >
                  Search
                </button>
              </form>
            </div>

            {/* Continue Reading Banner */}
            {lastReadLibrary && !librarySearchTerm && (
              <div className="max-w-4xl mx-auto mb-8 p-4 bg-slate-900/80 border border-spiritual-orange/30 rounded-2xl flex items-center justify-between">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 text-left">
                  <div className="p-3 bg-spiritual-orange/20 rounded-xl text-spiritual-orange hidden sm:block">
                    <BookOpen className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs text-spiritual-orange font-bold uppercase tracking-wider">Continue Reading</p>
                    <h4 className="text-white font-semibold text-sm line-clamp-1">
                      {lastReadLibrary.title}
                    </h4>
                    <p className="text-slate-400 text-xs">By {lastReadLibrary.authors}</p>
                  </div>
                </div>
                <button
                  onClick={() => viewBookDetails(lastReadLibrary.id)}
                  className="px-6 py-2.5 bg-spiritual-orange text-white text-xs font-bold rounded-full hover:bg-spiritual-orange-dark transition-colors shadow-md shadow-spiritual-orange/20 whitespace-nowrap mt-4 sm:mt-0"
                >
                  Resume Book
                </button>
              </div>
            )}

            {/* Content grid */}
            {loadingLibrary ? (
              <div className="flex flex-col items-center justify-center py-24 space-y-4">
                <Loader2 className="w-10 h-10 text-spiritual-orange animate-spin" />
                <span className="text-sm text-slate-500 font-sans">Accessing library shelves...</span>
              </div>
            ) : errorLibrary ? (
              <div className="glass-panel max-w-md mx-auto p-6 rounded-2xl border border-red-500/20 text-center space-y-4">
                <p className="text-sm text-red-400">{errorLibrary}</p>
                <button
                  onClick={fetchRecentBooks}
                  className="px-4 py-2 bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-200 text-xs rounded-full cursor-pointer"
                >
                  Retry Connection
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {books.map((book) => (
                  <div
                    key={book.id}
                    onClick={() => viewBookDetails(book.id)}
                    className="glass-panel rounded-2xl border border-slate-900 hover:border-spiritual-orange/20 transition-all duration-300 p-4 flex flex-col justify-between group cursor-pointer"
                  >
                    <div className="space-y-4">
                      <div className="aspect-[3/4] rounded-lg overflow-hidden bg-slate-950 border border-slate-900 relative flex items-center justify-center">
                        <div className="absolute inset-0 flex items-center justify-center text-slate-700 bg-slate-950 z-0">
                          <BookOpen className="w-12 h-12" />
                        </div>
                        {book.image && (
                          <img
                            src={book.image}
                            alt={book.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 relative z-10"
                            loading="lazy"
                            onError={(e) => {
                              e.target.style.display = 'none';
                            }}
                          />
                        )}
                      </div>

                      <div className="space-y-1 text-left">
                        <h3 className="font-display font-semibold text-sm text-white group-hover:text-spiritual-orange transition-colors line-clamp-2">
                          {book.title}
                        </h3>
                        {book.subtitle && (
                          <p className="text-xxs text-slate-500 line-clamp-1">{book.subtitle}</p>
                        )}
                        <p className="text-xs text-slate-400 line-clamp-1">By {book.authors}</p>
                      </div>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        viewBookDetails(book.id);
                      }}
                      className="w-full mt-4 py-2 rounded-lg bg-slate-950/60 hover:bg-slate-900 border border-slate-900 group-hover:border-spiritual-orange/30 text-xs text-slate-300 hover:text-white font-medium transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      View Details <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}

                {books.length === 0 && (
                  <div className="col-span-full text-center py-16 text-slate-500">
                    No books matches this search. Please try another query.
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Book Details Modal */}
        {selectedBookDetail && (
          <div className="fixed inset-0 z-100 flex items-center justify-center px-4 bg-black/80 backdrop-blur-xs animate-fadeIn">
            <div className="glass-panel w-full max-w-2xl rounded-3xl border border-slate-800 bg-slate-950/90 shadow-2xl p-6 md:p-8 space-y-6 relative overflow-y-auto max-h-[90vh]">
              {/* Close button */}
              <button
                onClick={() => setSelectedBookDetail(null)}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-900 text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                {/* Book Image */}
                <div className="md:col-span-4 flex justify-center">
                  <div className="w-44 aspect-[3/4] rounded-xl overflow-hidden border border-slate-800 bg-slate-900 relative flex items-center justify-center">
                    <div className="absolute inset-0 flex items-center justify-center text-slate-700 bg-slate-950 z-0">
                      <BookOpen className="w-12 h-12" />
                    </div>
                    {selectedBookDetail.image && (
                      <img
                        src={selectedBookDetail.image}
                        alt={selectedBookDetail.title}
                        className="w-full h-full object-cover relative z-10"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    )}
                  </div>
                </div>

                {/* Info */}
                <div className="md:col-span-8 space-y-4 text-left">
                  <div>
                    <h2 className="text-xl md:text-2xl font-display font-bold text-white leading-tight">
                      {selectedBookDetail.title}
                    </h2>
                    {selectedBookDetail.subtitle && (
                      <p className="text-xs text-slate-400 mt-1">{selectedBookDetail.subtitle}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div>
                      <span className="text-slate-500 block">Author(s)</span>
                      <span className="text-slate-300 font-medium">{selectedBookDetail.authors}</span>
                    </div>
                    {selectedBookDetail.publisher && (
                      <div>
                        <span className="text-slate-500 block">Publisher</span>
                        <span className="text-slate-300 font-medium">{selectedBookDetail.publisher}</span>
                      </div>
                    )}
                    {selectedBookDetail.pages && (
                      <div>
                        <span className="text-slate-500 block">Pages</span>
                        <span className="text-slate-300 font-medium">{selectedBookDetail.pages}</span>
                      </div>
                    )}
                    {selectedBookDetail.year && (
                      <div>
                        <span className="text-slate-500 block">Year</span>
                        <span className="text-slate-300 font-medium">{selectedBookDetail.year}</span>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    {selectedBookDetail.download && (
                      <a
                        href={selectedBookDetail.download}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-linear-to-r from-spiritual-orange to-spiritual-gold hover:from-spiritual-orange-dark hover:to-spiritual-gold text-white text-xs font-bold transition-all shadow-md hover:shadow-spiritual-orange/20"
                      >
                        <Download className="w-3.5 h-3.5" /> Download {selectedBookDetail.formatName}
                      </a>
                    )}
                    {selectedBookDetail.url && (
                      <a
                        href={selectedBookDetail.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-5 py-2.5 rounded-full border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white text-xs font-semibold text-center transition-all"
                      >
                        Read Online (HTML)
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* Description */}
              {selectedBookDetail.description && (
                <div className="border-t border-slate-900/80 pt-6 text-left space-y-2">
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Book Description</h4>
                  <p className="text-xs md:text-sm text-slate-400 font-sans leading-relaxed">
                    {selectedBookDetail.description}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Details Loader Modal */}
        {loadingBookDetail && (
          <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/60 backdrop-blur-xs">
            <div className="flex flex-col items-center gap-3">
              <Loader2 className="w-10 h-10 text-spiritual-orange animate-spin" />
              <span className="text-xs text-slate-400">Loading catalog entry...</span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default GitaReader;
