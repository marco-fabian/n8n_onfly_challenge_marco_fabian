# n8n Random Node - Custom Connector

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

**Arquivo .env criado:**
```env
POSTGRES_USER=n8n
POSTGRES_PASSWORD=sua_senha_do_db_aqui
POSTGRES_DB=n8n

N8N_ENCRYPTION_KEY=sua_senha_aqui
```

### 4. Executar Serviços

```bash
# Subir n8n + PostgreSQL
docker compose up -d
```

### 5. Acessar n8n

Abra seu navegador em: **http://localhost:5678**

## 🧪 Testando o Custom Node

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

1. Compile o código: `npm run build`
2. Copie o SVG: `cp src/nodes/Random/random.svg dist/nodes/Random/`
3. Reinicie o n8n: `docker compose restart n8n`

## 📞 Suporte

- **Autor**: Marco Fabian
- **Repositório**: https://github.com/marco-fabian/n8n_onfly_challenge_marco_fabian
- **Documentação n8n**:
https://docs.n8n.io/hosting/installation/docker/
https://docs.n8n.io/integrations/creating-nodes/
https://docs.n8n.io/integrations/creating-nodes/test/run-node-locally/

## 🔧 Troubleshooting

### Problema: Erro de compilação TypeScript
```bash
# Solução: Reinstalar dependências
cd n8n-node-random
rm -rf node_modules package-lock.json
npm install
npm run build
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