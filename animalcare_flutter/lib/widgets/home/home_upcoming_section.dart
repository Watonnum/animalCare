import 'package:flutter/material.dart';

class HomeUpcomingSection extends StatelessWidget {
  const HomeUpcomingSection({super.key});

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const Text(
          "Upcoming for Barkly",
          style: TextStyle(
            fontSize: 22,
            fontWeight: FontWeight.bold,
            color: Colors.black87,
          ),
        ),
        const SizedBox(height: 24),
        Stack(
          clipBehavior: Clip.none,
          children: [
            Container(
              padding: const EdgeInsets.all(20),
              decoration: BoxDecoration(
                color: const Color(0xFFF9F4EE),
                borderRadius: BorderRadius.circular(30),
              ),
              child: Row(
                children: [
                  Container(
                    width: 50,
                    height: 50,
                    decoration: const BoxDecoration(
                      color: Color(0xFFFFE4D6),
                      shape: BoxShape.circle,
                    ),
                    child: const Icon(
                      Icons.medical_services,
                      color: Color(0xFF5C3317),
                      size: 20,
                    ),
                  ),
                  const SizedBox(width: 16),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        const Text(
                          "Annual Vaccination",
                          style: TextStyle(
                            fontSize: 16,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                        const SizedBox(height: 4),
                        const Text(
                          "Next Tuesday at 10:30 AM •\nPaws Clinic",
                          style: TextStyle(fontSize: 13, color: Colors.black54),
                        ),
                        const SizedBox(height: 12),
                        Row(
                          children: [
                            _buildTag("Urgent"),
                            const SizedBox(width: 8),
                            _buildTag("Health"),
                          ],
                        ),
                      ],
                    ),
                  ),
                  const SizedBox(width: 60),
                ],
              ),
            ),
            Positioned(
              right: -10,
              top: -40,
              child: SizedBox(
                width: 110,
                height: 110,
                child: Image.asset(
                  'assets/images/corgi.jpg',
                  errorBuilder: (context, error, stackTrace) {
                    return Image.network(
                      'https://lh3.googleusercontent.com/aida-public/AB6AXuC2CwIHUsHfsJTRve003icBiVJCaEA9bQKMeCJhF_0eUfDoEP8wnqdXFbITlKfpUdNI7gLXfWls-lyueAiKzVI1ASgpP221n82As_T8Re895l9Xw0WnPcJdn8eK7vwVLGZgsh_QgmBK2lYGvCd2XH6ppCShjvVXYdqb8KJzLi03eeR3NVohzDxoWaBGmTx4ZcwOrt-7T0qVUaEnIm67MdueiSAuak5BCAlQnrrF4EzOlrDNeWkho3UcCgMU2rnaOGW4BqedBsKkMDde',
                      // 'https://cdn-icons-png.flaticon.com/512/7603/7603262.png',
                    );
                  },
                ),
              ),
            ),
          ],
        ),
      ],
    );
  }

  Widget _buildTag(String text) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
      decoration: BoxDecoration(
        color: const Color(0xFFEBE4D8),
        borderRadius: BorderRadius.circular(20),
      ),
      child: Text(
        text,
        style: const TextStyle(
          fontSize: 12,
          fontWeight: FontWeight.w600,
          color: Colors.black87,
        ),
      ),
    );
  }
}
