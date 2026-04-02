import 'package:flutter/material.dart';

class ShopHeroBanner extends StatelessWidget {
  const ShopHeroBanner({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 215,
      decoration: BoxDecoration(
        color: const Color(0xFFD4956A),
        borderRadius: BorderRadius.circular(24),
      ),
      clipBehavior: Clip.hardEdge,
      child: Stack(
        children: [
          // Background warm texture overlay
          Positioned.fill(
            child: Container(
              decoration: const BoxDecoration(
                gradient: LinearGradient(
                  begin: Alignment.centerLeft,
                  end: Alignment.centerRight,
                  colors: [Color(0xFFC8854E), Color(0xFFD9A070)],
                ),
              ),
            ),
          ),
          // Dog image on the right
          Positioned(
            right: -10,
            top: 0,
            bottom: 0,
            width: 170,
            child: ClipRRect(
              borderRadius: const BorderRadius.only(
                topRight: Radius.circular(24),
                bottomRight: Radius.circular(24),
              ),
              child: Image.asset(
                'assets/images/barkly.jpg',
                fit: BoxFit.cover,
                alignment: Alignment.topCenter,
              ),
            ),
          ),
          // Text content on the left
          Positioned(
            left: 20,
            top: 20,
            bottom: 20,
            right: 150,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Container(
                  padding: const EdgeInsets.symmetric(
                    horizontal: 10,
                    vertical: 5,
                  ),
                  decoration: BoxDecoration(
                    color: const Color(0xFF5C3317),
                    borderRadius: BorderRadius.circular(20),
                  ),
                  child: const Text(
                    'NEW\nARRIVAL',
                    textAlign: TextAlign.center,
                    style: TextStyle(
                      color: Colors.white,
                      fontSize: 9,
                      fontWeight: FontWeight.bold,
                      height: 1.3,
                    ),
                  ),
                ),
                const SizedBox(height: 10),
                const Text(
                  'Artisan\nSummer\nCollection',
                  style: TextStyle(
                    color: Colors.white,
                    fontSize: 20,
                    fontWeight: FontWeight.bold,
                    height: 1.2,
                  ),
                ),
                const SizedBox(height: 8),
                const Text(
                  'Hand-stitched\nleather and\norganic dyes.',
                  style: TextStyle(
                    color: Color(0xFFFFE8D6),
                    fontSize: 11,
                    height: 1.4,
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
