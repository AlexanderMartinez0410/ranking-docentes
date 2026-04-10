class LoginResponse {
  final String token;
  final LoginUserResponse user;

  LoginResponse({required this.token, required this.user});

  factory LoginResponse.fromJson(Map<String, dynamic> json) {
    final userJson = json['user'] as Map<String, dynamic>? ?? {};
    return LoginResponse(
      token: (json['token'] ?? '').toString(),
      user: LoginUserResponse.fromJson(userJson),
    );
  }
}

class LoginUserResponse {
  final int idUsers;
  final String username;
  final LoginPersonResponse person;
  final LoginRoleResponse role;
  final bool isActive;

  LoginUserResponse({
    required this.idUsers,
    required this.username,
    required this.person,
    required this.role,
    required this.isActive,
  });

  factory LoginUserResponse.fromJson(Map<String, dynamic> json) {
    return LoginUserResponse(
      idUsers: _toInt(json['idUsers']),
      username: (json['username'] ?? '').toString(),
      person: LoginPersonResponse.fromJson(
        json['person'] as Map<String, dynamic>? ?? {},
      ),
      role: LoginRoleResponse.fromJson(
        json['role'] as Map<String, dynamic>? ?? {},
      ),
      isActive: json['isActive'] == true,
    );
  }
}

class LoginPersonResponse {
  final String name;
  final String lastName;

  LoginPersonResponse({required this.name, required this.lastName});

  factory LoginPersonResponse.fromJson(Map<String, dynamic> json) {
    return LoginPersonResponse(
      name: (json['name'] ?? '').toString(),
      lastName: (json['lastName'] ?? '').toString(),
    );
  }
}

class LoginRoleResponse {
  final String name;

  LoginRoleResponse({required this.name});

  factory LoginRoleResponse.fromJson(Map<String, dynamic> json) {
    return LoginRoleResponse(
      name: (json['name'] ?? '').toString(),
    );
  }
}

int _toInt(dynamic value) {
  if (value is int) {
    return value;
  }
  return int.tryParse(value?.toString() ?? '') ?? 0;
}
