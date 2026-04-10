import 'package:app/core/network/api_client.dart';

/// Central configuration and singletons for the app.
///
/// Use `apiClient` everywhere to avoid scattering baseUrl across the codebase.
final ApiClient apiClient = ApiClient();

/// Optional helper to override API base URL at runtime (if needed).
/// Prefer passing --dart-define=API_BASE_URL=<url> when building/running.
void setApiBaseUrl(String baseUrl) {
  // Re-create the ApiClient singleton if you need to change baseUrl at runtime.
  // Note: since `apiClient` is a top-level final, we cannot reassign it here.
  // If runtime changes are required, switch to a mutable singleton pattern.
  throw UnsupportedError('Changing API base URL at runtime is not supported. Use --dart-define=API_BASE_URL at build/run time.');
}
