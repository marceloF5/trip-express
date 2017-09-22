# Aplicação Versão beta TripExpress

## Objetivos

* Gerenciamento de Clientes;
* Gerenciamento de Carros;
* Gerenciamento de Usuários;
* Gerenciamento de Agendas; 
* Gerenciamento de OS;

## Instalação

Requerimentos:

* [NodeJS](https://nodejs.org/)
* [Bower](https://bower.io/)
* [MongoDB](https://www.mongodb.com)
* [AngularJS](https://angular.io/)
* [Express](http://expressjs.com/pt-br/)

### Para instalar o Bower global

```sh
$ npm install -g bower
```

### Desenvolvimento

Após efetuar o clone/checkout do repositório, você precisa instalar as dependências através da CLI. Abra o terminal vá até o root do projeto e digite os seguintes comandos:

```sh
$ npm install
$ bower install
```

### Comandos disponíveis

Para instalar uma dependência pelo npm:

```sh
$ npm install nome-da-dependencia
```

Para pesquisar se uma dependência existe no bower:

```sh
$ bower search nome-da-dependencia
```

Para adicionar uma dependência pelo bower:

```sh
$ bower install nome-da-dependencia
```

Para ativar o watcher, que roda as tasks e cria o bundle a cada alteração nos arquivos JS:

```sh
$ gulp watch
```

### Bower

Bower é responsável por gerenciar as dependências de terceiros para o front-end. Para mais detalhes abre os arquivos `bower.json` e `.bowerrc`.

### Módulos

* [Gestão de Clientes]
* [Gestão de Carros]
* [Gestão de Usuários]
* [Gestão de Agenda]

### Bibliotecas adicionais

* [jwt-simple](https://www.npmjs.com/package/jwt-simple)
    * Útil para encode e decode de token de acesso
* [mongoose](http://mongoosejs.com/)
    * Útil para escrever validação e regras no MongoDB

## Vulnerabilidades ou falhas

Caso descubra alguma vulnerabilidade ou falha na aplicação que não é possível solucionar ou que necessita da colaboração de mais desenvolvedores. Por favor enviar um email para mp.fortunato88@gmail.com