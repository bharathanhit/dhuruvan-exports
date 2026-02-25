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
    }
];
