# Pochita


# Eventos

### INSTAGRAM [Manutenção]
 Este evento consulta perfis de usuários do instagram e posta o último perfil que esse usuário postou no canal do discord especificado com o Slash Command /instagram. O perfil, o canal e o ultimo post que foi enviado fica armazenado em data.json.

### RANKING 
Atualmente, é feito um ranking com base na quantidade de mensagens dos usuários. A cada mensagem um membro comum ganha 10 de xp, um membro "VIP" ganha o dobro. Dentro do evento, quando um usuário alcança um certo nivel de xp, ele ganha um cargo no servidor.

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
