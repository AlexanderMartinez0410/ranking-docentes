import 'package:app/features/auth/data/datasources/auth_api_datasource.dart';
import 'package:app/features/auth/data/models/login_request.dart';
import 'package:app/features/auth/domain/entities/user.dart';

class AuthRepository {
  final AuthApiDatasource datasource;

  AuthRepository(this.datasource);

  Future<User> login(String username, String password) async {
    final request = LoginRequest(username: username, password: password);
    final response = await datasource.login(request);
    return User.fromLoginResponse(response);
  }

  Future<void> logout() async {
    await datasource.storage.clearToken();
  }
}