---
name: mobile-components
description: "Use when: definir la arquitectura y lógica de componentes móviles (Flutter). Contiene guías, plantillas y un flujo reproducible para diseñar componentes (UI + logic + data) tomando como referencia el componente de login ya implementado. Ideal para generar scaffolding y mantener consistencia entre features." 
---
# Norma: Mobile Components (Flutter) — Estándar operativo y generador de scaffolding

Propósito
- Proveer un estándar operativo y reproducible para diseñar, generar y revisar componentes móviles (Flutter) que interactúan con el backend. Pensado para que, partiendo del login ya funcional, el equipo pueda generar scaffolding de nuevas features con consistencia.

Ámbito de aplicación
- Componentes UI que requieren estado, validaciones, llamadas HTTP, manejo de tokens o navegación (login, registro, perfil, reviews, etc.).

Principios y convenciones
- Single Responsibility: UI (widgets) ≠ estado (Bloc/Cubit) ≠ acceso a datos (Repository/ApiClient).
- Inyección de dependencias: usar Provider / BlocProvider / Riverpod para inyectar Repositories y UseCases.
- Capa de dominio: casos de uso (UseCase) para encapsular lógica y facilitar tests.
- Seguridad y storage: tokens en `flutter_secure_storage` y preferir refresh tokens si existen.
- UX: estados claros (loading, empty, success, error) y mensajes de backend mostrados con cuidado.

Estructura de carpetas (obligatoria para generar)

- lib/
	- core/
		- network/api_client.dart
		- storage/secure_storage.dart
		- config.dart
	- features/
		- <feature>/
			- presentation/
				- pages/<feature>_page.dart
				- widgets/
				- bloc/<feature>_bloc.dart
			- domain/
				- usecases/<action>_<feature>.dart
			- data/
				- repositories/<feature>_repository.dart

Flujo de creación de un componente (paso a paso)
1. Definir DTOs/Contracts (inputs/outputs) que usará la pantalla.
2. Crear UseCase(s) en `domain/usecases` (sin dependencias infra).
3. Implementar Repository en `data/repositories` usando `ApiClient`.
4. Implementar Bloc/Cubit en `presentation/bloc` que invoque UseCase(s).
5. Crear Page y Widgets en `presentation/pages` y `widgets` y wire con BlocProvider.
6. Añadir tests unitarios y widget tests.
7. Revisar checklist y merge.

Plantillas y snippets (archivos que el generador debe crear)
- `lib/features/<feature>/presentation/pages/<feature>_page.dart` — pantalla (StatelessWidget) con BlocProvider
- `lib/features/<feature>/presentation/bloc/<feature>_bloc.dart` — eventos/estados/logic
- `lib/features/<feature>/domain/usecases/<action>_<feature>.dart` — caso de uso con una interface y su ejecución
- `lib/features/<feature>/data/repositories/<feature>_repository_impl.dart` — implementación que usa `ApiClient`
- `lib/core/network/api_client.dart` — con interceptor para Authorization
- `lib/core/storage/secure_storage.dart` — wrapper de `flutter_secure_storage`

Snippet: ApiClient
```dart
import 'package:dio/dio.dart';

class ApiClient {
	final Dio _dio;
	ApiClient(String baseUrl) : _dio = Dio(BaseOptions(baseUrl: baseUrl));

	void setToken(String? token) {
		if (token != null) _dio.options.headers['Authorization'] = 'Bearer $token';
		else _dio.options.headers.remove('Authorization');
	}

	Future<Response> post(String path, dynamic data) => _dio.post(path, data: data);
	// add get, put, delete helpers
}
```

Snippet: SecureStorage
```dart
import 'package:flutter_secure_storage/flutter_secure_storage.dart';

class SecureStorage {
	final _storage = const FlutterSecureStorage();
	Future<void> saveToken(String token) => _storage.write(key: 'token', value: token);
	Future<String?> readToken() => _storage.read(key: 'token');
	Future<void> clear() => _storage.deleteAll();
}
```

AuthBloc (pseudocódigo)
```dart
class AuthBloc extends Bloc<AuthEvent, AuthState> {
	final LoginUser loginUser;
	AuthBloc(this.loginUser) : super(AuthInitial()) {
		on<LoginRequested>((e, emit) async {
			emit(AuthLoading());
			try {
				final user = await loginUser(e.username, e.password);
				emit(AuthAuthenticated(user));
			} catch (err) {
				emit(AuthError(err.toString()));
			}
		});
	}
}
```

Testing recomendado
- Unit: mockear `ApiClient` y probar `Repository` y `UseCase`.
- Widget: renderizar `LoginPage` con `BlocProvider` y simular estados.
- Integration: pruebas E2E con `integration_test` para login → home.

Comandos útiles
```bash
# ejecutar tests
flutter test

# ejecutar pruebas de integración
flutter drive --target=test_driver/app.dart
```

Checklist antes de merge (obligatorio)
- [ ] DTOs y contratos revisados
- [ ] UseCase probado (unit tests)
- [ ] Repository probado con mocks
- [ ] Widget test del page principal
- [ ] Token gestionado en `flutter_secure_storage`
- [ ] ApiClient configurado con `baseUrl` por ambiente
- [ ] Manejo de errores y mensajes (403 bloqueada) implementado
- [ ] Documentación breve en `docs/mobile/<feature>.md`

Generación automática (opcional)
- La skill debe permitir generar scaffolding ejecutando un script que crea los archivos de plantilla y actualiza `lib/features` con los nombres.
- Ejemplo de workflow del generador:
	1. Preguntar nombre del feature (ej: `profile`).
	2. Crear carpetas y archivos templates con placeholders (feature name).
	3. Añadir entradas a README o docs y ejecutar `flutter pub get` si es necesario.

Observaciones finales
- Esta skill está pensada para ser pegada en `.github/skills/mobile-components/SKILL.md` y servir como contrato entre backend y mobile.
- Si quieres, puedo generar un script de scaffolding (`tools/generate_mobile_feature.js`) que lea la skill y cree los archivos de ejemplo automáticamente.

Fin.
