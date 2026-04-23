import 'dart:convert';
import 'package:google_sign_in/google_sign_in.dart';
import 'package:http/http.dart' as http;

const String _baseUrl = 'http://localhost:3000';

class AuthResult {
  final String accessToken;
  final Map<String, dynamic> user;

  const AuthResult({required this.accessToken, required this.user});
}

class AuthService {
  static final _googleSignIn = GoogleSignIn.instance;

  /// Sign in with Google and exchange idToken for our app's JWT
  static Future<AuthResult> signInWithGoogle() async {
    // 1. เปิด Google Sign In dialog (throws ถ้า user cancel)
    final googleUser = await _googleSignIn.authenticate();

    // 2. ดึง idToken จาก Google
    final idToken = googleUser.authentication.idToken;
    if (idToken == null) throw Exception('Failed to get Google ID token');

    // 3. ส่ง idToken ให้ Next.js backend
    final response = await http.post(
      Uri.parse('$_baseUrl/api/auth/mobile-login'),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode({'idToken': idToken}),
    );

    if (response.statusCode != 200) {
      final error = jsonDecode(response.body)['error'] ?? 'Login failed';
      throw Exception(error);
    }

    final data = jsonDecode(response.body) as Map<String, dynamic>;

    return AuthResult(
      accessToken: data['accessToken'] as String,
      user: data['user'] as Map<String, dynamic>,
    );
  }

  /// Sign in with email/password — ตรวจสอบกับ MongoDB users collection
  static Future<AuthResult> signInWithEmail(
    String email,
    String password,
  ) async {
    final response = await http.post(
      Uri.parse('$_baseUrl/api/auth/mobile-email-login'),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode({'email': email, 'password': password}),
    );

    if (response.statusCode != 200) {
      final error = jsonDecode(response.body)['error'] ?? 'Login failed';
      throw Exception(error);
    }

    final data = jsonDecode(response.body) as Map<String, dynamic>;
    return AuthResult(
      accessToken: data['accessToken'] as String,
      user: data['user'] as Map<String, dynamic>,
    );
  }

  static Future<void> signOut() async {
    await _googleSignIn.disconnect();
  }
}
