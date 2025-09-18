# Conectades - Aplicação Front-end

Este repositório contém o código-fonte da aplicação front-end do projeto Conectades, uma plataforma web projetada para ser acessível a todos os usuários, mesmo aqueles com hardware mais antigo e conexões de internet limitadas. A solução foi desenvolvida seguindo a abordagem **mobile first**, com foco em interfaces fáceis de usar para promover o letramento digital. O projeto front-end em questão está sendo desenvolvido seguindo o protótipo que consta no [Figma](https://www.figma.com/design/TwtYN5nn0rXpuMUW3vXY8L/-BIGU--Conectades) e que ainda está sendo refinado pela equipe de UX/UI.

## Sobre o Projeto

Conectades é uma Progressive Web Application (PWA), o que significa que pode ser acessada tanto em computadores quanto em dispositivos móveis diretamente pelo navegador, sem a necessidade de instalação. Essa escolha foi feita com base em pesquisas de UX que revelaram que quase metade dos usuários não tinham espaço de armazenamento para novos aplicativos.

A aplicação é dividida em módulos separados por responsabilidades: front-end (camada de exibição), back-end (regras de negócio) e banco de dados (armazenamento persistente). O front-end e o back-end se comunicam usando chamadas HTTP, seguindo uma arquitetura de três camadas (Three-Tier Architecture).

## Tecnologias Utilizadas

### Front-end
* **React**: Biblioteca JavaScript para o desenvolvimento da interface de usuário.
* **TypeScript**: Um superset do JavaScript que adiciona tipagem estática, proporcionando uma camada extra de segurança e melhor estruturação do código.
* **Vite**: Ferramenta de build otimizada para iniciar o projeto.
* **UntitleUI**: Pacote de componentes que utiliza **Tailwind CSS** para a maioria de suas estilizações. Apesar de ter componentes pagos, seguindo a premissa de ser software livre, usamos componentes disponíveis em sua versão free.
* **Swiper**: Pacote de componentes free focado em slider.

### Métricas
Usaremos a ferramenta open-souce do Google Lighthouse para fazer as avaliações gerais da página front, buscando equilibrio e boa pontuação nos indicadores abaixo. Esta ferramenta está disponível nos navegadores (browsers) baseados em Chromium, como o próprio Chrome, o Edge, o Opera. 
* **Performance**: >= 80pts
* **Acessibilidade**: >= 80pts
* **SEO**: >= 80pts
* **Boas práticas**: >= 80pts

### Back-end
* **Python (Django)** e **Django REST Framework**: Utilizados para o desenvolvimento da API.
* **Arquitetura MVC (Model View Controller)**: Escolhida por sua baixa complexidade de implementação e boa escalabilidade, segregando as responsabilidades para facilitar a manutenção.
* **PostgreSQL**: Sistema de gerenciamento de banco de dados (SGBD) de código aberto, selecionado por sua capacidade de suportar modelos modulares e ser escalável para diferentes volumes de dados.

### Infraestrutura e Versionamento
* **Docker e Docker Compose**: Usados para a criação de containers e orquestração da infraestrutura, permitindo a portabilidade e a facilidade de organização.
* **GitHub**: Plataforma utilizada para o repositório de código, com funcionalidades como Pull Requests, Issues e GitHub Projects para a gestão visual de tarefas.
* **Git**: Sistema de controle de versionamento, adotado por sua robustez e histórico de commits claro. Para garantir a padronização, o projeto segue os padrões **GitHub Flow** e **Conventional Commits**.

## Acessibilidade e Design

O projeto tem um forte compromisso com a acessibilidade, adotando diversas práticas para garantir uma boa experiência a todos os usuários, incluindo aqueles com baixa visão. As medidas de acessibilidade incluem:
* **Design Mobile First**: Prioriza a experiência em dispositivos de tela pequena.
* **Uso de contrastes adequados**: Segue as diretrizes do **WCAG 2.2** para garantir visibilidade e legibilidade.
* **Estruturação semântica do HTML**: Utiliza tags corretas para uma melhor integração com leitores de tela e motores de busca.
* **Compatibilidade com leitores de tela**: Componentes seguem práticas que permitem leitura eficiente por tecnologias assistivas, como o uso de `aria-label` e `alt`.
* **Recurso "texto em áudio"**: Um leitor integrado foi planejado para a área de artigos com grandes blocos de texto, permitindo que os usuários ouçam o conteúdo em vez de lê-lo visualmente.

## Instalação e Execução

Você pode iniciar o projeto localmente seguindo estes passos:

1.  Clone o repositório:
    ```bash
    git clone [URL_DO_REPOSITÓRIO]
    ```

2.  Acesse a pasta do projeto:
    ```bash
    cd [NOME_DO_PROJETO]
    ```

3.  Instale as dependências:
    ```bash
    npm install
    ```

4.  Execute a aplicação:
    ```bash
    npm run dev
    ```

A aplicação estará disponível em `http://localhost:5173`.