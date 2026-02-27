import waterImg from '../assets/water.jpeg';
import woodcraftsImg from '../assets/woodcrafts.jpg';

// Rice Images
import basmati1 from '../assets/pasmati/3bf96918afed8aae47ec10c7099a3470.jpg';
import basmati2 from '../assets/pasmati/bfb94b8934e15f5529a44be1952cddcf.jpg';

import nonBasmati1 from '../assets/non pasmati/26864a111cb62d87147528c71d8a6ff1.jpg';

// Meat Images
import buffalo1 from '../assets/baffalo meat/6c0071e78766afe56c65f019f30ab2a6.jpg';

// Water Images
import water1 from '../assets/water/2bd373bf4e9c47df0a817b9638a0eb06.jpg';
import water2 from '../assets/water/ce394517e738cbb4b992acac7dff0e30.jpg';


export const products = [
    {
        id: 'basmati-rice',
        title: 'Basmati Rice',
        brand: 'Himalayan Pearl',
        category: 'Agro Products',
        image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=1200',
        description: 'Long-grain, aromatic rice sourced from the foothills of the Himalayas. Known for its distinct fragrance and fluffy texture.',
        longDescription: 'Our Basmati Rice is the pinnacle of aromatic grains, cultivated in the mineral-rich soil of the Himalayan foothills. Each grain is aged to perfection to ensure the characteristic nutty flavor and non-sticky, fluffy texture that Basmati is famous for worldwide. Perfect for biryanis, pulaos, and gourmet side dishes.',
        specifications: [
            { label: 'Grain Length', value: '8.35 mm+' },
            { label: 'Moisture', value: '12% Max' },
            { label: 'Broken', value: '1% Max' },
            { label: 'Purity', value: '95%' }
        ],
        benefits: ['Extra Long Grain', 'Rich Aroma', 'Aged for 2 Years', 'Non-GMO'],
        varieties: [
            {
                title: "Premium Long Grain",
                desc: "Extra-long grains that expand up to 2.5 times when cooked, providing a magnificent appearance to your dishes.",
                img: basmati1
            },
            {
                title: "Traditional Himalayan Aroma",
                desc: "Sourced directly heightens your culinary experience with its natural fragrance and delicate taste.",
                img: basmati2
            }
        ]
    },
    {
        id: 'non-basmati-rice',
        title: 'Non-Basmati Rice',
        brand: 'Farm Fresh',
        category: 'Agro Products',
        image: 'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?auto=format&fit=crop&q=80&w=1200',
        description: 'High-quality Sona Masoori, Ponni, and IR64 varieties. Versatile and nutrition-rich grains for everyday consumption.',
        longDescription: 'We provide a wide range of premium non-basmati rice varieties including Sona Masoori, Ponni, and IR64. These grains are carefully processed to retain their nutritional value and natural taste. Ideal for daily meals, these varieties offer excellent cooking results and are available in various polishing levels to meet global demands.',
        specifications: [
            { label: 'Varieties', value: 'Sona Masoori, Ponni, IR64' },
            { label: 'Moisture', value: '14% Max' },
            { label: 'Broken', value: '5% Max' },
            { label: 'Shelf Life', value: '24 Months' }
        ],
        benefits: ['Pesticide Free', 'High Nutritional Value', 'Sorted and Cleaned', 'Bulk Packaging Available'],
        varieties: [
            {
                title: "Sona Masoori & Ponni",
                desc: "Lightweight and aromatic medium-grain rice. Known for its low starch content and ease of digestion.",
                img: nonBasmati1
            }
        ]
    },
    {
        id: 'buffalo-meat',
        title: 'Buffalo Meat',
        brand: 'Prime Halal',
        category: 'Livestock',
        image: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&q=80&w=1200',
        description: 'Premium frozen boneless buffalo meat. Processed under strict hygienic conditions and international safety standards.',
        longDescription: 'Dhuruvan Exports offers premium frozen boneless buffalo meat, sourced from healthy livestock and processed in state-of-the-art HACCP-certified facilities. Our meat is Halal certified and undergoes rigorous quality checks to ensure tenderness, flavor, and safety. We offer various cuts including silver side, top side, and knuckle.',
        isHalal: true,
        specifications: [
            { label: 'Freezing Type', value: 'I.Q.F. / Block Frozen' },
            { label: 'Storage Temp', value: '-18°C or below' },
            { label: 'Certification', value: 'Halal, ISO, HACCP' },
            { label: 'Fat Content', value: 'Low Fat' }
        ],
        benefits: ['100% Halal Certified', 'Antibiotic Free', 'Vacuum Packed', 'Traceable Sourcing'],
        varieties: [
            {
                title: "Premium Boneless Cuts",
                desc: "Selected lean cuts processed under strict Halal and hygienic standards, ensuring the highest meat quality for global export.",
                img: buffalo1
            }
        ]
    },
    {
        id: 'drinking-water',
        title: 'Drinking Water',
        brand: 'Aqua Pure',
        category: 'Beverages',
        image: waterImg,
        description: 'Purified and mineral-enriched drinking water. Packaged with advanced purification technology for crystal clarity.',
        longDescription: 'Our mineral water is sourced from pristine aquifers and undergoes a comprehensive 7-stage purification process including RO, UV sterilization, and Ozonization. Enriched with essential minerals like Magnesium and Potassium, it provides a refreshing taste and optimal hydration. Available in various sizes from 250ml to 20L.',
        specifications: [
            { label: 'PH Level', value: '7.2 - 7.8' },
            { label: 'TDS', value: '80 - 120 ppm' },
            { label: 'Purification', value: '7-Stage Process' },
            { label: 'Packaging', value: 'BPA-Free PET' }
        ],
        benefits: ['Ultra Purified', 'Mineral Enriched', 'Eco-friendly Bottles', 'Strict Quality Control'],
        varieties: [
            {
                title: "7-Stage Purification",
                desc: "Our mineral water is sourced from pristine aquifers and undergoes a comprehensive 7-stage purification process including RO, UV sterilization, and Ozonization.",
                img: water1
            },
            {
                title: "Mineral Enriched",
                desc: "Enriched with essential minerals like Magnesium and Potassium, it provides a refreshing taste and optimal hydration. Available in various sizes from 250ml to 20L.",
                img: water2
            }
        ]
    },
    {
        id: 'woodcrafts',
        title: 'Woodcrafts',
        category: 'Handicrafts',
        image: woodcraftsImg,
        description: 'Exquisitely carved wooden furniture and decorative items. Reflecting India\'s rich cultural heritage and craftsmanship.',
        longDescription: 'Our Woodcraft collection showcases the artistic brilliance of Indian artisans. From intricate Rattan furniture to hand-carved mahogany decor, each piece is a masterpiece of sustainable craftsmanship. We specialize in export-quality wicker and bamboo products that blend traditional designs with modern aesthetics.',
        specifications: [
            { label: 'Material', value: 'Rattan, Bamboo, Mahogany' },
            { label: 'Finish', value: 'Premium Lacquer/Wax' },
            { label: 'Type', value: 'Indoor & Outdoor' },
            { label: 'Customization', value: 'Available for Bulk' }
        ],
        benefits: ['Eco-friendly Materials', 'Handcrafted by Artisans', 'Durable and Aesthetic', 'Global Export Grade'],
        link: '/wood-crafts'
    },
    {
        id: 'indian-spices',
        title: 'Indian Spices',
        brand: 'Dhuruvan Gold',
        category: 'Agro Products',
        image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=1200',
        description: 'Authentic, hand-picked Indian spices. From Malabar black pepper to high-curcumin turmeric powder.',
        longDescription: 'Our spices are sourced directly from the finest plantations in Kerala and Tamil Nadu. We ensure a high concentration of essential oils and natural pigments. Available in whole, ground, or custom-blended forms, our spices are processed in ISO-certified facilities to maintain their potency and flavor profile for the global market.',
        specifications: [
            { label: 'Origin', value: 'Kerala, Tamil Nadu, Andhra' },
            { label: 'Form', value: 'Whole, Powder, Crushed' },
            { label: 'Moisture', value: '8-10% Max' },
            { label: 'Curcumin (Turmeric)', value: '3.5% - 5%' }
        ],
        benefits: ['High Essential Oil Content', 'Pesticide Free', 'Steam Sterilized', 'Custom Private Labeling'],
        varieties: [
            {
                title: "Malabar Black Pepper",
                desc: "Bold, sun-dried Tellicherry extra bold black pepper, harvested at peak maturity.",
                brand: "Tellicherry Gold"
            },
            {
                title: "High Curcumin Turmeric",
                desc: "Premium grade turmeric powder with high curcumin content for pharmaceutical and culinary use.",
                brand: "Turmeric Pure"
            }
        ]
    },
    {
        id: 'tea-coffee',
        title: 'Tea & Coffee',
        brand: 'Nilgiri Heights',
        category: 'Beverages',
        image: 'https://images.unsplash.com/photo-1594631252845-29fc4586d51c?auto=format&fit=crop&q=80&w=1200',
        description: 'Premium Nilgiri Tea and Araku Valley Coffee. Experience the rich heritage of Southern Indian plantations.',
        longDescription: 'We export the finest Orthodox and CTC teas from the Nilgiri hills, known for their bright liquor and floral aroma. Our coffee selection includes high-altitude Arabica and Robusta beans from the Araku Valley, hand-picked and expertly roasted to bring out complex flavor notes of dark chocolate and spice.',
        specifications: [
            { label: 'Type', value: 'Arabica, Robusta, Orthodox Tea' },
            { label: 'Elevation', value: '3500 - 6000 ft' },
            { label: 'Processing', value: 'Washed / Dry Processed' },
            { label: 'Grade', value: 'AAA, AA, Plantation A' }
        ],
        benefits: ['Shade Grown Coffee', 'Fresh Batch Roasting', 'Single Origin Options', 'Sustainable Sourcing'],
        varieties: [
            {
                title: "Araku Arabica Beans",
                desc: "Organic, medium-roast beans with a smooth body and fruity acidity.",
                brand: "Araku Valley Estate"
            },
            {
                title: "Nilgiri Orthodox Tea",
                desc: "Large leaf black tea with a signature brisk and floral character.",
                brand: "Blue Mountain Brew"
            }
        ]
    },
    {
        id: 'pulses-lentils',
        title: 'Pulses & Lentils',
        brand: 'Nature\'s Harvest',
        category: 'Agro Products',
        image: 'https://images.unsplash.com/photo-1515942400420-2b98fed1f515?auto=format&fit=crop&q=80&w=1200',
        description: 'Protein-rich lentils, chickpeas, and beans. Cleaned and color-sorted for premium quality.',
        longDescription: 'Dhuruvan Exports provides a wide array of premium pulses including Toor Dal, Moong Dal, Red Lentils, and Chickpeas. Our products undergo rigorous cleaning, de-stoning, and laser-color sorting to ensure 99.9% purity. We cater to wholesale distributors and retail brands globally with customized packaging solutions.',
        specifications: [
            { label: 'Purity', value: '99.9% Min' },
            { label: 'Foreign Matter', value: '0.1% Max' },
            { label: 'Moisture', value: '12% Max' },
            { label: 'Packaging', value: '500g to 50kg Bags' }
        ],
        benefits: ['Rich in Protein', 'Grown in Mineral Soil', 'Laser Cleaned', 'GMO-Free'],
        varieties: [
            {
                title: "Red Lentils (Masoor Dal)",
                desc: "Football and split varieties, polished or unpolished, high protein content.",
                brand: "Harvest Gold"
            },
            {
                title: "Kabuli Chickpeas",
                desc: "Large size bold chickpeas (8mm - 12mm) with creamy texture.",
                brand: "Premium Garbanzo"
            }
        ]
    },
    {
        id: 'essential-oils',
        title: 'Essential Oils',
        brand: 'Dhuruvan Aroma',
        category: 'Wellness',
        image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&q=80&w=1200',
        description: '100% pure and natural essential oils. Steam-distilled from high-quality botanical sources.',
        longDescription: 'Our essential oils are extracted through modern steam distillation and cold-press methods to preserve their therapeutic properties. We offer a wide range including Lemongrass, Peppermint, Sandalwood, and Eucalyptus oils. Perfect for aromatherapy, cosmetics, and food-grade applications.',
        specifications: [
            { label: 'Extraction', value: 'Steam Distillation' },
            { label: 'Purity', value: '100% Pure & Undiluted' },
            { label: 'Grade', value: 'Therapeutic / Food Grade' },
            { label: 'Packaging', value: 'Amber Glass / HDPE Drums' }
        ],
        benefits: ['No Synthetic Additives', 'Batch Tested', 'MSDS Certified', 'Custom Bottling Available'],
        varieties: [
            {
                title: "Sandalwood Oil",
                desc: "Pure Mysore Sandalwood oil with its signature woody and creamy fragrance.",
                brand: "Royal Sandal"
            },
            {
                title: "Eucalyptus Oil",
                desc: "High eucalyptol content, fresh and medicinal aroma, sourced from Nilgiri plantations.",
                brand: "Nilgiri Fresh"
            }
        ]
    },
    {
        id: 'premium-salts',
        title: 'Premium Salts',
        brand: 'Earth Crystal',
        category: 'Agro Products',
        image: 'https://images.unsplash.com/photo-1615485240384-58bc449400b7?auto=format&fit=crop&q=80&w=1200',
        description: 'Refined free-flow iodized salt and Himalayan pink crystals. Pure, mineral-rich, and globally certified.',
        longDescription: 'We provide triple-refined free-flow iodized salt processed through vacuum evaporated technology. Our Himalayan pink salt is ethically mined from pure mineral deposits, retaining 84 essential trace minerals. Available in fine powder and coarse crystal formats for diverse industrial and retail requirements.',
        specifications: [
            { label: 'NaCl Content', value: '99.5% Min' },
            { label: 'Iodine Content', value: '30-45 ppm' },
            { label: 'Purity', value: 'Extra White' },
            { label: 'Grain Size', value: '0.15mm - 0.85mm' }
        ],
        benefits: ['Triple Refined', 'Free Flowing', 'Mineral Rich', 'Global Safety Standards'],
        varieties: [
            {
                title: "Himalayan Pink Crystal",
                desc: "Authentic pink salt crystals, rich in trace minerals and free from environmental pollutants.",
                brand: "Pink Peak"
            },
            {
                title: "Vacuum Evaporated Salt",
                desc: "High-purity free-flow iodized salt for premium retail markets and specialty food processing.",
                brand: "Pure Cloud"
            }
        ]
    },
    {
        id: 'soya-products',
        title: 'Soya Products',
        brand: 'Protein Pro',
        category: 'Agro Products',
        image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=1200',
        description: 'High-protein soya chunks and granules. Non-GMO, versatile plant-based protein for global cuisines.',
        longDescription: 'Our soya products are processed from high-quality De-Oiled Cake (DOC) using advanced extrusion technology. They are 100% vegetarian, non-GMO, and have a meat-like texture when cooked. Highly nutritious and easy to store, they are an excellent protein alternative for international markets.',
        specifications: [
            { label: 'Protein Content', value: '52% Min' },
            { label: 'Fat Content', value: '0.5% Max' },
            { label: 'Fiber Content', value: '3.5% Max' },
            { label: 'Shape', value: 'Chunks, Granules, Mini-chunks' }
        ],
        benefits: ['Cholesterol Free', 'Easy to Digest', 'Long Shelf Life', 'Cost-Effective Protein'],
        varieties: [
            {
                title: "Soya Chunks (Big)",
                desc: "Spongy and juicy chunks that absorb flavors perfectly, ideal for curries and stews.",
                brand: "Veggie Bite"
            },
            {
                title: "Soya Granules",
                desc: "Fine granules used in stuffing, burger patties, and traditional meat-replacement dishes.",
                brand: "Granule Gold"
            }
        ]
    },
    {
        id: 'traditional-snacks',
        title: 'Traditional Snacks',
        brand: 'Desi Crunch',
        category: 'Agro Products',
        image: 'https://images.unsplash.com/photo-1628198650630-66449198865c?auto=format&fit=crop&q=80&w=1200',
        description: 'Gourmet Phool Makhana (Fox Nuts) and traditional Indian snacks. Roasted, flavored, and export-ready.',
        longDescription: 'We specialize in the export of premium Phool Makhana (Fox Nuts), hand-picked and cleaned to ensure the largest pop size. Along with makhana, we offer a range of traditional Indian savories including roasted pulses and spice-infused nuts. All products are processed with minimal oil and high-quality seasonings.',
        specifications: [
            { label: 'Makhana Size', value: '16mm - 20mm' },
            { label: 'Grade', value: 'AAA / Premium' },
            { label: 'Flavors', value: 'Salted, Cheese, Peri Peri, Turmeric' },
            { label: 'Packaging', value: 'Nitrogen Flushed Pouches' }
        ],
        benefits: ['Low Calorie', 'Antioxidant Rich', 'Gluten Free', 'Artisanal Preparation'],
        varieties: [
            {
                title: "Flavored Fox Nuts",
                desc: "Roasted and seasoned makhana in exclusive flavors for international health-conscious markets.",
                brand: "ZenFox"
            },
            {
                title: "Premium Raw Makhana",
                desc: "Highest grade large white makhana for bulk distributors and institutional buyers.",
                brand: "White Lotus"
            }
        ]
    }
];
