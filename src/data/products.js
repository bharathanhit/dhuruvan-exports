import woodcraftsImg from '../assets/woodcrafts.jpg';
import waterImg from '../assets/pouring-water.png';
import childrenImg from '../assets/children-water-bg.png';

// Rice Images
import basmati1 from '../assets/pasmati/3bf96918afed8aae47ec10c7099a3470.jpg';
import basmati2 from '../assets/pasmati/bfb94b8934e15f5529a44be1952cddcf.jpg';
import nonBasmati1 from '../assets/non pasmati/26864a111cb62d87147528c71d8a6ff1.jpg';

// Spice Images
import pepperImg from '../assets/spices/pepper.png';

// Meat Images

import buffaloTongue from '../assets/baffalo meat/buffalo_tongue.png';
import buffaloTail from '../assets/baffalo meat/buffalo_tail.png';
import chuckTender from '../assets/baffalo meat/chuck_tender.png';
import thickFlank from '../assets/baffalo meat/thick_flank.png';
import tripeOmasum from '../assets/baffalo meat/tripe_omasum.png';

// Water Images
import water1 from '../assets/water/2bd373bf4e9c47df0a817b9638a0eb06.jpg';
import water2 from '../assets/water/ce394517e738cbb4b992acac7dff0e30.jpg';


// Wood Images
import wood1 from '../assets/wood/WhatsApp Image 2026-02-22 at 5.57.59 PM.jpeg';
import wood2 from '../assets/wood/WhatsApp Image 2026-02-22 at 5.58.00 PM (1).jpeg';
import wood3 from '../assets/wood/WhatsApp Image 2026-02-22 at 5.58.00 PM.jpeg';
import wood4 from '../assets/wood/WhatsApp Image 2026-02-22 at 5.58.01 PM (1).jpeg';
import wood5 from '../assets/wood/WhatsApp Image 2026-02-22 at 5.58.01 PM.jpeg';
import wood6 from '../assets/wood/WhatsApp Image 2026-02-22 at 5.58.02 PM (1).jpeg';
import wood7 from '../assets/wood/WhatsApp Image 2026-02-22 at 5.58.02 PM (2).jpeg';
import wood8 from '../assets/wood/WhatsApp Image 2026-02-22 at 5.58.02 PM.jpeg';
import wood9 from '../assets/wood/WhatsApp Image 2026-02-22 at 5.58.03 PM.jpeg';

export const categories = [
    {                                              
        id: 'agro-products',
        title: 'Agro Products',
        slug: 'agro-products',
        description: 'Premium agricultural commodities — rice, spices, dry fruits & more — sourced from the finest farms across India.',
        image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=1200',
        color: '#16a34a',
        gradient: 'from-green-900 to-green-700',
    },
    {
        id: 'woodcrafts',
        title: 'Woodcrafts',
        slug: 'woodcrafts',
        description: "Exquisitely handcrafted wooden furniture and decorative pieces reflecting India's rich artisan heritage.",
        image: woodcraftsImg,
        color: '#92400e',
        gradient: 'from-amber-900 to-amber-700',
    },
    {
        id: 'livestock',
        title: 'Livestock',
        slug: 'livestock',
        description: 'Halal-certified premium frozen buffalo meat processed under international food safety standards.',
        image: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&q=80&w=1200',
        color: '#b91c1c',
        gradient: 'from-red-900 to-red-700',
    },
    {
        id: 'beverages',
        title: 'Beverages',
        slug: 'beverages',
        description: 'Ultra-purified, mineral-enriched drinking water packaged with advanced purification technology.',
        image: waterImg,
        color: '#0369a1',
        gradient: 'from-sky-900 to-sky-700',
    },
];

export const products = [
    // ── AGRO PRODUCTS ──────────────────────────────────────────────────
    {
        id: 'basmati-rice',
        title: 'Basmati Rice',
        order: -100,
        category: 'Agro Products',
        categorySlug: 'agro-products',
        image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=1200',
        description: 'Long-grain, aromatic rice sourced from the foothills of the Himalayas.',
        badgeNote: 'Premium Selection',
        specifications: [
            { label: 'Rice Size', value: 'Medium Grain' },
            { label: 'Purity', value: '95% – 99%' },
            { label: 'Moisture (%)', value: '13% Max' },
            { label: 'Shelf Life', value: '6 – 12 Months' },
            { label: 'Payment Terms', value: 'Refer Payment Terms Section' },
            { label: 'Supply Ability', value: '1500 Metric Tons per Month' },
            { label: 'Delivery Time', value: 'Depends on Destination Country' },
            { label: 'Pack Size (KG)', value: '1, 5, 10, 20, 25, 50' },
            { label: 'Packaging', value: 'PP Bags, Non Woven Bags, BOPP Bags, Jute Bags' },
            { label: 'Custom Packing & Labelling', value: 'Available' },
            { label: 'Unit of Measure', value: 'Metric Ton (MT)' },
            { label: 'Polishing', value: 'Well Polished' },
            { label: 'Broken %', value: '2% Max' },
            { label: 'Shipping', value: 'Global Shipping Available' },
        ],
        types: ['1121 Basmati Rice', 'Pusa Basmati Rice', '1509 Basmati Rice', 'Traditional Basmati Rice'],
        minimumOrder: '5 Metric Tons (MT)',
        varieties: [
            { title: 'Premium Long Grain', desc: 'Extra-long grains that expand up to 2.5 times when cooked.', img: basmati1 },
            { title: 'Traditional Himalayan Aroma', desc: 'Sourced directly from Himalayan farms with natural fragrance.', img: basmati2 }
        ]
    },
    {
        id: 'non-basmati-rice',
        title: 'Non-Basmati Rice',
        order: -99,
        category: 'Agro Products',
        categorySlug: 'agro-products',
        image: 'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?auto=format&fit=crop&q=80&w=1200',
        description: 'High-quality Sona Masoori, Ponni, and IR64 varieties.',
        specifications: [
            { label: 'Rice Size', value: 'Medium Grain' },
            { label: 'Purity', value: '95% – 99%' },
            { label: 'Moisture (%)', value: '13% Max' },
            { label: 'Shelf Life', value: '6 – 12 Months' },
            { label: 'Payment Terms', value: 'Refer Payment Terms Section' },
            { label: 'Supply Ability', value: '1500 Metric Tons per Month' },
            { label: 'Delivery Time', value: 'Depends on Destination Country' },
            { label: 'Pack Size (KG)', value: '1, 5, 10, 20, 25, 50' },
            { label: 'Packaging', value: 'PP Bags, Non Woven Bags, BOPP Bags, Jute Bags' },
            { label: 'Custom Packing & Labelling', value: 'Available' },
            { label: 'Unit of Measure', value: 'Metric Ton (MT)' },
            { label: 'Polishing', value: 'Well Polished' },
            { label: 'Broken %', value: '2% Max' },
            { label: 'Shipping', value: 'Global Shipping Available' },
        ],
        types: ['IR64 Rice', 'Sona Masoori Rice', 'Ponni Rice', 'PR11 Rice'],
        minimumOrder: '5 Metric Tons (MT)',
        varieties: [
            { title: 'Sona Masoori & Ponni', desc: 'Lightweight and aromatic medium-grain rice.', img: nonBasmati1 }
        ]
    },
    {
        id: 'turmeric',
        title: 'Turmeric',
        order: 100,
        category: 'Agro Products',
        categorySlug: 'agro-products',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNdGqBLaLcgceHppWww5JoO756aGlRWzVV1Q&s',
        description: 'Vibrant, high-curcumin turmeric fingers and powder.',
        specifications: [
            { label: 'Origin', value: 'India, Ethiopia, Myanmar' },
            { label: 'Curcumin', value: 'From 1% to 6%' },
            { label: 'Whole Turmeric Capacity', value: '300MT/day' },
            { label: 'Turmeric Powder Capacity', value: '80MT/day' },
            { label: 'Pack Size', value: '10g, 20g, 50g, 100g, 200g, 500g, 1kg, 5kg, 10kg, 25kg' },
            { label: 'Packaging Varieties', value: 'Mono Carton Boxes, Pouches, Zip lock Pouches, Plastic Pet Jar & Tin' },
            { label: 'Processing Journey', value: 'Sun Drying, Manual Pre Cleaning, Polishing, Sorting, De-Stoning, Grinding, Magnetic Separation, Sifting, Metal Separation, Packing' },
        ],
        types: ['Whole Fingers', 'Powder (Machine Ground)', 'Polished Fingers', 'Bulb Grade'],
        minimumOrder: '5 Metric Tons',
    },
    {
        id: 'black-white-pepper',
        title: 'Black & White Pepper',
        order: 101,
        category: 'Agro Products',
        categorySlug: 'agro-products',
        image: pepperImg,
        description: 'Bold, aromatic black pepper and mild white pepper tailored for performance and export readiness.',
        longDescription: 'We offer a wide range of pepper products tailored for performance and export readiness. Our products are sourced from the finest Indian origins and processed to meet international standards. These grades support diverse applications, from spice blends to food processing and seasoning solutions.',
        specifications: [
            { label: 'Origin', value: 'Indian Origin' },
            { label: 'Black Pepper Grades', value: '500 GL, 550 GL, 600 GL (Cleaned & Washed)' },
            { label: 'White Pepper Grades', value: '620 GL (Cleaned & Washed, Bleached & Unbleached)' },
            { label: 'Applications', value: 'Spice Blends, Food Processing, Seasoning Solutions' },
            { label: 'Capacity', value: 'Black/White Pepper Whole - 25 MT/day' },
            { label: 'Pack Sizes', value: '10g, 20g, 50g, 100g, 200g, 500g, 1kg, 5kg, 10kg, 25kg' },
            { label: 'Packaging Formats', value: 'Mono Carton Boxes, Pouches, Zip Lock Pouches, Plastic PET Jars & Tins' },
        ],
        types: [
            'Black Pepper (500 GL, 550 GL, 600 GL)',
            'White Pepper (620 GL)',
            'Cleaned & Washed',
            'Bleached & Unbleached',
            'Black Pepper Powder',
            'White Pepper Powder'
        ],
        minimumOrder: '2 Metric Tons',
        varieties: [
            { title: 'Black Pepper (Malabar/Indian)', desc: 'Bold, dark, and highly aromatic peppercorns in 500-600 GL grades.', img: pepperImg },
            { title: 'White Pepper (Export Grade)', desc: 'Refined 620 GL grade peepers available in bleached and unbleached varieties.', img: pepperImg }
        ]
    },
    {
        id: 'dry-fruits-nuts',
        title: 'Dry Fruits & Nuts',
        order: 102,
        category: 'Agro Products',
        categorySlug: 'agro-products',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMsP3T4dVyy3DJv9JOevk9Le_2hRKuS0fNiA&s',
        description: 'Premium quality cashews, almonds, raisins, walnuts and more.',
        specifications: [
            { label: 'Moisture', value: '8% Maximum' },
            { label: 'Purity', value: '99% Minimum' },
            { label: 'Packing', value: '10 kg / 25 kg Vacuum Bags' },
            { label: 'Origin', value: 'India / Afghanistan' },
        ],
        types: ['Raw Cashews (W240 / W320)', 'Roasted Cashews', 'Almonds (Whole / Split)', 'Raisins', 'Walnuts'],
        minimumOrder: '1 Metric Ton',
    },
    {
        id: 'coconut',
        title: 'Coconut',
        order: 103,
        category: 'Agro Products',
        categorySlug: 'agro-products',
        image: 'https://5.imimg.com/data5/NA/CB/MY-34697231/tender-coconut-500x500.jpg',
        description: 'Fresh and processed coconuts sourced directly from Indian coastal farms.',
        specifications: [
            { label: 'Origin', value: 'Kerala / Tamil Nadu, India' },
            { label: 'Grade', value: 'Export Quality A+' },
            { label: 'Packing', value: '100 / 200 pcs per Bag' },
            { label: 'Shelf Life', value: '45 – 60 Days' },
        ],
        types: ['Fresh Whole Coconut', 'Semi-Husked', 'Desiccated Coconut', 'Coconut Oil (Cold Pressed)'],
        minimumOrder: '10 Metric Tons',
    },
    {
        id: 'jaggery',
        title: 'Jaggery',
        order: 105,
        category: 'Agro Products',
        categorySlug: 'agro-products',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfAaxY5K67vJxy_KqZsvVJJCuGXwDWEpkIsg&s',
        description: 'Pure, natural jaggery made from fresh sugarcane juice, processed traditionally without chemicals.',
        badgeNote: 'Chemical Free',
        specifications: [
            { label: 'Sucrose Content', value: '70% – 80% Minimum' },
            { label: 'Moisture', value: '5% – 7% Maximum' },
            { label: 'Ash Content', value: '1% – 2% Maximum' },
            { label: 'Insoluble Matter', value: '1% Maximum' },
            { label: 'Reducing Sugar', value: '10% Maximum' },
            { label: 'Shelf Life', value: '12 Months' },
            { label: 'Color', value: 'Golden Yellow / Dark Brown' },
            { label: 'Texture', value: 'Solid Blocks / Free-Flowing Powder' },
            { label: 'Origin', value: 'Tamil Nadu / Maharashtra, India' },
            { label: 'Packing', value: '500g, 1kg, 10kg, 25kg, 50kg' },
            { label: 'Packaging Type', value: 'PP Bags / Corrugated Cartons / Vacuum Packs' },
            { label: 'Unit of Measure', value: 'Metric Ton (MT)' },
            { label: 'Shipping', value: 'Global Sea/Air Freight' },
        ],
        types: ['Bucket Jaggery (Blocks)', 'Organic Jaggery Powder', 'Palm Jaggery', 'Granulated Jaggery'],
        minimumOrder: '5 Metric Tons (MT)',
    },

    // ── LIVESTOCK ──────────────────────────────────────────────────────
    {
        id: 'frozen-buffalo-tongue',
        title: 'Frozen Buffalo Tongue',
        category: 'Livestock',
        categorySlug: 'livestock',
        image: buffaloTongue,
        description: 'Premium salted and frozen buffalo tongue.',
        badgeNote: 'Export Quality',
        isHalal: true,
        specifications: [
            { label: 'Product Type', value: 'Frozen Buffalo Meat' },
            { label: 'Processing Type', value: 'Halal Certified & Hygienically Processed' },
            { label: 'Shelf Life', value: '18 – 24 Months (at -18°C or Below)' },
            { label: 'Moisture', value: 'As Per Standard' },
            { label: 'Microbiological Standards', value: 'As Per International Export Standards' },
            { label: 'Packing Type', value: 'Vacuum Packed / Poly Bag Packing / Carton Box Packing' },
            { label: 'Net Weight per Carton', value: '20 Kg / 25 Kg (or as per requirement)' },
            { label: 'Labeling', value: 'Standard Export Label / Custom Label Available' },
            { label: 'Certifications', value: 'APEDA, Halal Certification, ISO Certification' },

            { label: 'Customization', value: 'Custom Cutting & Packing: Available' },
            { label: 'Delivery Time', value: 'Depends on Destination Country' },
            { label: 'Supply Ability', value: 'Up to 100 Metric Tons per Month' },
        ],
        types: ['Salted Frozen', 'Natural Frozen'],
        minimumOrder: '1 x 20 FT Container',
    },
    {
        id: 'frozen-buffalo-tail',
        title: 'Frozen Buffalo Tail',
        category: 'Livestock',
        categorySlug: 'livestock',
        image: buffaloTail,
        description: 'Choice frozen buffalo tail, perfectly trimmed.',
        badgeNote: 'Rich Flavor',
        isHalal: true,
        specifications: [
            { label: 'Product Type', value: 'Frozen Buffalo Meat' },
            { label: 'Processing Type', value: 'Halal Certified & Hygienically Processed' },
            { label: 'Shelf Life', value: '18 – 24 Months (at -18°C or Below)' },
            { label: 'Moisture', value: 'As Per Standard' },
            { label: 'Microbiological Standards', value: 'As Per International Export Standards' },
            { label: 'Packing Type', value: 'Vacuum Packed / Poly Bag Packing / Carton Box Packing' },
            { label: 'Net Weight per Carton', value: '20 Kg / 25 Kg (or as per requirement)' },
            { label: 'Labeling', value: 'Standard Export Label / Custom Label Available' },
            { label: 'Certifications', value: 'APEDA, Halal Certification, ISO Certification' },

            { label: 'Customization', value: 'Custom Cutting & Packing: Available' },
            { label: 'Delivery Time', value: 'Depends on Destination Country' },
            { label: 'Supply Ability', value: 'Up to 100 Metric Tons per Month' },
        ],
        types: ['Whole Frozen Tail', 'Cut Sections (Bone-In)'],
        minimumOrder: '1 x 20 FT Container',
    },
    {
        id: 'frozen-chuck-tender',
        title: 'Frozen Buffalo Chuck Tender',
        category: 'Livestock',
        categorySlug: 'livestock',
        image: chuckTender,
        description: 'Lean and tender frozen buffalo chuck tender.',
        badgeNote: 'Premium Cut',
        isHalal: true,
        specifications: [
            { label: 'Product Type', value: 'Frozen Buffalo Meat' },
            { label: 'Processing Type', value: 'Halal Certified & Hygienically Processed' },
            { label: 'Shelf Life', value: '18 – 24 Months (at -18°C or Below)' },
            { label: 'Moisture', value: 'As Per Standard' },
            { label: 'Microbiological Standards', value: 'As Per International Export Standards' },
            { label: 'Packing Type', value: 'Vacuum Packed / Poly Bag Packing / Carton Box Packing' },
            { label: 'Net Weight per Carton', value: '20 Kg / 25 Kg (or as per requirement)' },
            { label: 'Labeling', value: 'Standard Export Label / Custom Label Available' },
            { label: 'Certifications', value: 'APEDA, Halal Certification, ISO Certification' },

            { label: 'Customization', value: 'Custom Cutting & Packing: Available' },
            { label: 'Delivery Time', value: 'Depends on Destination Country' },
            { label: 'Supply Ability', value: 'Up to 100 Metric Tons per Month' },
        ],
        types: ['Frozen Boneless', 'Vacuum Packed', 'IQF (Individual Quick Frozen)'],
        minimumOrder: '1 x 20 FT Container',
    },
    {
        id: 'frozen-thick-flank',
        title: 'Frozen Buffalo Thick Flank',
        category: 'Livestock',
        categorySlug: 'livestock',
        image: thickFlank,
        description: 'High-quality frozen buffalo thick flank.',
        badgeNote: 'High Protein',
        isHalal: true,
        specifications: [
            { label: 'Product Type', value: 'Frozen Buffalo Meat' },
            { label: 'Processing Type', value: 'Halal Certified & Hygienically Processed' },
            { label: 'Shelf Life', value: '18 – 24 Months (at -18°C or Below)' },
            { label: 'Moisture', value: 'As Per Standard' },
            { label: 'Microbiological Standards', value: 'As Per International Export Standards' },
            { label: 'Packing Type', value: 'Vacuum Packed / Poly Bag Packing / Carton Box Packing' },
            { label: 'Net Weight per Carton', value: '20 Kg / 25 Kg (or as per requirement)' },
            { label: 'Labeling', value: 'Standard Export Label / Custom Label Available' },
            { label: 'Certifications', value: 'APEDA, Halal Certification, ISO Certification' },

            { label: 'Customization', value: 'Custom Cutting & Packing: Available' },
            { label: 'Delivery Time', value: 'Depends on Destination Country' },
            { label: 'Supply Ability', value: 'Up to 100 Metric Tons per Month' },
        ],
        types: ['Frozen Boneless', 'Chilled Boneless', 'Vacuum Packed'],
        minimumOrder: '1 x 20 FT Container',
    }, 
    {
        id: 'frozen-tripe-omasum',
        title: 'Frozen Buffalo Tripe/Omasum',
        category: 'Livestock',
        categorySlug: 'livestock',
        image: tripeOmasum,
        description: 'Cleaned and frozen buffalo tripe and omasum.',
        badgeNote: 'Cleaned & Frozen',
        isHalal: true,
        specifications: [
            { label: 'Product Type', value: 'Frozen Buffalo Meat' },
            { label: 'Processing Type', value: 'Halal Certified & Hygienically Processed' },
            { label: 'Shelf Life', value: '18 – 24 Months (at -18°C or Below)' },
            { label: 'Moisture', value: 'As Per Standard' },
            { label: 'Microbiological Standards', value: 'As Per International Export Standards' },
            { label: 'Packing Type', value: 'Vacuum Packed / Poly Bag Packing / Carton Box Packing' },
            { label: 'Net Weight per Carton', value: '20 Kg / 25 Kg (or as per requirement)' },
            { label: 'Labeling', value: 'Standard Export Label / Custom Label Available' },
            { label: 'Certifications', value: 'APEDA, Halal Certification, ISO Certification' },

            { label: 'Customization', value: 'Custom Cutting & Packing: Available' },
            { label: 'Delivery Time', value: 'Depends on Destination Country' },
            { label: 'Supply Ability', value: 'Up to 100 Metric Tons per Month' },
        ],
        types: ['Frozen Tripe (Rumen)', 'Frozen Omasum (Book Tripe)', 'Mixed (Tripe + Omasum)'],
        minimumOrder: '1 x 20 FT Container',
    },

    // ── BEVERAGES ──────────────────────────────────────────────────────
    {
        id: 'alkaline-drinking-water',
        title: 'Alkaline Enriched Drinking Water',
        category: 'Beverages',
        categorySlug: 'beverages',
        image: waterImg,
        description: 'Alkaline Water Enriched With Added Minerals, Electrolytes & Vitamin B12. Sourced from Borewell.',
        specifications: [
            { label: 'Source', value: 'Borewell' },
            { label: 'Purification', value: 'RO + Filtration + Alkaline Media Vessel + Dozing Pumps + UV + Ozonization + Filling & Packing' },
            { label: 'pH Value', value: 'Upto 8 pH' },
            { label: 'TDS Level', value: '90 - 110 mg/L' },
            { label: 'Shelf Life', value: '6 to 9 Months' },
            { label: 'Certifications', value: 'ISO 9001, Factory, Dept. of Metrology Central, Labour & MSME' },

            { label: 'Supply Ability', value: '2K Cases/Day, 2K 20L Jars/Day' },
            { label: 'Delivery Time', value: '1 Day Order In Advance' },
            { label: 'Custom Labeling/Branding', value: 'Available (Different Rates)' },
            { label: 'Packaging Options', value: 'Cartons & Shrink Packs' },
        ],
        types: [
            '500ml & 1Ltr PET Bottles Packs',
            '250ml, 500ml & 750ml Glass Bottles Packs',
            '20Ltrs Jars'
        ],
        minimumOrder: 'One Vehicle Full Load',
        varieties: [
            { title: 'Advanced Purification', desc: 'Undergoes RO, Alkaline Media Vessel, UV, and Ozonization.', img: water1 },
            { title: 'Mineral & Vitamin Enriched', desc: 'Enriched with added Minerals, Electrolytes & Vitamin B12.', img: water2 }
        ]
    },

    // ── WOODCRAFTS ─────────────────────────────────────────────────────
    {
        id: 'rattan-cradle',
        title: 'Rattan Baby Cradle Stand',
        category: 'Woodcrafts',
        categorySlug: 'woodcrafts',
        image: wood1,
        description: 'Handcrafted rattan cradle stand with elegant arched frame and wicker basket insert.',
        longDescription: 'Handcrafted rattan cradle stand with elegant arched frame and wicker basket insert. Perfect blend of artistry and function for nurseries.',
        badgeNote: 'Bestseller',
        specifications: [
            { label: 'Material', value: 'Natural Rattan' },
            { label: 'Craft', value: 'Hand Woven' },
            { label: 'Application', value: 'Nursery / Interior' },
            { label: 'Finish', value: 'Natural / Lacquered' },
        ],
        types: ['Natural Finish', 'White Lacquered', 'Stained Brown', 'Custom Color'],
        minimumOrder: '50 Pieces',
    },
    {
        id: 'wicker-stools',
        title: 'Wicker Pedestal Stools',
        category: 'Woodcrafts',
        categorySlug: 'woodcrafts',
        image: wood2,
        description: 'Intricately woven bamboo pedestal stools in a matching set of 3.',
        badgeNote: 'Set Available',
        specifications: [
            { label: 'Material', value: 'Bamboo Fiber' },
            { label: 'Count', value: 'Set of 3' },
            { label: 'Style', value: 'Pedestal' },
            { label: 'Finish', value: 'Natural / Stained' },
        ],
        types: ['Set of 3 (Standard)', 'Set of 2', 'Individual Piece', 'Custom Size'],
        minimumOrder: '20 Sets',
    },
    {
        id: 'hanging-swing',
        title: 'Hanging Swing Chair',
        category: 'Woodcrafts',
        categorySlug: 'woodcrafts',
        image: wood4,
        description: 'Stunning handcrafted hanging swing chair with dark mahogany rattan frame.',
        badgeNote: 'Export Favourite',
        specifications: [
            { label: 'Frame', value: 'Dark Mahogany Rattan' },
            { label: 'Seat', value: 'Intricate Wicker' },
            { label: 'Load Capacity', value: 'Up to 120 kg' },
            { label: 'Durability', value: 'High Grade' },
        ],
        types: ['With Cushion', 'Without Cushion', 'Round Frame', 'Teardrop Frame', 'Indoor Grade', 'Outdoor Grade'],
        minimumOrder: '20 Pieces',
    },
    {
        id: 'oval-sofa-set',
        title: 'Oval Sofa Set',
        category: 'Woodcrafts',
        categorySlug: 'woodcrafts',
        image: wood5,
        description: 'Full organic oval weave living room set — sofa, armchairs, and coffee table.',
        badgeNote: 'Full Set',
        specifications: [
            { label: 'Set Includes', value: 'Sofa + 2 Chairs + Table' },
            { label: 'Grade', value: 'Export Premium' },
            { label: 'Finish', value: 'Natural Rattan' },
            { label: 'Cushion', value: 'Custom Fabric Available' },
        ],
        types: ['Full Set (4-Piece)', 'Sofa Only', 'Chairs Only (Pair)', 'Indoor Grade', 'Hotel Grade'],
        minimumOrder: '10 Sets',
    },
    {
        id: 'peacock-chair',
        title: 'Rattan Peacock Chair',
        category: 'Woodcrafts',
        categorySlug: 'woodcrafts',
        image: wood6,
        description: 'Iconic peacock throne chair with mahogany rattan frame and wicker weave.',
        badgeNote: 'Iconic Design',
        specifications: [
            { label: 'Style', value: 'Peacock Throne' },
            { label: 'Artisan', value: 'Hand Carved' },
            { label: 'Frame', value: 'Mahogany Rattan' },
            { label: 'Load Capacity', value: 'Up to 100 kg' },
        ],
        types: ['Natural Rattan', 'White Lacquered', 'Gold Accent', 'Miniature (Decor)'],
        minimumOrder: '20 Pieces',
    },
    {
        id: 'storage-basket',
        title: 'Wicker Storage Baskets',
        category: 'Woodcrafts',
        categorySlug: 'woodcrafts',
        image: wood7,
        description: 'Natural tightly woven wicker storage baskets for home and retail.',
        badgeNote: 'Bulk Available',
        specifications: [
            { label: 'Utility', value: 'Retail / Decor' },
            { label: 'Weave', value: 'Tight Wicker' },
            { label: 'Sizes', value: 'S / M / L / XL' },
            { label: 'Handle', value: 'Rope / Rattan / None' },
        ],
        types: ['Small (20 cm)', 'Medium (30 cm)', 'Large (40 cm)', 'XL (50 cm)', 'Nesting Set (3-in-1)'],
        minimumOrder: '100 Pieces',
    },
    {
        id: 'lounge-sofa',
        title: 'Rattan Lounge Sofa',
        category: 'Woodcrafts',
        categorySlug: 'woodcrafts',
        image: wood8,
        description: 'Spacious three-seater rattan lounge sofa with deep-weave texture.',
        badgeNote: 'Hotel Grade',
        specifications: [
            { label: 'Capacity', value: '3-Seater' },
            { label: 'Standard', value: 'Hospitality Grade' },
            { label: 'Frame', value: 'Natural Rattan' },
            { label: 'Cushion', value: 'Custom Fabric Available' },
        ],
        types: ['2-Seater', '3-Seater', 'L-Shape Corner', 'With Ottoman', 'Indoor Grade', 'Outdoor Grade'],
        minimumOrder: '10 Pieces',
    },
    {
        id: 'egg-chair',
        title: 'Hanging Egg Chair',
        category: 'Woodcrafts',
        categorySlug: 'woodcrafts',
        image: wood9,
        description: 'Classic wicker hanging egg chair, cocoon-shaped with a sturdy frame.',
        badgeNote: 'Top Export',
        specifications: [
            { label: 'Design', value: 'Cocoon / Egg' },
            { label: 'Base', value: 'Sturdy Rattan' },
            { label: 'Load Capacity', value: 'Up to 110 kg' },
            { label: 'Hardware', value: 'Heavy Duty Steel Hook' },
        ],
        types: ['With Stand', 'Without Stand (Hanging Only)', 'With Cushion', 'Without Cushion', 'Mini Egg Chair'],
        minimumOrder: '20 Pieces',
    }
];
