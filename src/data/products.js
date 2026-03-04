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
        isHalal: true,
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
        id: 'woodcrafts',
        title: 'Woodcrafts',
        category: 'Woodcrafts',
        categorySlug: 'woodcrafts',
        image: woodcraftsImg,
        description: 'Exquisitely carved wooden furniture and decorative items.',
        link: '/wood-crafts'
    }
];
