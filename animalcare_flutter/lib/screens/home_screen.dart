import 'package:flutter/material.dart';

import '../widgets/home/home_header.dart';
import '../widgets/home/home_greeting.dart';
import '../widgets/home/home_action_cards.dart';
import '../widgets/home/home_upcoming_section.dart';
import '../widgets/home/home_tips_section.dart';
import '../widgets/home/home_newsletter_section.dart';
import '../widgets/custom_bottom_nav.dart';

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      extendBody:
          true, // เพิ่มบรรทัดนี้เพื่อให้เนื้อหาใต้ BottomNav เลื่อนผ่านได้
      body: SafeArea(
        bottom: false,
        child: SingleChildScrollView(
          physics:
              const AlwaysScrollableScrollPhysics(), // บังคับให้ Scroll ได้ตลอดเวลา
          padding: const EdgeInsets.only(
            left: 24,
            right: 24,
            top: 24,
            bottom: 120,
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: const [
              HomeHeader(),
              SizedBox(height: 32),
              HomeGreeting(),
              SizedBox(height: 32),
              HomeActionCards(),
              SizedBox(height: 48),
              HomeUpcomingSection(),
              SizedBox(height: 48),
              HomeTipsSection(),
              SizedBox(height: 48),
              HomeNewsletterSection(),
              SizedBox(height: 32),
            ],
          ),
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {},
        backgroundColor: const Color(0xFF9E5727),
        shape: const CircleBorder(),
        child: const Icon(Icons.add, color: Colors.white),
      ),
      floatingActionButtonLocation: FloatingActionButtonLocation.endDocked,
      bottomNavigationBar: const CustomBottomNav(),
    );
  }
}
