# 🚌 Sistema de Agendamento de Viagens - Eurico Balaca

Sistema web moderno para agendamento de viagens de autocarro em Angola, desenvolvido com Java Spring Boot e interface web responsiva.

## ✨ Características

- **Interface Moderna**: Design responsivo e atrativo com CSS3 e JavaScript
- **API REST**: Backend robusto com Spring Boot
- **Banco de Dados**: H2 (desenvolvimento) e PostgreSQL (produção)
- **Containerização**: Docker e Docker Compose para deploy fácil
- **Funcionalidades**:
  - Busca de viagens por origem, destino e data
  - Sistema de reservas completo
  - Cadastro de passageiros
  - Gestão de agências
  - Interface administrativa

## 🚀 Tecnologias Utilizadas

### Frontend
- HTML5
- CSS3 (Flexbox, Grid, Animações)
- JavaScript (ES6+)
- Font Awesome (Ícones)
- Google Fonts (Inter)

### Backend
- Java 17
- Spring Boot 3.2.0
- Spring Data JPA
- Spring Web
- H2 Database (desenvolvimento)
- PostgreSQL (produção)

### DevOps
- Docker
- Docker Compose
- Nginx (Proxy Reverso)
- Maven

## 📁 Estrutura do Projeto

```
Euclides/
├── src/main/java/com/euclides/
│   ├── controller/          # Controllers REST
│   ├── model/              # Entidades JPA
│   ├── repository/          # Repositórios JPA
│   ├── service/            # Serviços de negócio
│   └── SistemaAgendamentoViagensApplication.java
├── src/main/resources/
│   └── application.properties
├── static/                 # Arquivos estáticos (HTML, CSS, JS)
├── Dockerfile
├── docker-compose.yml
├── nginx.conf
├── pom.xml
└── README.md
```

## 🛠️ Instalação e Execução

### Pré-requisitos
- Java 17+
- Maven 3.6+
- Docker e Docker Compose
- Git

### Método 1: Deploy com Docker (Recomendado)

1. **Clone o repositório**:
   ```bash
   git clone <url-do-repositorio>
   cd Euclides
   ```

2. **Execute o script de deploy**:
   ```bash
   chmod +x deploy.sh
   ./deploy.sh
   ```

3. **Acesse a aplicação**:
   - Interface Web: http://localhost
   - API: http://localhost/api
   - H2 Console: http://localhost/h2-console

### Método 2: Execução Local

1. **Compile e execute**:
   ```bash
   mvn clean package
   java -jar target/sistema-agendamento-viagens-1.0.0.jar
   ```

2. **Acesse**: http://localhost:8080

## 📚 API Endpoints

### Viagens
- `GET /api/viagens` - Listar todas as viagens
- `GET /api/viagens/buscar?origem=X&destino=Y&data=Z` - Buscar viagens
- `GET /api/viagens/{id}` - Buscar viagem por ID
- `POST /api/viagens` - Criar nova viagem
- `PUT /api/viagens/{id}` - Atualizar viagem
- `DELETE /api/viagens/{id}` - Deletar viagem

### Passageiros
- `GET /api/passageiros` - Listar passageiros
- `GET /api/passageiros/{id}` - Buscar passageiro por ID
- `GET /api/passageiros/bi/{bi}` - Buscar passageiro por BI
- `POST /api/passageiros` - Criar passageiro
- `PUT /api/passageiros/{id}` - Atualizar passageiro
- `DELETE /api/passageiros/{id}` - Deletar passageiro

### Reservas
- `GET /api/reservas` - Listar reservas
- `GET /api/reservas/{id}` - Buscar reserva por ID
- `GET /api/reservas/bi/{bi}` - Buscar reservas por BI
- `POST /api/reservas` - Criar reserva
- `PUT /api/reservas/{id}/cancelar` - Cancelar reserva
- `DELETE /api/reservas/{id}` - Deletar reserva

## 🎨 Interface Web

A interface web oferece:

- **Página Inicial**: Hero section com call-to-action
- **Busca de Viagens**: Formulário de busca com filtros
- **Sistema de Reservas**: Modal para criação de reservas
- **Consulta de Reservas**: Busca por bilhete de identidade
- **Informações das Agências**: Listagem das agências parceiras

### Características da Interface:
- Design responsivo (mobile-first)
- Animações suaves e modernas
- Cores vibrantes inspiradas na bandeira de Angola
- Notificações em tempo real
- Validação de formulários
- Loading states

## 🗄️ Banco de Dados

### Desenvolvimento
- **H2 Database**: Banco em memória
- **Console**: http://localhost/h2-console
- **JDBC URL**: jdbc:h2:mem:testdb
- **Usuário**: sa
- **Senha**: password

### Produção
- **PostgreSQL**: Banco persistente
- **Configuração**: Via Docker Compose
- **Dados**: Persistidos em volume Docker

## 🐳 Docker

### Containers
- **app**: Aplicação Spring Boot
- **db**: PostgreSQL (produção)
- **nginx**: Proxy reverso e servidor web

### Comandos Úteis
```bash
# Iniciar todos os serviços
docker-compose up -d

# Parar todos os serviços
docker-compose down

# Ver logs
docker-compose logs -f app

# Reconstruir e iniciar
docker-compose up --build -d
```

## 🔧 Configuração

### Variáveis de Ambiente
- `SPRING_PROFILES_ACTIVE`: Perfil ativo (dev/prod)
- `DATABASE_URL`: URL do banco de dados
- `DATABASE_USERNAME`: Usuário do banco
- `DATABASE_PASSWORD`: Senha do banco

### Portas
- **80**: Nginx (HTTP)
- **443**: Nginx (HTTPS)
- **8080**: Spring Boot
- **5432**: PostgreSQL

## 📱 Responsividade

A interface é totalmente responsiva e funciona em:
- 📱 Smartphones (320px+)
- 📱 Tablets (768px+)
- 💻 Desktops (1024px+)
- 🖥️ Telas grandes (1440px+)

## 🎯 Funcionalidades Principais

1. **Busca Inteligente**: Filtros por origem, destino e data
2. **Sistema de Reservas**: Processo completo de reserva
3. **Gestão de Passageiros**: Cadastro e consulta
4. **Informações de Agências**: Dados das empresas parceiras
5. **Interface Administrativa**: Via H2 Console

## 🚀 Deploy em Produção

### Opções de Hospedagem
1. **VPS/Cloud**: DigitalOcean, AWS, Google Cloud
2. **PaaS**: Heroku, Railway, Render
3. **Container**: Docker Swarm, Kubernetes

### Configuração de Produção
1. Configure variáveis de ambiente
2. Use PostgreSQL como banco
3. Configure SSL/HTTPS
4. Configure domínio personalizado
5. Configure backup automático

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

## 👨‍💻 Autor - Eurico Balaca

Desenvolvido com ❤️ para Angola

## 📞 Suporte

Para suporte, entre em contato:
- Email: euricobalacaeury@gmail.com
- Telefone: +244 934 505 870
---

**Euclides** - Conectando Angola através de viagens confortáveis e seguras! 🇦🇴


