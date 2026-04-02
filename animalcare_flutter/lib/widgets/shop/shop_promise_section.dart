import 'package:flutter/material.dart';

class ShopPromiseSection extends StatelessWidget {
  const ShopPromiseSection({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 28),
      decoration: BoxDecoration(
        color: const Color(0xFFF0EAE4),
        borderRadius: BorderRadius.circular(24),
      ),
      child: Column(
        children: [
          // Leaf icon
          Container(
            width: 44,
            height: 44,
            decoration: BoxDecoration(
              color: const Color(0xFFE8D5C4),
              shape: BoxShape.circle,
            ),
            child: const Icon(Icons.eco, color: Color(0xFF8B4513), size: 22),
          ),
          const SizedBox(height: 14),
          const Text(
            'The HealthyCare Promise',
            textAlign: TextAlign.center,
            style: TextStyle(
              fontSize: 18,
              fontWeight: FontWeight.bold,
              color: Color(0xFF3B2010),
            ),
          ),
          const SizedBox(height: 10),
          const Text(
            'Every item in our catalog is vetted by certified pet nutritionists to ensure no synthetic additives reach your pup.',
            textAlign: TextAlign.center,
            style: TextStyle(
              fontSize: 13,
              color: Color(0xFF7A5C46),
              height: 1.5,
            ),
          ),
          const SizedBox(height: 16),
          GestureDetector(
            onTap: () {},
            child: const Text(
              'Learn about our sourcing',
              style: TextStyle(
                fontSize: 13,
                fontWeight: FontWeight.w600,
                color: Color(0xFF9E5727),
                decoration: TextDecoration.underline,
                decorationColor: Color(0xFF9E5727),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
