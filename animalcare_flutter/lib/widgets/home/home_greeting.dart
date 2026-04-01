import 'package:flutter/material.dart';

class HomeGreeting extends StatelessWidget {
  const HomeGreeting({super.key});

  @override
  Widget build(BuildContext context) {
    return const Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          "Hello, Barkly's\nOwner",
          style: TextStyle(
            fontSize: 36,
            fontWeight: FontWeight.bold,
            color: Color(0xFF8B4513),
            height: 1.1,
          ),
        ),
        SizedBox(height: 12),
        Text(
          "Your best friend's health and\nhappiness is our priority today.",
          style: TextStyle(fontSize: 16, color: Colors.black54, height: 1.4),
        ),
      ],
    );
  }
}
