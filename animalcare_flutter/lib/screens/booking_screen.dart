import 'package:flutter/material.dart';

import '../widgets/booking/booking_step_header.dart';
import '../widgets/booking/booking_calendar.dart';
import '../widgets/booking/booking_pet_size_selector.dart';
import '../widgets/booking/booking_care_options.dart';
import '../widgets/booking/booking_summary_card.dart';
import '../widgets/booking/booking_medical_toggle.dart';

class BookingScreen extends StatefulWidget {
  const BookingScreen({super.key});

  @override
  State<BookingScreen> createState() => _BookingScreenState();
}

class _BookingScreenState extends State<BookingScreen> {
  DateTime? _checkIn;
  DateTime? _checkOut;
  int _petSize = 0; // 0=small, 1=large
  int _careOption = 0; // 0=morning, 1=afternoon, 2=fullday
  bool _medicalNeeds = false;

  bool get _datesSelected => _checkIn != null && _checkOut != null;

  bool get _isSameDay {
    if (!_datesSelected) return false;
    return _checkIn!.year == _checkOut!.year &&
        _checkIn!.month == _checkOut!.month &&
        _checkIn!.day == _checkOut!.day;
  }

  void _onRangeChanged(DateTime? checkIn, DateTime? checkOut) {
    setState(() {
      _checkIn = checkIn;
      _checkOut = checkOut;

      if (checkIn != null && checkOut != null) {
        final same =
            checkIn.year == checkOut.year &&
            checkIn.month == checkOut.month &&
            checkIn.day == checkOut.day;

        if (same && _careOption == 2) {
          _careOption = 0; // full day → morning
        } else if (!same && _careOption != 2) {
          _careOption = 2; // morning/afternoon → full day
        }
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      bottom: false,
      child: SingleChildScrollView(
        physics: const AlwaysScrollableScrollPhysics(),
        padding: const EdgeInsets.only(
          left: 24,
          right: 24,
          top: 24,
          bottom: 120,
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Header (reuse same style across screens)
            const _ScreenHeader(),
            const SizedBox(height: 28),

            // Step progress + title
            const BookingStepHeader(),
            const SizedBox(height: 32),

            // Date range calendar
            BookingCalendar(
              checkIn: _checkIn,
              checkOut: _checkOut,
              onRangeChanged: _onRangeChanged,
            ),
            const SizedBox(height: 24),

            // Pet size
            BookingPetSizeSelector(
              selectedIndex: _petSize,
              onChanged: (i) => setState(() => _petSize = i),
            ),
            const SizedBox(height: 24),

            // Specialized care (disable logic inside widget)
            BookingCareOptions(
              selectedIndex: _careOption,
              isSameDay: _isSameDay,
              datesSelected: _datesSelected,
              onChanged: (i) => setState(() => _careOption = i),
            ),
            const SizedBox(height: 24),

            // Booking summary (dynamic pricing)
            BookingSummaryCard(
              checkIn: _checkIn,
              checkOut: _checkOut,
              careIndex: _careOption,
            ),
            const SizedBox(height: 16),

            // Medical needs toggle
            BookingMedicalToggle(
              value: _medicalNeeds,
              onChanged: (v) => setState(() => _medicalNeeds = v),
            ),
            const SizedBox(height: 30),

            // CTA button
            SizedBox(
              width: double.infinity,
              height: 56,
              child: ElevatedButton(
                onPressed: () {},
                style: ElevatedButton.styleFrom(
                  backgroundColor: const Color(0xFF7B3F1A),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(28),
                  ),
                  elevation: 0,
                ),
                child: const Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Text(
                      'Continue to Payment',
                      style: TextStyle(
                        color: Colors.white,
                        fontSize: 16,
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                    SizedBox(width: 8),
                    Icon(Icons.arrow_forward, color: Colors.white, size: 18),
                  ],
                ),
              ),
            ),
            const SizedBox(height: 14),

            // Cancellation note
            const Text(
              'You can cancel for free up to 24 hours before\nyour booking start date.',
              textAlign: TextAlign.center,
              style: TextStyle(
                fontSize: 12,
                color: Color(0xFFAA9988),
                height: 1.5,
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class _ScreenHeader extends StatelessWidget {
  const _ScreenHeader();

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        const CircleAvatar(
          backgroundColor: Color(0xFFFDE4D7),
          radius: 20,
          backgroundImage: NetworkImage('https://i.pravatar.cc/150?img=11'),
        ),
        const SizedBox(width: 12),
        const Text(
          'HealthyCareDog',
          style: TextStyle(
            fontSize: 18,
            fontWeight: FontWeight.bold,
            color: Color(0xFF8B4513),
          ),
        ),
        const Spacer(),
        Stack(
          children: [
            const Icon(Icons.notifications_none, color: Color(0xFF8B4513)),
            Positioned(
              right: 2,
              top: 2,
              child: Container(
                width: 8,
                height: 8,
                decoration: const BoxDecoration(
                  color: Colors.red,
                  shape: BoxShape.circle,
                ),
              ),
            ),
          ],
        ),
      ],
    );
  }
}
