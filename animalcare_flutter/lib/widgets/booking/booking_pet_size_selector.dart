import 'package:flutter/material.dart';

class BookingPetSizeSelector extends StatelessWidget {
  final int selectedIndex;
  final ValueChanged<int> onChanged;

  const BookingPetSizeSelector({
    super.key,
    required this.selectedIndex,
    required this.onChanged,
  });

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        Expanded(child: _buildCard(0, 'Small Dog', 'Under 15kg')),
        const SizedBox(width: 16),
        Expanded(child: _buildCard(1, 'Large Dog', 'Over 15kg')),
      ],
    );
  }

  Widget _buildCard(int index, String title, String subtitle) {
    final isSelected = selectedIndex == index;
    return GestureDetector(
      onTap: () => onChanged(index),
      child: Container(
        padding: const EdgeInsets.all(20),
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(20),
          border: Border.all(
            color: isSelected ? const Color(0xFF9E5727) : Colors.transparent,
            width: 2,
          ),
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
            Container(
              width: 48,
              height: 48,
              decoration: BoxDecoration(
                color: isSelected
                    ? const Color(0xFFFFEAE3)
                    : const Color(0xFFF0EAE4),
                shape: BoxShape.circle,
              ),
              child: Icon(
                Icons.pets,
                color: isSelected
                    ? const Color(0xFF9E5727)
                    : const Color(0xFFAA9988),
                size: 24,
              ),
            ),
            const SizedBox(height: 12),
            Text(
              title,
              style: const TextStyle(
                fontSize: 16,
                fontWeight: FontWeight.bold,
                color: Color(0xFF3B2010),
              ),
            ),
            const SizedBox(height: 2),
            Text(
              subtitle,
              style: const TextStyle(fontSize: 12, color: Color(0xFFAA9988)),
            ),
            const SizedBox(height: 14),
            Row(
              children: [
                Container(
                  width: 18,
                  height: 18,
                  decoration: BoxDecoration(
                    shape: BoxShape.circle,
                    border: Border.all(
                      color: isSelected
                          ? const Color(0xFF9E5727)
                          : const Color(0xFFDDD0C8),
                      width: 2,
                    ),
                    color: isSelected
                        ? const Color(0xFF9E5727)
                        : Colors.transparent,
                  ),
                  child: isSelected
                      ? const Icon(Icons.circle, size: 7, color: Colors.white)
                      : null,
                ),
                const SizedBox(width: 6),
                Text(
                  isSelected ? 'Selected' : 'Select',
                  style: TextStyle(
                    fontSize: 13,
                    color: isSelected
                        ? const Color(0xFF9E5727)
                        : const Color(0xFFAA9988),
                    fontWeight: isSelected
                        ? FontWeight.w600
                        : FontWeight.normal,
                  ),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
