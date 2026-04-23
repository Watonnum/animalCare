import 'package:flutter/material.dart';

class OrDivider extends StatelessWidget {
  const OrDivider({super.key});

  @override
  Widget build(BuildContext context) {
    return const Row(
      children: [
        Expanded(child: Divider(color: Color(0xFFE0E0E0))),
        Padding(
          padding: EdgeInsets.symmetric(horizontal: 12),
          child: Text(
            'Or continue with',
            style: TextStyle(fontSize: 13, color: Color(0xFF9E9E9E)),
          ),
        ),
        Expanded(child: Divider(color: Color(0xFFE0E0E0))),
      ],
    );
  }
}
