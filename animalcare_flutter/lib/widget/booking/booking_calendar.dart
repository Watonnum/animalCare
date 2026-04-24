import 'package:flutter/material.dart';

class BookingCalendar extends StatelessWidget {
  final bool isSingleDay;
  final String serviceType;
  final DateTime focusedMonth;
  final DateTime? checkIn;
  final DateTime? checkOut;
  final ValueChanged<DateTime> onDayTap;
  final ValueChanged<DateTime> onMonthChanged;

  static const _monthNames = [
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
  static String monthName(int m) => _monthNames[m - 1];

  const BookingCalendar({
    super.key,
    required this.isSingleDay,
    required this.serviceType,
    required this.focusedMonth,
    required this.checkIn,
    required this.checkOut,
    required this.onDayTap,
    required this.onMonthChanged,
  });

  bool get _isAtCurrentMonth {
    final now = DateTime.now();
    return focusedMonth.year == now.year && focusedMonth.month == now.month;
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(16),
      ),
      child: Column(
        children: [
          _buildMonthHeader(),
          const SizedBox(height: 6),
          Align(
            alignment: Alignment.centerLeft,
            child: Text(
              isSingleDay
                  ? 'Tap a date to select your session day.'
                  : 'Tap check-in date, then tap check-out date.',
              style: const TextStyle(color: Colors.black45, fontSize: 12),
            ),
          ),
          const SizedBox(height: 16),
          _buildGrid(),
          const Divider(height: 28),
          isSingleDay ? _buildSingleDisplay() : _buildRangeDisplay(),
        ],
      ),
    );
  }

  Widget _buildMonthHeader() {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        Text(
          isSingleDay ? 'Select Date' : 'Select Dates',
          style: const TextStyle(fontSize: 17, fontWeight: FontWeight.bold),
        ),
        Row(
          children: [
            const Icon(
              Icons.calendar_month,
              color: Color(0xFFD4651A),
              size: 16,
            ),
            const SizedBox(width: 4),
            Text(
              '${monthName(focusedMonth.month)} ${focusedMonth.year}',
              style: const TextStyle(
                color: Color(0xFFD4651A),
                fontWeight: FontWeight.bold,
                fontSize: 14,
              ),
            ),
            const SizedBox(width: 2),
            _NavBtn(
              icon: Icons.chevron_left,
              disabled: _isAtCurrentMonth,
              onTap: () => onMonthChanged(
                DateTime(focusedMonth.year, focusedMonth.month - 1),
              ),
            ),
            _NavBtn(
              icon: Icons.chevron_right,
              onTap: () => onMonthChanged(
                DateTime(focusedMonth.year, focusedMonth.month + 1),
              ),
            ),
          ],
        ),
      ],
    );
  }

  Widget _buildGrid() {
    final today = DateUtils.dateOnly(DateTime.now());
    final now = DateTime.now();
    final daysInMonth = DateUtils.getDaysInMonth(
      focusedMonth.year,
      focusedMonth.month,
    );
    final offset =
        DateTime(focusedMonth.year, focusedMonth.month, 1).weekday - 1;

    final cells = <DateTime?>[
      ...List.filled(offset, null),
      ...List.generate(
        daysInMonth,
        (d) => DateTime(focusedMonth.year, focusedMonth.month, d + 1),
      ),
    ];
    final numRows = (cells.length / 7).ceil();

    return Column(
      children: [
        Row(
          children: ['M', 'T', 'W', 'T', 'F', 'S', 'S']
              .map(
                (h) => Expanded(
                  child: Center(
                    child: Text(
                      h,
                      style: const TextStyle(
                        color: Colors.black38,
                        fontSize: 12,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ),
                ),
              )
              .toList(),
        ),
        const SizedBox(height: 6),
        ...List.generate(numRows, (r) {
          return Row(
            children: List.generate(7, (c) {
              final idx = r * 7 + c;
              final date = idx < cells.length ? cells[idx] : null;
              if (date == null) {
                return const Expanded(child: SizedBox(height: 36));
              }
              return Expanded(
                child: _DayCell(
                  date: date,
                  today: today,
                  now: now,
                  serviceType: serviceType,
                  checkIn: checkIn,
                  checkOut: checkOut,
                  isSingleDay: isSingleDay,
                  onTap: onDayTap,
                ),
              );
            }),
          );
        }),
      ],
    );
  }

  Widget _buildSingleDisplay() {
    return Row(
      children: [
        const Icon(
          Icons.calendar_today_outlined,
          color: Color(0xFF7B3300),
          size: 16,
        ),
        const SizedBox(width: 8),
        Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text(
              'Selected Date',
              style: TextStyle(color: Colors.black45, fontSize: 12),
            ),
            const SizedBox(height: 2),
            Text(
              checkIn != null
                  ? '${monthName(checkIn!.month)} ${checkIn!.day}, ${checkIn!.year}'
                  : '—',
              style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 16),
            ),
          ],
        ),
      ],
    );
  }

  Widget _buildRangeDisplay() {
    return Row(
      children: [
        Expanded(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const Text(
                'Check-in',
                style: TextStyle(color: Colors.black45, fontSize: 12),
              ),
              const SizedBox(height: 2),
              Text(
                checkIn != null
                    ? '${monthName(checkIn!.month)} ${checkIn!.day}'
                    : '—',
                style: const TextStyle(
                  fontWeight: FontWeight.bold,
                  fontSize: 16,
                ),
              ),
            ],
          ),
        ),
        Container(width: 1, height: 32, color: Colors.black12),
        Expanded(
          child: Padding(
            padding: const EdgeInsets.only(left: 16),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Text(
                  'Check-out',
                  style: TextStyle(color: Colors.black45, fontSize: 12),
                ),
                const SizedBox(height: 2),
                Text(
                  checkOut != null
                      ? '${monthName(checkOut!.month)} ${checkOut!.day}'
                      : '—',
                  style: const TextStyle(
                    fontWeight: FontWeight.bold,
                    fontSize: 16,
                  ),
                ),
              ],
            ),
          ),
        ),
      ],
    );
  }
}

// ── Internal helpers (private to this file) ───────────────────────────────────

class _DayCell extends StatelessWidget {
  final DateTime date;
  final DateTime today;
  final DateTime now;
  final String serviceType;
  final DateTime? checkIn;
  final DateTime? checkOut;
  final bool isSingleDay;
  final ValueChanged<DateTime> onTap;

  const _DayCell({
    required this.date,
    required this.today,
    required this.now,
    required this.serviceType,
    required this.checkIn,
    required this.checkOut,
    required this.isSingleDay,
    required this.onTap,
  });

  bool get _isDisabled {
    if (date.isBefore(today)) return true;
    if (DateUtils.isSameDay(date, today)) {
      if (serviceType == 'morning' && now.hour >= 13) return true;
      if (serviceType == 'afternoon' && now.hour >= 16) return true;
    }
    return false;
  }

  bool get _isIn => checkIn != null && DateUtils.isSameDay(date, checkIn!);
  bool get _isOut =>
      !isSingleDay && checkOut != null && DateUtils.isSameDay(date, checkOut!);
  bool get _inRange =>
      !isSingleDay &&
      checkIn != null &&
      checkOut != null &&
      date.isAfter(checkIn!) &&
      date.isBefore(checkOut!);

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: _isDisabled ? null : () => onTap(date),
      child: Container(
        height: 36,
        margin: const EdgeInsets.symmetric(vertical: 2, horizontal: 1),
        decoration: BoxDecoration(
          color: _isDisabled
              ? null
              : _isIn || _isOut
              ? const Color(0xFF7B3300)
              : _inRange
              ? const Color(0xFFD4651A).withValues(alpha: 0.18)
              : null,
          borderRadius: BorderRadius.circular(18),
        ),
        child: Center(
          child: Text(
            '${date.day}',
            style: TextStyle(
              fontSize: 13,
              fontWeight: _isIn || _isOut ? FontWeight.bold : FontWeight.normal,
              color: _isDisabled
                  ? Colors.black26
                  : _isIn || _isOut
                  ? Colors.white
                  : const Color(0xFF1A1A1A),
            ),
          ),
        ),
      ),
    );
  }
}

class _NavBtn extends StatelessWidget {
  final IconData icon;
  final VoidCallback onTap;
  final bool disabled;

  const _NavBtn({
    required this.icon,
    required this.onTap,
    this.disabled = false,
  });

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: disabled ? null : onTap,
      child: Padding(
        padding: const EdgeInsets.all(4),
        child: Icon(
          icon,
          size: 18,
          color: disabled ? Colors.black26 : Colors.black54,
        ),
      ),
    );
  }
}
