import 'package:flutter/material.dart';

class BookingHistoryCard extends StatelessWidget {
  final Map<String, dynamic> booking;

  const BookingHistoryCard({super.key, required this.booking});

  // ── Helpers ────────────────────────────────────────────────────────────────

  Map<String, dynamic> get _pet {
    final pets = booking['pets'];
    if (pets is List && pets.isNotEmpty) {
      return Map<String, dynamic>.from(pets[0] as Map);
    }
    return {};
  }

  String get _petName => (_pet['name'] as String? ?? 'Unknown').capitalize();
  String get _petBreed => (_pet['breed'] as String? ?? '').capitalize();
  String get _petSize => (_pet['size'] as String? ?? 'small');
  String get _specialService => _pet['specialService'] as String? ?? '';
  String? get _checkIn => _pet['checkIn'] as String?;
  String? get _checkOut => _pet['checkOut'] as String?;
  String get _status => booking['status'] as String? ?? 'Pending';
  Map<String, dynamic> get _pricing => booking['pricing'] != null
      ? Map<String, dynamic>.from(booking['pricing'] as Map)
      : {};

  String get _serviceLabel {
    final sizeTag = _petSize == 'small' ? 'Small Dog' : 'Large Dog';
    switch (_specialService) {
      case 'fullDayService':
        return '$sizeTag Boarding';
      case 'morningCare':
        return 'Morning Care';
      case 'afternoonCare':
        return 'Afternoon Care';
      default:
        return _specialService;
    }
  }

  String get _dateLabel {
    if (_checkIn == null) return '—';
    final inFmt = _fmtDate(_checkIn!);
    if (_checkOut == null || _checkOut == _checkIn) return inFmt;
    return '$inFmt – ${_fmtDate(_checkOut!)}';
  }

  static const _months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  String _fmtDate(String iso) {
    try {
      final dt = DateTime.parse(iso);
      return '${_months[dt.month - 1]} ${dt.day}';
    } catch (_) {
      return iso;
    }
  }

  // ── Status badge ───────────────────────────────────────────────────────────

  Color get _badgeBg {
    switch (_status.toLowerCase()) {
      case 'confirmed':
        return const Color(0xFFDCEEFD);
      case 'pending':
        return const Color(0xFFFFF3E0);
      case 'completed':
        return const Color(0xFFE6F4EA);
      case 'cancelled':
        return const Color(0xFFF1F1F1);
      default:
        return const Color(0xFFDCEEFD);
    }
  }

  Color get _badgeText {
    switch (_status.toLowerCase()) {
      case 'confirmed':
        return const Color(0xFF1565C0);
      case 'pending':
        return const Color(0xFFE65100);
      case 'completed':
        return const Color(0xFF2E7D32);
      case 'cancelled':
        return Colors.black45;
      default:
        return const Color(0xFF1565C0);
    }
  }

  // ── Build ──────────────────────────────────────────────────────────────────

  @override
  Widget build(BuildContext context) {
    final total = _pricing['total'];

    return Container(
      margin: const EdgeInsets.only(bottom: 12),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(16),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withValues(alpha: 0.05),
            blurRadius: 8,
            offset: const Offset(0, 2),
          ),
        ],
      ),
      child: Column(
        children: [
          // ── Top row ──────────────────────────────────────────────────────
          Padding(
            padding: const EdgeInsets.fromLTRB(16, 16, 16, 12),
            child: Row(
              children: [
                // Pet avatar
                Container(
                  width: 52,
                  height: 52,
                  decoration: BoxDecoration(
                    color: const Color(0xFFF0EDE8),
                    shape: BoxShape.circle,
                    border: Border.all(
                      color: const Color(0xFFE0D6CC),
                      width: 1.5,
                    ),
                  ),
                  child: const Icon(
                    Icons.pets,
                    color: Color(0xFFD4651A),
                    size: 26,
                  ),
                ),
                const SizedBox(width: 12),
                // Name + breed
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        _petName,
                        style: const TextStyle(
                          fontSize: 16,
                          fontWeight: FontWeight.bold,
                          color: Color(0xFF1A1A1A),
                        ),
                      ),
                      if (_petBreed.isNotEmpty)
                        Text(
                          _petBreed,
                          style: const TextStyle(
                            fontSize: 13,
                            color: Colors.black45,
                          ),
                        ),
                    ],
                  ),
                ),
                // Status badge
                Container(
                  padding: const EdgeInsets.symmetric(
                    horizontal: 10,
                    vertical: 5,
                  ),
                  decoration: BoxDecoration(
                    color: _badgeBg,
                    borderRadius: BorderRadius.circular(20),
                  ),
                  child: Text(
                    _status.toUpperCase(),
                    style: TextStyle(
                      color: _badgeText,
                      fontSize: 11,
                      fontWeight: FontWeight.bold,
                      letterSpacing: 0.5,
                    ),
                  ),
                ),
              ],
            ),
          ),
          // ── Divider + detail row ─────────────────────────────────────────
          const Divider(height: 1, color: Color(0xFFF0EDE8)),
          Padding(
            padding: const EdgeInsets.fromLTRB(16, 12, 16, 14),
            child: Row(
              children: [
                // Service
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      const Text(
                        'SERVICE',
                        style: TextStyle(
                          color: Colors.black38,
                          fontSize: 11,
                          fontWeight: FontWeight.w600,
                          letterSpacing: 0.6,
                        ),
                      ),
                      const SizedBox(height: 3),
                      Text(
                        _serviceLabel,
                        style: const TextStyle(
                          color: Color(0xFFD4651A),
                          fontSize: 14,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                    ],
                  ),
                ),
                // Dates
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      const Text(
                        'DATES',
                        style: TextStyle(
                          color: Colors.black38,
                          fontSize: 11,
                          fontWeight: FontWeight.w600,
                          letterSpacing: 0.6,
                        ),
                      ),
                      const SizedBox(height: 3),
                      Text(
                        _dateLabel,
                        style: const TextStyle(
                          color: Color(0xFF1A1A1A),
                          fontSize: 14,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                    ],
                  ),
                ),
                // Total price
                if (total != null)
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.end,
                    children: [
                      const Text(
                        'TOTAL',
                        style: TextStyle(
                          color: Colors.black38,
                          fontSize: 11,
                          fontWeight: FontWeight.w600,
                          letterSpacing: 0.6,
                        ),
                      ),
                      const SizedBox(height: 3),
                      Text(
                        '\$$total',
                        style: const TextStyle(
                          color: Color(0xFF7B3300),
                          fontSize: 14,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                    ],
                  ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

extension _StringCap on String {
  String capitalize() =>
      isEmpty ? this : '${this[0].toUpperCase()}${substring(1)}';
}
