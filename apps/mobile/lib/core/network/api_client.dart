import 'package:dio/dio.dart';

class ApiClient {
  final Dio _dio;

  /// Default base URL. Can be overridden by passing [baseUrl] or by using
  /// the --dart-define=API_BASE_URL=... when running/building the app.
  static const String _defaultBaseUrl = String.fromEnvironment(
    'API_BASE_URL',
    defaultValue: 'http://localhost:3000',
  );

  ApiClient({Dio? dio, String? baseUrl})
      : _dio = dio ?? Dio(BaseOptions(baseUrl: baseUrl ?? _defaultBaseUrl));

  Future<Response<dynamic>> post(
    String path, {
    dynamic data,
    Options? options,
  }) {
    return _dio.post(path, data: data, options: options);
  }
}
