# n8n Random Node - Custom Connector

[![CI/CD Pipeline](https://github.com/marco-fabian/n8n_onfly_challenge_marco_fabian/workflows/CI/CD%20Pipeline/badge.svg)](https://github.com/marco-fabian/n8n_onfly_challenge_marco_fabian/actions)
[![Tests](https://img.shields.io/badge/tests-passing-brightgreen)](https://github.com/marco-fabian/n8n_onfly_challenge_marco_fabian/actions)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/node.js-18%2B-green.svg)](https://nodejs.org/)

Este projeto implementa um conector personalizado para n8n que gera números aleatórios usando a API do Random.org.

## 🎯 Objetivo

Criar um conector personalizado para n8n com:
- **Nome**: Random
- **Operação**: "True Random Number Generator"
- **Inputs**: Min e Max (números inteiros inclusos)
- **Integração**: API do Random.org com fallback local

## 📁 Estrutura do Projeto

```
n8n_onfly_challenge_marco_fabian/
├── n8n-infra/                    # Infraestrutura Docker
│   ├── docker-compose.yml        # Configuração n8n + PostgreSQL
│   ├── .env.example             # Variáveis de ambiente exemplo
│   └── .env                     # Variáveis de ambiente (não versionado)
├── n8n-node-random/             # Custom Node
│   ├── src/nodes/Random/        # Código fonte TypeScript
│   │   ├── Random.node.ts       # Implementação do nó
│   │   └── random.svg           # Ícone do nó
│   ├── dist/                    # Código compilado (gerado automaticamente)
│   ├── package.json             # Configuração do pacote
│   └── tsconfig.json            # Configuração TypeScript
└── README.md                    # Este arquivo
```

## 🚀 Como Executar

### Pré-requisitos

- **Node.js 22+** (LTS)
- **Docker Desktop** instalado e rodando
- **Git**

### 1. Instalar Dependências

```bash
# Clone o repositório
git clone https://github.com/marco-fabian/n8n_onfly_challenge_marco_fabian.git
cd n8n_onfly_challenge_marco_fabian

# Instalar dependências do custom node
cd n8n-node-random
npm install
```

### 2. Compilar o Custom Node

```bash
# Compilar TypeScript para JavaScript
npm run build
```

### 3. Configurar Ambiente

```bash
# Copiar arquivo de exemplo
cd ../n8n-infra
cp .env.example .env
```

**Editar o arquivo `.env` com suas próprias senhas:**
```env
POSTGRES_USER=n8n
POSTGRES_PASSWORD=sua_senha_do_db_aqui
POSTGRES_DB=n8n

N8N_ENCRYPTION_KEY=sua_senha_aqui
```

> **Importante**: Substitua os valores pelos seus próprios antes de executar o Docker Compose.

### 4. Executar Serviços

```bash
# Subir n8n + PostgreSQL
docker compose up -d
```

### 5. Acessar n8n

Abra seu navegador em: **http://localhost:5678**

## 🧪 Testando o Custom Node

### Testes Automatizados

O projeto inclui uma suíte de testes Jest para validar o funcionamento:

```bash
# Executar todos os testes
cd n8n-node-random
npm test

# Executar testes em modo watch
npm run test:watch

# Executar testes com coverage
npm run test:coverage

# Executar linting
npm run lint

# Formatar código
npm run format
```

#### Tipos de Testes

- **API Tests**: Validação da integração com Random.org
- **Fallback Tests**: Verificação do sistema de fallback local
- **Build Tests**: Validação da compilação TypeScript

### Teste Manual no n8n

1. **Criar novo workflow** no n8n
2. **Procurar por "Random"** na categoria "Transform"
3. **Configurar campos**:
   - Min: valor mínimo (ex: 1)
   - Max: valor máximo (ex: 100)
4. **Executar** o workflow
5. **Verificar resultado** com número aleatório gerado

## 🔧 Funcionalidades

### Integração com Random.org
- Utiliza a API oficial: `https://www.random.org/integers/`
- Parâmetros: `num=1&min={min}&max={max}&col=1&base=10&format=plain&rnd=new`

### Fallback Local
- Se a API do Random.org falhar, usa geração local
- Garante que o nó sempre funcione

### Tratamento de Erro
- Try/catch para capturar erros da API
- Logs informativos sobre a fonte do número


## 🛠️ Desenvolvimento

### Estrutura do Código

```typescript
// Random.node.ts
export class Random implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'Random',
    name: 'random',
    icon: 'file:random.svg',
    // ... configuração da UI
  };

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    // Lógica de execução com API Random.org
  }
}
```

### Compilação

```bash
# Desenvolvimento (watch mode)
npm run dev

# Produção
npm run build

# Testes
npm test
```

## 📝 Logs e Debug

```bash
# Ver logs do n8n
cd n8n-infra
docker compose logs n8n

# Ver logs do PostgreSQL
docker compose logs postgres

# Status dos containers
docker compose ps
```

## 🔄 Atualizações

Para atualizar o custom node após mudanças:

1. Execute o linting: `npm run lint`
2. Execute os testes: `npm test`
3. Compile o código: `npm run build`
4. Copie o SVG: `cp src/nodes/Random/random.svg dist/nodes/Random/`
5. Reinicie o n8n: `docker compose restart n8n`

### CI/CD Pipeline

O projeto possui um pipeline automatizado que executa:
- ✅ **Testes** em múltiplas versões do Node.js (18, 20, 22)
- ✅ **Linting** e formatação de código
- ✅ **Build** e validação
- ✅ **Docker** build test
- ✅ **Security scan** com Trivy

## 📞 Suporte

- **Autor**: Marco Fabian
- **Repositório**: https://github.com/marco-fabian/n8n_onfly_challenge_marco_fabian
- **Documentação n8n**:
https://docs.n8n.io/hosting/installation/docker/
https://docs.n8n.io/integrations/creating-nodes/
https://docs.n8n.io/integrations/creating-nodes/test/run-node-locally/

## 🔧 Troubleshooting

### Problema: Erro de autenticação do PostgreSQL
```bash
# Erro: password authentication failed for user "n8n"
# Solução 1: Verificar se as senhas no .env estão corretas
cat n8n-infra/.env

# Solução 2: Se mudou a senha, recriar o banco
docker compose down -v  # Remove volumes
docker compose up -d    # Recria com novas credenciais
```

### Problema: Erro de compilação TypeScript
```bash
# Erro: Cannot find name 'ErrorOptions' ou módulos não encontrados
# Solução: Reinstalar dependências com tipos corretos
cd n8n-node-random
rm -rf node_modules package-lock.json
npm install
npm run build
```

**Se ainda der erro:**
```bash
# Instalar dependências específicas que podem estar faltando
npm install @types/express @types/ssh2
npm run build
```

### Problema: Testes falhando
```bash
# Erro: Test suite failed to run
# Solução: Verificar se Jest está configurado corretamente
cd n8n-node-random
npm test

# Se der erro de timeout, verificar conexão com internet ou aumentar o tempo de timeout
# Os testes de API precisam de conexão com Random.org
```

### Problema: SVG não aparece no n8n
```bash
# Solução: Verificar se o SVG está na pasta dist
ls dist/nodes/Random/random.svg
# Se não estiver, copiar manualmente:
cp src/nodes/Random/random.svg dist/nodes/Random/
```

### Problema: n8n não reconhece o custom node
```bash
# Solução: Verificar se o arquivo compilado existe
ls dist/nodes/Random/Random.node.js
# Se não existir, compilar novamente:
npm run build
```

## 📄 Licença

MIT License 