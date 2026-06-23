const Deity = require('../models/Deity');
const Mantra = require('../models/Mantra');
const Aarti = require('../models/Aarti');
const Festival = require('../models/Festival');
const Temple = require('../models/Temple');
const Chalisa = require('../models/Chalisa');

const seedData = async () => {
  try {
    // We clear database collections to do a fresh seed with new deities, mantras, and chalisas
    console.log('Clearing old spiritual database records...');
    await Deity.deleteMany({});
    await Mantra.deleteMany({});
    await Aarti.deleteMany({});
    await Festival.deleteMany({});
    await Temple.deleteMany({});
    await Chalisa.deleteMany({});

    console.log('Seeding spiritual content database...');

    // 1. Seed Deities
    const shiva = await Deity.create({
      name: 'Lord Shiva',
      slug: 'lord-shiva',
      description: 'The Destroyer of evil and the Transformer within the Trimurti. He is the patron god of yoga, meditation, and arts.',
      vehicle: 'Nandi (The Bull)',
      weapon: 'Trishula (Trident)',
      festivals: ['Maha Shivratri', 'Shravan Somvar'],
      thumbnailUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Shiva_Bangalore.jpg',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Shiva_Bangalore.jpg',
      stories: [
        {
          title: 'The Churning of the Ocean (Samudra Manthan)',
          content: 'During the churning of the cosmic ocean, a deadly poison (Halahala) emerged that threatened to destroy all creation. To protect the universe, Lord Shiva swallowed the poison, holding it in his throat. This turned his neck blue, earning him the name Neelkanth.'
        }
      ],
      symbolism: [
        {
          aspect: 'Third Eye',
          description: 'Represents wisdom and the destruction of ignorance.'
        },
        {
          aspect: 'Crescent Moon',
          description: 'Adorning his head, it signifies control over time and the cycles of nature.'
        }
      ]
    });

    const ganesha = await Deity.create({
      name: 'Lord Ganesha',
      slug: 'lord-ganesha',
      description: 'The Elephant-headed deity, known as the Remover of Obstacles, the patron of arts and sciences, and the Deva of intellect and wisdom.',
      vehicle: 'Krauncha (The Mouse)',
      weapon: 'Pasha (Noose) & Ankusha (Axe)',
      festivals: ['Ganesh Chaturthi'],
      thumbnailUrl: 'https://upload.wikimedia.org/wikipedia/commons/6/6c/Ganesha_statue.jpg',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/6/6c/Ganesha_statue.jpg',
      stories: [
        {
          title: 'The Race Around the Universe',
          content: 'Ganesha and his brother Kartikeya were challenged to race around the universe. While Kartikeya flew off on his peacock, Ganesha walked around his parents, Lord Shiva and Goddess Parvati, declaring that they represented the entire universe to him. Moved by his wisdom, they declared him the winner.'
        }
      ],
      symbolism: [
        {
          aspect: 'Elephant Head',
          description: 'Symbolizes immense wisdom, foresight, and listening ability.'
        }
      ]
    });

    const hanuman = await Deity.create({
      name: 'Lord Hanuman',
      slug: 'lord-hanuman',
      description: 'The loyal devotee of Lord Rama, representing strength, devotion, humility, and selflessness.',
      vehicle: 'None',
      weapon: 'Gada (Mace)',
      festivals: ['Hanuman Jayanti'],
      thumbnailUrl: 'https://upload.wikimedia.org/wikipedia/commons/8/82/Hanuman_statue.jpg',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/8/82/Hanuman_statue.jpg',
      stories: [
        {
          title: 'Lifting the Dronagiri Mountain',
          content: 'When Lord Rama\'s brother Lakshmana was mortally wounded during the battle in Lanka, Hanuman was sent to fetch the Sanjeevani herb from the Himalayas. Unable to identify the herb, Hanuman lifted the entire Dronagiri mountain and carried it back to the battlefield, saving Lakshmana\'s life.'
        }
      ],
      symbolism: [
        {
          aspect: 'Torn Chest',
          description: 'Reveals images of Rama and Sita, signifying absolute and unwavering devotion.'
        }
      ]
    });

    const durga = await Deity.create({
      name: 'Goddess Durga',
      slug: 'goddess-durga',
      description: 'The protective mother goddess representing the divine feminine strength (Shakti), protector of the righteous and destroyer of demonic forces.',
      vehicle: 'Tiger / Lion',
      weapon: 'Trishula, Shankha, Chakra, Bow and Arrow',
      festivals: ['Navratri', 'Durga Puja'],
      thumbnailUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/7f/Durga_by_Raja_Ravi_Varma.jpg',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/7f/Durga_by_Raja_Ravi_Varma.jpg',
      stories: [
        {
          title: 'Defeat of Mahishasura',
          content: 'The buffalo demon Mahishasura unleashed terror on Earth and Heaven. Since a boon prevented his defeat by any man or god, the trinity combined their energies to manifest Goddess Durga. She fought him for nine days and nights, ultimately decapitating him with her trident.'
        }
      ],
      symbolism: [
        {
          aspect: 'Ten Arms',
          description: 'Represents protection from all ten directions of the universe.'
        }
      ]
    });

    const krishna = await Deity.create({
      name: 'Lord Krishna',
      slug: 'lord-krishna',
      description: 'The eighth avatar of Lord Vishnu, the god of love, compassion, tenderness, playfulness, and the speaker of the Bhagavad Gita.',
      vehicle: 'None',
      weapon: 'Sudarshana Chakra & Flute',
      festivals: ['Krishna Janmashtami', 'Holi'],
      thumbnailUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/00/Krishna_statue.jpg',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/00/Krishna_statue.jpg',
      stories: [
        {
          title: 'Lifting the Govardhan Hill',
          content: 'To protect the villagers of Vrindavan from torrents of rain sent by the angry rain god Indra, Lord Krishna lifted the Govardhan Hill on his little finger, providing a giant umbrella for the people and animals for seven days.'
        }
      ],
      symbolism: [
        {
          aspect: 'Peacock Feather',
          description: 'Symbolizes beauty, purity, and the vibrant colors of nature and cosmic creation.'
        }
      ]
    });

    const rama = await Deity.create({
      name: 'Lord Rama',
      slug: 'lord-rama',
      description: 'The seventh avatar of Lord Vishnu, the prince and king of Ayodhya, representing the ideal human and embodiment of righteousness (Dharma).',
      vehicle: 'None',
      weapon: 'Kodanda (Bow)',
      festivals: ['Rama Navami', 'Diwali'],
      thumbnailUrl: 'https://upload.wikimedia.org/wikipedia/commons/1/1b/Rama-Varuna.jpg',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/1/1b/Rama-Varuna.jpg',
      stories: [
        {
          title: 'Building the Ram Setu Bridge',
          content: 'To cross the ocean to Lanka to rescue his wife Sita, Rama\'s vanara army built a floating stone bridge. Each stone inscribed with Rama\'s name miraculously floated on water due to their devotion and the divine name\'s power.'
        }
      ],
      symbolism: [
        {
          aspect: 'Bow and Arrow',
          description: 'Symbolizes preparedness, focus, and targets aimed towards upholding righteousness.'
        }
      ]
    });

    const lakshmi = await Deity.create({
      name: 'Goddess Lakshmi',
      slug: 'goddess-lakshmi',
      description: 'The goddess of wealth, fortune, power, beauty, fertility, and prosperity. She is the consort of Lord Vishnu.',
      vehicle: 'Owl (Uluka)',
      weapon: 'Lotus Flowers',
      festivals: ['Diwali', 'Lakshmi Puja'],
      thumbnailUrl: 'https://upload.wikimedia.org/wikipedia/commons/f/fc/Lakshmi_by_Raja_Ravi_Varma.jpg',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/f/fc/Lakshmi_by_Raja_Ravi_Varma.jpg',
      stories: [
        {
          title: 'Emergence from the Milky Ocean',
          content: 'During Samudra Manthan (churning of the ocean), Goddess Lakshmi emerged standing on a fully bloomed lotus. She chose Lord Vishnu as her eternal consort among all assembled gods due to his righteousness.'
        }
      ],
      symbolism: [
        {
          aspect: 'Gold Coins Flowing',
          description: 'Represents prosperity, both material and spiritual, flowing to devotees.'
        }
      ]
    });

    const saraswati = await Deity.create({
      name: 'Goddess Saraswati',
      slug: 'goddess-saraswati',
      description: 'The goddess of knowledge, music, art, speech, wisdom, and learning. She is part of the Tridevi.',
      vehicle: 'Swan (Hamsa) & Peacock',
      weapon: 'Veena & Vedas',
      festivals: ['Vasant Panchami'],
      thumbnailUrl: 'https://upload.wikimedia.org/wikipedia/commons/d/df/Saraswati_by_Raja_Ravi_Varma.jpg',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/d/df/Saraswati_by_Raja_Ravi_Varma.jpg',
      stories: [
        {
          title: 'Flowing as the River Saraswati',
          content: 'Goddess Saraswati descended to Earth as a holy river of pure knowledge to cleanse the worlds, fertilize the plains, and inspire sages to compile the sacred scriptures.'
        }
      ],
      symbolism: [
        {
          aspect: 'Veena (Lute)',
          description: 'Represents the harmony of all creative arts, intellect, and speech.'
        }
      ]
    });

    // 2. Seed Mantras
    await Mantra.create([
      {
        title: 'Maha Mrityunjaya Mantra',
        deityId: shiva._id,
        sanskritText: 'ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम्।\nउर्वारुकमिव बन्धनान्मृत्योर्मुक्षीय माऽमृतात्॥',
        transliteration: 'Om Tryambakam Yajamahe Sugandhim Pushti-Vardhanam\nUrvarukamiva Bandhanan-Mrityormukshiya Maamritat',
        meaning: 'We worship the three-eyed Lord (Shiva) who is fragrant and nourishes all beings. As the ripe cucumber is liberated from its bondage to the vine, may He liberate us from death for the sake of immortality.',
        explanation: 'A powerful life-restoring mantra dedicated to Lord Shiva that helps overcome fears, diseases, and negative influences.',
        audioFileUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
        benefits: ['Overcomes fear of death and accidents', 'Brings peace, health, and prosperity', 'Helps in deep meditation']
      },
      {
        title: 'Shiva Panchakshari Mantra',
        deityId: shiva._id,
        sanskritText: 'ॐ नमः शिवाय',
        transliteration: 'Om Namah Shivaya',
        meaning: 'I bow down to Lord Shiva (the inner self).',
        explanation: 'The most sacred mantra of Shiva, representing the five elements (Na-Mah-Shi-Va-Ya) of earth, water, fire, air, and space.',
        audioFileUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
        benefits: ['Purifies the mind and soul', 'Increases focus and concentration', 'Calms the nervous system']
      },
      {
        title: 'Ganesha Vakratunda Mantra',
        deityId: ganesha._id,
        sanskritText: 'वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ।\nनिर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा॥',
        transliteration: 'Vakratunda Mahakaya Suryakoti Samaprabha\nNirvighnam Kuru Me Deva Sarva-Karyeshu Sarvada',
        meaning: 'O Lord Ganesha, with the curved trunk and massive body, whose brilliance equals ten million suns, please make all my endeavors free of obstacles, always.',
        explanation: 'Traditionally chanted at the beginning of any auspicious ceremony or work to clear the path of obstacles.',
        audioFileUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
        benefits: ['Removes obstacles in education, career, and life', 'Invokes success and intelligence']
      },
      {
        title: 'Hanuman Moola Mantra',
        deityId: hanuman._id,
        sanskritText: 'ॐ हं हनुमते नमः',
        transliteration: 'Om Ham Hanumate Namah',
        meaning: 'I bow down and surrender to Lord Hanuman, the embodiment of courage and strength.',
        explanation: 'A potent invocation of Hanuman\'s energy, bestowing physical stamina, willpower, and protection from fears.',
        audioFileUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
        benefits: ['Boosts confidence and willpower', 'Dispels fear, anxiety, and depression']
      },
      {
        title: 'Durga Mantra (Sarva Mangala)',
        deityId: durga._id,
        sanskritText: 'सर्वमङ्गलमाङ्गल्ये शिवे सर्वार्थसाधिके।\nशरण्ये त्र्यम्बके गौरि नारायणि नमोऽस्तु ते॥',
        transliteration: 'Sarva Mangala Mangalye Shive Sarvartha Sadhike\nSharanye Tryambake Gauri Narayani Namostute',
        meaning: 'Adorations to the auspicious one who bestows all auspiciousness, the consort of Shiva, who fulfills all goals, the protector, the three-eyed Gauri, Narayani, we bow to You.',
        explanation: 'Chanted to request protection, blessings, and auspiciousness from Goddess Durga.',
        audioFileUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
        benefits: ['Bestows auspiciousness in all ventures', 'Protects from negative energies and obstacles']
      },
      {
        title: 'Krishna Maha Mantra',
        deityId: krishna._id,
        sanskritText: 'हरे कृष्ण हरे कृष्ण कृष्ण कृष्ण हरे हरे।\nहरे राम हरे राम राम राम हरे हरे॥',
        transliteration: 'Hare Krishna Hare Krishna Krishna Krishna Hare Hare\nHare Rama Hare Rama Ram Ram Hare Hare',
        meaning: 'O Lord, O energy of the Lord, please engage me in Your loving service.',
        explanation: 'The greatest chanting mantra for meditation and emotional release, praised in the Upanishads.',
        audioFileUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3',
        benefits: ['Brings immense peace and spiritual joy', 'Cleanses the mind of stressful thoughts']
      },
      {
        title: 'Rama Taraka Mantra',
        deityId: rama._id,
        sanskritText: 'श्री राम जय राम जय जय राम',
        transliteration: 'Sri Rama Jaya Rama Jaya Jaya Rama',
        meaning: 'Victory to Lord Rama, victory to the ultimate divine consciousness.',
        explanation: 'A simple, highly powerful chanting mantra that helps establish mental peace and devotion.',
        audioFileUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3',
        benefits: ['Calms the agitated mind', 'Brings harmony and peace into the household']
      },
      {
        title: 'Lakshmi Gayatri Mantra',
        deityId: lakshmi._id,
        sanskritText: 'ॐ श्री महालक्ष्म्यै च विद्महे विष्णु पत्न्यै च धीमहि।\nतन्नो लक्ष्मी प्रचोदयात्॥',
        transliteration: 'Om Shree Maha Lakshmyai Cha Vidmahe Vishnu Patnyai Cha Dheemahi\nTanno Lakshmi Prachodayat',
        meaning: 'Let us meditate on the great Goddess Lakshmi, the consort of Lord Vishnu. May that Goddess of wealth and prosperity inspire and illuminate our intellect.',
        explanation: 'A prayer requesting material abundance, beauty, and wisdom.',
        audioFileUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3',
        benefits: ['Attracts wealth, success, and prosperity', 'Brings peace and positive vibrations']
      },
      {
        title: 'Saraswati Vandana Mantra',
        deityId: saraswati._id,
        sanskritText: 'ॐ ऐं सरस्वत्यै नमः',
        transliteration: 'Om Aim Saraswatyai Namah',
        meaning: 'Salutations and bowing to Goddess Saraswati, the embodiment of wisdom.',
        explanation: 'A short seed (beej) mantra chanted by students and creative artists for focus and intellect.',
        audioFileUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3',
        benefits: ['Improves memory power and focus', 'Inspires artistic creativity and speech']
      }
    ]);

    // 3. Seed Aartis
    await Aarti.create([
      {
        title: 'Shiva Aarti (Om Jai Shiv Omkara)',
        deityId: shiva._id,
        audioFileUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3',
        lyrics: [
          {
            stanzaNumber: 1,
            originalText: 'जय शिव ओंकारा, हर जय शिव ओंकारा।\nब्रह्मा विष्णु सदाशिव अर्द्धांगी धारा॥',
            transliteration: 'Jai Shiv Omkara, Har Jai Shiv Omkara\nBrahma Vishnu Sadashiv Ardhangi Dhara',
            translation: 'Glory to You, Lord Shiva, who wears the sacred Om symbol, and whose form is shared with Goddess Parvati.'
          },
          {
            stanzaNumber: 2,
            originalText: 'एकानन चतुरानन पञ्चानन राजे।\nहंसासन गरुड़ासन वृषवाहन साजे॥',
            transliteration: 'Ekanan Chaturanan Panchanan Raje\nHansasan Garudasan Vrishvahan Saje',
            translation: 'Having one, four, or five faces, riding on the swan, the eagle, and the bull (Nandi) elegantly.'
          }
        ]
      },
      {
        title: 'Ganesha Aarti (Jai Ganesh Deva)',
        deityId: ganesha._id,
        audioFileUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3',
        lyrics: [
          {
            stanzaNumber: 1,
            originalText: 'जय गणेश जय गणेश जय गणेश देवा।\nमाता जाकी पार्वती पिता महादेवा॥',
            transliteration: 'Jai Ganesh Jai Ganesh Jai Ganesh Deva\nMata Jaki Parvati Pita Mahadeva',
            translation: 'Glory to Ganesha! Mother is Parvati, Father is Lord Shiva.'
          },
          {
            stanzaNumber: 2,
            originalText: 'एकदन्त दयावन्त चार भुजाधारी।\nमाथे पर तिलक सोहे मूसे की सवारी॥',
            transliteration: 'Ekadant Dayavant Char Bhujadhari\nMathe Par Tilak Sohe Moose Ki Sawari',
            translation: 'Single-tusked, merciful, holding weapons in four arms, wearing a red forehead mark, and riding a mouse.'
          }
        ]
      },
      {
        title: 'Durga Aarti (Jai Ambe Gauri)',
        deityId: durga._id,
        audioFileUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3',
        lyrics: [
          {
            stanzaNumber: 1,
            originalText: 'जय अम्बे गौरी, मैया जय श्यामा गौरी।\nतुमको निसिदिन ध्यावत, हरि ब्रह्मा सिवरी॥',
            transliteration: 'Jai Ambe Gauri, Maiya Jai Shyama Gauri\nTumko Nisidin Dhyavat, Hari Brahma Sivri',
            translation: 'Glory to You, Mother Gauri, who is worshipped day and night by Vishnu, Brahma, and Shiva.'
          }
        ]
      }
    ]);

    // 4. Seed Chalisas (Shiva, Hanuman, Durga)
    await Chalisa.create([
      {
        title: 'Hanuman Chalisa',
        deityId: hanuman._id,
        audioFileUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-13.mp3',
        verses: [
          {
            verseNumber: 1,
            type: 'doha',
            originalText: 'श्रीगुरु चरन सरोज रज निज मनु मुकुरु सुधारि।\nबरनऊ रघुबर बिमल जसु जो दायकु फल चारि॥',
            transliteration: 'Shri Guru Charana Saroja Raja Nija Manu Mukura Sudhari\nBaranau Raghuvara Bimala Jasu Jo Dayaku Phala Chari',
            translation: 'Cleansing the mirror of my mind with the dust of the lotus feet of the Divine Guru, I describe the pure glory of Lord Rama, which bestows the four fruits of life (Dharma, Artha, Kama, Moksha).'
          },
          {
            verseNumber: 2,
            type: 'doha',
            originalText: 'बुद्धिहीन तनु जानिके सुमिरौ पवन कुमार।\nबल बुधि बिद्या देहु मोहि हरहु कलेस बिकार॥',
            transliteration: 'Budhiheena Tanu Janike Sumirau Pavana Kumara\nBala Budhi Bidya Dehu Mohi Harahu Kalesa Bikara',
            translation: 'Knowing myself to be ignorant, I remember Hanuman, the son of the Wind God. Bestow upon me strength, wisdom, and knowledge, and remove all my miseries and flaws.'
          },
          {
            verseNumber: 3,
            type: 'chaupai',
            originalText: 'जय हनुमान ज्ञान गुन सागर। जय कपीस तिहुँ लोक उजागर॥',
            transliteration: 'Jaya Hanumana Gyana Guna Sagara | Jaya Kapeesa Tihun Loka Ujagara ||',
            translation: 'Victory to Hanuman, who is an ocean of wisdom and virtues. Victory to the Lord of the monkeys, who illuminates the three worlds.'
          },
          {
            verseNumber: 4,
            type: 'chaupai',
            originalText: 'राम दूत अतुलित बल धामा। अंजनि पुत्र पवनसुत नामा॥',
            transliteration: 'Rama Doota Atulita Bala Dhama | Anjani Putra Pavanasuta Nama ||',
            translation: 'The messenger of Rama, repository of immeasurable strength, son of Anjana, and called the son of the Wind God.'
          },
          {
            verseNumber: 5,
            type: 'chaupai',
            originalText: 'महाबीर बिक्रम बजरंगी। कुमति निवार सुमति के संगी॥',
            transliteration: 'Mahabeera Bikrama Bajarangee | Kumati Nivara Sumati Ke Sangee ||',
            translation: 'Great hero, possessing exceptional valor, with limbs as strong as thunderbolts. You dispel bad intellect and are the companion of pure thoughts.'
          },
          {
            verseNumber: 6,
            type: 'chaupai',
            originalText: 'कंचन बरन बिराज सुबेसा। कानन कुंडल कुंचित केसा॥',
            transliteration: 'Kanchana Barana Biraja Subeesa | Kanana Kundala Kunchita Keesa ||',
            translation: 'Your golden complexion shines in beautiful garments, with large earrings in your ears and curly locks of hair.'
          }
        ]
      },
      {
        title: 'Shiva Chalisa',
        deityId: shiva._id,
        audioFileUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-14.mp3',
        verses: [
          {
            verseNumber: 1,
            type: 'doha',
            originalText: 'जय गणेश गिरिजा सुवन, मंगल मूल सुजान।\nकहत अयोध्यादास तुम, देहु अभय वरदान॥',
            transliteration: 'Jai Ganesh Girija Suvan, Mangal Mool Sujan\nKahat Ayodhyadas Tum, Dehu Abhay Vardan',
            translation: 'Victory to Ganesha, the son of Parvati, the source of all auspiciousness and wisdom. Ayodhyadas prays to You, grant me the boon of fearlessness.'
          },
          {
            verseNumber: 2,
            type: 'chaupai',
            originalText: 'जय गिरजापति दीनदयाला। सदा करत सन्तन प्रतिपाला॥',
            transliteration: 'Jai Girijapati Deendayala | Sada Karat Santan Pratipala ||',
            translation: 'Victory to the Lord of Parvati (Shiva), who is merciful to the poor and always protects the saintly people.'
          },
          {
            verseNumber: 3,
            type: 'chaupai',
            originalText: 'भाल चन्द्र सोहत नीके। कानन कुण्डल नागफनी के॥',
            transliteration: 'Bhal Chandra Sohat Neeke | Kanan Kundal Nagphani Ke ||',
            translation: 'The crescent moon adorns your forehead beautifully, and snake-shaped earrings decorate your ears.'
          }
        ]
      },
      {
        title: 'Durga Chalisa',
        deityId: durga._id,
        audioFileUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-15.mp3',
        verses: [
          {
            verseNumber: 1,
            type: 'doha',
            originalText: 'नमो नमो दुर्गे सुख करनी। नमो नमो अम्बे दुःख हरनी॥',
            transliteration: 'Namo Namo Durge Sukh Karni | Namo Namo Ambe Dukh Harni ||',
            translation: 'Salutations and bowing to Goddess Durga, who brings happiness. Salutations to Mother Ambe, who destroys all grief.'
          },
          {
            verseNumber: 2,
            type: 'chaupai',
            originalText: 'निरंकार है ज्योति तुम्हारी। तिहुं लोक फैली उजियारी॥',
            transliteration: 'Nirankar Hai Jyoti Tumhari | Tihun Lok Phaili Ujiyari ||',
            translation: 'Your divine light is formless, and its brightness is spread throughout the three worlds.'
          }
        ]
      }
    ]);

    // 5. Seed Festivals
    const shivaDeity = await Deity.findOne({ slug: 'lord-shiva' });
    const ganeshaDeity = await Deity.findOne({ slug: 'lord-ganesha' });
    const durgaDeity = await Deity.findOne({ slug: 'goddess-durga' });

    await Festival.create([
      {
        title: 'Ganesh Chaturthi',
        description: 'A 10-day grand festival honoring the birth of Lord Ganesha.',
        date: new Date('2026-09-15'),
        associatedDeityIds: ganeshaDeity ? [ganeshaDeity._id] : [],
        rituals: [
          'Clay Ganesha idol installation in homes and public pandals',
          'Chanting Ganesha Atharvashirsha',
          'Modak sweets offerings (Ganesha\'s favorite)',
          'Ganesh Visarjan (submerging idol in water body)'
        ],
        significance: 'Celebrates the arrival of Ganesha to Earth from Kailash, bringing wisdom, prosperity, and obstacle removal.'
      },
      {
        title: 'Maha Shivratri',
        description: 'The great night of Lord Shiva celebrated annually in reverence.',
        date: new Date('2027-03-06'),
        associatedDeityIds: shivaDeity ? [shivaDeity._id] : [],
        rituals: [
          'All-night fasting and meditative vigil (Jagaran)',
          'Bathing the Shiva Lingam with water, milk, honey, and Bilva leaves'
        ],
        significance: 'Signifies the night Lord Shiva performed the cosmic dance of creation and destruction, and married Goddess Parvati.'
      },
      {
        title: 'Durga Puja & Navratri',
        description: 'The nine-night festival celebrating Goddess Durga\'s victory over Mahishasura.',
        date: new Date('2026-10-10'),
        associatedDeityIds: durgaDeity ? [durgaDeity._id] : [],
        rituals: [
          'Fasting during the nine days and worshipping the nine avatars of Durga',
          'Performing Garba/Dandiya dances',
          'Reciting Durga Saptashati and Durga Chalisa'
        ],
        significance: 'Celebrates the triumph of divine energy and good over evil.'
      }
    ]);

    // 6. Seed Temples
    await Temple.create([
      {
        name: 'Kashi Vishwanath Temple',
        description: 'One of the most famous Hindu temples dedicated to Lord Shiva, located on the western bank of holy river Ganga.',
        address: 'Lahori Tola, Varanasi, Uttar Pradesh 221001, India',
        timing: '3:00 AM - 11:00 PM',
        deityId: shivaDeity ? shivaDeity._id : null,
        imageUrl: 'https://images.unsplash.com/photo-1627896157734-4d7d4388f24b?auto=format&fit=crop&w=600&q=80',
        location: {
          type: 'Point',
          coordinates: [83.0104, 25.3109] // [longitude, latitude]
        }
      },
      {
        name: 'Shree Siddhivinayak Ganapati Temple',
        description: 'A highly revered temple dedicated to Lord Ganesha, established in 1801 and located in Mumbai.',
        address: 'SK Bole Marg, Prabhadevi, Mumbai, Maharashtra 400028, India',
        timing: '5:30 AM - 10:00 PM',
        deityId: ganeshaDeity ? ganeshaDeity._id : null,
        imageUrl: 'https://images.unsplash.com/photo-1609137144813-74d75d6541f5?auto=format&fit=crop&w=600&q=80',
        location: {
          type: 'Point',
          coordinates: [72.8315, 19.0166]
        }
      }
    ]);

    console.log('Database verification and seeding complete!');
  } catch (error) {
    console.error('Error seeding data:', error.message);
  }
};

module.exports = seedData;
