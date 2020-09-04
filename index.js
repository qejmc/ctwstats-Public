const Discord = require('discord.js');
const axios = require('axios');

const client = new Discord.Client();

const prefix = '.'

client.once('ready', () => {
    console.log('CTW Stats now online');
});

client.on('message', async message =>{
    if(!message.content.startsWith(prefix) || message.author.bot){
        return;
    }
    let args = message.content.substring(prefix.length).split(" ");
    const command = args.shift().toLowerCase();

    if(command === 'stats'){
        const player = args.join(" ");
        try{
          let getUUID = async () =>{
              let response1 = await axios.get('https://api.mojang.com/users/profiles/minecraft/'+ player);
              let uuid = response1.data;
              return uuid;
          }
          let uuidValue = await getUUID();
          //message.reply(`${uuidValue.id}`);
          let getStats = async () => {
              let response = await axios.get('https://api.hypixel.net/player?uuid=' + uuidValue.id + '&key=token');
              let stats = response.data;
              return stats;
          }
          let statsValue = await getStats();
          let special;
          let ctwKills;
          let ctwCaps;

          const wkplayers = [
            '7155b607f80d425c85257a8fecc32d6f',
            '1d236af11269409e82ffe2debe1fccd7',
            '403d437d2ee04457a39d7b62811e6f08',
            '1fc97172c4964966872086f19da147a5',
            'c7d988d6b15c4cc3af3d13ff8ed2ba12',
            '6b8e87f8e39646beb82707b7cfaa1f6b',
            '1fc4ccd429f248a29359ac7a4a445823',
            'dd4c96b53b284e0ca700afe1ed8d81f0',
            '15280eedbbf54e50b04251f03149ca07',
            '12701cc56c7142a1ba605d92fdf1395e',
            'da328728d87a45ff9bcbbc4590e2cc40',
            '4939702ade65467a9174375945969d49',
            '6349a0a3d61c43d7abefde803b1ce07c',
            '369a7b7109ed4bcbaf32639f3899dece',
            '5dc88460a5c7422ea3a858ad9dd55ec9',
            '63682d135b3b4553b2c548372df80154',
            '89a7eee8932a453a878f110f92a8e8b0',
            'be28f569ebd0489db13096866d5f5e07',
            '1ca46ea6d06f47ab91cf772582946815',
            '7b06e93d205a450a864c2f7675603f48',
            'af1edd48aa004d20a2b943b1b8bce61d',
            '5dc88460a5c7422ea3a858ad9dd55ec9',
            'edaf1136619f4378b10f69c9c900e0f7',
            'd3bc64650edf4f688c4fdbcf30db089a',
            '846ee5ee3cf1439982af0a173e4927a2',
            '5ad2d62048374a7ab4540d8cff460219',
            'd7e136b9cf6142778fc0e53997eda12d',
            'd75b8d39bf9447b5b240371a5a59c331',
            'f06d4793937546fc8c6c8098b5fe9060',
            
          ]

          const lplayers = [
            '6ca68e69f319438e8344a97fc1fb7914',
            '6ff2629575f544a2aa96d62446d6901d', 
            '1a9ea24412cd4b74be414e322d56243b', 
            '647871f098e643368e1cff8ffe74a5f0', 
            '486914ec9da242f5aa2c540950ddb364', 
            'e6e81f757cc1439ea17d36e6dfdf2dcf', 
            'cb92169da50b4fa7a6041e553ebab03f', 
            'f191e1d6e32f4a6cb78c4ffefb096eb6', 
            'c79d473abaa443efa17998e1a7ca8a76',
            '1d8a510189ca4d1f89859e0f15690357', 
            'c044a47a52ba41b4ac5d6a91dafa3735', 
            '67b236dc3d154ce5b48fd98b85aa650b',
            '42d6304b519f4cd197cb71d4d6523e6c',
            '022005ddb80b430a91c8b673829761f4',
            '0afd9670998e4cf29a3265c9d9ced514',
            'fc2216c14ddc4dcdb81b1858aa12fd9f',
            '5aabc3fa32274cbc87873a50abb4f2ec',
            '3eea7dafebf941918d1b272f78b6dfb2',
            'b32110a5aacf4537a5f58a0ec33357e6',
            '5dc88460a5c7422ea3a858ad9dd55ec9',
            'e1c06e1b82dc4346b8f796c236233cbb',
            '1d5cf87211244a299a8ae1819610445e',
            '6dbbd744f8bb4a59b7837d8c29ac48e6',
            '42d6c7fb0ecd4208bf7bc663254df062',
          ]

          for(x=0; x<Math.max(wkplayers.length, lplayers.length); x++){
            if(uuidValue.id === wkplayers[x]){
              special = '☆ Well-Known Player';
            }
            else if(uuidValue.id === lplayers[x]){
              special = '♔ Leaderboard Player';
            }
          }
          function formatNumber(num) {
            return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
          }
          ctwKills = formatNumber(`${statsValue.player.achievements.arcade_ctw_slayer}`);
          ctwCaps = formatNumber(`${statsValue.player.achievements.arcade_ctw_oh_sheep}`);
          console.log("New player search: " + uuidValue.name);
          message.channel.send({embed: {
              color: 3447003,
              title: `Capture the Wool Statistics for ` + uuidValue.name + `:`,
              description: special,
              thumbnail: {
                url: 'https://www.mc-heads.net/avatar/' + uuidValue.id + '/50',
              },
              fields: [{
                  name: "Kills + Assists (K+A)",
                  value: "\u0060" + ctwKills + "\u0060"
                },
                {
                  name: "Wool Captures",
                  value: "\u0060" + ctwCaps + "\u0060"
                }
              ],
              timestamp: new Date(),
              footer: {
                icon_url: client.user.avatarURL,
                text: "CTW Stats Bot by qej"
              }
            }
          });
        }
        catch{
          return;
        }
    }
});

client.login(token);