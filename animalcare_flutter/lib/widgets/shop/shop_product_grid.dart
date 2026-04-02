import 'package:flutter/material.dart';
import 'shop_product_card.dart';

class _Product {
  final String category;
  final String name;
  final double price;
  final String imagePath;
  const _Product({
    required this.category,
    required this.name,
    required this.price,
    required this.imagePath,
  });
}

const List<_Product> _products = [
  _Product(
    category: 'Organic Food',
    name: 'Grain-Free Venison',
    price: 34.00,
    imagePath: 'assets/images/wild_atlantic_salmon.jpg',
  ),
  _Product(
    category: 'Artisan Collars',
    name: 'Earth-Tone Leather',
    price: 48.00,
    imagePath: 'assets/images/artisan_leather_collar.jpg',
  ),
  _Product(
    category: 'Supplements',
    name: 'Hip & Joint Elixir',
    price: 22.50,
    imagePath: 'assets/images/zen_calm_hemp_oil.jpg',
  ),
  _Product(
    category: 'Natural Toys',
    name: 'Organic Hemp Tug',
    price: 18.00,
    imagePath: 'assets/images/golden_tumeric_chew.jpg',
  ),
];

class ShopProductGrid extends StatelessWidget {
  const ShopProductGrid({super.key});

  @override
  Widget build(BuildContext context) {
    return GridView.builder(
      shrinkWrap: true,
      physics: const NeverScrollableScrollPhysics(),
      gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
        crossAxisCount: 2,
        mainAxisSpacing: 16,
        crossAxisSpacing: 16,
        mainAxisExtent: 290,
      ),
      itemCount: _products.length,
      itemBuilder: (context, index) {
        final p = _products[index];
        return ShopProductCard(
          category: p.category,
          name: p.name,
          price: p.price,
          imagePath: p.imagePath,
        );
      },
    );
  }
}
