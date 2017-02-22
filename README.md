# RD - 

[![build status](https://gitlab.com/alboom/panel-ruby/badges/master/build.svg)](https://gitlab.com/alboom/panel-ruby/commits/master)  [![coverage report](https://gitlab.com/alboom/panel-ruby/badges/master/coverage.svg)](https://gitlab.com/alboom/panel-ruby/commits/master)

Implementação do painel feito em Ruby on Rails.

## Requerimentos

O projeto pode ter seu desenvolvimento realizado através do docker ou em um ambiente de desenvolvimento UNIX (MacOS ou Linux)

* Docker Toolbox ([Instaladores](https://www.docker.com/products/docker-toolbox) e [instruções para instalação em Linux](https://docs.docker.com/engine/installation/linux/))
* Ruby 2.3.3
* MySQL

## Instalação pelo Docker

Após clonar o repositório, execute os seguintes comandos para iniciar a aplicação:

```bash
docker-compose up
``` 

Isso irá criar a imagem do docker e executar a instalação das gems, assim como iniciar os serviços que a aplicação depende (como banco de dados, por exemplo).

Apesar de iniciar, o banco de dados, este comando não executa a criação ou migrations do banco de dados, por isso, em outro terminal, deve ser executado o comando:

```bash
docker-compose run web rails db:create db:migrate
```

Feio, isso, a aplicação estará pronta para ser desenvolvida e estará sendo executada em  ```http://192.168.99.100:3000/```

### Passo adicional para windows

Por enquanto, não existe suporte para execução do comando ```docker-compose run``` no windows. Assim, uma solução encontrada é
executar os comandos através de um wrapper. Insira a função abaixo em seu ```~/.bash_profile``` 

```bash
function dockerrun() {
    docker exec -ti $(docker ps | grep $1 | cut -d " " -f1) "${@:2}"
}
```

E você poderá executar os comandos como:

```bash
dockerrun bundle exec rspec
```

## Testes

Esta aplicação utiliza __RSpec__ para seu desenvolvimento, e __RuboCop__ para validação com o guia de estilos e boas práticas Ruby. Para executar os testes utilize os seguintes comandos:

#### Docker
```
$ docker-compose run web bundle exec rspec
$ docker-compose run webbundle exec rubocop
```

#### Local
```
bundle exec rspec
bundle exec rubocop
```

## Execução Local
A aplicação possui suporte ao __Guard__, assim a mesma pode ser iniciada utilizando o seguinte comando:

```
$ bundle exec guard
```

O guard vem com os módulos __rails, rspec__, e __bundle__  ou seja, uma vez executando o guard, o servidor será reiniciado, executará os testes, instalará gems e fará migrações no banco de dados sempre que necessário.


## Contribuição

Este projeto é desenvolvido através de forks do projeto principal e requisição de __merge requests__ uma vez que cada feature é concluida. Para mais detalhes, verifique o [guia de contribuição](https://gitlab.com/alboom/panel-ruby/raw/master/CONTRIBUTING.md).
