create table
  product_2v (
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

INSERT INTO
  product_2v (title, description, price, thumbnail)
VALUES
  (
    'Essence Mascara Lash Princess',
    'The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects. Achieve dramatic lashes with this long-lasting and cruelty-free formula.',
    9.99,
    'https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/thumbnail.webp'
  ),
  (
    'Eyeshadow Palette with Mirror',
    'The Eyeshadow Palette with Mirror offers a versatile range of eyeshadow shades for creating stunning eye looks. With a built-in mirror, it''s convenient for on-the-go makeup application.',
    19.99,
    'https://cdn.dummyjson.com/product-images/beauty/eyeshadow-palette-with-mirror/thumbnail.webp'
  ),
  (
    'Powder Canister',
    'The Powder Canister is a finely milled setting powder designed to set makeup and control shine. With a lightweight and translucent formula, it provides a smooth and matte finish.',
    14.99,
    'https://cdn.dummyjson.com/product-images/beauty/powder-canister/thumbnail.webp'
  ),
  (
    'Red Lipstick',
    'The Red Lipstick is a classic and bold choice for adding a pop of color to your lips. With a creamy and pigmented formula, it provides a vibrant and long-lasting finish.',
    12.99,
    'https://cdn.dummyjson.com/product-images/beauty/red-lipstick/thumbnail.webp'
  ),
  (
    'Red Nail Polish',
    'The Red Nail Polish offers a rich and glossy red hue for vibrant and polished nails.... With a quick-drying formula, it provides a salon-quality finish at home.',
    8.99,
    'https://cdn.dummyjson.com/product-images/beauty/red-nail-polish/thumbnail.webp'
  );