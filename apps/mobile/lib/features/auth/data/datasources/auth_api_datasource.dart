import 'package:dio/dio.dart';
import 'package:ranking_docentes/core/network/api_client.dart';
import 'package:ranking_docentes/core/storage/auth_storage.dart';
import 'package:ranking_docentes/features/auth/data/models/login_request.dart';
import 'package:ranking_docentes/features/auth/data/models/login_response.dart';

class AuthApiDatasource {
  final ApiClient client;
  final AuthStorage storage;

  AuthApiDatasource(this.client, this.storage);

  Future<LoginResponse> login(LoginRequest request) async {
    try {
      final response = await client.post(
        '/auth/login',
        data: request.toJson(),
      );

      final loginResponse = LoginResponse.fromJson(response.data);

      // Save token to secure storage
      await storage.saveToken(loginResponse.token);

      return loginResponse;
    } on DioError catch (e) {
      if (e.response?.statusCode == 401) {
        throw Exception('Invalid credentials');
      } else {
        throw Exception('An error occurred: ${e.message}');
      }
    }
  }
}