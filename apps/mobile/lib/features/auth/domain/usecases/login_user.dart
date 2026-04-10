import 'package:app/features/auth/data/repositories/auth_repository.dart';
import 'package:app/features/auth/domain/entities/user.dart';

class LoginUser {
  final AuthRepository repository;

  LoginUser(this.repository);

  Future<User> call(String username, String password) {
    return repository.login(username, password);
  }
}