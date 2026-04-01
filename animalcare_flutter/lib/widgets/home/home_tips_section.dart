import 'package:flutter/material.dart';

class HomeTipsSection extends StatelessWidget {
  const HomeTipsSection({super.key});

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const Text(
          "Summer Care Tips",
          style: TextStyle(
            fontSize: 22,
            fontWeight: FontWeight.bold,
            color: Colors.black87,
          ),
        ),
        const SizedBox(height: 16),
        SizedBox(
          height: 280,
          child: ListView.separated(
            scrollDirection: Axis.horizontal,
            itemCount: 2,
            separatorBuilder: (context, index) => const SizedBox(width: 16),
            itemBuilder: (context, index) {
              return SizedBox(
                width: 280,
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Stack(
                      children: [
                        ClipRRect(
                          borderRadius: BorderRadius.circular(24),
                          child: index == 0
                              ? Image.network(
                                  'https://lh3.googleusercontent.com/aida-public/AB6AXuASOAWM0hlXpOc_3_-i99gs8s0LMdti-AXt2JWqbQeJWa4zZv2tmu2w0b1ZnrSSSRhgvFjw4Nb1yxxgAdJ7qQIqu-7znwaIVDgsSBWkoVjXEzgbSwaU1i3VaqZC_CtdiSumJnVJFG9gS8fyS9fDGV0EXaOUZoXUBtX-QjUZcCGZDStUzaKByr3Btc9YY9op91MvcfpLaKnDA2XiTdhBiBGKD2uL0-huRU2GXi0O4icDfjqAA0M-fAxfI3k7bSXgGj2n7HJjLvX_UZL5',
                                  height: 170,
                                  width: double.infinity,
                                  fit: BoxFit.cover,
                                  errorBuilder: (context, error, stackTrace) =>
                                      Container(
                                        color: Colors.grey[300],
                                        height: 170,
                                      ),
                                )
                              : Image.network(
                                  'https://lh3.googleusercontent.com/aida-public/AB6AXuDHCXyTajGzGtTz7f5SRC1KBTiAshtW0XaKI_thvPV7HBQXcQFPZmoMLQN8qGUpyGrScVnrKSTogqVgUgF4uu64UO0rVX3vJX97QpktjzuERP85YdHrXQyIv_LO5Qf0WJ2YCMth4HdGZCk0QEbLsFG608s_zXvZvlooiOrmO7PNbuSCP47Pn1a7IC0CeE8PQxjLrW5HA4oPJdhIB2yOJcexG_IifmDL1FvrJtIL6BDgvzPG6ugJ8a_gxD44hC-s8b-WkSJe46wYiZkN',
                                  height: 170,
                                  width: double.infinity,
                                  fit: BoxFit.cover,
                                  errorBuilder: (context, error, stackTrace) =>
                                      Container(
                                        color: Colors.grey[300],
                                        height: 170,
                                      ),
                                ),
                        ),
                        Positioned(
                          top: 16,
                          left: 16,
                          child: Container(
                            padding: const EdgeInsets.symmetric(
                              horizontal: 12,
                              vertical: 6,
                            ),
                            decoration: BoxDecoration(
                              color: Colors.white.withValues(alpha: 0.9),
                              borderRadius: BorderRadius.circular(20),
                            ),
                            child: Text(
                              index == 0 ? "LIFESTYLE" : "NUTRITION",
                              style: const TextStyle(
                                fontSize: 10,
                                fontWeight: FontWeight.bold,
                                letterSpacing: 1,
                              ),
                            ),
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 12),
                    Text(
                      index == 0
                          ? "Keeping your dog cool this summer"
                          : "Summer Hydration Tips",
                      style: const TextStyle(
                        fontSize: 16,
                        fontWeight: FontWeight.bold,
                        height: 1.2,
                      ),
                    ),
                    const SizedBox(height: 8),
                    Text(
                      index == 0
                          ? "Protect your furry friend from the heat with these five essential hydration and coolin..."
                          : "DIY frozen treats to give your dog a little relief...",
                      maxLines: 2,
                      overflow: TextOverflow.ellipsis,
                      style: const TextStyle(
                        fontSize: 14,
                        color: Colors.black54,
                      ),
                    ),
                  ],
                ),
              );
            },
          ),
        ),
      ],
    );
  }
}
