import 'package:dio/dio.dart';
import 'package:app/core/network/api_client.dart';
import 'package:app/core/network/api_exception.dart';
import 'package:app/core/storage/auth_storage.dart';
import 'package:app/features/auth/data/models/login_request.dart';
import 'package:app/features/auth/data/models/login_response.dart';

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
      final respData = e.response?.data;
      if (respData != null) {
        // server expected structure: { statusCode: 403, message: "..." }
        final serverMessage = respData['message'];
        if (serverMessage != null) {
          if (serverMessage is List) {
            throw ApiException(serverMessage.join(', '));
          }
          throw ApiException(serverMessage.toString());
        }
      }

      if (e.response?.statusCode == 401) {
        throw ApiException('Error de autenticación: credenciales inválidas');
      }

      throw ApiException('An error occurred: ${e.message}');
    }
  }
}