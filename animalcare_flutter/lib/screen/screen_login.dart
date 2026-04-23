import 'package:animalcare_flutter/services/auth_service.dart';
import 'package:animalcare_flutter/widget/login/google_sign_in_button.dart';
import 'package:animalcare_flutter/widget/login/labeled_text_field.dart';
import 'package:animalcare_flutter/widget/login/login_header.dart';
import 'package:animalcare_flutter/widget/login/or_divider.dart';
import 'package:flutter/material.dart';

class LoginScreen extends StatefulWidget {
  const LoginScreen({super.key});

  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();
  bool _obscurePassword = true;
  bool _isLoading = false;

  @override
  void dispose() {
    _emailController.dispose();
    _passwordController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        decoration: const BoxDecoration(
          gradient: LinearGradient(
            begin: Alignment.topRight,
            end: Alignment.bottomLeft,
            colors: [Color(0xFFFAEDD4), Color(0xFFFDF6E3)],
          ),
        ),
        child: SafeArea(
          child: Center(
            child: SingleChildScrollView(
              padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 32),
              child: _LoginCard(
                emailController: _emailController,
                passwordController: _passwordController,
                obscurePassword: _obscurePassword,
                isLoading: _isLoading,
                onTogglePassword: () =>
                    setState(() => _obscurePassword = !_obscurePassword),
                onSignIn: _handleSignIn,
                onGoogleSignIn: _handleGoogleSignIn,
              ),
            ),
          ),
        ),
      ),
    );
  }

  Future<void> _handleSignIn() async {
    final email = _emailController.text.trim();
    final password = _passwordController.text;

    if (email.isEmpty || password.isEmpty) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Please enter email and password')),
      );
      return;
    }

    setState(() => _isLoading = true);
    try {
      final result = await AuthService.signInWithEmail(email, password);
      if (!mounted) return;
      // TODO: เก็บ result.accessToken และ navigate ไปหน้าหลัก
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Welcome, ${result.user['name']}!')),
      );
    } catch (e) {
      if (!mounted) return;
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text(e.toString()), backgroundColor: Colors.red),
      );
    } finally {
      if (mounted) setState(() => _isLoading = false);
    }
  }

  Future<void> _handleGoogleSignIn() async {
    setState(() => _isLoading = true);
    try {
      final result = await AuthService.signInWithGoogle();
      if (!mounted) return;
      // TODO: เก็บ result.accessToken และ navigate ไปหน้าหลัก
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Welcome, ${result.user['name']}!')),
      );
      // result.accessToken // long string
      // result.user // {id,name,email,role}
    } catch (e) {
      if (!mounted) return;
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text(e.toString()), backgroundColor: Colors.red),
      );
    } finally {
      if (mounted) setState(() => _isLoading = false);
    }
  }
}

class _LoginCard extends StatelessWidget {
  final TextEditingController emailController;
  final TextEditingController passwordController;
  final bool obscurePassword;
  final bool isLoading;
  final VoidCallback onTogglePassword;
  final VoidCallback onSignIn;
  final VoidCallback onGoogleSignIn;

  const _LoginCard({
    required this.emailController,
    required this.passwordController,
    required this.obscurePassword,
    required this.isLoading,
    required this.onTogglePassword,
    required this.onSignIn,
    required this.onGoogleSignIn,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(32),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(24),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withValues(alpha: 0.08),
            blurRadius: 24,
            offset: const Offset(0, 6),
          ),
        ],
      ),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          const LoginHeader(),
          const SizedBox(height: 32),
          LabeledTextField(
            label: 'Email Address',
            controller: emailController,
            hintText: 'you@example.com',
            keyboardType: TextInputType.emailAddress,
          ),
          const SizedBox(height: 20),
          LabeledTextField(
            label: 'Password',
            controller: passwordController,
            hintText: '••••••••',
            obscureText: obscurePassword,
            suffixIcon: IconButton(
              icon: Icon(
                obscurePassword
                    ? Icons.visibility_off_outlined
                    : Icons.visibility_outlined,
                color: Colors.grey,
              ),
              onPressed: onTogglePassword,
            ),
          ),
          const SizedBox(height: 28),
          ElevatedButton(
            onPressed: onSignIn,
            style: ElevatedButton.styleFrom(
              backgroundColor: const Color(0xFF8B4513),
              foregroundColor: Colors.white,
              padding: const EdgeInsets.symmetric(vertical: 16),
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(12),
              ),
              elevation: 2,
            ),
            child: const Text(
              'Sign In',
              style: TextStyle(fontSize: 16, fontWeight: FontWeight.w600),
            ),
          ),
          const SizedBox(height: 24),
          const OrDivider(),
          const SizedBox(height: 24),
          isLoading
              ? const Center(child: CircularProgressIndicator())
              : GoogleSignInButton(onPressed: onGoogleSignIn),
        ],
      ),
    );
  }
}
