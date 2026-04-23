import 'package:flutter/material.dart';

class LoginHeader extends StatelessWidget {
  const LoginHeader({super.key});

  @override
  Widget build(BuildContext context) {
    return const Column(
      children: [
        Text(
          'Welcome Back',
          textAlign: TextAlign.center,
          style: TextStyle(
            fontSize: 26,
            fontWeight: FontWeight.bold,
            color: Color(0xFF1A1A2E),
          ),
        ),
        SizedBox(height: 8),
        Text(
          'Sign in to continue taking care of your pets.',
          textAlign: TextAlign.center,
          style: TextStyle(fontSize: 14, color: Color(0xFF9E9E9E)),
        ),
      ],
    );
  }
}
