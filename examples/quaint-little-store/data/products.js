/**
 * @typedef {Object} Product
 * @property {string} name - The name of the product.
 * @property {string} image - The image URL of the product.
 * @property {string} description - The description of the product.
 * @property {string} category - The category of the product.
 * @property {number} price - The price of the product.
 * @property {number} quantity - The quantity of the product.
 */

/**
 * List of products available for sale.
 * @type {Product[]}
 */
const products = [
  {
    name: 'Mystery Box',
    image: '/images/mystery-box.png',
    description: 'A box full of surprises. What will you get?',
    category: 'Novelty',
    price: 19.99,
    quantity: 50,
  },
  {
    name: 'Retro Game Console',
    image: '/images/retro-game-console.png',
    description: 'Play all your favorite classic games.',
    category: 'Electronics',
    price: 59.99,
    quantity: 30,
  },
  {
    name: 'Vintage Lamp',
    image: '/images/vintage-lamp.png',
    description: 'Add a touch of old-world charm to any room.',
    category: 'Home Decor',
    price: 24.99,
    quantity: 15,
  },
  {
    name: 'Gourmet Coffee Beans',
    image: '/images/gourmet-coffee-beans.png',
    description: 'Rich and aromatic coffee beans from Colombia.',
    category: 'Food & Drink',
    price: 12.49,
    quantity: 100,
  },
  {
    name: 'Handcrafted Soap',
    image: '/images/handcrafted-soap.png',
    description: 'All-natural soap with essential oils.',
    category: 'Bath & Body',
    price: 8.99,
    quantity: 75,
  },
  {
    name: 'Wireless Earbuds',
    image: '/images/wireless-earbuds.png',
    description: 'Crystal clear sound with no wires.',
    category: 'Electronics',
    price: 29.99,
    quantity: 60,
  },
  {
    name: 'Yoga Mat',
    image: '/images/yoga-mat.png',
    description: 'Eco-friendly mat for all your yoga needs.',
    category: 'Fitness',
    price: 22.49,
    quantity: 40,
  },
  {
    name: 'Scented Candles',
    image: '/images/scented-candles.png',
    description: 'Relaxing candles with various fragrances.',
    category: 'Home Decor',
    price: 14.99,
    quantity: 80,
  },
  {
    name: 'Puzzle Set',
    image: '/images/puzzle-set.png',
    description: 'Challenging puzzles for hours of fun.',
    category: 'Toys & Games',
    price: 16.99,
    quantity: 45,
  },
  {
    name: 'Reusable Water Bottle',
    image: '/images/reusable-water-bottle.png',
    description: 'Stay hydrated on the go.',
    category: 'Outdoors',
    price: 18.99,
    quantity: 90,
  },
  {
    name: 'Novelty Mug',
    image: '/images/novelty-mug.png',
    description: 'A fun mug to brighten your mornings.',
    category: 'Kitchen',
    price: 9.99,
    quantity: 65,
  },
  {
    name: 'Smartwatch',
    image: '/images/smartwatch.png',
    description: 'Keep track of your fitness and notifications.',
    category: 'Electronics',
    price: 89.99,
    quantity: 25,
  },
  {
    name: 'Throw Blanket',
    image: '/images/throw-blanket.png',
    description: 'Cozy and warm blanket for chilly nights.',
    category: 'Home Decor',
    price: 34.99,
    quantity: 35,
  },
  {
    name: 'Bluetooth Speaker',
    image: '/images/bluetooth-speaker.png',
    description: 'Portable speaker with excellent sound quality.',
    category: 'Electronics',
    price: 39.99,
    quantity: 55,
  },
  {
    name: 'Gardening Kit',
    image: '/images/gardening-kit.png',
    description: 'Everything you need to start your garden.',
    category: 'Outdoors',
    price: 26.99,
    quantity: 50,
  },
  {
    name: 'Board Game',
    image: '/images/board-game.png',
    description: 'Classic game for family and friends.',
    category: 'Toys & Games',
    price: 29.99,
    quantity: 40,
  },
  {
    name: 'Graphic T-Shirt',
    image: '/images/graphic-t-shirt.png',
    description: 'Stylish t-shirt with a cool graphic.',
    category: 'Apparel',
    price: 19.99,
    quantity: 70,
  },
  {
    name: 'Essential Oil Diffuser',
    image: '/images/essential-oil-diffuser.png',
    description: 'Create a relaxing atmosphere with essential oils.',
    category: 'Home Decor',
    price: 24.99,
    quantity: 45,
  },
  {
    name: 'Cookbook',
    image: '/images/cookbook.png',
    description: 'Delicious recipes for every occasion.',
    category: 'Books',
    price: 15.99,
    quantity: 50,
  },
  {
    name: 'Travel Backpack',
    image: '/images/travel-backpack.png',
    description: 'Durable backpack for all your travels.',
    category: 'Outdoors',
    price: 49.99,
    quantity: 30,
  },
  {
    name: 'Sunglasses',
    image: '/images/sunglasses.png',
    description: 'Stylish shades to protect your eyes.',
    category: 'Accessories',
    price: 14.99,
    quantity: 60,
  },
  {
    name: 'Desk Organizer',
    image: '/images/desk-organizer.png',
    description: 'Keep your workspace tidy.',
    category: 'Office Supplies',
    price: 17.99,
    quantity: 55,
  },
  {
    name: 'Electric Kettle',
    image: '/images/electric-kettle.png',
    description: 'Quickly boil water for tea or coffee.',
    category: 'Kitchen',
    price: 29.99,
    quantity: 40,
  },
  {
    name: 'Fitness Tracker',
    image: '/images/fitness-tracker.png',
    description: 'Monitor your activity and sleep.',
    category: 'Fitness',
    price: 49.99,
    quantity: 35,
  },
  {
    name: 'Beard Grooming Kit',
    image: '/images/beard-grooming-kit.png',
    description: 'Everything you need to keep your beard in top shape.',
    category: 'Bath & Body',
    price: 21.99,
    quantity: 25,
  },
  {
    name: 'Leather Wallet',
    image: '/images/leather-wallet.png',
    description: 'Sleek and durable wallet.',
    category: 'Accessories',
    price: 24.99,
    quantity: 45,
  },
  {
    name: 'Pet Bed',
    image: '/images/pet-bed.png',
    description: 'Comfortable bed for your furry friend.',
    category: 'Pet Supplies',
    price: 34.99,
    quantity: 20,
  },
  {
    name: 'Instant Camera',
    image: '/images/instant-camera.png',
    description: 'Capture and print memories instantly.',
    category: 'Electronics',
    price: 59.99,
    quantity: 15,
  },
  {
    name: 'Ceramic Vase',
    image: '/images/ceramic-vase.png',
    description: 'Beautiful vase for your flowers.',
    category: 'Home Decor',
    price: 19.99,
    quantity: 50,
  },
  {
    name: 'Portable Charger',
    image: '/images/portable-charger.png',
    description: 'Never run out of battery on the go.',
    category: 'Electronics',
    price: 22.99,
    quantity: 70,
  },
  {
    name: 'Kitchen Knife Set',
    image: '/images/kitchen-knife-set.png',
    description: 'Sharp and durable knives for all your cooking needs.',
    category: 'Kitchen',
    price: 49.99,
    quantity: 25,
  },
  {
    name: 'Hammock',
    image: '/images/hammock.png',
    description: 'Relax and unwind outdoors.',
    category: 'Outdoors',
    price: 39.99,
    quantity: 20,
  },
  {
    name: 'Face Mask',
    image: '/images/face-mask.png',
    description: 'Protective mask for everyday use.',
    category: 'Health',
    price: 9.99,
    quantity: 100,
  },
  {
    name: 'Portable Fan',
    image: '/images/portable-fan.png',
    description: 'Stay cool wherever you go.',
    category: 'Electronics',
    price: 14.99,
    quantity: 65,
  },
  {
    name: 'Wine Opener',
    image: '/images/wine-opener.png',
    description: 'Easily open your favorite bottle of wine.',
    category: 'Kitchen',
    price: 18.99,
    quantity: 45,
  },
  {
    name: 'Notebook Set',
    image: '/images/notebook-set.png',
    description: 'Jot down your thoughts and ideas.',
    category: 'Office Supplies',
    price: 12.99,
    quantity: 80,
  },
  {
    name: 'Photo Frame',
    image: '/images/photo-frame.png',
    description: 'Display your cherished memories.',
    category: 'Home Decor',
    price: 9.99,
    quantity: 60,
  },
  {
    name: 'Camping Tent',
    image: '/images/camping-tent.png',
    description: 'Durable tent for your outdoor adventures.',
    category: 'Outdoors',
    price: 89.99,
    quantity: 10,
  },
  {
    name: 'Electric Toothbrush',
    image: '/images/electric-toothbrush.png',
    description: 'Keep your teeth clean and healthy.',
    category: 'Health',
    price: 29.99,
    quantity: 50,
  },
  {
    name: 'Running Shoes',
    image: '/images/running-shoes.png',
    description: 'Comfortable and supportive shoes for running.',
    category: 'Fitness',
    price: 79.99,
    quantity: 35,
  },
  {
    name: 'Coffeemaker',
    image: '/images/coffeemaker.png',
    description: 'Brew your favorite coffee at home.',
    category: 'Kitchen',
    price: 59.99,
    quantity: 20,
  },
  {
    name: 'Waterproof Jacket',
    image: '/images/waterproof-jacket.png',
    description: 'Stay dry in any weather.',
    category: 'Apparel',
    price: 69.99,
    quantity: 25,
  },
  {
    name: 'Laptop Stand',
    image: '/images/laptop-stand.png',
    description: 'Ergonomic stand for your laptop.',
    category: 'Office Supplies',
    price: 29.99,
    quantity: 40,
  },
  {
    name: 'Portable Grill',
    image: '/images/portable-grill.png',
    description: 'Grill on the go with this compact grill.',
    category: 'Outdoors',
    price: 49.99,
    quantity: 15,
  },
  {
    name: 'Bluetooth Headphones',
    image: '/images/bluetooth-headphones.png',
    description: 'Wireless headphones with great sound.',
    category: 'Electronics',
    price: 39.99,
    quantity: 30,
  },
  {
    name: 'Digital Thermometer',
    image: '/images/digital-thermometer.png',
    description: 'Accurate and quick temperature readings.',
    category: 'Health',
    price: 14.99,
    quantity: 70,
  },
  {
    name: 'Picnic Blanket',
    image: '/images/picnic-blanket.png',
    description: 'Perfect for outdoor picnics.',
    category: 'Outdoors',
    price: 24.99,
    quantity: 35,
  },
  {
    name: 'Memory Foam Pillow',
    image: '/images/memory-foam-pillow.png',
    description: 'Comfortable pillow for a good sleep.',
    category: 'Home Decor',
    price: 29.99,
    quantity: 50,
  },
  {
    name: 'Travel Mug',
    image: '/images/travel-mug.png',
    description: 'Keep your drinks hot or cold on the go.',
    category: 'Kitchen',
    price: 14.99,
    quantity: 60,
  },
  {
    name: 'Wireless Mouse',
    image: '/images/wireless-mouse.png',
    description: 'Smooth and responsive mouse for your computer.',
    category: 'Electronics',
    price: 19.99,
    quantity: 45,
  },
  {
    name: 'Bathrobe',
    image: '/images/bathrobe.png',
    description: 'Luxurious robe for relaxing at home.',
    category: 'Apparel',
    price: 39.99,
    quantity: 20,
  },
  {
    name: 'Bike Lock',
    image: '/images/bike-lock.png',
    description: 'Secure your bike with this sturdy lock.',
    category: 'Outdoors',
    price: 22.99,
    quantity: 35,
  },
  {
    name: 'Desk Lamp',
    image: '/images/desk-lamp.png',
    description: 'Brighten your workspace with this lamp.',
    category: 'Home Decor',
    price: 19.99,
    quantity: 40,
  },
  {
    name: 'Barbecue Tool Set',
    image: '/images/barbecue-tool-set.png',
    description: 'Tools for your grilling needs.',
    category: 'Outdoors',
    price: 34.99,
    quantity: 25,
  },
  {
    name: 'Electric Blanket',
    image: '/images/electric-blanket.png',
    description: 'Stay warm with this heated blanket.',
    category: 'Home Decor',
    price: 59.99,
    quantity: 15,
  },
  {
    name: 'Smart Light Bulb',
    image: '/images/smart-light-bulb.png',
    description: 'Control your lighting with your phone.',
    category: 'Electronics',
    price: 14.99,
    quantity: 60,
  },
  {
    name: 'Robot Vacuum',
    image: '/images/robot-vacuum.png',
    description: 'Automatic vacuum for hassle-free cleaning.',
    category: 'Electronics',
    price: 199.99,
    quantity: 10,
  },
  {
    name: 'Wine Glass Set',
    image: '/images/wine-glass-set.png',
    description: 'Elegant glasses for enjoying wine.',
    category: 'Kitchen',
    price: 29.99,
    quantity: 50,
  },
  {
    name: 'Pet Toy',
    image: '/images/pet-toy.png',
    description: 'Fun toy to keep your pet entertained.',
    category: 'Pet Supplies',
    price: 9.99,
    quantity: 70,
  },
  {
    name: 'Ice Cream Maker',
    image: '/images/ice-cream-maker.png',
    description: 'Make your own ice cream at home.',
    category: 'Kitchen',
    price: 49.99,
    quantity: 20,
  },
  {
    name: 'Smart Thermostat',
    image: '/images/smart-thermostat.png',
    description: 'Control the temperature remotely.',
    category: 'Electronics',
    price: 129.99,
    quantity: 15,
  },
  {
    name: 'Hiking Boots',
    image: '/images/hiking-boots.png',
    description: 'Durable boots for all your hikes.',
    category: 'Outdoors',
    price: 79.99,
    quantity: 25,
  },
  {
    name: 'Camera Tripod',
    image: '/images/camera-tripod.png',
    description: 'Stable tripod for your photography needs.',
    category: 'Electronics',
    price: 34.99,
    quantity: 30,
  },
  {
    name: 'Gaming Chair',
    image: '/images/gaming-chair.png',
    description: 'Comfortable chair for long gaming sessions.',
    category: 'Furniture',
    price: 149.99,
    quantity: 20,
  },
  {
    name: 'Shower Speaker',
    image: '/images/shower-speaker.png',
    description: 'Waterproof speaker for the shower.',
    category: 'Electronics',
    price: 19.99,
    quantity: 50,
  },
  {
    name: 'Juicer',
    image: '/images/juicer.png',
    description:
      'Extract fresh juice from your favorite fruits and vegetables.',
    category: 'Kitchen',
    price: 39.99,
    quantity: 35,
  },
  {
    name: 'VR Headset',
    image: '/images/vr-headset.png',
    description: 'Immerse yourself in virtual reality.',
    category: 'Electronics',
    price: 299.99,
    quantity: 10,
  },
  {
    name: 'Yoga Block',
    image: '/images/yoga-block.png',
    description: 'Support and deepen your yoga practice.',
    category: 'Fitness',
    price: 9.99,
    quantity: 60,
  },
  {
    name: 'Waffle Maker',
    image: '/images/waffle-maker.png',
    description: 'Make delicious waffles at home.',
    category: 'Kitchen',
    price: 29.99,
    quantity: 20,
  },
  {
    name: 'Electric Skillet',
    image: '/images/electric-skillet.png',
    description: 'Versatile cooking tool for your kitchen.',
    category: 'Kitchen',
    price: 49.99,
    quantity: 15,
  },
  {
    name: 'Foam Roller',
    image: '/images/foam-roller.png',
    description: 'Relieve muscle tension with this roller.',
    category: 'Fitness',
    price: 19.99,
    quantity: 55,
  },
  {
    name: 'Portable Projector',
    image: '/images/portable-projector.png',
    description: 'Project movies and presentations anywhere.',
    category: 'Electronics',
    price: 99.99,
    quantity: 10,
  },
  {
    name: 'Sewing Machine',
    image: '/images/sewing-machine.png',
    description: 'Create and repair clothing at home.',
    category: 'Home Decor',
    price: 89.99,
    quantity: 20,
  },
  {
    name: 'Fondue Set',
    image: '/images/fondue-set.png',
    description: 'Enjoy delicious fondue with this set.',
    category: 'Kitchen',
    price: 39.99,
    quantity: 25,
  },
  {
    name: 'Hair Dryer',
    image: '/images/hair-dryer.png',
    description: 'Quickly dry your hair with this powerful dryer.',
    category: 'Bath & Body',
    price: 29.99,
    quantity: 40,
  },
  {
    name: 'Fishing Rod',
    image: '/images/fishing-rod.png',
    description: 'Catch the big one with this sturdy rod.',
    category: 'Outdoors',
    price: 59.99,
    quantity: 15,
  },
  {
    name: 'Portable Safe',
    image: '/images/portable-safe.png',
    description: 'Keep your valuables secure on the go.',
    category: 'Travel',
    price: 24.99,
    quantity: 35,
  },
  {
    name: 'Drone',
    image: '/images/drone.png',
    description: 'Capture aerial footage with this drone.',
    category: 'Electronics',
    price: 199.99,
    quantity: 10,
  },
  {
    name: 'Electric Griddle',
    image: '/images/electric-griddle.png',
    description: 'Cook breakfast favorites on this griddle.',
    category: 'Kitchen',
    price: 34.99,
    quantity: 20,
  },
  {
    name: 'Smart Doorbell',
    image: '/images/smart-doorbell.png',
    description: 'See who is at your door with this smart doorbell.',
    category: 'Electronics',
    price: 99.99,
    quantity: 15,
  },
  {
    name: 'Handheld Vacuum',
    image: '/images/handheld-vacuum.png',
    description: 'Quick cleanups with this portable vacuum.',
    category: 'Home Decor',
    price: 29.99,
    quantity: 30,
  },
  {
    name: 'Kids Tablet',
    image: '/images/kids-tablet.png',
    description: 'Safe and fun tablet for kids.',
    category: 'Electronics',
    price: 89.99,
    quantity: 25,
  },
  {
    name: 'Electric Grill',
    image: '/images/electric-grill.png',
    description: 'Indoor grilling made easy.',
    category: 'Kitchen',
    price: 49.99,
    quantity: 20,
  },
  {
    name: 'Weighted Blanket',
    image: '/images/weighted-blanket.png',
    description: 'Improve your sleep with this weighted blanket.',
    category: 'Home Decor',
    price: 69.99,
    quantity: 15,
  },
  {
    name: 'Garden Gnome',
    image: '/images/garden-gnome.png',
    description: 'Whimsical decoration for your garden.',
    category: 'Outdoors',
    price: 24.99,
    quantity: 40,
  },
  {
    name: 'Skateboard',
    image: '/images/skateboard.png',
    description: 'Cruise around on this stylish skateboard.',
    category: 'Outdoors',
    price: 49.99,
    quantity: 30,
  },
  {
    name: 'Pasta Maker',
    image: '/images/pasta-maker.png',
    description: 'Make fresh pasta at home.',
    category: 'Kitchen',
    price: 59.99,
    quantity: 15,
  },
];

export default products;