import 'package:flutter/material.dart';

class BookingSummaryCard extends StatelessWidget {
  final DateTime? checkIn;
  final DateTime? checkOut;

  /// 0 = morning ($25), 1 = afternoon ($25), 2 = full day ($50)
  final int careIndex;

  static const _carePrices = [25.0, 25.0, 50.0];
  static const _careLabels = [
    'Morning Care (6 hrs)',
    'Afternoon Care (6 hrs)',
    'Full Day Care (24 hrs)',
  ];

  const BookingSummaryCard({
    super.key,
    this.checkIn,
    this.checkOut,
    required this.careIndex,
  });

  int get _nights {
    if (checkIn == null || checkOut == null) return 0;
    return checkOut!.difference(checkIn!).inDays;
  }

  double get _boardingBase => _nights * 45.0;
  double get _carePrice => _carePrices[careIndex];
  double get _luxuryBedding => _nights > 0 ? 15.0 : 0.0;
  double get _total => _boardingBase + _carePrice + _luxuryBedding;

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(22),
      decoration: BoxDecoration(
        color: const Color(0xFF7B3F1A),
        borderRadius: BorderRadius.circular(24),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Decorative background circle + title
          Stack(
            clipBehavior: Clip.none,
            children: [
              Positioned(
                right: -22,
                top: -40,
                child: Container(
                  width: 110,
                  height: 110,
                  decoration: BoxDecoration(
                    color: Colors.white.withValues(alpha: 0.06),
                    shape: BoxShape.circle,
                  ),
                ),
              ),
              const Text(
                'Booking Summary',
                style: TextStyle(
                  color: Colors.white,
                  fontSize: 18,
                  fontWeight: FontWeight.bold,
                ),
              ),
            ],
          ),
          const SizedBox(height: 20),

          // Boarding base (only if overnight)
          if (_nights > 0) ...[
            _row(
              'Boarding ($_nights ${_nights == 1 ? "night" : "nights"})',
              '\$${_boardingBase.toStringAsFixed(2)}',
            ),
            const SizedBox(height: 10),
          ],

          // Care option
          _row(_careLabels[careIndex], '\$${_carePrice.toStringAsFixed(2)}'),

          // Luxury bedding (only for overnight stays)
          if (_nights > 0) ...[
            const SizedBox(height: 10),
            _row('Luxury Bedding', '\$${_luxuryBedding.toStringAsFixed(2)}'),
          ],

          const SizedBox(height: 18),
          Divider(color: Colors.white.withValues(alpha: 0.15), height: 1),
          const SizedBox(height: 16),

          // Total row
          Row(
            crossAxisAlignment: CrossAxisAlignment.end,
            children: [
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Text(
                    'TOTAL PRICE',
                    style: TextStyle(
                      color: Color(0xFFFFD5A8),
                      fontSize: 10,
                      fontWeight: FontWeight.w600,
                      letterSpacing: 0.8,
                    ),
                  ),
                  const SizedBox(height: 4),
                  Text(
                    '\$${_total.toStringAsFixed(2)}',
                    style: const TextStyle(
                      color: Colors.white,
                      fontSize: 28,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ],
              ),
              const Spacer(),
              Container(
                padding: const EdgeInsets.symmetric(
                  horizontal: 12,
                  vertical: 6,
                ),
                decoration: BoxDecoration(
                  color: Colors.white.withValues(alpha: 0.12),
                  borderRadius: BorderRadius.circular(20),
                ),
                child: const Text(
                  'Taxes included',
                  style: TextStyle(color: Colors.white, fontSize: 11),
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _row(String label, String value) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        Text(
          label,
          style: const TextStyle(color: Color(0xFFFFD5A8), fontSize: 13),
        ),
        Text(
          value,
          style: const TextStyle(
            color: Colors.white,
            fontSize: 13,
            fontWeight: FontWeight.w600,
          ),
        ),
      ],
    );
  }
}
