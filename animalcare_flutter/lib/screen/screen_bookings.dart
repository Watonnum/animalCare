import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:animalcare_flutter/widget/booking/service_type_card.dart';
import 'package:animalcare_flutter/widget/booking/dog_size_card.dart';
import 'package:animalcare_flutter/widget/booking/booking_calendar.dart';
import 'package:animalcare_flutter/widget/booking/booking_summary_card.dart';
import 'package:animalcare_flutter/widget/booking/health_form.dart';

class BookingsScreen extends StatefulWidget {
  final Map<String, dynamic> user;

  const BookingsScreen({super.key, required this.user});

  @override
  State<BookingsScreen> createState() => _BookingsScreenState();
}

class _BookingsScreenState extends State<BookingsScreen> {
  int _step = 0;
  String _serviceType = 'morning';
  String? _dogSize;
  DateTime _focusedMonth = DateTime.now();
  DateTime? _checkIn;
  DateTime? _checkOut;
  final _foodAllergyCtrl = TextEditingController();
  final _medAllergyCtrl = TextEditingController();
  final _specialCtrl = TextEditingController();
  bool _medNeeds = false;
  bool _ready = false;
  bool _submitting = false;

  static const _stepLabels = ['SERVICE', 'DOG SIZE', 'DATES & DETAILS'];

  bool get _isSingleDay =>
      _serviceType == 'morning' || _serviceType == 'afternoon';

  bool get _dateSelected =>
      _isSingleDay ? _checkIn != null : _checkIn != null && _checkOut != null;

  @override
  void initState() {
    super.initState();
    Future.delayed(const Duration(milliseconds: 400), () {
      if (mounted) setState(() => _ready = true);
    });
  }

  @override
  void dispose() {
    _foodAllergyCtrl.dispose();
    _medAllergyCtrl.dispose();
    _specialCtrl.dispose();
    super.dispose();
  }

  void _onDayTap(DateTime date) {
    setState(() {
      if (_isSingleDay) {
        _checkIn = date;
        _checkOut = null;
      } else {
        if (_checkIn == null || _checkOut != null) {
          _checkIn = date;
          _checkOut = null;
        } else if (DateUtils.isSameDay(date, _checkIn!)) {
          _checkIn = null;
        } else if (date.isBefore(_checkIn!)) {
          _checkOut = _checkIn;
          _checkIn = date;
        } else {
          _checkOut = date;
        }
      }
    });
  }

  void _onServiceTypeChanged(String type) {
    setState(() {
      _serviceType = type;
      _checkIn = null;
      _checkOut = null;
    });
  }

  String _formatDate(DateTime d) =>
      '${d.year}-${d.month.toString().padLeft(2, '0')}-${d.day.toString().padLeft(2, '0')}';

  Future<void> _confirmBooking() async {
    setState(() => _submitting = true);
    try {
      final checkInStr = _formatDate(_checkIn!);
      final checkOutStr = _isSingleDay ? checkInStr : _formatDate(_checkOut!);

      final specialService = switch (_serviceType) {
        'morning' => 'morningCare',
        'afternoon' => 'afternoonCare',
        _ => 'fullDayService',
      };

      final size = _dogSize ?? 'small';
      final nights = _isSingleDay ? 1 : _checkOut!.difference(_checkIn!).inDays;
      final basePrice = _isSingleDay
          ? (size == 'small' ? 35 : 45)
          : (size == 'small' ? 45 : 65) * nights;
      const bedding = 15;
      final subtotal = basePrice + bedding;
      final tax = (subtotal * 0.08).round();
      final total = subtotal + tax;

      final payload = {
        'pets': [
          {
            'id': DateTime.now().millisecondsSinceEpoch.toDouble(),
            'name': '',
            'breed': '',
            'size': size,
            'amount': 1,
            'checkIn': checkInStr,
            'checkOut': checkOutStr,
            'allergies': _foodAllergyCtrl.text.trim().isEmpty
                ? 'None'
                : _foodAllergyCtrl.text.trim(),
            'instructions': _specialCtrl.text.trim().isEmpty
                ? 'None'
                : _specialCtrl.text.trim(),
            'specialService': specialService,
          },
        ],
        'pricing': {'subtotal': subtotal, 'tax': tax, 'total': total},
        'user': {
          'name': widget.user['name'] ?? '',
          'email': widget.user['email'] ?? '',
          'image': widget.user['image'] ?? '',
          'role': widget.user['role'] ?? 'user',
        },
        'status': 'Confirmed',
      };

      final response = await http.post(
        Uri.parse('http://localhost:3000/api/services'),
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode(payload),
      );

      if (!mounted) return;

      if (response.statusCode == 201 || response.statusCode == 200) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(
            content: Text('Booking confirmed! 🐾'),
            backgroundColor: Color(0xFF7B3300),
          ),
        );
        setState(() {
          _step = 0;
          _serviceType = 'morning';
          _dogSize = null;
          _checkIn = null;
          _checkOut = null;
          _medNeeds = false;
          _submitting = false;
          _foodAllergyCtrl.clear();
          _medAllergyCtrl.clear();
          _specialCtrl.clear();
        });
      } else {
        throw Exception('Server error: ${response.statusCode}');
      }
    } catch (e) {
      if (!mounted) return;
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Failed: $e'), backgroundColor: Colors.red[700]),
      );
      setState(() => _submitting = false);
    }
  }

  Widget _buildLoading() {
    return Scaffold(
      backgroundColor: const Color(0xFFF8F0E8),
      body: Center(
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Container(
              padding: const EdgeInsets.all(20),
              decoration: BoxDecoration(
                color: const Color(0xFFFFE5D0),
                shape: BoxShape.circle,
              ),
              child: const Icon(Icons.pets, color: Color(0xFF7B3300), size: 40),
            ),
            const SizedBox(height: 24),
            const CircularProgressIndicator(color: Color(0xFF7B3300)),
            const SizedBox(height: 16),
            const Text(
              'Loading booking details...',
              style: TextStyle(color: Colors.black45, fontSize: 13),
            ),
          ],
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    if (!_ready) return _buildLoading();
    return Scaffold(
      backgroundColor: const Color(0xFFF8F0E8),
      body: SafeArea(
        child: Column(
          children: [
            _buildProgressHeader(),
            Expanded(
              child: SingleChildScrollView(
                padding: const EdgeInsets.fromLTRB(20, 8, 20, 16),
                child: [_buildStep1(), _buildStep2(), _buildStep3()][_step],
              ),
            ),
            _buildBottomBar(),
          ],
        ),
      ),
    );
  }

  // ── Progress header ───────────────────────────────────────────────────────

  Widget _buildProgressHeader() {
    return Padding(
      padding: const EdgeInsets.fromLTRB(20, 20, 20, 4),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: List.generate(3, (i) {
              return Expanded(
                child: Container(
                  margin: EdgeInsets.only(right: i < 2 ? 6 : 0),
                  height: 4,
                  decoration: BoxDecoration(
                    color: i <= _step
                        ? const Color(0xFF7B3300)
                        : const Color(0xFFDDD5CC),
                    borderRadius: BorderRadius.circular(2),
                  ),
                ),
              );
            }),
          ),
          const SizedBox(height: 10),
          Text(
            'STEP ${_step + 1} OF 3: ${_stepLabels[_step]}',
            style: const TextStyle(
              fontSize: 11,
              color: Colors.black45,
              fontWeight: FontWeight.w600,
              letterSpacing: 0.8,
            ),
          ),
          const SizedBox(height: 4),
          const Text(
            'Book Boarding',
            style: TextStyle(
              fontSize: 28,
              fontWeight: FontWeight.bold,
              color: Color(0xFF7B3300),
            ),
          ),
          const SizedBox(height: 12),
        ],
      ),
    );
  }

  // ── Steps ─────────────────────────────────────────────────────────────────

  Widget _buildStep1() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const Text(
          'Select Service Type',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
        const SizedBox(height: 6),
        const Text(
          'Choose the type of care for your dog.',
          style: TextStyle(color: Colors.black45, fontSize: 13),
        ),
        const SizedBox(height: 20),
        ServiceTypeCard(
          icon: Icons.wb_sunny_outlined,
          title: 'Morning Care',
          subtitle: '3 hrs · 8:00 AM – 11:00 AM',
          selected: _serviceType == 'morning',
          onTap: () => _onServiceTypeChanged('morning'),
        ),
        ServiceTypeCard(
          icon: Icons.wb_cloudy_outlined,
          title: 'Afternoon Care',
          subtitle: '3 hrs · 1:00 PM – 4:00 PM',
          selected: _serviceType == 'afternoon',
          onTap: () => _onServiceTypeChanged('afternoon'),
        ),
        ServiceTypeCard(
          icon: Icons.nightlight_outlined,
          title: 'Full Day',
          subtitle: '24 hrs · Overnight boarding',
          selected: _serviceType == 'fullday',
          onTap: () => _onServiceTypeChanged('fullday'),
        ),
      ],
    );
  }

  Widget _buildStep2() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const Text(
          "What's your dog's size?",
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
        const SizedBox(height: 6),
        const Text(
          'Select the option that best fits your dog.',
          style: TextStyle(color: Colors.black45, fontSize: 13),
        ),
        const SizedBox(height: 20),
        Row(
          children: [
            Expanded(
              child: DogSizeCard(
                title: 'Small Dog',
                subtitle: 'Under 15 kg',
                selected: _dogSize == 'small',
                onTap: () => setState(() => _dogSize = 'small'),
              ),
            ),
            const SizedBox(width: 14),
            Expanded(
              child: DogSizeCard(
                title: 'Large Dog',
                subtitle: 'Over 15 kg',
                selected: _dogSize == 'large',
                onTap: () => setState(() => _dogSize = 'large'),
              ),
            ),
          ],
        ),
      ],
    );
  }

  Widget _buildStep3() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        BookingCalendar(
          isSingleDay: _isSingleDay,
          serviceType: _serviceType,
          focusedMonth: _focusedMonth,
          checkIn: _checkIn,
          checkOut: _checkOut,
          onDayTap: _onDayTap,
          onMonthChanged: (m) => setState(() => _focusedMonth = m),
        ),
        if (_dateSelected) ...[
          const SizedBox(height: 16),
          BookingSummaryCard(
            serviceType: _serviceType,
            dogSize: _dogSize ?? 'small',
            checkIn: _checkIn,
            checkOut: _checkOut,
          ),
        ],
        const SizedBox(height: 24),
        const Text(
          'Health & Special Needs',
          style: TextStyle(fontSize: 17, fontWeight: FontWeight.bold),
        ),
        const SizedBox(height: 12),
        HealthCard(
          medNeeds: _medNeeds,
          onChanged: (v) => setState(() => _medNeeds = v),
        ),
        const SizedBox(height: 16),
        LabeledField(
          label: 'Food Allergies',
          hint: 'e.g. Chicken, Grain, Dairy',
          controller: _foodAllergyCtrl,
        ),
        const SizedBox(height: 16),
        LabeledField(
          label: 'Medication Allergies',
          hint: 'e.g. Penicillin, NSAIDs',
          controller: _medAllergyCtrl,
        ),
        const SizedBox(height: 16),
        LabeledField(
          label: 'Special Instructions',
          hint: 'Any other notes for our staff...',
          controller: _specialCtrl,
          maxLines: 4,
        ),
        const SizedBox(height: 100),
      ],
    );
  }

  // ── Bottom bar ────────────────────────────────────────────────────────────

  Widget _buildBottomBar() {
    final isLastStep = _step == 2;
    final canProceed = switch (_step) {
      0 => true,
      1 => _dogSize != null,
      _ => _dateSelected,
    };

    return Container(
      padding: const EdgeInsets.fromLTRB(20, 8, 20, 24),
      color: const Color(0xFFF8F0E8),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          SizedBox(
            width: double.infinity,
            height: 54,
            child: ElevatedButton(
              onPressed: canProceed && !_submitting
                  ? () {
                      if (isLastStep) {
                        _confirmBooking();
                      } else {
                        setState(() => _step++);
                      }
                    }
                  : null,
              style: ElevatedButton.styleFrom(
                backgroundColor: const Color(0xFF7B3300),
                disabledBackgroundColor: Colors.black12,
                foregroundColor: Colors.white,
                textStyle: const TextStyle(
                  fontSize: 16,
                  fontWeight: FontWeight.bold,
                ),
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(14),
                ),
              ),
              child: _submitting
                  ? const SizedBox(
                      height: 22,
                      width: 22,
                      child: CircularProgressIndicator(
                        color: Colors.white,
                        strokeWidth: 2.5,
                      ),
                    )
                  : Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Text(isLastStep ? 'Confirm Booking' : 'Continue'),
                        const SizedBox(width: 8),
                        const Icon(Icons.arrow_forward, size: 18),
                      ],
                    ),
            ),
          ),
          if (_step > 0) ...[
            const SizedBox(height: 6),
            TextButton(
              onPressed: () => setState(() => _step--),
              child: const Text(
                '← Back',
                style: TextStyle(color: Colors.black45),
              ),
            ),
          ] else ...[
            const SizedBox(height: 10),
            const Text(
              'You can cancel for free up to 24 hours before your booking start date.',
              textAlign: TextAlign.center,
              style: TextStyle(color: Colors.black38, fontSize: 11),
            ),
          ],
        ],
      ),
    );
  }
}
