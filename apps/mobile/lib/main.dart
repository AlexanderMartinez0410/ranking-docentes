import 'package:flutter/material.dart';
import 'package:app/ui/theme/design_tokens.dart';
import 'package:app/features/auth/presentation/pages/welcome_page.dart';

void main() {
  runApp(const RankingDocentesApp());
}

class RankingDocentesApp extends StatelessWidget {
  const RankingDocentesApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Ranking Docentes',
      theme: buildAppTheme(),
      home: const WelcomePage(),
    );
  }
}
