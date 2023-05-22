# Pochita



# Comandos

### Rastrear

Ao receber o código de rastreio de alguma encomenda internacional é retornado a localização atual do pacote e dados anteriores.

### Clear 
Esse comando limpa um canal e recebe um número inteiro para dizer quantas mensagens devem ser apagadas

### Cat 

Esse comando retorna imagem de um gato em uma embed sempre que é utilizado

### CEP 

O comando consulta um CEP brasileiro e retorna dados sobre ele.



# Eventos

### Twit
 Este evento foi criado para seguir perfis diferentes do Twitter, cada perfil é identificado por um ID do usuário e um ID do canal no discord, cada perfil tem um canal diferente no discord para enviar as embeds das mensagens. A cada nova mensagem postada pelo perfil no twitter, o bot pega essa mensagem e a envia para um canal do discord associado a esse perfil. 


    ClientReady Event
|
└── setInterval (Executa a cada 16 minutos)
    |
    └── Lê o arquivo "usersChannel.json" (Função: readUsersChannel)
    |   |
    |   └── Para cada usuário e canal em usersChannel
    |       |
    |       └── Consulta os tweets do usuário no Twitter (Função: tweetClient.get)
    |           |
    |           └── Verifica se há tweets e se o ID do último tweet é diferente do último enviado
    |               |
    |               ├── Atualiza o ID do último tweet (Função: writeLastTweetIds)
    |               |
    |               └── Envia o tweet para o canal no Discord (Função: sendTweetToChannel)
    |
    └── Fim do setInterval

### Cats
Este evento envia imagens de gato sempre que o bot é ligado. Utiliza-se a API do thecatapi.

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
    

    The Cat API

    "MEOW_KEY": "",
   
    Weather API

    WEATHER_API_KEY = ""
    WEATHER_CHANNEL = ""
    

## Twit
Para configura o evento Twit é necessário adicionar o id do usuário do Twitter e o canal na qual o bot irá reenviar o tweet
#### profiles.json

    "profiles": [
        {
            "userId": "",
            "channelId": ""
        },
        {
            "userId": "",
            "channelId": ""
        }
    ] 
    


# Biblioteca

twit 
discord.js