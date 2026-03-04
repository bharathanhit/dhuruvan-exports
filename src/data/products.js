import woodcraftsImg from '../assets/woodcrafts.jpg';
import waterImg from '../assets/water.jpeg';

// Rice Images
import basmati1 from '../assets/pasmati/3bf96918afed8aae47ec10c7099a3470.jpg';
import basmati2 from '../assets/pasmati/bfb94b8934e15f5529a44be1952cddcf.jpg';
import nonBasmati1 from '../assets/non pasmati/26864a111cb62d87147528c71d8a6ff1.jpg';

// Meat Images
import buffalo1 from '../assets/baffalo meat/6c0071e78766afe56c65f019f30ab2a6.jpg';

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
        description: 'Exquisitely handcrafted wooden furniture and decorative pieces reflecting India\'s rich artisan heritage.',
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
    {
        id: 'basmati-rice',
        title: 'Basmati Rice',
        category: 'Agro Products',
        categorySlug: 'agro-products',
        image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=1200',
        description: 'Long-grain, aromatic rice sourced from the foothills of the Himalayas.',
        badgeNote: 'Premium Selection',
        specifications: [
            { label: 'Origin', value: 'Himalayan Foothills' },
            { label: 'Grain Length', value: '8.35mm Average' },
            { label: 'Moisture', value: '12% Maximum' },
            { label: 'Broken', value: '2% Maximum' }
        ],
        varieties: [
            { title: 'Premium Long Grain', desc: 'Extra-long grains that expand up to 2.5 times when cooked.', img: basmati1 },
            { title: 'Traditional Himalayan Aroma', desc: 'Sourced directly from Himalayan farms with natural fragrance.', img: basmati2 }
        ]
    },
    {
        id: 'non-basmati-rice',
        title: 'Non-Basmati Rice',
        category: 'Agro Products',
        categorySlug: 'agro-products',
        image: 'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?auto=format&fit=crop&q=80&w=1200',
        description: 'High-quality Sona Masoori, Ponni, and IR64 varieties.',
        varieties: [
            { title: 'Sona Masoori & Ponni', desc: 'Lightweight and aromatic medium-grain rice.', img: nonBasmati1 }
        ]
    },
    {
        id: 'turmeric',
        title: 'Turmeric',
        category: 'Agro Products',
        categorySlug: 'agro-products',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNdGqBLaLcgceHppWww5JoO756aGlRWzVV1Q&s',
        description: 'Vibrant, high-curcumin turmeric fingers and powder.',
    },
    {
        id: 'black-white-pepper',
        title: 'Black & White Pepper',
        category: 'Agro Products',
        categorySlug: 'agro-products',
        image: 'https://images.unsplash.com/photo-1600728255690-edd070021d02?q=80&w=1163&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        description: 'Bold, aromatic black pepper and mild white pepper.',
    },
    {
        id: 'dry-fruits-nuts',
        title: 'Dry Fruits & Nuts',
        category: 'Agro Products',
        categorySlug: 'agro-products',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMsP3T4dVyy3DJv9JOevk9Le_2hRKuS0fNiA&s',
        description: 'Premium quality cashews, almonds, raisins, walnuts and more.',
    },
    {
        id: 'coconut',
        title: 'Coconut',
        category: 'Agro Products',
        categorySlug: 'agro-products',
        image: 'https://5.imimg.com/data5/NA/CB/MY-34697231/tender-coconut-500x500.jpg',
        description: 'Fresh and processed coconuts sourced directly from Indian coastal farms.',
    },
    {
        id: 'pappad-farfar',
        title: 'Pappad & Far Far',
        category: 'Agro Products',
        categorySlug: 'agro-products',
        image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&q=80&w=1200',
        description: 'Traditional Indian pappad and far far snacks.',
    },
    {
        id: 'jaggery',
        title: 'Jaggery',
        category: 'Agro Products',
        categorySlug: 'agro-products',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfAaxY5K67vJxy_KqZsvVJJCuGXwDWEpkIsg&s',
        description: 'Pure, natural jaggery made from fresh sugarcane juice.',
    },
    {
        id: 'buffalo-meat',
        title: 'Buffalo Meat',
        category: 'Livestock',
        categorySlug: 'livestock',
        image: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&q=80&w=1200',
        description: 'Premium frozen boneless buffalo meat.',
        status: 'Set Available',
        badgeNote: 'Halal Certified Export',
        isHalal: true,
        specifications: [
            { label: 'Type', value: 'Frozen Boneless' },
            { label: 'Fat Content', value: '95% Chemical Lean' },
            { label: 'Cut', value: 'Premium Forequarter' },
            { label: 'Certification', value: 'Halal Certified' }
        ],
        varieties: [
            { title: 'Premium Boneless Cuts', desc: 'Selected lean cuts processed under strict Halal standards.', img: buffalo1 }
        ]
    },
    {
        id: 'drinking-water',
        title: 'Drinking Water',
        category: 'Beverages',
        categorySlug: 'beverages',
        image: waterImg,
        description: 'Purified and mineral-enriched drinking water.',
        varieties: [
            { title: '7-Stage Purification', desc: 'Our mineral water undergoes RO, UV sterilization, and Ozonization.', img: water1 },
            { title: 'Mineral Enriched', desc: 'Enriched with Magnesium and Potassium.', img: water2 }
        ]
    },
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
            { label: 'Application', value: 'Nursery / Interior' }
        ]
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
            { label: 'Style', value: 'Pedestal' }
        ]
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
            { label: 'Durability', value: 'High Grade' }
        ]
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
            { label: 'Grade', value: 'Export Premium' }
        ]
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
            { label: 'Artisan', value: 'Hand Carved' }
        ]
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
            { label: 'Weave', value: 'Tight Wicker' }
        ]
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
            { label: 'Standard', value: 'Hospitality Grade' }
        ]
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
            { label: 'Base', value: 'Sturdy Rattan' }
        ]
    }
];
