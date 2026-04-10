---
name: database-module
description: "Use when: centralizar la conexión a la base de datos (Prisma) en un módulo reutilizable. Contiene: DatabaseModule, PrismaService, exportación de providers y recomendaciones de uso."
---

# Norma: DatabaseModule / PrismaModule

Objetivo
- Centralizar la creación y configuración de `PrismaService` en un módulo reutilizable.
- Evitar exportar providers desde módulos de feature (tags, teachers) para compartir infraestructura.

Estructura mínima
- `src/infrastructure/database/prisma.service.ts` — contiene `PrismaService` (extends `PrismaClient`) y decoradores `@Injectable()` con hooks `OnModuleInit/OnModuleDestroy`.
- `src/infrastructure/database/database.module.ts` — módulo que provee y exporta `PrismaService`.

Recomendaciones
- Marcar `DatabaseModule` con `@Global()` solo si quieres evitar importarlo explícitamente en cada feature. Si lo haces, documenta el uso y los motivos.
- Importar `DatabaseModule` en cada `FeatureModule` que necesite acceso a Prisma (sin `@Global`) para mantener dependencias explícitas.
- Mantener la lógica de conexión (timeouts, logs) en `PrismaService`.
- No inyectar `PrismaService` directamente en controladores; inyectarlo en repositorios para mantener separación de responsabilidades.

Ejemplo
```ts
// database.module.ts
import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class DatabaseModule {}
```

Proceso al añadir un nuevo módulo que use DB
1. Crear o actualizar `schema.prisma`.
2. Ejecutar `npx prisma generate`.
3. Crear la implementación del repositorio en `infrastructure/repositories/<feature>/prisma-<feature>.repository.ts`.
4. En el `<feature>.module.ts` añadir `imports: [DatabaseModule]` y registrar el repositorio en `providers`.

Notas de pruebas
- Para tests unitarios, mantener una implementación `InMemory<Feature>Repository` y usarla en los tests o mediante overrides en `TestingModule`.
- No mezclar `InMemory` y `Prisma` en producción; `InMemory` es solo para tests/CI.

Fin.
