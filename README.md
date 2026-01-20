# Conectades - Aplicação Front-end

Este repositório contém o código-fonte da aplicação front-end do projeto Conectades, uma plataforma web projetada para ser acessível a todos os usuários, mesmo aqueles com hardware mais antigo e conexões de internet limitadas. A solução foi desenvolvida seguindo a abordagem **mobile first**, com foco em interfaces fáceis de usar para promover o letramento digital. O projeto front-end em questão está sendo desenvolvido seguindo o protótipo que consta no [Figma](https://www.figma.com/design/TwtYN5nn0rXpuMUW3vXY8L/-BIGU--Conectades) e que ainda está sendo refinado pela equipe de UX/UI.

## Sobre o Projeto

Conectades é uma Progressive Web Application (PWA), o que significa que pode ser acessada tanto em computadores quanto em dispositivos móveis diretamente pelo navegador, sem a necessidade de instalação. Essa escolha foi feita com base em pesquisas de UX que revelaram que quase metade dos usuários não tinham espaço de armazenamento para novos aplicativos.

A aplicação é dividida em módulos separados por responsabilidades: front-end (camada de exibição), back-end (regras de negócio) e banco de dados (armazenamento persistente). O front-end e o back-end se comunicam usando chamadas HTTP, seguindo uma arquitetura de três camadas (Three-Tier Architecture).

## Tecnologias Utilizadas

### Front-end
#### 🏗️ Core e Linguagem

| Tecnologia | Descrição |
| :--- | :--- |
| **React** | Biblioteca JavaScript fundamental para a construção de **interfaces de usuário (UI)**. |
| **TypeScript** | Um **superconjunto de JavaScript** que adiciona **tipos estáticos**, aumentando a robustez e a manutenibilidade do código. |

---

#### 🧭 Roteamento e Navegação

| Tecnologia | Característica Principal |
| :--- | :--- |
| **TanStack Router** | O foco é em **roteamento moderno e tipado**. É uma alternativa mais nova que oferece **proteção de tipos** em rotas e parâmetros, e suporta **roteamento baseado em arquivos**, simplificando a organização da aplicação de forma semelhante ao Next.js. |

---

#### ⚙️ Gerenciamento de Estado e Dados

| Tecnologia | Descrição |
| :--- | :--- |
| **Fetch API** | Alternativa **nativa do navegador** para fazer requisições HTTP (chamadas de API), eliminando a necessidade de clientes HTTP de terceiros (como Axios) e diminuindo o número de pacotes instalados. |
| **Context API** | Solução **nativa do React** para **gerenciamento de estado** global, permitindo compartilhar dados entre componentes sem a necessidade de *prop drilling* e reduzindo a dependência de bibliotecas externas de gerenciamento de estado. |

---

#### 🎨 UI, Estilo e Acessibilidade

| Tecnologia | Descrição |
| :--- | :--- |
| **Tailwind CSS** | Framework CSS baseado em **classes utilitárias** para estilizar componentes de forma rápida e eficiente. |
| **CSS modules** | Técnica para **encapsular estilos CSS**, garantindo que sejam de escopo local para cada componente. |
| **React Aria** | Biblioteca para adicionar **acessibilidade** e interações de alto nível (WAI-ARIA) a componentes React. |
| **shadcn/ui** | Coleção de **componentes reutilizáveis** baseados no Tailwind CSS, focados em estética e acessibilidade. |
| **Lucide React** | Biblioteca de **ícones SVG** de código aberto. |
| **Untitled UI** | Biblioteca de **ícones SVG** e **componentes reutilizáveis** de código aberto também baseado em Tailwind CSS. |
| **Semântica TSX** | Ênfase no uso de **tags HTML semânticas** (`<header>`, `<main>`, `<button>`, etc.) na construção do TSX para melhorar a acessibilidade e a otimização de mecanismos de busca (SEO). |

---

#### 📝 Formulários

| Conceito | Descrição |
| :--- | :--- |
| **Componentes Controlados** | Abordagem utilizada para gerenciar formulários, onde a **entrada de dados (inputs, selects, etc.) é controlada pelo estado do React**. Isso garante que o estado da aplicação seja a "única fonte da verdade" para os valores do formulário. |

---

#### 🧪 Testes

| Tecnologia | Descrição |
| :--- | :--- |
| **Jest** | Biblioteca de **testes unitários** JavaScript amplamente utilizada. |
| **React Testing Library (RTL)** | Biblioteca fundamental para **testar componentes React**, focada em testar a experiência do usuário. |
| **Testing Library** | Conjunto de utilitários para testar interfaces. |

---

#### 🛠️ Ferramentas de Desenvolvimento e Qualidade

| Tecnologia | Descrição |
| :--- | :--- |
| **Vite** | Ferramenta de **construção (`build tool`)** moderna e rápida para aplicações front-end. |
| **ESLint** | Ferramenta de **análise estática (`linter`)** para identificar padrões problemáticos no código JavaScript/TypeScript. |
| **Padrões de Branching** | Utilização de um modelo de criação de branches próxima ao **Gitflow** para garantir um fluxo de trabalho de desenvolvimento organizado. |
| **Commits Semânticos** | Adoção de **commits semânticos** o mais próximo do padrão **Conventional Commits** para padronizar mensagens de commit e facilitar a geração automática de changelogs. |

---

#### 🧩 Patterns de Componentes

| Conceito | Aplicação |
| :--- | :--- |
| **Composition (Composição)** | Utilização de **patterns de composition** (e.g., *Compound Components*, *Slot Pattern*) em componentes pertinentes para facilitar a **reutilização**, melhorar a flexibilidade e desacoplar o design da lógica interna. |

### Métricas Front-end
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