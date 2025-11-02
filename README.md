# SocialMovies

SocialMovies é uma rede social para cinéfilos.
Aqui você vai pode avaliar filmes, escrever resenhas, criar listas personalizadas e interagir com outros amantes de cinema.
A ideia é oferecer um espaço para descobrir novas obras, trocar recomendações e acompanhar o que seus amigos estão assistindo.

# Funcionalidades Principais

Autenticação JWT: Login e cadastro de usuários com autenticação segura.

Catálogo de Filmes: Pesquise e visualize filmes populares com detalhes como gênero, ano e sinopse.

Avaliações e Resenhas: Dê notas com estrelas e escreva suas opiniões.

Comentários em Tempo Real: Interaja com outros usuários através de comentários instantâneos via WebSocket.

Listas Personalizadas: Monte coleções como “Favoritos de 2023” ou “Filmes para Ver com a Família”.

# Arquitetura e Organização

O projeto segue uma arquitetura limpa e orientada a casos de uso, com camadas bem definidas:

Controller → UseCase → Service → Repository → Model

A estrutura é feature-based, ou seja, cada funcionalidade possui sua própria pasta, tornando o sistema modular e escalável.

Exemplo de Estrutura:

<img width="225" height="175" alt="image" src="https://github.com/user-attachments/assets/3c5cf758-1cfa-45bb-906a-865647ea4520" />

# Padrões e Tecnologias

Singleton Pattern: Garante uma única instância para conexões, como a do banco de dados.

Redis: Usado para armazenar tokens de sessão e cachear dados, melhorando a performance e a autenticação.

WebSocket: Responsável por atualizações em tempo real, como novos comentários e notificações.

# Stack Utilizada

Node.js v20+

Express.js

PostgreSQL v15+

Sequelize ORM

JWT (JSON Web Token)

Redis

WebSocket
