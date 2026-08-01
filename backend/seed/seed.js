const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

// Load environment variables from backend directory
dotenv.config({ path: path.join(__dirname, '../.env') });

const connectDB = require('../config/db');

const Deity = require('../models/Deity');
const Mantra = require('../models/Mantra');
const Aarti = require('../models/Aarti');
const Festival = require('../models/Festival');
const Temple = require('../models/Temple');
const Chalisa = require('../models/Chalisa');

const readData = (filename) => {
    return JSON.parse(fs.readFileSync(path.join(__dirname, 'data', filename), 'utf8'));
};

const seed = async () => {
    try {
        await connectDB();
        console.log('Database connected for seeding.');

        // 1. Deities
        const deities = readData('deities.json');
        for (const deity of deities) {
            await Deity.updateOne(
                { slug: deity.slug },
                { $set: deity },
                { upsert: true }
            );
        }
        console.log(`Upserted ${deities.length} deities.`);

        // Create a map of slugs to deity IDs for linking other data
        const deityDocs = await Deity.find({});
        const deityMap = {};
        deityDocs.forEach(d => {
            deityMap[d.slug] = d._id;
        });

        // 2. Temples
        const temples = readData('temples.json');
        for (const temple of temples) {
            if (temple.deitySlug && deityMap[temple.deitySlug]) {
                temple.deityId = deityMap[temple.deitySlug];
            }
            // We can delete deitySlug before saving to avoid schema issues, 
            // but Mongoose typically ignores unmapped fields if strict mode is on.
            const templeCopy = { ...temple };
            delete templeCopy.deitySlug;
            
            await Temple.updateOne(
                { name: templeCopy.name },
                { $set: templeCopy },
                { upsert: true }
            );
        }
        console.log(`Upserted ${temples.length} temples.`);

        // 3. Mantras
        const mantras = readData('mantras.json');
        for (const mantra of mantras) {
            if (mantra.deitySlug && deityMap[mantra.deitySlug]) {
                mantra.deityId = deityMap[mantra.deitySlug];
            }
            const mantraCopy = { ...mantra };
            delete mantraCopy.deitySlug;

            await Mantra.updateOne(
                { title: mantraCopy.title },
                { $set: mantraCopy },
                { upsert: true }
            );
        }
        console.log(`Upserted ${mantras.length} mantras.`);

        // 4. Aartis
        const aartis = readData('aartis.json');
        for (const aarti of aartis) {
            if (aarti.deitySlug && deityMap[aarti.deitySlug]) {
                aarti.deityId = deityMap[aarti.deitySlug];
            }
            const aartiCopy = { ...aarti };
            delete aartiCopy.deitySlug;

            await Aarti.updateOne(
                { title: aartiCopy.title },
                { $set: aartiCopy },
                { upsert: true }
            );
        }
        console.log(`Upserted ${aartis.length} aartis.`);

        // 5. Chalisas
        const chalisas = readData('chalisas.json');
        for (const chalisa of chalisas) {
            if (chalisa.deitySlug && deityMap[chalisa.deitySlug]) {
                chalisa.deityId = deityMap[chalisa.deitySlug];
            }
            const chalisaCopy = { ...chalisa };
            delete chalisaCopy.deitySlug;

            await Chalisa.updateOne(
                { title: chalisaCopy.title },
                { $set: chalisaCopy },
                { upsert: true }
            );
        }
        console.log(`Upserted ${chalisas.length} chalisas.`);

        // 6. Festivals
        const festivals = readData('festivals.json');
        for (const festival of festivals) {
            if (festival.associatedDeitySlugs) {
                festival.associatedDeityIds = festival.associatedDeitySlugs
                    .map(slug => deityMap[slug])
                    .filter(id => id); // remove undefined
            }
            const festivalCopy = { ...festival };
            delete festivalCopy.associatedDeitySlugs;

            // Date objects need to be parsed from strings
            if (festivalCopy.date) {
                festivalCopy.date = new Date(festivalCopy.date);
            }

            await Festival.updateOne(
                { title: festivalCopy.title },
                { $set: festivalCopy },
                { upsert: true }
            );
        }
        console.log(`Upserted ${festivals.length} festivals.`);

        console.log('Seeding completed successfully!');
        process.exit(0);
    } catch (error) {
        console.error('Error during seeding:', error);
        process.exit(1);
    }
};

seed();
