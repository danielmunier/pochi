# Pochita



# Comandos

### Rastrear [Em andamento]

Ao receber o código de rastreio de alguma encomenda internacional é retornado a localização atual do pacote e dados anteriores.

### Clear 
Esse comando limpa as mensagens de um canal com o número que o usuário dar 

### Cat 

Esse comando retorna imagem de um gato em uma embed sempre que é utilizado utilizando a API thecatapi

### Ticket 

Onde esse comando for utilizado irá criar um painel/embed para os membros criarem tickets para falar com o suporte, darem sugestões na qual são enviadas para a staff, denúnciar membros. 

### Twitter [MANUTENÇÃO]

Comando em que é cadastra usuários para o bot fazer um stream de tweets de usuários do twitter




# Eventos

### Tweets [Manutenção]
 Este evento foi criado para seguir perfis diferentes do Twitter, cada perfil é identificado por um ID do usuário e um ID do canal no discord, cada perfil tem um canal diferente no discord para enviar as embeds das mensagens. A cada nova mensagem postada pelo perfil no twitter, o bot pega essa mensagem e a envia para um canal do discord associado a esse perfil. 


# O que você precisa configurar?
### .env

    Discord

    TOKEN: "", 
    CLIENT_ID: "", 
    GUILD_ID: "",

    Twitter

    CONSUMER_KEY: "", 
    CONSUMER_SECRET: "", 
    ACESS_TOKEN: "", 
    ACESS_TOKEN_SECRET: ""
    BEARER_TOKEN = ""


    OpenIA

    OPANIA: ""
# Biblioteca
-├── @superfaceai/one-sdk@2.4.2
-├── axios@1.4.0
-├── colors@1.4.0
-├── discord.js@14.11.0
-├── dotenv@16.0.3
-├── mongodb@5.7.0
-├── node-fetch@3.3.1
-├── nodemon@2.0.22
-├── openai@3.3.0
-├── twitter@1.7.1
