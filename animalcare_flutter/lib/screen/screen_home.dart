import 'package:flutter/material.dart';
import 'package:animalcare_flutter/widget/home/active_booking_card.dart';
import 'package:animalcare_flutter/widget/home/newsletter_card.dart';
import 'package:animalcare_flutter/widget/home/service_care_card.dart';

class HomeScreen extends StatelessWidget {
  final Map<String, dynamic> user;
  final VoidCallback? onGoToBookings;

  const HomeScreen({super.key, required this.user, this.onGoToBookings});

  @override
  Widget build(BuildContext context) {
    final name = user['name'] as String? ?? 'there';
    final firstName = name.split(' ').first;

    return Scaffold(
      backgroundColor: const Color(0xFFF8F0E8),
      body: SafeArea(
        child: CustomScrollView(
          slivers: [
            _buildAppBar(firstName),
            _buildHeader(firstName),
            _buildStartBookingCard(firstName),
            _buildSectionHeader('Our Specialized Care'),
            _buildSpecializedCare(),
            _buildSectionHeader('Your Active Bookings'),
            SliverToBoxAdapter(
              child: Padding(
                padding: const EdgeInsets.symmetric(horizontal: 20),
                child: ActiveBookingCard(
                  title: 'Weekend Getaway',
                  dateRange: 'Aug 24 - Aug 26',
                  roomType: 'Premium Large Suite',
                  status: 'CONFIRMED',
                ),
              ),
            ),
            const SliverToBoxAdapter(
              child: Padding(
                padding: EdgeInsets.fromLTRB(20, 20, 20, 0),
                child: NewsletterCard(),
              ),
            ),
            const SliverToBoxAdapter(child: SizedBox(height: 100)),
          ],
        ),
      ),
    );
  }

  Widget _buildAppBar(String firstName) {
    return SliverToBoxAdapter(
      child: Padding(
        padding: const EdgeInsets.fromLTRB(20, 16, 20, 0),
        child: Row(
          children: [
            CircleAvatar(
              radius: 18,
              backgroundColor: const Color(0xFFD4651A),
              child: Text(
                firstName.isNotEmpty ? firstName[0].toUpperCase() : 'U',
                style: const TextStyle(
                  color: Colors.white,
                  fontWeight: FontWeight.bold,
                ),
              ),
            ),
            const SizedBox(width: 10),
            Text(
              firstName,
              style: const TextStyle(
                fontSize: 16,
                fontWeight: FontWeight.bold,
                color: Color(0xFF3A1A00),
              ),
            ),
            const Spacer(),
            IconButton(
              icon: const Icon(Icons.notifications_outlined, size: 26),
              onPressed: () {},
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildHeader(String firstName) {
    return SliverToBoxAdapter(
      child: Padding(
        padding: const EdgeInsets.fromLTRB(20, 24, 20, 20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text(
              "Book Your Dog's\nNext Stay",
              style: TextStyle(
                fontSize: 30,
                fontWeight: FontWeight.bold,
                color: Color(0xFF6B2800),
                height: 1.2,
              ),
            ),
            const SizedBox(height: 8),
            const Text(
              'Premium boarding and wellness for\nyour best friend.',
              style: TextStyle(fontSize: 14, color: Colors.black54),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildStartBookingCard(String firstName) {
    return SliverToBoxAdapter(
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 20),
        child: GestureDetector(
          onTap: onGoToBookings,
          child: Container(
            padding: const EdgeInsets.all(20),
            decoration: BoxDecoration(
              color: const Color(0xFF7B3300),
              borderRadius: BorderRadius.circular(16),
            ),
            child: Row(
              children: [
                Container(
                  padding: const EdgeInsets.all(10),
                  decoration: BoxDecoration(
                    color: Colors.white.withValues(alpha: 0.15),
                    borderRadius: BorderRadius.circular(12),
                  ),
                  child: const Icon(
                    Icons.calendar_month_outlined,
                    color: Colors.white,
                    size: 28,
                  ),
                ),
                const SizedBox(width: 16),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      const Text(
                        'Start Booking',
                        style: TextStyle(
                          color: Colors.white,
                          fontSize: 18,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                      Text(
                        'Reserve a spot for $firstName',
                        style: const TextStyle(
                          color: Colors.white70,
                          fontSize: 13,
                        ),
                      ),
                    ],
                  ),
                ),
                const Icon(
                  Icons.chevron_right,
                  color: Colors.white70,
                  size: 28,
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildSectionHeader(String title) {
    return SliverToBoxAdapter(
      child: Padding(
        padding: const EdgeInsets.fromLTRB(20, 28, 20, 12),
        child: Text(
          title,
          style: const TextStyle(
            fontSize: 20,
            fontWeight: FontWeight.bold,
            color: Color(0xFF1A1A1A),
          ),
        ),
      ),
    );
  }

  Widget _buildSpecializedCare() {
    return SliverToBoxAdapter(
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 20),
        child: Column(
          children: [
            ServiceCareCard(
              iconData: Icons.pets,
              iconBgColor: const Color(0xFFFFE5D0),
              iconColor: const Color(0xFFD4651A),
              title: 'Large Breed Sanctuary',
              description:
                  'Spacious private suites (8x8ft) with climate control and 24/7 supervision. Includes 3 outdoor play sessions daily in our secure acre-wide field.',
              tags: const ['Max Comfort', 'Active Play'],
            ),
            const SizedBox(height: 12),
            ServiceCareCard(
              iconData: Icons.emoji_nature_outlined,
              iconBgColor: const Color(0xFFD0E8F5),
              iconColor: const Color(0xFF2E7EC8),
              title: 'Small Dog Social Club',
              description:
                  'Dedicated quiet zone for pups under 25lbs. Features cozy fleece bedding, socialization hours with other small friends, and supervised indoor play.',
              tags: const ['Safe Space', 'Socialization'],
            ),
            const SizedBox(height: 12),
            ServiceCareCard(
              iconData: Icons.medical_services_outlined,
              iconBgColor: const Color(0xFFFFE5D0),
              iconColor: const Color(0xFFD4651A),
              title: 'Wellness & Grooming',
              description:
                  "Complement your pet's stay with professional grooming, nail trims, and customized health check-ups by our on-site nursing staff.",
              tags: const ['Spa Treatment', 'Health First'],
            ),
          ],
        ),
      ),
    );
  }
}
