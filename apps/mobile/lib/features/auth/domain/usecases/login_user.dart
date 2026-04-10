import 'package:ranking_docentes/features/auth/data/repositories/auth_repository.dart';
import 'package:ranking_docentes/features/auth/domain/entities/user.dart';

class LoginUser {
  final AuthRepository repository;

  LoginUser(this.repository);

  Future<User> call(String username, String password) {
    return repository.login(username, password);
  }
}