import 'package:flutter/material.dart';
import 'screens/main_shell.dart';

void main() {
  runApp(const AnimalCareApp());
}

class AnimalCareApp extends StatelessWidget {
  const AnimalCareApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Animal Care',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        scaffoldBackgroundColor: const Color(0xFFFDF8F4),
        colorScheme: ColorScheme.fromSeed(seedColor: const Color(0xFF8B4513)),
      ),
      home: const MainShell(),
    );
  }
}
