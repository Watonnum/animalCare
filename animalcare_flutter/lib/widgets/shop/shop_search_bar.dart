import 'package:flutter/material.dart';

class ShopSearchBar extends StatelessWidget {
  const ShopSearchBar({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 48,
      decoration: BoxDecoration(
        color: const Color(0xFFF0EAE4),
        borderRadius: BorderRadius.circular(24),
      ),
      child: const TextField(
        decoration: InputDecoration(
          hintText: 'Search for organic treats...',
          hintStyle: TextStyle(color: Color(0xFFAA9080), fontSize: 14),
          prefixIcon: Icon(Icons.search, color: Color(0xFFAA9080), size: 20),
          border: InputBorder.none,
          contentPadding: EdgeInsets.symmetric(vertical: 14),
        ),
      ),
    );
  }
}
