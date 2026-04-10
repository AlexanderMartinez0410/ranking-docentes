import 'package:app/features/auth/data/models/login_response.dart';

class User {
  final int id;
  final String username;
  final String name;
  final String lastName;
  final String role;
  final bool isActive;

  User({
    required this.id,
    required this.username,
    required this.name,
    required this.lastName,
    required this.role,
    required this.isActive,
  });

  factory User.fromLoginResponse(LoginResponse response) {
    return User(
      id: response.user.idUsers,
      username: response.user.username,
      name: response.user.person.name,
      lastName: response.user.person.lastName,
      role: response.user.role.name,
      isActive: response.user.isActive,
    );
  }
}