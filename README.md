<p align="center">
  <img src="https://github.com/charles-futDevFloripa/destinoCerto/blob/develop/public/DestinoCertoLogoBlur.png" alt="Logo do Destino Certo">
</p>

# Destino Certo

**Destino Certo** foi desenvolvido como projeto final, individual, do módulo 01 da formação **FuturoDev** do **Floripa Mais Tec**, coordenado pelo **Lab365** em parceria com o **SESI** e **SENAC**.

**Destino Certo** é uma plataforma que facilita o gerenciamento de resíduos e o acesso a pontos de coleta de materiais recicláveis. Usuários podem cadastrar novos pontos de coleta, encontrar pontos próximos em um mapa interativo ou em uma listagem, visualizar informações sobre os materiais aceitos em cada ponto e registrar suas próprias contribuições para a reciclagem.

Este projeto visa incentivar o descarte correto do lixo, auxiliando a localizar o ponto de coleta correto na sua região.

<p align="center">
  <img src="https://github.com/charles-futDevFloripa/destinoCerto/blob/develop/public/prints/globalMap.jpg?raw=true" alt="destinoCerto">
</p>

## Tecnologias Utilizadas

[![HTML](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5)
[![CSS](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)](https://vitejs.dev/)

## Técnicas e Tecnologias Utilizadas

O projeto **Destino Certo** adota uma arquitetura inspirada no modelo MVC, com a utilização de Context API para a gestão de estados, representando os controllers. O back-end é simulado pelo `json-server`, criando uma representação funcional de um banco de dados.

### Componentes e Bibliotecas

- **json-server**: Simula um banco de dados para armazenar informações de usuários e pontos de coleta.
- **react-router-dom**: Gerencia a navegação e o roteamento da aplicação.
- **react-hook-form**: Utilizado para a validação de formulários, facilitando o gerenciamento de estados e a validação de entrada dos dados.
- **react-input-mask**: Aplica máscaras de entrada para campos como CPF e CEP, melhorando a experiência do usuário.
- **react-icons**: Fornece ícones para aprimorar a estética da aplicação.
- **react-leaflet**: Implementa mapas interativos para visualizar geograficamente os pontos de coleta.

### Estado e Gerenciamento

Utilizei a Context API para gerenciar os estados globais da aplicação, divididos em dois contextos principais:

- **UserContext**: Gerencia funcionalidades relacionadas aos usuários.
- **CollectPlaceContext**: Controla as operações relacionadas aos pontos de coleta.

### Integrações Externas

- **ViaCEP API**: Integrada para obter detalhes de endereços a partir do CEP, utilizada nos formulários de cadastro e edição de usuários e pontos de coleta.

### Desafios Técnicos

O principal desafio enfrentado foi a implementação do CSS para garantir a responsividade do site sem o uso de frameworks externos. A utilização de `react-hook-form` também exigiu um estudo aprofundado para adaptar suas funcionalidades às necessidades específicas do projeto, onde a documentação oficial e recursos como Stack Overflow e assistência do ChatGPT foram essenciais para superar esses desafios.

## Instalação

Para usar o **Destino Certo**, clone ou faça download do repositório:

```bash
git clone https://github.com/charles-futDevFloripa/destinoCerto.git
```

Depois execute a instalação

```bash
npm install
```

E por fim:

```bash
npm run server # Inicia o json-sever
npm run dev # Inicia o servidor frontEnd
```

Créditos:

- [4Devs](https://www.4devs.com.br/gerador_de_pessoas) - Para gerar pessoas aleatórias
- [React Hook Form - FormBuilder](https://react-hook-form.com/form-builder) - Usado nos formulários
