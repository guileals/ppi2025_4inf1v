create table
  product_1v (
    id serial primary key,
    title text not null,
    description text not null,
    price NUMERIC(10, 2) NOT NULL CHECK (price >= 0),
    thumbnail text not null,
    created_at TIMESTAMP
    WITH
      TIME ZONE DEFAULT now (),
      updated_at TIMESTAMP
    WITH
      TIME ZONE DEFAULT now ()
  );

insert into
  product_1v (title, description, price, thumbnail)
values
  (
    'iPhone 5s',
    'The iPhone 5s is a classic smartphone known for its compact design and advanced features during its release. While it''s an older model, it still provides a reliable user experience.',
    199.99,
    'https://cdn.dummyjson.com/product-images/smartphones/iphone-5s/thumbnail.webp'
  ),
  (
    'iPhone 6',
    'The iPhone 6 is a stylish and capable smartphone with a larger display and improved performance. It introduced new features and design elements, making it a popular choice in its time.',
    299.99,
    'https://cdn.dummyjson.com/product-images/smartphones/iphone-6/thumbnail.webp'
  ),
  (
    'iPhone 13 Pro',
    'The iPhone 13 Pro is a cutting-edge smartphone with a powerful camera system, high-performance chip, and stunning display. It offers advanced features for users who demand top-notch technology.',
    1099.99,
    'https://cdn.dummyjson.com/product-images/smartphones/iphone-13-pro/thumbnail.webp'
  ),
  (
    'iPhone X',
    'The iPhone X is a flagship smartphone featuring a bezel-less OLED display, facial recognition technology (Face ID), and impressive performance. It represents a milestone in iPhone design and innovation.',
    899.99,
    'https://cdn.dummyjson.com/product-images/smartphones/iphone-x/thumbnail.webp'
  ),
  (
    'Oppo A57',
    'The Oppo A57 is a mid-range smartphone known for its sleek design and capable features.... It offers a balance of performance and affordability, making it a popular choice.',
    249.99,
    'https://cdn.dummyjson.com/product-images/smartphones/oppo-a57/thumbnail.webp'
  ),
  (
    'Oppo F19 Pro Plus',
    'The Oppo F19 Pro Plus is a feature-rich smartphone with a focus on camera capabilities. It boasts advanced photography features and a powerful performance for a premium user experience.',
    399.99,
    'https://cdn.dummyjson.com/product-images/smartphones/oppo-f19-pro-plus/thumbnail.webp'
  ),
  (
    'Oppo K1',
    'The Oppo K1 series offers a range of smartphones with various features and specifications. Known for their stylish design and reliable performance, the Oppo K1 series caters to diverse user preferences.',
    299.99,
    'https://cdn.dummyjson.com/product-images/smartphones/oppo-k1/thumbnail.webp'
  ),
  (
    'Realme C35',
    'The Realme C35 is a budget-friendly smartphone with a focus on providing essential features for everyday use. It offers a reliable performance and user-friendly experience.',
    149.99,
    'https://cdn.dummyjson.com/product-images/smartphones/realme-c35/thumbnail.webp'
  ),
  (
    'Realme X',
    'The Realme X is a mid-range smartphone known for its sleek design and impressive display.... It offers a good balance of performance and camera capabilities for users seeking a quality device.',
    299.99,
    'https://cdn.dummyjson.com/product-images/smartphones/realme-x/thumbnail.webp'
  ),
  (
    'Realme XT',
    'The Realme XT is a feature-rich smartphone with a focus on camera technology. It comes equipped with advanced camera sensors, delivering high-quality photos and videos for photography enthusiasts.',
    349.99,
    'https://cdn.dummyjson.com/product-images/smartphones/realme-xt/thumbnail.webp'
  ),
  (
    'Samsung Galaxy S7',
    'The Samsung Galaxy S7 is a flagship smartphone known for its sleek design and advanced features. It features a high-resolution display, powerful camera, and robust performance.',
    299.99,
    'https://cdn.dummyjson.com/product-images/smartphones/samsung-galaxy-s7/thumbnail.webp'
  ),
  (
    'Samsung Galaxy S8',
    'The Samsung Galaxy S8 is a premium smartphone with an Infinity Display, offering a stunning visual experience. It boasts advanced camera capabilities and cutting-edge technology.',
    499.99,
    'https://cdn.dummyjson.com/product-images/smartphones/samsung-galaxy-s8/thumbnail.webp'
  ),
  (
    'Samsung Galaxy S10',
    'The Samsung Galaxy S10 is a flagship device featuring a dynamic AMOLED display, versatile camera system, and powerful performance.... It represents innovation and excellence in smartphone technology.',
    699.99,
    'https://cdn.dummyjson.com/product-images/smartphones/samsung-galaxy-s10/thumbnail.webp'
  ),
  (
    'Vivo S1',
    'The Vivo S1 is a stylish and mid-range smartphone offering a blend of design and performance. It features a vibrant display, capable camera system, and reliable functionality.',
    249.99,
    'https://cdn.dummyjson.com/product-images/smartphones/vivo-s1/thumbnail.webp'
  ),
  (
    'Vivo V9',
    'The Vivo V9 is a smartphone known for its sleek design and emphasis on capturing high-quality selfies. It features a notch display, dual-camera setup, and a modern design.',
    299.99,
    'https://cdn.dummyjson.com/product-images/smartphones/vivo-v9/thumbnail.webp'
  ),
  (
    'Vivo X21',
    'The Vivo X21 is a premium smartphone with a focus on cutting-edge technology. It features an in-display fingerprint sensor, a high-resolution display, and advanced camera capabilities.',
    499.99,
    'https://cdn.dummyjson.com/product-images/smartphones/vivo-x21/thumbnail.webp'
  );