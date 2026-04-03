import 'package:flutter/material.dart';

class BookingMedicalToggle extends StatelessWidget {
  final bool value;
  final ValueChanged<bool> onChanged;

  const BookingMedicalToggle({
    super.key,
    required this.value,
    required this.onChanged,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(16),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withValues(alpha: 0.04),
            blurRadius: 12,
            offset: const Offset(0, 4),
          ),
        ],
      ),
      child: Row(
        children: [
          Container(
            width: 46,
            height: 46,
            decoration: const BoxDecoration(
              color: Color(0xFFDDE8F9),
              shape: BoxShape.circle,
            ),
            child: const Icon(
              Icons.medical_services_outlined,
              color: Color(0xFF4A78C8),
              size: 22,
            ),
          ),
          const SizedBox(width: 14),
          const Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  'Medical Needs',
                  style: TextStyle(
                    fontSize: 15,
                    fontWeight: FontWeight.w600,
                    color: Color(0xFF3B2010),
                  ),
                ),
                SizedBox(height: 2),
                Text(
                  'Medication administration',
                  style: TextStyle(fontSize: 12, color: Color(0xFFAA9988)),
                ),
              ],
            ),
          ),
          Switch(
            value: value,
            onChanged: onChanged,
            activeThumbColor: Colors.white,
            activeTrackColor: const Color(0xFF9E5727),
            inactiveThumbColor: Colors.white,
            inactiveTrackColor: const Color(0xFFDDD0C8),
          ),
        ],
      ),
    );
  }
}
