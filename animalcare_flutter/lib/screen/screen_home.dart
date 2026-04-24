import 'package:flutter/material.dart';
import 'package:animalcare_flutter/widget/home/book_a_stay_card.dart';
import 'package:animalcare_flutter/widget/home/offer_card.dart';
import 'package:animalcare_flutter/widget/home/small_service_card.dart';
import 'package:animalcare_flutter/widget/home/update_card.dart';
import 'package:animalcare_flutter/widget/home/vet_consultation_card.dart';

class HomeScreen extends StatelessWidget {
  final Map<String, dynamic> user;

  const HomeScreen({super.key, required this.user});

  String get _greeting {
    final hour = DateTime.now().hour;
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  }

  @override
  Widget build(BuildContext context) {
    final name = user['name'] as String? ?? 'there';
    final firstName = name.split(' ').first;

    return Scaffold(
      backgroundColor: const Color(0xFFF2F4F8),
      body: SafeArea(
        child: CustomScrollView(
          slivers: [
            _buildAppBar(firstName),
            _buildGreeting(firstName),
            _buildServiceCards(),
            _buildSectionHeader('Exclusive Offers', showSeeAll: true),
            SliverToBoxAdapter(
              child: Padding(
                padding: const EdgeInsets.symmetric(horizontal: 20),
                child: OfferCard(
                  badge: 'LIMITED TIME',
                  title: '20% off',
                  subtitle: 'For first-time boarding bookings.',
                ),
              ),
            ),
            _buildSectionHeader('Latest Updates'),
            _buildLatestUpdates(),
            const SliverToBoxAdapter(child: SizedBox(height: 100)),
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton.extended(
        onPressed: () {},
        backgroundColor: const Color(0xFF2D4EE0),
        icon: const Icon(Icons.directions_walk, color: Colors.white),
        label: const Text(
          'Book a Walk',
          style: TextStyle(color: Colors.white, fontWeight: FontWeight.w600),
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
            const Icon(Icons.pets, color: Color(0xFF2D4EE0), size: 26),
            const SizedBox(width: 8),
            const Text(
              'PawsStay',
              style: TextStyle(
                fontSize: 20,
                fontWeight: FontWeight.bold,
                color: Color(0xFF2D4EE0),
              ),
            ),
            const Spacer(),
            IconButton(
              icon: const Icon(Icons.notifications_none_outlined, size: 26),
              onPressed: () {},
            ),
            const SizedBox(width: 4),
            CircleAvatar(
              radius: 18,
              backgroundColor: const Color(0xFF2D4EE0),
              child: Text(
                firstName.isNotEmpty ? firstName[0].toUpperCase() : 'U',
                style: const TextStyle(
                  color: Colors.white,
                  fontWeight: FontWeight.bold,
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildGreeting(String firstName) {
    return SliverToBoxAdapter(
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              '$_greeting, $firstName',
              style: const TextStyle(fontSize: 14, color: Colors.black54),
            ),
            const SizedBox(height: 4),
            RichText(
              text: const TextSpan(
                style: TextStyle(
                  fontSize: 26,
                  fontWeight: FontWeight.bold,
                  color: Colors.black87,
                ),
                children: [
                  TextSpan(text: "Your pet's "),
                  TextSpan(
                    text: 'perfect stay',
                    style: TextStyle(color: Color(0xFF2D4EE0)),
                  ),
                  TextSpan(text: '\nstarts here.'),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildServiceCards() {
    return SliverToBoxAdapter(
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 20),
        child: Column(
          children: [
            BookAStayCard(onTap: () {}),
            const SizedBox(height: 12),
            Row(
              children: [
                Expanded(
                  child: SmallServiceCard(
                    icon: Icons.spa_outlined,
                    title: 'Pet Spa',
                    subtitle: 'Relaxation & baths',
                    onTap: () {},
                  ),
                ),
                const SizedBox(width: 12),
                Expanded(
                  child: SmallServiceCard(
                    icon: Icons.shopping_bag_outlined,
                    title: 'Shop',
                    subtitle: 'Treats & gear',
                    onTap: () {},
                  ),
                ),
              ],
            ),
            const SizedBox(height: 12),
            VetConsultationCard(onTap: () {}),
          ],
        ),
      ),
    );
  }

  Widget _buildSectionHeader(String title, {bool showSeeAll = false}) {
    return SliverToBoxAdapter(
      child: Padding(
        padding: const EdgeInsets.fromLTRB(20, 28, 20, 12),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Text(
              title,
              style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
            ),
            if (showSeeAll)
              TextButton(
                onPressed: () {},
                child: const Text(
                  'See all',
                  style: TextStyle(color: Color(0xFF2D4EE0)),
                ),
              ),
          ],
        ),
      ),
    );
  }

  Widget _buildLatestUpdates() {
    return SliverToBoxAdapter(
      child: SizedBox(
        height: 200,
        child: ListView(
          scrollDirection: Axis.horizontal,
          padding: const EdgeInsets.symmetric(horizontal: 20),
          children: const [
            UpdateCard(
              title: 'New Grooming Services Available',
              subtitle:
                  'Full-service spa packages now include blueberry facials and paw balm.',
            ),
            SizedBox(width: 12),
            UpdateCard(
              title: 'Pet Safety Tips',
              subtitle:
                  'Learn how to keep your pet safe with our professional guides.',
            ),
            SizedBox(width: 12),
            UpdateCard(
              title: 'Holiday Boarding Open',
              subtitle:
                  'Book early for the holiday season. Limited spots available.',
            ),
          ],
        ),
      ),
    );
  }
}
