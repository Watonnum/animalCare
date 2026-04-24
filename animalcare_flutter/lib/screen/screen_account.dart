import 'package:flutter/material.dart';

class AccountScreen extends StatelessWidget {
  final Map<String, dynamic> user;

  const AccountScreen({super.key, required this.user});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Account')),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            CircleAvatar(
              radius: 40,
              backgroundColor: const Color(0xFF2D4EE0),
              child: Text(
                (user['name'] as String? ?? 'U')[0].toUpperCase(),
                style: const TextStyle(fontSize: 32, color: Colors.white),
              ),
            ),
            const SizedBox(height: 16),
            Text(
              user['name'] as String? ?? '',
              style: const TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 4),
            Text(
              user['email'] as String? ?? '',
              style: const TextStyle(color: Colors.black54),
            ),
          ],
        ),
      ),
    );
  }
}
