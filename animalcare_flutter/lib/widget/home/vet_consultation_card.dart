import 'package:flutter/material.dart';

class VetConsultationCard extends StatelessWidget {
  final VoidCallback onTap;

  const VetConsultationCard({super.key, required this.onTap});

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 16),
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(16),
        ),
        child: Row(
          children: [
            Container(
              padding: const EdgeInsets.all(10),
              decoration: BoxDecoration(
                color: const Color(0xFFE8F0FE),
                borderRadius: BorderRadius.circular(10),
              ),
              child: const Icon(
                Icons.medical_services_outlined,
                color: Color(0xFF2D4EE0),
                size: 24,
              ),
            ),
            const SizedBox(width: 16),
            const Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    'Vet Consultation',
                    style: TextStyle(fontWeight: FontWeight.bold, fontSize: 15),
                  ),
                  SizedBox(height: 2),
                  Text(
                    '24/7 on-call professional care',
                    style: TextStyle(color: Colors.black54, fontSize: 12),
                  ),
                ],
              ),
            ),
            const Icon(
              Icons.arrow_forward_ios,
              color: Colors.black38,
              size: 16,
            ),
          ],
        ),
      ),
    );
  }
}
