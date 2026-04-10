---
name: mobile-ui-ux
description: "Use when: definir la guía de UI y UX para apps móviles (Flutter) enfocada a crear design systems, componentes reutilizables, tokens y flujos de usabilidad. Pensada para integrarse con la skill `mobile-components` y servir como contrato para equipos de producto, diseño, QA y desarrollo."
---

## Norma: Mobile UI & UX — Skill para diseño, tokens y componentes móviles

Propósito
- Proveer una skill que defina la identidad visual, decisiones UX, el design system (tokens, primitives, componentes, layout rules) y los artefactos necesarios para que un agente IA genere directamente el código Flutter correspondiente.

Ámbito de aplicación
- Apps móviles desarrolladas en Flutter (primariamente) y PWA/Responsive cuando aplique. Diseñado para integrarse con la skill `mobile-components` (scaffolding, lógica y arquitectura).

Principios y convenciones
- Origen de verdad: mantener `design/tokens/tokens.json` como single source of truth para colores, tipografías, espacios y elevaciones.
- Accesibilidad: objetivo WCAG 2.1 AA, soporte para readers y texto dinámico.
- Mobile-first: priorizar interacción en pantallas pequeñas y latencia móvil.
- Atomic design: tokens → primitives → components → screens.
- Documentación viva: ejemplos ejecutables (Flutter Widgetbook/Widgetbook) y guías para QA.

Estructura de carpetas recomendada

- .github/skills/mobile-ui-ux/SKILL.md  — este archivo (norma + preguntas + ejemplos)
- design/
  - tokens/
    - tokens.json            — design tokens (colores, tipografías, spacing, radii, elevation)
    - exports/               — assets exportados (SVG, PNG) y mapping para Figma
  - figma/                  — file id / link y export rules
  - guidelines.md           — reglas de uso y ejemplos visuales
- flutter/
  - lib/ui/theme/design_tokens.dart  — mapeo generado desde tokens.json
  - lib/ui/primitives/                — primitives (Text, Space, Icon wrappers)
  - lib/ui/components/                — componentes Flutter implementados (Button, Card, ListItem)
- docs/
  - accessibility.md
  - ux-research.md
  - tokens.md

Design tokens (ejemplo `design/tokens/tokens.json`)

{
  "color": {
    "primary": { "value": "#1E88E5", "type": "color" },
    "primary-600": { "value": "#1565C0", "type": "color" },
    "accent": { "value": "#00BFA5", "type": "color" },
    "background": { "value": "#FFFFFF", "type": "color" },
    "surface": { "value": "#F5F7FA", "type": "color" },
    "text": { "value": "#0F172A", "type": "color" },
    "muted": { "value": "#6B7280", "type": "color" }
  },
  "typography": {
    "font-family": { "value": "Inter", "type": "string" },
    "h1-size": { "value": "28", "unit": "px" },
    "body-size": { "value": "16", "unit": "px" }
  },
  "spacing": {
    "xs": { "value": "4", "unit": "px" },
    "sm": { "value": "8", "unit": "px" },
    "md": { "value": "16", "unit": "px" },
    "lg": { "value": "24", "unit": "px" }
  },
  "radii": {
    "sm": { "value": "6", "unit": "px" },
    "md": { "value": "12", "unit": "px" }
  },
  "elevation": {
    "card": { "value": "2" },
    "dialog": { "value": "8" }
  }
}

Cómo mapear tokens a Flutter
- Mantener `design/tokens/tokens.json` como origen y generar automáticamente `flutter/lib/ui/theme/design_tokens.dart` (CI/script). El archivo debe exponer colores, TextStyles, tamaños y constantes de espaciado para ThemeData y componentes.

Snippet (pseudocódigo Flutter) — `design_tokens.dart`

```dart
import 'package:flutter/material.dart';

class AppColors {
  static const primary = Color(0xFF1E88E5);
  static const primary600 = Color(0xFF1565C0);
  static const accent = Color(0xFF00BFA5);
  static const background = Color(0xFFFFFFFF);
  static const surface = Color(0xFFF5F7FA);
  static const text = Color(0xFF0F172A);
}

ThemeData buildAppTheme() => ThemeData(
  primaryColor: AppColors.primary,
  scaffoldBackgroundColor: AppColors.background,
  textTheme: TextTheme(
    bodyText1: TextStyle(fontSize:16, color:AppColors.text),
  ),
);
```

Componentes y primitives (recomendado)
- Primitives: Text styles, Icon wrappers, Space widgets, Semantic wrappers.
- Components: PrimaryButton (estados: enabled/loading/disabled), InputField (label, helper, error), Card, ListItem, EmptyState.

Ejemplo: PrimaryButton (pseudocódigo)

```dart
class PrimaryButton extends StatelessWidget {
  final String label;
  final VoidCallback? onPressed;
  final bool loading;

  const PrimaryButton({required this.label, this.onPressed, this.loading = false});

  @override
  Widget build(BuildContext context) {
    return ElevatedButton(
      onPressed: (loading || onPressed == null) ? null : onPressed,
      child: loading ? SizedBox(width:16, height:16, child:CircularProgressIndicator(strokeWidth:2)) : Text(label),
      style: ElevatedButton.styleFrom(
        padding: EdgeInsets.symmetric(horizontal: 16, vertical: 12),
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
      ),
    );
  }
}
```

Preguntas para personalizar la skill y generar artefactos listos para usar
1) ¿Cuál es el objetivo principal del diseño o componente que necesitas?
2) ¿Qué pantallas o flujos específicos deseas implementar?
3) ¿Existen restricciones de diseño o lineamientos que deba seguir?
4) ¿Qué nivel de accesibilidad o soporte multiplataforma necesitas?

Cómo usar esta skill
- Proporciona las respuestas a las preguntas anteriores y el agente generará directamente el código Flutter correspondiente, sin wireframes ni entregables adicionales.
