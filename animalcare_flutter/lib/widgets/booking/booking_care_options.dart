import 'package:flutter/material.dart';

// 0 = Morning (6hrs), 1 = Afternoon (6hrs), 2 = Full Day (24hrs)
class _CareOptionData {
  final String title;
  final String subtitle;
  final IconData icon;
  final Color iconBg;
  final Color iconColor;
  final double price;

  const _CareOptionData({
    required this.title,
    required this.subtitle,
    required this.icon,
    required this.iconBg,
    required this.iconColor,
    required this.price,
  });
}

const _options = <_CareOptionData>[
  _CareOptionData(
    title: 'Morning Care (6 Hrs)',
    subtitle: 'Available between 6:00 AM - 12:00 PM',
    icon: Icons.wb_sunny_outlined,
    iconBg: Color(0xFFFFEAE3),
    iconColor: Color(0xFFD4611A),
    price: 25.00,
  ),
  _CareOptionData(
    title: 'Afternoon Care (6 Hrs)',
    subtitle: 'Available between 12:00 PM - 6:00 PM',
    icon: Icons.wb_cloudy_outlined,
    iconBg: Color(0xFFDDE8F9),
    iconColor: Color(0xFF4A78C8),
    price: 25.00,
  ),
  _CareOptionData(
    title: 'Full Day Care (24 Hrs)',
    subtitle: '24-hour full day care service',
    icon: Icons.brightness_5_outlined,
    iconBg: Color(0xFFFFF3CC),
    iconColor: Color(0xFFD4960A),
    price: 50.00,
  ),
];

class BookingCareOptions extends StatelessWidget {
  /// 0 = morning, 1 = afternoon, 2 = fullday
  final int selectedIndex;

  /// true when check-in == check-out (same calendar day)
  final bool isSameDay;

  /// true when both check-in and check-out are set
  final bool datesSelected;

  final ValueChanged<int> onChanged;

  const BookingCareOptions({
    super.key,
    required this.selectedIndex,
    required this.isSameDay,
    required this.datesSelected,
    required this.onChanged,
  });

  /// Returns true when this care option index should be interactive.
  ///
  /// - No dates → all enabled (show all options openly)
  /// - Same day  → only morning (0) and afternoon (1) enabled; full day disabled
  /// - Multi-day → only full day (2) enabled; morning/afternoon disabled
  bool _enabled(int index) {
    if (!datesSelected) return true;
    if (isSameDay) return index != 2;
    return index == 2;
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.fromLTRB(20, 18, 20, 6),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(20),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withValues(alpha: 0.04),
            blurRadius: 12,
            offset: const Offset(0, 4),
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Section title
          Row(
            children: [
              Container(
                width: 30,
                height: 30,
                decoration: BoxDecoration(
                  color: const Color(0xFFFFEAE3),
                  borderRadius: BorderRadius.circular(8),
                ),
                child: const Icon(
                  Icons.favorite_border,
                  size: 16,
                  color: Color(0xFF9E5727),
                ),
              ),
              const SizedBox(width: 10),
              const Text(
                'Specialized Care',
                style: TextStyle(
                  fontSize: 16,
                  fontWeight: FontWeight.bold,
                  color: Color(0xFF3B2010),
                ),
              ),
            ],
          ),
          const SizedBox(height: 4),
          // Option rows
          ...List.generate(_options.length, (i) {
            final opt = _options[i];
            final enabled = _enabled(i);
            final selected = selectedIndex == i && enabled;
            final isLast = i == _options.length - 1;
            return _OptionRow(
              option: opt,
              isSelected: selected,
              isEnabled: enabled,
              isLast: isLast,
              onTap: enabled ? () => onChanged(i) : null,
            );
          }),
        ],
      ),
    );
  }
}

class _OptionRow extends StatelessWidget {
  final _CareOptionData option;
  final bool isSelected;
  final bool isEnabled;
  final bool isLast;
  final VoidCallback? onTap;

  const _OptionRow({
    required this.option,
    required this.isSelected,
    required this.isEnabled,
    required this.isLast,
    this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: Opacity(
        opacity: isEnabled ? 1.0 : 0.35,
        child: Container(
          padding: const EdgeInsets.symmetric(vertical: 14),
          decoration: isLast
              ? null
              : BoxDecoration(
                  border: Border(
                    bottom: BorderSide(color: Colors.grey.shade100),
                  ),
                ),
          child: Row(
            children: [
              Container(
                width: 42,
                height: 42,
                decoration: BoxDecoration(
                  color: option.iconBg,
                  borderRadius: BorderRadius.circular(10),
                ),
                child: Icon(option.icon, size: 20, color: option.iconColor),
              ),
              const SizedBox(width: 12),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      option.title,
                      style: const TextStyle(
                        fontSize: 14,
                        fontWeight: FontWeight.w600,
                        color: Color(0xFF3B2010),
                      ),
                    ),
                    const SizedBox(height: 2),
                    Text(
                      option.subtitle,
                      style: const TextStyle(
                        fontSize: 11,
                        color: Color(0xFFAA9988),
                      ),
                    ),
                  ],
                ),
              ),
              Text(
                '\$${option.price.toStringAsFixed(2)}',
                style: const TextStyle(
                  fontSize: 14,
                  fontWeight: FontWeight.w700,
                  color: Color(0xFF3B2010),
                ),
              ),
              const SizedBox(width: 10),
              _RadioDot(isSelected: isSelected),
            ],
          ),
        ),
      ),
    );
  }
}

class _RadioDot extends StatelessWidget {
  final bool isSelected;
  const _RadioDot({required this.isSelected});

  @override
  Widget build(BuildContext context) {
    if (isSelected) {
      return Container(
        width: 24,
        height: 24,
        decoration: const BoxDecoration(
          color: Color(0xFF5C3317),
          shape: BoxShape.circle,
        ),
        child: const Icon(Icons.check, size: 14, color: Colors.white),
      );
    }
    return Container(
      width: 24,
      height: 24,
      decoration: BoxDecoration(
        shape: BoxShape.circle,
        border: Border.all(color: const Color(0xFFDDD0C8), width: 2),
      ),
    );
  }
}
