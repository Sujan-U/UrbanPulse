// js/products.js
// Urban Pulse Apparel – Product Catalog
// Last updated: February 2026

const products = [

  // 1 – Pulse Oversized Hoodie (single color)
  {
    id: 1,
    name: "Pulse Oversized Hoodie",
    price: 89.00,
    category: "hoodies",
    material: "380gsm heavyweight cotton/poly blend",
    fit: "Oversized / relaxed",
    description: "Signature oversized hoodie in premium heavyweight fleece. Dropped shoulders, double-lined hood, ribbed cuffs & hem, tonal Pulse embroidery on chest. Built for layering in Sydney's cooler months or lazy street days. Streetwear essential that gets better with age.",
    rating: 4.9,
    reviews: 142,
    isNew: true,
    isFeatured: true,
    stockStatus: "In Stock",
    tags: ["hoodie", "winter", "best-seller", "signature", "oversized", "fleece"],
    variants: {
      colors: [
        {
          name: "Black",
          hex: "#000000",
          images: [
            "p1-model.jpg",
            "p1-front.jpg"
          ]
        }
      ],
      sizes: ["S", "M", "L", "XL", "XXL"]
    },
    stock: { "S": 12, "M": 8, "L": 5, "XL": 9, "XXL": 3 }
  },

  // 2 – Skyline Graphic Tee (multiple colors)
  {
    id: 2,
    name: "Skyline Graphic Tee",
    price: 45.00,
    category: "tees",
    material: "180gsm premium combed cotton",
    fit: "Relaxed / slightly cropped",
    description: "Soft premium cotton tee featuring a subtle Sydney skyline graphic in tonal lime fade. Relaxed fit with a slight crop — pairs perfectly with cargos or joggers. Everyday essential with that Inner West edge. Pre-shrunk, soft-hand print.",
    rating: 4.7,
    reviews: 98,
    isNew: false,
    stockStatus: "Low Stock",
    tags: ["tee", "graphic", "summer", "everyday", "t-shirt", "street"],
    variants: {
      colors: [
        {
          name: "White",
          hex: "#ffffff",
          images: [
            "p2-white-model.jpg",
            "p2-white-front.jpg"
          ]
        },
        {
          name: "Red",
          hex: "#c8102e",
          images: [
            "p2-red-model.jpg",
            "p2-red-front.jpg"
          ]
        }
      ],
      sizes: ["S", "M", "L", "XL"]
    },
    stock: { "S": 18, "M": 14, "L": 9, "XL": 6 }
  },

  // 3 – Essential Crewneck (single color)
  {
    id: 3,
    name: "Essential Crewneck Sweatshirt",
    price: 69.00,
    category: "sweatshirts",
    material: "320gsm mid-weight brushed fleece",
    fit: "Relaxed / true to size",
    description: "Clean, minimalist crewneck in mid-weight brushed fleece. No logos, no fuss — just premium comfort for everyday layering. Ideal for Sydney's unpredictable weather. Timeless piece you'll reach for daily.",
    rating: 4.8,
    reviews: 85,
    isNew: false,
    stockStatus: "In Stock",
    tags: ["sweatshirt", "crewneck", "minimal", "layering", "all-season"],
    variants: {
      colors: [
        {
          name: "Charcoal",
          hex: "#333333",
          images: [
            "p3-model.jpg",
            "p3-front.jpg"
          ]
        }
      ],
      sizes: ["S", "M", "L", "XL"]
    },
    stock: { "S": 15, "M": 11, "L": 7, "XL": 4 }
  },

  // 4 – Urban Cargo Joggers (multiple colors)
  {
    id: 4,
    name: "Urban Cargo Joggers",
    price: 79.00,
    category: "bottoms",
    material: "Heavyweight cotton twill with stretch",
    fit: "Relaxed tapered",
    description: "Tapered cargo joggers with contrast stitching, multiple utility pockets, elastic waist with drawcord. Relaxed through the thigh, tapered ankle. Built for movement — beach to street, day to night. Sydney streetwear staple.",
    rating: 4.6,
    reviews: 67,
    isNew: true,
    stockStatus: "Low Stock",
    tags: ["joggers", "cargo", "utility", "street", "versatile", "pants"],
    variants: {
      colors: [
        {
          name: "Navy",
          hex: "#0a2342",
          images: [
            "p4-navy-model.jpg",
            "p4-navy-front.jpg"
          ]
        },
        {
          name: "Olive",
          hex: "#4a7043",
          images: [
            "p4-olive-model.jpg",
            "p4-olive-front.jpg"
          ]
        }
      ],
      sizes: ["S", "M", "L", "XL"]
    },
    stock: { "S": 8, "M": 5, "L": 4, "XL": 2 }
  },

  // 5 – Pulse Dad Cap (multiple colors – fixed your "Black" typo)
  {
    id: 5,
    name: "Pulse Dad Cap",
    price: 39.00,
    category: "accessories",
    material: "100% cotton twill",
    fit: "Adjustable snapback",
    description: "Low-profile dad cap with embroidered Pulse logo. Soft unstructured crown, adjustable snapback. Perfect finishing touch for any outfit — subtle Sydney street energy in every detail.",
    rating: 4.5,
    reviews: 54,
    isNew: false,
    stockStatus: "In Stock",
    tags: ["cap", "dad cap", "headwear", "minimal", "essential", "hat"],
    variants: {
      colors: [
        {
          name: "Olive",
          hex: "#556b2f",
          images: [
            "p5-olive-model.jpg",
            "p5-olive-front.jpg"
          ]
        },
        {
          name: "Pink",
          hex: "#ff69b4",
          images: [
            "p5-pink-model.jpg",
            "p5-pink-front.jpg"
          ]
        }
      ],
      sizes: ["One Size"]
    },
    stock: { "One Size": 25 }
  },

  // 6 – Black Slim Jeans (single color)
  {
    id: 6,
    name: "Black Slim Denim Jeans",
    price: 89.00,
    category: "bottoms",
    material: "98% cotton, 2% elastane",
    fit: "Slim tapered",
    description: "Black slim-fit jeans with subtle stretch for all-day comfort. Clean lines, minimal distressing. Versatile enough for dressed-up or casual looks — pairs perfectly with hoodies or track jackets.",
    rating: 4.7,
    reviews: 72,
    isNew: false,
    stockStatus: "In Stock",
    tags: ["jeans", "denim", "slim", "street", "versatile", "pants"],
    variants: {
      colors: [
        {
          name: "Black",
          hex: "#000000",
          images: [
            "p6-model.jpg",
            "p6-front.jpg"
          ]
        }
      ],
      sizes: ["28", "30", "32", "34"]
    },
    stock: { "28": 6, "30": 10, "32": 8, "34": 5 }
  },

  // 7 – Relaxed Oversized Tee (multiple colors)
  {
    id: 7,
    name: "Relaxed Oversized Tee",
    price: 44.99,
    category: "tees",
    material: "220gsm heavy cotton",
    fit: "Oversized / boxy",
    description: "Ultra-soft heavyweight cotton oversized tee. Dropped shoulders, longer body length — perfect blank canvas for layering or standalone street style. Built to fade beautifully over time.",
    rating: 4.8,
    reviews: 103,
    isNew: true,
    stockStatus: "In Stock",
    tags: ["tee", "t-shirt", "oversized", "blank", "layering", "street"],
    variants: {
      colors: [
        {
          name: "White",
          hex: "#ffffff",
          images: [
            "p7-white-model.jpg",
            "p7-white-front.jpg"
          ]
        },
        {
          name: "Black",
          hex: "#000000",
          images: [
            "p7-black-model.jpg",
            "p7-black-front.jpg"
          ]
        }
      ],
      sizes: ["S", "M", "L", "XL"]
    },
    stock: { "S": 14, "M": 12, "L": 9, "XL": 5 }
  },

  // 8 – Heavyweight Essential Hoodie (single color)
  {
    id: 8,
    name: "Heavyweight Essential Hoodie",
    price: 99.00,
    category: "hoodies",
    material: "400gsm ultra-heavy cotton fleece",
    fit: "Oversized",
    description: "Ultra-premium heavyweight hoodie for those who want the thickest, warmest option. Double-lined hood, reinforced stitching. The ultimate cozy piece for Sydney winter nights or airport runs.",
    rating: 4.9,
    reviews: 131,
    isNew: false,
    stockStatus: "Low Stock",
    tags: ["hoodie", "winter", "premium", "cozy", "fleece", "oversized"],
    variants: {
      colors: [
        {
          name: "Grey",
          hex: "#4a4a4a",
          images: [
            "p8-model.jpg",
            "p8-front.jpg"
          ]
        }
      ],
      sizes: ["S", "M", "L", "XL"]
    },
    stock: { "S": 7, "M": 5, "L": 4, "XL": 3 }
  },

  // 9 – Signature Sweatpants (multiple colors)
  {
    id: 9,
    name: "Signature Sweatpants",
    price: 64.99,
    category: "bottoms",
    material: "320gsm cotton fleece",
    fit: "Relaxed straight leg",
    description: "Soft brushed fleece sweatpants with drawcord waist and cuffed ankles. Clean lines, no loud logos — effortless comfort for lounging or casual street looks. Pairs perfectly with oversized tees or hoodies.",
    rating: 4.7,
    reviews: 89,
    isNew: false,
    stockStatus: "In Stock",
    tags: ["sweatpants", "loungewear", "comfy", "neutral", "pants"],
    variants: {
      colors: [
        {
          name: "Beige",
          hex: "#d9c2a6",
          images: [
            "p9-beige-model.jpg",
            "p9-beige-front.jpg"
          ]
        },
        {
          name: "Grey",
          hex: "#808080",
          images: [
            "p9-grey-model.jpg",
            "p9-grey-front.jpg"
          ]
        }
      ],
      sizes: ["S", "M", "L", "XL"]
    },
    stock: { "S": 10, "M": 8, "L": 6, "XL": 4 }
  },

  // 10 – Reversible Bucket Hat (single color – reversible feature)
  {
    id: 10,
    name: "Reversible Bucket Hat",
    price: 34.99,
    category: "accessories",
    material: "100% cotton canvas",
    fit: "One size – adjustable toggle",
    description: "Reversible bucket hat — black on one side, subtle contrast lining on the reverse. Packable, lightweight, UV-protective. Instant street style upgrade for sunny Sydney days.",
    rating: 4.6,
    reviews: 48,
    isNew: true,
    stockStatus: "In Stock",
    tags: ["bucket hat", "hat", "headwear", "reversible", "summer", "accessory"],
    variants: {
      colors: [
        {
          name: "Black / Contrast",
          hex: "#000000",
          images: [
            "p10-model.jpg",
            "p10-front.jpg"
          ]
        }
      ],
      sizes: ["One Size"]
    },
    stock: { "One Size": 22 }
  },

  // 11 – Pulse Hoodie (single color)
  {
    id: 11,
    name: "Pulse Hoodie",
    price: 89.00,
    category: "hoodies",
    material: "380gsm cotton blend",
    fit: "Oversized",
    description: "Bold red variation of our signature Pulse hoodie. Heavyweight fleece, relaxed fit, signature embroidery. Statement piece for those who want to stand out on the streets.",
    rating: 4.8,
    reviews: 76,
    isNew: false,
    stockStatus: "Low Stock",
    tags: ["hoodie", "bold", "statement", "limited", "fleece", "red"],
    variants: {
      colors: [
        {
          name: "Red",
          hex: "#c8102e",
          images: [
            "p11-model.jpg",
            "p11-front.jpg"
          ]
        }
      ],
      sizes: ["S", "M", "L", "XL"]
    },
    stock: { "S": 9, "M": 7, "L": 5, "XL": 3 }
  },

  // 12 – Pulse Track Jacket (single color)
  {
    id: 12,
    name: "Pulse Track Jacket",
    price: 109.99,
    category: "outerwear",
    material: "Lightweight nylon with mesh lining",
    fit: "Regular / slightly cropped",
    description: "Retro-inspired track jacket in deep navy. Lightweight yet durable, zip front, ribbed cuffs & hem. Perfect transitional layer for Sydney's variable weather — sporty meets street.",
    rating: 4.7,
    reviews: 62,
    isNew: true,
    stockStatus: "In Stock",
    tags: ["track jacket", "jacket", "sporty", "transitional", "retro", "outerwear"],
    variants: {
      colors: [
        {
          name: "Navy",
          hex: "#0a2342",
          images: [
            "p12-model.jpg",
            "p12-front.jpg"
          ]
        }
      ],
      sizes: ["S", "M", "L", "XL"]
    },
    stock: { "S": 6, "M": 5, "L": 4, "XL": 2 }
  },

  // 13 – Urban Pulse Cap (multiple colors)
  {
    id: 13,
    name: "Urban Pulse Cap",
    price: 55.00,
    category: "accessories",
    material: "200gsm cotton",
    fit: "Relaxed",
    description: "Elevate your everyday look with the Urban Pulse Signature Dad Cap, a staple piece designed for those who move with the rhythm of the city featuring our iconic blue heart-and-pulse embroidery.",
    rating: 4.9,
    reviews: 62,
    isNew: true,
    stockStatus: "In Stock",
    tags: ["cap", "dad cap", "headwear", "signature", "accessory", "hat"],
    variants: {
      colors: [
        {
          name: "Black",
          hex: "#000000",
          images: [
            "p13-black-model.jpg",
            "p13-black-front.jpg"
          ]
        },
        {
          name: "White",
          hex: "#ffffff",
          images: [
            "p13-white-model.jpg",
            "p13-white-front.jpg"
          ]
        }
      ],
      sizes: ["One Size"]
    },
    stock: { "One Size": 20 }
  }
];

window.products = products;