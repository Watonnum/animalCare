import 'package:flutter/material.dart';

class BookingSummaryCard extends StatelessWidget {
  final String serviceType;
  final String dogSize;
  final DateTime? checkIn;
  final DateTime? checkOut;

  const BookingSummaryCard({
    super.key,
    required this.serviceType,
    required this.dogSize,
    required this.checkIn,
    required this.checkOut,
  });

  bool get _isSingleDay =>
      serviceType == 'morning' || serviceType == 'afternoon';

  int get _basePrice {
    if (_isSingleDay) return dogSize == 'small' ? 35 : 45;
    final nights = checkOut!.difference(checkIn!).inDays;
    return (dogSize == 'small' ? 45 : 65) * nights;
  }

  String get _bookingLabel {
    if (serviceType == 'morning') return 'Morning Care (1 session)';
    if (serviceType == 'afternoon') return 'Afternoon Care (1 session)';
    final nights = checkOut!.difference(checkIn!).inDays;
    return 'Boarding ($nights nights)';
  }

  @override
  Widget build(BuildContext context) {
    const bedding = 15;
    final total = _basePrice + bedding;

    return Container(
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        color: const Color(0xFF7B3300),
        borderRadius: BorderRadius.circular(20),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text(
            'Booking Summary',
            style: TextStyle(
              color: Colors.white,
              fontSize: 17,
              fontWeight: FontWeight.bold,
            ),
          ),
          const SizedBox(height: 16),
          _row(_bookingLabel, '\$${_basePrice.toStringAsFixed(2)}'),
          const SizedBox(height: 8),
          _row('Luxury Bedding', '\$${bedding.toStringAsFixed(2)}'),
          const Padding(
            padding: EdgeInsets.symmetric(vertical: 12),
            child: Divider(color: Colors.white24),
          ),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Text(
                    'TOTAL PRICE',
                    style: TextStyle(
                      color: Colors.white60,
                      fontSize: 11,
                      letterSpacing: 0.5,
                    ),
                  ),
                  Text(
                    '\$${total.toStringAsFixed(2)}',
                    style: const TextStyle(
                      color: Colors.white,
                      fontSize: 26,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ],
              ),
              Container(
                padding: const EdgeInsets.symmetric(
                  horizontal: 12,
                  vertical: 6,
                ),
                decoration: BoxDecoration(
                  color: Colors.white.withValues(alpha: 0.15),
                  borderRadius: BorderRadius.circular(20),
                ),
                child: const Text(
                  'Taxes included',
                  style: TextStyle(color: Colors.white70, fontSize: 12),
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _row(String label, String value) => Row(
    mainAxisAlignment: MainAxisAlignment.spaceBetween,
    children: [
      Text(label, style: const TextStyle(color: Colors.white70, fontSize: 14)),
      Text(
        value,
        style: const TextStyle(
          color: Colors.white,
          fontSize: 14,
          fontWeight: FontWeight.w600,
        ),
      ),
    ],
  );
}
