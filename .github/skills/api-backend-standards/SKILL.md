---
name: api-backend-standards
description: "Use when: iniciar o extender el backend (NestJS) con un estándar. Incluye: estructura por feature, DTOs, repositorios, conexión DB, casos de uso, controladores, Swagger y documentación." 
---

# Estándar Backend API (NestJS) — Ranking Docentes

## Objetivo
Definir cómo crear features, DTOs, repositorios y documentación. Mantener orden y consistencia en `apps/api`.

## Estructura base (feature-first)
Ubicación principal en `apps/api/src/`:

- `modules/<feature>/` → módulo NestJS por feature
- `application/dto/<feature>/` → DTOs de entrada/salida
- `application/use-cases/<feature>/` → casos de uso (reglas de negocio)
- `infrastructure/repositories/<feature>/` → repositorios y acceso a datos
- `interfaces/controllers/<feature>/` → controladores HTTP

> Regla: todo lo nuevo debe quedar dentro de una feature. Evitar “código suelto”.

## Convención de archivos
- **Entidad o modelo**: `domain/<feature>/<feature>.entity.ts` (si aplica)
- **Repositorio**: `infrastructure/repositories/<feature>/<feature>.repository.ts`
- **DTOs**: `application/dto/<feature>/<accion>-<feature>.dto.ts`
- **Use Case**: `application/use-cases/<feature>/<accion>-<feature>.usecase.ts`
- **Controller**: `interfaces/controllers/<feature>.controller.ts`
- **Module**: `modules/<feature>/<feature>.module.ts`

## Flujo recomendado al crear una feature
1. Definir el **DTO** (entrada/salida)
2. Crear **Use Case** (regla de negocio)
3. Implementar **Repositorio** (datos)
4. Crear **Controller** (HTTP)
5. Registrar en **Module**
6. Documentar en **Swagger**

---

# Ejemplo práctico: API de `tags`
Supongamos una tabla `tags` con campos: `id_tags`, `name`, `is_active`.

## 1) DTOs
`application/dto/tags/create-tag.dto.ts`
```ts
export class CreateTagDto {
  name: string;
}
```

`application/dto/tags/tag-response.dto.ts`
```ts
export class TagResponseDto {
  id_tags: number;
  name: string;
  is_active: boolean;
}
```

## 2) Repositorio
`infrastructure/repositories/tags/tags.repository.ts`
```ts
export interface TagsRepository {
  create(dto: CreateTagDto): Promise<TagResponseDto>;
  findAll(): Promise<TagResponseDto[]>;
  findById(id: number): Promise<TagResponseDto | undefined>;
  update(id: number, dto: UpdateTagDto): Promise<TagResponseDto | undefined>;
  delete(id: number): Promise<boolean>;
  enable(id: number): Promise<TagResponseDto | undefined>;
  disable(id: number): Promise<TagResponseDto | undefined>;
}
```

> Si se usa ORM (TypeORM/Prisma), la implementación concreta vive aquí.

## 3) Use Cases
`application/use-cases/tags/create-tag.usecase.ts`
```ts
// patrón: inyectar repositorio e implementar execute(...)
```

## 4) Controller
`interfaces/controllers/tags.controller.ts`
```ts
// Endpoints base sugeridos
// GET /tags
// GET /tags/:id
// POST /tags
// PUT /tags/:id
// DELETE /tags/:id
// PATCH /tags/:id/enable
// PATCH /tags/:id/disable
```

## 5) Module
`modules/tags/tags.module.ts`
```ts
// registrar controladores, use-cases y repositorio
```

## Regla adicional (is_active)
- Si la entidad tiene `is_active`, debe existir **habilitar** y **deshabilitar** además de **crear/editar/eliminar**.
- Si la entidad **no** tiene `is_active`, solo usar **crear/editar/eliminar**.

---

# Conexión a base de datos
- Centralizar configuración en `infrastructure/database/`.
- Usar variables de entorno (`DB_HOST`, `DB_PORT`, etc.) según `tools/skills/env-variables.SKILL.md`.
- **Nunca** hardcodear credenciales.

## Reglas de conexión
- En local: usar `.env` y `.env.example`
- En Docker: usar `env_file` del compose

## Ejemplo: Prisma schema (models para person, teachers, attachments, tags)
Si usas Prisma, añade/actualiza `apps/api/prisma/schema.prisma` con algo así:

```prisma
datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model person {
  id_person Int     @id @default(autoincrement())
  name      String
  last_name String

  teacher   teachers?
}

model attachments {
  id_attachments Int    @id @default(autoincrement())
  type           String
  path           String

  teacher        teachers[]
}

model teachers {
  id_teachers    Int          @id @default(autoincrement())
  id_attachments Int?
  is_active      Boolean
  id_person      Int          @unique

  person         person       @relation(fields: [id_person], references: [id_person])
  attachment     attachments? @relation(fields: [id_attachments], references: [id_attachments])
}

model tags {
  id_tags   Int     @id @default(autoincrement())
  name      String
  is_active Boolean
}
```

Comandos útiles:

```bash
# Generar cliente Prisma (después de editar schema)
npx prisma generate

# Crear/migrar la BD (dev)
npx prisma migrate dev --name init

# Ver el cliente en código
npx prisma studio  # ver datos en navegador
```

Notas:
- Asegúrate de definir `DATABASE_URL` en `apps/api/.env` o en la variable de entorno. Ejemplo: `DATABASE_URL="mysql://user:pass@localhost:3306/dbname"`.
- Después de `prisma generate` usa `PrismaClient` dentro de `infrastructure/repositories/*` para implementar repositorios reales.
- Si defines una relación **uno a uno** (por ejemplo `person` ↔ `teachers`), el campo FK en el lado “dueño” debe ser `@unique`.
- Si aparece `EPERM: operation not permitted ... query_engine-windows.dll.node`, normalmente es porque el servidor Node/Nest está usando el motor Prisma. **Solución**: detener `npm run start:dev`, cerrar procesos `node`, y ejecutar `npx prisma generate` otra vez.

## Proceso guiado (evita alucinaciones)
Cuando el usuario pida un nuevo feature con DB/Swagger, seguir pasos y **preguntar antes de avanzar**:
1) **Confirmar tablas/campos**: “¿Estos campos están correctos?”
2) **Schema**: generar/actualizar `schema.prisma` y preguntar: “¿Ejecuto `prisma generate` y `migrate`?”
3) **Repositorios**: crear repositorio y preguntar: “¿Implemento repo Prisma?”
4) **Use-cases y Controllers**: crear endpoints y preguntar: “¿Agrego al módulo y Swagger?”
5) **Swagger**: verificar `/docs` y preguntar: “¿Probamos endpoints?”


---

# Documentación tipo Swagger
Sí, es posible y **recomendado**.

## Paquetes
- `@nestjs/swagger`
- `swagger-ui-express`

## Ejemplo básico (en `main.ts`)
```ts
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

const config = new DocumentBuilder()
  .setTitle('Ranking Docentes API')
  .setDescription('Documentación de endpoints')
  .setVersion('1.0')
  .build();

const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('docs', app, document);
```

## Decoradores en DTOs
```ts
import { ApiProperty } from '@nestjs/swagger';

export class CreateTeacherDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  score: number;
}
```

---

# Checklist de calidad
- [ ] Feature en su carpeta correspondiente
- [ ] DTOs validados (class-validator si aplica)
- [ ] Use Case sin lógica de infraestructura
- [ ] Repositorio aislado
- [ ] Controller limpio
- [ ] Swagger actualizado
- [ ] `.env.example` actualizado
