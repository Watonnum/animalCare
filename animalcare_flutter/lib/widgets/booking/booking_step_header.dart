import 'package:flutter/material.dart';

class BookingStepHeader extends StatelessWidget {
  const BookingStepHeader({super.key});

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          children: List.generate(3, (i) {
            return Expanded(
              child: Container(
                height: 4,
                margin: EdgeInsets.only(right: i < 2 ? 6 : 0),
                decoration: BoxDecoration(
                  color: i == 0
                      ? const Color(0xFF9E5727)
                      : const Color(0xFFE0D5CC),
                  borderRadius: BorderRadius.circular(2),
                ),
              ),
            );
          }),
        ),
        const SizedBox(height: 16),
        const Text(
          'STEP 1 OF 3: DETAILS',
          style: TextStyle(
            fontSize: 11,
            color: Color(0xFF9E5727),
            fontWeight: FontWeight.w600,
            letterSpacing: 0.8,
          ),
        ),
        const SizedBox(height: 6),
        const Text(
          'Book Boarding',
          style: TextStyle(
            fontSize: 30,
            fontWeight: FontWeight.bold,
            color: Color(0xFF3B2010),
          ),
        ),
      ],
    );
  }
}
