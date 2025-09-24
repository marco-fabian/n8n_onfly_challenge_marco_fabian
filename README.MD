# n8n Random Node Challenge

Este é um projeto para criar um nó personalizado para n8n que gera números aleatórios usando a API do Random.org.

## Objetivo

Criar um conector personalizado para n8n com:
- Uma operação "True Random Number Generator"
- Inputs: Min e Max (números inteiros)
- Integração com a API do Random.org

## Estrutura do Projeto

- `n8n-infra/` - Configuração Docker para n8n + PostgreSQL
- `n8n-node-random/` - Nó personalizado para gerar números aleatórios

## Como Executar

1. Configure o Docker Desktop
2. Execute `docker compose up -d` na pasta n8n-infra
3. Acesse http://localhost:5678

## Status

🚧 Em desenvolvimento... por Marco Fabian