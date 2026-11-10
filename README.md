# 📦 zeroHora — Sistema de Controle de Estoque (Gráfica)

O **zeroHora** é um sistema de gestão interna de estoque e controle operacional desenvolvido como um projeto da faculdade para uma empresa real do setor gráfico e comunicação visual (impressões, estampas, cartazes e placas). 

Trata-se de um projeto histórico criado no **início da minha graduação**, desenvolvido para atender a um cenário real. O objetivo do sistema era facilitar o cadastro, a consulta e o controle de insumos e produtos por parte dos funcionários da gráfica.

> **Interface Otimizada para Mobile:** A aplicação foi projetada e dimensionada para uso na tela de dispositivos móveis através do navegador.

---

## 🛠️ Tecnologias Utilizadas

- **Front-end:** React.js + Vite (com HMR)
- **Estilização:** CSS 
- **Back-end & Banco de Dados:** Node.js integrado com **Firebase** (Firestore / Auth)
- **Serviços de E-mail:** EmailJS (Integração legacy)

---

## ⚠️ Transparência Técnica & Limitações Conhecidas

Por ter sido um dos meus primeiros projetos completos no ecossistema Web/React, o repositório reflete minhas etapas iniciais de aprendizado. Ele possui dívidas técnicas e características arquiteturais específicas que optei por manter como registro do meu processo de evolução:

1. **Arquitetura Monolítica no Front-end:** O código do back-end (funções do Node/Firebase) roda diretamente acoplado ao front-end. Não há uma API REST externa separada por camadas como `controllers`, `models` ou `routes`.
2. **Autenticação & Acesso:** A validação de login está **temporariamente desativada**. É possível acessar o sistema apenas clicando diretamente no botão **"Entrar"** na tela de login. 
   - *Nota:* Devido a essa alteração temporária, podem ocorrer instabilidades do lado do banco de dados (como requisições bloqueadas por regras de segurança/permissão). Essas pendências serão corrigidas em breve.
3. **Segurança & Variáveis de Ambiente:** Em versões anteriores, o projeto contava com chaves de API declaradas em *hardcode*. Algumas correções foram aplicadas para ocultar credenciais, mas ainda requer refatoração completa para uso estrito de `.env`.
4. **Envio de E-mails (EmailJS):** A funcionalidade de cadastro/recuperação de senha por e-mail via EmailJS encontra-se temporariamente inoperante devido a limites do serviço.
5. **Tela de Pedidos:** A visualização de pedidos possui um bug conhecido que causa falhas no carregamento de dados. A correção está prevista para refinamentos futuros.

---

## 🚀 Como Executar o Projeto Localmente

### Pré-requisitos
- **Node.js** instalado na máquina (versão 16+ recomendada).
- Gerenciador de pacotes **npm**.

### Passo a Passo

1. **Clone o repositório:**
   ```bash
   git clone [https://github.com/santos-rdd/projeto-zero-hora.git](https://github.com/santos-rdd/projeto-zero-hora.git)
