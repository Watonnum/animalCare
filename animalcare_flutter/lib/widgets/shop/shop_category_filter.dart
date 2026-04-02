import 'package:flutter/material.dart';

class ShopCategoryFilter extends StatefulWidget {
  const ShopCategoryFilter({super.key});

  @override
  State<ShopCategoryFilter> createState() => _ShopCategoryFilterState();
}

class _ShopCategoryFilterState extends State<ShopCategoryFilter> {
  int selectedIndex = 0;

  final List<String> categories = [
    'All Essentials',
    'Organic Food',
    'Artisan Collars',
    'Supplements',
    'Natural Toys',
  ];

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      height: 40,
      child: ListView.separated(
        scrollDirection: Axis.horizontal,
        itemCount: categories.length,
        separatorBuilder: (context, index) => const SizedBox(width: 10),
        itemBuilder: (context, index) {
          final isSelected = index == selectedIndex;
          return GestureDetector(
            onTap: () => setState(() => selectedIndex = index),
            child: Container(
              padding: const EdgeInsets.symmetric(horizontal: 18, vertical: 10),
              decoration: BoxDecoration(
                color: isSelected ? const Color(0xFF5C3317) : Colors.white,
                borderRadius: BorderRadius.circular(20),
                border: Border.all(
                  color: isSelected
                      ? const Color(0xFF5C3317)
                      : const Color(0xFFDDD0C8),
                ),
              ),
              child: Text(
                categories[index],
                style: TextStyle(
                  color: isSelected ? Colors.white : const Color(0xFF8B6B5C),
                  fontSize: 13,
                  fontWeight: isSelected ? FontWeight.w600 : FontWeight.normal,
                ),
              ),
            ),
          );
        },
      ),
    );
  }
}
