import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:ranking_docentes/features/auth/presentation/bloc/auth_bloc.dart';

class LoginPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Login'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: BlocProvider(
          create: (context) => AuthBloc(), // Asegúrate de proporcionar el AuthBloc correctamente
          child: LoginForm(),
        ),
      ),
    );
  }
}

class LoginForm extends StatelessWidget {
  final TextEditingController _usernameController = TextEditingController();
  final TextEditingController _passwordController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        TextField(
          controller: _usernameController,
          decoration: InputDecoration(labelText: 'Username'),
        ),
        SizedBox(height: 16),
        TextField(
          controller: _passwordController,
          decoration: InputDecoration(labelText: 'Password'),
          obscureText: true,
        ),
        SizedBox(height: 32),
        ElevatedButton(
          onPressed: () {
            final username = _usernameController.text;
            final password = _passwordController.text;
            context.read<AuthBloc>().add(LoginRequested(username, password));
          },
          child: Text('Login'),
        ),
        BlocBuilder<AuthBloc, AuthState>(
          builder: (context, state) {
            if (state is AuthLoading) {
              return CircularProgressIndicator();
            } else if (state is AuthError) {
              return Text(state.message, style: TextStyle(color: Colors.red));
            } else if (state is AuthAuthenticated) {
              return Text('Welcome, ${state.user.name}!');
            }
            return Container();
          },
        ),
      ],
    );
  }
}