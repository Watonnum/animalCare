import 'package:flutter/material.dart';

class BookingCalendar extends StatefulWidget {
  final DateTime? checkIn;
  final DateTime? checkOut;
  final Function(DateTime?, DateTime?) onRangeChanged;

  const BookingCalendar({
    super.key,
    this.checkIn,
    this.checkOut,
    required this.onRangeChanged,
  });

  @override
  State<BookingCalendar> createState() => _BookingCalendarState();
}

class _BookingCalendarState extends State<BookingCalendar> {
  late DateTime _displayMonth;

  static const _monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  static const _shortMonths = [
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
  static const _weekDays = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

  @override
  void initState() {
    super.initState();
    _displayMonth = DateTime(DateTime.now().year, DateTime.now().month);
  }

  bool _sameDay(DateTime a, DateTime b) =>
      a.year == b.year && a.month == b.month && a.day == b.day;

  void _onDateTap(DateTime date) {
    final checkIn = widget.checkIn;
    final checkOut = widget.checkOut;

    if (checkIn == null || checkOut != null) {
      widget.onRangeChanged(date, null);
    } else {
      if (_sameDay(date, checkIn) || date.isAfter(checkIn)) {
        widget.onRangeChanged(checkIn, date);
      } else {
        widget.onRangeChanged(date, null);
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(20),
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
        children: [
          _buildHeader(),
          const SizedBox(height: 16),
          _buildWeekdayRow(),
          const SizedBox(height: 8),
          _buildGrid(),
          const SizedBox(height: 16),
          Divider(color: Colors.grey.shade100, height: 1),
          const SizedBox(height: 14),
          _buildCheckinOutRow(),
        ],
      ),
    );
  }

  Widget _buildHeader() {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        const Text(
          'Select Dates',
          style: TextStyle(
            fontSize: 18,
            fontWeight: FontWeight.bold,
            color: Color(0xFF3B2010),
          ),
        ),
        Row(
          children: [
            const Icon(
              Icons.calendar_month,
              size: 16,
              color: Color(0xFF9E5727),
            ),
            const SizedBox(width: 4),
            Text(
              '${_monthNames[_displayMonth.month - 1]} ${_displayMonth.year}',
              style: const TextStyle(
                color: Color(0xFF9E5727),
                fontWeight: FontWeight.w600,
                fontSize: 13,
              ),
            ),
            const SizedBox(width: 6),
            GestureDetector(
              onTap: () => setState(() {
                _displayMonth = DateTime(
                  _displayMonth.year,
                  _displayMonth.month - 1,
                );
              }),
              child: const Icon(
                Icons.chevron_left,
                size: 20,
                color: Color(0xFF9E5727),
              ),
            ),
            GestureDetector(
              onTap: () => setState(() {
                _displayMonth = DateTime(
                  _displayMonth.year,
                  _displayMonth.month + 1,
                );
              }),
              child: const Icon(
                Icons.chevron_right,
                size: 20,
                color: Color(0xFF9E5727),
              ),
            ),
          ],
        ),
      ],
    );
  }

  Widget _buildWeekdayRow() {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceAround,
      children: _weekDays
          .map(
            (d) => SizedBox(
              width: 34,
              child: Center(
                child: Text(
                  d,
                  style: const TextStyle(
                    fontSize: 12,
                    color: Color(0xFFAA9988),
                    fontWeight: FontWeight.w600,
                  ),
                ),
              ),
            ),
          )
          .toList(),
    );
  }

  Widget _buildGrid() {
    final firstDay = DateTime(_displayMonth.year, _displayMonth.month, 1);
    final daysInMonth = DateTime(
      _displayMonth.year,
      _displayMonth.month + 1,
      0,
    ).day;
    final leadingCount = firstDay.weekday - 1;
    final prevMonthTotal = DateTime(
      _displayMonth.year,
      _displayMonth.month,
      0,
    ).day;

    final cells = <_DayCell>[];

    for (int i = leadingCount - 1; i >= 0; i--) {
      cells.add(_DayCell(number: prevMonthTotal - i, active: false));
    }
    for (int d = 1; d <= daysInMonth; d++) {
      cells.add(
        _DayCell(
          number: d,
          active: true,
          date: DateTime(_displayMonth.year, _displayMonth.month, d),
        ),
      );
    }
    int trailing = 1;
    while (cells.length % 7 != 0) {
      cells.add(_DayCell(number: trailing++, active: false));
    }

    final rows = <Widget>[];
    for (int i = 0; i < cells.length; i += 7) {
      rows.add(
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceAround,
          children: cells.sublist(i, i + 7).map(_buildCell).toList(),
        ),
      );
      if (i + 7 < cells.length) rows.add(const SizedBox(height: 4));
    }
    return Column(children: rows);
  }

  Widget _buildCell(_DayCell cell) {
    if (!cell.active || cell.date == null) {
      return SizedBox(
        width: 34,
        height: 34,
        child: Center(
          child: Text(
            '${cell.number}',
            style: const TextStyle(fontSize: 13, color: Color(0xFFCCBBAA)),
          ),
        ),
      );
    }

    final date = cell.date!;
    final isIn = widget.checkIn != null && _sameDay(date, widget.checkIn!);
    final isOut = widget.checkOut != null && _sameDay(date, widget.checkOut!);
    final inRange =
        widget.checkIn != null &&
        widget.checkOut != null &&
        date.isAfter(widget.checkIn!) &&
        date.isBefore(widget.checkOut!);
    final isEndpoint = isIn || isOut;

    return GestureDetector(
      onTap: () => _onDateTap(date),
      child: SizedBox(
        width: 34,
        height: 34,
        child: Container(
          decoration: BoxDecoration(
            color: isEndpoint
                ? const Color(0xFF5C3317)
                : inRange
                ? const Color(0xFFFFD5A8)
                : Colors.transparent,
            shape: BoxShape.circle,
          ),
          child: Center(
            child: Text(
              '${cell.number}',
              style: TextStyle(
                fontSize: 13,
                fontWeight: isEndpoint ? FontWeight.bold : FontWeight.normal,
                color: isEndpoint
                    ? Colors.white
                    : inRange
                    ? const Color(0xFF9E5727)
                    : const Color(0xFF3B2010),
              ),
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildCheckinOutRow() {
    String fmt(DateTime? d) {
      if (d == null) return '—';
      return '${_shortMonths[d.month - 1]} ${d.day}';
    }

    return Row(
      children: [
        Expanded(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const Text(
                'Check-in',
                style: TextStyle(color: Color(0xFFAA9988), fontSize: 12),
              ),
              const SizedBox(height: 4),
              Text(
                fmt(widget.checkIn),
                style: const TextStyle(
                  fontSize: 16,
                  fontWeight: FontWeight.bold,
                  color: Color(0xFF3B2010),
                ),
              ),
            ],
          ),
        ),
        Container(width: 1, height: 40, color: const Color(0xFFE8DDD5)),
        Expanded(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.end,
            children: [
              const Text(
                'Check-out',
                style: TextStyle(color: Color(0xFFAA9988), fontSize: 12),
              ),
              const SizedBox(height: 4),
              Text(
                fmt(widget.checkOut),
                style: const TextStyle(
                  fontSize: 16,
                  fontWeight: FontWeight.bold,
                  color: Color(0xFF3B2010),
                ),
              ),
            ],
          ),
        ),
      ],
    );
  }
}

class _DayCell {
  final int number;
  final bool active;
  final DateTime? date;
  const _DayCell({required this.number, required this.active, this.date});
}
