# App

Find a friend app.

# RFs (Requisitos funcionais)
- [x] Deve ser possível se cadastrar um pet
- [ ] Deve ser possível listar todos os pets disponíveis para adoção em uma cidade
- [ ] Deve ser possível filtrar pets por suas características
- [x] Deve ser possível visualizar detalhes de um pet para adoção
- [x] Deve ser possível se cadastrar como uma ORG
- [x] Deve ser possível realizar login como uma ORG

# RNs (Regras de Negócio)
- [ ] Para listar os pets, obrigatoriamente precisamos informar a cidade
- [x] Uma ORG precisa ter um endereço e um número de WhatsApp
- [x] Um pet deve estar ligado a uma ORG
- [x] O usuário que quer adotar, entrará em contato com a ORG via WhatsApp
- [ ] Todos os filtros, além da cidade, são opcionais
- [ ] Para uma ORG acessar a aplicação como admin, ela precisa estar logada

# RNFs (Requisitos não funcionais)
- [x] A senha do usuario precisa estar criptografada
- [x] O CNPJ e o Email da org são únicos
- [x] Endereço e número de Wpp são obrigatórios no cadastro da ORG
- [x] O usuário deve ser identificado por um JWT (Json Web Token)
- [ ] As listagens devem seguir o padrão de 10 em 10 itens


# Plus
- [ ] Cadastrar cidade e estado no banco em tabelas separadas e vinculadas
- [ ] Vincular com ORG