import 'package:flutter/material.dart';

import '../widgets/shop/shop_header.dart';
import '../widgets/shop/shop_search_bar.dart';
import '../widgets/shop/shop_hero_banner.dart';
import '../widgets/shop/shop_category_filter.dart';
import '../widgets/shop/shop_product_grid.dart';
import '../widgets/shop/shop_promise_section.dart';

class ShopScreen extends StatelessWidget {
  const ShopScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      bottom: false,
      child: SingleChildScrollView(
        physics: const AlwaysScrollableScrollPhysics(),
        padding: const EdgeInsets.only(
          left: 24,
          right: 24,
          top: 24,
          bottom: 120,
        ),
        child: const Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            ShopHeader(),
            SizedBox(height: 24),
            Text(
              'Curated Care for\nYour Best Friend',
              style: TextStyle(
                fontSize: 26,
                fontWeight: FontWeight.bold,
                color: Color(0xFF3B2010),
                height: 1.2,
              ),
            ),
            SizedBox(height: 20),
            ShopSearchBar(),
            SizedBox(height: 20),
            ShopHeroBanner(),
            SizedBox(height: 20),
            ShopCategoryFilter(),
            SizedBox(height: 20),
            ShopProductGrid(),
            SizedBox(height: 24),
            ShopPromiseSection(),
            SizedBox(height: 24),
          ],
        ),
      ),
    );
  }
}
