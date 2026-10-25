export const DISHES = [
  {
    id: "burger",
    name: "The Prime Craft Burger",
    titlePrefix: "Artisanal Butcher Cut",
    tagline: "Prime Black Angus • Brioche Gold • 18M Cave-Aged Cheddar",
    price: 18.5,
    rating: 4.98,
    reviewsCount: 342,
    category: "burgers",
    calories: 820,
    prepTime: "12 - 14 Mins",
    spiceLevel: 2,
    dietary: ["100% Halal Prime Angus", "Farm Batavia Greens", "Daily Stone-Mill Brioche"],
    allergens: ["Gluten", "Dairy", "Sesame"],
    heroImage: "/images/dishes/burger_hero.webp",
    videoSrc: "/videos/burger_animation.mp4",
    frameCount: 60,
    framesFolder: "/frames/burger",
    accentColor: "#d97706",
    glowColor: "rgba(217, 119, 6, 0.35)",
    kineticWords: ["MAILLARD SEAR", "45° CHEDDAR MELT", "BRIOCHE GOLD", "SMOKE & FLAME"],
    motionTelemetry: { stackHeight: 135, thermal: "620°F", layers: 7, code: "BITE-BGR-01", pressure: "1.2 Bar" },
    description:
      "A masterwork of flame-seared Angus beef, melted vintage cheddar cascade, crisp hydroponic Batavia lettuce, and sweet heirloom tomato slices, crowned with butter-glazed brioche showered in roasted sesame seeds.",
    chefNotes:
      "Seared at 620°F on seasoned cast iron to seal in savory umami jus, then rested for 180 seconds on warmed oak before final assembly.",
    originStory: "Inspired by old-world Parisian bistros and heritage smokehouse craftsmanship.",
    customizations: [
      { id: "extra_cheese", name: "Double Aged Wisconsin Cheddar Melt", price: 2.5 },
      { id: "truffle_aioli", name: "Black Summer Truffle Garlic Aioli", price: 3.0 },
      { id: "bacon_jam", name: "Smoked Wagyu Bacon Jam", price: 3.5 },
      { id: "gluten_free_bun", name: "Artisanal GF Brioche Swap", price: 2.0 }
    ],
    portions: [
      { id: "single", name: "Single Prime (220g)", multiplier: 1.0 },
      { id: "double", name: "Double Stack Beast (440g)", multiplier: 1.55 },
      { id: "tasting_flight", name: "Chef's Tasting Trio", multiplier: 2.1 }
    ],
    flavorNotes: ["Deep Umami", "Smoke Char", "Buttery Brioche", "Sharp Tang"],
    ingredients: [
      {
        name: "Artisan Brioche Crown",
        detail: "Slow-fermented brioche glazed in sweet butter & roasted sesame seeds",
        origin: "Local Stone-Mill Bakery",
        stage: 0.85,
        badge: "Golden Baked"
      },
      {
        name: "Batavia Crisp Lettuce",
        detail: "Hydroponically grown cold-room greens, hand-picked daily",
        origin: "Greenhouse Valley Farms",
        stage: 0.65,
        badge: "Crisp & Clean"
      },
      {
        name: "Heirloom Tomato & Shallots",
        detail: "Vine-ripened San Marzano beefsteaks with caramelized purple shallot rings",
        origin: "Sonoma Organic Orchards",
        stage: 0.5,
        badge: "Farm Fresh"
      },
      {
        name: "Sharp Melted Cheddar",
        detail: "18-month cave-aged Wisconsin sharp cheddar, melted to 45° cascade",
        origin: "Wisconsin Heritage Dairy",
        stage: 0.35,
        badge: "Cave Aged"
      },
      {
        name: "Flame-Kissed Angus Patty",
        detail: "Coarse ground chuck & brisket blend seasoned with smoked hickory salt",
        origin: "Creekstone Prime Angus",
        stage: 0.2,
        badge: "620°F Sear"
      },
      {
        name: "Secret Umami Emulsion",
        detail: "Whisked egg yolk, Dijon, roasted garlic puree, and black summer truffle oil",
        origin: "House Recipe",
        stage: 0.05,
        badge: "Signature Blend"
      }
    ],
    layers3D: [
      { name: "Toasted Brioche Base", y: -1.2, color: 0xd99b52, height: 0.35 },
      { name: "Truffle Umami Sauce", y: -0.85, color: 0xdeb887, height: 0.1 },
      { name: "Prime Black Angus Patty", y: -0.4, color: 0x4a2a18, height: 0.45 },
      { name: "Melted Sharp Cheddar", y: 0.05, color: 0xffaa00, height: 0.15 },
      { name: "Purple Onions & Heirloom Tomato", y: 0.45, color: 0xd93829, height: 0.25 },
      { name: "Batavia Curly Lettuce", y: 0.85, color: 0x48bb78, height: 0.2 },
      { name: "Golden Brioche Crown & Sesame", y: 1.35, color: 0xd99b52, height: 0.55 }
    ]
  },
  {
    id: "pizza",
    name: "Napoli Fire Artisan Pizza",
    titlePrefix: "Wood-Fired Heritage",
    tagline: "48-Hour Sourdough • San Marzano D.O.P • Fior di Latte",
    price: 22.0,
    rating: 4.96,
    reviewsCount: 289,
    category: "pizza",
    calories: 940,
    prepTime: "10 - 12 Mins",
    spiceLevel: 2,
    dietary: ["48-Hour Cold Ferment", "Italian D.O.P. Ingredients", "Wood-Fired (900°F)"],
    allergens: ["Gluten", "Dairy"],
    heroImage: "/images/dishes/pizza_hero.webp",
    videoSrc: "/videos/pizza_animation.mp4",
    frameCount: 60,
    framesFolder: "/frames/pizza",
    accentColor: "#b45309",
    glowColor: "rgba(180, 83, 9, 0.35)",
    kineticWords: ["WOOD-FIRED 900°", "SAN MARZANO D.O.P.", "AIRY CORNICIONE", "SWEET BASIL"],
    motionTelemetry: { stackHeight: 38, thermal: "900°F", layers: 5, code: "BITE-PIZ-02", pressure: "2.4 Bar" },
    description:
      "Hand-stretched sourdough with leopard-spotted char from our 900°F volcanic stone oven. Bathed in crushed sweet San Marzano tomatoes, stringy molten Fior di Latte mozzarella, cured artisanal pepperoni, and aromatic Genovese sweet basil leaves.",
    chefNotes:
      "Our dough undergoes a 48-hour cold fermentation giving an airy, blistered cornicione that crunches on the outside while staying pillow-soft within.",
    originStory: "Handed down from Master Pizzaiolos in Naples, refined with stone-ground heritage wheat.",
    customizations: [
      { id: "burrata_crown", name: "Whole Creamy Burrata Center", price: 4.5 },
      { id: "hot_honey", name: "Calabrian Chili Infused Hot Honey", price: 2.0 },
      { id: "truffle_oil", name: "White Truffle Finishing Drizzle", price: 3.0 },
      { id: "extra_pepperoni", name: "Crispy Cupped Pepperoni Double", price: 3.5 }
    ],
    portions: [
      { id: "personal", name: "10\" Personal Craft", multiplier: 0.85 },
      { id: "classic", name: "13\" Napoli Signature", multiplier: 1.0 },
      { id: "grande", name: "16\" Grand Feast", multiplier: 1.45 }
    ],
    flavorNotes: ["Sweet Tomato Acidity", "Smoky Char", "Rich Mozzarella Cream", "Basil Herbaceous"],
    ingredients: [
      {
        name: "Genovese Sweet Basil",
        detail: "Fragrant sweet basil leaves plucked minutes before presentation",
        origin: "Liguria Certified Seed",
        stage: 0.9,
        badge: "Fresh Plucked"
      },
      {
        name: "Curled Artisanal Pepperoni",
        detail: "Naturally cured pork salume with Hungarian paprika and smoked garlic",
        origin: "Heritage Charcuterie",
        stage: 0.7,
        badge: "Crispy Cup"
      },
      {
        name: "Fior di Latte Mozzarella",
        detail: "Fresh whole milk pulled curds that melt into creamy, stretchy pools",
        origin: "Campania D.O.P.",
        stage: 0.5,
        badge: "Fresh Curd"
      },
      {
        name: "San Marzano D.O.P. Coulis",
        detail: "Crushed volcanic soil plum tomatoes with sea salt and extra virgin olive oil",
        origin: "Valle del Sarno, Italy",
        stage: 0.25,
        badge: "Volcanic Soil"
      },
      {
        name: "48-Hour Leavened Crust",
        detail: "Italian Tipo 00 flour with wild starter, hand-stretched with airy cornicione",
        origin: "Neapolitan Heritage Mother",
        stage: 0.05,
        badge: "Wood-Fired 900°"
      }
    ],
    layers3D: [
      { name: "Wood-Fired Crust Base", y: -0.9, color: 0xdeb887, height: 0.3 },
      { name: "San Marzano Tomato Sauce", y: -0.5, color: 0xcc2914, height: 0.15 },
      { name: "Melted Fior di Latte Mozzarella", y: -0.1, color: 0xfff8dc, height: 0.2 },
      { name: "Artisanal Pepperoni & Olives", y: 0.35, color: 0xa8281e, height: 0.2 },
      { name: "Bell Pepper Rings & Sweet Basil", y: 0.85, color: 0x228b22, height: 0.25 }
    ]
  },
  {
    id: "biryani",
    name: "Shahi Dum Basmati Biryani",
    titlePrefix: "Royal Mughal Tradition",
    tagline: "24-Karat Saffron • Aged Imperial Basmati • Charcoal Dum Sealed",
    price: 24.0,
    rating: 4.99,
    reviewsCount: 412,
    category: "biryani",
    calories: 890,
    prepTime: "15 - 18 Mins",
    spiceLevel: 3,
    dietary: ["100% Halal Tender Chicken", "Pure Cow Ghee Prepared", "Gluten-Free Recipe"],
    allergens: ["Dairy (Ghee/Yogurt)", "Tree Nuts (Garnish)"],
    heroImage: "/images/dishes/biryani_hero.webp",
    videoSrc: "/videos/biryani_animation.mp4",
    frameCount: 60,
    framesFolder: "/frames/biryani",
    accentColor: "#c28e46",
    glowColor: "rgba(194, 142, 70, 0.35)",
    kineticWords: ["ROYAL DUM SEAL", "24K SAFFRON GRAINS", "MALABAR SPICE AROMA", "BRASS HANDI"],
    motionTelemetry: { stackHeight: 155, thermal: "380°F", layers: 5, code: "BITE-BIR-03", pressure: "1.8 Bar" },
    description:
      "A royal banquet tradition. Premium extra-long basmati rice grains steeped in Kashmiri saffron milk, layered over succulent chicken thighs braised in a 16-spice masala, sealed with dough (Dum Pukht) in a hammered copper handi pot.",
    chefNotes:
      "Slow cooked on glowing charcoal embers so the rice steams entirely in the aromatic vapors of the spiced meat marinade without losing a single drop of fragrance.",
    originStory: "Inspired by the royal kitchens of the Nizams of Hyderabad and Awadh.",
    customizations: [
      { id: "extra_saffron_rice", name: "Saffron Basmati Extra Portion", price: 4.0 },
      { id: "burani_raita", name: "Smoked Garlic Burani Raita & Salan", price: 3.0 },
      { id: "roasted_cashews", name: "Golden Fried Cashews & Raisins", price: 2.5 },
      { id: "spicy_mirchi_salan", name: "Hyderabadi Mirchi ka Salan", price: 3.5 }
    ],
    portions: [
      { id: "royal_single", name: "Shahi Handi for 1 (with 2 drumsticks)", multiplier: 1.0 },
      { id: "darbar_double", name: "Darbar Platter for 2 (with 4 drumsticks)", multiplier: 1.8 },
      { id: "dawat_feast", name: "Dawat Royal Family Feast (4-5 Guests)", multiplier: 3.2 }
    ],
    flavorNotes: ["Warm Saffron", "Cardamom Floral", "Caramelized Shallot", "Rich Dum Steam"],
    ingredients: [
      {
        name: "Crispy Caramelized Birista",
        detail: "Golden thin-sliced shallots fried in pure A2 cow ghee until sweet and crunchy",
        origin: "House Ghee Fried",
        stage: 0.9,
        badge: "Crispy Crunch"
      },
      {
        name: "Whole Spice Crown",
        detail: "Vietnamese star anise, green cardamom pods, cassia cinnamon bark, black cloves",
        origin: "Malabar Coast Spiceries",
        stage: 0.75,
        badge: "16-Spice Blend"
      },
      {
        name: "Kashmiri Saffron Basmati",
        detail: "Aged 2-year imperial extra-long grain rice soaked in Mogra saffron milk",
        origin: "Himalayan Foothills",
        stage: 0.5,
        badge: "2-Year Aged"
      },
      {
        name: "Dum Marinated Chicken",
        detail: "Tender chicken thighs steeped in spiced hung curd, ginger garlic paste & mint",
        origin: "Free-Range Farm Poultry",
        stage: 0.25,
        badge: "Dum Braised"
      },
      {
        name: "Hammered Brass Handi",
        detail: "Traditional heavy-bottomed vessel providing even, radiant heat circulation",
        origin: "Artisanal Metalworkers",
        stage: 0.05,
        badge: "Slow Dum Pot"
      }
    ],
    layers3D: [
      { name: "Hammered Brass Handi Vessel", y: -1.1, color: 0xb8860b, height: 0.4 },
      { name: "Spiced Masala Chicken Cuts", y: -0.65, color: 0x8b4513, height: 0.4 },
      { name: "Golden Saffron Basmati Layer", y: -0.15, color: 0xffd700, height: 0.35 },
      { name: "Pearly Long-Grain Basmati Rice", y: 0.35, color: 0xfffff0, height: 0.35 },
      { name: "Star Anise, Cinnamon & Herbs", y: 0.85, color: 0x556b2f, height: 0.25 }
    ]
  },
  {
    id: "pasta",
    name: "Tartufo Fettuccine Alfredo",
    titlePrefix: "Italian High Gastronomy",
    tagline: "Bronze-Cut Fettuccine • Umbrian Black Truffle • 24M Parmigiano",
    price: 21.5,
    rating: 4.97,
    reviewsCount: 318,
    category: "pasta",
    calories: 760,
    prepTime: "11 - 13 Mins",
    spiceLevel: 1,
    dietary: ["Vegetarian Friendly", "Organic Bronze-Die Pasta", "Imported Parmigiano"],
    allergens: ["Gluten", "Dairy", "Eggs"],
    heroImage: "/images/dishes/pasta_hero.webp",
    videoSrc: "/videos/pasta_animation.mp4",
    frameCount: 60,
    framesFolder: "/frames/pasta",
    accentColor: "#d97706",
    glowColor: "rgba(217, 119, 6, 0.35)",
    kineticWords: ["BRONZE-DIE TWIST", "TRUFFLE VELOUTÉ", "24M PARMA SNOW", "AL DENTE PURITY"],
    motionTelemetry: { stackHeight: 88, thermal: "195°F", layers: 5, code: "BITE-PAS-04", pressure: "0.8 Bar" },
    description:
      "Hand-twirled golden fettuccine extruded through traditional bronze dies. Swathed in an emulsified velvet velouté of cultured butter, heavy cream, shaved Umbrian black summer truffles, and a snowfall of 24-month aged Parmigiano-Reggiano.",
    chefNotes:
      "The sauce is emulsified with starchy pasta cooking water right in the serving pan to create an unbroken, glossy liaison that clings to every ribbon without heaviness.",
    originStory: "Born in the hill towns of Umbria during the peak autumn truffle harvest.",
    customizations: [
      { id: "extra_truffle", name: "Fresh Table-Shaved Black Truffle", price: 5.5 },
      { id: "grilled_shrimp", name: "Garlic Butter Jumbo Tiger Prawns", price: 6.0 },
      { id: "parmesan_wheel", name: "Extra Snow 24-Mo Parmigiano", price: 2.5 },
      { id: "chili_flakes", name: "Calabrian Sun-Dried Pepper Flakes", price: 1.0 }
    ],
    portions: [
      { id: "primi", name: "Primi Portion (160g)", multiplier: 0.8 },
      { id: "classico", name: "Signature Main (250g)", multiplier: 1.0 },
      { id: "abbondante", name: "Grande Tavola (400g)", multiplier: 1.5 }
    ],
    flavorNotes: ["Earthy Truffle", "Creamy Butter", "Nutty Parmesan", "Fresh Cracked Pepper"],
    ingredients: [
      {
        name: "Fresh Sweet Italian Basil",
        detail: "Tender basil tops providing aromatic sweet contrast to rich cream",
        origin: "Lombardy Herb Gardens",
        stage: 0.9,
        badge: "Fresh Herb"
      },
      {
        name: "Snow of 24M Parmigiano",
        detail: "Microplane-grated Parmigiano-Reggiano, aged for crystal crunch",
        origin: "Parma, Italy D.O.P.",
        stage: 0.7,
        badge: "24-Month Aged"
      },
      {
        name: "Umbrian Black Truffle Cream",
        detail: "Slow simmered heavy cream, cultured sweet butter, and black truffle pate",
        origin: "Umbria Forest Harvest",
        stage: 0.45,
        badge: "Summer Truffle"
      },
      {
        name: "Bronze-Cut Fettuccine Nest",
        detail: "Semolina and pasture-raised whole eggs, bronze extruded for micro-texture",
        origin: "Handcrafted In-House",
        stage: 0.2,
        badge: "Bronze Die Extruded"
      },
      {
        name: "Matte Slate Ceramic Dish",
        detail: "Pre-warmed artisan stoneware keeping the emulsified liaison at ideal temp",
        origin: "Studio Ceramicist",
        stage: 0.05,
        badge: "Warmed Stoneware"
      }
    ],
    layers3D: [
      { name: "Artisan Ceramic Bowl", y: -1.0, color: 0x1f242d, height: 0.35 },
      { name: "Bronze-Cut Fettuccine Nest", y: -0.5, color: 0xf5deb3, height: 0.45 },
      { name: "Silky Truffle Alfredo Velouté", y: -0.05, color: 0xfffff0, height: 0.25 },
      { name: "Shaved 24M Parmigiano Snow", y: 0.4, color: 0xfdf5e6, height: 0.2 },
      { name: "Fresh Genovese Basil Leaves", y: 0.85, color: 0x2e8b57, height: 0.2 }
    ]
  }
];

// Complete BiteVerse Extended Gourmet Catalogue
export const EXTENDED_CATALOGUE = [
  {
    id: "mutton_biryani",
    name: "Nizami Mutton Dum Biryani",
    category: "biryani",
    price: 27.5,
    rating: 4.98,
    prepTime: "18 Mins",
    calories: 960,
    spiceLevel: 3,
    heroImage: "/images/dishes/biryani_hero.webp",
    description: "Tender fall-off-the-bone baby mutton shanks slow-braised with caramel shallots and whole spices, sealed under Mogra saffron basmati."
  },
  {
    id: "wagyu_burger",
    name: "Smoked Wagyu Truffle Melt",
    category: "burgers",
    price: 24.0,
    rating: 4.97,
    prepTime: "14 Mins",
    calories: 890,
    spiceLevel: 1,
    heroImage: "/images/dishes/burger_hero.webp",
    description: "A5 Japanese Wagyu patty with black truffle butter, caramelized shallot compote, and Gruyère cheese on buttered brioche."
  },
  {
    id: "burrata_pizza",
    name: "Truffle Burrata & Wild Funghi Pizza",
    category: "pizza",
    price: 25.0,
    rating: 4.95,
    prepTime: "12 Mins",
    calories: 880,
    spiceLevel: 1,
    heroImage: "/images/dishes/pizza_hero.webp",
    description: "Wood-fired crust with garlic confit base, roasted wild foraged mushrooms, creamy Puglia burrata, and white truffle oil."
  },
  {
    id: "chili_noodles",
    name: "Hand-Pulled Chili Garlic Biang Biang",
    category: "pasta",
    price: 19.5,
    rating: 4.94,
    prepTime: "10 Mins",
    calories: 720,
    spiceLevel: 4,
    heroImage: "/images/dishes/pasta_hero.webp",
    description: "Wide hand-pulled ribbon noodles scalded with hot smoking garlic chili oil, dark black vinegar, and fresh baby bok choy."
  },
  {
    id: "brioche_sandwich",
    name: "Artisanal Brioche Club Sandwich",
    category: "sandwiches",
    price: 17.0,
    rating: 4.91,
    prepTime: "8 Mins",
    calories: 640,
    spiceLevel: 1,
    heroImage: "/images/dishes/burger_hero.webp",
    description: "Triple-layer toasted brioche with smoked turkey breast, avocado, butter lettuce, and herb mustard emulsion."
  },
  {
    id: "falafel_wrap",
    name: "Smoked Falafel & Lamb Shawarma Wrap",
    category: "sandwiches",
    price: 16.5,
    rating: 4.93,
    prepTime: "9 Mins",
    calories: 690,
    spiceLevel: 2,
    heroImage: "/images/dishes/burger_hero.webp",
    description: "Warm stone-baked flatbread wrapped with crispy herb falafel, charred spiced lamb shavings, and tahini drizzle."
  },
  {
    id: "chocolate_fondant",
    name: "Warm Molten Dark Chocolate Fondant",
    category: "desserts",
    price: 14.5,
    rating: 4.99,
    prepTime: "10 Mins",
    calories: 520,
    spiceLevel: 1,
    heroImage: "/images/dishes/burger_hero.webp",
    description: "70% Valrhona dark chocolate cake with a molten liquid ganache center, dusted with gold leaf and Madagascar vanilla gelato."
  },
  {
    id: "tres_leches",
    name: "Saffron Pistachio Tres Leches",
    category: "desserts",
    price: 13.5,
    rating: 4.96,
    prepTime: "6 Mins",
    calories: 460,
    spiceLevel: 1,
    heroImage: "/images/dishes/pasta_hero.webp",
    description: "Pillow-soft sponge cake soaked in three saffron-infused milks, topped with toasted Iranian slivered pistachios."
  },
  {
    id: "bourbon_gelato",
    name: "Bourbon Vanilla Bean Gelato",
    category: "drinks",
    price: 11.0,
    rating: 4.95,
    prepTime: "4 Mins",
    calories: 320,
    spiceLevel: 1,
    heroImage: "/images/dishes/pasta_hero.webp",
    description: "Slow-churned pasture milk infused with oak-aged Kentucky bourbon and scraped Tahitian vanilla bean pods."
  },
  {
    id: "rose_sherbet",
    name: "Royal Saffron Rose Sherbet",
    category: "drinks",
    price: 9.5,
    rating: 4.98,
    prepTime: "3 Mins",
    calories: 180,
    spiceLevel: 1,
    heroImage: "/images/dishes/biryani_hero.webp",
    description: "Chilled organic Damask rose petals steeped with Kashmiri saffron strands, basil seeds, and sparkling spring water."
  }
];

export const BRAND_CONFIG = {
  name: "BiteVerse",
  tagline: "Cinematic Gastronomy in Warm Dimension",
  motto: "The Art of Culinary Architecture",
  description:
    "An editorial culinary platform where gastronomic engineering meets cinematic dimension. Every recipe is dissected, seasoned, and transformed in warm ivory elegance.",
  palette: {
    background: "#0d0e12",
    canvas: "#fdfbf7",
    cardSurface: "#f8f5ee",
    textPrimary: "#1c1917",
    textSecondary: "#44403c",
    goldAccent: "#d97706",
    caramelDark: "#b45309"
  },
  contact: {
    address: "742 Gastronomy Way, Manhattan, NY 10012",
    phone: "+1 (800) 942-BITE",
    email: "concierge@biteverse.com",
    hours: "Mon - Sun: 11:30 AM — 11:00 PM"
  },
  stats: [
    { value: "48h", label: "Fermentation Time", detail: "Natural sourdough leavening" },
    { value: "620°F", label: "Flame Sear Temp", detail: "High-heat Maillard crust" },
    { value: "100%", label: "Artisanal Scratch", detail: "Zero frozen ingredients" },
    { value: "4.98★", label: "Culinary Rating", detail: "Over 1,600 verified reviews" }
  ]
};
