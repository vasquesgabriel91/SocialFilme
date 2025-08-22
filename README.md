SocialMovies
Descrição do Projeto

SocialMovies é uma plataforma social feita para cinéfilos de todos os tipos. Aqui, você pode compartilhar suas avaliações de filmes, descobrir novas obras e interagir com outras pessoas que também amam cinema. A ideia é que você possa criar um perfil, montar seu catálogo de filmes assistidos, criar listas personalizadas e seguir seus amigos para ver o que eles andam assistindo.

Feita por um apaixonado por filmes, a SocialMovies é o lugar perfeito para quem adora assistir filmes, trocar ideias sobre eles, pedir ou dar recomendações, e ainda fazer novas descobertas e amizades no incrível mundo do cinema.

Funcionalidades Principais

Cadastro e Login de Usuários: Autenticação segura via JWT, garantindo que seu acesso seja sempre protegido.

Listagem de Filmes: Aqui você pode pesquisar e visualizar filmes populares, com todas as informações que você precisa: título, gênero, ano e muito mais.

Avaliação e Resenha: Avalie os filmes com estrelas e escreva resenhas.

Comentários: Bate-papo entre os usuários por meio de comentários nas resenhas, para trocar ideias e discutir sobre os filmes.

Listas Personalizadas: Crie listas de filmes baseadas em suas preferências, como "Melhores Filmes de 2023", "Filmes para Assistir em Família" e outras.

Arquitetura

A arquitetura do projeto segue um modelo limpo e orientado a casos de uso, para garantir que a manutenção seja fácil e o sistema continue escalável à medida que cresce. O fluxo de dados e lógica no código segue um padrão de camadas, que são organizadas assim:

Controller → UseCase → Service → Repository → Model

Cada camada tem uma função:

Controller: Recebe as requisições HTTP.

UseCase: Aqui é a lógica de negócio do sistema.

Service: Responsável por implementar os casos de uso que definimos.

Repository: Interage diretamente com o banco de dados e busca ou altera as informações armazenadas.

Model: Aqui ficam as representações das tabelas do banco de dados. É onde definimos a estrutura de dados.

Padrões e Práticas
Feature-based

Para deixar tudo mais organizado, a estrutura do código está dividida por funcionalidades. Isso significa que, se você for adicionar algo novo, como uma funcionalidade para filmes, por exemplo, ela vai ter sua própria pasta com todos os arquivos necessários (Controller, Service, Model, etc.). Isso facilita a manutenção e a expansão do projeto no futuro.

Aqui vai um exemplo prático de como isso funciona:

src/
 └── usuario/
      ├── UserController.js      # Controlador que gerencia as requisições HTTP para usuários
      ├── UserUseCase.js         # Define os casos de uso do usuário, como criar, atualizar ou excluir
      ├── UserService.js         # Contém a lógica de negócios para usuários (ex: validações)
      ├── UserRepository.js      # Interage diretamente com o banco de dados para manipular dados de usuários
      ├── UserModel.js           # Define o modelo de dados do usuário no banco

Singleton Pattern

O Singleton Pattern é uma técnica que uso para garantir que algumas instâncias, como a conexão com o banco de dados, sejam únicas ao longo da execução do sistema. Isso ajuda a evitar desperdício de recursos e melhora a performance do sistema.

Stack Utilizada
Back-end:

Node.js v20+

PostgreSQL v15+

Sequelize ORM

JWT (JSON Web Token)

Express.js