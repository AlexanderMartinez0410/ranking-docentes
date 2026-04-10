import 'package:ranking_docentes/features/auth/data/datasources/auth_api_datasource.dart';
import 'package:ranking_docentes/features/auth/data/models/login_request.dart';
import 'package:ranking_docentes/features/auth/domain/entities/user.dart';

class AuthRepository {
  final AuthApiDatasource datasource;

  AuthRepository(this.datasource);

  Future<User> login(String username, String password) async {
    final request = LoginRequest(username: username, password: password);
    final response = await datasource.login(request);
    return response.user.toEntity();
  }

  Future<void> logout() async {
    await datasource.storage.clearToken();
  }
}